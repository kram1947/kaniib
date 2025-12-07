import { Difficulty, Question, QuestionType, Topic } from "./types";

export const TOPICS: Topic[] = [
  { id: 'ratio', title: 'Ratio & Proportion', description: 'Scale factors, map ratios, and direct/inverse proportion.', iconName: 'Scale', questionCount: 20 },
  { id: 'seq', title: 'Number Sequences', description: 'Arithmetic, geometric, and quadratic sequences (nth term).', iconName: 'ListOrdered', questionCount: 20 },
  { id: 'alg_exp', title: 'Algebraic Expressions', description: 'Expanding, factorizing, and simplifying complex expressions.', iconName: 'Variable', questionCount: 20 },
  { id: 'lin_eq', title: 'Linear Equations', description: 'Solving mx+c, gradients, and real-world linear modeling.', iconName: 'TrendingUp', questionCount: 20 },
  { id: 'sim_eq', title: 'Simultaneous Equations', description: 'Elimination, substitution, and graphical methods.', iconName: 'GitMerge', questionCount: 20 },
  { id: 'trig', title: 'Trigonometry', description: 'SOH CAH TOA in 2D and 3D shapes.', iconName: 'Triangle', questionCount: 20 },
  { id: 'non_right_trig', title: 'Non-Right Angled Trig', description: 'Sine and Cosine rules, Area of a triangle.', iconName: 'Activity', questionCount: 20 },
];

// Helper to create dummy questions to fill the "20" requirement for the demo
// In a real app, these would be fully populated or fetched via Gemini.
const createPlaceholderQuestions = (topicId: string, startIdx: number): Question[] => {
    return Array.from({ length: 15 }).map((_, i) => ({
        id: `${topicId}_gen_${startIdx + i}`,
        text: `Sample generated question #${i + 1} for ${topicId}. (In a full production build, this would be AI-generated content matching the strict syllabus). What is the result of applying the module concepts?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswerIndex: 0,
        explanation: "This is a placeholder explanation for the demo.",
        difficulty: Difficulty.Medium,
        type: QuestionType.Standard,
        topicId
    }));
};

export const INITIAL_QUESTIONS: Question[] = [
  // --- Ratio & Proportion ---
  {
    id: 'ratio_1',
    topicId: 'ratio',
    text: 'A map has a scale of 1:50,000. Two villages are 8 cm apart on the map. What is the actual distance between them in kilometers?',
    options: ['4 km', '40 km', '0.4 km', '400 km'],
    correctAnswerIndex: 0,
    explanation: '1 cm = 50,000 cm. 8 cm = 400,000 cm. 400,000 cm = 4,000 m = 4 km.',
    difficulty: Difficulty.Easy,
    type: QuestionType.RealWorld
  },
  {
    id: 'ratio_2',
    topicId: 'ratio',
    text: 'Ideally, a concrete mix requires cement, sand, and gravel in the ratio 1:2:3. If you have 150 kg of sand, how much gravel is needed?',
    options: ['200 kg', '225 kg', '300 kg', '75 kg'],
    correctAnswerIndex: 1,
    explanation: 'Sand is 2 parts. 1 part = 150/2 = 75 kg. Gravel is 3 parts. 3 * 75 = 225 kg.',
    difficulty: Difficulty.Medium,
    type: QuestionType.RealWorld
  },
  {
    id: 'ratio_3',
    topicId: 'ratio',
    text: 'If y is inversely proportional to x, and y = 10 when x = 4, find y when x = 8.',
    options: ['5', '20', '2', '8'],
    correctAnswerIndex: 0,
    explanation: 'Inverse proportion: y = k/x. 10 = k/4 => k = 40. When x = 8, y = 40/8 = 5.',
    difficulty: Difficulty.Hard,
    type: QuestionType.Standard
  },
  
  // --- Linear Equations ---
  {
    id: 'lin_1',
    topicId: 'lin_eq',
    text: 'Solve for x: 3(x - 2) = 2(x + 5)',
    options: ['16', '11', '10', '4'],
    correctAnswerIndex: 0,
    explanation: '3x - 6 = 2x + 10 -> 3x - 2x = 10 + 6 -> x = 16.',
    difficulty: Difficulty.Easy,
    type: QuestionType.Standard
  },
  {
    id: 'lin_2',
    topicId: 'lin_eq',
    text: 'A taxi charges a base fee of $3.00 plus $1.50 per kilometer. If a ride costs $18.00, how far was the trip?',
    options: ['12 km', '10 km', '15 km', '8 km'],
    correctAnswerIndex: 1,
    explanation: 'Cost = 3 + 1.5d. 18 = 3 + 1.5d -> 15 = 1.5d -> d = 10.',
    difficulty: Difficulty.Medium,
    type: QuestionType.RealWorld
  },
  {
    id: 'lin_3',
    topicId: 'lin_eq',
    text: 'Find the equation of the line passing through (2, 5) and (4, 11).',
    options: ['y = 3x - 1', 'y = 3x + 1', 'y = 2x + 1', 'y = 3x - 2'],
    correctAnswerIndex: 0,
    explanation: 'Gradient m = (11-5)/(4-2) = 6/2 = 3. y = mx + c -> 5 = 3(2) + c -> 5 = 6 + c -> c = -1. y = 3x - 1.',
    difficulty: Difficulty.Hard,
    type: QuestionType.Standard
  },

  // --- Simultaneous Equations ---
  {
    id: 'sim_1',
    topicId: 'sim_eq',
    text: 'Solve: 2x + y = 10 and x - y = 2',
    options: ['x=4, y=2', 'x=3, y=4', 'x=5, y=0', 'x=6, y=4'],
    correctAnswerIndex: 0,
    explanation: 'Add equations: 3x = 12 -> x = 4. Substitute into second: 4 - y = 2 -> y = 2.',
    difficulty: Difficulty.Medium,
    type: QuestionType.Standard
  },
  {
    id: 'sim_2',
    topicId: 'sim_eq',
    text: 'Five years ago, a father was three times as old as his son. Now their combined ages are 66. How old is the son now?',
    options: ['19', '17', '14', '22'],
    correctAnswerIndex: 0,
    explanation: 'Let F and S be current ages. F-5 = 3(S-5) and F+S=66. Solve to get S=19.',
    difficulty: Difficulty.Challenger,
    type: QuestionType.RealWorld
  }
];

// Hydrate topics with placeholders to simulate the 20 questions
export const ALL_QUESTIONS: Question[] = [
    ...INITIAL_QUESTIONS,
    ...createPlaceholderQuestions('ratio', 100),
    ...createPlaceholderQuestions('seq', 100),
    ...createPlaceholderQuestions('alg_exp', 100),
    ...createPlaceholderQuestions('lin_eq', 100),
    ...createPlaceholderQuestions('sim_eq', 100),
    ...createPlaceholderQuestions('trig', 100),
    ...createPlaceholderQuestions('non_right_trig', 100),
];

// Helper to get specific set
export const getQuestionsForTopic = (topicId: string) => {
    return ALL_QUESTIONS.filter(q => q.topicId === topicId).slice(0, 20);
}
