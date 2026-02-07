# Directus 数据库架构设置

## 当前状态
- ✅ Directus 连接成功
- ✅ 登录凭证有效
- ⚠️ 没有任何 collections（需要创建）

## 需要创建的 Collections

### 1. `conversations` - 对话历史记录

**用途**: 存储用户的 TikTok 分析历史

**字段**:
```
- id (UUID, Primary Key, Auto-generated)
- user_id (UUID, 关联用户)
- tiktok_url (String, TikTok 视频链接)
- product_name (String, 产品名称)
- category (String, 产品类别)
- trend_score (Integer, 趋势分数 0-100)
- lifecycle (String, 生命周期阶段)
- result (JSON, 完整的分析结果)
- notes (Text, 用户备注)
- created_at (Timestamp, 创建时间)
- updated_at (Timestamp, 更新时间)
- status (String, 状态: draft/published/archived)
```

### 2. `factories` - 工厂数据

**用途**: 存储工厂信息用于匹配

**字段**:
```
- id (UUID, Primary Key)
- name (String, 工厂名称)
- country (String, 国家)
- city (String, 城市)
- categories (JSON Array, 产品类别)
- moq (Integer, 最小起订量)
- certifications (JSON Array, 认证列表)
- contact_email (String, 联系邮箱)
- contact_phone (String, 联系电话)
- description (Text, 工厂描述)
- capabilities (JSON, 生产能力)
- price_range (JSON, 价格范围)
- lead_time_days (Integer, 交货周期)
- status (String, published/draft)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### 3. `image_analyses` - 图片分析记录

**用途**: 存储图片上传和分析结果

**字段**:
```
- id (UUID, Primary Key)
- user_id (UUID)
- image_url (String, 图片 CDN URL)
- image_filename (String, 原始文件名)
- detected_category (String, 识别的类别)
- confidence_score (Float, 置信度 0-1)
- similar_products (JSON, 相似产品)
- matched_factories (JSON, 匹配的工厂)
- analysis_result (JSON, 完整分析结果)
- created_at (Timestamp)
- status (String)
```

### 4. `user_preferences` - 用户偏好设置

**用途**: 存储用户的个性化设置

**字段**:
```
- id (UUID, Primary Key)
- user_id (UUID, 关联用户)
- theme (String, 主题: light/dark/auto)
- language (String, 语言: zh-CN/en-US)
- default_category (String, 默认类别)
- notification_enabled (Boolean, 通知开关)
- preferences (JSON, 其他偏好设置)
- created_at (Timestamp)
- updated_at (Timestamp)
```

## 创建步骤

### 方式 1: 通过 Directus Admin UI 手动创建

1. 访问 https://admin.cnsubscribe.xyz/admin/
2. 登录（magic@gmail.com / wysk1214）
3. 点击 "Settings" → "Data Model"
4. 点击 "Create Collection"
5. 按照上述字段定义创建每个 collection

### 方式 2: 通过 API 自动创建（推荐）

使用 Directus API 批量创建 collections 和 fields。

**脚本位置**: `/home/ubuntu/demand-os/scripts/setup-directus.sh`

## 权限设置

为 Public 角色设置以下权限：

- `conversations`: 读取自己的记录，创建新记录
- `factories`: 只读访问
- `image_analyses`: 读取自己的记录，创建新记录
- `user_preferences`: 完全访问（仅自己的记录）

## 下一步

1. ✅ 创建 collections
2. ✅ 设置权限
3. ✅ 添加示例数据（factories）
4. ✅ 测试 CRUD 操作
5. ✅ 集成到 Next.js 应用

## 注意事项

- 所有 UUID 字段使用 Directus 的自动生成
- Timestamp 字段自动管理
- JSON 字段用于存储复杂数据结构
- Status 字段用于软删除和草稿功能
