Write-Host "------------------------------------------------"
Write-Host "OpenNezt: Running custom setup script (Windows)..."
Write-Host "------------------------------------------------"

# Practical Example: Auto-create .env from .env.example
# PSScriptRoot is the directory containing this script (.opennezt folder)
# We need to go up one level to the project root
$projectRoot = Split-Path $PSScriptRoot -Parent
$examplePath = Join-Path $projectRoot ".env.example"
$envPath = Join-Path $projectRoot ".env"

Write-Host "Project root: $projectRoot"
Write-Host "Checking for: $examplePath"

if (Test-Path $examplePath) {
    if (-not (Test-Path $envPath)) {
        Write-Host "Creating .env from .env.example..."
        Copy-Item $examplePath $envPath
        Write-Host "SUCCESS: .env file created"
    } else {
        Write-Host "Note: .env already exists, skipping creation"
    }
} else {
    Write-Host "Warning: .env.example not found at $examplePath"
}

# Create a test file to verify the script ran
$logPath = Join-Path $projectRoot "setup_test.txt"
$now = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
"Setup script executed successfully on $now" | Out-File -FilePath $logPath -Encoding utf8

Write-Host "SUCCESS: Custom setup complete!"
Write-Host "------------------------------------------------"
