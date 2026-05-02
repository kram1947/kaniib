import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mathTopics } from '../data/quizData'

export default function Quiz() {
  const { topicId } = useParams()
  const topic = mathTopics.find(t => t.id === topicId)
  
  const [gameState, setGameState] = useState('start') // start, quiz, results
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [showResults, setShowResults] = useState(false)
  
  useEffect(() => {
    if (gameState === 'quiz' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === 'quiz') {
      finishQuiz()
    }
  }, [timeLeft, gameState])
  
  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Topic Not Found</h2>
          <Link to="/math" className="btn-primary">Back to Math</Link>
        </div>
      </div>
    )
  }
  
  const startQuiz = () => {
    setGameState('quiz')
    setTimeLeft(topic.time * 60)
    setCurrentQuestion(0)
    setAnswers({})
  }
  
  const finishQuiz = () => {
    setGameState('results')
    setShowResults(true)
  }
  
  const selectAnswer = (letter) => {
    setAnswers({ ...answers, [topic.questionsList[currentQuestion].id]: letter })
  }
  
  const goNext = () => {
    if (currentQuestion < topic.questionsList.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }
  
  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  
  const calculateScore = () => {
    let correct = 0
    topic.questionsList.forEach(q => {
      if (answers[q.id] === q.correct) correct++
    })
    return Math.round((correct / topic.questionsList.length) * 100)
  }
  
  const getScoreDetails = () => {
    let correct = 0, incorrect = 0, skipped = 0
    topic.questionsList.forEach(q => {
      if (!answers[q.id]) skipped++
      else if (answers[q.id] === q.correct) correct++
      else incorrect++
    })
    return { correct, incorrect, skipped }
  }
  
  // Start Screen
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="card text-center">
            <div className="text-6xl mb-6">📝</div>
            <h1 className="text-3xl font-bold text-slate-800 mb-4">{topic.title}</h1>
            <p className="text-slate-600 mb-8">{topic.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{topic.questionsList.length}</div>
                <div className="text-sm text-slate-600">Questions</div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{topic.time}</div>
                <div className="text-sm text-slate-600">Minutes</div>
              </div>
              <div className="bg-slate-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">MCQ</div>
                <div className="text-sm text-slate-600">Format</div>
              </div>
            </div>
            
            <button onClick={startQuiz} className="btn-primary text-lg px-12 py-4">
              Start Quiz
            </button>
            
            <div className="mt-6">
              <Link to="/math" className="text-slate-500 hover:text-primary">
                ← Back to Topics
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Quiz Screen
  if (gameState === 'quiz') {
    const question = topic.questionsList[currentQuestion]
    const answered = answers[question.id]
    
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-16 z-40">
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="font-semibold text-slate-700">
              Question {currentQuestion + 1} of {topic.questionsList.length}
            </div>
            <div className={`font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-slate-700'}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
          </div>
          <div className="h-1 bg-slate-200">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${((currentQuestion + 1) / topic.questionsList.length) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Question */}
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="card">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {question.marks} marks
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-slate-800 mb-6"
                dangerouslySetInnerHTML={{ __html: question.question }}
            />
            
            <div className="space-y-3">
              {question.options.map(opt => (
                <button
                  key={opt.letter}
                  onClick={() => selectAnswer(opt.letter)}
                  className={`w-full p-4 rounded-lg border-2 text-left flex items-center gap-4 transition-all ${
                    answered === opt.letter
                      ? 'border-primary bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    answered === opt.letter ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {opt.letter}
                  </span>
                  <span className="flex-1 text-slate-700">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={goPrev}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50"
            >
              ← Previous
            </button>
            
            {currentQuestion === topic.questionsList.length - 1 ? (
              <button onClick={finishQuiz} className="btn-primary">
                Finish Quiz
              </button>
            ) : (
              <button onClick={goNext} className="btn-primary">
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // Results Screen
  if (gameState === 'results') {
    const percentage = calculateScore()
    const { correct, incorrect, skipped } = getScoreDetails()
    
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="card text-center">
            <div className="text-6xl mb-4">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '💪'}
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
            <div className="text-5xl font-bold text-primary mb-6">{percentage}%</div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{correct}</div>
                <div className="text-sm text-green-700">Correct</div>
              </div>
              <div className="bg-red-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">{incorrect}</div>
                <div className="text-sm text-red-700">Incorrect</div>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-600">{skipped}</div>
                <div className="text-sm text-yellow-700">Skipped</div>
              </div>
            </div>
            
            {/* Review Answers */}
            <div className="text-left mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Review Answers</h3>
              {topic.questionsList.map((q, i) => (
                <div key={q.id} className="border-b border-slate-200 py-3">
                  <div className="flex gap-2 mb-2">
                    <span className="font-medium text-slate-700">Q{i + 1}.</span>
                    <span className="text-slate-600 flex-1">{q.question.replace(/<[^>]*>/g, '').substring(0, 60)}...</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      answers[q.id] === q.correct ? 'bg-green-100 text-green-700' :
                      answers[q.id] ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {answers[q.id] ? (answers[q.id] === q.correct ? '✓ Correct' : '✗ Wrong') : 'Skipped'}
                    </span>
                  </div>
                  {answers[q.id] !== q.correct && (
                    <p className="text-sm text-slate-500">Correct: {q.correct} - {q.explanation}</p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex gap-4 justify-center">
              <button onClick={startQuiz} className="btn-primary">
                Retry Quiz
              </button>
              <Link to="/math" className="btn-secondary">
                Back to Topics
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return null
}