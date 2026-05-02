import { useState } from 'react'

const studyTopics = [
  {
    id: 'supply-demand',
    title: 'Supply & Demand',
    icon: '📈',
    color: 'orange',
    content: {
      introduction: 'Supply and demand is the fundamental concept in economics that determines prices in a market economy.',
      keyConcepts: [
        { term: 'Demand', definition: 'The quantity of a good that consumers are willing and able to buy at various prices' },
        { term: 'Supply', definition: 'The quantity of a good that producers are willing to sell at various prices' },
        { term: 'Equilibrium', definition: 'The point where quantity demanded equals quantity supplied' },
        { term: 'Price Elasticity', definition: 'How responsive quantity demanded/supplied is to price changes' }
      ],
      graphs: [
        {
          title: 'Supply and Demand Equilibrium',
          description: 'The equilibrium price is where the supply and demand curves intersect.',
          svg: (
            <svg viewBox="0 0 400 300" className="w-full h-auto">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
                </marker>
              </defs>
              {/* Axes */}
              <line x1="50" y1="250" x2="350" y2="250" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="50" y1="250" x2="50" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
              {/* Labels */}
              <text x="320" y="270" fill="#64748b" fontSize="12">Price</text>
              <text x="20" y="40" fill="#64748b" fontSize="12">Quantity</text>
              {/* Supply Curve */}
              <path d="M50,50 Q200,150 350,250" fill="none" stroke="#10b981" strokeWidth="3" />
              <text x="300" y="180" fill="#10b981" fontSize="14" fontWeight="bold">Supply</text>
              {/* Demand Curve */}
              <path d="M350,50 Q200,150 50,250" fill="none" stroke="#ef4444" strokeWidth="3" />
              <text x="80" y="180" fill="#ef4444" fontSize="14" fontWeight="bold">Demand</text>
              {/* Equilibrium Point */}
              <circle cx="200" cy="150" r="6" fill="#6366f1" />
              <text x="210" y="145" fill="#6366f1" fontSize="12" fontWeight="bold">E</text>
              <line x1="200" y1="250" x2="200" y2="150" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
              <line x1="50" y1="150" x2="200" y2="150" stroke="#6366f1" strokeWidth="1" strokeDasharray="4" />
              {/* Equilibrium Labels */}
              <text x="180" y="270" fill="#6366f1" fontSize="11">Pe</text>
              <text x="20" y="155" fill="#6366f1" fontSize="11">Qe</text>
            </svg>
          )
        },
        {
          title: 'Increase in Demand',
          description: 'When demand increases, the demand curve shifts right, raising equilibrium price and quantity.',
          svg: (
            <svg viewBox="0 0 400 300" className="w-full h-auto">
              <defs>
                <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
                </marker>
              </defs>
              <line x1="50" y1="250" x2="350" y2="250" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow2)" />
              <line x1="50" y1="250" x2="50" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow2)" />
              <text x="320" y="270" fill="#64748b" fontSize="12">Price</text>
              <text x="20" y="40" fill="#64748b" fontSize="12">Quantity</text>
              {/* Original Demand */}
              <path d="M350,50 Q200,150 50,250" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5" />
              {/* New Demand */}
              <path d="M350,30 Q220,120 70,250" fill="none" stroke="#ef4444" strokeWidth="3" />
              <text x="80" y="200" fill="#ef4444" fontSize="12">D1</text>
              <text x="100" y="120" fill="#ef4444" fontSize="12">D2</text>
              {/* Arrows */}
              <path d="M150,150 L180,130" stroke="#6366f1" strokeWidth="2" fill="none" markerEnd="url(#arrow2)" />
            </svg>
          )
        },
        {
          title: 'Decrease in Supply',
          description: 'When supply decreases, the supply curve shifts left, raising price but reducing quantity.',
          svg: (
            <svg viewBox="0 0 400 300" className="w-full h-auto">
              <defs>
                <marker id="arrow3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
                </marker>
              </defs>
              <line x1="50" y1="250" x2="350" y2="250" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow3)" />
              <line x1="50" y1="250" x2="50" y2="50" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow3)" />
              <text x="320" y="270" fill="#64748b" fontSize="12">Price</text>
              <text x="20" y="40" fill="#64748b" fontSize="12">Quantity</text>
              {/* Original Supply */}
              <path d="M50,50 Q200,150 350,250" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5" />
              {/* New Supply */}
              <path d="M100,50 Q230,140 330,250" fill="none" stroke="#10b981" strokeWidth="3" />
              <text x="280" y="180" fill="#10b981" fontSize="12">S1</text>
              <text x="200" y="100" fill="#10b981" fontSize="12">S2</text>
            </svg>
          )
        }
      ],
      factors: {
        demand: [
          { factor: 'Income', direction: '↑ income → ↑ demand (normal goods)' },
          { factor: 'Price of related goods', direction: '↑ price of substitute → ↑ demand' },
          { factor: 'Consumer preferences', direction: 'Favorable preference → ↑ demand' },
          { factor: 'Expectations', direction: 'Future price ↑ → ↑ current demand' }
        ],
        supply: [
          { factor: 'Production costs', direction: '↑ costs → ↓ supply' },
          { factor: 'Technology', direction: 'Better tech → ↑ supply' },
          { factor: 'Number of sellers', direction: '↑ sellers → ↑ supply' },
          { factor: 'Government taxes', direction: '↑ taxes → ↓ supply' }
        ]
      },
      swedishExamples: [
        { title: 'Volvo Cars', description: 'When Volvo releases a new electric model, demand often increases due to brand loyalty and environmental awareness.' },
        { title: 'IKEA', description: 'IKEA\'s supply chain efficiency allows them to offer lower prices, increasing demand for furniture.' },
        { title: 'Spotify', description: 'As a digital service, changes in subscription price directly affect demand elasticity.' }
      ]
    }
  },
  {
    id: 'statistics',
    title: 'Statistics',
    icon: '📊',
    color: 'blue',
    content: {
      introduction: 'Statistics involves collecting, organizing, analyzing, and presenting data to make informed decisions.',
      keyConcepts: [
        { term: 'Mean', definition: 'The average of all values (sum of values ÷ number of values)' },
        { term: 'Median', definition: 'The middle value when data is arranged in order' },
        { term: 'Mode', definition: 'The most frequently occurring value' },
        { term: 'Standard Deviation', definition: 'Measure of how spread out values are from the mean' },
        { term: 'IQR (Interquartile Range)', definition: 'The difference between Q3 (75th percentile) and Q1 (25th percentile)' }
      ],
      graphs: [
        {
          title: 'Box Plot (Box and Whisker)',
          description: 'Shows the distribution of data using quartiles, median, and outliers.',
          svg: (
            <svg viewBox="0 0 400 200" className="w-full h-auto">
              {/* Number line */}
              <line x1="40" y1="100" x2="360" y2="100" stroke="#64748b" strokeWidth="2" />
              {/* Min whisker */}
              <line x1="60" y1="100" x2="80" y2="100" stroke="#64748b" strokeWidth="2" />
              <line x1="60" y1="80" x2="60" y2="120" stroke="#64748b" strokeWidth="2" />
              {/* Box */}
              <rect x="80" y="60" width="160" height="80" fill="#6366f1" fillOpacity="0.3" stroke="#6366f1" strokeWidth="2" />
              {/* Median line */}
              <line x1="130" y1="60" x2="130" y2="140" stroke="#ef4444" strokeWidth="3" />
              {/* Q1 line */}
              <line x1="80" y1="100" x2="80" y2="140" stroke="#6366f1" strokeWidth="2" />
              {/* Q3 line */}
              <line x1="240" y1="60" x2="240" y2="140" stroke="#6366f1" strokeWidth="2" />
              {/* Max whisker */}
              <line x1="240" y1="100" x2="320" y2="100" stroke="#64748b" strokeWidth="2" />
              <line x1="320" y1="80" x2="320" y2="120" stroke="#64748b" strokeWidth="2" />
              {/* Labels */}
              <text x="60" y="140" fill="#64748b" fontSize="10">Min</text>
              <text x="80" y="155" fill="#6366f1" fontSize="10">Q1</text>
              <text x="120" y="155" fill="#ef4444" fontSize="10">Median</text>
              <text x="220" y="155" fill="#6366f1" fontSize="10">Q3</text>
              <text x="310" y="140" fill="#64748b" fontSize="10">Max</text>
            </svg>
          )
        },
        {
          title: 'Normal Distribution',
          description: 'Bell curve showing how data clusters around the mean with symmetric tails.',
          svg: (
            <svg viewBox="0 0 400 200" className="w-full h-auto">
              <defs>
                <marker id="arrowNorm" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
                </marker>
              </defs>
              <line x1="50" y1="180" x2="350" y2="180" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowNorm)" />
              {/* Bell curve */}
              <path d="M50,180 Q100,180 130,140 Q160,50 200,40 Q240,50 270,140 Q300,180 350,180" fill="url(#grad1)" stroke="#6366f1" strokeWidth="2" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Standard deviation markers */}
              <line x1="200" y1="40" x2="200" y2="180" stroke="#ef4444" strokeWidth="1" strokeDasharray="4" />
              <text x="195" y="30" fill="#ef4444" fontSize="10">μ</text>
              <line x1="150" y1="100" x2="150" y2="180" stroke="#10b981" strokeWidth="1" strokeDasharray="2" />
              <text x="145" y="195" fill="#10b981" fontSize="10">-1σ</text>
              <line x1="250" y1="100" x2="250" y2="180" stroke="#10b981" strokeWidth="1" strokeDasharray="2" />
              <text x="245" y="195" fill="#10b981" fontSize="10">+1σ</text>
            </svg>
          )
        }
      ],
      formulas: [
        { name: 'Mean', formula: 'Σx / n' },
        { name: 'Median', formula: 'Middle value (or average of two middle)' },
        { name: 'Range', formula: 'Max - Min' },
        { name: 'IQR', formula: 'Q3 - Q1' },
        { name: 'Variance', formula: 'Σ(x - x̄)² / n' },
        { name: 'Std Dev', formula: '√Variance' }
      ]
    }
  },
  {
    id: 'trigonometry',
    title: 'Trigonometry',
    icon: '📐',
    color: 'purple',
    content: {
      introduction: 'Trigonometry studies the relationships between angles and sides of triangles.',
      keyConcepts: [
        { term: 'SOH CAH TOA', definition: 'Memory aid: Sin=Opposite/Hyp, Cos=Adjacent/Hyp, Tan=Opposite/Adjacent' },
        { term: 'Pythagorean Theorem', definition: 'a² + b² = c² where c is the hypotenuse' },
        { term: 'Radians', definition: 'Alternative to degrees: 180° = π radians' },
        { term: 'Inverse Trig Functions', definition: 'arcsin, arccos, arctan - find angle from ratio' }
      ],
      graphs: [
        {
          title: 'Right Triangle Labeling',
          description: 'Understanding opposite, adjacent, and hypotenuse relative to angle θ.',
          svg: (
            <svg viewBox="0 0 300 250" className="w-full h-auto">
              {/* Triangle */}
              <polygon points="250,220 250,50 50,220" fill="none" stroke="#6366f1" strokeWidth="3" />
              {/* Right angle symbol */}
              <path d="M250,200 L230,200 L230,220" fill="none" stroke="#6366f1" strokeWidth="2" />
              {/* Angle theta */}
              <path d="M80,220 A30,30 0 0,0 90,200" fill="none" stroke="#ef4444" strokeWidth="2" />
              <text x="75" y="195" fill="#ef4444" fontSize="14" fontWeight="bold">θ</text>
              {/* Labels */}
              <text x="140" y="140" fill="#10b981" fontSize="14" fontWeight="bold">Hypotenuse</text>
              <text x="255" y="135" fill="#ef4444" fontSize="14" fontWeight="bold">Opposite</text>
              <text x="130" y="240" fill="#6366f1" fontSize="14" fontWeight="bold">Adjacent</text>
              {/* Side arrows */}
              <line x1="150" y1="80" x2="240" y2="80" stroke="#10b981" strokeWidth="1" />
              <line x1="270" y1="100" x2="270" y2="180" stroke="#ef4444" strokeWidth="1" />
              <line x1="80" y1="225" x2="220" y2="225" stroke="#6366f1" strokeWidth="1" />
            </svg>
          )
        },
        {
          title: 'Unit Circle',
          description: 'A circle with radius 1 used to define trigonometric values for all angles.',
          svg: (
            <svg viewBox="0 0 300 300" className="w-full h-auto">
              {/* Circle */}
              <circle cx="150" cy="150" r="100" fill="none" stroke="#6366f1" strokeWidth="2" />
              {/* Axes */}
              <line x1="50" y1="150" x2="250" y2="150" stroke="#64748b" strokeWidth="1" />
              <line x1="150" y1="50" x2="150" y2="250" stroke="#64748b" strokeWidth="1" />
              {/* Angles */}
              <line x1="150" y1="150" x2="150" y2="50" stroke="#ef4444" strokeWidth="2" />
              <path d="M150,120 A30,30 0 0,0 165,108" fill="none" stroke="#ef4444" strokeWidth="1" />
              <text x="155" y="105" fill="#ef4444" fontSize="10">90°</text>
              <line x1="150" y1="150" x2="220" y2="80" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
              <text x="225" y="75" fill="#ef4444" fontSize="10">45°</text>
              <line x1="150" y1="150" x2="250" y2="150" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" />
              <text x="235" y="140" fill="#ef4444" fontSize="10">0°</text>
              {/* Key points */}
              <circle cx="150" cy="50" r="4" fill="#6366f1" />
              <text x="145" y="40" fill="#6366f1" fontSize="10">(0,1)</text>
              <circle cx="250" cy="150" r="4" fill="#6366f1" />
              <text x="235" y="165" fill="#6366f1" fontSize="10">(1,0)</text>
              <circle cx="150" cy="250" r="4" fill="#6366f1" />
              <text x="140" y="270" fill="#6366f1" fontSize="10">(0,-1)</text>
              <circle cx="50" cy="150" r="4" fill="#6366f1" />
              <text x="20" y="165" fill="#6366f1" fontSize="10">(-1,0)</text>
            </svg>
          )
        }
      ],
      formulas: [
        { name: 'sin²θ + cos²θ', formula: '= 1' },
        { name: '1 + tan²θ', formula: '= sec²θ' },
        { name: '1 + cot²θ', formula: '= cosec²θ' },
        { name: 'sin(90°-θ)', formula: '= cos θ' },
        { name: 'cos(90°-θ)', formula: '= sin θ' },
        { name: 'tan θ', formula: '= sin θ / cos θ' }
      ],
      specialAngles: [
        { angle: '0°', sin: '0', cos: '1', tan: '0' },
        { angle: '30°', sin: '1/2', cos: '√3/2', tan: '1/√3' },
        { angle: '45°', sin: '√2/2', cos: '√2/2', tan: '1' },
        { angle: '60°', sin: '√3/2', cos: '1/2', tan: '√3' },
        { angle: '90°', sin: '1', cos: '0', tan: 'undefined' }
      ]
    }
  },
  {
    id: 'sets-venn',
    title: 'Sets & Venn Diagrams',
    icon: '🔢',
    color: 'green',
    content: {
      introduction: 'Set theory is the mathematical study of collections of objects, called sets.',
      keyConcepts: [
        { term: 'Union (A ∪ B)', definition: 'Elements in A or B or both' },
        { term: 'Intersection (A ∩ B)', definition: 'Elements in both A and B' },
        { term: 'Complement (A\')', definition: 'All elements not in A' },
        { term: 'Subset (A ⊆ B)', definition: 'All elements of A are in B' }
      ],
      graphs: [
        {
          title: '2-Set Venn Diagram',
          description: 'Shows the relationship between two sets using overlapping circles.',
          svg: (
            <svg viewBox="0 0 350 250" className="w-full h-auto">
              {/* Circle A */}
              <circle cx="120" cy="125" r="70" fill="#6366f1" fillOpacity="0.3" stroke="#6366f1" strokeWidth="2" />
              <text x="90" y="70" fill="#6366f1" fontSize="16" fontWeight="bold">A</text>
              {/* Circle B */}
              <circle cx="230" cy="125" r="70" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
              <text x="240" y="70" fill="#10b981" fontSize="16" fontWeight="bold">B</text>
              {/* Universal Set */}
              <rect x="30" y="30" width="290" height="190" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="5" />
              <text x="40" y="25" fill="#64748b" fontSize="12">U</text>
              {/* Region labels */}
              <text x="175" y="130" fill="#ef4444" fontSize="12" fontWeight="bold">A ∩ B</text>
              <text x="80" y="160" fill="#6366f1" fontSize="10">A only</text>
              <text x="220" y="160" fill="#10b981" fontSize="10">B only</text>
              <text x="175" y="200" fill="#64748b" fontSize="10">Neither</text>
            </svg>
          )
        },
        {
          title: '3-Set Venn Diagram',
          description: 'Shows relationships between three sets - commonly used in probability problems.',
          svg: (
            <svg viewBox="0 0 350 280" className="w-full h-auto">
              {/* Circle A */}
              <circle cx="120" cy="110" r="65" fill="#6366f1" fillOpacity="0.3" stroke="#6366f1" strokeWidth="2" />
              <text x="80" y="60" fill="#6366f1" fontSize="14" fontWeight="bold">A</text>
              {/* Circle B */}
              <circle cx="230" cy="110" r="65" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
              <text x="260" y="60" fill="#10b981" fontSize="14" fontWeight="bold">B</text>
              {/* Circle C */}
              <circle cx="175" cy="200" r="65" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
              <text x="170" y="250" fill="#f59e0b" fontSize="14" fontWeight="bold">C</text>
              {/* Center */}
              <text x="175" y="140" fill="#ef4444" fontSize="10" fontWeight="bold">A∩B∩C</text>
            </svg>
          )
        }
      ],
      formulas: [
        { name: 'n(A ∪ B)', formula: 'n(A) + n(B) - n(A ∩ B)' },
        { name: 'n(A ∪ B ∪ C)', formula: 'n(A)+n(B)+n(C) - n(AB) - n(BC) - n(AC) + n(ABC)' },
        { name: 'De Morgan (A ∪ B)\'', formula: '= A\' ∩ B\'' },
        { name: 'De Morgan (A ∩ B)\'', formula: '= A\' ∪ B\'' }
      ]
    }
  }
]

