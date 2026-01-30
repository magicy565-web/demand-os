# Test connectivity to saas.cnsubscribe.xyz

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Testing Connectivity to saas.cnsubscribe.xyz" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: DNS Resolution
Write-Host "1. Testing DNS Resolution..." -ForegroundColor Yellow
try {
    $dnsResult = [System.Net.Dns]::GetHostAddresses("saas.cnsubscribe.xyz")
    Write-Host "✓ DNS Resolution Successful" -ForegroundColor Green
    Write-Host "  IP: $($dnsResult[0].IPAddressToString)" -ForegroundColor Green
} catch {
    Write-Host "✗ DNS Resolution Failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test 2: Ping Test
Write-Host "2. Testing Ping..." -ForegroundColor Yellow
try {
    $pingResult = Test-Connection -ComputerName "saas.cnsubscribe.xyz" -Count 1 -ErrorAction Stop
    Write-Host "✓ Ping Successful" -ForegroundColor Green
    Write-Host "  Response Time: $($pingResult.ResponseTime)ms" -ForegroundColor Green
} catch {
    Write-Host "✗ Ping Failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test 3: HTTPS Connection
Write-Host "3. Testing HTTPS Connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://saas.cnsubscribe.xyz" -Method Head -ErrorAction Stop -TimeoutSec 10
    Write-Host "✓ HTTPS Connection Successful" -ForegroundColor Green
    Write-Host "  Status Code: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "⚠ HTTPS Connection Result: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""

# Test 4: Directus API Endpoint
Write-Host "4. Testing Directus API Endpoint..." -ForegroundColor Yellow
try {
    $apiResponse = Invoke-WebRequest -Uri "https://saas.cnsubscribe.xyz/api/server/info" -ErrorAction Stop -TimeoutSec 10
    Write-Host "✓ API Endpoint Accessible" -ForegroundColor Green
    Write-Host "  Status Code: $($apiResponse.StatusCode)" -ForegroundColor Green
    Write-Host "  Content-Type: $($apiResponse.Headers['Content-Type'])" -ForegroundColor Green
} catch {
    Write-Host "⚠ API Endpoint Status: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""

# Test 5: Environment Check
Write-Host "5. Checking Environment Variables..." -ForegroundColor Yellow
$envFile = "d:\Demand-os-v4\web\.env.local"
$prodEnvFile = "d:\Demand-os-v4\web\.env.production"

if (Test-Path $envFile) {
    Write-Host "✓ .env.local exists" -ForegroundColor Green
    Get-Content $envFile | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "✗ .env.local not found" -ForegroundColor Red
}

Write-Host ""

if (Test-Path $prodEnvFile) {
    Write-Host "✓ .env.production exists" -ForegroundColor Green
    Get-Content $prodEnvFile | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "⚠ .env.production not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Connectivity Test Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
