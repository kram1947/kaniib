export const mathTopics = [
  // MATHEMATICS - MYP4
  {
    id: 'trigonometry',
    title: 'Trigonometry',
    subtitle: 'MYP4 Mathematics',
    description: 'Right triangles, SOH CAH TOA, trigonometric ratios, and applications',
    questions: 15,
    time: 45,
    color: 'orange',
    questionsList: [
      {
        id: 1,
        type: 'mcq',
        marks: 3,
        question: 'In a right triangle, if opposite = 3 and adjacent = 4, what is tan(θ)?',
        options: [
          { letter: 'A', text: '3/4' },
          { letter: 'B', text: '4/3' },
          { letter: 'C', text: '5/3' },
          { letter: 'D', text: '3/5' }
        ],
        correct: 'A',
        explanation: 'tan(θ) = opposite/adjacent = 3/4'
      },
      {
        id: 2,
        type: 'mcq',
        marks: 3,
        question: 'Find sin(30°) in a right triangle.',
        options: [
          { letter: 'A', text: '1/2' },
          { letter: 'B', text: '√3/2' },
          { letter: 'C', text: '1' },
          { letter: 'D', text: '√2/2' }
        ],
        correct: 'A',
        explanation: 'sin(30°) = 1/2 in a right triangle'
      },
      {
        id: 3,
        type: 'mcq',
        marks: 3,
        question: 'If cos(θ) = 12/13, find sin(θ).',
        options: [
          { letter: 'A', text: '5/13' },
          { letter: 'B', text: '13/12' },
          { letter: 'C', text: '5/12' },
          { letter: 'D', text: '12/5' }
        ],
        correct: 'A',
        explanation: 'sin²(θ) + cos²(θ) = 1, so sin(θ) = √(1 - 144/169) = √(25/169) = 5/13'
      },
      {
        id: 4,
        type: 'mcq',
        marks: 4,
        question: 'A ladder leans against a wall making 60° with the ground. If the ladder is 10m long, how high up the wall does it reach?',
        options: [
          { letter: 'A', text: '5m' },
          { letter: 'B', text: '8.66m' },
          { letter: 'C', text: '10m' },
          { letter: 'D', text: '5.77m' }
        ],
        correct: 'B',
        explanation: 'sin(60°) = height/10, height = 10 × √3/2 ≈ 8.66m'
      },
      {
        id: 5,
        type: 'mcq',
        marks: 3,
        question: 'Which trigonometric ratio is equal to adjacent/hypotenuse?',
        options: [
          { letter: 'A', text: 'Sine' },
          { letter: 'B', text: 'Cosine' },
          { letter: 'C', text: 'Tangent' },
          { letter: 'D', text: 'Cosecant' }
        ],
        correct: 'B',
        explanation: 'Cosine = adjacent/hypotenuse (CAH)'
      },
      {
        id: 6,
        type: 'mcq',
        marks: 4,
        question: 'Find the angle θ if tan(θ) = 1',
        options: [
          { letter: 'A', text: '30°' },
          { letter: 'B', text: '45°' },
          { letter: 'C', text: '60°' },
          { letter: 'D', text: '90°' }
        ],
        correct: 'B',
        explanation: 'tan(45°) = 1'
      },
      {
        id: 7,
        type: 'mcq',
        marks: 3,
        question: 'In a 30-60-90 triangle, the ratio of sides opposite 30°, 60°, and 90° is:',
        options: [
          { letter: 'A', text: '1 : 1 : 1' },
          { letter: 'B', text: '1 : √3 : 2' },
          { letter: 'C', text: '1 : 2 : 3' },
          { letter: 'D', text: '2 : 2 : 2' }
        ],
        correct: 'B',
        explanation: 'In a 30-60-90 triangle, the sides are in ratio 1 : √3 : 2 (opposite 30°, 60°, 90°)'
      },
      {
        id: 8,
        type: 'mcq',
        marks: 4,
        question: 'A person standing 50m from a tree observes the top at an angle of elevation of 30°. What is the height of the tree?',
        options: [
          { letter: 'A', text: '25m' },
          { letter: 'B', text: '28.9m' },
          { letter: 'C', text: '43.3m' },
          { letter: 'D', text: '50m' }
        ],
        correct: 'B',
        explanation: 'tan(30°) = height/50, height = 50 × 1/√3 ≈ 28.9m'
      }
    ]
  },
  {
    id: 'algebra',
    title: 'Algebra',
    subtitle: 'MYP4 Mathematics',
    description: 'Linear equations, quadratic expressions, and algebraic manipulation',
    questions: 15,
    time: 45,
    color: 'purple',
    questionsList: [
      {
        id: 1,
        type: 'mcq',
        marks: 3,
        question: 'Solve: 3x + 7 = 22',
        options: [
          { letter: 'A', text: 'x = 5' },
          { letter: 'B', text: 'x = 3' },
          { letter: 'C', text: 'x = 7' },
          { letter: 'D', text: 'x = 15' }
        ],
        correct: 'A',
        explanation: '3x = 22 - 7 = 15, x = 15/3 = 5'
      },
      {
        id: 2,
        type: 'mcq',
        marks: 3,
        question: 'Factorize: x² - 9',
        options: [
          { letter: 'A', text: '(x + 3)(x - 3)' },
          { letter: 'B', text: '(x + 9)(x - 1)' },
          { letter: 'C', text: '(x - 3)²' },
          { letter: 'D', text: '(x + 3)²' }
        ],
        correct: 'A',
        explanation: 'x² - 9 is a difference of squares: (x + 3)(x - 3)'
      },
      {
        id: 3,
        type: 'mcq',
        marks: 4,
        question: 'If f(x) = 2x² - 5x + 3, find f(2)',
        options: [
          { letter: 'A', text: '-1' },
          { letter: 'B', text: '1' },
          { letter: 'C', text: '5' },
          { letter: 'D', text: '3' }
        ],
        correct: 'B',
        explanation: 'f(2) = 2(4) - 5(2) + 3 = 8 - 10 + 3 = 1'
      },
      {
        id: 4,
        type: 'mcq',
        marks: 3,
        question: 'Simplify: (x³ × x⁴) ÷ x²',
        options: [
          { letter: 'A', text: 'x⁵' },
          { letter: 'B', text: 'x⁹' },
          { letter: 'C', text: 'x⁴' },
          { letter: 'D', text: 'x⁶' }
        ],
        correct: 'A',
        explanation: 'x^(3+4-2) = x^5'
      },
      {
        id: 5,
        type: 'mcq',
        marks: 4,
        question: 'Find the product: (x + 2)(x - 3)',
        options: [
          { letter: 'A', text: 'x² - x - 6' },
          { letter: 'B', text: 'x² + x - 6' },
          { letter: 'C', text: 'x² - 5x - 6' },
          { letter: 'D', text: 'x² - x + 6' }
        ],
        correct: 'A',
        explanation: '(x + 2)(x - 3) = x² - 3x + 2x - 6 = x² - x - 6'
      },
      {
        id: 6,
        type: 'mcq',
        marks: 3,
        question: 'What is the gradient of the line y = 3x + 5?',
        options: [
          { letter: 'A', text: '3' },
          { letter: 'B', text: '5' },
          { letter: 'C', text: '8' },
          { letter: 'D', text: '2' }
        ],
        correct: 'A',
        explanation: 'In y = mx + c, m is the gradient. Here m = 3'
      },
      {
        id: 7,
        type: 'mcq',
        marks: 4,
        question: 'Solve: x² - 5x + 6 = 0',
        options: [
          { letter: 'A', text: 'x = 2 or 3' },
          { letter: 'B', text: 'x = 1 or 6' },
          { letter: 'C', text: 'x = -2 or -3' },
          { letter: 'D', text: 'x = 0 or 5' }
        ],
        correct: 'A',
        explanation: '(x - 2)(x - 3) = 0, so x = 2 or x = 3'
      }
    ]
  },
  {
    id: 'number-systems',
    title: 'Number Systems',
    subtitle: 'MYP4 Mathematics',
    description: 'Integers, rational numbers, irrational numbers, and number operations',
    questions: 12,
    time: 30,
    color: 'teal',
    questionsList: [
      {
        id: 1,
        type: 'mcq',
        marks: 3,
        question: 'Which of the following is an irrational number?',
        options: [
          { letter: 'A', text: '√4' },
          { letter: 'B', text: '√2' },
          { letter: 'C', text: '0.5' },
          { letter: 'D', text: '3/7' }
        ],
        correct: 'B',
        explanation: '√2 cannot be expressed as a fraction of integers, making it irrational'
      },
      {
        id: 2,
        type: 'mcq',
        marks: 3,
        question: 'What is the value of (-3)⁴?',
        options: [
          { letter: 'A', text: '-81' },
          { letter: 'B', text: '81' },
          { letter: 'C', text: '12' },
          { letter: 'D', text: '-12' }
        ],
        correct: 'B',
        explanation: '(-3)⁴ = (-3) × (-3) × (-3) × (-3) = 81'
      },
      {
        id: 3,
        type: 'mcq',
        marks: 3,
        question: 'Simplify: | -7 | + | 5 |',
        options: [
          { letter: 'A', text: '-2' },
          { letter: 'B', text: '12' },
          { letter: 'C', text: '2' },
          { letter: 'D', text: '-12' }
        ],
        correct: 'B',
        explanation: '|-7| = 7, |5| = 5, sum = 7 + 5 = 12'
      },
      {
        id: 4,
        type: 'mcq',
        marks: 3,
        question: 'Which is the correct order from smallest to largest: 0.5, 1/3, 0.25?',
        options: [
          { letter: 'A', text: '0.25, 1/3, 0.5' },
          { letter: 'B', text: '0.5, 0.25, 1/3' },
          { letter: 'C', text: '1/3, 0.25, 0.5' },
          { letter: 'D', text: '0.25, 0.5, 1/3' }
        ],
        correct: 'A',
        explanation: '0.25 < 0.333... < 0.5'
      },
      {
        id: 5,
        type: 'mcq',
        marks: 4,
        question: 'Express 0.125 as a fraction in simplest form.',
        options: [
          { letter: 'A', text: '1/8' },
          { letter: 'B', text: '1/4' },
          { letter: 'C', text: '1/2' },
          { letter: 'D', text: '3/8' }
        ],
        correct: 'A',
        explanation: '0.125 = 125/1000 = 1/8'
      },
      {
        id: 6,
        type: 'mcq',
        marks: 3,
        question: 'What is the least common multiple (LCM) of 12 and 18?',
        options: [
          { letter: 'A', text: '36' },
          { letter: 'B', text: '72' },
          { letter: 'C', text: '6' },
          { letter: 'D', text: '24' }
        ],
        correct: 'A',
        explanation: 'LCM of 12 and 18 is 36'
      }
    ]
  },
  // INDIVIDUALS & SOCIETIES
  {
    id: 'history-money',
    title: 'History of Money',
    subtitle: 'Individuals & Societies',
    description: 'Barter system, evolution of currency, cryptocurrency, and financial history',
    questions: 15,
    time: 45,
    color: 'teal',
    questionsList: [
      {
        id: 1,
        type: 'mcq',
        marks: 3,
        question: 'What is the main disadvantage of the barter system?',
        options: [
          { letter: 'A', text: 'Requires double coincidence of wants' },
          { letter: 'B', text: 'Cannot store value' },
          { letter: 'C', text: 'Always requires gold' },
          { letter: 'D', text: 'Is only digital' }
        ],
        correct: 'A',
        explanation: 'Barter requires both parties to want what the other has - the "double coincidence of wants"'
      },
      {
        id: 2,
        type: 'mcq',
        marks: 3,
        question: 'Which of these was NOT used as early forms of money?',
        options: [
          { letter: 'A', text: 'Gold coins' },
          { letter: 'B', text: 'Cowrie shells' },
          { letter: 'C', text: 'Credit cards' },
          { letter: 'D', text: 'Salt bars' }
        ],
        correct: 'C',
        explanation: 'Credit cards are a modern invention from the 20th century'
      },
      {
        id: 3,
        type: 'mcq',
        marks: 3,
        question: 'What is cryptocurrency based on?',
        options: [
          { letter: 'A', text: 'Blockchain technology' },
          { letter: 'B', text: 'Government backing' },
          { letter: 'C', text: 'Gold reserves' },
          { letter: 'D', text: 'Bank notes' }
        ],
        correct: 'A',
        explanation: 'Cryptocurrencies use blockchain - a decentralized digital ledger'
      },
      {
        id: 4,
        type: 'mcq',
        marks: 4,
        question: 'Who invented Bitcoin and in what year?',
        options: [
          { letter: 'A', text: 'Satoshi Nakamoto, 2009' },
          { letter: 'B', text: 'Elon Musk, 2015' },
          { letter: 'C', text: 'Bill Gates, 2000' },
          { letter: 'D', text: 'Mark Zuckerberg, 2010' }
        ],
        correct: 'A',
        explanation: 'Bitcoin was created by the anonymous person/group Satoshi Nakamoto in 2009'
      },
      {
        id: 5,
        type: 'mcq',
        marks: 3,
        question: 'What does "fiat currency" mean?',
        options: [
          { letter: 'A', text: 'Currency backed by gold' },
          { letter: 'B', text: 'Currency declared legal tender by government' },
          { letter: 'C', text: 'Currency from ancient Rome' },
          { letter: 'D', text: 'Digital currency only' }
        ],
        correct: 'B',
        explanation: 'Fiat money has value because the government declares it legal tender, not because it\'s backed by a commodity'
      },
      {
        id: 6,
        type: 'mcq',
        marks: 4,
        question: 'What is the main function of a central bank?',
        options: [
          { letter: 'A', text: 'Loan money to individuals' },
          { letter: 'B', text: 'Manage a country\'s money supply and monetary policy' },
          { letter: 'C', text: 'Print all the money in circulation' },
          { letter: 'D', text: 'Run retail banks' }
        ],
        correct: 'B',
        explanation: 'Central banks manage monetary policy, interest rates, and currency stability'
      }
    ]
  },
  {
    id: 'geometry',
    title: 'Geometry',
    subtitle: 'MYP4 Mathematics',
    description: 'Angles, triangles, quadrilaterals, circles, and geometric proofs',
    questions: 12,
    time: 35,
    color: 'indigo',
    questionsList: [
      {
        id: 1,
        type: 'mcq',
        marks: 3,
        question: 'What is the sum of angles in a triangle?',
        options: [
          { letter: 'A', text: '90°' },
          { letter: 'B', text: '180°' },
          { letter: 'C', text: '360°' },
          { letter: 'D', text: '270°' }
        ],
        correct: 'B',
        explanation: 'The sum of interior angles in any triangle is 180°'
      },
      {
        id: 2,
        type: 'mcq',
        marks: 3,
        question: 'A regular hexagon has how many sides?',
        options: [
          { letter: 'A', text: '5' },
          { letter: 'B', text: '6' },
          { letter: 'C', text: '7' },
          { letter: 'D', text: '8' }
        ],
        correct: 'B',
        explanation: 'A hexagon has 6 equal sides'
      },
      {
        id: 3,
        type: 'mcq',
        marks: 4,
        question: 'Find the area of a circle with radius 7cm (use π = 22/7)',
        options: [
          { letter: 'A', text: '44 cm²' },
          { letter: 'B', text: '154 cm²' },
          { letter: 'C', text: '77 cm²' },
          { letter: 'D', text: '308 cm²' }
        ],
        correct: 'B',
        explanation: 'Area = πr² = (22/7) × 7² = 22 × 7 = 154 cm²'
      },
      {
        id: 4,
        type: 'mcq',
        marks: 3,
        question: 'What type of angle is 125°?',
        options: [
          { letter: 'A', text: 'Acute' },
          { letter: 'B', text: 'Right' },
          { letter: 'C', text: 'Obtuse' },
          { letter: 'D', text: 'Reflex' }
        ],
        correct: 'C',
        explanation: 'Angles between 90° and 180° are obtuse'
      },
      {
        id: 5,
        type: 'mcq',
        marks: 4,
        question: 'In a right triangle, if one angle is 45°, what is the other acute angle?',
        options: [
          { letter: 'A', text: '45°' },
          { letter: 'B', text: '90°' },
          { letter: 'C', text: '30°' },
          { letter: 'D', text: '60°' }
        ],
        correct: 'A',
        explanation: '90° + 45° + x = 180°, so x = 45°'
      },
      {
        id: 6,
        type: 'mcq',
        marks: 3,
        question: 'What is the Pythagorean theorem?',
        options: [
          { letter: 'A', text: 'a + b = c' },
          { letter: 'B', text: 'a² + b² = c²' },
          { letter: 'C', text: 'a × b = c' },
          { letter: 'D', text: 'a² × b² = c²' }
        ],
        correct: 'B',
        explanation: 'In a right triangle, a² + b² = c² where c is the hypotenuse'
      }
    ]
  },
  {
    id: 'sets-venn',
    title: 'Sets, Venn & Probability',
    subtitle: 'MYP4 Mathematics',
    description: 'Set theory, 3-set Venn diagrams, and probability fundamentals',
    questions: 16,
    time: 45,
    color: 'blue',
    questionsList: [
      {
        id: 1,
        type: 'mcq',
        marks: 3,
        question: 'If U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} and A = {2, 4, 6, 8}, which set represents A\'?',
        options: [
          { letter: 'A', text: '{1, 3, 5, 7, 9}' },
          { letter: 'B', text: '{2, 4, 6, 8, 10}' },
          { letter: 'C', text: '{1, 3, 5, 7, 9, 10}' },
          { letter: 'D', text: '{1, 2, 3, 5, 7, 10}' }
        ],
        correct: 'A',
        explanation: 'The complement A\' includes all elements in U not in A.'
      },
      {
        id: 2,
        type: 'mcq',
        marks: 3,
        question: 'In a class of 30 students, 18 play football and 15 play basketball. How many play at least one sport if 5 play neither?',
        options: [
          { letter: 'A', text: '28' },
          { letter: 'B', text: '25' },
          { letter: 'C', text: '33' },
          { letter: 'D', text: '30' }
        ],
        correct: 'B',
        explanation: 'n(A∪B) = n(A) + n(B) - n(A∩B). Total with at least one = 30-5=25.'
      },
      {
        id: 3,
        type: 'mcq',
        marks: 3,
        question: 'A bag has 3 red and 5 blue balls. What is P(red)?',
        options: [
          { letter: 'A', text: '3/8' },
          { letter: 'B', text: '5/8' },
          { letter: 'C', text: '3/5' },
          { letter: 'D', text: '5/3' }
        ],
        correct: 'A',
        explanation: 'P(event) = favorable outcomes / total outcomes = 3 / (3+5) = 3/8'
      },
      {
        id: 4,
        type: 'mcq',
        marks: 4,
        question: 'A survey records preferences: Male-Tea: 25, Male-Coffee: 30, Female-Tea: 20, Female-Coffee: 25. If a person is female, what is P(prefers coffee)?',
        options: [
          { letter: 'A', text: '1/4' },
          { letter: 'B', text: '5/9' },
          { letter: 'C', text: '4/9' },
          { letter: 'D', text: '1/2' }
        ],
        correct: 'B',
        explanation: 'P(coffee|female) = 25/45 = 5/9. We only consider females (45 total).'
      },
      {
        id: 5,
        type: 'mcq',
        marks: 4,
        question: 'Two dice are rolled. What is P(sum is prime OR sum is even)?',
        options: [
          { letter: 'A', text: '1/2' },
          { letter: 'B', text: '3/4' },
          { letter: 'C', text: '5/6' },
          { letter: 'D', text: '1' }
        ],
        correct: 'D',
        explanation: 'All possible sums (2-12) are either prime OR even. Every sum satisfies at least one condition.'
      },
      {
        id: 6,
        type: 'mcq',
        marks: 5,
        question: 'In a group of 50 students: 30 study M, 25 study P, 20 study C. 12 study M and P only, 8 study P and C only, 5 study M and C only, 3 study all three, and 10 study none. How many study exactly one subject?',
        options: [
          { letter: 'A', text: '12' },
          { letter: 'B', text: '15' },
          { letter: 'C', text: '18' },
          { letter: 'D', text: '20' }
        ],
        correct: 'B',
        explanation: 'Total in at least one = 50-10=40. Exactly two = 12+8+5=25. All three = 3. Exactly one = 40-25-3 = 12.'
      },
      {
        id: 7,
        type: 'mcq',
        marks: 5,
        question: 'From a standard deck of 52 cards, one card is drawn, then another without replacement. What is P(first is a heart and second is a king)?',
        options: [
          { letter: 'A', text: '13/204' },
          { letter: 'B', text: '1/52' },
          { letter: 'C', text: '13/51' },
          { letter: 'D', text: '1/204' }
        ],
        correct: 'A',
        explanation: 'P(heart first) = 13/52. P(king second | heart first) = 4/51. P = 13/52 × 4/51 = 13/204.'
      },
      {
        id: 8,
        type: 'mcq',
        marks: 4,
        question: 'Two events A and B are such that P(A) = 0.6, P(B) = 0.5, and P(A∩B) = 0.3. Are A and B independent?',
        options: [
          { letter: 'A', text: 'Yes, because 0.6 × 0.5 = 0.3' },
          { letter: 'B', text: 'No, because 0.6 × 0.5 ≠ 0.3' },
          { letter: 'C', text: 'Yes, because P(A∪B) = 0.8' },
          { letter: 'D', text: 'Cannot be determined' }
        ],
        correct: 'A',
        explanation: 'For independence: P(A∩B) = P(A)×P(B). 0.6×0.5 = 0.3 = P(A∩B). They ARE independent.'
      }
    ]
  },
  {
    id: 'statistics',
    title: 'Statistics',
    subtitle: 'MYP4 Mathematics',
    description: 'Mean, Median, Mode, Box Plots, IQR, and data analysis',
    questions: 25,
    time: 60,
    color: 'green',
    questionsList: [
      {
        id: 1,
        type: 'mcq',
        marks: 3,
        question: 'Find the mean of: 12, 15, 18, 21, 24',
        options: [
          { letter: 'A', text: '17' },
          { letter: 'B', text: '18' },
          { letter: 'C', text: '19' },
          { letter: 'D', text: '20' }
        ],
        correct: 'B',
        explanation: 'Mean = (12+15+18+21+24)/5 = 90/5 = 18'
      },
      {
        id: 2,
        type: 'mcq',
        marks: 3,
        question: 'Find the median of: 23, 17, 31, 25, 19',
        options: [
          { letter: 'A', text: '23' },
          { letter: 'B', text: '25' },
          { letter: 'C', text: '19' },
          { letter: 'D', text: '31' }
        ],
        correct: 'A',
        explanation: 'Sorted: 17, 19, 23, 25, 31. Median = 23 (middle value)'
      },
      {
        id: 3,
        type: 'mcq',
        marks: 4,
        question: 'Data set: 5, 8, 12, 15, 20, 22, 25. What is the interquartile range (IQR)?',
        options: [
          { letter: 'A', text: '12' },
          { letter: 'B', text: '14' },
          { letter: 'C', text: '17' },
          { letter: 'D', text: '20' }
        ],
        correct: 'B',
        explanation: 'Q1 = 8, Q3 = 22. IQR = 22 - 8 = 14'
      },
      {
        id: 4,
        type: 'mcq',
        marks: 4,
        question: 'In a box plot, what does the line inside the box represent?',
        options: [
          { letter: 'A', text: 'Mean' },
          { letter: 'B', text: 'Median' },
          { letter: 'C', text: 'Mode' },
          { letter: 'D', text: 'Range' }
        ],
        correct: 'B',
        explanation: 'The line inside the box in a box plot represents the median.'
      },
      {
        id: 5,
        type: 'mcq',
        marks: 3,
        question: 'Which measure of central tendency is best for skewed data?',
        options: [
          { letter: 'A', text: 'Mean' },
          { letter: 'B', text: 'Median' },
          { letter: 'C', text: 'Mode' },
          { letter: 'D', text: 'Range' }
        ],
        correct: 'B',
        explanation: 'Median is preferred for skewed data as it is not affected by outliers.'
      }
    ]
  },
  {
    id: 'economics',
    title: 'Supply & Demand',
    subtitle: 'Individuals & Societies',
    description: 'Market economics, equilibrium, and government intervention',
    questions: 20,
    time: 90,
    color: 'red',
    questionsList: [
      {
        id: 1,
        type: 'mcq',
        marks: 3,
        question: 'What happens to equilibrium price when supply increases?',
        options: [
          { letter: 'A', text: 'Price increases' },
          { letter: 'B', text: 'Price decreases' },
          { letter: 'C', text: 'Price stays the same' },
          { letter: 'D', text: 'Quantity decreases' }
        ],
        correct: 'B',
        explanation: 'When supply increases, the supply curve shifts right, lowering equilibrium price.'
      },
      {
        id: 2,
        type: 'mcq',
        marks: 3,
        question: 'What happens to demand when consumer income increases (for normal goods)?',
        options: [
          { letter: 'A', text: 'Demand decreases' },
          { letter: 'B', text: 'Demand increases' },
          { letter: 'C', text: 'Demand stays the same' },
          { letter: 'D', text: 'Supply increases' }
        ],
        correct: 'B',
        explanation: 'For normal goods, higher income leads to higher demand.'
      },
      {
        id: 3,
        type: 'mcq',
        marks: 4,
        question: 'A price ceiling set below equilibrium price causes:',
        options: [
          { letter: 'A', text: 'Surplus' },
          { letter: 'B', text: 'Shortage' },
          { letter: 'C', text: 'No effect' },
          { letter: 'D', text: 'Equilibrium' }
        ],
        correct: 'B',
        explanation: 'Price ceiling below equilibrium creates shortage as quantity demanded exceeds quantity supplied.'
      },
      {
        id: 4,
        type: 'mcq',
        marks: 4,
        question: 'If demand is elastic, a price increase will:',
        options: [
          { letter: 'A', text: 'Increase total revenue' },
          { letter: 'B', text: 'Decrease total revenue' },
          { letter: 'C', text: 'No change in revenue' },
          { letter: 'D', text: 'Double revenue' }
        ],
        correct: 'B',
        explanation: 'For elastic demand, price increase causes quantity demanded to fall proportionally more, decreasing total revenue.'
      },
      {
        id: 5,
        type: 'mcq',
        marks: 3,
        question: 'Which factor shifts the supply curve?',
        options: [
          { letter: 'A', text: 'Consumer tastes' },
          { letter: 'B', text: 'Price of the good' },
          { letter: 'C', text: 'Technology' },
          { letter: 'D', text: 'Number of buyers' }
        ],
        correct: 'C',
        explanation: 'Technology affects production costs and shifts the supply curve. Price affects quantity supplied, not supply.'
      }
    ]
  }
]

