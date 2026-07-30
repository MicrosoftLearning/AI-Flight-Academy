# Run the digital-twin council from the CLI.
#
#   pwsh ./run.ps1 -Dilemma 4
#   pwsh ./run.ps1 -Ask "A stakeholder wants a date before the scope is stable."

param(
    [int]$Dilemma = 1,
    [string]$Ask
)

$ErrorActionPreference = "Stop"

$RequiredAgents = @("ambition", "obligation", "capacity", "arbiter")
$Missing = @()
foreach ($Agent in $RequiredAgents) {
    $Path = Join-Path ".github/agents" "$Agent.agent.md"
    if (-not (Test-Path $Path)) { $Missing += $Path }
}

if ($Missing.Count -gt 0) {
    Write-Error "Missing council agent files. Create these first: $($Missing -join ', '). See .github/agents/README.md."
}

foreach ($SpecFile in @("soul.md", "voice.md", "revealed.md")) {
    $Path = Join-Path "digital-twin/references" $SpecFile
    if (-not (Test-Path $Path)) {
        Write-Error "Missing $Path. Copy the matching *.template.md file and fill it in before running the council."
    }
}

$Soul = Get-Content "digital-twin/references/soul.md" -Raw
$Voice = Get-Content "digital-twin/references/voice.md" -Raw
$Revealed = Get-Content "digital-twin/references/revealed.md" -Raw

if (-not $Ask) {
    $Lines = Get-Content "test/dilemmas.md"
    $Match = $Lines | Select-String -Pattern "^\*\*$Dilemma\.\*\*" -Context 0,2
    if (-not $Match) { Write-Error "Could not find dilemma #$Dilemma in test/dilemmas.md." }
    $Ask = ($Match | ForEach-Object { $_.Line; $_.Context.PostContext }) -join "`n"
}

Write-Host "`n=== POLLING THE COUNCIL ===" -ForegroundColor Cyan
$Drives = @{}
foreach ($Drive in @("ambition", "obligation", "capacity")) {
    Write-Host "  -> $Drive" -ForegroundColor DarkGray
    $Spec = Get-Content ".github/agents/$Drive.agent.md" -Raw
    $Drives[$Drive] = copilot -p @"
$Spec

--- soul.md ---
$Soul

--- revealed.md ---
$Revealed

DILEMMA:
$Ask
"@ --allow-all-tools
}

Write-Host "`n=== ARBITER ===" -ForegroundColor Cyan
$Arbiter = Get-Content ".github/agents/arbiter.agent.md" -Raw
copilot -p @"
$Arbiter

--- soul.md ---
$Soul

--- voice.md ---
$Voice

--- revealed.md ---
$Revealed

The three drives have already reported. Do not re-run them.

AMBITION: $($Drives["ambition"])

OBLIGATION: $($Drives["obligation"])

CAPACITY: $($Drives["capacity"])

DILEMMA:
$Ask
"@ --allow-all-tools
