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
  AlertCircle,
  Database,
  BarChart3
} from 'lucide-react';
import { ViralTrackerAgentFlow, AgentStep } from '@/lib/agent-engine-v2';

export const AgentWorkboard: React.FC = () => {
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputUrl, setInputUrl] = useState('https://www.tiktok.com/@trending/video/7321849201');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [steps]);

  const handleStart = async () => {
    setIsProcessing(true);
    setSteps([]);
    
    try {
      // 调用后端 API 执行 Agent Flow
      const response = await fetch('/api/agent/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tiktokUrl: inputUrl }),
      });

      if (!response.ok) {
        throw new Error('Agent Flow API request failed');
      }

      const data = await response.json();
      
      if (data.success && data.steps) {
        setSteps(data.steps);
      }
    } catch (error) {
      console.error('Agent Flow Error:', error);
      // 如果 API 失败，回退到客户端执行
      const agent = new ViralTrackerAgentFlow((updatedSteps) => {
        setSteps(updatedSteps);
      });
      await agent.run(inputUrl);
    } finally {
      setIsProcessing(false);
    }
  };

  const allLogs = steps.flatMap(s => s.log);

  return (
    <div className="grid lg:grid-cols-12 gap-6 p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl min-h-[600px]">
      {/* 左侧：Agent 控制台 */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 mb-4 text-emerald-400">
            <Cpu className="w-5 h-5" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Autonomous Agent</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-mono mb-2 block">TikTok Source URL</label>
              <input 
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50"
                placeholder="Paste TikTok URL here..."
              />
            </div>
            <button 
              onClick={handleStart}
              disabled={isProcessing}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Agent Working...
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  Start Agent Flow
                </>
              )}
            </button>
          </div>
        </div>

        {/* 实时日志流 */}
        <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
            <span className="text-[10px] font-mono text-slate-400">EXECUTION_LOGS</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
          <div className="p-4 overflow-y-auto h-[350px] font-mono text-[10px] space-y-2">
            {allLogs.length === 0 && (
              <div className="text-slate-700 italic">Waiting for initiation...</div>
            )}
            <AnimatePresence initial={false}>
              {allLogs.map((log, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-slate-400"
                >
                  {log}
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
          {steps.map((step, idx) => (
            <div 
              key={step.id}
              className={`p-4 rounded-xl border transition-all ${
                step.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/50' :
                step.status === 'running' ? 'bg-blue-500/10 border-blue-500/50 animate-pulse' :
                'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`p-1.5 rounded-lg ${
                  step.status === 'completed' ? 'bg-emerald-500 text-slate-950' :
                  step.status === 'running' ? 'bg-blue-500 text-white' :
                  'bg-slate-800 text-slate-500'
                }`}>
                  {step.agent === 'Traffic' && <Search className="w-3.5 h-3.5" />}
                  {step.agent === 'Capacity' && <Database className="w-3.5 h-3.5" />}
                  {step.agent === 'Financial' && <BarChart3 className="w-3.5 h-3.5" />}
                  {step.agent === 'Execution' && <ShieldCheck className="w-3.5 h-3.5" />}
                </div>
                {step.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              </div>
              <div className="text-[10px] font-bold text-white mb-1">{step.agent} Agent</div>
              <div className="text-[9px] text-slate-500 leading-tight">{step.action}</div>
            </div>
          ))}
          {steps.length === 0 && Array(4).fill(0).map((_, i) => (
            <div key={i} className="p-4 rounded-xl border bg-slate-900/50 border-slate-800 opacity-50">
              <div className="w-8 h-8 bg-slate-800 rounded-lg mb-2" />
              <div className="h-2 w-16 bg-slate-800 rounded mb-1" />
              <div className="h-2 w-24 bg-slate-800 rounded" />
            </div>
          ))}
        </div>

        {/* 核心产出数据预览 */}
        <div className="flex-1 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
            <h4 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Trend Intelligence
            </h4>
            {steps[0]?.status === 'completed' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase mb-1">Detected Product</div>
                  <div className="text-lg font-black text-white">Portable Neck Fan - Silent Pro</div>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-[9px]">Viral</span>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[9px]">High Margin</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="text-[9px] text-slate-500 uppercase">Growth</div>
                    <div className="text-xl font-black text-emerald-400">+450%</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="text-[9px] text-slate-500 uppercase">Intent</div>
                    <div className="text-xl font-black text-blue-400">High</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-40 flex items-center justify-center text-slate-800 font-mono text-[10px]">WAITING_FOR_DATA...</div>
            )}
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 relative overflow-hidden">
            <h4 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-widest flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              ROI Prediction
            </h4>
            {steps[2]?.status === 'completed' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="text-[9px] text-slate-500 uppercase">Est. ROI</div>
                    <div className="text-xl font-black text-emerald-400">350%</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="text-[9px] text-slate-500 uppercase">Payback</div>
                    <div className="text-xl font-black text-white">14 Days</div>
                  </div>
                </div>
                <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                  <div className="text-[10px] text-emerald-500/70 mb-1 font-bold">SUPPLY CHAIN STATUS</div>
                  <div className="text-sm text-white">Top 3 Certified Factories Matched & Capacity Reserved.</div>
                </div>
              </motion.div>
            ) : (
              <div className="h-40 flex items-center justify-center text-slate-800 font-mono text-[10px]">ANALYZING_FINANCIALS...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
