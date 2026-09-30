Set-Location (Join-Path $PSScriptRoot "blog_server")
Write-Host -NoNewline "$([char]27)]0;Server$([char]7)"
$env:PHONEBOOK_PORT = "3002"
npm run dev
Set-Location $PSScriptRoot