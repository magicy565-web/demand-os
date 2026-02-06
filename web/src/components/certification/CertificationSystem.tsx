'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle2, 
  Award,
  FileCheck,
  Factory,
  TrendingUp,
  Clock,
  Star,
  Target,
  Eye,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const CertificationSystem: React.FC = () => {
  const certificationTypes = [
    {
      type: 'compliance',
      name: '合规认证',
      icon: FileCheck,
      color: 'blue',
      description: '验证工厂的营业执照、出口资质、环保认证等法律合规性。',
      criteria: [
        '营业执照真实性验证',
        '出口资质审核（如适用）',
        '环保合规证明',
        '劳工权益保障证明',
        '税务合规记录'
      ]
    },
    {
      type: 'quality',
      name: '质量认证',
      icon: Award,
      color: 'emerald',
      description: '评估工厂的生产能力、质量控制体系和产品标准。',
      criteria: [
        'ISO 9001 或同等质量管理体系',
        '生产线实地考察',
        '样品质量测试',
        '质检流程审核',
        '客户投诉处理机制'
      ]
    },
    {
      type: 'fulfillment',
      name: '履约认证',
      icon: TrendingUp,
      color: 'purple',
      description: '追踪工厂的历史订单履约率、准时交付率和退货率。',
      criteria: [
        '历史订单准时交付率 > 95%',
        '质量合格率 > 97%',
        '退货率 < 3%',
        '客户满意度 > 4.5/5',
        '纠纷解决能力'
      ]
    },
    {
      type: 'export',
      name: '出口资质',
      icon: Target,
      color: 'amber',
      description: '确认工厂具备向目标市场出口的必要认证和资质。',
      criteria: [
        'CE 认证（欧盟市场）',
        'FCC 认证（美国市场）',
        'RoHS 合规证明',
        '海关编码备案',
        '国际物流合作伙伴'
      ]
    },
    {
      type: 'eco',
      name: '环保认证',
      icon: Shield,
      color: 'green',
      description: '评估工厂的环保措施、可持续生产能力和社会责任。',
      criteria: [
        'GOTS 有机认证（纺织品）',
        'OEKO-TEX 安全认证',
        '废水废气处理设施',
        '可再生能源使用',
        '碳足迹报告'
      ]
    }
  ];

  const auditProcess = [
    {
      step: 1,
      title: '申请提交',
      description: '工厂提交认证申请，提供基础资料和证明文件。',
      icon: FileCheck,
      duration: '1-2 天'
    },
    {
      step: 2,
      title: '资料审核',
      description: '我们的审核团队验证所有提交的证明文件的真实性。',
      icon: Eye,
      duration: '3-5 天'
    },
    {
      step: 3,
      title: '实地考察',
      description: '派遣专业团队到工厂进行生产线、质检流程的实地考察。',
      icon: Factory,
      duration: '1 天'
    },
    {
      step: 4,
      title: '样品测试',
      description: '抽取产品样品进行第三方质量检测和功能测试。',
      icon: Award,
      duration: '5-7 天'
    },
    {
      step: 5,
      title: '评分生成',
      description: '基于所有审核结果，生成工厂的信任评分（0-100）。',
      icon: Star,
      duration: '1-2 天'
    },
    {
      step: 6,
      title: '认证颁发',
      description: '通过审核的工厂获得认证标签，进入平台工厂名录。',
      icon: CheckCircle2,
      duration: '1 天'
    }
  ];

  const trustScoreBreakdown = [
    { category: '合规性', weight: 20, description: '法律合规、资质齐全' },
    { category: '质量控制', weight: 25, description: '生产能力、质检体系' },
    { category: '履约能力', weight: 30, description: '准时交付、质量合格率' },
    { category: '客户评价', weight: 15, description: '历史客户满意度' },
    { category: '创新能力', weight: 10, description: '研发能力、定制服务' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white font-mono text-xs uppercase tracking-widest font-bold">Trust & Certification</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              认证体系
            </h1>
            
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
              我们为每一家工厂进行严格的多维度审核，确保只有真正优质、可信的供应商才能进入我们的平台。
            </p>
          </motion.div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        {/* 认证类型 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-3">五大认证维度</h2>
            <p className="text-slate-600">全方位评估工厂的综合能力</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationTypes.map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-2xl transition-shadow"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-${cert.color}-100 mb-4`}>
                    <Icon className={`w-6 h-6 text-${cert.color}-600`} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{cert.name}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{cert.description}</p>
                  <div className="space-y-2">
                    {cert.criteria.slice(0, 3).map((criterion, cidx) => (
                      <div key={cidx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className={`w-3.5 h-3.5 text-${cert.color}-500 flex-shrink-0 mt-0.5`} />
                        <span>{criterion}</span>
                      </div>
                    ))}
                    {cert.criteria.length > 3 && (
                      <div className="text-xs text-slate-400 pl-5">+{cert.criteria.length - 3} 更多标准</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 审核流程 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-3">审核流程</h2>
            <p className="text-slate-600">从申请到认证，平均 15-20 天完成</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditProcess.map((process, idx) => {
              const Icon = process.icon;
              return (
                <div key={process.step} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-slate-900 hover:bg-slate-800 text-white text-xs">
                          Step {process.step}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {process.duration}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">{process.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{process.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 信任评分体系 */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl text-white mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-3">信任评分体系</h2>
            <p className="text-white/80">基于 5 大维度的加权评分，满分 100 分</p>
          </div>
          <div className="space-y-4">
            {trustScoreBreakdown.map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-bold text-lg">{item.category}</div>
                    <div className="text-sm text-white/70">{item.description}</div>
                  </div>
                  <div className="text-2xl font-black text-blue-400">{item.weight}%</div>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 transition-all"
                    style={{ width: `${item.weight * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200 text-center">
          <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-slate-900 mb-3">想要申请工厂认证？</h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            如果你是工厂方，并希望加入我们的认证工厂名录，请联系我们的审核团队。
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
            申请认证
          </button>
        </div>
      </div>
    </div>
  );
};
