import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Math from './pages/Math'
import Sudoku from './pages/Sudoku'
import BioTech from './pages/BioTech'
import Study from './pages/Study'
import Quiz from './pages/Quiz'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/math" element={<Math />} />
            <Route path="/math/:topicId" element={<Quiz />} />
            <Route path="/sudoku" element={<Sudoku />} />
            <Route path="/biotech" element={<BioTech />} />
            <Route path="/study" element={<Study />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

function Footer() {
  return (
    <footer className="bg-darker text-slate-400 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; 2024 KaniMath. Built for IB MYP Students.</p>
      </div>
    </footer>
  )
}

export default App