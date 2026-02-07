#!/bin/bash

# Directus Schema Setup Script
# 通过 Directus REST API 创建 Collections 和 Fields

DIRECTUS_URL="https://admin.cnsubscribe.xyz"
EMAIL="magic@gmail.com"
PASSWORD="wysk1214"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 开始 Directus 架构设置${NC}\n"

# Step 1: 登录获取token
echo -e "${YELLOW}🔐 正在登录 Directus...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}")

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}❌ 登录失败${NC}"
  echo "Response: $LOGIN_RESPONSE"
  exit 1
fi

echo -e "${GREEN}✅ 登录成功${NC}\n"

# Function to create collection
create_collection() {
  local COLLECTION_NAME=$1
  local COLLECTION_ICON=$2
  local COLLECTION_COLOR=$3
  
  echo -e "${YELLOW}📦 创建 Collection: $COLLECTION_NAME${NC}"
  
  local RESPONSE=$(curl -s -X POST "$DIRECTUS_URL/collections" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"collection\":\"$COLLECTION_NAME\",
      \"meta\":{
        \"icon\":\"$COLLECTION_ICON\",
        \"color\":\"$COLLECTION_COLOR\",
        \"display_template\":null,
        \"preview_url\":null,
        \"note\":null,
        \"translations\":null
      }
    }")
  
  if echo "$RESPONSE" | grep -q '"collection":"'$COLLECTION_NAME; then
    echo -e "${GREEN}✅ Collection '$COLLECTION_NAME' 创建成功${NC}"
    return 0
  else
    echo -e "${RED}❌ 创建失败${NC}"
    echo "Response: $RESPONSE"
    return 1
  fi
}

# Function to create field
create_field() {
  local COLLECTION=$1
  local FIELD_NAME=$2
  local FIELD_TYPE=$3
  local FIELD_CONFIG=$4
  
  echo -e "  📝 添加字段: $FIELD_NAME ($FIELD_TYPE)"
  
  local RESPONSE=$(curl -s -X POST "$DIRECTUS_URL/fields/$COLLECTION" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "{
      \"field\":\"$FIELD_NAME\",
      \"type\":\"$FIELD_TYPE\",
      $FIELD_CONFIG
    }")
  
  if echo "$RESPONSE" | grep -q '"field":"'$FIELD_NAME; then
    echo -e "${GREEN}    ✅ 字段 '$FIELD_NAME' 添加成功${NC}"
    return 0
  else
    # 如果字段已存在，不报错
    if echo "$RESPONSE" | grep -q "already exists"; then
      echo -e "${YELLOW}    ℹ️  字段已存在${NC}"
      return 0
    fi
    echo -e "${RED}    ❌ 添加失败${NC}"
    return 1
  fi
}

# Create conversations collection
create_collection "conversations" "chat" "#3b82f6"
create_field "conversations" "id" "uuid" '"meta":{\"hidden\":true,"readonly":true},"schema":{"is_primary_key":true}'
create_field "conversations" "user_id" "uuid" '"meta":{"interface":"input"}'
create_field "conversations" "tiktok_url" "string" '"meta":{"interface":"input"}'
create_field "conversations" "product_name" "string" '"meta":{"interface":"input"}'
create_field "conversations" "category" "string" '"meta":{"interface":"input"}'
create_field "conversations" "trend_score" "integer" '"meta":{"interface":"input"}'
create_field "conversations" "lifecycle" "string" '"meta":{"interface":"select-dropdown","options":{"choices":[{"text":"Emerging","value":"emerging"},{"text":"Explosive","value":"explosive"},{"text":"Mature","value":"mature"}]}}'
create_field "conversations" "result" "json" '"meta":{"interface":"input-code"}'
create_field "conversations" "notes" "text" '"meta":{"interface":"input-multiline"}'
create_field "conversations" "created_at" "timestamp" '"meta":{"readonly":true}'
create_field "conversations" "updated_at" "timestamp" '"meta":{"readonly":true}'
create_field "conversations" "status" "string" '"meta":{"interface":"select-dropdown","options":{"choices":[{"text":"Draft","value":"draft"},{"text":"Published","value":"published"},{"text":"Archived","value":"archived"}]}},"schema":{"default_value":"draft"}'

echo ""

