import React, { useEffect, useState } from 'react';
import { GlassCard, Button, Badge } from './Layout';
import { Question, QuestionType, Difficulty } from '../types';
import { Clock, CheckCircle, XCircle, SkipForward, HelpCircle, ArrowRight, BrainCircuit } from 'lucide-react';
import { getAIExplanation } from '../services/geminiService';

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / (30 * 60)) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 flex items-center justify-center">
         <svg className="absolute w-full h-full transform -rotate-90">
             <circle cx="24" cy="24" r="20" className="stroke-white/10 fill-none" strokeWidth="4" />
             <circle 
                cx="24" cy="24" r="20" 
                className={`fill-none transition-all duration-1000 ${timeLeft < 300 ? 'stroke-rose-500' : 'stroke-tealAccent'}`} 
                strokeWidth="4" 
                strokeDasharray="125.6" 
                strokeDashoffset={125.6 - (125.6 * progress) / 100}
                strokeLinecap="round"
             />
         </svg>
         <Clock size={16} className="text-white/70" />
      </div>
      <div className="font-mono text-xl font-bold tracking-widest">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

interface QuestionCardProps {
  question: Question;
  selectedOptionIndex: number | null;
  onSelectOption: (idx: number) => void;
  isAnswered: boolean;
  onNext: () => void;
  onSkip: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, selectedOptionIndex, onSelectOption, isAnswered, onNext, onSkip 
}) => {
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);

  // Reset hint when question changes
  useEffect(() => {
    setAiHint(null);
  }, [question.id]);

  const handleGetHint = async () => {
    setLoadingHint(true);
    const hint = await getAIExplanation(question);
    setAiHint(hint);
    setLoadingHint(false);
  };

  const isCorrect = selectedOptionIndex === question.correctAnswerIndex;

  return (
    <GlassCard className="max-w-3xl mx-auto w-full relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-tealAccent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
            <div className="flex gap-2">
                <Badge color={question.difficulty === Difficulty.Challenger ? 'purple' : question.difficulty === Difficulty.Hard ? 'amber' : 'green'}>
                    {question.difficulty}
                </Badge>
                {question.type === QuestionType.RealWorld && <Badge color="blue">Real World</Badge>}
            </div>
            <h3 className="text-xl md:text-2xl font-semibold leading-relaxed">
              {question.text}
            </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((opt, idx) => {
          let stateStyles = "hover:bg-white/5 border-white/10";
          if (isAnswered) {
             if (idx === question.correctAnswerIndex) stateStyles = "bg-green-500/20 border-green-500 text-green-100";
             else if (idx === selectedOptionIndex) stateStyles = "bg-rose-500/20 border-rose-500 text-rose-100 opacity-60";
             else stateStyles = "opacity-40 border-transparent";
          } else if (selectedOptionIndex === idx) {
              stateStyles = "bg-tealAccent/20 border-tealAccent text-teal-100";
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => onSelectOption(idx)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${stateStyles}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${isAnswered && idx === question.correctAnswerIndex ? 'bg-green-500 border-green-500 text-white' : 'border-current'}`}>
                   {String.fromCharCode(65 + idx)}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-rose-500/10 border border-rose-500/20'}`}>
           {isCorrect ? <CheckCircle className="text-green-400 shrink-0" /> : <XCircle className="text-rose-400 shrink-0" />}
           <div>
             <p className={`font-semibold ${isCorrect ? 'text-green-300' : 'text-rose-300'}`}>
                {isCorrect ? "Excellent Work!" : "Not quite right."}
             </p>
             <p className="text-slate-300 text-sm mt-1">{question.explanation}</p>
           </div>
        </div>
      )}

      {aiHint && (
         <div className="p-4 rounded-xl mb-6 bg-purple-500/10 border border-purple-500/20 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 mb-2 text-purple-300 font-semibold">
                <BrainCircuit size={18} />
                <span>AI Insight</span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">{aiHint}</p>
         </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-white/10">
         {!isAnswered ? (
             <>
                <Button variant="ghost" onClick={handleGetHint} disabled={loadingHint}>
                    {loadingHint ? 'Thinking...' : <><HelpCircle size={18} /> Ask AI Helper</>}
                </Button>
                <div className="flex gap-3">
                    <Button variant="secondary" onClick={onSkip}>
                        Skip <SkipForward size={18} />
                    </Button>
                </div>
             </>
         ) : (
             <div className="ml-auto">
                 <Button onClick={onNext}>
                     Next Question <ArrowRight size={18} />
                 </Button>
             </div>
         )}
      </div>
    </GlassCard>
  );
};
