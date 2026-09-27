/**
 * Assessment quality gate.
 *
 * Enforces the content standards in .opencode/skills/ib-myp-assessment/SKILL.md
 * as executable checks, so "high IB standard" is verifiable rather than aspirational.
 *
 *   node scripts/validate-assessment.mjs                 # validate every assessment
 *   node scripts/validate-assessment.mjs path/to.html    # validate one file
 *
 * Exit code 0 = all checks passed, 1 = one or more failures.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';

const ASSESSMENTS_DIR = 'assessments';
const BIAS_THRESHOLD = 0.5; // a single letter may not beat this share of MCQs

// A file is "current" only if it carries the full current-template feature set.
// Older myp4-* assessments predate the mark-scheme/review UI and are reported
// separately so the gate stays meaningful for new work.
const CURRENT_TEMPLATE_MARKERS = ['showMarkScheme', 'seededShuffle'];

/* ------------------------------------------------------------------ utils */

const blocking = { errors: [], warnings: [] };
const legacy = new Map(); // file -> finding[]
const study = [];

const err = (file, msg) => blocking.errors.push(`${file}: ${msg}`);
const warn = (file, msg) => blocking.warnings.push(`${file}: ${msg}`);
const note = (file, msg) => {
    if (!legacy.has(file)) legacy.set(file, []);
    legacy.get(file).push(msg);
};

