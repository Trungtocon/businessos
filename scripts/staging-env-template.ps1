<# 
    V3.1 Staging Environment Template
    Prints required env var names for staging deployment.
    Usage: .\scripts\staging-env-template.ps1
#>

Write-Host "`n=== V3.1 Staging — Required Environment Variables ===" -ForegroundColor Cyan
Write-Host ""

$vars = @(
    @{ Name = "AI_PROVIDER";                       Scope = "Server";  Default = "openai"; Required = $true;  Desc = "AI provider: mock | openai | gemini" },
    @{ Name = "OPENAI_API_KEY";                     Scope = "Server";  Default = "";       Required = $true;  Desc = "OpenAI API key (secret)" },
    @{ Name = "OPENAI_MODEL";                       Scope = "Server";  Default = "gpt-4o-mini"; Required = $false; Desc = "OpenAI model name" },
    @{ Name = "GEMINI_API_KEY";                     Scope = "Server";  Default = "";       Required = $true;  Desc = "Gemini API key (secret)" },
    @{ Name = "GEMINI_MODEL";                       Scope = "Server";  Default = "gemini-2.0-flash"; Required = $false; Desc = "Gemini model name" },
    @{ Name = "NEXT_PUBLIC_AI_COPILOT_ENABLED";     Scope = "Public";  Default = "false";  Required = $true;  Desc = "Feature flag: AI Copilot visible in UI" },
    @{ Name = "NEXT_PUBLIC_CONTEXT_ENRICH_ENABLED"; Scope = "Public";  Default = "true";   Required = $false; Desc = "Feature flag: Context enrichment" },
    @{ Name = "NEXT_PUBLIC_CONTEXT_ENRICH_MAX_URLS";Scope = "Public";  Default = "3";      Required = $false; Desc = "Max URLs for context enrichment" },
    @{ Name = "AI_MAX_INPUT_CHARS";                 Scope = "Server";  Default = "12000";  Required = $false; Desc = "Max combined input+context chars" }
)

Write-Host ("{0,-45} {1,-8} {2,-10} {3,-15} {4}" -f "Variable", "Scope", "Required", "Default", "Description") -ForegroundColor Yellow
Write-Host ("{0,-45} {1,-8} {2,-10} {3,-15} {4}" -f ("—"*45), ("—"*8), ("—"*10), ("—"*15), ("—"*40)) -ForegroundColor DarkGray

foreach ($v in $vars) {
    $req = if ($v.Required) { "YES" } else { "no" }
    $color = if ($v.Required) { "White" } else { "Gray" }
    Write-Host ("{0,-45} {1,-8} {2,-10} {3,-15} {4}" -f $v.Name, $v.Scope, $req, $v.Default, $v.Desc) -ForegroundColor $color
}

Write-Host ""
Write-Host "IMPORTANT: Never commit actual API keys. Use platform env var injection." -ForegroundColor Red
Write-Host "Staging initial config: NEXT_PUBLIC_AI_COPILOT_ENABLED=false (Copilot OFF)" -ForegroundColor Yellow
Write-Host ""
