#!/usr/bin/env python3
"""
Directus Schema Setup Script
创建所需的 Collections 和 Fields
"""

import requests
import json
from typing import Dict, List, Any

# Directus 连接配置
DIRECTUS_URL = "https://admin.cnsubscribe.xyz"
EMAIL = "magic@gmail.com"
PASSWORD = "wysk1214"

class DirectusSchemaSetup:
    def __init__(self, base_url: str, email: str, password: str):
        self.base_url = base_url
        self.email = email
        self.password = password
        self.token = None
        self.session = requests.Session()
    
    def login(self):
        """登录获取认证token"""
        print("🔐 正在登录 Directus...")
        response = self.session.post(
            f"{self.base_url}/auth/login",
            json={"email": self.email, "password": self.password}
        )
        
        if response.status_code != 200:
            print(f"❌ 登录失败: {response.text}")
            return False
        
        self.token = response.json()["data"]["access_token"]
        self.session.headers.update({"Authorization": f"Bearer {self.token}"})
        print("✅ 登录成功")
        return True
    
    def create_collection(self, collection_name: str, collection_config: Dict[str, Any]):
        """创建 Collection"""
        print(f"\n📦 创建 Collection: {collection_name}")
        
        data = {
            "collection": collection_name,
            "fields": collection_config.get("fields", [])
        }
        
        # 添加 collection 级别的配置
        if "meta" in collection_config:
            data["meta"] = collection_config["meta"]
        
        response = self.session.post(
            f"{self.base_url}/collections",
            json=data
        )
        
        if response.status_code not in [200, 201]:
            print(f"❌ 创建失败: {response.text}")
            return False
        
        print(f"✅ Collection '{collection_name}' 创建成功")
        return True
    
    def setup_all_collections(self):
        """创建所有必需的 Collections"""
        
        collections = {
            "conversations": {
                "meta": {
                    "display_template": "{{ product_name }}",
                    "icon": "chat",
                    "color": "#3b82f6"
                },
                "fields": [
                    {
                        "field": "id",
                        "type": "uuid",
                        "meta": {
                            "hidden": True,
                            "readonly": True
                        },
                        "schema": {
                            "is_primary_key": True,
                            "has_auto_increment": False
                        }
                    },
                    {
                        "field": "user_id",
                        "type": "uuid",
                        "meta": {
                            "interface": "input",
                            "width": "full"
                        }
                    },
                    {
                        "field": "tiktok_url",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "full"
                        }
                    },
                    {
                        "field": "product_name",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "full"
                        }
                    },
                    {
                        "field": "category",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "trend_score",
                        "type": "integer",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "lifecycle",
                        "type": "string",
                        "meta": {
                            "interface": "select-dropdown",
                            "options": {
                                "choices": [
                                    {"text": "Emerging", "value": "emerging"},
                                    {"text": "Explosive", "value": "explosive"},
                                    {"text": "Mature", "value": "mature"}
                                ]
                            },
                            "width": "half"
                        }
                    },
                    {
                        "field": "result",
                        "type": "json",
                        "meta": {
                            "interface": "input-code",
                            "width": "full"
                        }
                    },
                    {
                        "field": "notes",
                        "type": "text",
                        "meta": {
                            "interface": "input-multiline",
                            "width": "full"
                        }
                    },
                    {
                        "field": "created_at",
                        "type": "timestamp",
                        "meta": {
                            "readonly": True,
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "CURRENT_TIMESTAMP"
                        }
                    },
                    {
                        "field": "updated_at",
                        "type": "timestamp",
                        "meta": {
                            "readonly": True,
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "CURRENT_TIMESTAMP",
                            "on_delete": "now()"
                        }
                    },
                    {
                        "field": "status",
                        "type": "string",
                        "meta": {
                            "interface": "select-dropdown",
                            "options": {
                                "choices": [
                                    {"text": "Draft", "value": "draft"},
                                    {"text": "Published", "value": "published"},
                                    {"text": "Archived", "value": "archived"}
                                ]
                            },
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "draft"
                        }
                    }
                ]
            },
            
            "factories": {
                "meta": {
                    "display_template": "{{ name }}",
                    "icon": "factory",
                    "color": "#ef4444"
                },
                "fields": [
                    {
                        "field": "id",
                        "type": "uuid",
                        "meta": {
                            "hidden": True,
                            "readonly": True
                        },
                        "schema": {
                            "is_primary_key": True
                        }
                    },
                    {
                        "field": "name",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "full"
                        }
                    },
                    {
                        "field": "country",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "city",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "categories",
                        "type": "json",
                        "meta": {
                            "interface": "input-code",
                            "width": "full"
                        }
                    },
                    {
                        "field": "moq",
                        "type": "integer",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "certifications",
                        "type": "json",
                        "meta": {
                            "interface": "input-code",
                            "width": "full"
                        }
                    },
                    {
                        "field": "contact_email",
                        "type": "string",
                        "meta": {
                            "interface": "input-email",
                            "width": "half"
                        }
                    },
                    {
                        "field": "contact_phone",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "description",
                        "type": "text",
                        "meta": {
                            "interface": "input-multiline",
                            "width": "full"
                        }
                    },
                    {
                        "field": "capabilities",
                        "type": "json",
                        "meta": {
                            "interface": "input-code",
                            "width": "full"
                        }
                    },
                    {
                        "field": "price_range",
                        "type": "json",
                        "meta": {
                            "interface": "input-code",
                            "width": "full"
                        }
                    },
                    {
                        "field": "lead_time_days",
                        "type": "integer",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "status",
                        "type": "string",
                        "meta": {
                            "interface": "select-dropdown",
                            "options": {
                                "choices": [
                                    {"text": "Published", "value": "published"},
                                    {"text": "Draft", "value": "draft"}
                                ]
                            },
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "draft"
                        }
                    },
                    {
                        "field": "created_at",
                        "type": "timestamp",
                        "meta": {
                            "readonly": True,
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "CURRENT_TIMESTAMP"
                        }
                    },
                    {
                        "field": "updated_at",
                        "type": "timestamp",
                        "meta": {
                            "readonly": True,
                            "width": "half"
                        }
                    }
                ]
            },
            
            "image_analyses": {
                "meta": {
                    "display_template": "{{ image_filename }}",
                    "icon": "image",
                    "color": "#8b5cf6"
                },
                "fields": [
                    {
                        "field": "id",
                        "type": "uuid",
                        "meta": {
                            "hidden": True,
                            "readonly": True
                        },
                        "schema": {
                            "is_primary_key": True
                        }
                    },
                    {
                        "field": "user_id",
                        "type": "uuid",
                        "meta": {
                            "interface": "input",
                            "width": "full"
                        }
                    },
                    {
                        "field": "image_url",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "full"
                        }
                    },
                    {
                        "field": "image_filename",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "full"
                        }
                    },
                    {
                        "field": "detected_category",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "confidence_score",
                        "type": "float",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "similar_products",
                        "type": "json",
                        "meta": {
                            "interface": "input-code",
                            "width": "full"
                        }
                    },
                    {
                        "field": "matched_factories",
                        "type": "json",
                        "meta": {
                            "interface": "input-code",
                            "width": "full"
                        }
                    },
                    {
                        "field": "analysis_result",
                        "type": "json",
                        "meta": {
                            "interface": "input-code",
                            "width": "full"
                        }
                    },
                    {
                        "field": "created_at",
                        "type": "timestamp",
                        "meta": {
                            "readonly": True,
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "CURRENT_TIMESTAMP"
                        }
                    },
                    {
                        "field": "status",
                        "type": "string",
                        "meta": {
                            "interface": "select-dropdown",
                            "options": {
                                "choices": [
                                    {"text": "Processing", "value": "processing"},
                                    {"text": "Completed", "value": "completed"},
                                    {"text": "Failed", "value": "failed"}
                                ]
                            },
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "processing"
                        }
                    }
                ]
            },
            
            "user_preferences": {
                "meta": {
                    "display_template": "{{ user_id }}",
                    "icon": "settings",
                    "color": "#06b6d4"
                },
                "fields": [
                    {
                        "field": "id",
                        "type": "uuid",
                        "meta": {
                            "hidden": True,
                            "readonly": True
                        },
                        "schema": {
                            "is_primary_key": True
                        }
                    },
                    {
                        "field": "user_id",
                        "type": "uuid",
                        "meta": {
                            "interface": "input",
                            "width": "full"
                        }
                    },
                    {
                        "field": "theme",
                        "type": "string",
                        "meta": {
                            "interface": "select-dropdown",
                            "options": {
                                "choices": [
                                    {"text": "Light", "value": "light"},
                                    {"text": "Dark", "value": "dark"},
                                    {"text": "Auto", "value": "auto"}
                                ]
                            },
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "auto"
                        }
                    },
                    {
                        "field": "language",
                        "type": "string",
                        "meta": {
                            "interface": "select-dropdown",
                            "options": {
                                "choices": [
                                    {"text": "中文 (简体)", "value": "zh-CN"},
                                    {"text": "English", "value": "en-US"}
                                ]
                            },
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "zh-CN"
                        }
                    },
                    {
                        "field": "default_category",
                        "type": "string",
                        "meta": {
                            "interface": "input",
                            "width": "half"
                        }
                    },
                    {
                        "field": "notification_enabled",
                        "type": "boolean",
                        "meta": {
                            "interface": "boolean",
                            "width": "half"
                        },
                        "schema": {
                            "default_value": True
                        }
                    },
                    {
                        "field": "preferences",
                        "type": "json",
                        "meta": {
                            "interface": "input-code",
                            "width": "full"
                        }
                    },
                    {
                        "field": "created_at",
                        "type": "timestamp",
                        "meta": {
                            "readonly": True,
                            "width": "half"
                        },
                        "schema": {
                            "default_value": "CURRENT_TIMESTAMP"
                        }
                    },
                    {
                        "field": "updated_at",
                        "type": "timestamp",
                        "meta": {
                            "readonly": True,
                            "width": "half"
                        }
                    }
                ]
            }
        }
        
        success_count = 0
        for collection_name, config in collections.items():
            if self.create_collection(collection_name, config):
                success_count += 1
        
        print(f"\n{'='*50}")
        print(f"✅ 成功创建 {success_count}/{len(collections)} 个 Collections")
        print(f"{'='*50}")
        
        return success_count == len(collections)


def main():
    print("🚀 开始 Directus 架构设置\n")
    
    setup = DirectusSchemaSetup(DIRECTUS_URL, EMAIL, PASSWORD)
    
    if not setup.login():
        print("❌ 无法连接到 Directus，请检查凭证")
        return False
    
    return setup.setup_all_collections()


if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
