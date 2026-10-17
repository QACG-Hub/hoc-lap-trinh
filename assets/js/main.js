/* ============================================================
   HỌCLAPTRINH.EXE — main.js
   Sidebar • Tiến độ • Copy code • Bộ chấm code tĩnh • Quiz random
   ============================================================ */
"use strict";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const BASE = document.documentElement.dataset.base || ".";

/* ---------- Tiện ích chung ---------- */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lsGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function lsSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* bỏ qua */ } }

/* ---------- Dark / Light theme ---------- */
(function initTheme() {
  const KEY = "hlp-theme";
  const root = document.documentElement;
  const btn = $("#theme-toggle");
  const apply = (t) => {
    root.setAttribute("data-theme", t);
    if (btn) {
      btn.textContent = t === "light" ? "☾" : "☀";
      btn.title = t === "light" ? "Chuyển giao diện tối (cyberpunk)" : "Chuyển giao diện sáng";
    }
  };
  apply(lsGet(KEY) === "light" ? "light" : "dark");
  if (btn) {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      lsSet(KEY, next);
      apply(next);
    });
  }
})();

/* ---------- Tiến độ học ---------- */
const PROG_KEY = "hlp-progress";
const SCORE_KEY = "hlp-scores";

function getProgress() {
  try { return JSON.parse(lsGet(PROG_KEY)) || {}; } catch (e) { return {}; }
}
function isDone(id) { return !!getProgress()[id]; }
function setDone(id, done) {
  const p = getProgress();
  if (done) p[id] = Date.now(); else delete p[id];
  lsSet(PROG_KEY, JSON.stringify(p));
}
function getScores() {
  try { return JSON.parse(lsGet(SCORE_KEY)) || {}; } catch (e) { return {}; }
}
function saveScore(key, best, total) {
  const s = getScores();
  s[key] = { best, total };
  lsSet(SCORE_KEY, JSON.stringify(s));
}

/* ---------- Dữ liệu lộ trình ---------- */
function getCourse(id) { return COURSES.find((c) => c.id === id); }
function allLessons(course) { return course.chapters.flatMap((ch) => ch.lessons); }
function readyLessons(course) { return allLessons(course).filter((l) => l.file); }
function courseProgress(course) {
  const ready = readyLessons(course);
  const p = getProgress();
  const done = ready.filter((l) => p[l.id]).length;
  return { done, total: ready.length, all: allLessons(course).length, percent: ready.length ? Math.round((done / ready.length) * 100) : 0 };
}
function lessonHref(courseId, lesson) { return `${BASE}/${courseId}/${lesson.file}`; }

/* ---------- Trang chủ: thanh tiến độ 2 card ---------- */
function initHomeProgress() {
  $$("[data-progress]").forEach((bar) => {
    const course = getCourse(bar.dataset.progress);
    if (!course) return;
    const pr = courseProgress(course);
    bar.style.width = pr.percent + "%";
    const text = $(`[data-progress-text="${course.id}"]`);
    if (text) text.textContent = `${pr.done}/${pr.total} bài đã học (${pr.percent}%)`;
    const count = $(`[data-count="${course.id}"]`);
    if (count) count.textContent = `${pr.total}/${pr.all} BÀI ĐÃ PHÁT HÀNH`;
  });
}

/* ---------- Trang lộ trình: render chương + bài ---------- */
function lessonItemHtml(course, lesson, currentId) {
  const done = isDone(lesson.id);
  if (!lesson.file) {
    return `<div class="lesson-item soon">
      <span class="lesson-check">🔒</span>
      <span class="lesson-name">${escapeHtml(lesson.title)}</span>
      <span class="lesson-tag">SẮP RA MẮT</span>
    </div>`;
  }
  const current = lesson.id === currentId ? " current" : "";
  return `<a class="lesson-item${done ? " done" : ""}${current}" href="${lessonHref(course.id, lesson)}">
    <span class="lesson-check">${done ? "✔" : "▸"}</span>
    <span class="lesson-name">${escapeHtml(lesson.title)}</span>
    <span class="lesson-tag">${done ? "ĐÃ HỌC" : "SẴN SÀNG"}</span>
  </a>`;
}

