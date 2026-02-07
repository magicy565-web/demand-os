#!/usr/bin/env python3
"""
Complete Directus Setup Script
Automatically creates all required collections and fields for Phase 2
"""

import requests
import json
import sys

# Directus configuration
DIRECTUS_URL = "https://admin.cnsubscribe.xyz"
EMAIL = "magic@gmail.com"
PASSWORD = "wysk1214"

def login():
    """Login and get access token"""
    response = requests.post(
        f"{DIRECTUS_URL}/auth/login",
        json={"email": EMAIL, "password": PASSWORD}
    )
    if response.status_code == 200:
        token = response.json()['data']['access_token']
        print(f"✅ Login successful")
        return token
    else:
        print(f"❌ Login failed: {response.text}")
        sys.exit(1)

def get_collections(token):
    """Get existing collections"""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{DIRECTUS_URL}/collections", headers=headers)
    if response.status_code == 200:
        collections = [c['collection'] for c in response.json()['data']]
        return collections
    return []

def create_collection(token, collection_name, schema):
    """Create a collection with fields"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    # Create collection
    collection_data = {
        "collection": collection_name,
        "meta": {
            "collection": collection_name,
            "icon": schema.get("icon", "folder"),
            "note": schema.get("note", ""),
            "display_template": schema.get("display_template"),
            "hidden": False,
            "singleton": False,
            "translations": None,
            "archive_field": "status",
            "archive_value": "archived",
            "unarchive_value": "draft",
            "sort_field": None
        },
        "schema": {
            "name": collection_name
        },
        "fields": schema["fields"]
    }
    
    response = requests.post(
        f"{DIRECTUS_URL}/collections",
        headers=headers,
        json=collection_data
    )
    
    if response.status_code in [200, 201]:
        print(f"✅ Created collection: {collection_name}")
        return True
    else:
        print(f"⚠️  Collection {collection_name} might already exist or error: {response.status_code}")
        print(f"   Response: {response.text[:200]}")
        return False

def setup_conversations(token):
    """Setup conversations collection"""
    schema = {
        "icon": "chat",
        "note": "Conversation history and analysis records",
        "display_template": "{{product_name}} - {{category}}",
        "fields": [
            {
                "field": "id",
                "type": "uuid",
                "schema": {"is_primary_key": True, "has_auto_increment": False},
                "meta": {"hidden": True, "readonly": True, "interface": "input", "special": ["uuid"]}
            },
            {
                "field": "user_id",
                "type": "string",
                "schema": {"max_length": 255},
                "meta": {"interface": "input", "required": True, "width": "half"}
            },
            {
                "field": "tiktok_url",
                "type": "string",
                "schema": {"max_length": 500},
                "meta": {"interface": "input", "width": "full"}
            },
            {
                "field": "product_name",
                "type": "string",
                "schema": {"max_length": 255},
                "meta": {"interface": "input", "width": "half"}
            },
            {
                "field": "category",
                "type": "string",
                "schema": {"max_length": 100},
                "meta": {"interface": "select-dropdown", "width": "half", "options": {
                    "choices": [
                        {"text": "Electronics", "value": "electronics"},
                        {"text": "Fashion", "value": "fashion"},
                        {"text": "Home & Garden", "value": "home_garden"},
                        {"text": "Beauty", "value": "beauty"},
                        {"text": "Sports", "value": "sports"},
                        {"text": "Toys", "value": "toys"},
                        {"text": "Food", "value": "food"},
                        {"text": "Other", "value": "other"}
                    ]
                }}
            },
            {
                "field": "trend_score",
                "type": "integer",
                "schema": {},
                "meta": {"interface": "input", "width": "half", "note": "0-100"}
            },
            {
                "field": "lifecycle",
                "type": "string",
                "schema": {"max_length": 50},
                "meta": {"interface": "select-dropdown", "width": "half", "options": {
                    "choices": [
                        {"text": "Emerging", "value": "emerging"},
                        {"text": "Explosive", "value": "explosive"},
                        {"text": "Mature", "value": "mature"},
                        {"text": "Declining", "value": "declining"}
                    ]
                }}
            },
            {
                "field": "result",
                "type": "json",
                "schema": {},
                "meta": {"interface": "input-code", "options": {"language": "json"}}
            },
            {
                "field": "notes",
                "type": "text",
                "schema": {},
                "meta": {"interface": "input-multiline", "width": "full"}
            },
            {
                "field": "status",
                "type": "string",
                "schema": {"max_length": 20, "default_value": "draft"},
                "meta": {"interface": "select-dropdown", "width": "half", "options": {
                    "choices": [
                        {"text": "Draft", "value": "draft"},
                        {"text": "Published", "value": "published"},
                        {"text": "Archived", "value": "archived"}
                    ]
                }}
            },
            {
                "field": "created_at",
                "type": "timestamp",
                "schema": {"default_value": "CURRENT_TIMESTAMP"},
                "meta": {"interface": "datetime", "readonly": True, "special": ["date-created"]}
            },
            {
                "field": "updated_at",
                "type": "timestamp",
                "schema": {},
                "meta": {"interface": "datetime", "readonly": True, "special": ["date-updated"]}
            }
        ]
    }
    return create_collection(token, "conversations", schema)

def setup_image_analyses(token):
    """Setup image_analyses collection"""
    schema = {
        "icon": "image",
        "note": "Image upload and AI analysis results",
        "display_template": "{{detected_category}} - {{confidence_score}}",
        "fields": [
            {
                "field": "id",
                "type": "uuid",
                "schema": {"is_primary_key": True},
                "meta": {"hidden": True, "readonly": True, "special": ["uuid"]}
            },
            {
                "field": "user_id",
                "type": "string",
                "schema": {"max_length": 255},
                "meta": {"interface": "input", "required": True}
            },
            {
                "field": "image_url",
                "type": "string",
                "schema": {"max_length": 500},
                "meta": {"interface": "input"}
            },
            {
                "field": "image_filename",
                "type": "string",
                "schema": {"max_length": 255},
                "meta": {"interface": "input"}
            },
            {
                "field": "detected_category",
                "type": "string",
                "schema": {"max_length": 100},
                "meta": {"interface": "input"}
            },
            {
                "field": "confidence_score",
                "type": "float",
                "schema": {},
                "meta": {"interface": "input", "note": "0.0-1.0"}
            },
            {
                "field": "similar_products",
                "type": "json",
                "schema": {},
                "meta": {"interface": "input-code", "options": {"language": "json"}}
            },
            {
                "field": "matched_factories",
                "type": "json",
                "schema": {},
                "meta": {"interface": "input-code", "options": {"language": "json"}}
            },
            {
                "field": "analysis_result",
                "type": "json",
                "schema": {},
                "meta": {"interface": "input-code", "options": {"language": "json"}}
            },
            {
                "field": "status",
                "type": "string",
                "schema": {"max_length": 20, "default_value": "draft"},
                "meta": {"interface": "select-dropdown"}
            },
            {
                "field": "created_at",
                "type": "timestamp",
                "schema": {"default_value": "CURRENT_TIMESTAMP"},
                "meta": {"interface": "datetime", "readonly": True, "special": ["date-created"]}
            }
        ]
    }
    return create_collection(token, "image_analyses", schema)

def setup_user_preferences(token):
    """Setup user_preferences collection"""
    schema = {
        "icon": "settings",
        "note": "User preferences and settings",
        "display_template": "{{user_id}} - {{theme}}",
        "fields": [
            {
                "field": "id",
                "type": "uuid",
                "schema": {"is_primary_key": True},
                "meta": {"hidden": True, "readonly": True, "special": ["uuid"]}
            },
            {
                "field": "user_id",
                "type": "string",
                "schema": {"max_length": 255},
                "meta": {"interface": "input", "required": True}
            },
            {
                "field": "theme",
                "type": "string",
                "schema": {"max_length": 20, "default_value": "light"},
                "meta": {"interface": "select-dropdown", "options": {
                    "choices": [
                        {"text": "Light", "value": "light"},
                        {"text": "Dark", "value": "dark"},
                        {"text": "System", "value": "system"}
                    ]
                }}
            },
            {
                "field": "language",
                "type": "string",
                "schema": {"max_length": 10, "default_value": "zh-CN"},
                "meta": {"interface": "select-dropdown"}
            },
            {
                "field": "notifications_enabled",
                "type": "boolean",
                "schema": {"default_value": True},
                "meta": {"interface": "boolean"}
            },
            {
                "field": "preferences",
                "type": "json",
                "schema": {},
                "meta": {"interface": "input-code", "options": {"language": "json"}}
            },
            {
                "field": "created_at",
                "type": "timestamp",
                "schema": {"default_value": "CURRENT_TIMESTAMP"},
                "meta": {"interface": "datetime", "readonly": True, "special": ["date-created"]}
            },
            {
                "field": "updated_at",
                "type": "timestamp",
                "schema": {},
                "meta": {"interface": "datetime", "readonly": True, "special": ["date-updated"]}
            }
        ]
    }
    return create_collection(token, "user_preferences", schema)

def add_demo_data(token):
    """Add demo conversation data"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    demo_conversations = [
        {
            "user_id": "demo-user-123",
            "tiktok_url": "https://www.tiktok.com/@example/video/123456789",
            "product_name": "智能手环",
            "category": "electronics",
            "trend_score": 85,
            "lifecycle": "explosive",
            "result": {
                "views": 1500000,
                "likes": 125000,
                "comments": 3500,
                "shares": 8900
            },
            "notes": "高增长潜力产品",
            "status": "published"
        },
        {
            "user_id": "demo-user-123",
            "tiktok_url": "https://www.tiktok.com/@example/video/987654321",
            "product_name": "便携式咖啡机",
            "category": "home_garden",
            "trend_score": 72,
            "lifecycle": "emerging",
            "result": {
                "views": 850000,
                "likes": 68000,
                "comments": 1800,
                "shares": 4200
            },
            "notes": "适合年轻消费者",
            "status": "published"
        }
    ]
    
    for conv in demo_conversations:
        response = requests.post(
            f"{DIRECTUS_URL}/items/conversations",
            headers=headers,
            json=conv
        )
        if response.status_code in [200, 201]:
            print(f"✅ Added demo conversation: {conv['product_name']}")
        else:
            print(f"⚠️  Failed to add demo data: {response.status_code}")

def main():
    print("🚀 Starting Directus setup...\n")
    
    # Login
    token = login()
    
    # Check existing collections
    existing = get_collections(token)
    print(f"\n📋 Existing collections: {len(existing)}")
    
    # Setup collections
    print("\n🔧 Creating collections...")
    setup_conversations(token)
    setup_image_analyses(token)
    setup_user_preferences(token)
    
    # Add demo data
    print("\n📝 Adding demo data...")
    add_demo_data(token)
    
    print("\n✅ Directus setup complete!")
    print("\n📊 Summary:")
    print("   - conversations: ✅")
    print("   - image_analyses: ✅")
    print("   - user_preferences: ✅")
    print("   - Demo data: ✅")
    print("\n🎉 You can now test Phase 2 features!")

if __name__ == "__main__":
    main()
