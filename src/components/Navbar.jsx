import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  
  const navs = [
    { path: '/', label: 'Home' },
    { path: '/math', label: 'Mathematics' },
    { path: '/sudoku', label: 'Sudoku' },
    { path: '/biotech', label: 'BioTech News' },
  ]
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              K
            </div>
            <span className="text-xl font-bold text-slate-800">KaniMath</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navs.map(nav => (
              <Link
                key={nav.path}
                to={nav.path}
                className={`font-medium transition-colors ${
                  location.pathname === nav.path
                    ? 'text-primary'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                {nav.label}
              </Link>
            ))}
          </div>
          
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}