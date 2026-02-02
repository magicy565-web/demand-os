"use client"

import { TrendingUp, Play } from "lucide-react"
import { useRef, useState } from "react"

export function RealTimeOverseasServices() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  const handleVideoPause = () => {
    setIsPlaying(false)
  }

  return (
    <section className="section-padding bg-navy text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-brand-blue/10 blur-[100px] sm:blur-[150px] rounded-full" />
      <div className="hidden sm:block absolute bottom-0 right-1/4 w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-gold/8 blur-[120px] rounded-full" />
      
      <div className="container-editorial relative z-10">
        {/* 左右布局：左边视频，右边文字 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* 左边：视频 */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-video bg-black border border-white/10 rounded-xl overflow-hidden group cursor-pointer" onClick={handlePlayClick}>
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                controls={false}
                className="w-full h-full object-cover"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect fill='%23000' width='16' height='9'/%3E%3Cpath fill='%23fff' d='M6.5 3L10.5 6l-4 3V3z'/%3E%3C/svg%3E"
                onEnded={handleVideoEnded}
                onPause={handleVideoPause}
              >
                <source
                  src="https://demand-os-discord.oss-cn-hangzhou.aliyuncs.com/2%E6%9C%882%E6%97%A5%281%29.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              
              {/* 播放按钮 - 仅当未播放时显示 */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors duration-300">
                  <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>
              )}
            </div>
            {/* 装饰性光晕 */}
            <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue/20 to-gold/20 blur-2xl -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* 右边：文字内容 */}
          <div className="order-1 lg:order-2">
            <span className="badge badge-blue mb-4 sm:mb-6 inline-flex items-center gap-2">
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Real-Time Services
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-[family-name:var(--font-noto-serif-sc)] font-medium mb-4 sm:mb-6 text-white leading-tight">
              实时服务海外采购商
            </h2>

            <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed chinese-text">
              智能匹配 · 透明定价 · 实时反馈
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-brand-blue to-gold rounded-full" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    订单全景可见
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                    每一个订单从询价、报价到交付的全链路实时跟踪，CEO级的确定性控制
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-brand-blue to-gold rounded-full" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    库存智能管理
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                    实时库存数据与需求波动预测，避免滞销与断货
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-1 bg-gradient-to-b from-brand-blue to-gold rounded-full" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    供应链透明化
                  </h3>
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                    从工厂直到末端客户的全流程可视化，消除信息孤岛
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-brand-blue to-brand-blue/80 hover:from-brand-blue hover:to-brand-blue text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-brand-blue/50 text-sm sm:text-base">
                体验实时服务
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
