import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-darker text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">KaniMath</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Your personalized IB MYP assessment platform. Practice Mathematics, 
              challenge yourself with Sudoku, and stay updated with BioTech news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/math" className="btn-primary text-lg px-8 py-4">
                Start Learning
              </Link>
              <Link to="/sudoku" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8 py-4">
                Play Sudoku
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Explore Our Features</h2>
            <p className="section-subtitle">Everything you need to excel in your IB MYP journey</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard
              icon="📐"
              title="Mathematics"
              description="IB MYP4-5 assessments covering Sets, Venn Diagrams, Probability, Statistics, and more."
              link="/math"
            />
            <FeatureCard
              icon="📚"
              title="Study Materials"
              description="Visual guides with graphs, charts, formulas, and diagrams."
              link="/study"
            />
            <FeatureCard
              icon="🧩"
              title="Sudoku"
              description="Challenge your brain with our interactive Sudoku puzzles. Three difficulty levels."
              link="/sudoku"
            />
            <FeatureCard
              icon="🧬"
              title="BioTech News"
              description="Stay updated with the latest breakthroughs in Biotechnology and Science."
              link="/biotech"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-indigo-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="82" label="Questions" />
            <StatCard number="5" label="Topics" />
            <StatCard number="3" label="Difficulty Levels" />
            <StatCard number="100%" label="Free Access" />
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Math Topics</h2>
            <p className="section-subtitle">Comprehensive coverage of IB MYP4-5 curriculum</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TopicCard
              title="Sets & Venn Diagrams"
              subtitle="MYP4"
              questions="16 Questions"
              time="45 min"
              color="blue"
              link="/math/sets-venn"
            />
            <TopicCard
              title="Probability"
              subtitle="MYP4"
              questions="32 Questions"
              time="90 min"
              color="purple"
              link="/math/probability"
            />
            <TopicCard
              title="Statistics"
              subtitle="MYP4"
              questions="25 Questions"
              time="60 min"
              color="green"
              link="/math/statistics"
            />
            <TopicCard
              title="Advanced Statistics"
              subtitle="MYP4"
              questions="25 Questions"
              time="60 min"
              color="orange"
              link="/math/statistics-elite"
            />
            <TopicCard
              title="Supply & Demand"
              subtitle="I&S"
              questions="20 Questions"
              time="90 min"
              color="red"
              link="/math/economics"
            />
            <TopicCard
              title="History of Money"
              subtitle="I&S"
              questions="20 Questions"
              time="90 min"
              color="teal"
              link="/math/history"
            />
          </div>
          
          <div className="text-center mt-12">
            <Link to="/math" className="btn-primary">
              View All Topics
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-darker text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Join thousands of students preparing for IB MYP assessments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/math" className="btn-primary text-lg px-8 py-4">
              Get Started Free
            </Link>
            <Link to="/sudoku" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8 py-4">
              Try Sudoku
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, link }) {
  return (
    <Link to={link} className="card group">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-slate-600">{description}</p>
    </Link>
  )
}

function StatCard({ number, label }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-white/80">{label}</div>
    </div>
  )
}

function TopicCard({ title, subtitle, questions, time, color, link }) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700',
    teal: 'bg-teal-100 text-teal-700',
  }
  
  return (
    <Link to={link} className="card hover:border-2 hover:border-primary">
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[color]}`}>
          {subtitle}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <div className="flex gap-4 text-sm text-slate-500">
        <span>📝 {questions}</span>
        <span>⏱️ {time}</span>
      </div>
    </Link>
  )
}