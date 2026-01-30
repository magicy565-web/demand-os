# Public 文件夹图片说明

## 文件夹结构

```
public/
├── logo.png                    # 主 Logo（HONGYIHONG）
├── favicon.ico                 # 网站图标
└── images/
    ├── hero-bg.jpg            # Hero 区域背景图
    ├── factory.jpg            # 客户成功案例工厂照片
    ├── world-map.svg          # 全球贸易地图可视化
    └── partners/              # 合作伙伴 Logo
        ├── amazon.png
        ├── tiktok.png
        ├── walmart.png
        ├── maersk.png
        ├── dhl.png
        └── sinosure.png
```

## 图片规格建议

### Logo (logo.png)
- **尺寸**: 240x60px (4:1 比例)
- **格式**: PNG (支持透明背景)
- **颜色**: 深蓝色 #051c2c 或白色（根据背景）
- **用途**: 导航栏品牌标识

### Hero 背景 (hero-bg.jpg)
- **尺寸**: 1920x1080px
- **格式**: JPG (优化压缩)
- **风格**: 高端商务、工业园区鸟瞰图
- **颜色**: 柔和灰蓝色调

### 工厂照片 (factory.jpg)
- **尺寸**: 800x600px
- **格式**: JPG
- **风格**: 黑白或去色处理
- **内容**: 现代化生产线、工业设备

### 合作伙伴 Logo
- **尺寸**: 统一 200x80px
- **格式**: PNG (透明背景)
- **颜色**: 灰度处理（opacity: 0.5）
- **品牌**: Amazon, TikTok, Walmart, Maersk, DHL, 中国信保

## 使用示例

```tsx
// 使用 Next.js Image 组件
import Image from "next/image";

// Logo
<Image 
  src="/logo.png" 
  alt="HONGYIHONG" 
  width={240} 
  height={60}
  priority
/>

// 工厂照片
<Image 
  src="/images/factory.jpg" 
  alt="工厂生产线" 
  fill
  className="object-cover grayscale"
/>

// 合作伙伴
<Image 
  src="/images/partners/amazon.png" 
  alt="Amazon" 
  width={120} 
  height={48}
  className="opacity-50 hover:opacity-100 transition"
/>
```

## 图片优化建议

1. **压缩**: 使用 TinyPNG 或 ImageOptim 压缩
2. **格式**: Logo 用 PNG，照片用 JPG，图标用 SVG
3. **尺寸**: 不要上传超大原图，按实际显示尺寸 2x 准备
4. **命名**: 使用小写字母和连字符（kebab-case）
5. **Alt 文本**: 所有图片都要有描述性 alt 属性

## 占位符

在没有实际图片时，组件会显示占位符：
- Logo: 文字 "HONGYIHONG"
- 照片: 灰色背景 + 描述文字
- 合作伙伴: 品牌名称文字

请将实际图片放入对应位置即可自动替换。