function renderCoursePage(courseId) {
  const wrap = $("#course-chapters");
  if (!wrap) return;
  const course = getCourse(courseId);
  if (!course) return;

  let html = "";
  course.chapters.forEach((ch) => {
    html += `<section class="chapter"><h2 class="chapter-title">${escapeHtml(ch.title)}</h2><div class="lesson-list">`;
    ch.lessons.forEach((l) => { html += lessonItemHtml(course, l, null); });
    html += `</div></section>`;
  });
  wrap.innerHTML = html;

  const box = $("#course-progress");
  if (box) {
    const pr = courseProgress(course);
    box.innerHTML = `<div class="hud">
      <div class="pbar"><div class="pbar-fill" style="width:${pr.percent}%"></div></div>
      <span class="hud-text">${pr.done}/${pr.total} bài đã học • ${pr.percent}% — lộ trình có ${pr.all} bài</span>
    </div>`;
  }
}

/* ---------- Trang bài học: sidebar + trước/sau + nút hoàn thành ---------- */
function renderSidebar(courseId, lessonId) {
  const wrap = $("#lesson-sidebar");
  if (!wrap) return;
  const course = getCourse(courseId);
  if (!course) return;

  let inner = `<span class="sidebar-title">▤ LỘ TRÌNH ${course.name.toUpperCase()}</span>`;
  course.chapters.forEach((ch) => {
    inner += `<div class="chapter-title">${escapeHtml(ch.title)}</div><div class="lesson-list">`;
    ch.lessons.forEach((l) => { inner += lessonItemHtml(course, l, lessonId); });
    inner += `</div>`;
  });
  wrap.innerHTML = inner;
}

function renderLessonNav(courseId, lessonId) {
  const nav = $("#lesson-nav");
  if (!nav) return;
  const course = getCourse(courseId);
  const ready = readyLessons(course);
  const idx = ready.findIndex((l) => l.id === lessonId);

  const prev = idx > 0 ? ready[idx - 1] : null;
  const next = idx >= 0 && idx < ready.length - 1 ? ready[idx + 1] : null;
  const isLast = idx === ready.length - 1;

  let html = "";
  html += prev
    ? `<a class="btn btn-ghost" href="${lessonHref(courseId, prev)}">◂ ${escapeHtml(prev.title)}</a>`
    : `<a class="btn btn-ghost disabled" href="#">◂ Bài trước</a>`;
  html += next
    ? `<a class="btn btn-cyan" href="${lessonHref(courseId, next)}">${escapeHtml(next.title)} ▸</a>`
    : `<span class="btn btn-ghost disabled">${isLast ? "Đã hết chặng đã phát hành — bài mới sắp ra mắt ✓" : "Bài sau ▸"}</span>`;
  nav.innerHTML = html;
}

function initLessonPage() {
  const body = document.body;
  const courseId = body.dataset.course;
  const lessonId = body.dataset.lesson;
  if (!courseId || !lessonId) return;

  renderSidebar(courseId, lessonId);
  renderLessonNav(courseId, lessonId);

  const toggle = $("#sidebar-toggle");
  const sidebar = $("#lesson-sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", () => sidebar.classList.toggle("open"));
  }

  const btn = $("#mark-done");
  if (btn) {
    const sync = () => {
      const d = isDone(lessonId);
      btn.classList.toggle("is-done", d);
      btn.textContent = d ? "[ ✔ ĐÃ HOÀN THÀNH ]" : "[ HOÀN THÀNH NHIỆM VỤ ]";
    };
    btn.addEventListener("click", () => {
      const sidebarWasOpen = $("#lesson-sidebar") && $("#lesson-sidebar").classList.contains("open");
      setDone(lessonId, !isDone(lessonId));
      sync();
      renderSidebar(courseId, lessonId);
      if (sidebarWasOpen) $("#lesson-sidebar").classList.add("open");
    });
    sync();
  }
}

