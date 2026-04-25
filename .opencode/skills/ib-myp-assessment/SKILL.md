---
name: ib-myp-assessment
description: IB MYP Assessment Development - Create interactive assessments for the KaniMath platform including study materials and quizzes
argument-hint: 'assessment topic (e.g., supply-demand, money-history)'
user-invocable: true
---

# Skill: IB MYP Assessment Development

This skill provides guidance for developing IB MYP4 assessment content for the KaniMath platform. It covers creating interactive assessments (both HTML and React-based), study materials, and maintaining IB curriculum standards. The platform now uses React for the main application while maintaining backward compatibility with existing HTML assessment files.

## Project Path
```
/home/ubuntu/kani/mathapp/
```

## Live Site
https://kaniib.vercel.app

## Prerequisites
- Basic HTML/CSS/JavaScript knowledge
- Basic React knowledge (for main application development)
- Understanding of IB MYP assessment criteria
- Access to source materials (docx, txt files in `assessments/content/`)
- Node.js and npm installed (for development)

## Assessment Types

### 1. Mathematics Assessments
**Location**: `assessments/myp4-*.html`

**Common Topics**:
- Sets, Venn Diagrams, Probability
- Statistics (Mean, Median, Box Plots)
- Algebra, Geometry
- Comprehensive reviews

**Question Structure**:
```javascript
{
    id: 1,
    type: "mcq",
    text: "Question here",
    options: ["A", "B", "C", "D"],
    correct: 0,
    marks: 2,
    explanation: "Why this is correct"
}
```

### 2. Individuals & Societies Assessments
**Location**: `assessments/myp4-ins-*.html`

**Common Topics**:
- History of Money
- Supply & Demand
- Economic systems
- Cryptocurrency

**Includes**:
- OPVL analysis (Origin, Purpose, Value, Limitation)
- PESTEL framework
- Swedish real-world examples

## Creating New Assessment

### Approach 1: HTML Assessments (Backward Compatible)
For maintaining compatibility with existing assessments:

#### Step 1: Analyze Source Material
1. Read docx/txt files in `assessments/content/`
2. Identify key concepts and topics
3. Extract Swedish examples
4. Map to IB MYP criteria

#### Step 2: Create Assessment HTML
Use existing pattern from `myp4-ins-supply-demand-assessment.html`:
- Sidebar with timer, progress, navigation
- Question types: MCQ, short, essay
- PDF download functionality

#### Step 3: Create Study Material
Use pattern from `myp4-ins-money-history-study.html`:
- Header with IB badge
- Topic sections with concepts
- Interactive quiz
- Link to assessment

#### Step 4: Update React Application
Add assessment card to the React app in `src/pages/Assessments.jsx`:
```jsx
// Add to assessment data array
{
  id: 'unique-id',
  title: 'Assessment Title',
  description: 'Brief description',
  topics: ['topic1', 'topic2'],
  questionCount: 10,
  timeMinutes: 30,
  marks: 50,
  difficulty: [true, true, true, false, false], // 3 active dots
  href: 'assessments/myp4-topic.html',
  category: 'myp4',
  badge: 'badge-myp4'
}
```

#### Step 5: Update Stats (if needed)
Edit the stats data in `src/pages/Home.jsx` or wherever stats are maintained.

### Approach 2: React Assessments (Future Development)
For new development using React components:

#### Step 1: Create Assessment Component
Create a new component in `src/pages/assessments/`:
```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyAssessment = () => {
  const navigate = useNavigate();
  
  // Assessment logic here (timer, questions, scoring, etc.)
  
  return (
    <div>
      {/* Assessment UI */}
    </div>
  );
};

export default MyAssessment;
```

#### Step 2: Add Route
Add route in `src/App.jsx`:
```jsx
<Route path="/assessments/my-topic" element={<MyAssessment />} />
```

#### Step 3: Create Study Material (Optional)
Create study material as either HTML file or React component following similar patterns.

#### Step 4: Link from Assessments Page
Add entry to assessment data in `src/pages/Assessments.jsx` with `href` pointing to the React route.

### Step 5: Commit & Deploy
```bash
cd /home/ubuntu/kani/mathapp
git add .
git commit -m "Add [topic] assessment"
git push origin main
```

## IB MYP Criteria Reference

### Individuals & Societies
| Criterion | Focus | Weight |
|-----------|-------|--------|
| A | Knowing & Understanding | 25% |
| B | Investigating | 25% |
| C | Communicating | 25% |
| D | Thinking Critically | 25% |

### Global Contexts
- Orientation in Space and Time
- Global Interaction
- Personal and Cultural Expression
- Scientific and Technical Innovation
- Globalization and Sustainability
- Identity and Relationships

## Key Commands

### Development
```bash
# Install dependencies
cd /home/ubuntu/kani/mathapp && npm install

# Start development server
cd /home/ubuntu/kani/mathapp && npm run dev

# Build for production
cd /home/ubuntu/kani/mathapp && npm run build

# Preview production build
cd /home/ubuntu/kani/mathapp && npm run preview
```

### Git Operations
```bash
# Check git status
cd /home/ubuntu/kani/mathapp && git status

# View recent commits
cd /home/ubuntu/kani/mathapp && git log --oneline -5

# Force push (if needed)
cd /home/ubuntu/kani/mathapp && git push origin main --force
```

## Troubleshooting

### 404 on New Page
- Ensure file exists in `assessments/`
- Check file is tracked by git
- Verify link in index.html is correct
- Wait 30s for Vercel redeploy

### Quiz Not Submitting
- Check JavaScript errors in console
- Verify `questions` array is complete
- Ensure localStorage is working

### PDF Download Failing
- Verify jsPDF CDN is loading
- Check browser pop-up settings

### Fix Exit Link
Update `exitQuiz()` function:
```javascript
function exitQuiz() {
    window.location.href = 'myp4-topic-study.html';
}
```

## Related Files
- `index.html` - Main landing page
- `assessments/content/` - Source materials
- `AGENTS.md` - Developer documentation
- `README.md` - User documentation