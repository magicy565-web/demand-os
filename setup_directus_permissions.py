#!/usr/bin/env python3
"""
Configure Directus Permissions
Set up public and authenticated user permissions for Phase 2 collections
"""

import requests
import json
import sys

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

def get_roles(token):
    """Get all roles"""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{DIRECTUS_URL}/roles", headers=headers)
    if response.status_code == 200:
        roles = response.json()['data']
        print(f"\n📋 Available roles:")
        for role in roles:
            print(f"   - {role['name']} (ID: {role['id']})")
        return roles
    return []

def get_or_create_public_role(token):
    """Get or create the public role"""
    roles = get_roles(token)
    
    # Check if Public role exists
    for role in roles:
        if role['name'].lower() == 'public':
            return role['id']
    
    # Create Public role if it doesn't exist
    print("\n🔧 Creating Public role...")
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    role_data = {
        "name": "Public",
        "icon": "public",
        "description": "Public access role for unauthenticated users",
        "admin_access": False,
        "app_access": False
    }
    
    response = requests.post(
        f"{DIRECTUS_URL}/roles",
        headers=headers,
        json=role_data
    )
    
    if response.status_code in [200, 201]:
        role_id = response.json()['data']['id']
        print(f"✅ Created Public role (ID: {role_id})")
        return role_id
    else:
        print(f"❌ Failed to create Public role: {response.text}")
        return None

def create_permissions(token, role_id, collection, permissions):
    """Create permissions for a collection"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    for action in permissions:
        permission_data = {
            "role": role_id,
            "collection": collection,
            "action": action,
            "policy": str(hash(f"{role_id}-{collection}-{action}"))[:16],  # Unique policy ID
            "permissions": None,  # No restrictions (allow all)
            "validation": None,   # No validation rules
            "presets": None,
            "fields": ["*"]     # All fields
        }
        
        response = requests.post(
            f"{DIRECTUS_URL}/permissions",
            headers=headers,
            json=permission_data
        )
        
        if response.status_code in [200, 201]:
            print(f"   ✅ {action.upper()}")
        elif response.status_code == 400 and "already exists" in response.text.lower():
            print(f"   ⚠️  {action.upper()} (already exists)")
        else:
            print(f"   ❌ {action.upper()} failed: {response.status_code}")
            print(f"      {response.text[:200]}")

def setup_collection_permissions(token, role_id, collection_name):
    """Setup full CRUD permissions for a collection"""
    print(f"\n🔧 Setting up permissions for: {collection_name}")
    
    # Grant all CRUD permissions
    permissions = ["create", "read", "update", "delete"]
    create_permissions(token, role_id, collection_name, permissions)

def main():
    print("🚀 Starting Directus permissions setup...\n")
    
    # Login
    token = login()
    
    # Get or create public role
    public_role_id = get_or_create_public_role(token)
    if not public_role_id:
        print("❌ Could not get or create Public role")
        sys.exit(1)
    
    print(f"\n🔑 Using Public role ID: {public_role_id}")
    
    # Setup permissions for each collection
    collections = [
        "conversations",
        "image_analyses", 
        "user_preferences"
    ]
    
    for collection in collections:
        setup_collection_permissions(token, public_role_id, collection)
    
    print("\n✅ Permissions setup complete!")
    print("\n📊 Summary:")
    print("   All collections now have full CRUD permissions for Public role")
    print("   - CREATE: ✅")
    print("   - READ: ✅")
    print("   - UPDATE: ✅")
    print("   - DELETE: ✅")
    print("\n🎉 You can now use the API without authentication!")

if __name__ == "__main__":
    main()
