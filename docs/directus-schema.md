# Directus 数据模型设计 - SourcingOS

## Collections 结构

### 1. demands (需求订单)
存储客户提交的采购需求

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | UUID | 主键 |
| project_name | String | 项目名称（如"东南亚风情精品酒店"） |
| room_count | Integer | 房间数量 |
| style | String | 风格（如"东南亚风格"） |
| budget | Decimal | 预算（美元） |
| description | Text | 详细描述 |
| status | String | 状态（pending/processing/completed） |
| created_at | DateTime | 创建时间 |
| updated_at | DateTime | 更新时间 |

### 2. materials (物料库)
存储可选的物料清单

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | UUID | 主键 |
| name_zh | String | 中文名称（如"北美白橡木"） |
| name_en | String | 英文名称（如"North American White Oak"） |
| category | String | 类别（主材/软装面料） |
| grade | String | 等级（AA级/特级/A级等） |
| price_coefficient | Decimal | 价格系数（如+35%、-15%） |
| is_premium | Boolean | 是否为基准价 |
| description | Text | 描述 |

### 3. markets (终端市场)
存储目标市场选项

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | UUID | 主键 |
| name_zh | String | 中文名称（如"北美超高风"） |
| name_en | String | 英文名称（如"USA/Canada"） |
| region | String | 区域代码 |
| style_preference | String | 风格偏好 |

### 4. bom_items (物料清单明细)
存储AI拆单生成的物料清单

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | UUID | 主键 |
| demand_id | UUID | 关联需求订单 |
| material_id | UUID | 关联物料 |
| quantity | Integer | 数量 |
| unit_price | Decimal | 单价 |
| total_price | Decimal | 总价 |
| moq | Integer | 最小起订量 |
| category | String | 品类（床架/床头柜/椅子等） |

### 5. suppliers (供应商/工厂)
存储产业带工厂信息

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | UUID | 主键 |
| name | String | 工厂名称 |
| location | String | 所在地（如"佛山陶瓷"、"东莞家具"） |
| category | String | 主营品类 |
| capacity | Integer | 产能 |
| moq | Integer | 起订量 |
| lead_time | Integer | 交货周期（天） |

### 6. container_plans (货柜方案)
存储拼柜方案

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | UUID | 主键 |
| demand_id | UUID | 关联需求订单 |
| container_type | String | 集装箱类型（如"40ft HC"） |
| load_rate | Decimal | 装载率（%） |
| total_volume | Decimal | 总体积（CBM） |
| total_weight | Decimal | 总重量（KG） |
| estimated_cost | Decimal | 预估成本 |
| risk_alerts | JSON | 风险提示 |

### 7. container_items (货柜装载明细)
存储货柜中的具体物品

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | UUID | 主键 |
| container_plan_id | UUID | 关联货柜方案 |
| item_code | String | 物品代码（如"PLT-001"） |
| item_name | String | 物品名称（如"Bed Frames"） |
| quantity | Integer | 数量 |
| weight | Decimal | 重量（KG） |
| volume | Decimal | 体积（CBM） |
| position | String | 位置（如"蓝框/绿框"） |

### 8. timeline_comparisons (时间线对比)
存储传统模式 vs AI 平台的时间对比数据

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | UUID | 主键 |
| demand_id | UUID | 关联需求订单 |
| traditional_days | Integer | 传统模式天数 |
| ai_platform_days | Integer | AI平台天数 |
| time_saved | Integer | 节省天数 |
| cost_saved | Decimal | 节省成本 |
| efficiency_multiplier | Decimal | 效率倍数 |

## 关系设计

```
demands (1) ----< (N) bom_items
demands (1) ----< (N) container_plans
container_plans (1) ----< (N) container_items
demands (1) ----< (1) timeline_comparisons
bom_items (N) ----< (1) materials
bom_items (N) ----< (1) suppliers
```
