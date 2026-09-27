---
name: ib-myp-assessment
description: Build IB MYP study material and timed assessments for the Kani_ISSR platform. Encodes the content standards (high IB standard, competitive-exam alignment, explicit differentiation) and the executable quality gate.
argument-hint: 'topic and level, e.g. "M10 science ESS Unit B, 1 study page + 2 papers"'
user-invocable: true
---

# Skill: IB MYP Study Material & Assessment Development

Authoritative guide for producing study material and timed assessments for this platform.
**For architecture, file layout and deployment truth, read `AGENTS.md`. This file covers *how to author content*.**

- **Project path:** `C:\Users\kram\Documents\kr_projects\mathapp` (Windows / PowerShell)
- **Live site:** https://kaniib.vercel.app
- **Brand:** Kani_ISSR (rebranded from KaniMath — use Kani_ISSR in new copy)

---

## 1. Non-negotiable content standards

These are requirements, not suggestions. If a deliverable cannot meet them, say so rather than shipping something weaker.

### 1.1 High IB standard

Target the demand of a **strong MYP candidate aiming at 7–8**, not a pass-level worksheet.

- **Answer the question that is asked.** No padding, no restating the stem, no "this question tests…".
- **Precision of language.** Use the exact IB terminology (`in situ`, `ex situ`, `LUCA`, `quadrat`, `standard deviation`). If a student uses loose language, the mark scheme should say what is acceptable.
- **Every mark is defensible.** A trained marker should be able to award each mark from the scheme alone, without guessing intent.
- **Realise the command terms.** `State` = one fact. `Define` = precise meaning. `Explain` = cause/effect chain. `Justify` = argument + evidence + reasoning. `Evaluate` = balanced judgement on both sides with a conclusion. Do not let an `explain` be answered with a bare `state`.
- **No trivia.** Every question must require reasoning, application, or analysis. If a fact can be recalled with no understanding, it does not belong in a timed paper.
- **Scaffold by design.** Within a paper, difficulty must ramp: recall → application → analysis → evaluation. A flat paper wastes the grade range.

### 1.2 Competitive-exam alignment

Anchor content in the *format and rigour* of real external papers, then extend beyond them.

- **Format anchor:** IB MYP Sciences **Paper 1** (short structured questions) and **Paper 2** (extended response, data-based). Mirror their command terms, mark allocations and time-per-mark expectations.
- **Enrichment anchor:** competitive problem styles seen in **IB Science Olympiad / IChO-style** papers and national olympiads (UKMT, BBO, USABO) — multi-step reasoning, data interpretation, ranking/classification tasks, and "explain why method X fails" critique questions.
- **Problem style to aspire to:** data that must be *interrogated* (identify the trend, quantify it, evaluate the method, state the limitation) rather than data that is merely *read off*.
- **Citation honesty — non-negotiable.** Never invent a paper number, question number, year or quotation. If you cannot verify a specific past-paper reference, either omit it or describe the source as a style ("in the style of IChO data-analysis questions"). A fabricated citation is worse than no citation. Same rule for statistics, dates and species counts: give a figure with its source and uncertainty, or omit it.
- Label any figure that is an estimate as an estimate (e.g. "~8.7 million eukaryotic species, Mora et al. 2011").

### 1.3 Make the difference clear

Students most often lose marks on *pairs* of easily confused ideas, not on isolated facts. Differentiation is therefore a first-class requirement, not a stylistic extra.

**In study material:**
- Every section that contains a confusable pair gets an explicit **contrast table** (`Concept | A | B` rows) or a **"Do not confuse"** callout.
- Minimum pairs to cover wherever they arise, e.g.:
  - in situ vs ex situ · homozygous vs heterozygous · genotype vs phenotype
  - variation within a species vs variation between species · natural vs sexual selection
  - divergent vs convergent evolution · homologous vs analogous structures
  - extinction vs endangerment (IUCN) · relative vs absolute population change
  - mean vs median vs mode · standard deviation vs range
- State *why* students confuse them, not just that they are different. The misconception is the teaching point.
- End each section with a **self-check** ("Which is X, and why not Y?") that forces the distinction.

