'use client';

import { useState } from 'react';
import { Home, Clock, List, MessageSquare, Gift, Smartphone, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function AccioSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [messageCount] = useState(4);

  const historyItems = [
    '我想找国内耗材供应商',
    '我想采购这个食品盒子，出...',
  ];

  return (
    <div
      className={`h-screen bg-[#f7f7f8] border-r border-gray-200 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="text-2xl font-bold">
            Accio
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 hover:text-gray-900"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="p-2 space-y-1">
        {/* 首页 */}
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-700 hover:bg-gray-200 ${
            collapsed ? 'px-2' : 'px-4'
          }`}
        >
          <Home className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">首页</span>}
        </Button>

        {/* 历史记录 */}
        <div>
          <Button
            variant="ghost"
            className={`w-full justify-start text-gray-700 hover:bg-gray-200 ${
              collapsed ? 'px-2' : 'px-4'
            }`}
          >
            <Clock className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3">历史记录</span>}
          </Button>
          {!collapsed && (
            <div className="ml-12 mt-1 space-y-1">
              {historyItems.map((item, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer py-1 px-2 rounded hover:bg-gray-100 truncate"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 我的列表 */}
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-700 hover:bg-gray-200 ${
            collapsed ? 'px-2' : 'px-4'
          }`}
        >
          <List className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">我的列表</span>}
        </Button>

        {/* 消息 */}
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-700 hover:bg-gray-200 relative ${
            collapsed ? 'px-2' : 'px-4'
          }`}
        >
          <MessageSquare className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">消息</span>}
          {messageCount > 0 && (
            <Badge
              variant="destructive"
              className={`${
                collapsed ? 'absolute -top-1 -right-1' : 'ml-auto'
              } bg-red-500 text-white text-xs px-1.5 py-0.5`}
            >
              {messageCount}
            </Badge>
          )}
        </Button>

        {/* 邀请有礼 */}
        <Button
          variant="ghost"
          className={`w-full justify-start bg-emerald-50 text-emerald-700 hover:bg-emerald-100 ${
            collapsed ? 'px-2' : 'px-4'
          }`}
        >
          <Gift className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">邀请有礼</span>}
        </Button>

        {/* 下载 Accio APP */}
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-700 hover:bg-gray-200 ${
            collapsed ? 'px-2' : 'px-4'
          }`}
        >
          <Smartphone className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">下载Accio APP</span>}
        </Button>

        {/* 联系我们 */}
        <Button
          variant="ghost"
          className={`w-full justify-start text-gray-700 hover:bg-gray-200 ${
            collapsed ? 'px-2' : 'px-4'
          }`}
        >
          <HelpCircle className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="ml-3">联系我们</span>}
        </Button>
      </nav>
    </div>
  );
}