/* ---------- Nút copy code ---------- */
function initCopyButtons() {
  $$(".terminal").forEach((term) => {
    const code = term.querySelector("pre code") || term.querySelector("pre");
    const bar = term.querySelector(".terminal-bar");
    if (!code || !bar) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "COPY";

    btn.addEventListener("click", async () => {
      const text = code.textContent;
      const done = () => {
        btn.textContent = "ĐÃ COPY ✓";
        btn.classList.add("copied");
        setTimeout(() => { btn.textContent = "COPY"; btn.classList.remove("copied"); }, 1600);
      };
      try {
        await navigator.clipboard.writeText(text);
        done();
      } catch (e) {
        try {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
          done();
        } catch (e2) {
          btn.textContent = "LỖI ✗";
          setTimeout(() => { btn.textContent = "COPY"; }, 1600);
        }
      }
    });
    bar.appendChild(btn);
  });
}

/* ---------- Bộ chấm code tĩnh ---------- */
function initExercises() {
  $$(".exercise-box[data-ex]").forEach((box) => {
    const id = box.dataset.ex;
    const ex = EXERCISES[id];
    if (!ex) return;

    box.innerHTML = `
      <div class="ex-head">✍️ TỰ VIẾT CODE <span class="ex-id">#${escapeHtml(id)}</span></div>
      <p class="ex-prompt">${escapeHtml(ex.prompt)}</p>
      <textarea class="ex-input" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="// Gõ code của bạn ở đây..."></textarea>
      <div class="ex-actions">
        <button type="button" class="btn btn-cyan ex-check">[ KIỂM TRA ]</button>
        <button type="button" class="btn btn-ghost ex-hint">[ GỢI Ý 💡 ]</button>
        <button type="button" class="btn btn-ghost ex-answer">[ XEM ĐÁP ÁN ]</button>
      </div>
      <div class="ex-hints"></div>
      <div class="ex-results"></div>`;

    const ta = $(".ex-input", box);
    const results = $(".ex-results", box);
    const hintsBox = $(".ex-hints", box);
    const hintBtn = $(".ex-hint", box);
    const answerBtn = $(".ex-answer", box);

    let lastFailed = null;
    let hintsShown = 0;
    let sampleEl = null;

    /* Tab = 4 dấu cách (cần cho thụt lề Python) */
    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = ta.selectionStart;
        const en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + "    " + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 4;
      }
    });

    function runChecks() {
      const code = ta.value;
      return ex.checks.map((chk) => {
        let ok = false;
        try {
          const re = new RegExp(chk.regex, "gs");
          const m = code.match(re);
          ok = (m ? m.length : 0) >= (chk.minCount || 1);
        } catch (e) { ok = false; }
        return { ok, desc: chk.desc, hint: chk.hint };
      });
    }

    function doCheck() {
      const res = runChecks();
      const all = res.every((r) => r.ok);
      lastFailed = res.filter((r) => !r.ok);

      let html = `<ul class="check-list">`;
      res.forEach((r) => { html += `<li class="${r.ok ? "pass" : "fail"}">${escapeHtml(r.desc)}</li>`; });
      html += `</ul>`;
      html += all
        ? `<div class="ex-success">✅ CHÍNH XÁC! Code đạt đủ ${res.length} tiêu chí. Tiếp tục phát huy! ⚡</div>`
        : `<div class="ex-failmsg">Chưa đạt — đọc kỹ tiêu chí còn dấu ✘ rồi sửa lại nhé. Bí quá thì bấm [ GỢI Ý 💡 ].</div>`;
      results.innerHTML = html;

      box.classList.toggle("passed", all);
      hintsShown = 0;
      hintsBox.innerHTML = "";
      return all;
    }

    $(".ex-check", box).addEventListener("click", doCheck);

    hintBtn.addEventListener("click", () => {
      if (lastFailed === null || lastFailed.length === 0 && ta.value === "") doCheck();
      const failed = lastFailed || [];
      if (!failed.length) {
        if (ta.value.trim()) { hintsBox.innerHTML = `<div class="hint-item">✔ Mọi tiêu chí đều đạt — không cần gợi ý nữa!</div>`; }
        else { hintsBox.innerHTML = `<div class="hint-item">Hãy viết thử vài dòng code rồi bấm KIỂM TRA trước nhé!</div>`; }
        return;
      }
      if (hintsShown < failed.length) {
        const h = failed[hintsShown];
        hintsBox.innerHTML += `<div class="hint-item">💡 ${escapeHtml(h.hint || "Xem lại tiêu chí chưa đạt.")}</div>`;
        hintsShown++;
        if (hintsShown === failed.length) {
          hintsBox.innerHTML += `<div class="hint-item">Hết gợi ý rồi — thử [ XEM ĐÁP ÁN ] nếu vẫn bí nhé!</div>`;
        }
      } else {
        hintsBox.innerHTML += `<div class="hint-item">Hết gợi ý rồi — thử [ XEM ĐÁP ÁN ] nếu vẫn bí nhé!</div>`;
      }
    });

    answerBtn.addEventListener("click", () => {
      if (sampleEl) {
        sampleEl.remove();
        sampleEl = null;
        answerBtn.textContent = "[ XEM ĐÁP ÁN ]";
        return;
      }
      sampleEl = document.createElement("pre");
      sampleEl.className = "ex-sample";
      sampleEl.textContent = ex.sample;
      results.appendChild(sampleEl);
      answerBtn.textContent = "[ ẨN ĐÁP ÁN ]";
    });
  });
}

