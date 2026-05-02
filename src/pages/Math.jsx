import { Link } from 'react-router-dom'
import { mathTopics } from '../data/quizData'

export default function Math() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mathematics</h1>
          <p className="text-xl text-white/80">
            IB MYP4-5 Assessments • Practice and track your progress
          </p>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mathTopics.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="card">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">How It Works</h2>
            <ol className="space-y-4 text-slate-600">
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <strong className="text-slate-800">Choose a Topic</strong>
                  <p>Select from our range of IB MYP mathematics topics</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <strong className="text-slate-800">Take the Quiz</strong>
                  <p>Answer multiple choice questions with timer</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <strong className="text-slate-800">Review Results</strong>
                  <p>See your score, review answers, and track progress</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  )
}

function TopicCard({ topic }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 border-blue-200',
    green: 'from-green-500 to-green-600 border-green-200',
    red: 'from-red-500 to-red-600 border-red-200',
    purple: 'from-purple-500 to-purple-600 border-purple-200',
    orange: 'from-orange-500 to-orange-600 border-orange-200',
    teal: 'from-teal-500 to-teal-600 border-teal-200',
  }

  return (
    <Link
      to={`/math/${topic.id}`}
      className={`card border-2 hover:border-primary transition-all group bg-gradient-to-br ${colorClasses[topic.color]}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-slate-700">
          {topic.subtitle}
        </span>
        <span className="text-3xl">📐</span>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary">
        {topic.title}
      </h3>
      <p className="text-slate-600 text-sm mb-4">{topic.description}</p>
      <div className="flex gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg          >
          {topic.questions} Questions
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {topic.time} min
        </span>
      </div>
    </Link>
  )
}