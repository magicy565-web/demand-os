$DirectusUrl = "https://admin.cnsubscribe.xyz"
$Email = "magic@gmail.com"
$Password = "wysk1214"

# Disable SSL validation for PowerShell 5.1
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}

Write-Host "Starting Directus schema setup..." -ForegroundColor Yellow
Write-Host ""

# Step 1: Login
Write-Host "Logging in to Directus..." -ForegroundColor Yellow

$loginBody = @{
    email = $Email
    password = $Password
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "$DirectusUrl/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody `
        -UseBasicParsing
    
    $loginData = $loginResponse.Content | ConvertFrom-Json
    $token = $loginData.data.access_token
    
    if (-not $token) {
        Write-Host "Login failed" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Login successful" -ForegroundColor Green
} catch {
    Write-Host "Login request failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Function to create collection
function New-DirectusCollection {
    param([string]$Name, [string]$Icon, [string]$Color)
    
    Write-Host "Creating collection: $Name" -ForegroundColor Yellow
    
    $body = @{
        collection = $Name
        meta = @{ icon = $Icon; color = $Color }
    } | ConvertTo-Json
    
    try {
        $response = Invoke-WebRequest -Uri "$DirectusUrl/collections" `
            -Method POST `
            -ContentType "application/json" `
            -Headers @{"Authorization" = "Bearer $token"} `
            -Body $body `
            -UseBasicParsing
        
        $data = $response.Content | ConvertFrom-Json
        if ($data.data.collection -eq $Name) {
            Write-Host "  [OK]" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  [FAIL]" -ForegroundColor Red
            return $false
        }
    } catch {
        if ($_.Exception.Response.StatusCode -eq 409) {
            Write-Host "  [EXISTS]" -ForegroundColor Yellow
            return $true
        } else {
            Write-Host "  [FAIL] $_" -ForegroundColor Red
            return $false
        }
    }
}

# Function to create field
function New-DirectusField {
    param([string]$Coll, [string]$Name, [string]$Type, [hashtable]$Config)
    
    Write-Host "    Adding: $Name" -NoNewline
    
    $body = @{ field = $Name; type = $Type }
    if ($Config) { $body += $Config }
    
    try {
        $response = Invoke-WebRequest -Uri "$DirectusUrl/fields/$Coll" `
            -Method POST `
            -ContentType "application/json" `
            -Headers @{"Authorization" = "Bearer $token"} `
            -Body ($body | ConvertTo-Json -Depth 3) `
            -UseBasicParsing
        
        $data = $response.Content | ConvertFrom-Json
        if ($data.data.field -eq $Name) {
            Write-Host " [OK]" -ForegroundColor Green
        } else {
            Write-Host " [FAIL]" -ForegroundColor Red
        }
    } catch {
        if ($_.Exception.Response.StatusCode -eq 409) {
            Write-Host " [EXISTS]" -ForegroundColor Yellow
        } else {
            Write-Host " [FAIL]" -ForegroundColor Red
        }
    }
}

# Create collections
New-DirectusCollection "conversations" "chat" "#3b82f6"
Start-Sleep -Milliseconds 500
New-DirectusCollection "factories" "factory" "#ef4444"
Start-Sleep -Milliseconds 500
New-DirectusCollection "image_analyses" "image" "#8b5cf6"
Start-Sleep -Milliseconds 500
New-DirectusCollection "user_preferences" "settings" "#06b6d4"

Write-Host ""

# Configure fields - conversations
Write-Host "Configuring conversations:" -ForegroundColor Cyan
New-DirectusField "conversations" "id" "uuid" @{meta=@{hidden=$true;readonly=$true};schema=@{is_primary_key=$true}}
New-DirectusField "conversations" "user_id" "uuid" @{meta=@{interface="input"}}
New-DirectusField "conversations" "tiktok_url" "string" @{meta=@{interface="input"}}
New-DirectusField "conversations" "product_name" "string" @{meta=@{interface="input"}}
New-DirectusField "conversations" "category" "string" @{meta=@{interface="input"}}
New-DirectusField "conversations" "trend_score" "integer" @{meta=@{interface="input"}}
New-DirectusField "conversations" "result" "json" @{meta=@{interface="input-code"}}
New-DirectusField "conversations" "notes" "text" @{meta=@{interface="input-multiline"}}
New-DirectusField "conversations" "created_at" "timestamp" @{meta=@{readonly=$true}}
New-DirectusField "conversations" "updated_at" "timestamp" @{meta=@{readonly=$true}}
New-DirectusField "conversations" "status" "string" @{meta=@{interface="select-dropdown"}}

Write-Host ""

# Configure fields - factories
Write-Host "Configuring factories:" -ForegroundColor Cyan
New-DirectusField "factories" "id" "uuid" @{meta=@{hidden=$true;readonly=$true};schema=@{is_primary_key=$true}}
New-DirectusField "factories" "name" "string" @{meta=@{interface="input"}}
New-DirectusField "factories" "country" "string" @{meta=@{interface="input"}}
New-DirectusField "factories" "city" "string" @{meta=@{interface="input"}}
New-DirectusField "factories" "categories" "json" @{meta=@{interface="input-code"}}
New-DirectusField "factories" "moq" "integer" @{meta=@{interface="input"}}
New-DirectusField "factories" "certifications" "json" @{meta=@{interface="input-code"}}
New-DirectusField "factories" "contact_email" "string" @{meta=@{interface="input-email"}}
New-DirectusField "factories" "contact_phone" "string" @{meta=@{interface="input"}}
New-DirectusField "factories" "description" "text" @{meta=@{interface="input-multiline"}}
New-DirectusField "factories" "capabilities" "json" @{meta=@{interface="input-code"}}
New-DirectusField "factories" "price_range" "json" @{meta=@{interface="input-code"}}
New-DirectusField "factories" "lead_time_days" "integer" @{meta=@{interface="input"}}
New-DirectusField "factories" "status" "string" @{meta=@{interface="select-dropdown"}}
New-DirectusField "factories" "created_at" "timestamp" @{meta=@{readonly=$true}}
New-DirectusField "factories" "updated_at" "timestamp" @{meta=@{readonly=$true}}

Write-Host ""

# Configure fields - image_analyses
Write-Host "Configuring image_analyses:" -ForegroundColor Cyan
New-DirectusField "image_analyses" "id" "uuid" @{meta=@{hidden=$true;readonly=$true};schema=@{is_primary_key=$true}}
New-DirectusField "image_analyses" "user_id" "uuid" @{meta=@{interface="input"}}
New-DirectusField "image_analyses" "image_url" "string" @{meta=@{interface="input"}}
New-DirectusField "image_analyses" "image_filename" "string" @{meta=@{interface="input"}}
New-DirectusField "image_analyses" "detected_category" "string" @{meta=@{interface="input"}}
New-DirectusField "image_analyses" "confidence_score" "float" @{meta=@{interface="input"}}
New-DirectusField "image_analyses" "similar_products" "json" @{meta=@{interface="input-code"}}
New-DirectusField "image_analyses" "matched_factories" "json" @{meta=@{interface="input-code"}}
New-DirectusField "image_analyses" "analysis_result" "json" @{meta=@{interface="input-code"}}
New-DirectusField "image_analyses" "created_at" "timestamp" @{meta=@{readonly=$true}}
New-DirectusField "image_analyses" "status" "string" @{meta=@{interface="select-dropdown"}}

Write-Host ""

# Configure fields - user_preferences
Write-Host "Configuring user_preferences:" -ForegroundColor Cyan
New-DirectusField "user_preferences" "id" "uuid" @{meta=@{hidden=$true;readonly=$true};schema=@{is_primary_key=$true}}
New-DirectusField "user_preferences" "user_id" "uuid" @{meta=@{interface="input"}}
New-DirectusField "user_preferences" "theme" "string" @{meta=@{interface="select-dropdown"}}
New-DirectusField "user_preferences" "language" "string" @{meta=@{interface="select-dropdown"}}
New-DirectusField "user_preferences" "default_category" "string" @{meta=@{interface="input"}}
New-DirectusField "user_preferences" "notification_enabled" "boolean" @{meta=@{interface="boolean"}}
New-DirectusField "user_preferences" "preferences" "json" @{meta=@{interface="input-code"}}
New-DirectusField "user_preferences" "created_at" "timestamp" @{meta=@{readonly=$true}}
New-DirectusField "user_preferences" "updated_at" "timestamp" @{meta=@{readonly=$true}}

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "SUCCESS: Schema setup complete!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next: Visit https://admin.cnsubscribe.xyz/admin/ to verify" -ForegroundColor Yellow
