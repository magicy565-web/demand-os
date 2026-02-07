# 产业带坐标修复快速参考

## 问题
产业带在SimpleMaps中国地图SVG上的位置不准确，不符合实际地理位置。

## 解决方案

### 核心修改: BELT_POSITION_FIXES 校准表

**文件**: `web/src/components/industrial-map/ChinaIndustrialMap.tsx`

```typescript
const BELT_POSITION_FIXES: Record<number, { x: number; y: number }> = {
  1: { x: 72.5, y: 62.0 },  // 深圳电子信息产业带
  2: { x: 78.5, y: 44.0 },  // 宁波模具与注塑产业带
  3: { x: 66.0, y: 67.0 },  // 佛山泛家居产业带
  4: { x: 68.5, y: 51.0 },  // 义乌小商品产业带
  5: { x: 73.0, y: 40.0 },  // 苏州纺织丝绸产业带
  6: { x: 70.0, y: 65.0 },  // 广州番禺服装产业带
  7: { x: 72.0, y: 56.0 },  // 永康五金工具产业带
  8: { x: 80.5, y: 68.5 },  // 汕头澄海玩具产业带
};
```

### 使用方式

```typescript
// 优先使用校准表中的精确坐标
function getBeltPosition(beltId: number, lat: number, lng: number) {
  if (BELT_POSITION_FIXES[beltId]) {
    return BELT_POSITION_FIXES[beltId];
  }
  // 备用: 使用公式（用于新增产业带）
  return latLngToSVGPercent(lat, lng);
}

// 在标注层使用
const pos = getBeltPosition(belt.id, belt.coordinates.lat, belt.coordinates.lng);
```

## 为什么这样做

| 方案 | 优点 | 缺点 |
|---|---|---|
| 线性映射公式 | 自动适配任何坐标 | SimpleMaps SVG投影差异导致不准确 |
| 手动校准表 ✓ | 精确定位，不受投影影响 | 需要手动维护 |

## 如何调整坐标

需要移动某个产业带的位置？

1. 打开 `web/src/components/industrial-map/ChinaIndustrialMap.tsx`
2. 找到 `BELT_POSITION_FIXES` 对象
3. 修改对应产业带的 x 或 y 值：
   - **向右**: x + 1
   - **向左**: x - 1
   - **向下**: y + 1
   - **向上**: y - 1
4. 浏览器会自动热更新，查看效果

## 坐标范围

- **X值范围**: 66-80 (东南沿海地区占据SVG的这个区域)
- **Y值范围**: 40-68 (南北向跨越长江流域)

## 参考文档

- 📄 [完整校准指南](INDUSTRIAL_BELT_CALIBRATION_GUIDE.md)
- 📊 [坐标配置文件](web/src/data/belt-position-calibration.json)
- 💾 [源代码](web/src/components/industrial-map/ChinaIndustrialMap.tsx)

## 性能提示

- ✅ 校准表查找 O(1)，性能最优
- ✅ 每次渲染时自动调用，无额外开销
- ✅ 可以在控制台看到调试输出

## 下一步

1. **测试**: 在浏览器中打开 `/industrial-os` 查看效果
2. **微调**: 如果位置还需要调整，修改校准表中的坐标
3. **文档**: 更新 `belt-position-calibration.json` 保持同步

---

**修改时间**: 2026-02-06  
**状态**: ✅ 已在GitHub上线  
**相关提交**:
- `905ad49`: 使用手动校准表精确定位产业带位置
- `67bdaa3`: 添加产业带坐标校准文档和配置
