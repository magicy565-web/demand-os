"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Demand, API_CONFIG } from "@/types/demand";

interface UseWebSocketOptions {
  onMessage?: (demand: Demand, type: "create" | "update" | "delete") => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

interface WebSocketState {
  isConnected: boolean;
  lastMessage: Demand | null;
  messageCount: number;
}

/**
 * WebSocket Hook - 用于实时数据订阅
 */
export function useWebSocket(options: UseWebSocketOptions = {}) {
  const {
    onMessage,
    onConnect,
    onDisconnect,
    onError,
    autoReconnect = true,
    reconnectInterval = 5000,
  } = options;

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [state, setState] = useState<WebSocketState>({
    isConnected: false,
    lastMessage: null,
    messageCount: 0,
  });

  const connect = useCallback(() => {
    // 清理现有连接
    if (wsRef.current) {
      wsRef.current.close();
    }

    try {
      const ws = new WebSocket(API_CONFIG.WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("[WebSocket] Connected to Directus");
        setState((prev) => ({ ...prev, isConnected: true }));
        onConnect?.();

        // 订阅 demands 集合的变更
        ws.send(
          JSON.stringify({
            type: "subscribe",
            collection: "demands",
            query: {
              filter: { status: { _eq: "active" } },
              sort: ["-created_at"],
            },
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          // 处理订阅确认
          if (message.type === "subscription") {
            console.log("[WebSocket] Subscription confirmed:", message.uid);
            return;
          }

          // 处理数据变更
          if (message.type === "subscription" && message.event) {
            const { event: eventType, data } = message;
            
            if (data && Array.isArray(data) && data.length > 0) {
              const demand = data[0] as Demand;
              setState((prev) => ({
                ...prev,
                lastMessage: demand,
                messageCount: prev.messageCount + 1,
              }));
              onMessage?.(demand, eventType);
            }
          }

          // 直接的 CRUD 事件
          if (["create", "update", "delete"].includes(message.type)) {
            const demand = message.data as Demand;
            setState((prev) => ({
              ...prev,
              lastMessage: demand,
              messageCount: prev.messageCount + 1,
            }));
            onMessage?.(demand, message.type);
          }
        } catch (error) {
          console.error("[WebSocket] Failed to parse message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("[WebSocket] Error:", error);
        onError?.(error);
      };

      ws.onclose = () => {
        console.log("[WebSocket] Disconnected");
        setState((prev) => ({ ...prev, isConnected: false }));
        onDisconnect?.();

        // 自动重连
        if (autoReconnect) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("[WebSocket] Attempting to reconnect...");
            connect();
          }, reconnectInterval);
        }
      };
    } catch (error) {
      console.error("[WebSocket] Failed to connect:", error);
    }
  }, [onMessage, onConnect, onDisconnect, onError, autoReconnect, reconnectInterval]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return {
    ...state,
    connect,
    disconnect,
  };
}
