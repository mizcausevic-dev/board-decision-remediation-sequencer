$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $bitmap = New-Object System.Drawing.Bitmap 1440, 900
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.Clear([System.Drawing.Color]::FromArgb(7, 17, 29))

  $panelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(13, 26, 43))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(103, 224, 190))
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(237, 242, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(159, 176, 207))
  $borderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(90, 103, 224, 190), 3)

  $graphics.FillRectangle($panelBrush, 45, 45, 1350, 810)
  $graphics.DrawRectangle($borderPen, 45, 45, 1350, 810)

  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontTitle = New-Object System.Drawing.Font("Georgia", 32, [System.Drawing.FontStyle]::Bold)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $graphics.DrawString("Board Decision Remediation Sequencer", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $textBrush, [System.Drawing.RectangleF]::new(70, 150, 1220, 170))
  $graphics.DrawString($Subtitle, $fontBody, $mutedBrush, [System.Drawing.RectangleF]::new(70, 315, 1240, 100))

  $y = 430
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 86, $y + 10, 10, 10)
    $graphics.DrawString($bullet, $fontBody, $textBrush, [System.Drawing.RectangleF]::new(110, $y, 1220, 70))
    $y += 78
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 780)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Board remediation order stays visible before backlog drag turns into another strategy memo" -Subtitle "This sequencer exposes dependency drag, owner readiness, timing windows, and recoverable value in one board-facing surface." -Bullets @(
  "Which lanes are simple enough to move immediately without another committee sweep.",
  "Where dependency load or owner resets are still distorting cleanup velocity.",
  "What should be simplified, standardized, automated, escalated, contained, or reassigned next."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-remediation-register-proof.png") -Title "Remediation register keeps each lane, owner, audience, and next move attached" -Subtitle "Every lane retains the sequence tier, operating story, accountable owner, and immediate corrective step." -Bullets @(
  "Each lane stays connected to one owner and one board-facing audience.",
  "Sequence weakness is visible before it turns into another vague status update.",
  "The next corrective move stays next to the lane instead of disappearing into a separate memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-sequence-lanes-proof.png") -Title "Sequence lanes show whether dependency drag, owner readiness, timing windows, or containment are driving the delay" -Subtitle "The dominant sequencing weakness remains visible so leadership can fix the right problem first." -Bullets @(
  "The blocking issue is explicit instead of implied.",
  "Dependency load, owner readiness, timing, and containment stay readable at a glance.",
  "Each lane ties to a concrete intervention instead of a generic operating complaint."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-remediation-posture-proof.png") -Title "Remediation posture keeps cleanup sequencing grounded in owners and recoverable value" -Subtitle "Composite drag score, recoverable value, and next moves stay grounded in the same operating view." -Bullets @(
  "Simplify, standardize, automate, escalate, contain, and reset-owner decisions stay tied to one owner.",
  "Recoverable value is visible before the next review cycle.",
  "Boards and operators can see which cleanup motion should move first."
)
