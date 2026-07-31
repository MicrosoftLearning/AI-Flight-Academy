# Run the greenlight council over one article.
#
#   pwsh ./run.ps1 -Piece P4-exec-summary
#
# Seats are DATA (council/*.json). This runner loads every seat, runs the
# deterministic checks (checks.py), then asks the seat-scorer agent to score the
# article for each seat and the judge to diff them. The model does the scoring;
# the code does the counting.

param(
    [string]$Piece = "P4-exec-summary",
    [string]$CouncilDir = "council",
    [string]$DataPack = "../data-pack",
    [string]$Rubric = "../the-greenlight/reference/solo-rubric.json"
)

$ErrorActionPreference = "Stop"

# --- 1. the council needs at least two seats with different outcomes ---
$Seats = @(Get-ChildItem -Path $CouncilDir -Filter *.json -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -notlike "*.example.json" })
if ($Seats.Count -lt 2) {
    Write-Error "Seat at least two audiences with DIFFERENT outcomes in $CouncilDir/ (found $($Seats.Count)). Copy council/retail.example.json to council/retail.json and add one more. A council of one is the solo critic with extra steps."
}

# --- 2. the agents you write must exist ---
$Missing = @("seat-scorer", "judge", "greenlight") |
    ForEach-Object { Join-Path ".github/agents" "$_.agent.md" } |
    Where-Object { -not (Test-Path $_) }
if ($Missing) {
    Write-Error "Missing agent files: $($Missing -join ', '). See .github/agents/README.md."
}

# --- 3. resolve the article and the shared output contract (the control) ---
$Article = Join-Path $DataPack "content/$Piece.md"
if (-not (Test-Path $Article)) { Write-Error "Article not found: $Article" }
if (-not (Test-Path $Rubric))  { Write-Error "Solo rubric (the control) not found: $Rubric. You read its output_contract; you never edit it." }
$ArticleText = Get-Content $Article -Raw
$Contract = Get-Content $Rubric -Raw

# --- 4. the countable half: deterministic checks ---
Write-Host "`n=== DETERMINISTIC CHECKS ($Piece) ===" -ForegroundColor Cyan
python checks.py --piece $Piece

# --- 5. the contextual half: score the article once per seat ---
Write-Host "`n=== SCORING EACH SEAT ===" -ForegroundColor Cyan
$ScorerSpec = Get-Content ".github/agents/seat-scorer.agent.md" -Raw
$Scorecards = @()
foreach ($Seat in $Seats) {
    Write-Host "  -> $($Seat.BaseName)" -ForegroundColor DarkGray
    $SeatJson = Get-Content $Seat.FullName -Raw
    $Scorecards += copilot -p @"
$ScorerSpec

--- the seat (score the article against THESE criteria only) ---
$SeatJson

--- output contract (reuse this shape; add a seat, a source, and a confidence per score) ---
$Contract

--- the article ($Piece) ---
$ArticleText
"@ --allow-all-tools
}

# --- 6. the judge diffs the seats: conflicts + coverage ---
Write-Host "`n=== JUDGE ===" -ForegroundColor Cyan
$JudgeSpec = Get-Content ".github/agents/judge.agent.md" -Raw
copilot -p @"
$JudgeSpec

The seats have already scored $Piece. Diff them: report every conflict (same passage,
opposite verdicts, quoted from each seat) and the coverage (who is served, who is
abandoned). Do not re-score.

SCORECARDS:
$($Scorecards -join "`n---`n")
"@ --allow-all-tools

# --- 7. TODO: greenlight. For every seat that REJECTED, spec the replacement asset
#     (format call included) and re-run THAT seat's SAME criteria against it. Greenlit
#     only when the seat that rejected the original now passes. Then gate the PR red
#     until every seat clears. See .github/agents/greenlight.agent.md.
Write-Host "`nNext: greenlight the failures -> see .github/agents/greenlight.agent.md" -ForegroundColor Yellow
