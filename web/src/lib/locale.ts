// 本土化文案配置（通俗商务版）
// 风格：清晰、专业、可信赖 - 像 Flexport/Maersk 的国际化专业风格

export const content = {
  // 1. 页面大屏：强调"全球化"和"连接"
  hero: {
    badge: "全球供应链数字化服务平台",
    title: {
      line1: "数字链接全球",
      line2: "服务落地本地"
    },
    desc: "AI 提升采购效率，真人保障交易安全。我们在全球 5 大洲设立直营服务中心，用母语沟通，为您解决跨境交易的信任难题。",
    scrollHint: "查看全球服务网络"
  },

  // 2. 获客矩阵板块
  acquisition: {
    badge: {
      enterprise: "GLOBAL TRAFFIC MATRIX",
      government: "DIGITAL TRADE INFRASTRUCTURE"
    },
    title: {
      enterprise: "公私域全网获客矩阵",
      government: "跨境产业带数字化营销中枢"
    },
    desc: {
      enterprise: "打通 Facebook 精准投流、Discord 社群运营与 LinkedIn 决策人触达，让全球订单主动找上门。",
      government: "赋能园区企业构建'独立站+社群+B2B'全渠道出海能力，实现从'产品出海'到'品牌出海'的跨越。"
    },
    tabs: {
      public: {
        label: "公域捕获 (Facebook)",
        metric: "覆盖 100,000+ 行业群组"
      },
      private: {
        label: "私域社群 (Discord)",
        metric: "孵化 50+ 网红爆品"
      },
      sniper: {
        label: "决策人狙击 (LinkedIn)",
        metric: "直连 500 强采购 VP"
      }
    }
  },

  // 3. 地图板块：强调"实体存在"和"办事能力"
  map: {
    sectionTitle: "全球本地化服务网络",
    subTitle: "我们在您客户的家门口设有办事处，提供看样、谈判、售后一站式支持。",
    
    stations: {
      fra: {
        city: "法兰克福",
        country: "德国",
        title: "欧洲区运营中心",
        manager: "Hans Mueller",
        role: "DACH 区域负责人",
        status: "当前任务：陪同客户考察法兰克福展"
      },
      dxb: {
        city: "迪拜",
        country: "阿联酋",
        title: "中东非办事处",
        manager: "Amir Al-Fayed",
        role: "中东业务总监",
        status: "当前任务：协助沙特客户进行合同审核"
      },
      las: {
        city: "拉斯维加斯",
        country: "美国",
        title: "北美展示中心",
        manager: "Michael Ross",
        role: "北美渠道合伙人",
        status: "当前任务：CES 展位搭建与预热"
      },
      gz: {
        city: "广州",
        country: "中国",
        title: "全球调度总部",
        manager: "Sarah Chen",
        role: "总控中心",
        status: "系统状态：24小时全球订单匹配中"
      }
    },
    
    labels: {
      current: "当前查看站点",
      strategy: "职能定位",
      officer: "区域负责人",
      liveStatus: "实时工作状态",
      connectBtn: "联系该办事处"
    }
  },

  // 4. 智库/票据板块：强调"干货"和"价值"
  ticket: {
    badge: "行业私享会 · 邀请制",
    title: "2026 供应链成本与策略研讨会",
    subTitle: "深度解析原材料价格走势，分享头部企业的采购避坑经验。",
    
    speaker: {
      name: "Dr. Alan Chen",
      title: "资深供应链专家 / 前万豪集团采购 VP"
    },
    
    event: {
      date: "OCT 24, 2026",
      time: "10:00 AM EST"
    },
    
    benefits: {
      title: "参会权益 (需企业邮箱认证)",
      list: [
        "获取《2026 原材料成本趋势深度报告》",
        "获得 50 家优质源头工厂推荐名单",
        "加入全球采购总监交流群"
      ]
    },
    
    form: {
      email: "工作邮箱 (Business Email)",
      company: "公司名称"
    },
    
    cta: {
      btn: "预约参会席位 + 下载报告",
      note: "1,240 位专业买家已报名，剩余 12 个名额"
    }
  },

  // 5. 生态背书
  partners: {
    text: "合作机构与认证伙伴"
  }
}

export type ContentType = typeof content