/* ---------- Quiz random ---------- */
function normalizeAns(s) {
  return String(s).trim().replace(/\s+/g, " ").toLowerCase();
}

function checkAnswer(q, val) {
  if (q.type === "fill") {
    const accepted = Array.isArray(q.answer) ? q.answer : [q.answer];
    return accepted.some((a) => normalizeAns(a) === normalizeAns(val));
  }
  return String(q.answer) === String(val);
}

function initQuizzes() {
  $$(".quiz-console[data-lesson]").forEach((box) => {
    const lessonId = box.dataset.lesson;
    const body = $(".quiz-body", box);
    if (!body) return;

    let pool = (QUIZZES[lessonId] || []).slice();
    if (box.dataset.topic) pool = pool.filter((q) => q.topic === box.dataset.topic);

    const count = Math.min(parseInt(box.dataset.count || "2", 10), pool.length);
    const isFinal = box.dataset.final === "true";

    if (!pool.length) {
      body.innerHTML = `<p class="quiz-empty">Ngân hàng câu hỏi cho phần này đang được cập nhật!</p>`;
      return;
    }

    let quiz = [];
    let qi = 0;
    let correct = 0;
    let answered = false;

    function start() {
      quiz = shuffle(pool).slice(0, count);
      qi = 0;
      correct = 0;
      render();
    }

    function render() {
      if (qi >= quiz.length) return showScore();
      const q = quiz[qi];
      answered = false;
      const opts = q.options ? shuffle(q.options) : null;

      body.innerHTML = `
        <div class="quiz-top">
          <span class="quiz-count">CÂU ${qi + 1}/${quiz.length}</span>
          <span class="quiz-topic">${escapeHtml(q.topic || "")}</span>
        </div>
        <div class="quiz-progress">${"▰".repeat(qi)}${"▱".repeat(quiz.length - qi)}</div>
        ${q.code ? `<pre class="quiz-code">${escapeHtml(q.code)}</pre>` : ""}
        <p class="quiz-q">${escapeHtml(q.question)}</p>
        <div class="quiz-options"></div>
        <div class="quiz-feedback"></div>`;

      const optsBox = $(".quiz-options", body);

      if (opts) {
        opts.forEach((o) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "quiz-opt";
          b.textContent = o;
          b.addEventListener("click", () => pick(o, b));
          optsBox.appendChild(b);
        });
      } else {
        optsBox.innerHTML = `<div class="quiz-fill">
          <input class="quiz-input" placeholder="Gõ đáp án rồi nhấn Enter..." autocomplete="off" spellcheck="false">
          <button type="button" class="btn btn-cyan quiz-submit">TRẢ LỜI</button>
        </div>`;
        const input = $(".quiz-input", optsBox);
        const submit = () => pick(input.value, null);
        $(".quiz-submit", optsBox).addEventListener("click", submit);
        input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
        input.focus();
      }
    }

    function pick(val, btn) {
      if (answered) return;
      answered = true;
      const q = quiz[qi];
      const ok = checkAnswer(q, val);
      if (ok) correct++;

      if (btn) {
        $$(".quiz-opt", body).forEach((b) => {
          b.disabled = true;
          if (b === btn) b.classList.add(ok ? "correct" : "wrong");
          if (!ok && b.textContent === String(q.answer)) b.classList.add("correct");
        });
      }

      const fb = $(".quiz-feedback", body);
      const answerText = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      fb.innerHTML = `
        <div class="fb ${ok ? "fb-ok" : "fb-bad"}">
          ${ok ? "✔ CHÍNH XÁC!" : "✘ CHƯA ĐÚNG"} — đáp án đúng: <code>${escapeHtml(answerText)}</code>
          ${q.explain ? `<p class="fb-explain">${escapeHtml(q.explain)}</p>` : ""}
        </div>
        <button type="button" class="btn btn-magenta quiz-next">${qi + 1 < quiz.length ? "CÂU TIẾP ▸" : "XEM KẾT QUẢ ▸"}</button>`;
      $(".quiz-next", fb).addEventListener("click", () => { qi++; render(); });
    }

    function showScore() {
      const total = quiz.length;
      const pct = total ? Math.round((correct / total) * 100) : 0;
      let extra = "";

      if (isFinal) {
        const key = lessonId + ":final";
        const prev = getScores()[key];
        if (!prev || correct > prev.best || (correct === prev.best && total > prev.total)) {
          saveScore(key, correct, total);
          extra = `<div class="quiz-record">🏆 KỶ LỤC MỚI: ${correct}/${total} câu chính xác!</div>`;
        } else {
          extra = `<div class="quiz-best">Kỷ lục của bạn: ${prev.best}/${prev.total}</div>`;
        }
      }

      const label = pct >= 80 ? "🔥 XUẤT SẮC" : pct >= 50 ? "⚡ KHÁ TỐT — CỐ THÊM NHÉ" : "📚 CẦN ÔN LẠI MỘT CHÚT";

      body.innerHTML = `
        <div class="quiz-score">
          <div class="score-label">HỆ THỐNG CHẤM ĐIỂM</div>
          <div class="score-main">${correct}/${total}</div>
          <div class="score-label">${label}</div>
          <div class="score-bar"><div class="pbar"><div class="pbar-fill" style="width:${pct}%"></div></div></div>
          ${extra}
          <button type="button" class="btn btn-cyan quiz-restart">[ LÀM LẠI — ĐỀ MỚI 🎲 ]</button>
        </div>`;
      $(".quiz-restart", body).addEventListener("click", start);
    }

    function showStart() {
      body.innerHTML = `
        <div class="quiz-start">
          <p>${isFinal
            ? `${count} câu hỏi random từ toàn bộ bài — kiểm tra xem bạn nhớ được bao nhiêu!`
            : `${count} câu hỏi random về phần vừa học — đề trộn mỗi lần làm.`}</p>
          <button type="button" class="btn ${isFinal ? "btn-magenta" : "btn-cyan"} quiz-start-btn">${isFinal ? "[ BẮT ĐẦU KIỂM TRA ]" : "[ BẮT ĐẦU ]"}</button>
        </div>`;
      $(".quiz-start-btn", body).addEventListener("click", start);
    }

    showStart();
  });
}

/* ---------- Khởi động ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initHomeProgress();
  const body = document.body;
  if (body.dataset.course && body.dataset.lesson) {
    initLessonPage();
  } else if (body.dataset.course) {
    renderCoursePage(body.dataset.course);
  }
  initCopyButtons();
  initExercises();
  initQuizzes();
});
