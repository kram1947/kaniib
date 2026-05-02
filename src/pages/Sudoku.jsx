import { useState, useEffect } from 'react'

const initialPuzzle = {
  easy: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  medium: [
    [0, 0, 0, 6, 0, 0, 4, 0, 0],
    [7, 0, 0, 0, 0, 3, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 9, 0],
    [0, 5, 0, 1, 0, 8, 0, 3, 0],
    [0, 2, 0, 9, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 0, 2, 0, 0, 0, 0, 9],
    [0, 0, 6, 0, 0, 5, 0, 0, 0]
  ],
  hard: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 8, 5],
    [0, 0, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 7, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 1, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 7, 3],
    [0, 0, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 9]
  ]
}

export default function Sudoku() {
  const [difficulty, setDifficulty] = useState('easy')
  const [puzzle, setPuzzle] = useState([])
  const [solution, setSolution] = useState([])
  const [selected, setSelected] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showHints, setShowHints] = useState(false)

  useEffect(() => {
    newGame()
  }, [difficulty])

  useEffect(() => {
    if (!isComplete && puzzle.length > 0) {
      const t = setInterval(() => setTimer(t => t + 1), 1000)
      return () => clearInterval(t)
    }
  }, [isComplete, puzzle])

  const newGame = () => {
    const solved = [...initialPuzzle[difficulty]]
    solveSudoku(solved)
    const puzzleWithZeros = initialPuzzle[difficulty].map(row => [...row])
    setPuzzle(puzzleWithZeros)
    setSolution(solved)
    setSelected(null)
    setMistakes(0)
    setTimer(0)
    setIsComplete(false)
  }

  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              if (solveSudoku(board)) return true
              board[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }

  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3)
      const boxCol = 3 * Math.floor(col / 3) + (i % 3)
      if (board[boxRow][boxCol] === num) return false
    }
    return true
  }

  const handleNumberClick = (num) => {
    if (!selected || isComplete) return
    const [row, col] = selected
    const isOriginal = initialPuzzle[difficulty][row][col] !== 0
    
    if (isOriginal) return
    
    const newPuzzle = [...puzzle]
    
    if (showHints) {
      newPuzzle[row][col] = solution[row][col]
    } else {
      if (solution[row][col] === num) {
        newPuzzle[row][col] = num
      } else {
        setMistakes(m => m + 1)
      }
    }
    
    setPuzzle(newPuzzle)
    
    if (checkComplete(newPuzzle)) {
      setIsComplete(true)
    }
  }

  const checkComplete = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== solution[row][col]) return false
      }
    }
    return true
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">🧩 Sudoku</h1>
          <p className="text-slate-600">Challenge your brain with logic puzzles</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg bg-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          
          <button onClick={newGame} className="btn-primary">
            New Game
          </button>
          
          <button
            onClick={() => setShowHints(!showHints)}
            className={`btn-secondary ${showHints ? 'bg-yellow-100 border-yellow-400' : ''}`}
          >
            {showHints ? 'Hints On' : 'Hints Off'}
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">{formatTime(timer)}</div>
            <div className="text-sm text-slate-500">Time</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${mistakes > 3 ? 'text-red-600' : 'text-slate-800'}`}>
              {mistakes}
            </div>
            <div className="text-sm text-slate-500">Mistakes</div>
          </div>
        </div>

        {/* Sudoku Grid */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="grid grid-cols-9 gap-0 border-2 border-slate-800">
              {puzzle.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  const isOriginal = initialPuzzle[difficulty][rowIndex][colIndex] !== 0
                  const isSelected = selected && selected[0] === rowIndex && selected[1] === colIndex
                  const isRelated = selected && (
                    selected[0] === rowIndex || selected[1] === colIndex ||
                    (Math.floor(selected[0]/3) === Math.floor(rowIndex/3) && 
                     Math.floor(selected[1]/3) === Math.floor(colIndex/3))
                  )
                  
                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => !isComplete && setSelected([rowIndex, colIndex])}
                      className={`
                        w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg font-bold
                        border border-slate-200 transition-all
                        ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2 border-slate-800' : ''}
                        ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2 border-slate-800' : ''}
                        ${isOriginal ? 'bg-slate-100 text-slate-800' : 'text-primary hover:bg-indigo-50'}
                        ${isSelected ? 'bg-primary text-white' : ''}
                        ${!isSelected && isRelated && !isOriginal ? 'bg-indigo-50' : ''}
                        ${cell !== 0 && !isOriginal && cell === solution[rowIndex][colIndex] ? 'bg-green-100 text-green-700' : ''}
                      `}
                    >
                      {cell || ''}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Number Pad */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleNumberClick(num)}
                disabled={isComplete}
                className="w-12 h-12 bg-white border-2 border-slate-200 rounded-lg text-xl font-bold text-slate-700 hover:border-primary hover:bg-indigo-50 transition-all disabled:opacity-50"
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Button */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (selected) {
                const [row, col] = selected
                if (initialPuzzle[difficulty][row][col] === 0) {
                  const newPuzzle = [...puzzle]
                  newPuzzle[row][col] = 0
                  setPuzzle(newPuzzle)
                }
              }
            }}
            className="btn-secondary"
          >
            Clear Cell
          </button>
        </div>

        {/* Winner Message */}
        {isComplete && (
          <div className="text-center mt-8">
            <div className="card inline-block">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Congratulations!</h2>
              <p className="text-slate-600 mb-4">You completed {difficulty} Sudoku in {formatTime(timer)}</p>
              <button onClick={newGame} className="btn-primary">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}