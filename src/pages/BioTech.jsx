import { useState } from 'react'
import { biotechNews } from '../data/quizData'

export default function BioTech() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const categories = ['all', 'Gene Editing', 'Medicine', 'Synthetic Biology', 'AI & Biotech', 'Regenerative Medicine', 'Bioinformatics']
  
  const filteredNews = selectedCategory === 'all' 
    ? biotechNews 
    : biotechNews.filter(news => news.category === selectedCategory)
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BioTech News</h1>
          <p className="text-xl text-white/80">
            Stay updated with the latest breakthroughs in Biotechnology
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
          
          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold text-slate-800">No news in this category</h3>
              <p className="text-slate-500">Check back later for updates</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="card">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Stay Informed</h2>
            <p className="text-slate-600 mb-6">
              Get the latest BioTech news delivered to your inbox. We update regularly with cutting-edge research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function NewsCard({ news }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  
  return (
    <article className="card hover:border-2 hover:border-teal-400 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
          {news.category}
        </span>
        <span className="text-4xl">{news.image}</span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-teal-600 transition-colors">
        {news.title}
      </h3>
      
      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
        {news.summary}
      </p>
      
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(news.date)}
        </span>
        <button className="text-teal-600 font-medium hover:underline">
          Read More →
        </button>
      </div>
    </article>
  )
}