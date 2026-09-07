@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo. >> collect.log
echo ==== %date% %time% ==== >> collect.log
python collect.py >> collect.log 2>&1

if errorlevel 1 (
  echo [!] 수집 실패. collect.log 확인 >> collect.log
) else (
  echo [+] 완료 >> collect.log
)
