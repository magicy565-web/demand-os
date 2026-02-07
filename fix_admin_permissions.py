#!/usr/bin/env python3
"""
Fix Administrator Permissions
Add full permissions for Administrator role to all Phase 2 collections
"""

import requests
import json

DIRECTUS_URL = "https://admin.cnsubscribe.xyz"
EMAIL = "magic@gmail.com"
PASSWORD = "wysk1214"

def login():
    response = requests.post(
        f"{DIRECTUS_URL}/auth/login",
        json={"email": EMAIL, "password": PASSWORD}
    )
    if response.status_code == 200:
        token = response.json()['data']['access_token']
        print(f"✅ Login successful")
        return token
    else:
        print(f"❌ Login failed")
        return None

def get_admin_role_id(token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{DIRECTUS_URL}/roles", headers=headers)
    if response.status_code == 200:
        roles = response.json()['data']
        for role in roles:
            if 'admin' in role['name'].lower():
                print(f"✅ Found Administrator role: {role['id']}")
                return role['id']
    return None

def create_admin_permissions(token, role_id, collection):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    print(f"\n🔧 Setting permissions for: {collection}")
    
    for action in ["create", "read", "update", "delete"]:
        permission_data = {
            "role": role_id,
            "collection": collection,
            "action": action,
            "permissions": None,  # Full access
            "validation": None,
            "presets": None,
            "fields": ["*"]
        }
        
        response = requests.post(
            f"{DIRECTUS_URL}/permissions",
            headers=headers,
            json=permission_data
        )
        
        if response.status_code in [200, 201]:
            print(f"   ✅ {action.upper()}")
        elif "already exists" in response.text.lower():
            print(f"   ⚠️  {action.upper()} (exists)")
        else:
            print(f"   ❌ {action.upper()}: {response.status_code}")

def main():
    print("🚀 Fixing Administrator permissions...\n")
    
    token = login()
    if not token:
        return
    
    admin_role_id = get_admin_role_id(token)
    if not admin_role_id:
        print("❌ Could not find Administrator role")
        return
    
    collections = ["conversations", "image_analyses", "user_preferences"]
    
    for collection in collections:
        create_admin_permissions(token, admin_role_id, collection)
    
    print("\n✅ Administrator permissions fixed!")
    print("   Now try uploading an image again.")

if __name__ == "__main__":
    main()
