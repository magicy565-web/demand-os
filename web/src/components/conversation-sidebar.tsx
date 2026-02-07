/**
 * Conversation Sidebar Component
 * Displays user's conversation history
 */

'use client';

import { useEffect, useState } from 'react';
import { useConversationStore, type Conversation } from '@/lib/store/conversation-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Search } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ConversationSidebarProps {
  token?: string;
  userId?: string;
  onSelectConversation?: (conversation: Conversation) => void;
}

export function ConversationSidebar({
  token,
  userId,
  onSelectConversation,
}: ConversationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    conversations,
    selectedConversation,
    isLoading,
    setConversations,
    selectConversation,
    deleteConversation,
    setLoading,
    setError,
  } = useConversationStore();

  // Fetch conversations on mount
  useEffect(() => {
    if (!token || !userId) return;

    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/conversations?userId=${userId}&limit=50`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch conversations');

        const data = await response.json();
        setConversations(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch conversations');
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [token, userId, setConversations, setLoading, setError]);

  const filteredConversations = conversations.filter((conv) =>
    conv.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/conversations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete conversation');

      deleteConversation(id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete conversation');
    }
  };

  const handleSelect = (conversation: Conversation) => {
    selectConversation(conversation);
    onSelectConversation?.(conversation);
  };

  return (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-3">对话历史</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索对话..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              加载中...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {conversations.length === 0 ? '暂无对话记录' : '未找到匹配的对话'}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-primary/10 border-primary'
                      : 'border-border hover:bg-accent'
                  }`}
                  onClick={() => handleSelect(conversation)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">
                        {conversation.product_name}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">
                          趋势: {conversation.trend_score}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(conversation.created_at).toLocaleDateString('zh-CN')}
                        </span>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>删除对话</AlertDialogTitle>
                        <AlertDialogDescription>
                          确定要删除这条对话记录吗？此操作无法撤销。
                        </AlertDialogDescription>
                        <div className="flex gap-3 justify-end">
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(conversation.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            删除
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
