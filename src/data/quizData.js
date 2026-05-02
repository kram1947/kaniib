export const mathTopics = [
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