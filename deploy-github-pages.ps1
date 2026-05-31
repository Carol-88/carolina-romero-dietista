# Publicar landing en GitHub Pages
# Requisito previo: gh auth login

$ErrorActionPreference = "Stop"
$git = "C:\Program Files\Git\bin\git.exe"
$repoName = "carolina-romero-landing"

Set-Location $PSScriptRoot

gh auth status | Out-Null

if (-not (Test-Path ".git")) {
    & $git init
    & $git branch -M main
}

& $git add index.html css js images legal .nojekyll
& $git add -u 2>$null

$status = & $git status --porcelain
if ($status) {
    & $git commit -m "Publicar landing Carolina Romero"
}

$remotes = & $git remote 2>$null
if ($remotes -notcontains "origin") {
    gh repo create $repoName --public --source=. --remote=origin --push
} else {
    & $git push -u origin main
}

$owner = (gh api user --jq .login)
gh api "repos/$owner/$repoName/pages" -X POST -f build_type=legacy -f "source[branch]=main" -f "source[path]=/" 2>$null

Write-Host ""
Write-Host "Landing publicada en:"
Write-Host "https://$owner.github.io/$repoName/"
Write-Host ""
