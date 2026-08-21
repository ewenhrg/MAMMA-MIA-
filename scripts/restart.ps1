# Rebuilds and restarts the production server on a guaranteed-free port 3000.
# `next start` runs as a child of npm, so stopping the npm process alone leaves
# the real server holding the port and serving a stale build.

$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  $listener | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
  Start-Sleep -Seconds 2
}

npm run build 2>&1 | Select-String -Pattern "Compiled|Failed|error|Error" | Out-String

Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm start" -NoNewWindow
Start-Sleep -Seconds 10

try {
  $r = Invoke-WebRequest -Uri "http://localhost:3000/en" -UseBasicParsing -TimeoutSec 20
  $css = [regex]::Matches($r.Content, '/_next/static/css/[^"]+\.css') | ForEach-Object { $_.Value } | Select-Object -Unique
  foreach ($c in $css) {
    try {
      $x = Invoke-WebRequest -Uri "http://localhost:3000$c" -UseBasicParsing
      "READY css=$($x.RawContentLength) bytes"
    } catch { "CSS FAILED TO LOAD: $c" }
  }
} catch { "SERVER NOT RESPONDING: $($_.Exception.Message)" }
