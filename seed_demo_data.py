#!/usr/bin/env python3
"""
Seed Demo Data for SourcingOS
Creates a complete hotel project scenario with materials, suppliers, and BOM
"""

import requests
import json
import uuid

# Directus Configuration
DIRECTUS_URL = "https://admin.cnsubscribe.xyz"
DIRECTUS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdkNWRmY2Q1LTY4ZDEtNGU3Yi1iZjZhLTUyY2E1YjE2ZDIyOCIsInJvbGUiOiJmMmIyOGRjMi0yZGRmLTQ3Y2ItYjZjMi03MzFiOTdiMzdlYTUiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTc3MDI5ODM4NiwiZXhwIjoxNzcwMjk5Mjg2LCJpc3MiOiJkaXJlY3R1cyJ9._VC2H6v_yLPO3xP4RqnD8B9riNdjhwIVJvXHbzzOx70"

headers = {
    "Authorization": f"Bearer {DIRECTUS_TOKEN}",
    "Content-Type": "application/json"
}

def create_item(collection, data):
    """Create an item in a collection"""
    try:
        response = requests.post(
            f"{DIRECTUS_URL}/items/{collection}",
            headers=headers,
            json=data
        )
        
        if response.status_code in [200, 201, 204]:
            result = response.json()
            print(f"✅ Created {collection}: {data.get('name_zh') or data.get('project_name') or data.get('name')}")
            return result.get('data', {}).get('id')
        else:
            print(f"❌ Failed to create {collection}: {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error creating {collection}: {str(e)}")
        return None

def seed_data():
    """Seed all demo data"""
    
    print("🌱 Starting to seed demo data for SourcingOS...\n")
    
    # 1. Create Materials (物料库)
    print("📦 Creating materials...")
    materials = [
        {
            "id": str(uuid.uuid4()),
            "name_zh": "北美白橡木(FSC认证)",
            "name_en": "North American White Oak (FSC Certified)",
            "category": "主材",
            "grade": "AA级",
            "price_coefficient": 0.35,
            "is_premium": True
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "美国黑胡桃木",
            "name_en": "American Black Walnut",
            "category": "主材",
            "grade": "特级",
            "price_coefficient": 0.35,
            "is_premium": False
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "俄罗斯白蜡木",
            "name_en": "Russian Ash Wood",
            "category": "主材",
            "grade": "A级",
            "price_coefficient": -0.15,
            "is_premium": False
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "E0级环保多层板",
            "name_en": "E0 Grade Eco Plywood",
            "category": "主材",
            "grade": "国标",
            "price_coefficient": -0.40,
            "is_premium": False
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "亚麻混纺",
            "name_en": "Linen Blend",
            "category": "软装面料",
            "grade": "FAB-LN-01",
            "price_coefficient": 0,
            "is_premium": True
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "意大利绒布",
            "name_en": "Italian Velvet",
            "category": "软装面料",
            "grade": "FAB-VL-02",
            "price_coefficient": 0.08,
            "is_premium": False
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "头层牛皮",
            "name_en": "Top Grain Leather",
            "category": "软装面料",
            "grade": "FAB-LT-03",
            "price_coefficient": 0.20,
            "is_premium": False
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "科技布",
            "name_en": "Tech Fabric",
            "category": "软装面料",
            "grade": "FAB-TC-04",
            "price_coefficient": 0.12,
            "is_premium": False
        }
    ]
    
    material_ids = {}
    for material in materials:
        mat_id = create_item("materials", material)
        if mat_id:
            material_ids[material['name_zh']] = mat_id
    
    # 2. Create Markets (终端市场)
    print("\n🌍 Creating markets...")
    markets = [
        {
            "id": str(uuid.uuid4()),
            "name_zh": "北美超高风",
            "name_en": "USA/Canada",
            "region": "North America"
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "北欧轻奢风",
            "name_en": "EU Market",
            "region": "Europe"
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "中东奢华风",
            "name_en": "GCC Region",
            "region": "Middle East"
        },
        {
            "id": str(uuid.uuid4()),
            "name_zh": "东南亚度假风",
            "name_en": "ASEAN",
            "region": "Southeast Asia"
        }
    ]
    
    market_ids = {}
    for market in markets:
        mkt_id = create_item("markets", market)
        if mkt_id:
            market_ids[market['name_zh']] = mkt_id
    
    # 3. Create Suppliers (供应商)
    print("\n🏭 Creating suppliers...")
    suppliers = [
        {
            "id": str(uuid.uuid4()),
            "name": "佛山陶瓷-华美建材",
            "location": "佛山",
            "category": "建材",
            "moq": 50
        },
        {
            "id": str(uuid.uuid4()),
            "name": "东莞家具-鸿运家私",
            "location": "东莞",
            "category": "家具",
            "moq": 45
        },
        {
            "id": str(uuid.uuid4()),
            "name": "江门纺织-永泰实业",
            "location": "江门",
            "category": "纺织",
            "moq": 52
        },
        {
            "id": str(uuid.uuid4()),
            "name": "中山灯饰-光明照明",
            "location": "中山",
            "category": "灯具",
            "moq": 49
        }
    ]
    
    supplier_ids = {}
    for supplier in suppliers:
        sup_id = create_item("suppliers", supplier)
        if sup_id:
            supplier_ids[supplier['name']] = sup_id
    
    # 4. Create Demand (需求订单)
    print("\n📋 Creating demand order...")
    demand_data = {
        "id": str(uuid.uuid4()),
        "project_name": "东南亚风情精品酒店",
        "room_count": 200,
        "style": "东南亚风格",
        "budget": "800000",
        "description": "200间客房精品酒店，东南亚风格，预算$800K。需要全套家具、软装及配套设施。",
        "status": "processing"
    }
    
    demand_id = create_item("demands", demand_data)
    
    print(f"\n✅ Demo data seeding completed!")
    print(f"📊 Created:")
    print(f"   - {len(materials)} materials")
    print(f"   - {len(markets)} markets")
    print(f"   - {len(suppliers)} suppliers")
    print(f"   - 1 demand order")
    
    return {
        "demand_id": demand_id,
        "material_ids": material_ids,
        "market_ids": market_ids,
        "supplier_ids": supplier_ids
    }

if __name__ == "__main__":
    result = seed_data()
    print(f"\n🎉 All done! You can now access the data in Directus.")
    print(f"🔗 Directus Admin: {DIRECTUS_URL}")
