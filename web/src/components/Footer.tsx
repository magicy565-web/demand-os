"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 mt-12 border-t border-[#21262d] bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & 描述 */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-white mb-3">
              Industrial<span className="text-blue-500">OS</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              专业外贸订单对接平台 · 连接全球采购商与中国优质工厂
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
              <span className="status-indicator status-active" />
              系统正常运行中
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  需求大厅
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  工厂入驻
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  API 开发文档
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  关于平台
                </a>
              </li>
            </ul>
          </div>

          {/* 支持 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">支持服务</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>客服: support@industrialos.com</li>
              <li>工作时间: 9:00 - 18:00 (周一至周五)</li>
              <li>商务合作: bd@industrialos.com</li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[#21262d]">
          <p className="text-xs text-gray-500">
            © {currentYear} Industrial OS. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-2 md:mt-0">
            Powered by <span className="text-blue-400">Industrial Oasis</span> · 工业绿洲跨境电商产业园
          </p>
        </div>
      </div>
    </footer>
  );
}
