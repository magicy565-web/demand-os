from PIL import Image, ImageDraw
import math

# 创建高分辨率图像 (1920x1080)
width, height = 1920, 1080
img = Image.new('RGB', (width, height), color=(255, 255, 255))
draw = ImageDraw.Draw(img, 'RGBA')

# 定义配色 - 麦肯锡风格灰蓝色系
colors = [
    (208, 215, 230, 80),    # 浅灰蓝
    (139, 147, 173, 100),   # 中灰蓝
    (192, 200, 220, 60),    # 更浅灰蓝
    (160, 170, 196, 90),    # 柔和灰蓝
]

# 绘制背景渐变效果
for y in range(height):
    alpha = int(255 * (0.95 + 0.05 * (y / height)))
    gradient_color = (248, 249, 255, alpha)
    draw.line([(0, y), (width, y)], fill=gradient_color)

# 生成波浪线函数
def draw_wave(y_offset, amplitude, frequency, stroke_width, color):
    points = []
    for x in range(0, width + 20, 20):
        y = y_offset + amplitude * math.sin(x * frequency)
        points.append((x, y))
    
    for i in range(len(points) - 1):
        draw.line([points[i], points[i + 1]], fill=color, width=stroke_width)

# 绘制多层波浪 - 顶部组
draw_wave(150, 50, 0.004, 2, colors[0])
draw_wave(180, 40, 0.004, 1, colors[2])
draw_wave(210, 30, 0.004, 1, colors[3])

# 中间主波浪组
draw_wave(400, 80, 0.003, 3, colors[1])
draw_wave(480, 60, 0.003, 2, colors[0])
draw_wave(540, 40, 0.003, 1, colors[2])

# 下部波浪组
draw_wave(750, 70, 0.0035, 2, colors[0])
draw_wave(820, 50, 0.0035, 1, colors[2])
draw_wave(880, 35, 0.0035, 1, colors[3])

# 绘制竖向参考线 - 象征秩序
for x in [480, 960, 1440]:
    draw.line([(x, 0), (x, height)], fill=(208, 215, 230, 40), width=1)

# 绘制点缀圆形节点
node_positions = [
    (960, 300), (960, 540), (960, 780),
    (480, 400), (1440, 650), (720, 250), (1200, 850)
]
for x, y in node_positions:
    draw.ellipse([x-3, y-3, x+3, y+3], fill=(139, 147, 173, 80))

# 绘制轻微的几何线条
geometric_lines = [
    [(200, 250), (350, 300), (300, 450), (150, 400), (200, 250)],
    [(1570, 600), (1720, 650), (1670, 800), (1520, 750), (1570, 600)],
]
for line_points in geometric_lines:
    for i in range(len(line_points) - 1):
        draw.line([line_points[i], line_points[i + 1]], fill=(208, 215, 230, 50), width=1)

# 保存为高质量jpg
output_path = r'd:\Demand-os-v4\web\public\images\kexue.jpg'
img.save(output_path, 'JPEG', quality=95, optimize=True)
print("✓ kexue.jpg 已生成成功！")
