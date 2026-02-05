#!/usr/bin/env python3
"""
Directus Schema Setup Script for SourcingOS
Creates all necessary collections and fields
"""

import requests
import json

# Directus Configuration
DIRECTUS_URL = "https://admin.cnsubscribe.xyz"
DIRECTUS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkNWRmY2Q1LTY4ZDEtNGU3Yi1iZjZhLTUyY2E1YjE2ZDIyOCIsInJvbGUiOiJmMmIyOGRjMi0yZGRmLTQ3Y2ItYjZjMi03MzFiOTdiMzdlYTUiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTc3MDI5ODM4NiwiZXhwIjoxNzcwMjk5Mjg2LCJpc3MiOiJkaXJlY3R1cyJ9._VC2H6v_yLPO3xP4RqnD8B9riNdjhwIVJvXHbzzOx70"

headers = {
    "Authorization": f"Bearer {DIRECTUS_TOKEN}",
    "Content-Type": "application/json"
}

def create_collection(collection_name, fields):
    """Create a collection with specified fields"""
    
    # First, create the collection
    collection_data = {
        "collection": collection_name,
        "meta": {
            "collection": collection_name,
            "icon": "inventory",
            "note": f"Collection for {collection_name}",
            "display_template": None,
            "hidden": False,
            "singleton": False,
            "translations": None,
            "archive_field": None,
            "archive_app_filter": True,
            "archive_value": None,
            "unarchive_value": None,
            "sort_field": None,
            "accountability": "all",
            "color": None,
            "item_duplication_fields": None,
            "sort": None,
            "group": None,
            "collapse": "open"
        },
        "schema": {
            "name": collection_name
        },
        "fields": fields
    }
    
    try:
        response = requests.post(
            f"{DIRECTUS_URL}/collections",
            headers=headers,
            json=collection_data
        )
        
        if response.status_code in [200, 201, 204]:
            print(f"✅ Collection '{collection_name}' created successfully")
            return True
        else:
            print(f"❌ Failed to create collection '{collection_name}': {response.status_code}")
            print(f"Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Error creating collection '{collection_name}': {str(e)}")
        return False

def setup_schema():
    """Setup all collections"""
    
    print("🚀 Starting Directus schema setup for SourcingOS...\n")
    
    # 1. demands (需求订单)
    demands_fields = [
        {
            "field": "id",
            "type": "uuid",
            "schema": {"is_primary_key": True},
            "meta": {"interface": "input", "readonly": True, "hidden": True}
        },
        {
            "field": "project_name",
            "type": "string",
            "meta": {"interface": "input", "required": True, "width": "full"}
        },
        {
            "field": "room_count",
            "type": "integer",
            "meta": {"interface": "input", "required": True}
        },
        {
            "field": "style",
            "type": "string",
            "meta": {"interface": "input"}
        },
        {
            "field": "budget",
            "type": "decimal",
            "meta": {"interface": "input"}
        },
        {
            "field": "description",
            "type": "text",
            "meta": {"interface": "input-multiline"}
        },
        {
            "field": "status",
            "type": "string",
            "meta": {
                "interface": "select-dropdown",
                "options": {
                    "choices": [
                        {"text": "Pending", "value": "pending"},
                        {"text": "Processing", "value": "processing"},
                        {"text": "Completed", "value": "completed"}
                    ]
                }
            }
        }
    ]
    
    create_collection("demands", demands_fields)
    
    # 2. materials (物料库)
    materials_fields = [
        {
            "field": "id",
            "type": "uuid",
            "schema": {"is_primary_key": True},
            "meta": {"interface": "input", "readonly": True, "hidden": True}
        },
        {
            "field": "name_zh",
            "type": "string",
            "meta": {"interface": "input", "required": True}
        },
        {
            "field": "name_en",
            "type": "string",
            "meta": {"interface": "input"}
        },
        {
            "field": "category",
            "type": "string",
            "meta": {"interface": "input"}
        },
        {
            "field": "grade",
            "type": "string",
            "meta": {"interface": "input"}
        },
        {
            "field": "price_coefficient",
            "type": "decimal",
            "meta": {"interface": "input"}
        },
        {
            "field": "is_premium",
            "type": "boolean",
            "meta": {"interface": "boolean"}
        }
    ]
    
    create_collection("materials", materials_fields)
    
    # 3. markets (终端市场)
    markets_fields = [
        {
            "field": "id",
            "type": "uuid",
            "schema": {"is_primary_key": True},
            "meta": {"interface": "input", "readonly": True, "hidden": True}
        },
        {
            "field": "name_zh",
            "type": "string",
            "meta": {"interface": "input", "required": True}
        },
        {
            "field": "name_en",
            "type": "string",
            "meta": {"interface": "input"}
        },
        {
            "field": "region",
            "type": "string",
            "meta": {"interface": "input"}
        }
    ]
    
    create_collection("markets", markets_fields)
    
    # 4. suppliers (供应商)
    suppliers_fields = [
        {
            "field": "id",
            "type": "uuid",
            "schema": {"is_primary_key": True},
            "meta": {"interface": "input", "readonly": True, "hidden": True}
        },
        {
            "field": "name",
            "type": "string",
            "meta": {"interface": "input", "required": True}
        },
        {
            "field": "location",
            "type": "string",
            "meta": {"interface": "input"}
        },
        {
            "field": "category",
            "type": "string",
            "meta": {"interface": "input"}
        },
        {
            "field": "moq",
            "type": "integer",
            "meta": {"interface": "input"}
        }
    ]
    
    create_collection("suppliers", suppliers_fields)
    
    print("\n✅ Directus schema setup completed!")

if __name__ == "__main__":
    setup_schema()