# Create factories collection
create_collection "factories" "factory" "#ef4444"
create_field "factories" "id" "uuid" '"meta":{"hidden":true,"readonly":true},"schema":{"is_primary_key":true}'
create_field "factories" "name" "string" '"meta":{"interface":"input"}'
create_field "factories" "country" "string" '"meta":{"interface":"input"}'
create_field "factories" "city" "string" '"meta":{"interface":"input"}'
create_field "factories" "categories" "json" '"meta":{"interface":"input-code"}'
create_field "factories" "moq" "integer" '"meta":{"interface":"input"}'
create_field "factories" "certifications" "json" '"meta":{"interface":"input-code"}'
create_field "factories" "contact_email" "string" '"meta":{"interface":"input-email"}'
create_field "factories" "contact_phone" "string" '"meta":{"interface":"input"}'
create_field "factories" "description" "text" '"meta":{"interface":"input-multiline"}'
create_field "factories" "capabilities" "json" '"meta":{"interface":"input-code"}'
create_field "factories" "price_range" "json" '"meta":{"interface":"input-code"}'
create_field "factories" "lead_time_days" "integer" '"meta":{"interface":"input"}'
create_field "factories" "status" "string" '"meta":{"interface":"select-dropdown","options":{"choices":[{"text":"Published","value":"published"},{"text":"Draft","value":"draft"}]}},"schema":{"default_value":"draft"}'
create_field "factories" "created_at" "timestamp" '"meta":{"readonly":true}'
create_field "factories" "updated_at" "timestamp" '"meta":{"readonly":true}'

echo ""

# Create image_analyses collection
create_collection "image_analyses" "image" "#8b5cf6"
create_field "image_analyses" "id" "uuid" '"meta":{"hidden":true,"readonly":true},"schema":{"is_primary_key":true}'
create_field "image_analyses" "user_id" "uuid" '"meta":{"interface":"input"}'
create_field "image_analyses" "image_url" "string" '"meta":{"interface":"input"}'
create_field "image_analyses" "image_filename" "string" '"meta":{"interface":"input"}'
create_field "image_analyses" "detected_category" "string" '"meta":{"interface":"input"}'
create_field "image_analyses" "confidence_score" "float" '"meta":{"interface":"input"}'
create_field "image_analyses" "similar_products" "json" '"meta":{"interface":"input-code"}'
create_field "image_analyses" "matched_factories" "json" '"meta":{"interface":"input-code"}'
create_field "image_analyses" "analysis_result" "json" '"meta":{"interface":"input-code"}'
create_field "image_analyses" "created_at" "timestamp" '"meta":{"readonly":true}'
create_field "image_analyses" "status" "string" '"meta":{"interface":"select-dropdown","options":{"choices":[{"text":"Processing","value":"processing"},{"text":"Completed","value":"completed"},{"text":"Failed","value":"failed"}]}},"schema":{"default_value":"processing"}'

echo ""

# Create user_preferences collection
create_collection "user_preferences" "settings" "#06b6d4"
create_field "user_preferences" "id" "uuid" '"meta":{"hidden":true,"readonly":true},"schema":{"is_primary_key":true}'
create_field "user_preferences" "user_id" "uuid" '"meta":{"interface":"input"}'
create_field "user_preferences" "theme" "string" '"meta":{"interface":"select-dropdown","options":{"choices":[{"text":"Light","value":"light"},{"text":"Dark","value":"dark"},{"text":"Auto","value":"auto"}]}},"schema":{"default_value":"auto"}'
create_field "user_preferences" "language" "string" '"meta":{"interface":"select-dropdown","options":{"choices":[{"text":"中文 (简体)","value":"zh-CN"},{"text":"English","value":"en-US"}]}},"schema":{"default_value":"zh-CN"}'
create_field "user_preferences" "default_category" "string" '"meta":{"interface":"input"}'
create_field "user_preferences" "notification_enabled" "boolean" '"meta":{"interface":"boolean"},"schema":{"default_value":true}'
create_field "user_preferences" "preferences" "json" '"meta":{"interface":"input-code"}'
create_field "user_preferences" "created_at" "timestamp" '"meta":{"readonly":true}'
create_field "user_preferences" "updated_at" "timestamp" '"meta":{"readonly":true}'

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Directus 架构设置完成！${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "📊 创建的 Collections:"
echo "  - conversations (对话历史记录)"
echo "  - factories (工厂数据)"
echo "  - image_analyses (图片分析记录)"
echo "  - user_preferences (用户偏好设置)"
echo ""
echo "下一步："
echo "1. 访问 https://admin.cnsubscribe.xyz/admin/ 验证"
echo "2. 设置权限规则"
echo "3. 添加示例数据"
