import React, { useEffect, useState } from 'react';
import { GlassCard, Button } from './Layout';
import { QuizState, Question, SWOTAnalysis } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { generateSWOTAnalysis } from '../services/geminiService';
import { Download, RefreshCw, Home, Zap, AlertTriangle, Target, Shield } from 'lucide-react';

interface ResultsProps {
  state: QuizState;
  questions: Question[];
  topicName: string;
  onRestart: () => void;
  onHome: () => void;
}

export const ResultsView: React.FC<ResultsProps> = ({ state, questions, topicName, onRestart, onHome }) => {
  const [swot, setSwot] = useState<SWOTAnalysis | null>(null);
  const [loadingSwot, setLoadingSwot] = useState(true);

  const correctCount = state.history.filter(h => h.isCorrect).length;
  const skippedCount = state.history.filter(h => h.skipped).length;
  const wrongCount = state.history.length - correctCount - skippedCount;
  const total = state.history.length;
  
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const chartData = [
    { name: 'Correct', value: correctCount, color: '#4ade80' },
    { name: 'Incorrect', value: wrongCount, color: '#f43f5e' },
    { name: 'Skipped', value: skippedCount, color: '#fbbf24' },
  ].filter(d => d.value > 0);

  useEffect(() => {
    const fetchSWOT = async () => {
      const data = await generateSWOTAnalysis(topicName, state, questions);
      setSwot(data);
      setLoadingSwot(false);
    };
    fetchSWOT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Card */}
        <GlassCard className="flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-3xl font-bold mb-2">Module Complete!</h2>
            <p className="text-slate-400 mb-6">{topicName}</p>
            
            <div className="relative w-48 h-48 mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold text-white">{percentage}%</span>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Accuracy</span>
                 </div>
            </div>

            <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-green-400"></div> {correctCount} Correct</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div> {wrongCount} Wrong</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-400"></div> {skippedCount} Skipped</div>
            </div>
        </GlassCard>

        {/* AI Analysis Card */}
        <GlassCard className="relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap size={120} />
             </div>
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="text-yellow-400" /> AI Performance Analysis
             </h3>
             
             {loadingSwot ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-4 min-h-[300px]">
                     <div className="w-8 h-8 border-4 border-tealAccent border-t-transparent rounded-full animate-spin"></div>
                     <p className="text-slate-400 animate-pulse">Analyzing reasoning patterns...</p>
                 </div>
             ) : (
                 <div className="space-y-4 text-sm h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="italic text-slate-300 border-l-4 border-tealAccent pl-3 mb-4">{swot?.summary}</p>
                    
                    <div className="grid grid-cols-1 gap-3">
                        <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                            <h4 className="font-semibold text-green-400 flex items-center gap-2 mb-2"><Target size={14}/> Strengths</h4>
                            <ul className="list-disc list-inside text-slate-300 space-y-1">
                                {swot?.strengths.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                        <div className="bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                            <h4 className="font-semibold text-rose-400 flex items-center gap-2 mb-2"><AlertTriangle size={14}/> Weaknesses</h4>
                            <ul className="list-disc list-inside text-slate-300 space-y-1">
                                {swot?.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                         <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <h4 className="font-semibold text-blue-400 flex items-center gap-2 mb-2"><Shield size={14}/> Improvement Plan</h4>
                            <ul className="list-disc list-inside text-slate-300 space-y-1">
                                {swot?.opportunities.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                    </div>
                 </div>
             )}
        </GlassCard>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={onRestart} variant="secondary">
            <RefreshCw size={18} /> Retry Module
          </Button>
          <Button onClick={onHome} variant="primary">
            <Home size={18} /> Back to Dashboard
          </Button>
          <Button variant="ghost" disabled>
             <Download size={18} /> Download Report (PDF)
          </Button>
      </div>
    </div>
  );
};
