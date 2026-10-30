/* Aghaaz-e-Asaas Kids — games2.js
   Khaas games: Gubbare, Harf ki Tokri, Yaad ka Khel, Lafz Banao, Shakal ka Ghar.
   (Yahan bhi koi "out" nahi — galti par sirf narm awaaz aur dobara koshish.) */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const { rand, pick, shuffle } = AA;
  const L = (i) => D.LETTERS[i];
  const dotsHtml = (ctx) => '<div class="dots-row">' + Array.from({ length: ctx.total }, (_, k) => '<i class="' + (ctx.results[k] === 'ok' ? 'ok' : ctx.results[k] === 'helped' ? 'helped' : k === ctx.results.length ? 'cur' : '') + '"></i>').join('') + '</div>';
  function darken(hex, k) {
    const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    r = Math.round(r * k); g = Math.round(g * k); b = Math.round(b * k);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  const BUB = ['#5BC8F5', '#7BE0B8', '#F7C265', '#C79BE8', '#FF9AA2', '#8FD0FF'];

  /* =====================================================
     🫧 GUBBARE — nanha: rang, bada: harf
     ===================================================== */
  AA.games.add({
    id: 'gubbare', ur: 'غبارے', ro: 'Gubbare Phoro', e: '🫧', a: '#5BC8F5', b: '#3DA9FC', d: '#2184D6', ages: ['nanha', 'bada'], on: 0, ob: 7,
    need: () => null,
    start(ctx) {
      const st = ctx.stage; st.classList.add('free');
      const letterMode = ctx.bada;
      const goal = letterMode ? 8 : 6;
      const pool = letterMode ? Store.pool(5) : null;
      const colors = D.COLORS.filter((c) => c.id !== 'safed').slice(0, [4, 6, 8, 9][ctx.lvl - 1]);
      let ok = 0, bad = 0, target = null, streak = 0;
      st.innerHTML = '<div style="position:absolute;top:8px;left:0;right:0;display:flex;justify-content:center;z-index:5;pointer-events:none"><span class="target-pill" id="gb-t"></span></div><div id="gb-f" style="position:absolute;inset:0;overflow:hidden"></div>';
      const field = AA.$('#gb-f', st), pill = AA.$('#gb-t', st);
      function newTarget() {
        if (letterMode) { const prev = target; do { target = pick(pool); } while (target === prev && pool.length > 1); pill.innerHTML = 'ڈھونڈو <span class="ar-big">' + L(target).ch + '</span>'; ctx.say([{ ar: L(target).say }, D.T.phoro]); }
        else { const prev = target; do { target = pick(colors); } while (target === prev && colors.length > 1); pill.innerHTML = '<span class="disc-s" style="--hex:' + target.hex + '"></span> ' + target.ur + ' <span class="ur" style="font-size:1.1rem">غبارہ پھوڑو</span>'; ctx.say([target, D.T.phoro]); }
      }
      pill.addEventListener('click', () => ctx.say(letterMode ? [{ ar: L(target).say }] : [target]));
      pill.style.pointerEvents = 'auto';
      newTarget();
      function spawn() {
        if (!ctx.alive) return;
        const W = field.clientWidth, H = field.clientHeight;
        if (W) {
          const isT = Math.random() < 0.45;
          const item = isT ? target : letterMode ? pick(pool) : pick(colors);
          const b = document.createElement('button');
          b.className = 'bubble-b';
          const col = letterMode ? pick(BUB) : item.hex;
          b.style.setProperty('--bc1', col); b.style.setProperty('--bc2', darken(col, 0.78));
          b.style.left = rand(6, Math.max(8, W - 100)) + 'px';
          const dist = H + 150, speed = (ctx.bada ? 88 : 70) + ctx.lvl * 16;
          b.style.setProperty('--rise', -dist + 'px'); b.style.setProperty('--sway', rand(-26, 26) + 'px');
          b.style.setProperty('--dur', (dist / speed).toFixed(2) + 's');
          b.dataset.ok = item === target ? '1' : '0';
          if (letterMode) b.innerHTML = '<span class="ar-big">' + L(item).ch + '</span>';
          b.setAttribute('aria-label', letterMode ? L(item).n : item.ro);
          b.addEventListener('animationend', (e) => { if (e.animationName === 'rise') b.remove(); });
          b.addEventListener('pointerdown', (e) => { e.preventDefault(); tap(b, item); });
          field.appendChild(b);
        }
        ctx.later(spawn, Math.max(420, 950 - ctx.lvl * 100));
      }
      function tap(b, item) {
        if (b.dataset.done || !ctx.alive) return;
        b.dataset.done = '1';
        const fr = field.getBoundingClientRect(), r = b.getBoundingClientRect();
        const m = new DOMMatrixReadOnly(getComputedStyle(b).transform);
        b.style.setProperty('--tf', 'translate(' + m.m41 + 'px,' + m.m42 + 'px)');
        b.classList.add('popped'); setTimeout(() => b.remove(), 300);
        const x = r.left - fr.left + 30, y = r.top - fr.top;
        if (b.dataset.ok === '1') {
          ok++; streak++; AA.sfx.play('pop');
          UI.floatText(field, '+1', x, y, '');
          ctx.say(letterMode ? [{ ar: L(item).say }] : [item]);
          if (ok >= goal) { ctx.finish({ ratio: ok / (ok + bad), note: 'Sahi gubbare: ' + ok + ' • Doosre: ' + bad }); return; }
          if (streak >= 3) { streak = 0; ctx.later(newTarget, 700); }
        } else {
          bad++; AA.sfx.play('oops');
          UI.floatText(field, 'Yeh nahi 🙂', x - 20, y, 'soft');
        }
      }
      spawn();
    }
  });

  /* =====================================================
     🧺 HARF KI TOKRI
     ===================================================== */
  AA.games.add({
    id: 'tokri', ur: 'حرف کی ٹوکری', ro: 'Harf ki Tokri', e: '🧺', a: '#8B6CFF', b: '#C75BFF', d: '#6A3AB8', ages: ['bada'], on: 99, ob: 4,
    need: () => null,
    start(ctx) {
      const st = ctx.stage; st.classList.add('free');
      const pool = Store.pool(5), goal = 8;
      let target = pick(pool), caught = 0, bad = 0, dir = 0, run = 0;
      st.innerHTML = '<div style="position:absolute;top:8px;left:0;right:0;display:flex;justify-content:center;z-index:5"><span class="target-pill" id="tk-t"></span></div><div id="tk-f" style="position:absolute;inset:0;overflow:hidden;touch-action:none"><div class="basket" id="tk-b">🧺</div></div>' +
        '<button class="drive l" id="tk-l" aria-label="Left">' + UI.icon('back') + '</button><button class="drive r" id="tk-r" aria-label="Right">' + UI.icon('next') + '</button>';
      const field = AA.$('#tk-f', st), basket = AA.$('#tk-b', st), pill = AA.$('#tk-t', st);
      const say = () => { pill.innerHTML = 'پکڑو <span class="ar-big">' + L(target).ch + '</span>'; ctx.say([{ ar: L(target).say }, D.T.pakdo]); };
      pill.addEventListener('click', () => ctx.say([{ ar: L(target).say }])); say();
      let bx = field.clientWidth / 2;
      const move = (e) => { const r = field.getBoundingClientRect(); bx = AA.clamp(e.clientX - r.left, 50, r.width - 50); };
      field.addEventListener('pointermove', move); field.addEventListener('pointerdown', move);
      [['tk-l', -1], ['tk-r', 1]].forEach(([id, d]) => {
        const b = AA.$('#' + id, st);
        b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); dir = d; });
        ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => b.addEventListener(ev, () => { if (dir === d) dir = 0; }));
      });
      const items = []; let last = performance.now(), spawnIn = 0.4, raf = 0;
      function frame(now) {
        if (!ctx.alive) return;
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        const W = field.clientWidth, H = field.clientHeight;
        bx = AA.clamp(bx + dir * 520 * dt, 50, W - 50);
        basket.style.left = bx + 'px';
        spawnIn -= dt;
        if (spawnIn <= 0 && W) {
          spawnIn = Math.max(0.6, 1.25 - ctx.lvl * 0.14);
          const ch = Math.random() < 0.45 ? target : pick(pool);
          const el = document.createElement('div'); el.className = 'fall' + (ch === target ? ' is-target' : '');
          el.innerHTML = '<span class="ar-big">' + L(ch).ch + '</span>'; field.appendChild(el);
          items.push({ el, ch, x: rand(40, Math.max(42, W - 40)), y: -70, vy: (H + 90) / (4.6 - ctx.lvl * 0.5 + Math.random() * 0.6) });
        }
        const top = H - 14 - 70;
        for (let k = items.length - 1; k >= 0; k--) {
          const it = items[k]; it.y += it.vy * dt;
          it.el.style.transform = 'translate(' + (it.x - 33) + 'px,' + it.y + 'px)';
          if (it.y + 60 >= top && it.y <= top + 40 && Math.abs(it.x - bx) < 58) {
            items.splice(k, 1); it.el.remove();
            if (it.ch === target) {
              caught++; AA.sfx.play('good'); basket.classList.remove('good'); void basket.offsetWidth; basket.classList.add('good');
              UI.floatText(field, '+1', it.x - 10, top - 20, '');
              ctx.say([{ ar: L(it.ch).say }]);
              if (caught >= goal) { ctx.finish({ ratio: caught / (caught + bad), note: 'Pakde: ' + caught + ' • Doosre: ' + bad }); return; }
              if (caught % 4 === 0) { target = pick(pool); ctx.later(say, 700); }
            } else { bad++; AA.sfx.play('oops'); UI.floatText(field, 'Yeh nahi 🙂', it.x - 30, top - 20, 'soft'); }
          } else if (it.y > H + 10) { items.splice(k, 1); it.el.remove(); }
        }
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame((t) => { last = t; frame(t); });
      ctx.cleanups.push(() => cancelAnimationFrame(raf));
    }
  });

  /* =====================================================
     🃏 YAAD KA KHEL
     ===================================================== */
  AA.games.add({
    id: 'yaad', ur: 'یاد کا کھیل', ro: 'Yaad ka Khel', e: '🃏', a: '#FF6FA8', b: '#FF7A59', d: '#C94430', ages: ['nanha', 'bada'], on: 5, ob: 3,
    need: () => null,
    start(ctx) {
      const pairs = ctx.bada ? [3, 4, 6, 8][ctx.lvl - 1] : [3, 4, 5, 6][ctx.lvl - 1];
      const cols = pairs <= 3 ? 3 : 4;
      let cards = [];
      if (ctx.bada) {
        const letters = shuffle(Store.pool(pairs)).slice(0, pairs);
        letters.forEach((i) => {
          cards.push({ key: 'l' + i, html: '<span class="ar-big">' + L(i).ch + '</span>', say: [{ ar: L(i).say }], letter: i });
          cards.push({ key: 'l' + i, html: '<span>' + L(i).w.e + '</span>', say: [{ ar: L(i).w.ar }, L(i).w], letter: i });
        });
      } else {
        shuffle(D.ANIMALS).slice(0, pairs).forEach((a) => { for (let k = 0; k < 2; k++) cards.push({ key: a.id, html: '<span>' + a.e + '</span>', say: [a] }); });
      }
      cards = shuffle(cards);
      st_render();
      function st_render() {
        ctx.stage.innerHTML = '<div class="q-text"><span class="ur">جوڑی ملاؤ</span></div><div class="mem-grid" style="--cols:' + cols + '">' +
          cards.map((c, k) => '<button class="mcard flip" data-act="card" data-k="' + k + '" aria-label="Card"><span class="mc-in"><span class="back">❓</span><span class="face">' + c.html + '</span></span></button>').join('') + '</div><div class="sub" id="mv">Chaalein: 0</div>';
      }
      let open = [], moves = 0, matched = 0, locked = true;
      ctx.say([D.T.dekho]);
      ctx.later(() => { AA.$$('.mcard', ctx.stage).forEach((c) => c.classList.remove('flip')); locked = false; }, ctx.bada ? 1800 + pairs * 250 : 2300 + pairs * 250);
      UI.bind(ctx.stage, {
        card(t) {
          if (locked || t.classList.contains('flip')) return;
          const k = +t.dataset.k;
          t.classList.add('flip'); AA.sfx.play('tap'); open.push(k);
          if (open.length === 2) {
            moves++; AA.$('#mv', ctx.stage).textContent = 'Chaalein: ' + moves;
            const [a, b] = open; locked = true;
            if (cards[a].key === cards[b].key) {
              matched++; AA.sfx.play('good');
              [a, b].forEach((x) => AA.$('[data-k="' + x + '"]', ctx.stage).classList.add('match'));
              if (cards[a].letter != null) Store.srs(cards[a].letter, true);
              ctx.say(cards[a].say);
              open = []; locked = false;
              if (matched === pairs) ctx.later(() => ctx.finish({ ratio: Math.min(1, (pairs / moves) * 1.4), note: pairs + ' jodiyan ' + moves + ' chaalon mein' }), 1200);
            } else {
              ctx.later(() => { [a, b].forEach((x) => AA.$('[data-k="' + x + '"]', ctx.stage).classList.remove('flip')); open = []; locked = false; }, 950);
            }
          }
        }
      });
    }
  });

  /* =====================================================
     🧩 LAFZ BANAO
     ===================================================== */
  AA.games.add({
    id: 'lafz', ur: 'لفظ بناؤ', ro: 'Lafz Banao', e: '🧩', a: '#FF9A3D', b: '#FF6FA8', d: '#C96B1F', ages: ['bada'], on: 99, ob: 6,
    need: () => (Store.learnedList().length >= 6 ? null : 'Pehle 6 harf seekho'),
    start(ctx) {
      const lvl = ctx.lvl, learned = new Set(Store.learnedList().map((i) => L(i).ch));
      let words = D.WORDS.filter((w) => (lvl === 1 ? w.lv === 1 : lvl === 2 ? w.lv <= 2 : lvl === 3 ? w.lv === 2 || w.lv === 3 : w.lv >= 3));
      // pehle woh lafz jinke harf seekhe ja chuke hain
      const easy = words.filter((w) => Array.from(w.w).every((c) => learned.has(c)));
      words = shuffle(easy.length >= 4 ? easy : words).slice(0, 4);
      ctx.setTotal(words.length);
      let wi = 0, cur = null;
      function round() {
        const w = words[wi], letters = Array.from(w.w);
        const extra = shuffle(D.LETTERS.map((x) => x.ch).filter((c) => !letters.includes(c))).slice(0, lvl >= 4 ? 2 : lvl >= 3 ? 1 : 0);
        const bank = shuffle(letters.map((c, k) => ({ c, id: k })).concat(extra.map((c, k) => ({ c, id: 100 + k }))));
        cur = { w, letters, next: 0, wrong: 0, locked: false };
        ctx.stage.innerHTML = '<div class="q-card">' + dotsHtml(ctx) + '<div class="q-text"><span class="ur">لفظ بناؤ</span></div>' +
          '<div class="q-prompt"><button class="big" data-act="hearw" style="font-size:4.6rem">' + w.e + '</button></div>' +
          '<div class="slots" id="lz-s">' + letters.map(() => '<div class="slot"></div>').join('') + '</div>' +
          '<div class="tiles-bank" id="lz-b">' + bank.map((b) => '<button class="ltile" data-act="tile" data-id="' + b.id + '" data-c="' + b.c + '"><span class="ar-big">' + b.c + '</span></button>').join('') + '</div></div>';
        ctx.say([w, D.T.lafzBanao]);
      }
      UI.bind(ctx.stage, {
        hearw() { ctx.say([cur.w, D.T.lafzBanao]); },
        async tile(t) {
          const c = cur;
          if (c.locked || t.classList.contains('used')) return;
          if (t.dataset.c === c.letters[c.next]) {
            AA.sfx.play('pop'); t.classList.add('used');
            const slot = AA.$$('.slot', ctx.stage)[c.next]; slot.classList.add('fill'); slot.innerHTML = '<span class="ar-big">' + t.dataset.c + '</span>';
            c.next++; V.stop();
            if (c.next === c.letters.length) {
              c.locked = true; ctx.record(c.wrong === 0); AA.sfx.play('great');
              AA.$('#lz-s', ctx.stage).innerHTML = '<span class="ar-big word-done">' + c.w.w + '</span>';
              AA.$('#lz-b', ctx.stage).innerHTML = '<div class="q-text"><span class="ur">' + c.w.ur + '</span><br><small class="sub">' + c.w.ro + '</small></div>';
              await ctx.say([{ ar: c.w.w }, c.w, AA.pick(D.PRAISE)]);
              await AA.wait(400); wi++;
              if (!ctx.alive) return;
              if (wi >= words.length) ctx.finish(); else round();
            }
          } else {
            c.wrong++; t.classList.add('wrong'); AA.sfx.play('oops'); setTimeout(() => t.classList.remove('wrong'), 450);
            if (c.wrong >= 2) { const g = AA.$$('.ltile:not(.used)', ctx.stage).find((x) => x.dataset.c === c.letters[c.next]); if (g) g.classList.add('hint'); }
          }
        }
      });
      round();
    }
  });

  /* =====================================================
     🔷 SHAKAL KA GHAR — ungli se khench kar sahi jagah rakho
     ===================================================== */
  AA.games.add({
    id: 'shakalGhar', ur: 'شکل کا گھر', ro: 'Shakal ka Ghar', e: '🧩', a: '#12B5A6', b: '#3DA9FC', d: '#0B6F88', ages: ['nanha'], on: 6, ob: 99,
    start(ctx) {
      const n = [3, 4, 5, 6][ctx.lvl - 1], shapes = shuffle(D.SHAPES).slice(0, n);
      const cols = shuffle(D.COLORS.filter((c) => !['safed', 'kala', 'bhura'].includes(c.id)));
      ctx.stage.innerHTML = '<div class="q-text"><span class="ur">شکل کو اس کے گھر میں رکھو</span></div><div class="shape-board" id="sb"></div>';
      const board = AA.$('#sb', ctx.stage), W = board.clientWidth || 360, H = 300, pc = Math.min(n, 3);
      const holes = [], pieces = [];
      shapes.forEach((s, k) => {
        const row = Math.floor(k / pc), col = k % pc, cnt = Math.min(pc, n - row * pc);
        const hx = (W / cnt) * (col + 0.5) - 48, hy = 6 + row * 104;
        const h = document.createElement('div'); h.className = 'hole'; h.style.left = hx + 'px'; h.style.top = hy + 'px'; h.style.setProperty('--sc', cols[k].hex);
        h.innerHTML = AA.shapeSvg(s, 'currentColor').replace('fill:currentColor;', ''); board.appendChild(h); holes.push({ el: h, s, x: hx, y: hy });
      });
      const order = shuffle(shapes.map((s, k) => ({ s, k })));
      order.forEach((o, j) => {
        const rows = Math.ceil(n / pc), py = 14 + rows * 104 + 8;
        const cnt = Math.min(pc, n); const px = (W / cnt) * (j % cnt + 0.5) - 48 + rand(-6, 6), pyy = py + Math.floor(j / cnt) * 100;
        const p = document.createElement('div'); p.className = 'piece'; p.style.left = px + 'px'; p.style.top = Math.min(pyy, H - 96) + 'px'; p.style.setProperty('--sc', cols[o.k].hex);
        p.innerHTML = AA.shapeSvg(o.s, cols[o.k].hex); p.dataset.k = o.k; board.appendChild(p);
        pieces.push({ el: p, s: o.s, hx: px, hy: Math.min(pyy, H - 96), k: o.k });
      });
      let good = 0, bad = 0, placed = 0;
      pieces.forEach((pc2) => {
        const el = pc2.el; let ox = 0, oy = 0;
        el.addEventListener('pointerdown', (e) => {
          e.preventDefault(); el.setPointerCapture(e.pointerId); el.classList.add('drag'); el.classList.remove('back');
          const r = el.getBoundingClientRect(); ox = e.clientX - r.left; oy = e.clientY - r.top; ctx.say([pc2.s]);
        });
        el.addEventListener('pointermove', (e) => {
          if (!el.classList.contains('drag')) return;
          const br = board.getBoundingClientRect();
          el.style.left = (e.clientX - br.left - ox) + 'px'; el.style.top = (e.clientY - br.top - oy) + 'px';
        });
        const drop = () => {
          if (!el.classList.contains('drag')) return;
          el.classList.remove('drag');
          const cx = parseFloat(el.style.left) + 48, cy = parseFloat(el.style.top) + 48;
          let hit = null, bestD = 70;
          holes.forEach((h) => { const d = Math.hypot(h.x + 48 - cx, h.y + 48 - cy); if (d < bestD) { bestD = d; hit = h; } });
          if (hit && hit.s === pc2.s) {
            good++; placed++; el.classList.add('placed'); hit.el.classList.add('filled'); AA.sfx.play('good');
            ctx.say([pc2.s, AA.pick(D.PRAISE)]);
            if (placed === n) ctx.later(() => ctx.finish({ ratio: good / (good + bad), note: 'Sahi: ' + good + ' • Dobara: ' + bad }), 900);
          } else {
            if (hit) { bad++; AA.sfx.play('oops'); }
            el.classList.add('back'); el.style.left = pc2.hx + 'px'; el.style.top = pc2.hy + 'px';
          }
        };
        el.addEventListener('pointerup', drop); el.addEventListener('pointercancel', drop);
      });
      ctx.say([D.T.chalo]);
    }
  });
})();