/** Bracket-match the questions array out of an inline <script> without executing it. */
function extractQuestionsLiteral(js) {
    const start = js.search(/const\s+questions\s*=\s*\[/);
    if (start < 0) return null;
    const open = js.indexOf('[', start);
    let depth = 0;
    let inStr = null;
    let esc = false;
    for (let i = open; i < js.length; i++) {
        const c = js[i];
        if (esc) { esc = false; continue; }
        if (c === '\\') { esc = true; continue; }
        if (inStr) { if (c === inStr) inStr = null; continue; }
        if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
        if (c === '/' && js[i + 1] === '/') { const e = js.indexOf('\n', i); i = e < 0 ? js.length : e; continue; }
        if (c === '[') depth++;
        else if (c === ']') { depth--; if (depth === 0) return js.slice(open, i + 1); }
    }
    return null;
}

/** Cheap non-negative integer check that tolerates string numbers. */
const isCount = (v) => Number.isInteger(Number(v)) && Number(v) >= 0;

function seededShuffle(arr, seed) {
    const a = arr.slice();
    let s = seed;
    for (let i = a.length - 1; i > 0; i--) {
        s = (s * 9301 + 49297) % 233280;
        const j = Math.floor((s / 233280) * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/** Count opening vs closing tags for the block elements we actually emit. */
/**
 * Count opening vs closing tags for the block elements we actually emit.
 * <script> and <style> contents are blanked first: a tag inside a JS template
 * literal (e.g. PDF markup) is not document structure and would be a false positive.
 */
function checkHtmlBalance(file, html, report) {
    const markup = html
        .replace(/<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi, m => m.replace(/[\s\S]/g, ' '))
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, m => m.replace(/[\s\S]/g, ' '));
    const block = 'div|section|table|thead|tbody|tr|td|th|ol|ul|li|p|span|button|textarea|nav|header|footer|main|aside|pre|details|summary|figure|figcaption|dl|dt|dd|form|label|select|option|svg|g|text|tspan|defs|clipPath|linearGradient|stop|path|rect|circle|ellipse|line|polyline|polygon|use|symbol';
    const open = (markup.match(new RegExp(`<(?:${block})\\b`, 'gi')) || []).length;
    const close = (markup.match(new RegExp(`</(?:${block})>`, 'gi')) || []).length;
    if (open !== close) report(file, `unbalanced block tags in markup: ${open} open vs ${close} close`);
    return open === close;
}

/* ------------------------------------------------------------- per-question */

function validateQuestion(file, q, index, seenIds, sink) {
    const { err: E, warn: W } = sink;
    const tag = `Q${q.id ?? '(no id)'}`;

    if (q.id === undefined) E(file, `${tag} (index ${index}) is missing an id`);
    else if (seenIds.has(q.id)) E(file, `${tag} has a duplicate id`);
    else seenIds.add(q.id);

    if (typeof q.text !== 'string' || q.text.trim().length < 10) E(file, `${tag} has no usable question text`);
    if (!isCount(q.marks) || Number(q.marks) === 0) E(file, `${tag} has invalid marks (${q.marks})`);
    if (typeof q.topic !== 'string' || !q.topic.trim()) W(file, `${tag} has no topic label (per-topic breakdown will be empty)`);

    if (q.type === 'mcq') {
        if (!Array.isArray(q.options) || q.options.length < 2) { E(file, `${tag} mcq needs an options array`); return; }
        if (q.options.length > 5) W(file, `${tag} mcq has ${q.options.length} options (>5 slows candidates down)`);
        if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) {
            E(file, `${tag} correct index ${q.correct} out of range 0..${q.options.length - 1}`);
        }
        const dupes = q.options.filter((o, i) => q.options.indexOf(o) !== i);
        if (dupes.length) E(file, `${tag} has duplicate options: ${[...new Set(dupes)].join(', ')}`);
        if (q.scheme && q.scheme.length) W(file, `${tag} is mcq but also carries a mark scheme`);
    } else if (q.type === 'short' || q.type === 'extended' || q.type === 'essay') {
        if (!Array.isArray(q.scheme) || q.scheme.length === 0) {
            E(file, `${tag} written question has no mark scheme — students cannot see how marks are awarded`);
        } else if (Number(q.marks) < q.scheme.length) {
            E(file, `${tag} awards ${q.marks} mark(s) but lists ${q.scheme.length} scheme points — merge points or raise marks`);
        }
        if (!Array.isArray(q.keywords) || q.keywords.length === 0) {
            E(file, `${tag} written question has no keywords array — auto-marking will award 0 for any answer`);
        } else if (q.keywords.length < Number(q.marks)) {
            E(file, `${tag} cannot award full marks: ${q.keywords.length} keywords < ${q.marks} marks`);
        }
    } else {
        E(file, `${tag} has unknown type "${q.type}"`);
    }
}

/* ---------------------------------------------------------------- per-file */

function validateFile(path) {
    const file = path.split(/[\\/]/).pop();
    const html = readFileSync(path, 'utf8');
    const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    const js = scripts.length ? scripts[scripts.length - 1] : '';

    const isCurrent = CURRENT_TEMPLATE_MARKERS.every((m) => js.includes(m));
    const sink = isCurrent ? { err, warn } : { err: note, warn: note };

    // Study pages legitimately have no quiz engine.
    if (!scripts.length && !/const\s+questions\s*=/.test(html)) {
        study.push(file);
        return { status: 'study' };
    }
    if (!js) { sink.err(file, 'no inline <script> found'); return { status: isCurrent ? 'current' : 'legacy' }; }

    checkHtmlBalance(file, html, sink.err);

    try {
        new vm.Script(js, { filename: file });
    } catch (e) {
        sink.err(file, `inline script has a syntax error: ${e.message}`);
        return { status: isCurrent ? 'current' : 'legacy' };
    }

    const literal = extractQuestionsLiteral(js);
    if (!literal) { sink.err(file, 'could not locate a `const questions = [...]` array'); return { status: isCurrent ? 'current' : 'legacy' }; }

    let questions;
    try {
        questions = new vm.Script(`(${literal})`).runInNewContext({});
    } catch (e) {
        sink.err(file, `questions array did not evaluate: ${e.message}`);
        return { status: isCurrent ? 'current' : 'legacy' };
    }
    if (!Array.isArray(questions) || !questions.length) { sink.err(file, 'questions array is empty'); return { status: isCurrent ? 'current' : 'legacy' }; }

    const seenIds = new Set();
    questions.forEach((q, i) => validateQuestion(file, q, i, seenIds, sink));

    // Answer-position bias across the paper.
    const mcq = questions.filter((q) => q.type === 'mcq');
    const spread = {};
    const shuffles = /function\s+seededShuffle/.test(js);
    mcq.forEach((q) => {
        if (!Array.isArray(q.options) || !Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length) return;
        const opts = shuffles ? seededShuffle(q.options, q.id * 97 + 41) : q.options;
        const key = shuffles ? opts.indexOf(q.options[q.correct]) : q.correct;
        spread[key] = (spread[key] || 0) + 1;
    });
    if (mcq.length) {
        const worst = Math.max(...Object.values(spread));
        const share = worst / mcq.length;
        const detail = Object.entries(spread).map(([k, v]) => `${'ABCD'[k]}:${v}`).join(' ');
        if (share > BIAS_THRESHOLD) {
            sink.err(file, `answer key is guessable: best single letter wins ${worst}/${mcq.length} (${Math.round(share * 100)}% > ${BIAS_THRESHOLD * 100}%) — spread: ${detail}`);
        } else if (!shuffles) {
            sink.warn(file, `no seededShuffle() found; answer key is fixed (spread: ${detail})`);
        } else if (share > 0.4) {
            sink.warn(file, `answer key is still lopsided (spread: ${detail})`);
        } else {
            console.log(`  ${file}: mcq spread [${detail}] — best guess ${Math.round(share * 100)}%`);
        }
    }

    const totalMarks = questions.reduce((s, q) => s + (Number(q.marks) || 0), 0);
    const summary = `${questions.length} questions (${mcq.length} mcq), ${totalMarks} marks`;

    if (isCurrent) {
        console.log(`  ${file}: ${summary} [current template]`);
    } else {
        console.log(`  ${file}: ${summary} [legacy template — not gated]`);
    }
    return { status: isCurrent ? 'current' : 'legacy', summary };
}

/* -------------------------------------------------------------------- main */

const args = process.argv.slice(2);
const targets = args.length
    ? args
    : readdirSync(ASSESSMENTS_DIR)
        .filter((f) => f.endsWith('.html') && f !== 'original_index.html')
        .map((f) => join(ASSESSMENTS_DIR, f));

console.log(`Validating ${targets.length} file(s) in ${ASSESSMENTS_DIR}/\n`);

let current = 0;
for (const t of targets) {
    try {
        const r = validateFile(t);
        if (r.status === 'current') current++;
    } catch (e) {
        err(t, `could not read/parse: ${e.message}`);
    }
}

if (blocking.warnings.length) {
    console.log(`\n${blocking.warnings.length} warning(s) on current-template files:`);
    blocking.warnings.forEach((w) => console.log(`  ! ${w}`));
}

if (legacy.size) {
    const total = [...legacy.values()].reduce((s, v) => s + v.length, 0);
    console.log(`\nPRE-EXISTING (legacy template, not gated) — ${total} finding(s) in ${legacy.size} file(s):`);
    for (const [file, items] of legacy) {
        console.log(`  - ${file}: ${items.length} finding(s)`);
        items.slice(0, 3).forEach((i) => console.log(`      ${i.replace(`${file}: `, '')}`));
        if (items.length > 3) console.log(`      ...and ${items.length - 3} more`);
    }
}

if (study.length) {
    console.log(`\nStudy pages (no quiz engine, skipped): ${study.join(', ')}`);
}

if (blocking.errors.length) {
    console.log(`\n${blocking.errors.length} BLOCKING error(s):`);
    blocking.errors.forEach((e) => console.log(`  x ${e}`));
    console.log(`\nFAILED: ${blocking.errors.length} error(s) on ${current} current-template file(s)`);
    process.exit(1);
}

console.log(`\nPASSED: ${current} current-template file(s) meet the quality gate.`);
if (legacy.size) console.log(`${legacy.size} legacy file(s) still carry pre-existing issues (see above).`);
