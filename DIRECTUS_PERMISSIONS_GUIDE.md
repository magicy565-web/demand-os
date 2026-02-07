# Directus 权限配置指南

## 🚨 当前问题

虽然使用管理员账号登录，但对 `image_analyses`、`conversations`、`user_preferences` 等自定义 collections 没有权限。

**错误信息**：
```
You don't have permission to access this.
Code: FORBIDDEN (403)
```

## 🔍 问题分析

1. **管理员角色默认权限**：Directus 管理员角色默认对系统 collections 有完全权限
2. **自定义 Collections**：新创建的 collections 需要手动配置权限
3. **API 访问**：即使是管理员，也需要明确授予对自定义 collections 的权限

## ✅ 解决方案

### 方法一：通过 Admin UI 配置（推荐）

1. **登录 Directus Admin**
   ```
   URL: https://admin.cnsubscribe.xyz/admin
   邮箱: magic@gmail.com
   密码: wysk1214
   ```

2. **进入权限设置**
   - 点击左下角 Settings (⚙️)
   - 选择 "Roles & Permissions"
   - 点击 "Administrator" 角色

3. **配置 Collections 权限**
   
   为以下 collections 启用所有权限：
   
   **conversations**
   - ✅ Create
   - ✅ Read
   - ✅ Update
   - ✅ Delete
   - Fields: All (*)
   
   **image_analyses**
   - ✅ Create
   - ✅ Read
   - ✅ Update
   - ✅ Delete
   - Fields: All (*)
   
   **user_preferences**
   - ✅ Create
   - ✅ Read
   - ✅ Update
   - ✅ Delete
   - Fields: All (*)

4. **保存设置**
   - 点击右上角 "Save" 按钮
   - 确认权限已生效

### 方法二：通过 API 配置

运行提供的 Python 脚本：

```bash
cd /home/ubuntu/demand-os
python3 fix_admin_permissions.py
```

**注意**：此方法可能因 Directus 版本差异而失败，推荐使用方法一。

## 🧪 验证权限

配置完成后，运行以下命令测试：

```bash
# 获取 token
TOKEN=$(curl -s -X POST https://admin.cnsubscribe.xyz/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"magic@gmail.com","password":"wysk1214"}' | \
  python3 -c "import sys, json; print(json.load(sys.stdin)['data']['access_token'])")

# 测试创建记录
curl -X POST https://admin.cnsubscribe.xyz/items/image_analyses \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test-user",
    "image_filename": "test.jpg",
    "detected_category": "home_garden",
    "confidence_score": 0.85,
    "status": "completed"
  }'
```

**期望结果**：返回创建的记录，状态码 200

## 📊 当前功能状态

| 功能 | 状态 | 说明 |
|------|------|------|
| 图片上传 | ✅ 正常 | 文件上传成功 |
| AI 分析 | ✅ 正常 | 使用 Nova AI Vision |
| 结果返回 | ✅ 正常 | 返回类别、置信度、描述、标签 |
| Directus 保存 | ⚠️ 可选 | 权限问题，但不影响主功能 |

## 🔧 临时解决方案

当前代码已修改为：即使 Directus 保存失败，API 仍然返回分析结果。

```typescript
// API 返回格式
{
  "success": true,
  "analysis": {
    "category": "home_garden",
    "confidence": 0.85,
    "description": "...",
    "tags": [...]
  },
  "record": null,  // Directus 保存失败时为 null
  "saved_to_directus": false  // 指示是否成功保存
}
```

## 🚀 下一步

1. **配置权限**：按照上述方法配置 Directus 权限
2. **测试保存**：验证数据可以成功保存到 Directus
3. **移除调试日志**：权限问题解决后，可以移除详细的调试日志
4. **启用数据持久化**：确保所有分析结果都保存到数据库

## 📞 需要帮助？

如果遇到问题，请检查：
1. Directus 版本是否兼容
2. 管理员角色是否正确
3. Collections 是否已创建
4. 网络连接是否正常

---

**最后更新**: 2026-02-07  
**状态**: 待配置权限
