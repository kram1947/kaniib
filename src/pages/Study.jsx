import { useState } from 'react'

const studyTopics = [
  {
    id: 'trigonometry',
    title: 'Trigonometry',
    icon: '📐',
    color: 'purple',
    content: {
      introduction: 'Trigonometry studies the relationships between angles and sides of triangles. It is essential for solving problems in physics, engineering, navigation, and many real-world applications.',
      topics: [
        {
          title: '1. Right Triangle Trigonometry',
          subtopics: [
            {
              name: 'SOH CAH TOA',
              content: 'The fundamental memory aid for trigonometric ratios in right triangles:',
              details: [
                { label: 'Sine (SOH)', value: 'sin(θ) = Opposite / Hypotenuse' },
                { label: 'Cosine (CAH)', value: 'cos(θ) = Adjacent / Hypotenuse' },
                { label: 'Tangent (TOA)', value: 'tan(θ) = Opposite / Adjacent' }
              ],
              svg: (
                <svg viewBox="0 0 300 200" className="w-full h-auto">
                  <polygon points="250,180 250,40 50,180" fill="none" stroke="#9333ea" strokeWidth="3"/>
                  <path d="M250,160 L230,160 L230,180" fill="none" stroke="#9333ea" strokeWidth="2"/>
                  <path d="M80,180 A25,25 0 0,0 95,165" fill="none" stroke="#ef4444" strokeWidth="2"/>
                  <text x="70" y="160" fill="#ef4444" fontSize="14" fontWeight="bold">θ</text>
                  <text x="140" y="115" fill="#10b981" fontSize="12" fontWeight="bold">Hypotenuse</text>
                  <text x="255" y="110" fill="#ef4444" fontSize="12" fontWeight="bold">Opposite</text>
                  <text x="120" y="200" fill="#6366f1" fontSize="12" fontWeight="bold">Adjacent</text>
                  <text x="20" y="90" fill="#9333ea" fontSize="10">sin θ = opp/hyp</text>
                  <text x="20" y="105" fill="#9333ea" fontSize="10">cos θ = adj/hyp</text>
                  <text x="20" y="120" fill="#9333ea" fontSize="10">tan θ = opp/adj</text>
                </svg>
              )
            },
            {
              name: 'Pythagorean Theorem',
              content: 'In any right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.',
              formula: 'a² + b² = c²',
              examples: [
                { problem: '3-4-5 Triangle', solution: '3² + 4² = 9 + 16 = 25 = 5²' },
                { problem: '5-12-13 Triangle', solution: '5² + 12² = 25 + 144 = 169 = 13²' }
              ]
            },
            {
              name: 'Finding Missing Sides',
              content: 'Use trigonometric ratios to find unknown sides when you know an angle and one side.',
              steps: [
                'Identify which side is known (opposite, adjacent, or hypotenuse)',
                'Identify which side you need to find',
                'Choose the appropriate ratio (sin, cos, or tan)',
                'Solve for the unknown'
              ],
              swedishExample: {
                company: 'Volvo Construction Equipment',
                application: 'Calculating the angle of a crane arm to determine maximum reach height'
              }
            }
          ]
        },
        {
          title: '2. Special Angles',
          subtopics: [
            {
              name: '30°, 45°, 60° Angles',
              content: 'These angles have exact trigonometric values that should be memorized.',
              table: [
                { angle: '30°', sin: '1/2', cos: '√3/2', tan: '1/√3' },
                { angle: '45°', sin: '√2/2', cos: '√2/2', tan: '1' },
                { angle: '60°', sin: '√3/2', cos: '1/2', tan: '√3' }
              ],
              svg: (
                <svg viewBox="0 0 350 120" className="w-full h-auto">
                  <polygon points="30,100 150,100 150,30" fill="none" stroke="#9333ea" strokeWidth="2"/>
                  <path d="M30,100 L130,100 L150,100 L150,90" fill="none" stroke="#9333ea" strokeWidth="1"/>
                  <text x="60" y="80" fill="#9333ea" fontSize="10">1</text>
                  <text x="135" y="70" fill="#9333ea" fontSize="10">√3</text><text x="100" y="90" fill="#ef4444" fontSize="10">30°</text>
                  <polygon points="180,100 280,100 280,20" fill="none" stroke="#9333ea" strokeWidth="2"/>
                  <text x="210" y="70" fill="#9333ea" fontSize="10">1</text>
                  <text x="265" y="70" fill="#9333ea" fontSize="10">1</text>
                  <text x="230" y="90" fill="#ef4444" fontSize="10">45°</text>
                  <polygon points="310,100 380,100 380,50" fill="none" stroke="#9333ea" strokeWidth="2"/>
                  <text x="330" y="80" fill="#9333ea" fontSize="10">√3</text>
                  <text x="365" y="80" fill="#9333ea" fontSize="10">1</text>
                  <text x="345" y="90" fill="#ef4444" fontSize="10">60°</text>
                </svg>
              )
            },
            {
              name: '0° and 90° Angles',
              content: 'At 0° and 90°, the trigonometric values approach limits.',
              table: [
                { angle: '0°', sin: '0', cos: '1', tan: '0' },
                { angle: '90°', sin: '1', cos: '0', tan: 'undefined' }
              ]
            }
          ]
        },
        {
          title: '3. Inverse Trigonometric Functions',
          subtopics: [
            {
              name: 'arcsin, arccos, arctan',
              content: 'Inverse functions find the angle when you know the ratio.',
              formulas: [
                { name: 'Arcsine', formula: 'sin⁻¹(x) or arcsin(x)' },
                { name: 'Arccosine', formula: 'cos⁻¹(x) or arccos(x)' },
                { name: 'Arctangent', formula: 'tan⁻¹(x) or arctan(x)' }
              ],
              example: 'If sin(θ) = 0.5, then θ = sin⁻¹(0.5) = 30°'
            }
          ]
        },
        {
          title: '4. Sine Rule (Law of Sines)',
          subtopics: [
            {
              name: 'Formula and Application',
              content: 'The Sine Rule relates sides and their opposite angles in any triangle.',
              formula: 'a/sin(A) = b/sin(B) = c/sin(C)',
              whenToUse: 'Use when you know: (a) a side and its opposite angle, OR (b) two angles and one side',
              svg: (
                <svg viewBox="0 0 300 150" className="w-full h-auto">
                  <polygon points="50,120 200,120 150,30" fill="none" stroke="#9333ea" strokeWidth="2"/>
                  <text x="40" y="100" fill="#9333ea" fontSize="12" fontWeight="bold">A</text>
                  <text x="210" y="100" fill="#9333ea" fontSize="12" fontWeight="bold">B</text>
                  <text x="155" y="25" fill="#9333ea" fontSize="12" fontWeight="bold">C</text>
                  <text x="85" y="135" fill="#ef4444" fontSize="11">a (opp A)</text>
                  <text x="150" y="85" fill="#10b981" fontSize="11">b (opp B)</text>
                  <text x="105" y="60" fill="#6366f1" fontSize="11">c (opp C)</text>
                </svg>
              ),
              swedishExample: {
                company: 'SAS (Scandinavian Airlines)',
                application: 'Navigation: calculating distances and angles between flight paths'
              }
            }
          ]
        },
        {
          title: '5. Cosine Rule (Law of Cosines)',
          subtopics: [
            {
              name: 'Formula and Application',
              content: 'The Cosine Rule generalizes the Pythagorean theorem to any triangle.',
              formulas: [
                { name: 'Main formula', formula: 'c² = a² + b² - 2ab·cos(C)' },
                { name: 'Find angle', formula: 'cos(C) = (a² + b² - c²) / 2ab' }
              ],
              whenToUse: 'Use when you know: (a) two sides and included angle, OR (b) all three sides',
              svg: (
                <svg viewBox="0 0 300 150" className="w-full h-auto">
                  <polygon points="30,120 200,120 150,30" fill="none" stroke="#9333ea" strokeWidth="2"/>
                  <path d="M30,120 L80,120" stroke="#ef4444" strokeWidth="2"/>
                  <text x="50" y="140" fill="#ef4444" fontSize="11">a</text>
                  <text x="180" y="140" fill="#10b981" fontSize="11">b</text>
                  <text x="100" y="60" fill="#6366f1" fontSize="11">c</text>
                  <text x="95" y="95" fill="#ef4444" fontSize="10">∠C = included angle</text>
                </svg>
              ),
              swedishExample: {
                company: 'Gothenburg Harbour',
                application: 'Calculating direct distances between ports when you know the route angles'
              }
            }
          ]
        },
        {
          title: '6. Area of Triangles',
          subtopics: [
            {
              name: 'Using Two Sides and Included Angle',
              content: 'Area = ½ × a × b × sin(C)',
              formula: 'A = ½ab sin(C)',
              example: 'Triangle with sides 5cm and 8cm, included angle 60°: A = ½ × 5 × 8 × sin(60°) = 20 × √3/2 ≈ 17.32 cm²',
              swedishExample: {
                company: 'Volvo Factory Floor',
                application: 'Calculating floor space for triangular factory sections'
              }
            },
            {
              name: "Heron's Formula",
              content: 'When you know all three sides but no height',
              formula: 'Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2',
              steps: [
                'Calculate semi-perimeter: s = (a + b + c) / 2',
                'Plug into formula: A = √[s(s-a)(s-b)(s-c)]'
              ],
              example: 'Triangle with sides 7cm, 8cm, 9cm: s = 12, A = √[12×5×4×3] = √720 ≈ 26.83 cm²'
            }
          ]
        },
        {
          title: '7. Angles of Elevation and Depression',
          subtopics: [
            {
              name: 'Definitions',
              content: 'Angle of elevation: the angle from the horizontal up to an object. Angle of depression: the angle from the horizontal down to an object.',
              svg: (
                <svg viewBox="0 0 350 200" className="w-full h-auto">
                  <line x1="50" y1="180" x2="300" y2="180" stroke="#64748b" strokeWidth="2"/>
                  <line x1="250" y1="180" x2="250" y2="50" stroke="#9333ea" strokeWidth="3"/>
                  <line x1="50" y1="100" x2="250" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="4"/>
                  <path d="M70,100 A20,20 0 0,0 85,90" fill="none" stroke="#ef4444" strokeWidth="2"/>
                  <text x="60" y="85" fill="#ef4444" fontSize="11" fontWeight="bold">θ</text>
                  <text x="255" y="45" fill="#9333ea" fontSize="10">Object</text>
                  <text x="30" y="105" fill="#ef4444" fontSize="10">Angle of elevation</text>
                  <text x="150" y="195" fill="#64748b" fontSize="10">Ground</text>
                </svg>
              ),
              keyPoint: 'Angle of elevation = Angle of depression (alternate angles)'
            },
            {
              name: 'Real-World Applications',
              content: 'Used in surveying, architecture, navigation, and engineering.',
              examples: [
                { application: 'Measuring building height', method: 'Measure distance to building, then angle of elevation to top' },
                { application: 'Bridge design', method: 'Calculate angle of depression from bridge deck to water' }
              ],
              swedishExample: {
                company: 'Gothenburg Harbour Bridge',
                application: 'Calculate clearance height for ships passing under the bridge'
              }
            }
          ]
        },
        {
          title: '8. Trigonometric Identities',
          subtopics: [
            {
              name: 'Pythagorean Identities',
              content: 'Fundamental relationships between trigonometric functions.',
              formulas: [
                { name: 'Primary', formula: 'sin²θ + cos²θ = 1' },
                { name: 'Secondary', formula: '1 + tan²θ = sec²θ' },
                { name: 'Tertiary', formula: '1 + cot²θ = csc²θ' }
              ]
            },
            {
              name: 'Co-function Identities',
              content: 'Relationships between complementary angles.',
              formulas: [
                { name: 'Sine-Cosine', formula: 'sin(90° - θ) = cos θ' },
                { name: 'Cosine-Sine', formula: 'cos(90° - θ) = sin θ' },
                { name: 'Tangent', formula: 'tan(90° - θ) = cot θ' }
              ]
            }
          ]
        }
      ],
      formulas: [
        { name: 'sin²θ + cos²θ', formula: '= 1' },
        { name: '1 + tan²θ', formula: '= sec²θ' },
        { name: '1 + cot²θ', formula: '= cosec²θ' },
        { name: 'sin(90°-θ)', formula: '= cos θ' },
        { name: 'cos(90°-θ)', formula: '= sin θ' },
        { name: 'tan θ', formula: '= sin θ / cos θ' },
        { name: 'Sine Rule', formula: 'a/sin(A) = b/sin(B)' },
        { name: 'Cosine Rule', formula: 'c² = a² + b² - 2ab·cos(C)' },
        { name: 'Area (2 sides)', formula: 'A = ½ab·sin(C)' },
        { name: "Heron's Formula", formula: 'A = √[s(s-a)(s-b)(s-c)]' }
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
    id: 'algebra',
    title: 'Algebra',
    icon: '🧮',
    color: 'red',
    content: {
      introduction: 'Algebra is the branch of mathematics dealing with symbols and the rules for manipulating them, forming the foundation for solving equations and modeling relationships.',
      topics: [
        {
          title: '1. Linear Equations',
          subtopics: [
            {
              name: 'Solving for x',
              content: 'Isolate the variable using inverse operations.',
              steps: [
                'Move constants to the opposite side.',
                'Divide or multiply to isolate the variable.',
                'Check the solution by substitution.'
              ]
            },
            {
              name: 'Graphing Lines',
              content: 'Plot the line using slope-intercept form y = mx + b.',
              formula: 'y = mx + b',
              examples: [
                { problem: 'y = 2x + 3', solution: 'Slope 2, intercept 3' }
              ]
            }
          ]
        },
        {
          title: '2. Quadratic Equations',
          subtopics: [
            {
              name: 'Factoring',
              content: 'Express the quadratic as a product of two binomials.',
              steps: [
                'Find two numbers that multiply to ac and add to b.',
                'Rewrite the middle term and factor by grouping.'
              ]
            },
            {
              name: 'Quadratic Formula',
              content: 'Solve any quadratic equation ax² + bx + c = 0.',
              formula: 'x = [-b ± √(b²-4ac)] / (2a)',
              examples: [
                { problem: 'x² - 5x + 6 = 0', solution: 'x = 2 or 3' }
              ]
            }
          ]
        }
      ],
      formulas: [
        { name: 'Slope', formula: 'm = (y2 - y1) / (x2 - x1)' },
        { name: 'Quadratic Formula', formula: 'x = [-b ± √(b²-4ac)] / (2a)' }
      ]
    }
  },
  {
    id: 'supply-demand',
    title: 'Supply & Demand',
    icon: '📈',
    color: 'orange',
    content: {
      introduction: 'Supply and demand is the fundamental concept in economics that determines prices in a market economy.',
      topics: [
        {
          title: '1. Basic Concepts',
          subtopics: [
            { name: 'Demand', definition: 'The quantity of a good that consumers are willing and able to buy at various prices' },
            { name: 'Supply', definition: 'The quantity of a good that producers are willing to sell at various prices' },
            { name: 'Equilibrium', definition: 'The point where quantity demanded equals quantity supplied' }
          ]
        },
        {
          title: '2. Demand and Supply Curves',
          subtopics: [
            { name: 'Law of Demand', definition: 'As price increases, quantity demanded decreases (inverse relationship)' },
            { name: 'Law of Supply', definition: 'As price increases, quantity supplied increases (direct relationship)' }
          ]
        },
        {
          title: '3. Market Equilibrium',
          subtopics: [
            { name: 'Equilibrium Price', definition: 'The price at which supply equals demand' },
            { name: 'Equilibrium Quantity', definition: 'The quantity traded at equilibrium price' }
          ]
        },
        {
          title: '4. Factors Affecting Demand',
          subtopics: [
            { name: 'Income', effect: '↑ income → ↑ demand (normal goods)' },
            { name: 'Prices of Related Goods', effect: '↑ price of substitutes → ↑ demand' },
            { name: 'Consumer Preferences', effect: 'Favorable preferences → ↑ demand' },
            { name: 'Expectations', effect: 'Future price ↑ → ↑ current demand' }
          ]
        },
        {
          title: '5. Factors Affecting Supply',
          subtopics: [
            { name: 'Production Costs', effect: '↑ costs → ↓ supply' },
            { name: 'Technology', effect: 'Better tech → ↑ supply' },
            { name: 'Number of Sellers', effect: '↑ sellers → ↑ supply' },
            { name: 'Government Taxes', effect: '↑ taxes → ↓ supply' }
          ]
        }
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
  const [activeTab, setActiveTab] = useState('trigonometry')
  const [expandedTopics, setExpandedTopics] = useState({})
  const [expandedSubtopics, setExpandedSubtopics] = useState({})

  const activeTopic = studyTopics.find(t => t.id === activeTab)

  const toggleTopic = (topicIndex) => {
    setExpandedTopics(prev => ({ ...prev, [topicIndex]: !prev[topicIndex] }))
  }

  const toggleSubtopic = (topicIndex, subtopicIndex) => {
    const key = `${topicIndex}-${subtopicIndex}`
    setExpandedSubtopics(prev => ({ ...prev, [key]: !prev[key] }))
  }

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

              {/* Topics & Subtopics */}
              {activeTopic.content.topics && (
                <div className="space-y-4">
                  {activeTopic.content.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="card">
                      <button
                        onClick={() => toggleTopic(topicIndex)}
                        className="w-full flex items-center justify-between p-4 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                      >
                        <h3 className="text-lg font-bold text-slate-800">{topic.title}</h3>
                        <span className={`transform transition-transform ${expandedTopics[topicIndex] ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      
                      {expandedTopics[topicIndex] && (
                        <div className="mt-4 space-y-3">
                          {topic.subtopics.map((subtopic, subIndex) => (
                            <div key={subIndex} className="border border-slate-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleSubtopic(topicIndex, subIndex)}
                                className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 transition"
                              >
                                <span className="font-semibold text-purple-800">{subtopic.name}</span>
                                <span className={`text-purple-600 text-sm ${expandedSubtopics[`${topicIndex}-${subIndex}`] ? 'rotate-180' : ''}`}>
                                  ▼
                                </span>
                              </button>
                              
                              {expandedSubtopics[`${topicIndex}-${subIndex}`] && (
                                <div className="p-4 bg-white">
                                  <p className="text-slate-600 mb-4">{subtopic.content}</p>
                                  
                                  {/* Details array */}
                                  {subtopic.details && (
                                    <div className="space-y-2 mb-4">
                                      {subtopic.details.map((d, i) => (
                                        <div key={i} className="flex gap-4 bg-slate-50 p-2 rounded">
                                          <span className="font-medium text-purple-700 w-24">{d.label}:</span>
                                          <span className="text-slate-600 font-mono">{d.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Formula */}
                                  {subtopic.formula && (
                                    <div className="bg-purple-100 p-3 rounded-lg mb-4">
                                      <span className="font-mono text-purple-800 font-bold">{subtopic.formula}</span>
                                    </div>
                                  )}
                                  
                                  {/* SVG */}
                                  {subtopic.svg && (
                                    <div className="bg-slate-50 p-4 rounded-lg mb-4">
                                      {subtopic.svg}
                                    </div>
                                  )}
                                  
                                  {/* Table (special angles) */}
                                  {subtopic.table && (
                                    <div className="overflow-x-auto mb-4">
                                      <table className="w-full text-sm">
                                        <thead className="bg-slate-100">
                                          <tr>
                                            <th className="p-2">Angle</th>
                                            <th className="p-2">sin</th>
                                            <th className="p-2">cos</th>
                                            <th className="p-2">tan</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {subtopic.table.map((row, i) => (
                                            <tr key={i} className="border-t">
                                              <td className="p-2 font-medium">{row.angle}</td>
                                              <td className="p-2 font-mono">{row.sin}</td>
                                              <td className="p-2 font-mono">{row.cos}</td>
                                              <td className="p-2 font-mono">{row.tan}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                  
                                  {/* Examples */}
                                  {subtopic.examples && (
                                    <div className="space-y-2 mb-4">
                                      {subtopic.examples.map((ex, i) => (
                                        <div key={i} className="bg-slate-50 p-2 rounded">
                                          <span className="font-medium">{ex.problem}:</span>
                                          <span className="text-slate-600"> {ex.solution}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Steps */}
                                  {subtopic.steps && (
                                    <ol className="list-decimal list-inside space-y-1 mb-4">
                                      {subtopic.steps.map((step, i) => (
                                        <li key={i} className="text-slate-600">{step}</li>
                                      ))}
                                    </ol>
                                  )}
                                  
                                  {/* When to use */}
                                  {subtopic.whenToUse && (
                                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg mb-4">
                                      <span className="font-semibold text-amber-800">When to use:</span>
                                      <span className="text-amber-700"> {subtopic.whenToUse}</span>
                                    </div>
                                  )}
                                  
                                  {/* Swedish Example */}
                                  {subtopic.swedishExample && (
                                    <div className="bg-cyan-50 border border-cyan-200 p-3 rounded-lg">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span>🇸🇪</span>
                                        <span className="font-semibold text-cyan-800">{subtopic.swedishExample.company}</span>
                                      </div>
                                      <p className="text-cyan-700 text-sm">Application: {subtopic.swedishExample.application}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Key Concepts */}
              {activeTopic.content.keyConcepts && (
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
              )}

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