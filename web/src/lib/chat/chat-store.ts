/**
 * Chat Store - Zustand 状态管理
 * 管理聊天会话、消息历史、处理状态
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, ChatSession, ChatState } from '@/types/chat';

interface ChatStore extends ChatState {
  // Actions
  createSession: () => void;
  setCurrentSession: (sessionId: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  deleteSession: (sessionId: string) => void;
  setProcessing: (isProcessing: boolean) => void;
  setError: (error: string | null) => void;
  clearCurrentSession: () => void;
  getCurrentSession: () => ChatSession | null;
  getCurrentMessages: () => Message[];
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Initial State
      sessions: [],
      currentSessionId: null,
      isProcessing: false,
      error: null,

      // Create new session
      createSession: () => {
        const newSession: ChatSession = {
          id: `session-${Date.now()}`,
          title: '新对话',
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [
            {
              id: `msg-${Date.now()}`,
              role: 'agent',
              type: 'text',
              content: '👋 你好！我是你的智能采购助手。\n\n发送一个 TikTok 链接，我会帮你：\n📹 分析产品特征\n🏭 匹配认证工厂\n💰 生成实时报价',
              timestamp: new Date(),
              data: {
                quickActions: [
                  { id: 'action-1', label: '📹 分析视频', action: 'analyze' },
                  { id: 'action-2', label: '🏭 查找工厂', action: 'find_factory' },
                  { id: 'action-3', label: '💰 计算报价', action: 'calculate_price' },
                ],
              },
            },
          ],
        };

        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id,
        }));
      },

      // Set current session
      setCurrentSession: (sessionId: string) => {
        set({ currentSessionId: sessionId });
      },

      // Add message to current session
      addMessage: (message) => {
        const { currentSessionId, sessions } = get();
        if (!currentSessionId) return;

        const newMessage: Message = {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date(),
        };

        set({
          sessions: sessions.map((session) =>
            session.id === currentSessionId
              ? {
                  ...session,
                  messages: [...session.messages, newMessage],
                  updatedAt: new Date(),
                  // 自动更新会话标题（使用第一条用户消息）
                  title:
                    session.title === '新对话' && message.role === 'user'
                      ? message.content.substring(0, 30) + (message.content.length > 30 ? '...' : '')
                      : session.title,
                }
              : session
          ),
        });
      },

      // Update existing message
      updateMessage: (messageId, updates) => {
        const { currentSessionId, sessions } = get();
        if (!currentSessionId) return;

        set({
          sessions: sessions.map((session) =>
            session.id === currentSessionId
              ? {
                  ...session,
                  messages: session.messages.map((msg) =>
                    msg.id === messageId ? { ...msg, ...updates } : msg
                  ),
                  updatedAt: new Date(),
                }
              : session
          ),
        });
      },

      // Delete session
      deleteSession: (sessionId: string) => {
        const { currentSessionId } = get();
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== sessionId),
          currentSessionId: currentSessionId === sessionId ? null : currentSessionId,
        }));
      },

      // Set processing state
      setProcessing: (isProcessing: boolean) => {
        set({ isProcessing });
      },

      // Set error
      setError: (error: string | null) => {
        set({ error });
      },

      // Clear current session
      clearCurrentSession: () => {
        set({ currentSessionId: null });
      },

      // Get current session
      getCurrentSession: () => {
        const { sessions, currentSessionId } = get();
        return sessions.find((s) => s.id === currentSessionId) || null;
      },

      // Get current messages
      getCurrentMessages: () => {
        const session = get().getCurrentSession();
        return session?.messages || [];
      },
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
      }),
    }
  )
);
