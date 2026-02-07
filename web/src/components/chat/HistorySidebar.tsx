'use client';

/**
 * HistorySidebar - 历史记录侧边栏
 */

import { useChatStore } from '@/lib/chat/chat-store';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Plus, MessageSquare, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HistorySidebar({ isOpen, onClose }: HistorySidebarProps) {
  const {
    sessions,
    currentSessionId,
    createSession,
    setCurrentSession,
    deleteSession,
  } = useChatStore();

  const handleNewChat = () => {
    createSession();
    onClose();
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSession(sessionId);
    onClose();
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('确定要删除这个对话吗？')) {
      deleteSession(sessionId);
    }
  };

  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏 */}
      <div
        className={cn(
          'fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white border-r transform transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* 头部 */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold text-slate-900">历史记录</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* 新建对话按钮 */}
          <div className="p-4">
            <Button onClick={handleNewChat} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              新建对话
            </Button>
          </div>

          {/* 会话列表 */}
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-2 pb-4">
              {sessions.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  暂无历史记录
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => handleSelectSession(session.id)}
                    className={cn(
                      'group relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors',
                      currentSessionId === session.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-slate-50 border border-transparent'
                    )}
                  >
                    <MessageSquare className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {session.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {session.messages.length} 条消息 •{' '}
                        {new Date(session.updatedAt).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      onClick={(e) => handleDeleteSession(session.id, e)}
                    >
                      <Trash2 className="w-3 h-3 text-red-500" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* 底部信息 */}
          <div className="p-4 border-t">
            <p className="text-xs text-slate-400 text-center">
              共 {sessions.length} 个对话
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
