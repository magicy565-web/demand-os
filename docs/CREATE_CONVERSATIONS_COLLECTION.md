# Directus Conversations Collection 创建指南

## 🔴 问题识别

**当前状态**: conversations 只是一个 **Folder**，不是 **Collection**  
**需要状态**: conversations 应该是 **Collection**（包含字段和数据）

---

## ✅ 正确的创建步骤

### 步骤 1: 进入Directus管理后台

1. 打开浏览器
2. 访问: **https://admin.cnsubscribe.xyz/admin**
3. 登录账号: **magic@gmail.com**
4. 密码: **wysk1214**

### 步骤 2: 删除当前的Folder（如果需要）

1. 左侧菜单找到 **Settings** (齿轮图标)
2. 点击 **Data Model**
3. 在列表中找到 "conversations" Folder
4. 点击右边的菜单（三个点）
5. 选择 **Delete**
6. 确认删除

### 步骤 3: 创建 conversations Collection

1. 在 **Data Model** 页面
2. 点击 **Create Collection** 按钮 (大的蓝色按钮)
3. 在弹出对话框中输入:
   ```
   Collection Name: conversations
   ```
4. 点击 **Create Collection**

### 步骤 4: 添加字段 - 第1部分 (系统字段)

进入 conversations collection 后，系统会自动创建：
- ✅ **id** (UUID, Primary Key) - 自动
- ✅ **created_at** (Timestamp) - 自动
- ✅ **updated_at** (Timestamp) - 自动

### 步骤 5: 手动添加字段 - 第2部分

点击 **Create Field** 添加以下字段：

#### 5.1 user_id
- **Field Name**: user_id
- **Field Type**: String
- **Validation**: Required
- 点击 **Save**

#### 5.2 tiktok_url
- **Field Name**: tiktok_url
- **Field Type**: String (URL)
- **Validation**: Optional
- 点击 **Save**

#### 5.3 product_name
- **Field Name**: product_name
- **Field Type**: String
- **Validation**: Required
- 点击 **Save**

#### 5.4 category
- **Field Name**: category
- **Field Type**: String
- **Validation**: Required
- 点击 **Save**

#### 5.5 trend_score
- **Field Name**: trend_score
- **Field Type**: Integer
- **Validation**: Optional, Min: 0, Max: 100
- 点击 **Save**

#### 5.6 lifecycle
- **Field Name**: lifecycle
- **Field Type**: String (Dropdown with options)
- **Options**: 
  - emerging (新兴)
  - growth (成长)
  - mature (成熟)
  - decline (衰退)
- **Default**: emerging
- 点击 **Save**

#### 5.7 result (分析结果)
- **Field Name**: result
- **Field Type**: JSON
- **Validation**: Optional
- 点击 **Save**

#### 5.8 notes
- **Field Name**: notes
- **Field Type**: Text
- **Validation**: Optional
- 点击 **Save**

#### 5.9 status
- **Field Name**: status
- **Field Type**: String (Dropdown with options)
- **Options**:
  - draft (草稿)
  - published (已发布)
  - archived (已归档)
- **Default**: published
- 点击 **Save**

### 步骤 6: 配置权限

1. 从 Data Model 返回
2. 进入 **Settings → Roles & Permissions**
3. 选择你的用户角色 (ID: f2b28dc2-2ddf-47cb-b6c2-731b97b37ea5)
4. 找到 **conversations** 表
5. 配置权限:
   - ☑ **Read** - All
   - ☑ **Create** - All
   - ☑ **Update** - All
   - ☑ **Delete** - All (可选)
6. 点击 **Save**

### 步骤 7: 验证Collection

1. 返回主菜单
2. 左侧菜单应该看到 **Conversations** (新增)
3. 点击进入，应该显示空的表格
4. 这表示Collection创建成功！

---

## 🔍 验证创建成功

### 在前端验证

运行诊断命令:
```bash
python test-directus-api.py
```

预期输出:
```
✅ 登录成功
✅ 用户信息获取成功
✅ Conversations表访问成功
   总记录数: 0
   本次返回: 0
```

### 在Directus后台验证

1. 访问 https://admin.cnsubscribe.xyz/admin/
2. 左侧菜单中看到 **Conversations** (带表格图标)
3. 能够点击进入查看空表
4. 能够点击 **Create Item** 按钮

---

## 📊 Collection字段总结表

| 字段名 | 类型 | 必需 | 说明 |
|--------|------|------|------|
| id | UUID | ✅ | 主键(自动生成) |
| user_id | String | ✅ | 用户ID |
| tiktok_url | String | ❌ | TikTok视频链接 |
| product_name | String | ✅ | 产品名称 |
| category | String | ✅ | 产品类别 |
| trend_score | Integer | ❌ | 趋势分数(0-100) |
| lifecycle | String | ❌ | 生命周期(emerging/growth/mature/decline) |
| result | JSON | ❌ | 完整分析结果 |
| notes | Text | ❌ | 用户备注 |
| status | String | ❌ | 状态(draft/published/archived) |
| created_at | Timestamp | ✅ | 创建时间(自动) |
| updated_at | Timestamp | ✅ | 更新时间(自动) |

---

## 🆘 常见问题

### Q: 找不到 "Create Collection" 按钮?
A:
1. 确保在 Settings → Data Model 页面
2. 应该在右上角看到蓝色 "Create Collection" 按钮
3. 如果看不到，刷新页面

### Q: 字段创建后看不到?
A:
1. 页面可能需要刷新
2. 点击菜单中的 "Conversations"
3. 返回后再进入

### Q: 怎样知道是Collection而不是Folder?
A:
- **Collection**: 
  - 带表格图标 📊
  - 能创建条目/记录
  - 有字段定义
  
- **Folder**: 
  - 带文件夹图标 📁
  - 用于组织其他collection
  - 本身不存储数据

### Q: 需要创建其他的Collection吗?
A: 
- **必需**: conversations ✅
- **可选**: factories, image_analyses, user_preferences
- 完整列表见 [setup-directus-schema.md](setup-directus-schema.md)

---

## ✨ 完成后的下一步

1. ✅ conversations Collection 创建完成
2. ✅ 权限配置完成
3. ⏭️ 可以开始在前端使用真实数据
4. ⏭️ 刷新 http://localhost:3000/phase2-demo

---

## 📞 快速验证命令

```bash
# 进入项目目录
cd d:\Demand-os-v4

# 运行诊断工具
python test-directus-api.py

# 期望看到:
# ✅ Conversations表访问成功
```

---

**提示**: 这个步骤大约需要 **10-15 分钟**  
**验证**: 完成后运行 `python test-directus-api.py` 验证
