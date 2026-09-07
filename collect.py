#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Semi Atlas - 반도체 뉴스 수집기
표준 라이브러리만 사용합니다. pip install 불필요.

  python collect.py

산출물:
  data/news.js            페이지가 읽는 파일 (window.NEWS = {...})
  data/news.json          같은 내용의 JSON
  data/archive/YYYY-MM-DD.json   일자별 스냅샷 (추이 계산용)
"""

import json
import os
import re
import ssl
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime

KST = timezone(timedelta(hours=9))
ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(ROOT, "data")
ARCHIVE = os.path.join(DATA, "archive")

WINDOW_DAYS = 7        # 페이지에 유지할 기간
MAX_ITEMS = 160        # 전체 상한
TIMEOUT = 20

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


# ─────────────────────────────────────────────────────────────
# 1. 피드 정의
# ─────────────────────────────────────────────────────────────

def gnews(query, lang="ko"):
    """구글 뉴스 RSS 검색 URL. when:7d 로 최근 것만."""
    q = urllib.parse.quote(f"{query} when:7d")
    if lang == "ko":
        return f"https://news.google.com/rss/search?q={q}&hl=ko&gl=KR&ceid=KR:ko"
    return f"https://news.google.com/rss/search?q={q}&hl=en-US&gl=US&ceid=US:en"


FEEDS = [
    # ── 삼성 / 파운드리 (본업)
    {"label": "삼성 파운드리", "url": gnews("삼성전자 파운드리"),        "w": 3},
    {"label": "2나노·선단공정", "url": gnews("삼성 2나노 SF2 수율"),     "w": 3},
    {"label": "테일러 팹",     "url": gnews("삼성 테일러 팹 미국 파운드리"), "w": 2},
    {"label": "TSMC",         "url": gnews("TSMC 파운드리 공정"),        "w": 2},
    {"label": "Foundry EN",   "url": gnews("Samsung foundry 2nm", "en"), "w": 2},

    # ── 패키징 / 3D IC (담당 모듈)
    {"label": "어드밴스드 패키징", "url": gnews("어드밴스드 패키징 하이브리드 본딩"), "w": 3},
    {"label": "3D IC",        "url": gnews("3D IC TSV 인터포저 CoWoS"),  "w": 3},

    # ── 메모리
    {"label": "HBM",          "url": gnews("HBM4 HBM 메모리"),           "w": 2},
    {"label": "D램·낸드",      "url": gnews("D램 낸드 가격 메모리 업황"),   "w": 2},

    # ── 장비·소재
    {"label": "장비·소재",     "url": gnews("반도체 장비 EUV ASML 소재"),  "w": 1},

    # ── 시장·정책
    {"label": "산업·정책",     "url": gnews("반도체 수출 규제 관세 보조금"), "w": 1},
    {"label": "삼성전자 실적",  "url": gnews("삼성전자 실적 반도체 DS부문"), "w": 2},

    # ── 매체 직접 피드
    {"label": "전자신문",      "url": "https://rss.etnews.com/Section901.xml", "w": 1},
    {"label": "ZDNet Korea",  "url": "https://feeds.feedburner.com/zdkorea",   "w": 1},
]


# ─────────────────────────────────────────────────────────────
# 2. 분류 키워드
# ─────────────────────────────────────────────────────────────

CATS = [
    ("foundry", "파운드리", [
        "파운드리", "foundry", "tsmc", "2나노", "3나노", "1.4나노", "2nm", "3nm",
        "sf2", "sf4", "sf3", "gaa", "mbcfet", "18a", "14a", "인텔 파운드리",
        "수율", "테일러", "웨이퍼 가격", "선단공정", "미세공정", "탭아웃", "테이프아웃",
    ]),
    ("pkg", "패키징·3D IC", [
        "패키징", "packaging", "cowos", "tsv", "하이브리드 본딩", "hybrid bonding",
        "인터포저", "2.5d", "3d ic", "칩렛", "chiplet", "범프", "bump", "rdl",
        "i-cube", "x-cube", "saint", "fan-out", "팬아웃", "osat", "본딩",
    ]),
    ("memory", "메모리", [
        "hbm", "d램", "dram", "낸드", "nand", "메모리", "ddr5", "lpddr", "gddr",
        "마이크론", "micron", "sk하이닉스", "하이닉스", "cxl", "ssd", "적층",
    ]),
    ("equip", "장비·소재", [
        "asml", "euv", "장비", "노광", "식각", "증착", "cmp", "포토레지스트",
        "램리서치", "어플라이드", "도쿄일렉트론", "kla", "세메스", "원익", "소재",
        "전구체", "블랭크마스크", "웨이퍼 공급",
    ]),
    ("market", "시장·정책", [
        "수출", "관세", "규제", "보조금", "칩스법", "chips act", "점유율", "실적",
        "영업이익", "주가", "투자", "증설", "설비투자", "capex", "전망", "시장",
        "중국", "미국 상무부", "wsts", "가트너", "트렌드포스",
    ]),
]

SAMSUNG_KWS = ["삼성전자", "삼성", "samsung", "엑시노스", "exynos", "갤럭시", "galaxy"]

# 본인 업무와 직결 — 가중치 부스트
CORE_KWS = [
    "beol", "배선", "인터커넥트", "low-k", "cpi", "패드", "ubm", "passivation",
    "하이브리드 본딩", "3d ic", "tsv", "sf2", "2나노", "테일러", "gaa", "파운드리",
]


# ─────────────────────────────────────────────────────────────
# 3. 수집
# ─────────────────────────────────────────────────────────────

def fetch(url):
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=TIMEOUT, context=ctx) as r:
        return r.read()


def strip_tags(s):
    if not s:
        return ""
    s = re.sub(r"<[^>]+>", " ", s)
    s = (s.replace("&nbsp;", " ").replace("&amp;", "&")
          .replace("&lt;", "<").replace("&gt;", ">")
          .replace("&quot;", '"').replace("&#39;", "'"))
    return re.sub(r"\s+", " ", s).strip()


def parse_time(text):
    if not text:
        return None
    try:
        return parsedate_to_datetime(text).astimezone(KST)
    except Exception:
        pass
    for fmt in ("%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%d %H:%M:%S"):
        try:
            dt = datetime.strptime(text.strip(), fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=KST)
            return dt.astimezone(KST)
        except Exception:
            continue
    return None


def parse_feed(raw):
    """RSS 2.0 / Atom 양쪽 처리."""
    out = []
    try:
        root = ET.fromstring(raw)
    except ET.ParseError:
        return out

    # RSS 2.0
    for item in root.iter("item"):
        def g(tag):
            el = item.find(tag)
            return el.text if el is not None else None
        out.append({
            "title": strip_tags(g("title")),
            "link": (g("link") or "").strip(),
            "desc": strip_tags(g("description")),
            "pub": parse_time(g("pubDate")),
            "src": strip_tags(g("source")) or "",
        })

    # Atom
    if not out:
        ns = "{http://www.w3.org/2005/Atom}"
        for e in root.iter(ns + "entry"):
            t = e.find(ns + "title")
            l = e.find(ns + "link")
            u = e.find(ns + "updated") or e.find(ns + "published")
            s = e.find(ns + "summary")
            out.append({
                "title": strip_tags(t.text if t is not None else ""),
                "link": (l.get("href") if l is not None else "") or "",
                "desc": strip_tags(s.text if s is not None else ""),
                "pub": parse_time(u.text if u is not None else None),
                "src": "",
            })
    return out


# ─────────────────────────────────────────────────────────────
# 4. 정리
# ─────────────────────────────────────────────────────────────

def clean_title(t):
    """구글 뉴스 제목 끝의 ' - 매체명' 분리."""
    m = re.match(r"^(.*)\s+-\s+([^\-]{2,20})$", t)
    if m:
        return m.group(1).strip(), m.group(2).strip()
    return t, ""


def norm(t):
    return re.sub(r"[^0-9a-z가-힣]", "", t.lower())


def tokens(t):
    return set(re.findall(r"[0-9a-z]{2,}|[가-힣]{2,}", t.lower()))


def classify(text):
    low = text.lower()
    tags = []
    for key, label, kws in CATS:
        if any(k in low for k in kws):
            tags.append(key)
    return tags or ["market"]


def score(item, feed_w):
    low = (item["title"] + " " + item["desc"]).lower()
    s = feed_w * 2
    s += sum(3 for k in CORE_KWS if k in low)
    s += sum(2 for k in SAMSUNG_KWS if k in low)
    if item["pub"]:
        age_h = (datetime.now(KST) - item["pub"]).total_seconds() / 3600
        s += max(0, 24 - age_h) / 6          # 하루 이내면 최대 +4
    return round(s, 2)


def collect():
    now = datetime.now(KST)
    cutoff = now - timedelta(days=WINDOW_DAYS)
    kept, seen_norm, seen_tok = [], set(), []
    log = []

    for feed in FEEDS:
        try:
            raw = fetch(feed["url"])
            items = parse_feed(raw)
            log.append(f"  OK   {feed['label']:14s} {len(items):3d}건")
        except Exception as e:
            log.append(f"  FAIL {feed['label']:14s} {type(e).__name__}: {e}")
            continue

        for it in items:
            if not it["title"] or not it["link"]:
                continue
            if it["pub"] and it["pub"] < cutoff:
                continue

            title, src = clean_title(it["title"])
            it["title"] = title
            it["src"] = src or it["src"] or feed["label"]

            n = norm(title)
            if not n or n in seen_norm:
                continue
            tk = tokens(title)
            if any(tk and len(tk & prev) / max(1, len(tk | prev)) > 0.6
                   for prev in seen_tok):
                continue
            seen_norm.add(n)
            seen_tok.append(tk)

            kept.append({
                "title": title,
                "url": it["link"],
                "source": it["src"],
                "summary": it["desc"][:220],
                "published": it["pub"].isoformat() if it["pub"] else now.isoformat(),
                "date": (it["pub"] or now).strftime("%Y-%m-%d"),
                "tags": classify(title + " " + it["desc"]),
                "samsung": any(k in (title + it["desc"]).lower() for k in SAMSUNG_KWS),
                "score": score(it, feed["w"]),
                "feed": feed["label"],
            })
        time.sleep(0.4)

    kept.sort(key=lambda x: (x["date"], x["score"]), reverse=True)
    return kept[:MAX_ITEMS], log


# ─────────────────────────────────────────────────────────────
# 5. 추이 (아카이브 기반)
# ─────────────────────────────────────────────────────────────

def build_trend(today_items):
    os.makedirs(ARCHIVE, exist_ok=True)
    today = datetime.now(KST).strftime("%Y-%m-%d")
    todays = [i for i in today_items if i["date"] == today]
    with open(os.path.join(ARCHIVE, f"{today}.json"), "w", encoding="utf-8") as f:
        json.dump(todays, f, ensure_ascii=False, indent=1)

    trend = []
    for d in range(13, -1, -1):
        day = (datetime.now(KST) - timedelta(days=d)).strftime("%Y-%m-%d")
        path = os.path.join(ARCHIVE, f"{day}.json")
        counts = {k: 0 for k, _, _ in CATS}
        if os.path.exists(path):
            try:
                with open(path, encoding="utf-8") as f:
                    for it in json.load(f):
                        for t in it.get("tags", []):
                            if t in counts:
                                counts[t] += 1
            except Exception:
                pass
        trend.append({"date": day, **counts})
    return trend


# ─────────────────────────────────────────────────────────────
# 6. 실행
# ─────────────────────────────────────────────────────────────

def main():
    print("반도체 뉴스 수집 시작 —", datetime.now(KST).strftime("%Y-%m-%d %H:%M"))
    items, log = collect()
    print("\n".join(log))

    # 수집 실패 시 기존 데이터를 지우지 않는다 (매일 무인 실행 대비)
    if not items:
        print("\n수집 0건. 기존 data/news.js 를 유지하고 종료합니다.")
        print("네트워크, 방화벽, 피드 URL을 확인하세요.")
        return 1

    payload = {
        "updated": datetime.now(KST).isoformat(),
        "updated_kr": datetime.now(KST).strftime("%Y년 %m월 %d일 %H:%M"),
        "count": len(items),
        "cats": [{"key": k, "label": l} for k, l, _ in CATS],
        "trend": build_trend(items),
        "items": items,
    }

    os.makedirs(DATA, exist_ok=True)
    with open(os.path.join(DATA, "news.json"), "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)
    with open(os.path.join(DATA, "news.js"), "w", encoding="utf-8") as f:
        f.write("window.NEWS = ")
        json.dump(payload, f, ensure_ascii=False)
        f.write(";\n")

    print(f"\n완료: {len(items)}건 저장 → data/news.js")
    if len(items) < 10:
        print("경고: 수집량이 적습니다. 네트워크나 피드 URL을 확인하세요.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