**In assessments:**
- Distractors must be **diagnostic, not decorative.** At least one wrong option in each MCQ should correspond to a specific, named misconception. A student who picks it should be able to say *what they got wrong*.
- Never make two options defensible, and never make an option correct "for a different reason" than intended.
- Where a concept pair exists, at least one question in the paper must require choosing *between* them under a scenario that makes the distinction load-bearing.

---

## 2. Quality gate (executable — do this before reporting done)

```bash
npm run validate                       # all files in assessments/
node scripts/validate-assessment.mjs assessments/<new-file>.html   # one file
```

Exit code 0 = pass. The gate enforces, as **blocking errors**:

| Check | Rule |
|---|---|
| Inline script syntax | must parse (`vm.Script`) |
| Question schema | every question has `id`, `text`, `type`, `marks`; ids unique |
| MCQ range | `correct` is an integer within `options` |
| MCQ options | no duplicates |
| **Mark scheme vs marks** | `marks >= scheme.length` — never list more scheme points than marks available |
| **Keyword coverage** | `keywords.length >= marks` — otherwise full marks is unreachable |
| **Answer-key bias** | no single letter may win >50% of the MCQ |
| HTML balance | opening vs closing block tags must match |

Plus warnings for: no `topic` label, missing `seededShuffle()`, lopsided key, >5 MCQ options, MCQ carrying a scheme.

Only current-template files (those containing both `showMarkScheme` and `seededShuffle`) are gated. Legacy `myp4-*` files are reported but non-blocking — see §7.

Then confirm the build still ships the file:

```bash
npm run build
Test-Path dist/assessments/<new-file>.html   # must be True
```

---

## 3. Authoring an assessment

### Step 1 — Plan against the standard
Write the topic breakdown **and** the differentiation list **before** writing questions:
- Which confusable pairs will the paper test? (§1.3)
- Which command terms, and in what ramp order? (§1.1)
- What data set will students interrogate, and what is its stated limitation? (§1.2)
- Marks per question and total time. Rule of thumb: MCQ 1 mark, short 2–7, extended 8–12; roughly 1.5–2 min per mark.

### Step 2 — Copy the current template
Do not hand-roll. Copy the newest current-template file and replace the content:

```bash
Copy-Item assessments/m10-science-ess-a-part1.html assessments/<new>.html
```

Keep the shell intact: sidebar timer, question navigator, progress bar, mark scheme modal, review view, jsPDF export, localStorage save. Current template already provides: deterministic option shuffle, per-topic score breakdown, mark scheme and per-answer review.

### Step 3 — Question object schema

```javascript
// multiple choice
{
    id: 1,
    type: "mcq",              // "mcq" | "short" | "extended"
    topic: "Biodiversity",    // used by the per-topic breakdown; keep short
    marks: 1,
    text: "Stem. <em>HTML is allowed</em> for formulae and diagrams.",
    options: ["Distractor A", "Correct answer", "Distractor C", "Distractor D"],
    correct: 1,               // index into options BEFORE shuffling
    explanation: "Why the key is right, and why the strongest distractor is wrong."
}

// written response
{
    id: 12,
    type: "short",            // or "extended"
    topic: "Origin of Life",
    marks: 6,
    text: "Stem. <strong>Command term: explain.</strong>",
    hint: "Optional nudge shown after a wrong submit.",
    keywords: ["luca", "chemosynthesis", "anaerobic", "..."],  // >= marks
    scheme: [                  // one entry per mark; length <= marks
        "Identifies LUCA as the last universal common ancestor",
        "States it was anaerobic (no free O₂) — <strong>1 mark</strong>",
        // ...
    ]
}
```

**`options` and `correct` are the raw source of truth.** The template derives `q._opts` / `q._correct` via `seededShuffle`, so never hand-edit display order.

### Step 4 — Wire the scoring correctly

The auto-marker is a **self-check estimate**, not a substitute for a human marker. It must be generous enough to be useful:

```javascript
// one distinct key concept = one mark, capped at the marks available
let hits = 0;
q.keywords.forEach(kw => { if (text.includes(kw.toLowerCase())) hits++; });
return Math.min(q.marks, hits);
```

Never use proportional scoring such as `marks * (hits / q.keywords.length)` — with realistic keyword pools (30–90 terms) it makes full marks unreachable and reports a meaningless score. The UI must say the written score is an estimate against the mark scheme.

### Step 5 — Register in the React app

Data lives in **`src/data/assessments.js`** (`assessmentsData`), *not* in `Assessments.jsx`. Append an entry:

```javascript
{
    id: 17,                                  // numeric, next unused
    title: 'Topic — Part 1',
    description: 'One or two sentences, concrete topics, no marketing tone.',
    topics: ['Tag1', 'Tag2', 'Tag3', 'Tag4'],   // display chips, 3-4 max
    topicIds: ['topic-slug'],               // each MUST exist in topicsData
    questionCount: 30,                      // must match the file
    time: '90',                             // minutes as a string; 'Self-paced' for study pages
    marks: 138,                             // must match the file
    difficulty: 4,                          // integer 0-5
    href: 'assessments/<new-file>.html',    // relative, no leading slash
    category: 'myp4',                       // 'myp4' | 'myp5' | 'dp'
    badge: 'MYP4',                          // plain text, styled by badge-<category>
    icon: '🧬',
    iconBg: 'science',                      // must have a .card-icon.<name> rule
    subject: 'science'                      // 'math' | 'ins' | 'science'
}
```

Supporting edits:
- New topic → add to `topicsData` in the same file, or `/topics` renders an empty section.
- New subject → add to `subjects` in `src/pages/Assessments.jsx` and a `.card-icon.<name>` rule in `src/styles/global.css`.
- `StatsSection.jsx` derives its totals from `assessmentsData` — **do not hardcode counts anywhere.**

### Step 6 — Study page (when the brief asks for one)

Follow the newest study page as the template. It must carry: a sticky topic nav, the key-term glossary, worked examples, and **contrast tables for every confusable pair** (§1.3). Link the study page to its papers and back again so the student has one continuous path.

### Step 7 — Verify and report

Run §2, then state in your report: question/mark counts, MCQ split, the differentiation pairs covered, and anything you deliberately left as an estimate.

---

## 4. Study material standards

Beyond §1.3, study pages must:

- **Lead with the exam task**, not the textbook: say what the student must be able to *do*.
- Give **worked examples with reasoning shown**, not just final answers.
- Include the **data the papers use** (real tables/figures where possible) and label any figure that is simplified.
- End sections with **self-check questions** that discriminate the confusable pairs.
- Include a **glossary of examinable terms** — it doubles as the keyword source for the papers.
- Use the school context consistently where relevant (see §5).

---

## 5. Local context

Where a real-world anchor helps, prefer the student's own context (this is a Swedish school context):
- **Companies:** Volvo, H&M, Northvolt, Oatly, Spotify
- **Institutions:** Riksbank, Nord Pool, ICA
- **Markets:** Stockholm housing, Swedish agriculture
- **Science/evolution anchors that work well:** Baltic Sea *Gadus morhua* stock collapse, the Baltic *Ecodiscus roeseli* (Banded Diving Beetle) subspecies, Öland's alvar calcareous grasslands, the Nordic birch (*Betula pendula*) and *Fagus sylvatica* postglacial recolonisation, antibiotic resistance in *Staphylococcus aureus* and MRSA in Swedish hospitals.

Do not force a local example where a global one is the honest choice (e.g. the K-Pg impact, LUCA). A fabricated local statistic is a defect.

---

## 6. IB reference

**Individuals & Societies** (equal 25% each): A Knowing & Understanding · B Investigating · C Communicating · D Thinking Critically. Use **OPVL** (Origin, Purpose, Value, Limitation) for source analysis and **PESTEL** for contextual factors.

