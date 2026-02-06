'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Activity, 
  Search, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ViralTrendTask, AgentLog } from '@/types/agent-flow';
import { ViralTrackerAgent } from '@/lib/agent-engine';

export const AgentWorkboard: React.FC = () => {
  const [activeTask, setActiveTask] = useState<ViralTrendTask | null>(null);
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputUrl, setInputUrl] = useState('https://www.tiktok.com/viral-trend-sample');
  const logEndRef = useRef<HTMLDivElement>(null);

  const agentRef = useRef<ViralTrackerAgent | null>(null);

  useEffect(() => {
    agentRef.current = new ViralTrackerAgent((task, log) => {
      setActiveTask({ ...task });
      setLogs(prev => [...prev, log]);
    });
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleStart = async () => {
    if (!agentRef.current) return;
    setIsProcessing(true);
    setLogs([]);
    await agentRef.current.startTracking(inputUrl);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6 p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl min-h-[600px]">
      {/* 左侧：Agent 控制台 */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <Cpu className="w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Agent Controller</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-mono mb-2 block">Target Trend URL</label>
              <input 
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50"
                placeholder="Paste TikTok URL here..."
              />
            </div>
            <button 
              onClick={handleStart}
              disabled={isProcessing && activeTask?.overallStatus === 'processing'}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {isProcessing && activeTask?.overallStatus === 'processing' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Flow...
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  Initiate Agent Flow
                </>
              )}
            </button>
          </div>
        </div>

        {/* 实时日志流 */}
        <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
            <span className="text-[10px] font-mono text-slate-400">LIVE_LOG_STREAM</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
          <div className="p-4 overflow-y-auto max-h-[300px] font-mono text-[10px] space-y-2">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-2 ${
                    log.level === 'success' ? 'text-emerald-400' : 
                    log.level === 'warning' ? 'text-amber-400' : 
                    log.level === 'error' ? 'text-rose-400' : 'text-slate-400'
                  }`}
                >
                  <span className="opacity-30">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                  <span>{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

      {/* 右侧：可视化流程展示 */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* 流程进度 */}
        <div className="grid md:grid-cols-4 gap-4">
          {activeTask?.steps.map((step, idx) => (
            <div 
              key={step.id}
              className={`p-4 rounded-xl border transition-all ${
                step.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/50' :
                step.status === 'processing' ? 'bg-blue-500/10 border-blue-500/50 animate-pulse' :
                'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`p-1.5 rounded-lg ${
                  step.status === 'completed' ? 'bg-emerald-500 text-slate-950' :
                  step.status === 'processing' ? 'bg-blue-500 text-white' :
                  'bg-slate-800 text-slate-500'
                }`}>
                  {idx === 0 && <Search className="w-3.5 h-3.5" />}
                  {idx === 1 && <Cpu className="w-3.5 h-3.5" />}
                  {idx === 2 && <TrendingUp className="w-3.5 h-3.5" />}
                  {idx === 3 && <ShieldCheck className="w-3.5 h-3.5" />}
                </div>
                {step.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </div>
              <div className="text-[10px] font-bold text-white mb-1">{step.name}</div>
              <div className="text-[9px] text-slate-500 leading-tight">{step.description}</div>
            </div>
          ))}
        </div>

        {/* 核心产出数据 */}
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          {/* 趋势与流量 */}
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <TrendingUp className="w-32 h-32" />
            </div>
            <h4 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Real-time Trend Intelligence
            </h4>
            
            <div className="space-y-6">
              <div>
                <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">Detected Product</div>
                <div className="text-lg font-black text-white">{activeTask?.productTitle || '---'}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[9px] text-slate-500 uppercase font-mono">Current Views</div>
                  <div className="text-xl font-black text-blue-400">{activeTask?.trendMetrics.views}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="text-[9px] text-slate-500 uppercase font-mono">Growth Velocity</div>
                  <div className="text-xl font-black text-emerald-400">+{activeTask?.trendMetrics.growthVelocity}x</div>
                </div>
              </div>
            </div>
          </div>

          {/* 闭环与 ROI */}
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <DollarSign className="w-32 h-32" />
            </div>
            <h4 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Capital Loop Prediction
            </h4>

            {activeTask?.roiPrediction ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">Investment</div>
                    <div className="text-lg font-black text-white">${activeTask.roiPrediction.investment.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono mb-1">Projected Revenue</div>
                    <div className="text-lg font-black text-emerald-400">${activeTask.roiPrediction.projectedRevenue.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-400">Payback Period</span>
                    <span className="text-lg font-black text-white">{activeTask.roiPrediction.paybackPeriod}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                  <div className="text-[9px] text-slate-500 mt-2">
                    *Exclusive capacity locked for 30 days to ensure supply stability.
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3 py-10">
                <AlertCircle className="w-8 h-8 opacity-20" />
                <span className="text-[10px] font-mono uppercase tracking-widest">Waiting for prediction...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
