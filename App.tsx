import React, { useState, useCallback } from 'react';
import { TOPICS, getQuestionsForTopic } from './constants';
import { QuizState, Topic } from './types';
import { GlassCard, Button } from './components/Layout';
import { Timer, QuestionCard } from './components/Quiz';
import { ResultsView } from './components/Results';
import { Scale, ListOrdered, Variable, TrendingUp, GitMerge, Triangle, Activity, PlayCircle } from 'lucide-react';

// Icon mapper
const IconMap: Record<string, React.FC<any>> = {
  Scale, ListOrdered, Variable, TrendingUp, GitMerge, Triangle, Activity
};

const App: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'quiz' | 'results'>('welcome');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentTopicId: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    timeRemaining: 1800, // 30 minutes
    isActive: false,
    isFinished: false,
    score: 0,
    history: []
  });

  const startQuiz = (topic: Topic) => {
    const questions = getQuestionsForTopic(topic.id);
    setSelectedTopic(topic);
    setQuizState({
      currentTopicId: topic.id,
      questions: questions,
      currentQuestionIndex: 0,
      answers: {},
      timeRemaining: 30 * 60,
      isActive: true,
      isFinished: false,
      score: 0,
      history: []
    });
    setView('quiz');
  };

  const handleTimeUp = useCallback(() => {
    setQuizState(prev => ({ ...prev, isActive: false, isFinished: true }));
    setView('results');
  }, []);

  const handleOptionSelect = (optionIdx: number) => {
    // Prevent changing answer once selected for this specific design (Instant Feedback)
    if (quizState.answers[quizState.questions[quizState.currentQuestionIndex].id] !== undefined) return;

    setQuizState(prev => {
        const currentQ = prev.questions[prev.currentQuestionIndex];
        const isCorrect = optionIdx === currentQ.correctAnswerIndex;
        
        return {
            ...prev,
            score: isCorrect ? prev.score + 1 : prev.score,
            answers: { ...prev.answers, [currentQ.id]: optionIdx },
            history: [
                ...prev.history,
                { 
                    questionId: currentQ.id, 
                    isCorrect, 
                    timeTaken: 0, // Simplified for this demo
                    skipped: false
                }
            ]
        };
    });
  };

  const handleNext = () => {
      if (quizState.currentQuestionIndex >= quizState.questions.length - 1) {
          setView('results');
      } else {
          setQuizState(prev => ({
              ...prev,
              currentQuestionIndex: prev.currentQuestionIndex + 1
          }));
      }
  };

  const handleSkip = () => {
    setQuizState(prev => {
        const currentQ = prev.questions[prev.currentQuestionIndex];
        return {
            ...prev,
            answers: { ...prev.answers, [currentQ.id]: -1 }, // -1 indicates skipped in UI logic if needed, or just undefined
            history: [
                ...prev.history,
                { 
                    questionId: currentQ.id, 
                    isCorrect: false, 
                    timeTaken: 0,
                    skipped: true
                }
            ],
            currentQuestionIndex: prev.currentQuestionIndex >= prev.questions.length - 1 ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1
        };
    });
    // If it was the last question, go to results
    if (quizState.currentQuestionIndex >= quizState.questions.length - 1) {
        setView('results');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tealAccent/20 rounded-lg flex items-center justify-center border border-tealAccent/30 backdrop-blur-sm">
                <Variable className="text-tealAccent" />
            </div>
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Lumina Math</h1>
                <p className="text-xs text-slate-400 tracking-widest uppercase">IB MYP Grade 9</p>
            </div>
        </div>
        {view === 'quiz' && (
             <Timer 
                duration={quizState.timeRemaining} 
                isActive={quizState.isActive} 
                onTimeUp={handleTimeUp} 
             />
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full relative z-10">
        
        {view === 'welcome' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-blue-400">
                    Master Your Mathematics
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Select a module to begin your 30-minute interactive practice session. 
                    Featuring real-world problems and AI-powered performance analysis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {TOPICS.map((topic) => {
                    const Icon = IconMap[topic.iconName] || Variable;
                    return (
                        <GlassCard 
                            key={topic.id} 
                            onClick={() => startQuiz(topic)}
                            className="group relative overflow-hidden"
                        >
                             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                <Icon size={100} />
                             </div>
                             <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-tealAccent/10 flex items-center justify-center mb-4 text-tealAccent group-hover:bg-tealAccent group-hover:text-slate-900 transition-colors duration-300">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{topic.description}</p>
                                <div className="flex items-center justify-between text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    <span>{topic.questionCount} Questions</span>
                                    <span className="flex items-center gap-1 group-hover:text-tealAccent transition-colors">Start <PlayCircle size={14}/></span>
                                </div>
                             </div>
                        </GlassCard>
                    );
                })}
            </div>
          </div>
        )}

        {view === 'quiz' && selectedTopic && (
          <div className="animate-in fade-in zoom-in duration-500 max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}</span>
                    <span>{selectedTopic.title}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-tealAccent transition-all duration-500 ease-out"
                        style={{ width: `${((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100}%` }}
                    />
                </div>
                {/* Visual bubbles for history */}
                <div className="flex gap-1 mt-3 justify-center">
                    {quizState.questions.map((q, idx) => {
                        const historyItem = quizState.history.find(h => h.questionId === q.id);
                        let colorClass = "bg-slate-800 border-slate-700";
                        if (historyItem) {
                            if (historyItem.skipped) colorClass = "bg-amber-500/50 border-amber-500";
                            else if (historyItem.isCorrect) colorClass = "bg-green-500/50 border-green-500";
                            else colorClass = "bg-rose-500/50 border-rose-500";
                        } else if (idx === quizState.currentQuestionIndex) {
                            colorClass = "bg-slate-100 border-white animate-pulse";
                        }
                        
                        return (
                            <div key={q.id} className={`w-2 h-2 rounded-full border ${colorClass} transition-all duration-300`} />
                        );
                    })}
                </div>
            </div>

            <QuestionCard 
                question={quizState.questions[quizState.currentQuestionIndex]}
                selectedOptionIndex={quizState.answers[quizState.questions[quizState.currentQuestionIndex].id] ?? null}
                onSelectOption={handleOptionSelect}
                isAnswered={quizState.answers[quizState.questions[quizState.currentQuestionIndex].id] !== undefined}
                onNext={handleNext}
                onSkip={handleSkip}
            />
          </div>
        )}

        {view === 'results' && selectedTopic && (
            <ResultsView 
                state={quizState}
                questions={quizState.questions}
                topicName={selectedTopic.title}
                onRestart={() => startQuiz(selectedTopic)}
                onHome={() => setView('welcome')}
            />
        )}
      </main>
    </div>
  );
};

export default App;