export default function Study() {
  const [activeTab, setActiveTab] = useState('supply-demand')

  const activeTopic = studyTopics.find(t => t.id === activeTab)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">📚 Study Materials</h1>
          <p className="text-xl text-white/80">
            Interactive graphs, charts, and visual explanations for IB MYP concepts
          </p>
        </div>
      </section>

      {/* Topic Tabs */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto">
            {studyTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => setActiveTab(topic.id)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  activeTab === topic.id
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="mr-2">{topic.icon}</span>
                {topic.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {activeTopic && (
            <div className="space-y-8">
              {/* Introduction */}
              <div className="card">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                  <span className="text-3xl">{activeTopic.icon}</span>
                  {activeTopic.title}
                </h2>
                <p className="text-slate-600 text-lg">{activeTopic.content.introduction}</p>
              </div>

              {/* Key Concepts */}
              <div className="card">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Key Concepts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {activeTopic.content.keyConcepts.map((concept, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-2">{concept.term}</h4>
                      <p className="text-slate-600 text-sm">{concept.definition}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphs & Charts */}
              {activeTopic.content.graphs && (
                <div className="card">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Visual Guides</h3>
                  <div className="space-y-8">
                    {activeTopic.content.graphs.map((graph, i) => (
                      <div key={i} className="border border-slate-200 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">{graph.title}</h4>
                        <p className="text-slate-600 mb-4">{graph.description}</p>
                        <div className="bg-slate-50 rounded-lg p-4">
                          {graph.svg}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formulas */}
              {activeTopic.content.formulas && (
                <div className="card">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Formulas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {activeTopic.content.formulas.map((formula, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-4 text-center">
                        <div className="text-slate-500 text-sm mb-1">{formula.name}</div>
                        <div className="font-mono text-primary font-bold text-lg">{formula.formula}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Angles (Trigonometry) */}
              {activeTopic.content.specialAngles && (
                <div className="card">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Special Angles</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="p-3 text-left">Angle</th>
                          <th className="p-3 text-left">sin</th>
                          <th className="p-3 text-left">cos</th>
                          <th className="p-3 text-left">tan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeTopic.content.specialAngles.map((row, i) => (
                          <tr key={i} className="border-t border-slate-200">
                            <td className="p-3 font-medium">{row.angle}</td>
                            <td className="p-3 font-mono text-slate-600">{row.sin}</td>
                            <td className="p-3 font-mono text-slate-600">{row.cos}</td>
                            <td className="p-3 font-mono text-slate-600">{row.tan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Swedish Examples (Economics) */}
              {activeTopic.content.swedishExamples && (
                <div className="card">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">
                    🇸🇪 Swedish Real-World Examples
                  </h3>
                  <div className="space-y-4">
                    {activeTopic.content.swedishExamples.map((ex, i) => (
                      <div key={i} className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                        <h4 className="font-semibold text-cyan-700 mb-1">{ex.title}</h4>
                        <p className="text-slate-600 text-sm">{ex.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Factors Lists (Economics) */}
              {activeTopic.content.factors && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="card">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Factors Affecting Demand</h3>
                    <ul className="space-y-3">
                      {activeTopic.content.factors.demand.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-red-500 font-bold">→</span>
                          <div>
                            <span className="font-medium">{item.factor}:</span>
                            <span className="text-slate-600 text-sm"> {item.direction}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Factors Affecting Supply</h3>
                    <ul className="space-y-3">
                      {activeTopic.content.factors.supply.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-green-500 font-bold">→</span>
                          <div>
                            <span className="font-medium">{item.factor}:</span>
                            <span className="text-slate-600 text-sm"> {item.direction}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="card inline-block">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Practice?</h3>
            <p className="text-slate-600 mb-4">Test your knowledge with interactive quizzes</p>
            <a href="/math" className="btn-primary">
              Take a Quiz
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}