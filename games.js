/* Aghaaz-e-Asaas Kids — games.js
   Games ka menu + dhancha (session) + sawal-jawab wale games.
   USOOL:  1) koi "out" nahi — galat par narm awaaz, dobara koshish, 2 galti ke baad sahi jawab chamakta hai.
           2) Level khud adjust hota hai — aasaan lage to upar, mushkil lage to neeche.
           3) Hamesha kam az kam 1 sitara — koshish ki qadar.
           4) Jo harf bachche ne seekhe hain wohi aate hain; bhoolne wale zyada aate hain (yaad ka nizam). */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;
  const { rand, pick, shuffle } = AA;

  /* ------------------------- madadgar ------------------------- */
  // sahi harf + n-1 doosre (similar=true ho to milte julte harf)
  AA.letterOpts = function (correct, n, o) {
    o = o || {};
    const pool = (o.pool || Store.pool(Math.max(n + 1, 4))).filter((x) => x !== correct);
    const sim = D.similarTo(correct);
    let out;
    if (o.similar) out = shuffle(pool.filter((x) => sim.includes(x))).concat(shuffle(pool.filter((x) => !sim.includes(x))));
    else out = shuffle(pool.filter((x) => !sim.includes(x)));
    out = out.slice(0, n - 1);
    if (out.length < n - 1) {
      const rest = shuffle(D.LETTERS.map((_, i) => i).filter((x) => x !== correct && !out.includes(x) && (o.similar || !sim.includes(x))));
      out = out.concat(rest.slice(0, n - 1 - out.length));
    }
    return shuffle([correct].concat(out));
  };
  // sawalon ke liye harf chuno: due/kamzor pehle
  AA.pickLetters = function (n, pool) {
    const pri = shuffle(Array.from(new Set(Store.dueList().concat(Store.weakList(3))))).filter((x) => pool.includes(x));
    const rest = shuffle(pool.filter((x) => !pri.includes(x)));
    const list = pri.slice(0, Math.ceil(n / 2)).concat(rest, pri.slice(Math.ceil(n / 2)));
    const out = [];
    for (let k = 0; out.length < n; k++) {
      let c = list[k % list.length];
      if (out.length && out[out.length - 1] === c && list.length > 1) c = list[(k + 1) % list.length];
      out.push(c);
    }
    return out;
  };
  AA.shapeSvg = (s, color) => '<svg class="shape" viewBox="0 0 100 100" style="fill:' + color + ';stroke:rgba(0,0,0,.18);stroke-width:3">' + s.svg + '</svg>';
  const L = (i) => D.LETTERS[i];
  const letterOpt = (i) => '<span class="ar-big">' + L(i).ch + '</span>';
  const dotsHtml = (ctx) => '<div class="dots-row">' + Array.from({ length: ctx.total }, (_, k) => '<i class="' + (ctx.results[k] === 'ok' ? 'ok' : ctx.results[k] === 'helped' ? 'helped' : k === ctx.results.length ? 'cur' : '') + '"></i>').join('') + '</div>';

  /* ------------------------- registry ------------------------- */
  const REG = (AA.games.list = []);
  AA.games.add = (g) => { REG.push(g); AA.games[g.id] = g; };

  /* ------------------------- Menu ------------------------- */
  S.games = {
    render() {
      const bada = Store.profile.age === 'bada';
      const learned = Store.learnedList().length;
      const due = Store.dueCount();
      const list = REG.filter((g) => g.ages.includes(Store.profile.age)).sort((a, b) => (bada ? a.ob : a.on) - (bada ? b.ob : b.on));
      const tile = (g) => {
        const rec = Store.game(g.id), lock = g.need ? g.need() : null;
        const st = Math.min(3, rec.best || 0);
        return '<button class="gtile" data-act="game" data-id="' + g.id + '" style="--a:' + g.a + ';--b:' + g.b + ';--d:' + g.d + (lock ? ';opacity:.7' : '') + '">' +
          (rec.played ? '<span class="glvl">Level ' + rec.lvl + '</span>' : '') +
          '<span class="ge">' + (lock ? '🔒' : g.e) + '</span><span class="gt ur">' + g.ur + '</span><span class="gs">' + g.ro + '</span>' +
          '<span class="gstars">' + '⭐'.repeat(st) + '<span style="opacity:.3;filter:grayscale(1)">' + '⭐'.repeat(3 - st) + '</span></span></button>';
      };
      return UI.topbar({ ur: 'کھیل', ro: 'Khelte khelte seekho' }) +
        (learned ? '<div class="pad" style="padding-top:4px"><button class="tile wide" data-act="game" data-id="review" style="--a:#2ED1A0;--b:#12B5A6;--d:#0B7F73;min-height:92px;width:100%"><span class="te">🧠</span><span class="grow"><span class="tt ur" style="display:block">دہراؤ</span><span class="ts">Dohrao — ' + (due ? due + ' harf intezar mein 💧' : 'Seekhe hue harf phir se') + '</span></span></button></div>' : '') +
        '<div class="tiles" style="padding-top:12px">' + list.map(tile).join('') + '</div>';
    },
    mount(root) {
      UI.bind(root, {
        game(t) {
          const id = t.dataset.id, g = AA.games[id];
          const lock = g && g.need ? g.need() : null;
          if (lock) { UI.toast(lock); V.seq([{ ur: lock, ro: lock }]); return; }
          AA.sfx.play('whoosh'); UI.go('play', { id });
        }
      });
    }
  };

  /* ------------------------- Session screen ------------------------- */
  S.play = {
    render(p) {
      const g = AA.games[p.id];
      return '<div class="game"><div class="game-top"><button class="icon-btn" data-act="back" aria-label="Wapas">' + UI.icon('back') + '</button>' +
        '<div class="gt-mid"><b class="ur">' + g.ur + '</b><small class="sub">' + g.ro + '</small></div>' + UI.starsChip() + '</div>' +
        '<div class="game-stage" id="g-stage"></div></div>';
    },
    mount(root, p) {
      const g = AA.games[p.id];
      const rec = g.id === 'review' ? { lvl: 2 } : Store.game(g.id);
      const ctx = {
        game: g, params: p, root, stage: AA.$('#g-stage', root), age: Store.profile.age, bada: Store.profile.age === 'bada',
        lvl: rec.lvl, alive: true, timers: [], cleanups: [], total: 0, results: [], extra: null,
        later(fn, ms) { const t = setTimeout(() => ctx.alive && fn(), ms); ctx.timers.push(t); return t; },
        say(list) { return V.seq(list); },
        setTotal(n) { ctx.total = n; },
        record(ok) { ctx.results.push(ok ? 'ok' : 'helped'); },
        async finish(opt) {
          if (!ctx.alive) return;
          ctx.alive = false; V.stop();
          ctx.cleanups.forEach((f) => { try { f(); } catch (e) {} });
          const total = ctx.results.length || 1;
          const good = ctx.results.filter((x) => x === 'ok').length;
          const ratio = opt && opt.ratio != null ? opt.ratio : good / total;
          const stars = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : 1;
          if (g.id !== 'review') {
            const r = Store.game(g.id);
            r.played++; r.best = Math.max(r.best || 0, stars);
            if (ratio >= 0.8) r.lvl = Math.min(4, r.lvl + 1); else if (ratio < 0.4) r.lvl = Math.max(1, r.lvl - 1);
          }
          Store.save();
          showResult(ctx, stars, good, total, opt);
          await UI.reward(stars, g.id);
          UI.mission(g.id === 'review' ? 'learn' : 'play');
        }
      };
      root._ctx = ctx;
      const lock = g.need ? g.need() : null;
      if (lock) { ctx.stage.innerHTML = '<div class="result"><div class="q-text">' + AA.esc(lock) + '</div></div>'; return; }
      g.start(ctx);
    },
    leave(root) {
      const c = root && root._ctx;
      if (c) { c.alive = false; c.timers.forEach(clearTimeout); c.cleanups.forEach((f) => { try { f(); } catch (e) {} }); }
    }
  };

  function showResult(ctx, stars, good, total, opt) {
    const msg = stars === 3 ? 'ماشاءاللہ! کمال کر دیا' : stars === 2 ? 'بہت خوب!' : 'شاباش! کوشش کرتے رہو';
    ctx.stage.innerHTML = '<div class="result">' + UI.mascot('cheer') + '<h2 class="ur">' + msg + '</h2>' +
      '<div class="rstars">' + '⭐'.repeat(stars) + '<span class="off">' + '⭐'.repeat(3 - stars) + '</span></div>' +
      '<p class="sub">' + (opt && opt.note ? AA.esc(opt.note) : 'Pehli koshish mein sahi: ' + good + ' / ' + total) + '</p>' +
      '<button class="btn big green block" data-act="again">' + UI.icon('redo') + ' Phir khelo</button>' +
      '<button class="btn ghost block" data-act="back">Wapas</button></div>';
    AA.sfx.play(stars === 3 ? 'win' : 'great');
    UI.confetti(ctx.stage, stars === 3 ? 44 : 22);
    V.seq([AA.pick(D.PRAISE)]);
    UI.bind(ctx.stage, { again() { UI.go('play', ctx.params, { replace: true }); } });
  }

  /* ------------------------- Quiz engine ------------------------- */
  // rounds: [{ label, prompt, pcls, opts:[{html,ok,cls}], cols, intro:[say], onOk:[say], letter, reveal }]
  function runQuiz(ctx, rounds) {
    let idx = 0, wrong = 0, locked = false;
    ctx.setTotal(rounds.length);
    function show() {
      const r = rounds[idx]; locked = false; wrong = 0;
      ctx.stage.innerHTML = '<div class="q-card">' + dotsHtml(ctx) +
        '<div class="q-text"><span class="ur">' + r.label + '</span></div>' +
        '<div class="q-prompt ' + (r.pcls || '') + '" id="q-prompt">' + r.prompt + '</div>' +
        '<div class="opt-grid" style="--cols:' + (r.cols || r.opts.length) + '">' + r.opts.map((o, k) => '<button class="opt ' + (o.cls || '') + '" data-act="pick" data-k="' + k + '" ' + (o.aria ? 'aria-label="' + AA.esc(o.aria) + '"' : '') + '>' + o.html + '</button>').join('') + '</div></div>';
      ctx.stage.scrollTop = 0;
      if (r.intro) ctx.say(r.intro);
    }
    async function next() {
      idx++;
      if (idx >= rounds.length) { ctx.finish(); return; }
      show();
    }
    UI.bind(ctx.stage, {
      hear() { const r = rounds[idx]; if (r && r.intro) ctx.say(r.intro); UI.pulse(AA.$('.listen-btn', ctx.stage), 'pulse-once'); },
      count(t) {
        if (t.classList.contains('counted')) return;
        t.classList.add('counted');
        const n = AA.$$('.cobj.counted', ctx.stage).length;
        t.insertAdjacentHTML('beforeend', '<span class="cn">' + n + '</span>');
        AA.sfx.play('pop'); V.say(D.NUMBERS[n - 1] || D.NUMBERS[9]);
      },
      async pick(t) {
        if (locked) return;
        const r = rounds[idx], o = r.opts[+t.dataset.k];
        if (o.ok) {
          locked = true; t.classList.add('right'); AA.sfx.play('good');
          AA.$$('.opt', ctx.stage).forEach((b) => { if (b !== t) b.classList.add('fade'); });
          ctx.record(wrong === 0);
          if (r.letter != null) Store.srs(r.letter, wrong === 0);
          if (r.reveal) { const pr = AA.$('#q-prompt', ctx.stage); if (pr) pr.innerHTML = r.reveal; }
          UI.floatText(ctx.stage, wrong === 0 ? '⭐' : '👍', t.offsetLeft + t.offsetWidth / 2 - 14, t.offsetTop, '');
          await ctx.say((r.onOk || []).concat([wrong === 0 ? AA.pick(D.PRAISE) : D.T.ekBaarAur].slice(0, wrong === 0 ? 1 : 0)));
          await AA.wait(350);
          if (ctx.alive) next();
        } else {
          wrong++; t.classList.add('wrong'); AA.sfx.play('oops');
          setTimeout(() => t.classList.remove('wrong'), 480);
          if (wrong === 1) V.seq([D.T.dobara]);
          if (wrong >= 2) {
            const good = AA.$$('.opt', ctx.stage)[r.opts.findIndex((x) => x.ok)];
            if (good) good.classList.add('hint');
          }
        }
      }
    });
    show();
  }
  AA.runQuiz = runQuiz;

  /* ------------------------- Game definitions ------------------------- */
  const listen = '<button class="listen-btn" data-act="hear" aria-label="Suno">' + UI.icon('sound') + '</button>';

  // 🧠 Dohrao — yaad ka nizam
  AA.games.add({
    id: 'review', ur: 'دہراؤ', ro: 'Dohrao', e: '🧠', a: '#2ED1A0', b: '#12B5A6', d: '#0B7F73', ages: [], on: 0, ob: 0,
    need: () => null,
    start(ctx) {
      let letters = ctx.params.letters && ctx.params.letters.length ? ctx.params.letters.slice() : Store.dueList(6).concat(Store.weakList(3));
      letters = Array.from(new Set(letters));
      if (letters.length < 3) letters = Array.from(new Set(letters.concat(shuffle(Store.learnedList()).slice(0, 6 - letters.length))));
      const n = Math.min(6, Math.max(4, letters.length));
      const seq = AA.pickLetters(n, letters.length ? letters : Store.pool());
      const nOpt = ctx.bada ? 4 : 3, pool = Store.pool(nOpt + 1);
      const rounds = seq.map((i, k) => {
        const type = k % 3 === 0 ? 'pic' : k % 3 === 1 ? 'hear' : 'letterPic';
        const opts = AA.letterOpts(i, nOpt, { pool, similar: ctx.bada && Store.letterState(i) >= 1 && k > 2 });
        if (type === 'hear') return { label: 'سنو اور ڈھونڈو', prompt: listen, pcls: 'listen', letter: i, intro: [{ ar: L(i).say }], onOk: [{ ar: L(i).say }], cols: nOpt > 3 ? 2 : nOpt, opts: opts.map((x) => ({ html: letterOpt(x), ok: x === i })) };
        if (type === 'pic') return { label: 'یہ کس حرف سے شروع ہوتا ہے؟', prompt: '<span class="big">' + L(i).w.e + '</span>', letter: i, intro: [{ ar: L(i).w.ar }, L(i).w], onOk: [{ ar: L(i).say }], cols: nOpt > 3 ? 2 : nOpt, opts: opts.map((x) => ({ html: letterOpt(x), ok: x === i })) };
        const pics = opts.map((x) => ({ html: '<span>' + L(x).w.e + '</span>', ok: x === i }));
        return { label: 'اس حرف کی تصویر کون سی؟', prompt: '<span class="ar-big big">' + L(i).ch + '</span>', letter: i, intro: [{ ar: L(i).say }], onOk: [L(i).w], cols: nOpt > 3 ? 2 : nOpt, opts: pics };
      });
      runQuiz(ctx, rounds);
    }
  });

  // 🔊 Harf Suno
  AA.games.add({
    id: 'suno', ur: 'حرف سنو', ro: 'Harf Suno', e: '🔊', a: '#3DA9FC', b: '#5B7CFA', d: '#2358B8', ages: ['nanha', 'bada'], on: 7, ob: 0,
    need: () => null,
    start(ctx) {
      const pool = Store.pool(5), nOpt = AA.clamp(ctx.lvl + (ctx.bada ? 1 : 0), 2, 4);
      const seq = AA.pickLetters(ctx.bada ? 7 : 5, pool);
      runQuiz(ctx, seq.map((i) => ({
        label: 'سنو اور ڈھونڈو', prompt: listen, pcls: 'listen', letter: i, intro: [{ ar: L(i).say }, 200, D.T.dhoondo], onOk: [{ ar: L(i).say }],
        cols: nOpt > 3 ? 2 : nOpt, opts: AA.letterOpts(i, nOpt, { pool, similar: ctx.lvl >= 3 }).map((x) => ({ html: letterOpt(x), ok: x === i }))
      })));
    }
  });

  // 🖼️ Harf aur Tasveer
  AA.games.add({
    id: 'tasveer', ur: 'حرف اور تصویر', ro: 'Harf aur Tasveer', e: '🖼️', a: '#FF7A59', b: '#FF5E7E', d: '#C94430', ages: ['nanha', 'bada'], on: 8, ob: 1,
    need: () => null,
    start(ctx) {
      const pool = Store.pool(5), nOpt = AA.clamp(ctx.lvl + 1, 2, 4);
      const seq = AA.pickLetters(ctx.bada ? 7 : 5, pool);
      runQuiz(ctx, seq.map((i, k) => {
        const opts = AA.letterOpts(i, nOpt, { pool, similar: ctx.lvl >= 3 });
        if (k % 2 === 0) return { label: 'یہ کس حرف سے شروع ہوتا ہے؟', prompt: '<span class="big">' + L(i).w.e + '</span>', letter: i, intro: [{ ar: L(i).w.ar }, L(i).w], onOk: [{ ar: L(i).say }], cols: nOpt > 3 ? 2 : nOpt, opts: opts.map((x) => ({ html: letterOpt(x), ok: x === i })) };
        return { label: 'اس حرف کی تصویر کون سی؟', prompt: '<span class="ar-big big">' + L(i).ch + '</span>', letter: i, intro: [{ ar: L(i).say }], onOk: [L(i).w], cols: nOpt > 3 ? 2 : nOpt, opts: opts.map((x) => ({ html: '<span>' + L(x).w.e + '</span>', ok: x === i })) };
      }));
    }
  });

  // 🔍 Alag Harf (shakal pehchano)
  AA.games.add({
    id: 'alag', ur: 'الگ حرف', ro: 'Alag Harf Dhoondo', e: '🔍', a: '#8B6CFF', b: '#6A4FDB', d: '#4631A8', ages: ['bada'], on: 99, ob: 2,
    start(ctx) {
      const cells = [4, 6, 9, 12][ctx.lvl - 1], cols = cells <= 4 ? 2 : cells === 12 ? 4 : 3;
      const pool = Store.pool(5);
      const rounds = [];
      for (let k = 0; k < 6; k++) {
        const a = pick(pool);
        const sims = D.similarTo(a);
        const b = ctx.lvl >= 3 && sims.length ? pick(sims) : pick(D.LETTERS.map((_, i) => i).filter((x) => x !== a && !sims.includes(x)));
        const odd = rand(0, cells - 1);
        rounds.push({
          label: 'کون سا الگ ہے؟', prompt: '<span class="q-text">👀 <span class="ur">غور سے دیکھو</span></span>', cols,
          opts: Array.from({ length: cells }, (_, j) => ({ html: letterOpt(j === odd ? b : a), ok: j === odd, cls: 'sm' })),
          letter: null, onOk: [{ ar: L(b).say }], intro: [D.T.kaunSaAlag]
        });
      }
      runQuiz(ctx, rounds);
    }
  });

  // 🪜 Agla Harf
  AA.games.add({
    id: 'agla', ur: 'اگلا حرف', ro: 'Agla Harf', e: '🪜', a: '#FFB020', b: '#FF8A3D', d: '#C77700', ages: ['bada'], on: 99, ob: 6,
    need: () => null,
    start(ctx) {
      const maxI = Math.max(6, Math.max.apply(null, Store.learnedList()) + 1);
      const rounds = [];
      for (let k = 0; k < 6; k++) {
        const s = rand(0, Math.max(0, Math.min(25, maxI - 3)));
        const trio = [s, s + 1, s + 2], miss = pick([2, 2, 0, 1]);
        const c = trio[miss];
        const nOpt = ctx.lvl >= 3 ? 4 : 3;
        const others = shuffle(D.LETTERS.map((_, i) => i).filter((x) => !trio.includes(x))).slice(0, nOpt - 1);
        const chips = trio.map((x, j) => j === miss ? '<span class="ar-big" style="color:var(--c1)">؟</span>' : letterOpt(x));
        rounds.push({
          label: miss === 2 ? 'ان کے بعد کون سا حرف؟' : miss === 0 ? 'ان سے پہلے کون سا حرف؟' : 'بیچ میں کون سا حرف؟',
          prompt: '<span class="row" style="direction:rtl;gap:18px;font-size:3.4rem">' + chips.join('<span style="font-size:1.6rem;color:var(--ink2)">←</span>') + '</span>',
          cols: nOpt > 3 ? 2 : 3, opts: shuffle([c].concat(others)).map((x) => ({ html: letterOpt(x), ok: x === c })), letter: Store.isLearned(c) ? c : null, onOk: [{ ar: L(c).say }],
          intro: [D.T.aglaHarf]
        });
      }
      runQuiz(ctx, rounds);
    }
  });

  // ⬆️ Harkat Dhoondo
  AA.games.add({
    id: 'harkatGame', ur: 'حرکت ڈھونڈو', ro: 'Zabar Zer Pesh', e: '⬆️', a: '#12B5A6', b: '#2E9BD6', d: '#0B6F88', ages: ['bada'], on: 99, ob: 5,
    need: () => (Store.p.harkat.seen.length ? null : 'Pehle "Zabar Zer Pesh" seekho'),
    start(ctx) {
      const pool = Store.pool(5);
      const rounds = [];
      for (let k = 0; k < 6; k++) {
        const h = pick(D.HARKAT), li = pick(pool);
        const opts = shuffle(D.HARKAT).map((x) => ({ html: '<span class="ar-big">' + D.harakatLetter(li, x.mark) + '</span>', ok: x.id === h.id }));
        rounds.push({ label: h.ur + ' والا ڈھونڈو', prompt: '<span class="big">' + h.e + '</span>', cols: 3, opts, intro: [h, D.T.dhoondo], onOk: [{ ar: D.harakatLetter(li, h.mark) }], letter: null });
      }
      runQuiz(ctx, rounds);
    }
  });

  // 🎨 Rang Pehchano
  AA.games.add({
    id: 'rang', ur: 'رنگ پہچانو', ro: 'Rang Pehchano', e: '🎨', a: '#FF6FA8', b: '#C75BFF', d: '#9A3AB8', ages: ['nanha', 'bada'], on: 1, ob: 8,
    start(ctx) {
      const avail = D.COLORS.slice(0, [4, 6, 8, 10][ctx.lvl - 1]);
      const nOpt = ctx.lvl === 1 ? 2 : ctx.lvl >= 3 ? 4 : 3;
      const rounds = [];
      const seq = shuffle(avail).concat(shuffle(avail)).slice(0, ctx.bada ? 7 : 5);
      seq.forEach((c, k) => {
        const others = shuffle(avail.filter((x) => x !== c)).slice(0, nOpt - 1);
        const opts = shuffle([c].concat(others)).map((x) => ({ html: '<span class="disc" style="--hex:' + x.hex + '"></span>', ok: x === c, aria: x.ro }));
        if (k % 2 === 0) rounds.push({ label: c.ur + ' رنگ ڈھونڈو', prompt: listen, pcls: 'listen', cols: nOpt > 2 ? 2 : 2, opts, intro: [c, D.T.dhoondo], onOk: [c] });
        else rounds.push({ label: 'یہ کس رنگ کا ہے؟', prompt: '<span class="big">' + pick(c.things) + '</span>', cols: nOpt > 2 ? 2 : 2, opts, intro: [D.T.kaunSaRang], onOk: [c] });
      });
      runQuiz(ctx, rounds);
    }
  });

  // 🐄 Jaanwar
  AA.games.add({
    id: 'jaanwar', ur: 'جانور', ro: 'Jaanwar ki Awaaz', e: '🐮', a: '#7BD65A', b: '#2ED1A0', d: '#3B9B28', ages: ['nanha'], on: 2, ob: 99,
    start(ctx) {
      const nOpt = ctx.lvl === 1 ? 2 : ctx.lvl === 2 ? 3 : 4;
      const avail = D.ANIMALS.slice(0, [6, 8, 10, 12][ctx.lvl - 1]);
      const seq = shuffle(avail).slice(0, 5);
      runQuiz(ctx, seq.map((a, k) => {
        const others = shuffle(avail.filter((x) => x !== a)).slice(0, nOpt - 1);
        const opts = shuffle([a].concat(others)).map((x) => ({ html: '<span>' + x.e + '</span>', ok: x === a, aria: x.ro }));
        const cols = nOpt === 2 ? 2 : 2;
        if (k % 2 === 0) return { label: 'کون بول رہا ہے؟', prompt: listen, pcls: 'listen', cols, opts, intro: [{ lang: 'en', en: a.snd }], onOk: [a, { lang: 'en', en: a.snd }] };
        return { label: a.ur + ' کہاں ہے؟', prompt: listen, pcls: 'listen', cols, opts, intro: [a, D.T.dhoondo], onOk: [{ lang: 'en', en: a.snd }] };
      }));
    }
  });

  // 🔢 Ginti
  AA.games.add({
    id: 'ginti', ur: 'گنتی', ro: 'Ginti Karo', e: '🔢', a: '#FFB020', b: '#FF7A59', d: '#C77700', ages: ['nanha', 'bada'], on: 3, ob: 9,
    start(ctx) {
      const max = [3, 5, 7, 10][ctx.lvl - 1], rounds = [];
      const used = [];
      for (let k = 0; k < 5; k++) {
        let n; do { n = rand(1, max); } while (used.includes(n) && used.length < max); used.push(n);
        const thing = pick(D.COUNT_THINGS);
        let others = shuffle(Array.from({ length: Math.max(max, 4) }, (_, j) => j + 1).filter((x) => x !== n)).slice(0, 2);
        const opts = shuffle([n].concat(others)).map((x) => ({ html: '<span class="num" style="font-size:3.6rem;font-weight:700;color:var(--c1)">' + x + '</span>', ok: x === n, aria: String(x) }));
        rounds.push({
          label: 'گنو — کتنے ہیں؟', pcls: 'field',
          prompt: '<div class="count-field" style="box-shadow:none;min-height:0;padding:0">' + Array.from({ length: n }, () => '<button class="cobj" data-act="count">' + thing + '</button>').join('') + '</div>',
          cols: 3, opts, intro: [D.T.gino, D.T.kitne], onOk: [D.NUMBERS[n - 1]]
        });
      }
      runQuiz(ctx, rounds);
    }
  });

  // 🔷 Shakal
  AA.games.add({
    id: 'shakal', ur: 'شکلیں', ro: 'Shakal Pehchano', e: '🔷', a: '#3DA9FC', b: '#12B5A6', d: '#2184D6', ages: ['nanha', 'bada'], on: 4, ob: 10,
    start(ctx) {
      const avail = D.SHAPES.slice(0, [3, 4, 5, 6][ctx.lvl - 1]);
      const nOpt = Math.min(3, avail.length);
      const cols = D.COLORS.slice(0, 8);
      const seq = shuffle(avail).concat(shuffle(avail)).slice(0, 5);
      runQuiz(ctx, seq.map((s, k) => {
        const others = shuffle(avail.filter((x) => x !== s)).slice(0, nOpt - 1);
        const colors = shuffle(cols);
        const opts = shuffle([s].concat(others)).map((x, j) => ({ html: AA.shapeSvg(x, colors[j].hex), ok: x === s, aria: x.ro }));
        if (k % 2 === 0) return { label: s.ur + ' ڈھونڈو', prompt: listen, pcls: 'listen', cols: nOpt, opts, intro: [s, D.T.dhoondo], onOk: [s] };
        return { label: 'یہ کون سی شکل ہے؟', prompt: AA.shapeSvg(s, colors[4].hex), cols: nOpt, opts, intro: [D.T.kaunSaShakal], onOk: [s] };
      }));
    }
  });
})();
