#!/usr/bin/env python3
"""
精确计算产业带在SimpleMaps SVG中的位置
基于真实参考点的线性回归算法
"""

# SimpleMaps SVG中的已知参考点
reference_points = {
    'Beijing': {'lat': 39.90, 'lng': 116.40, 'svg_x': 682.1, 'svg_y': 324.3},
    'Shanghai': {'lat': 31.23, 'lng': 121.47, 'svg_x': 756.1, 'svg_y': 492.6},
    'Guangdong': {'lat': 23.13, 'lng': 113.26, 'svg_x': 638.0, 'svg_y': 609.9},
    'Zhejiang': {'lat': 30.27, 'lng': 120.15, 'svg_x': 734.0, 'svg_y': 527.6},
}

# 产业带实际坐标（从industrial_belts.json）
industrial_belts = [
    {'id': 1, 'name': '深圳', 'lat': 22.5431, 'lng': 114.0579},
    {'id': 2, 'name': '宁波', 'lat': 29.8683, 'lng': 121.5440},
    {'id': 3, 'name': '佛山', 'lat': 23.0215, 'lng': 113.1214},
    {'id': 4, 'name': '义乌', 'lat': 29.3003, 'lng': 120.0751},
    {'id': 5, 'name': '苏州', 'lat': 31.2989, 'lng': 120.5853},
    {'id': 6, 'name': '广州', 'lat': 22.93, 'lng': 113.38},
    {'id': 7, 'name': '永康', 'lat': 28.90, 'lng': 120.04},
    {'id': 8, 'name': '汕头', 'lat': 23.46, 'lng': 116.76},
]

# 使用北京-上海两点计算经度转换系数
bj = reference_points['Beijing']
sh = reference_points['Shanghai']

# 经度→X轴转换系数
lng_diff = sh['lng'] - bj['lng']  # 121.47 - 116.40 = 5.07度
x_diff = sh['svg_x'] - bj['svg_x']  # 756.1 - 682.1 = 74像素
LNG_SCALE = x_diff / lng_diff  # 14.596像素/度

# 使用北京-广东两点计算纬度转换系数  
gd = reference_points['Guangdong']
lat_diff = bj['lat'] - gd['lat']  # 39.90 - 23.13 = 16.77度
y_diff = gd['svg_y'] - bj['svg_y']  # 609.9 - 324.3 = 285.6像素
LAT_SCALE = y_diff / lat_diff  # 17.028像素/度

print(f"转换系数:")
print(f"  经度→X: {LNG_SCALE:.3f} 像素/度")
print(f"  纬度→Y: {LAT_SCALE:.3f} 像素/度")
print(f"\n参考点验证:")

# 验证参考点
for name, point in reference_points.items():
    calc_x = (point['lng'] - bj['lng']) * LNG_SCALE + bj['svg_x']
    calc_y = (bj['lat'] - point['lat']) * LAT_SCALE + bj['svg_y']
    err_x = abs(calc_x - point['svg_x'])
    err_y = abs(calc_y - point['svg_y'])
    print(f"  {name}: 计算({calc_x:.1f},{calc_y:.1f}) 实际({point['svg_x']},{point['svg_y']}) 误差({err_x:.1f},{err_y:.1f})")

print(f"\n\n产业带精确坐标 (SVG像素 & 百分比):\n")
print("const BELT_POSITION_ACCURATE: Record<number, { x: number; y: number }> = {")

for belt in industrial_belts:
    # 计算SVG像素坐标
    svg_x = (belt['lng'] - bj['lng']) * LNG_SCALE + bj['svg_x']
    svg_y = (bj['lat'] - belt['lat']) * LAT_SCALE + bj['svg_y']
    
    # 转换为百分比 (viewBox: 1000x738)
    x_percent = (svg_x / 1000) * 100
    y_percent = (svg_y / 738) * 100
    
    print(f"  {belt['id']}: {{ x: {x_percent:.1f}, y: {y_percent:.1f} }},  // {belt['name']} (SVG像素: {svg_x:.1f},{svg_y:.1f})")

print("};")
