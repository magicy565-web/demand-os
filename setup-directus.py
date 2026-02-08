#!/usr/bin/env python3
"""
Directus Collections 完整设置脚本
直接使用API创建/更新所有Collections及其字段
支持: conversations, factories, image_analyses, user_preferences
"""

import json
import sys
import time
from urllib.request import Request, urlopen, HTTPError

class DirectusSetup:
    def __init__(self, base_url="https://admin.cnsubscribe.xyz", email="magic@gmail.com", password="wysk1214"):
        self.base_url = base_url
        self.email = email
        self.password = password
        self.token = None
    
    def log(self, level, message):
        """打印日志"""
        icons = {
            'step': '📍',
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️'
        }
        print(f"{icons.get(level, '•')} {message}")
    
    def login(self):
        """登录获取管理员token"""
        self.log('step', f"[1/5] 使用管理员账号登录: {self.email}")
        
        url = f"{self.base_url}/auth/login"
        data = json.dumps({"email": self.email, "password": self.password}).encode()
        req = Request(url, data=data, headers={"Content-Type": "application/json"})
        
        try:
            with urlopen(req, timeout=10) as response:
                result = json.loads(response.read())
                self.token = result.get('data', {}).get('access_token')
                if self.token:
                    self.log('success', f"登录成功")
                    return True
                else:
                    self.log('error', "没有获取到token")
                    return False
        except Exception as e:
            self.log('error', f"登录失败: {e}")
            return False
    
    def api_call(self, method, endpoint, data=None, return_error=False):
        """调用Directus API"""
        url = f"{self.base_url}{endpoint}"
        
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }
        
        request_data = None
        if data:
            request_data = json.dumps(data).encode()
        
        req = Request(url, data=request_data, headers=headers, method=method)
        
        try:
            with urlopen(req, timeout=10) as response:
                return json.loads(response.read())
        except HTTPError as e:
            error_body = e.read().decode()
            if return_error:
                return {"error": True, "status": e.code, "body": error_body}
            self.log('error', f"API错误 ({e.code}): {error_body[:200]}")
            return None
        except Exception as e:
            self.log('error', f"请求失败: {e}")
            return None
    
    def remove_folder(self, folder_name):
        """删除现有的folder"""
        self.log('info', f"尝试删除folder: {folder_name}")
        
        # 尝试删除（即使不存在也继续）
        result = self.api_call("DELETE", f"/folders/{folder_name}", return_error=True)
        
        if isinstance(result, dict) and result.get("error"):
            if result.get("status") == 404:
                self.log('info', f"  {folder_name} folder不存在（正常）")
            else:
                self.log('warning', f"  删除失败: {result.get('body', '')[:100]}")
        else:
            self.log('success', f"  删除folder成功")
        
        time.sleep(0.5)
        return True
    
    def create_collection(self, collection_name, icon="table", display_template=None):
        """创建collection"""
        self.log('info', f"创建collection: {collection_name}")
        
        data = {
            "collection": collection_name,
            "meta": {
                "collection": collection_name,
                "icon": icon,
                "display_template": display_template or "{{name}}"
            }
        }
        
        result = self.api_call("POST", "/collections", data)
        
        if result:
            self.log('success', f"  Collection创建成功")
            time.sleep(0.5)
            return True
        else:
            # 可能已经存在，继续
            self.log('info', f"  Collection可能已存在")
            return True
    
    def add_field(self, collection, field_name, field_type, required=False, options=None, is_primary=False):
        """添加字段到collection"""
        field_data = {
            "field": field_name,
            "type": field_type,
            "meta": {
                "field": field_name,
                "hidden": False,
                "required": required,
            }
        }
        
        if options:
            field_data["meta"]["options"] = options
        
        if is_primary:
            field_data["schema"] = {
                "is_primary_key": True,
                "has_auto_increment": True
            }
        
        result = self.api_call("POST", f"/fields/{collection}", field_data, return_error=True)
        
        if isinstance(result, dict) and result.get("error"):
            if "already exists" in result.get("body", "").lower():
                return "exists"
            else:
                self.log('warning', f"    字段 {field_name} 添加失败: {result.get('body', '')[:100]}")
                return "failed"
        
        return "success"
    
    def setup_conversations(self):
        """设置 conversations collection"""
        self.log('step', "[2/5] 设置 conversations collection")
        
        # 删除旧的folder
        self.remove_folder("conversations")
        
        # 创建collection
        self.create_collection("conversations", icon="chat", display_template="{{product_name}}")
        
        # 添加字段
        fields = {
            "user_id": ("string", True),
            "product_name": ("string", True),
            "category": ("string", True),
            "tiktok_url": ("string", False),
            "trend_score": ("integer", False),
            "lifecycle": ("string", False),
            "result": ("json", False),
            "notes": ("text", False),
            "status": ("string", False),
        }
        
        lifecycle_options = [
            {"text": "Emerging", "value": "emerging"},
            {"text": "Growth", "value": "growth"},
            {"text": "Mature", "value": "mature"},
            {"text": "Decline", "value": "decline"}
        ]
        
        status_options = [
            {"text": "Draft", "value": "draft"},
            {"text": "Published", "value": "published"},
            {"text": "Archived", "value": "archived"}
        ]
        
        for field_name, (field_type, required) in fields.items():
            opts = None
            if field_name == "lifecycle":
                opts = lifecycle_options
            elif field_name == "status":
                opts = status_options
            
            result = self.add_field("conversations", field_name, field_type, required, opts)
            status_icon = "✓" if result != "failed" else "✗"
            self.log('info', f"  {status_icon} {field_name} ({field_type})")
            time.sleep(0.2)
        
        self.log('success', "conversations collection 设置完成")
        return True
    
    def setup_factories(self):
        """设置 factories collection"""
        self.log('step', "[3/5] 检查/完成 factories collection")
        
        # 创建collection（如果不存在）
        self.create_collection("factories", icon="warehouse", display_template="{{name}}")
        
        # 添加字段
        fields = {
            "name": ("string", True),
            "country": ("string", False),
            "city": ("string", False),
            "categories": ("json", False),
            "moq": ("integer", False),
            "certifications": ("json", False),
            "contact_email": ("string", False),
            "contact_phone": ("string", False),
            "description": ("text", False),
            "capabilities": ("json", False),
            "price_range": ("json", False),
            "lead_time_days": ("integer", False),
            "status": ("string", False),
        }
        
        status_options = [
            {"text": "Published", "value": "published"},
            {"text": "Draft", "value": "draft"}
        ]
        
        added_count = 0
        for field_name, (field_type, required) in fields.items():
            opts = status_options if field_name == "status" else None
            result = self.add_field("factories", field_name, field_type, required, opts)
            
            if result == "success":
                self.log('info', f"  ✓ {field_name} ({field_type})")
                added_count += 1
            elif result == "exists":
                self.log('info', f"  ~ {field_name} ({field_type}) - 已存在")
            else:
                self.log('info', f"  ✗ {field_name} ({field_type}) - 失败")
            
            time.sleep(0.2)
        
        self.log('success', f"factories collection 检查完成 (新增{added_count}个字段)")
        return True
    
    def setup_image_analyses(self):
        """设置 image_analyses collection"""
        self.log('step', "[4/5] 设置 image_analyses collection")
        
        # 删除旧的folder
        self.remove_folder("image_analyses")
        
        # 创建collection
        self.create_collection("image_analyses", icon="image", display_template="{{image_filename}}")
        
        # 添加字段
        fields = {
            "user_id": ("string", True),
            "image_url": ("string", False),
            "image_filename": ("string", False),
            "detected_category": ("string", False),
            "confidence_score": ("float", False),
            "similar_products": ("json", False),
            "matched_factories": ("json", False),
            "analysis_result": ("json", False),
            "status": ("string", False),
        }
        
        status_options = [
            {"text": "Completed", "value": "completed"},
            {"text": "Processing", "value": "processing"},
            {"text": "Failed", "value": "failed"}
        ]
        
        for field_name, (field_type, required) in fields.items():
            opts = status_options if field_name == "status" else None
            result = self.add_field("image_analyses", field_name, field_type, required, opts)
            status_icon = "✓" if result != "failed" else "✗"
            self.log('info', f"  {status_icon} {field_name} ({field_type})")
            time.sleep(0.2)
        
        self.log('success', "image_analyses collection 设置完成")
        return True
    
    def setup_user_preferences(self):
        """设置 user_preferences collection"""
        self.log('step', "[5/5] 设置 user_preferences collection")
        
        # 删除旧的folder
        self.remove_folder("user_preferences")
        
        # 创建collection
        self.create_collection("user_preferences", icon="sliders", display_template="{{user_id}}")
        
        # 添加字段
        fields = {
            "user_id": ("string", True),
            "theme": ("string", False),
            "language": ("string", False),
            "default_category": ("string", False),
            "notification_enabled": ("boolean", False),
            "preferences": ("json", False),
        }
        
        theme_options = [
            {"text": "Light", "value": "light"},
            {"text": "Dark", "value": "dark"},
            {"text": "Auto", "value": "auto"}
        ]
        
        language_options = [
            {"text": "中文", "value": "zh-CN"},
            {"text": "English", "value": "en-US"}
        ]
        
        for field_name, (field_type, required) in fields.items():
            opts = None
            if field_name == "theme":
                opts = theme_options
            elif field_name == "language":
                opts = language_options
            
            result = self.add_field("user_preferences", field_name, field_type, required, opts)
            status_icon = "✓" if result != "failed" else "✗"
            self.log('info', f"  {status_icon} {field_name} ({field_type})")
            time.sleep(0.2)
        
        self.log('success', "user_preferences collection 设置完成")
        return True
    
    def run(self):
        """执行完整设置"""
        print("=" * 70)
        print("🚀 Directus Collections 完整设置脚本")
        print("=" * 70)
        
        if not self.login():
            print("\n❌ 登录失败")
            return False
        
        print()
        
        try:
            self.setup_conversations()
            print()
            self.setup_factories()
            print()
            self.setup_image_analyses()
            print()
            self.setup_user_preferences()
            
            print()
            print("=" * 70)
            self.log('success', "✨ 所有Collections已成功创建/更新！")
            print("=" * 70)
            print()
            print("📌 下一步操作:")
            print("   1. 访问 https://admin.cnsubscribe.xyz/admin 查看新collections")
            print("   2. 在 Roles & Permissions 中为用户角色配置权限")
            print("   3. 运行验证命令: python test-directus-api.py")
            print()
            
            return True
        
        except Exception as e:
            self.log('error', f"设置失败: {e}")
            return False

if __name__ == "__main__":
    setup = DirectusSetup()
    success = setup.run()
    sys.exit(0 if success else 1)
