const state = {
  markdown: '',
  questions: [],
  flashIndex: 0,
  quizIndex: 0,
  known: new Set(),
  mode: 'content',
};

const elements = {
  contentView: document.getElementById('contentView'),
  toc: document.getElementById('toc'),
  stats: document.getElementById('stats'),
  searchInput: document.getElementById('searchInput'),
  themeToggle: document.getElementById('themeToggle'),
  flashcardsView: document.getElementById('flashcardsView'),
  quizView: document.getElementById('quizView'),
  contentModeButtons: document.querySelectorAll('[data-mode]'),
  flashcardPrompt: document.getElementById('flashcardPrompt'),
  flashcardAnswer: document.getElementById('flashcardAnswer'),
  flipCard: document.getElementById('flipCard'),
  prevCard: document.getElementById('prevCard'),
  nextCard: document.getElementById('nextCard'),
  markKnown: document.getElementById('markKnown'),
  quizQuestion: document.getElementById('quizQuestion'),
  quizAnswerInput: document.getElementById('quizAnswerInput'),
  showExpected: document.getElementById('showExpected'),
  nextQuiz: document.getElementById('nextQuiz'),
  quizExpected: document.getElementById('quizExpected'),
  statTemplate: document.getElementById('statTemplate'),
};

init();

async function init() {
  const response = await fetch('interview_prep_system.md');
  state.markdown = await response.text();

  renderContent(state.markdown);
  state.questions = extractQuestions(state.markdown);
  renderStats();
  renderFlashcard();
  renderQuiz();
  wireEvents();
}

function renderContent(markdown) {
  const { html, headings } = markdownToHtml(markdown);
  elements.contentView.innerHTML = html;
  elements.toc.innerHTML = headings
    .map((h) => `<a href="#${h.id}">${'• '.repeat(Math.max(h.level - 2, 0))}${escapeHtml(h.text)}</a>`)
    .join('');
}

function markdownToHtml(md) {
  const lines = md.split('\n');
  const html = [];
  const headings = [];
  let inList = false;

  lines.forEach((raw) => {
    const line = raw.trimEnd();

    if (!line.trim()) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      return;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugify(text);
      headings.push({ level, text, id });
      html.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      return;
    }

    if (/^---+$/.test(line)) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      html.push('<hr/>');
      return;
    }

    if (line.startsWith('> ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      html.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`);
      return;
    }

    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(listMatch[1])}</li>`);
      return;
    }

    const numberedMatch = line.match(/^\d+\)\s+(.*)$/);
    if (numberedMatch) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      html.push(`<h4>${inlineMarkdown(numberedMatch[1])}</h4>`);
      return;
    }

    if (inList) {
      html.push('</ul>');
      inList = false;
    }
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  });

  if (inList) html.push('</ul>');
  return { html: html.join('\n'), headings };
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function extractQuestions(md) {
  const blocks = md.split(/\n(?=\d+\)\s+\*\*)/g);
  return blocks
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim());
      const questionLine = lines.find((l) => /^\d+\)\s+\*\*/.test(l));
      if (!questionLine) return null;
      const question = questionLine.replace(/^\d+\)\s+\*\*|\*\*$/g, '');
      const difficulty = (lines.find((l) => l.startsWith('- **Difficulty:**')) || '').replace('- **Difficulty:**', '').trim();
      const answerStart = lines.indexOf('- **Answer:**');
      const answer = answerStart >= 0
        ? lines.slice(answerStart + 1).filter((l) => l.startsWith('-') && !l.startsWith('- **Follow-up')).map((l) => l.replace(/^-\s*/, ''))
        : [];
      const followUpLine = lines.find((l) => l.startsWith('- **Follow-up:**') || l.startsWith('- **Follow-up(s)**')) || '';
      return { question, difficulty, answer, followUp: followUpLine.replace(/- \*\*Follow-up\(s\)?\*\*:?\s*/i, '') };
    })
    .filter(Boolean);
}

function renderStats() {
  const headingsCount = (state.markdown.match(/^##\s+/gm) || []).length;
  const data = [
    { label: 'Questions', value: state.questions.length },
    { label: 'Topics', value: headingsCount },
    { label: 'Known', value: state.known.size },
    { label: 'Progress', value: `${Math.round((state.known.size / Math.max(state.questions.length, 1)) * 100)}%` },
  ];

  elements.stats.innerHTML = '';
  data.forEach((item) => {
    const node = elements.statTemplate.content.cloneNode(true);
    node.querySelector('.label').textContent = item.label;
    node.querySelector('.value').textContent = item.value;
    elements.stats.appendChild(node);
  });
}

function renderFlashcard() {
  const item = state.questions[state.flashIndex];
  if (!item) {
    elements.flashcardPrompt.textContent = 'No questions parsed.';
    return;
  }
  elements.flashcardPrompt.innerHTML = `<strong>${item.question}</strong><br/><small>${item.difficulty || 'Unspecified'}</small>`;
  elements.flashcardAnswer.innerHTML = `
    <ul>${item.answer.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}</ul>
    <p><strong>Follow-up:</strong> ${escapeHtml(item.followUp || 'N/A')}</p>
    ${state.known.has(item.question) ? '<p class="known">✓ Marked known</p>' : ''}
  `;
  elements.flashcardAnswer.classList.add('hidden');
}

function renderQuiz() {
  const item = state.questions[state.quizIndex];
  if (!item) {
    elements.quizQuestion.textContent = 'No quiz questions available.';
    return;
  }
  elements.quizQuestion.innerHTML = `<strong>${item.question}</strong> <small>(${item.difficulty || 'Unspecified'})</small>`;
  elements.quizAnswerInput.value = '';
  elements.quizExpected.innerHTML = `<ul>${item.answer.map((a) => `<li>${escapeHtml(a)}</li>`).join('')}</ul>`;
  elements.quizExpected.classList.add('hidden');
}

function wireEvents() {
  elements.themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    elements.themeToggle.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  });

  elements.contentModeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.mode = btn.dataset.mode;
      elements.contentModeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      elements.contentView.classList.toggle('hidden', state.mode !== 'content');
      elements.flashcardsView.classList.toggle('hidden', state.mode !== 'flashcards');
      elements.quizView.classList.toggle('hidden', state.mode !== 'quiz');
    });
  });

  elements.searchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    const sections = [...elements.contentView.querySelectorAll('h1,h2,h3,h4,p,li,blockquote')];
    sections.forEach((el) => {
      const visible = !term || el.textContent.toLowerCase().includes(term);
      el.style.display = visible ? '' : 'none';
    });
  });

  elements.flipCard.addEventListener('click', () => {
    elements.flashcardAnswer.classList.toggle('hidden');
  });

  elements.nextCard.addEventListener('click', () => {
    state.flashIndex = (state.flashIndex + 1) % state.questions.length;
    renderFlashcard();
  });

  elements.prevCard.addEventListener('click', () => {
    state.flashIndex = (state.flashIndex - 1 + state.questions.length) % state.questions.length;
    renderFlashcard();
  });

  elements.markKnown.addEventListener('click', () => {
    const item = state.questions[state.flashIndex];
    if (!item) return;
    if (state.known.has(item.question)) {
      state.known.delete(item.question);
    } else {
      state.known.add(item.question);
    }
    renderFlashcard();
    renderStats();
  });

  elements.showExpected.addEventListener('click', () => {
    elements.quizExpected.classList.remove('hidden');
  });

  elements.nextQuiz.addEventListener('click', () => {
    state.quizIndex = (state.quizIndex + 1) % state.questions.length;
    renderQuiz();
  });
}
