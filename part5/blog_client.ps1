Set-Location (Join-Path $PSScriptRoot "blog_client")
Write-Host -NoNewline "$([char]27)]0;Client$([char]7)"
npm run dev
Set-Location $PSScriptRoot