export const sudokuLevels = [
  { id: 'easy', name: 'Easy', cells: 38 },
  { id: 'medium', name: 'Medium', cells: 30 },
  { id: 'hard', name: 'Hard', cells: 25 }
]

export const biotechNews = [
  {
    id: 1,
    title: 'CRISPR Gene Editing Breakthrough',
    date: '2024-03-15',
    summary: 'Scientists achieve unprecedented accuracy in gene editing using new CRISPR variant.',
    image: '🧬',
    category: 'Gene Editing'
  },
  {
    id: 2,
    title: 'mRNA Vaccine Advances',
    date: '2024-03-10',
    summary: 'New mRNA technology shows promise for personalized cancer vaccines.',
    image: '💉',
    category: 'Medicine'
  },
  {
    id: 3,
    title: 'Synthetic Biology Milestone',
    date: '2024-03-05',
    summary: 'Researchers create living organism with completely synthetic genome.',
    image: '🧪',
    category: 'Synthetic Biology'
  },
  {
    id: 4,
    title: 'AI in Drug Discovery',
    date: '2024-02-28',
    summary: 'AI system identifies new antibiotic compound in record time.',
    image: '🤖',
    category: 'AI & Biotech'
  },
  {
    id: 5,
    title: 'Stem Cell Therapy Progress',
    date: '2024-02-20',
    summary: 'Clinical trials show promising results for degenerative disease treatment.',
    image: '🔬',
    category: 'Regenerative Medicine'
  },
  {
    id: 6,
    title: 'Bioinformatics Revolution',
    date: '2024-02-15',
    summary: 'New algorithms enable faster analysis of complex biological data.',
    image: '💻',
    category: 'Bioinformatics'
  }
]