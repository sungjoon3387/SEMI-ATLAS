/* Semi Atlas 용어 사전
   본문에 나오는 약어를 자동으로 찾아 링크로 바꿉니다.
   여기에 항목을 추가하면 본문 수정 없이 바로 반영됩니다.

   full   영문 풀네임
   ko     한글 이름
   desc   무엇인가
   origin 유래·역사 (있을 때만)
   note   실무에서 걸리는 지점 (있을 때만)
   see    관련 용어 */

window.GLOSSARY = {

  /* ── 공정 구간 ── */
  "FEOL": {
    full: "Front-End-Of-Line", ko: "전공정 앞단",
    desc: "트랜지스터 자체를 만드는 구간. 웰, 게이트, 소스·드레인, 채널이 여기서 결정된다.",
    origin: "'라인(line)'은 팹의 생산 라인을 뜻한다. 웨이퍼가 라인을 따라 흐르는 순서에서 앞쪽이라 front-end다. 소프트웨어의 프런트엔드와는 무관하다.",
    note: "노드 이름이 붙는 물리적 근거가 여기 있다. 게이트 길이, 핀 피치, 나노시트 폭 같은 것들.",
    see: ["MEOL", "BEOL", "GAA"]
  },
  "MEOL": {
    full: "Middle-End-Of-Line", ko: "중간 구간",
    desc: "소자와 배선을 잇는 구간. 컨택, 로컬 인터커넥트, M0가 여기 속한다.",
    origin: "원래는 FEOL과 BEOL 둘뿐이었다. 컨택 구조가 복잡해지면서 어느 쪽에도 넣기 애매해지자 중간 이름이 따로 생겼다.",
    note: "회사마다 경계를 다르게 긋는다. M0를 MEOL로 볼지 BEOL로 볼지부터 갈린다.",
    see: ["FEOL", "BEOL"]
  },
  "BEOL": {
    full: "Back-End-Of-Line", ko: "후공정 배선 구간",
    desc: "트랜지스터 위에 금속 배선망을 쌓는 구간. 하부 미세 배선부터 상부 굵은 배선, passivation, 패드까지.",
    origin: "패키징을 뜻하는 'back-end'와 이름이 겹쳐 혼동이 잦다. BEOL은 여전히 웨이퍼 팹 안의 일이고, 패키징은 팹 밖이다.",
    note: "로직은 배선이 10~15층 이상이고 고객마다 패턴이 달라진다. 파운드리 BEOL 난이도의 대부분이 여기서 나온다.",
    see: ["MEOL", "CPI", "low-k", "CMP"]
  },
  "CPI": {
    full: "Chip-Package Interaction", ko: "칩-패키지 상호작용",
    desc: "패키징 과정의 열·기계 응력이 칩 상부 구조를 손상시키는 현상. low-k crack, white bump, delamination이 대표 불량이다.",
    origin: "플립칩과 low-k 재료가 동시에 도입되면서 문제로 떠올랐다. 저유전율 재료는 유전율을 낮추려고 다공성을 키운 탓에 기계적으로 약하다.",
    note: "칩 설계도 패키지 설계도 아닌 경계에서 터진다. 그래서 원인 규명에 양쪽 조직이 다 걸린다.",
    see: ["BEOL", "low-k", "UBM"]
  },

  /* ── 소자 구조 ── */
  "FinFET": {
    full: "Fin Field-Effect Transistor", ko: "핀펫",
    desc: "채널을 지느러미처럼 세워 게이트가 3면을 감싸는 구조. 14nm부터 5nm 세대의 주력이었다.",
    origin: "1990년대 UC버클리 후지천 후 교수 연구팀이 제안했다. 지느러미(fin)를 닮아서 붙은 이름이다.",
    see: ["GAA", "CFET"]
  },
  "GAA": {
    full: "Gate-All-Around", ko: "게이트 올 어라운드",
    desc: "채널 4면을 게이트가 완전히 감싸는 구조. 누설 전류 제어가 FinFET보다 낫다.",
    note: "삼성이 3nm부터 세계 최초로 양산 적용했다. 채널을 가로로 눕힌 나노시트 형태가 현재 주류다.",
    see: ["MBCFET", "FinFET", "CFET"]
  },
  "MBCFET": {
    full: "Multi-Bridge Channel FET", ko: "멀티브리지 채널 트랜지스터",
    desc: "삼성의 GAA 구현 방식. 나노시트 채널을 여러 층 쌓아 다리(bridge)처럼 연결한다.",
    note: "시트 폭을 조절해 소자 특성을 바꿀 수 있다는 게 설계 쪽 장점이다. FinFET은 핀 개수로만 조절했다.",
    see: ["GAA"]
  },
  "CFET": {
    full: "Complementary FET", ko: "상보형 트랜지스터",
    desc: "n형과 p형 트랜지스터를 수직으로 겹쳐 쌓는 구조. 면적을 절반 가까이 줄인다.",
    note: "1nm급 이후 후보로 거론되지만 아직 연구 단계다.",
    see: ["GAA"]
  },
  "BSPDN": {
    full: "Backside Power Delivery Network", ko: "후면 전원 공급",
    desc: "전원 배선을 웨이퍼 뒷면으로 옮기는 기술. 앞면 배선의 혼잡을 덜고 전압 강하를 줄인다.",
    note: "2nm 이하 경쟁의 핵심 카드. 웨이퍼를 뒤집어 갈아내는 공정이 추가되면서 BEOL 흐름 자체가 바뀐다.",
    see: ["BEOL"]
  },

  /* ── 노광 ── */
  "EUV": {
    full: "Extreme Ultraviolet", ko: "극자외선 노광",
    desc: "파장 13.5nm 광원을 쓰는 노광. 한 번에 미세 패턴을 그려 멀티패터닝 횟수를 줄인다.",
    origin: "주석 방울에 레이저를 쏴 플라즈마를 만들어 빛을 얻는다. 이 파장은 공기와 유리에 흡수돼 진공 챔버와 반사 광학계가 필수다.",
    note: "장비는 ASML 한 곳만 만든다. 반도체 공급망에서 가장 좁은 병목이다.",
    see: ["DUV", "High-NA", "SADP"]
  },
  "DUV": {
    full: "Deep Ultraviolet", ko: "심자외선 노광",
    desc: "193nm ArF 광원을 쓰는 노광. 물을 렌즈와 웨이퍼 사이에 채우는 액침 방식이 표준이다.",
    note: "EUV 시대에도 층 대부분은 여전히 DUV로 찍는다. 훨씬 싸고 안정적이다.",
    see: ["EUV", "SADP"]
  },
  "High-NA": {
    full: "High Numerical Aperture", ko: "고개구수 노광",
    desc: "렌즈 개구수를 0.33에서 0.55로 키운 차세대 EUV. 해상도가 올라간다.",
    note: "노광 필드가 절반으로 줄어 큰 칩은 두 번 찍어 이어붙여야 한다. 이 스티칭이 새 과제다.",
    see: ["EUV"]
  },
  "SADP": {
    full: "Self-Aligned Double Patterning", ko: "자기정렬 이중 패터닝",
    desc: "한 패턴의 옆면에 스페이서를 붙여 피치를 절반으로 줄이는 기법. 네 배로 줄이면 SAQP다.",
    note: "EUV 없이 미세화하는 우회로였다. 공정 수와 원가가 급증하는 대가를 치른다.",
    see: ["DUV", "EUV"]
  },
  "OPC": {
    full: "Optical Proximity Correction", ko: "광 근접 보정",
    desc: "빛의 회절 때문에 설계대로 안 찍히는 것을 보정하려고 마스크 패턴을 미리 왜곡시키는 기법.",
    note: "마스크 위 패턴은 설계 도면과 육안으로 딴판이다. 계산량이 커서 전용 연산 인프라를 쓴다.",
    see: ["DUV", "EUV"]
  },

  /* ── 단위 공정 ── */
  "CMP": {
    full: "Chemical Mechanical Polishing", ko: "화학적 기계 연마",
    desc: "슬러리와 패드로 표면을 갈아 평탄하게 만드는 공정. 층을 쌓을수록 울퉁불퉁해지는 것을 매번 잡아준다.",
    origin: "1980년대 IBM이 도입했다. 반도체 공정에 '갈아낸다'는 거친 개념을 들여온 것이 당시엔 파격이었다.",
    note: "구리 다마신은 CMP 없이는 성립하지 않는다. 디싱, 에로전 같은 고유 불량이 따라온다.",
    see: ["BEOL", "low-k"]
  },
  "ALD": {
    full: "Atomic Layer Deposition", ko: "원자층 증착",
    desc: "전구체를 번갈아 흘려 원자층 단위로 박막을 쌓는 방식. 두께 제어가 가장 정밀하다.",
    note: "느린 것이 유일한 단점이다. 종횡비가 큰 구조에 균일하게 입혀야 할 때는 대안이 없다.",
    see: ["CVD", "PVD"]
  },
  "CVD": {
    full: "Chemical Vapor Deposition", ko: "화학 기상 증착",
    desc: "기체 상태 원료를 반응시켜 박막을 쌓는 방식. 절연막과 금속막 대부분이 여기서 나온다.",
    see: ["ALD", "PVD"]
  },
  "PVD": {
    full: "Physical Vapor Deposition", ko: "물리 기상 증착",
    desc: "타깃을 물리적으로 때려 튀어나온 입자를 웨이퍼에 붙이는 방식. 스퍼터링이 대표적이다.",
    note: "금속 시드층, 배리어층에 주로 쓴다. 화학 반응이 없어 단순하지만 단차 피복성이 떨어진다.",
    see: ["ALD", "CVD"]
  },
  "low-k": {
    full: "low dielectric constant material", ko: "저유전율 재료",
    desc: "배선 사이 기생 용량을 줄이려고 유전율을 낮춘 절연막. RC 지연을 줄이는 핵심 재료다.",
    origin: "SiO₂의 유전율 4.0에서 출발해 탄소를 넣고 기공을 만들어 2점대까지 내려왔다.",
    note: "유전율을 낮출수록 기계적으로 약해진다. CPI 불량의 근본 원인이 여기 있다.",
    see: ["CPI", "BEOL", "CMP"]
  },

  /* ── 배선·패키징 ── */
  "TSV": {
    full: "Through-Silicon Via", ko: "실리콘 관통 전극",
    desc: "웨이퍼를 수직으로 뚫어 위아래 다이를 연결하는 구조. HBM과 3D 적층의 기반이다.",
    note: "깊은 구멍을 뚫고 구리로 채우는 공정이라 응력 관리가 어렵다. 주변에 소자를 못 놓는 금지 영역이 생긴다.",
    see: ["HBM", "RDL", "UBM"]
  },
  "RDL": {
    full: "Re-Distribution Layer", ko: "재배선층",
    desc: "칩 위에 추가로 그린 배선층. 촘촘한 패드 위치를 기판이 받을 수 있는 간격으로 넓혀준다.",
    note: "팬아웃 패키징의 핵심이다. 팹의 BEOL 기술이 패키징으로 넘어간 대표 사례.",
    see: ["UBM", "WLP", "BEOL"]
  },
  "UBM": {
    full: "Under-Bump Metallization", ko: "범프 하부 금속층",
    desc: "솔더 범프와 칩 패드 사이에 넣는 금속층. 접합력과 확산 차단을 맡는다.",
    note: "Far-BEOL의 끝단이자 패키지의 시작점이다. CPI 응력이 그대로 지나가는 자리이기도 하다.",
    see: ["CPI", "RDL"]
  },
  "WLP": {
    full: "Wafer Level Packaging", ko: "웨이퍼 레벨 패키징",
    desc: "웨이퍼를 자르기 전에 패키징을 끝내는 방식. 얇고 작게 만들 수 있다.",
    see: ["RDL", "FO-PLP"]
  },
  "FO-PLP": {
    full: "Fan-Out Panel Level Packaging", ko: "팬아웃 패널 레벨 패키징",
    desc: "둥근 웨이퍼 대신 사각 패널 위에서 팬아웃 패키징을 한다. 면적 활용률이 높아 원가가 낮다.",
    note: "디스플레이 산업의 패널 인프라를 반도체가 가져온 사례다.",
    see: ["WLP", "RDL"]
  },
  "CoWoS": {
    full: "Chip on Wafer on Substrate", ko: "코우오스",
    desc: "TSMC의 2.5D 패키징 브랜드. 실리콘 인터포저 위에 로직과 HBM을 나란히 올린다.",
    note: "AI 가속기 공급의 실질적 병목이 오랫동안 이 캐파였다. 삼성의 대응은 I-Cube다.",
    see: ["TSV", "HBM"]
  },
  "UCIe": {
    full: "Universal Chiplet Interconnect Express", ko: "유니버설 칩렛 인터커넥트",
    desc: "서로 다른 회사가 만든 칩렛을 연결하기 위한 표준 인터페이스.",
    origin: "2022년 인텔 주도로 출범했다. PCIe가 보드 위에서 한 역할을 패키지 안에서 하겠다는 발상이다.",
    see: ["CoWoS", "TSV"]
  },

  /* ── 메모리 ── */
  "HBM": {
    full: "High Bandwidth Memory", ko: "고대역폭 메모리",
    desc: "D램 다이를 TSV로 수직 적층하고 로직 베이스 다이 위에 올린 구조. AI 가속기의 필수 부품이다.",
    origin: "2013년 SK하이닉스와 AMD가 JEDEC 표준으로 처음 내놨다. 초기엔 그래픽카드용 틈새 제품으로 취급됐다.",
    note: "세대마다 단수와 대역폭이 오른다. HBM4부터는 베이스 다이를 파운드리가 맡는 구조라 로직 업체와의 협업이 중요해졌다.",
    see: ["TSV", "DRAM"]
  },
  "DRAM": {
    full: "Dynamic Random Access Memory", ko: "디램",
    desc: "트랜지스터 하나와 캐패시터 하나로 비트를 저장한다. 전하가 새기 때문에 주기적으로 다시 채워야 해서 '동적'이다.",
    origin: "1968년 IBM 로버트 데나드가 발명했다. 그 전 메모리는 셀당 소자가 여섯 개였다.",
    note: "미세화의 벽은 캐패시터다. 면적이 줄어도 전하량은 유지해야 해서 구멍을 깊게 파는 방향으로 갔다.",
    see: ["HBM", "DDR", "LPDDR"]
  },
  "NAND": {
    full: "NAND Flash", ko: "낸드 플래시",
    desc: "전원이 꺼져도 데이터가 남는 비휘발성 메모리. 셀을 직렬로 연결한 구조가 논리 게이트 NAND를 닮아 이름이 붙었다.",
    note: "2013년경 평면 미세화가 한계에 부딪히자 수직으로 쌓는 3D 구조로 전환했다. 이후 경쟁 축은 단수가 됐다.",
    see: ["QLC", "SSD"]
  },
  "QLC": {
    full: "Quad-Level Cell", ko: "쿼드 레벨 셀",
    desc: "한 셀에 4비트를 저장하는 방식. 전압 준위를 16단계로 나눈다.",
    note: "용량당 원가는 낮지만 수명과 속도가 떨어진다. 읽기 위주 데이터센터 스토리지에서 자리를 잡았다.",
    see: ["NAND", "SSD"]
  },
  "DDR": {
    full: "Double Data Rate", ko: "디디알",
    desc: "클럭의 상승과 하강 양쪽에서 데이터를 주고받는 방식. 같은 클럭으로 두 배 대역폭을 낸다.",
    see: ["DRAM", "LPDDR"]
  },
  "LPDDR": {
    full: "Low Power DDR", ko: "저전력 디램",
    desc: "모바일용 저전력 D램 규격. 전압을 낮추고 대기 전력을 줄였다.",
    see: ["DDR", "DRAM"]
  },
  "CXL": {
    full: "Compute Express Link", ko: "씨엑스엘",
    desc: "CPU와 메모리·가속기를 잇는 고속 인터페이스 표준. 메모리를 서버 밖으로 빼서 공유하는 구조를 가능하게 한다.",
    note: "메모리 업체 입장에서는 D램을 파는 새로운 폼팩터가 생기는 셈이다.",
    see: ["DRAM"]
  },
  "MRAM": {
    full: "Magnetoresistive RAM", ko: "자기저항 메모리",
    desc: "자성체의 저항 변화로 비트를 저장한다. 비휘발성이면서 빠르다.",
    note: "단독 메모리로는 D램을 못 이겼지만, 로직 칩에 내장하는 eMRAM으로는 실사용 단계에 들어갔다.",
    see: ["DRAM"]
  },

  /* ── 설계·산업 구조 ── */
  "EDA": {
    full: "Electronic Design Automation", ko: "전자설계자동화",
    desc: "칩 설계에 쓰는 소프트웨어 도구 전반. 합성, 배치배선, 검증, 시뮬레이션을 담당한다.",
    note: "Synopsys, Cadence, Siemens 세 곳이 사실상 전부다. 장비만큼이나 좁은 병목.",
    see: ["PDK", "DTCO"]
  },
  "IDM": {
    full: "Integrated Device Manufacturer", ko: "종합 반도체 기업",
    desc: "설계와 생산을 모두 하는 회사. 삼성 메모리, SK하이닉스, 인텔, 마이크론, TI가 여기 속한다.",
    origin: "원래는 모든 반도체 회사가 IDM이었다. 1987년 TSMC가 생산만 하는 모델을 만들면서 팹리스와 파운드리로 갈라졌다.",
    see: ["OSAT", "PDK"]
  },
  "OSAT": {
    full: "Outsourced Semiconductor Assembly and Test", ko: "외주 패키징·테스트",
    desc: "패키징과 테스트만 전문으로 하는 회사. ASE, Amkor, JCET가 대표적이다.",
    note: "어드밴스드 패키징이 중요해지면서 파운드리가 이 영역을 직접 가져가는 흐름이 생겼다.",
    see: ["IDM"]
  },
  "PDK": {
    full: "Process Design Kit", ko: "공정 설계 키트",
    desc: "파운드리가 고객에게 주는 설계 규칙, 소자 모델, 검증 파일 묶음. 고객은 이것으로 설계한다.",
    note: "PDK 완성도와 배포 시점이 수주 경쟁력을 좌우한다. 공정이 좋아도 PDK가 늦으면 고객이 못 쓴다.",
    see: ["EDA", "DTCO", "MPW"]
  },
  "DTCO": {
    full: "Design-Technology Co-Optimization", ko: "설계-공정 동시 최적화",
    desc: "공정 조건과 설계 규칙을 따로 정하지 않고 함께 조정하는 방법론.",
    origin: "미세화만으로 성능이 안 오르기 시작하면서 등장했다. 같은 공정이라도 설계 규칙을 어떻게 짜느냐로 면적이 달라진다.",
    note: "공정 엔지니어가 설계 흐름을 알아야 하는 이유가 이것이다.",
    see: ["PDK", "PPA"]
  },
  "PPA": {
    full: "Performance, Power, Area", ko: "성능·전력·면적",
    desc: "노드 세대를 비교하는 기본 축. 셋은 서로 맞바꾸는 관계라 하나만 좋아지는 개선은 의미가 약하다.",
    see: ["DTCO"]
  },
  "MPW": {
    full: "Multi-Project Wafer", ko: "멀티 프로젝트 웨이퍼",
    desc: "여러 고객의 설계를 한 마스크에 함께 태워 시제품을 만드는 방식. 셔틀이라고도 한다.",
    note: "마스크 값이 수십억 원대라 소량 시제품에는 단독 마스크를 쓸 수 없다.",
    see: ["PDK"]
  },

  /* ── 계측·신뢰성 ── */
  "PCM": {
    full: "Process Control Monitor", ko: "공정 관리 모니터",
    desc: "웨이퍼의 스크라이브 레인에 넣은 테스트 구조로 측정하는 전기 파라미터. 저항, 용량, 소자 특성 등.",
    note: "같은 약어가 상변화 메모리(Phase Change Memory)를 뜻하기도 한다. 문맥으로 구분해야 한다.",
    see: ["D0", "EM"]
  },
  "D0": {
    full: "Defect Density", ko: "결함 밀도",
    desc: "단위 면적당 치명 결함 수. 수율 모델의 핵심 입력이다.",
    note: "다이가 클수록 같은 D0에서 수율이 급격히 떨어진다. AI 칩이 커질수록 이 숫자에 민감해지는 이유다.",
    see: ["PCM"]
  },
  "EM": {
    full: "Electromigration", ko: "일렉트로마이그레이션",
    desc: "전류가 흐르면서 금속 원자가 밀려 이동해 배선이 끊기거나 뭉치는 현상.",
    origin: "1960년대 알루미늄 배선에서 처음 문제가 됐다. 구리로 바꾼 이유 중 하나가 EM 내성이다.",
    note: "배선 폭이 줄수록 전류 밀도가 올라 더 취약해진다. BEOL 신뢰성 항목의 대표 선수.",
    see: ["TDDB", "SM", "BEOL"]
  },
  "TDDB": {
    full: "Time-Dependent Dielectric Breakdown", ko: "시간 의존 절연막 파괴",
    desc: "전계를 오래 받은 절연막이 어느 순간 뚫리는 현상. 수명 예측 모델로 관리한다.",
    note: "low-k는 기공이 많아 TDDB에 불리하다. 유전율과 신뢰성이 정면으로 충돌하는 지점.",
    see: ["EM", "low-k"]
  },
  "SM": {
    full: "Stress Migration", ko: "스트레스 마이그레이션",
    desc: "열 응력 때문에 금속 원자가 이동해 비아 아래에 공극이 생기는 현상. 전류 없이도 일어난다.",
    see: ["EM", "TDDB"]
  },

  /* ── 시스템LSI·완제품 ── */
  "SoC": {
    full: "System on Chip", ko: "시스템 온 칩",
    desc: "CPU, GPU, 메모리 컨트롤러, 모뎀 등을 한 칩에 담은 집적 회로.",
    see: ["AP", "UCIe"]
  },
  "AP": {
    full: "Application Processor", ko: "애플리케이션 프로세서",
    desc: "스마트폰의 두뇌. 삼성은 Exynos, 퀄컴은 Snapdragon, 애플은 A 시리즈다.",
    see: ["SoC"]
  },
  "DDI": {
    full: "Display Driver IC", ko: "디스플레이 구동 칩",
    desc: "디스플레이 각 화소에 신호를 보내는 칩. 해상도와 주사율이 오를수록 요구가 커진다.",
    see: ["PMIC"]
  },
  "PMIC": {
    full: "Power Management IC", ko: "전력 관리 칩",
    desc: "전압을 나누고 조절해 각 부품에 공급하는 칩. 배터리 수명에 직결된다.",
    see: ["DDI"]
  },
  "CIS": {
    full: "CMOS Image Sensor", ko: "씨모스 이미지 센서",
    desc: "빛을 전기 신호로 바꾸는 센서. 삼성 브랜드는 ISOCELL이다.",
    note: "화소를 줄이면 빛을 덜 받는 문제가 생겨, 화소 사이 벽을 세워 간섭을 막는 구조로 대응했다.",
    see: ["SoC"]
  },

  /* ── 지표 ── */
  "wpm": {
    full: "wafers per month", ko: "월 웨이퍼 투입량",
    desc: "팹 캐파를 세는 단위. 300mm 환산으로 표기하는 것이 관행이다.",
    see: ["capex"]
  },
  "capex": {
    full: "capital expenditure", ko: "설비투자",
    desc: "장비와 팹에 쓰는 돈. 반도체는 매출의 20~30%가 여기로 간다.",
    note: "capex는 2년 뒤 공급으로 나타난다. 지금의 투자 결정이 다음 사이클의 과잉이나 부족을 만든다.",
    see: ["wpm"]
  },
  "WSTS": {
    full: "World Semiconductor Trade Statistics", ko: "세계 반도체 시장 통계 기구",
    desc: "반도체 업계가 공동으로 운영하는 통계·전망 기관. 시장 규모 전망의 기준으로 쓰인다.",
    see: ["SIA"]
  },
  "SIA": {
    full: "Semiconductor Industry Association", ko: "미국 반도체산업협회",
    desc: "미국 반도체 업계 단체. 월간 세계 매출 통계를 3개월 이동평균으로 발표한다.",
    see: ["WSTS"]
  }
};
