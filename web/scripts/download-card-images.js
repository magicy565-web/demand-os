const https = require('https');
const fs = require('fs');
const path = require('path');

// 为其他卡片下载合适的背景图
const images = [
  {
    name: 'strategy-consulting.jpg',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=900&fit=crop&q=80', // 战略咨询 - 商务会议
    description: '战略咨询'
  },
  {
    name: 'tiktok-growth.jpg',
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=600&fit=crop&q=80', // TikTok增长 - 社交媒体
    description: 'TikTok孵化器'
  },
  {
    name: 'exhibition.jpg',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=600&fit=crop&q=80', // 展览 - 展会场景
    description: '海外展览'
  },
  {
    name: 'warehouse.jpg',
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=600&fit=crop&q=80', // 仓库 - 现代仓储
    description: '海外仓库'
  },
  {
    name: 'vip-club.jpg',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=600&fit=crop&q=80', // VIP俱乐部 - 高端会议
    description: '会员俱乐部'
  }
];

const publicDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
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
  console.log('开始下载卡片背景图...\n');
  
  for (const image of images) {
    try {
      const filepath = path.join(publicDir, image.name);
      await downloadImage(image.url, filepath, image.description);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`✗ Error downloading ${image.description}:`, error.message);
    }
  }
  
  console.log('\n所有卡片背景图下载完成! 🎉');
}

downloadAll().catch(console.error);
