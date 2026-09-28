Set-Location (Join-Path $PSScriptRoot "phonebook")
Write-Host -NoNewline "$([char]27)]0;Client$([char]7)"
$env:VITE_PHONEBOOK_PORT = "3002"
npm run dev
Set-Location $PSScriptRoot