$DirectusUrl = "https://admin.cnsubscribe.xyz"
$Email = "magic@gmail.com"
$Password = "wysk1214"

[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}

Write-Host "Setting up Directus fields..." -ForegroundColor Yellow

# Login
$loginBody = @{ email = $Email; password = $Password } | ConvertTo-Json
$loginResponse = Invoke-WebRequest -Uri "$DirectusUrl/auth/login" -Method POST -ContentType "application/json" -Body $loginBody -UseBasicParsing
$token = ($loginResponse.Content | ConvertFrom-Json).data.access_token

Write-Host "Token obtained. Configuring fields..." -ForegroundColor Green
Write-Host ""

# Function to add field
function Add-Field {
    param([string]$Coll, [string]$Name, [string]$Type)
    
    $body = @{ 
        field = $Name
        type = $Type
    } | ConvertTo-Json
    
    try {
        Invoke-WebRequest -Uri "$DirectusUrl/fields/$Coll" `
            -Method POST `
            -ContentType "application/json" `
            -Headers @{"Authorization" = "Bearer $token"} `
            -Body $body `
            -UseBasicParsing | Out-Null
        Write-Host "  ✓ $Name" -ForegroundColor Green
    } catch {
        $resp = $_.Exception.Response
        if ($resp.StatusCode -eq 409) {
            Write-Host "  - $Name (exists)" -ForegroundColor Yellow
        } else {
            Write-Host "  ✗ $Name" -ForegroundColor Red
        }
    }
}

# conversations fields
Write-Host "Conversations:" -ForegroundColor Cyan
Add-Field "conversations" "id" "uuid"
Add-Field "conversations" "user_id" "uuid"
Add-Field "conversations" "tiktok_url" "string"
Add-Field "conversations" "product_name" "string"
Add-Field "conversations" "category" "string"
Add-Field "conversations" "trend_score" "integer"
Add-Field "conversations" "lifecycle" "string"
Add-Field "conversations" "result" "json"
Add-Field "conversations" "notes" "text"
Add-Field "conversations" "status" "string"
Add-Field "conversations" "created_at" "timestamp"
Add-Field "conversations" "updated_at" "timestamp"

Write-Host ""

# factories fields  
Write-Host "Factories:" -ForegroundColor Cyan
Add-Field "factories" "id" "uuid"
Add-Field "factories" "name" "string"
Add-Field "factories" "country" "string"
Add-Field "factories" "city" "string"
Add-Field "factories" "categories" "json"
Add-Field "factories" "moq" "integer"
Add-Field "factories" "certifications" "json"
Add-Field "factories" "contact_email" "string"
Add-Field "factories" "contact_phone" "string"
Add-Field "factories" "description" "text"
Add-Field "factories" "capabilities" "json"
Add-Field "factories" "price_range" "json"
Add-Field "factories" "lead_time_days" "integer"
Add-Field "factories" "status" "string"
Add-Field "factories" "created_at" "timestamp"
Add-Field "factories" "updated_at" "timestamp"

Write-Host ""

# image_analyses fields
Write-Host "Image Analyses:" -ForegroundColor Cyan
Add-Field "image_analyses" "id" "uuid"
Add-Field "image_analyses" "user_id" "uuid"
Add-Field "image_analyses" "image_url" "string"
Add-Field "image_analyses" "image_filename" "string"
Add-Field "image_analyses" "detected_category" "string"
Add-Field "image_analyses" "confidence_score" "float"
Add-Field "image_analyses" "similar_products" "json"
Add-Field "image_analyses" "matched_factories" "json"
Add-Field "image_analyses" "analysis_result" "json"
Add-Field "image_analyses" "status" "string"
Add-Field "image_analyses" "created_at" "timestamp"

Write-Host ""

# user_preferences fields
Write-Host "User Preferences:" -ForegroundColor Cyan
Add-Field "user_preferences" "id" "uuid"
Add-Field "user_preferences" "user_id" "uuid"
Add-Field "user_preferences" "theme" "string"
Add-Field "user_preferences" "language" "string"
Add-Field "user_preferences" "default_category" "string"
Add-Field "user_preferences" "notification_enabled" "boolean"
Add-Field "user_preferences" "preferences" "json"
Add-Field "user_preferences" "created_at" "timestamp"
Add-Field "user_preferences" "updated_at" "timestamp"

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
