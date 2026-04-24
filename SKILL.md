# Skill: IB MYP Assessment Development

## Overview
This skill provides guidance for developing IB MYP4 assessment content for the KaniMath platform. It covers creating interactive assessments, study materials, and maintaining IB curriculum standards.

## Prerequisites
- Basic HTML/CSS/JavaScript knowledge
- Understanding of IB MYP assessment criteria
- Access to source materials (docx, txt files)

## Assessment Types

### 1. Mathematics Assessments
**Location**: `assessments/myp4-*.html`

**Common Topics**:
- Sets, Venn Diagrams, Probability
- Statistics (Mean, Median, Box Plots)
- Algebra, Geometry
- Comprehensive reviews

**Structure**:
```html
<!-- Multiple choice question -->
{
    id: 1,
    type: "mcq",
    text: "Question here",
    options: ["A", "B", "C", "D"],
    correct: 0,
    marks: 2
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
- PESTEL framework (Political, Economic, Social, Technological, Environmental, Legal)
- Swedish real-world examples

## Study Material Development

### Template Structure
```html
<section class="topic-section" id="topic-id">
    <h2><span class="icon">🎯</span> Section Title</h2>
    
    <div class="concept">
        <h3>Concept Name</h3>
        <p>Description...</p>
    </div>
    
    <div class="key-terms">
        <div class="key-term">
            <h4>Term</h4>
            <p>Definition</p>
        </div>
    </div>
</section>
```

### Design Guidelines
- Use IB accent colors: `--primary: #8b5cf6` (purple)
- Include Swedish examples (Volvo, Riksbank, Nord Pool)
- Add interactive quiz sections
- Link to assessment at bottom

## Creating New Assessment

### Step 1: Analyze Source Material
1. Read docx/txt files in `assessments/content/`
2. Identify key concepts and topics
3. Extract Swedish examples
4. Map to IB MYP criteria

### Step 2: Create Assessment HTML
Use existing pattern from `myp4-ins-supply-demand-assessment.html`:
- Sidebar with timer, progress, navigation
- Question types: MCQ, short, essay
- PDF download functionality

### Step 3: Create Study Material
Use pattern from `myp4-ins-money-history-study.html`:
- Header with IB badge
- Topic sections with concepts
- Interactive quiz
- Link to assessment

### Step 4: Update index.html
Add assessment card in the grid:
```html
<a href="assessments/myp4-topic.html" class="assessment-card" ...>
```

Update stats counters.

### Step 5: Commit & Deploy
```bash
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

## Common Tasks

### Fix Exit Link
Update `exitQuiz()` function in assessment:
```javascript
function exitQuiz() {
    window.location.href = 'myp4-topic-study.html';
}
```

### Add New Question
Add to questions array:
```javascript
{
    id: N,
    type: "mcq|short|essay",
    text: "Question text",
    options: [...], // for MCQ
    correct: 0, // for MCQ
    marks: X,
    keywords: [...] // for short/essay auto-grading
}
```

### Update Stats
Edit in `index.html`:
```html
<div class="stat-value" data-count="N">0</div>
```

## Troubleshooting

### 404 on New Page
- Ensure file exists in `assessments/`
- Check file is tracked by git
- Verify link in index.html is correct

### Quiz Not Submitting
- Check JavaScript errors in console
- Verify `questions` array is complete
- Ensure localStorage is working

### PDF Download Failing
- Verify jsPDF CDN is loading
- Check browser pop-up settings

## Related Files
- `index.html` - Main landing page
- `assessments/content/` - Source materials
- `AGENTS.md` - Developer documentation
- `README.md` - User documentation