**Sciences**: A Knowing & Understanding · B Inquiring · C Processing & Evaluating · D Communicating. Global contexts: *Orientation in Space and Time*, *Globalization and Sustainability*, *Scientific and Technical Innovation*, *Fairness and Development*, *Identity and Relationships*, *Personal and Cultural Expression*.

---

## 7. Known legacy debt (do not gate on it, but report it if you touch the area)

`npm run validate` reports these. They are **pre-existing and out of the standard for new work**; do not silently rewrite them as part of an unrelated task, and do not let them block a new deliverable:

- 15 legacy `myp4-*` files predate the current template (no mark scheme / review / shuffle). They are reported, not gated.
- `myp4-trigonometry-assessment.html` parses but uses a different question schema entirely (no `marks`/`type`), so it reports 50 findings.
- `myp4-comprehensive.html` names its bank `quizData` rather than `questions`, so the validator cannot locate it. This is a naming mismatch, not a broken page.
- Study pages legitimately contain no quiz engine; they are skipped.
- `npm run validate` gates only current-template files. A legacy page that stops running is invisible to the gate — **verify legacy JS parses and its engine executes whenever you edit one.**

### Never "fix" a syntax error by deleting the offending line

A parse error is a *symptom*; the cause is usually content that was deleted in an earlier bad edit, leaving orphans behind. In this repo, five papers had been broken for some time and each carried **two** faults: a stray `});` with no opener, and an orphaned `');` fragment inside `startQuiz()` where `document.getElementById('start-screen').classList.add('hidden');` belonged. Deleting only the `});` did not fix them — it just exposed the second fault.

Rules that follow:

1. **Deleting a line to satisfy a parser is a defect, not a fix.** Determine whether the line is *extra* or *misplaced* before removing anything.
2. **An orphan fragment is evidence.** A lone `');`, `}` or `});` with no opener means something before it was lost. Reconstruct the missing statement from a working sibling file in the same directory and confirm the target element actually exists, rather than deleting the fragment.
3. **Parse is not proof.** After any repair, confirm the page's engine actually runs — extract the last inline `<script>`, compile it, then invoke the entry point (`startQuiz()`) against a stubbed DOM and check the question bank loads. `myp4-comprehensive.html` is the reference shape.
4. **A gate that reports false positives is worse than no gate.** `validate-assessment.mjs` used to count tags inside JS template literals and cried wolf about `myp4-comprehensive.html`. It now blanks `<script>`/`<style>` before counting. Fix the gate when the finding is wrong; do not leave a misleading warning in place.

---

## 8. Commands

```powershell
npm install
npm run dev        # http://localhost:5173
npm run build      # vite build + copies assessments/ -> dist/assessments/
npm run preview
npm run validate   # assessment quality gate
```

Never use `git push --force` on `main`; this repo deploys to production from `main`. Commit and push only when explicitly asked.

## 9. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Assessment 404 in local preview | `npm run build` did not copy it; confirm `dist/assessments/<file>.html` exists. `build` uses `scripts/copy-assets.mjs` (cross-platform — do not reintroduce `cp`). |
| Card shows `0 Questions • Self-paced mins` | Expected for study pages (`questionCount: 0`, `time: 'Self-paced'`). |
| `/topics` section is empty | `topicIds` references a slug missing from `topicsData`. |
| Subject filter hides a card | `subject` value has no matching entry in `subjects` in `Assessments.jsx`. |
| Written score always low | `keywords.length < marks`, or you reinstated proportional scoring. See §3 step 4. |
| Total marks disagree with the paper | Registry `marks`/`questionCount` drifted from the file; re-check both against `npm run validate` output. |
| PDF empty | jsPDF CDN blocked; the assessment still works without export. |

## 10. Related files

- `AGENTS.md` — architecture, inventory, deployment (source of truth for repo structure)
- `README.md` — public-facing project documentation
- `MIGRATION_GUIDE.md` — historical record of the vanilla→React migration
- `scripts/validate-assessment.mjs` — the quality gate
- `scripts/copy-assets.mjs` — build-time asset copy
- `src/data/assessments.js` — assessment + topic registry
- `assessments/content/` — original source notes (`.docx`, `.txt`)
