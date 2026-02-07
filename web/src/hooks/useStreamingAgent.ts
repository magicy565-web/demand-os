/**
 * React Hook: useStreamingAgent
 * 
 * Consumes the streaming agent API and provides real-time updates
 * to React components.
 */

import { useState, useCallback, useRef } from 'react';
import { AgentStep, AgentResult } from '@/lib/agent-engine-v2';

interface StreamMessage {
  type: 'step' | 'log' | 'result' | 'error' | 'complete';
  data: any;
  timestamp: string;
}

interface UseStreamingAgentReturn {
  steps: AgentStep[];
  result: AgentResult | null;
  isStreaming: boolean;
  error: string | null;
  startStream: (tiktokUrl: string) => Promise<void>;
  cancelStream: () => void;
}

export function useStreamingAgent(): UseStreamingAgentReturn {
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [result, setResult] = useState<AgentResult | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const startStream = useCallback(async (tiktokUrl: string) => {
    // Reset state
    setSteps([]);
    setResult(null);
    setError(null);
    setIsStreaming(true);

    // Initialize steps
    const initialSteps: AgentStep[] = [
      {
        id: 'step-1',
        agent: 'Traffic',
        action: 'Analyzing TikTok Trend Data',
        status: 'pending',
        log: [],
        timestamp: new Date().toISOString(),
      },
      {
        id: 'step-2',
        agent: 'Capacity',
        action: 'Matching Verified Factories',
        status: 'pending',
        log: [],
        timestamp: new Date().toISOString(),
      },
      {
        id: 'step-3',
        agent: 'Financial',
        action: 'Calculating ROI & Pricing Tiers',
        status: 'pending',
        log: [],
        timestamp: new Date().toISOString(),
      },
      {
        id: 'step-4',
        agent: 'Execution',
        action: 'Generating Opportunity Report',
        status: 'pending',
        log: [],
        timestamp: new Date().toISOString(),
      },
    ];

    setSteps(initialSteps);

    // Create abort controller
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/agent/stream-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tiktokUrl }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Stream API error: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            try {
              const message: StreamMessage = JSON.parse(data);
              handleStreamMessage(message, setSteps, setResult, setError);
            } catch (parseError) {
              console.error('Failed to parse SSE message:', parseError);
            }
          }
        }
      }

      setIsStreaming(false);

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('Stream cancelled by user');
      } else {
        console.error('Stream error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
      setIsStreaming(false);
    }
  }, []);

  return {
    steps,
    result,
    isStreaming,
    error,
    startStream,
    cancelStream,
  };
}

/**
 * Handle incoming stream messages and update state
 */
function handleStreamMessage(
  message: StreamMessage,
  setSteps: React.Dispatch<React.SetStateAction<AgentStep[]>>,
  setResult: React.Dispatch<React.SetStateAction<AgentResult | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  switch (message.type) {
    case 'step':
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const index = newSteps.findIndex(s => s.id === message.data.id);
        
        if (index !== -1) {
          newSteps[index] = {
            ...newSteps[index],
            ...message.data,
          };
        }
        
        return newSteps;
      });
      break;

    case 'log':
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const index = newSteps.findIndex(s => s.id === message.data.stepId);
        
        if (index !== -1) {
          const timestamp = new Date().toLocaleTimeString();
          newSteps[index].log.push(`[${timestamp}] ${message.data.message}`);
        }
        
        return newSteps;
      });
      break;

    case 'result':
      setResult(message.data);
      break;

    case 'error':
      setError(message.data.message);
      break;

    case 'complete':
      console.log('Stream completed:', message.data.message);
      break;

    default:
      console.warn('Unknown message type:', message.type);
  }
}
