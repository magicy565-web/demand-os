const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash免费图片URL (无需API key的直接下载链接)
const images = [
  {
    name: 'ai-matching.jpg',
    url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=900&fit=crop&q=80', // AI科技网络
    description: 'AI智能匹配系统'
  },
  {
    name: 'demand-dashboard.jpg',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&q=80', // 数据仪表盘
    description: '需求数据仪表盘'
  },
  {
    name: 'logistics.jpg',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=900&fit=crop&q=80', // 全球物流地图
    description: '全球物流网络'
  },
  {
    name: 'factory.jpg',
    url: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&h=900&fit=crop&q=80', // 现代化工厂
    description: '智能工厂生产线'
  },
  {
    name: 'partners/amazon.png',
    url: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=200&fit=crop&q=80', // 电商物流
    description: 'Amazon合作'
  },
  {
    name: 'partners/tiktok.png',
    url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop&q=80', // 社交媒体
    description: 'TikTok合作'
  },
  {
    name: 'partners/walmart.png',
    url: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=400&h=200&fit=crop&q=80', // 零售商店
    description: 'Walmart合作'
  },
  {
    name: 'partners/maersk.png',
    url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop&q=80', // 货轮港口
    description: 'Maersk合作'
  },
  {
    name: 'partners/dhl.png',
    url: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=200&fit=crop&q=80', // 快递物流
    description: 'DHL合作'
  },
  {
    name: 'partners/sinosure.png',
    url: 'https://images.unsplash.com/photo-1554224311-9f00d71be5e0?w=400&h=200&fit=crop&q=80', // 金融保险
    description: '中国信保合作'
  }
];

const publicDir = path.join(__dirname, '..', 'public', 'images');
const partnersDir = path.join(publicDir, 'partners');

// 确保目录存在
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
if (!fs.existsSync(partnersDir)) {
  fs.mkdirSync(partnersDir, { recursive: true });
}

function downloadImage(url, filepath, description) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${description}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${description} -> ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('开始从Unsplash下载高质量图片...\n');
  
  for (const image of images) {
    try {
      const filepath = path.join(publicDir, image.name);
      await downloadImage(image.url, filepath, image.description);
      // 避免请求过快
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`✗ Error downloading ${image.description}:`, error.message);
    }
  }
  
  console.log('\n所有图片下载完成! 🎉');
  console.log('文件保存在: d:\\Demand-os-v4\\web\\public\\images\\');
}

downloadAll().catch(console.error);
