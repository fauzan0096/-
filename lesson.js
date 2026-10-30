/* Aghaaz-e-Asaas Kids — lesson.js
   Ek harf ka poora safar:  👀 Dekho  →  🔊 Suno  →  ✍️ Likho  →  🎨 Rang bharo  →  🧠 Yaad karo
   (Nanhe bachon ke liye "Likho" nahi hota — unki ungliyan abhi taiyar nahi hoti.)
   Bachon ke seekhne ke 3 usool: kai hawas (dekhna+sunna+chhoona), chhoti chhoti baatein, aur dohrana. */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;
  const ICONS = { see: '👀', hear: '🔊', trace: '✍️', colour: '🎨', recall: '🧠' };

  S.lesson = {
    render() {
      return '<div class="lesson"><div class="lesson-top"><button class="icon-btn" data-act="back" aria-label="Wapas">' + UI.icon('back') + '</button>' +
        '<div class="steps" id="l-steps"></div>' + UI.starsChip() + '</div>' +
        '<div class="lesson-main" id="l-main"></div><div class="lesson-foot" id="l-foot"></div></div>';
    },
    mount(root, p) {
      const i = p.i, L = D.LETTERS[i], bada = Store.profile.age === 'bada';
      const steps = bada ? ['see', 'hear', 'trace', 'colour', 'recall'] : ['see', 'hear', 'colour', 'recall'];
      const main = AA.$('#l-main', root), foot = AA.$('#l-foot', root), stepsEl = AA.$('#l-steps', root);
      let si = 0, alive = true, timers = [], tr = null, canNext = false;
      Store.markSeen(i);
      root._kill = () => { alive = false; timers.forEach(clearTimeout); if (tr) tr.destroy(); };

      const later = (fn, ms) => { const t = setTimeout(() => alive && fn(), ms); timers.push(t); return t; };
      const enable = () => { canNext = true; const b = AA.$('[data-act=next]', foot); if (b) { b.disabled = false; b.classList.add('pulse'); } };

      function drawChrome() {
        stepsEl.innerHTML = steps.map((s, k) => '<span class="step-dot ' + (k === si ? 'on' : k < si ? 'done' : '') + '">' + (k < si ? '✓' : ICONS[s]) + '</span>').join('');
        const last = si === steps.length - 1;
        foot.innerHTML = (si > 0 ? '<button class="btn ghost" data-act="prev" aria-label="Pichla">' + UI.icon('back') + '</button>' : '') +
          (last ? '' : '<button class="btn big green" data-act="next" disabled>Aage ' + UI.icon('next') + '</button>');
        canNext = false;
      }
      function go(n) {
        timers.forEach(clearTimeout); timers = [];
        if (tr) { tr.destroy(); tr = null; }
        V.stop();
        si = AA.clamp(n, 0, steps.length - 1);
        drawChrome();
        main.innerHTML = ''; main.scrollTop = 0;
        STEP[steps[si]](main);
      }

      /* ---------- 👀 Dekho ---------- */
      function stepSee(el) {
        const w = L.w;
        let forms = '';
        if (bada) {
          const f = D.forms(L.ch, L.join);
          const cells = L.join ? [['start', 'shuru'], ['mid', 'beech'], ['end', 'aakhir']] : [['end', 'aakhir mein']];
          forms = '<div class="forms">' + cells.map((c) => '<div><span class="ar-big">' + f[c[0]] + '</span><small>' + c[1] + '</small></div>').join('') + '</div>';
        }
        el.innerHTML = '<div class="step-say"><span class="ur">یہ ہے</span></div>' +
          '<button class="letter-card" data-act="say"><span class="ar-big big-letter">' + L.ch + '</span><span class="letter-name">' + L.n + '</span><span class="speak-fab">' + UI.icon('sound') + '</span></button>' +
          '<button class="pic-card" data-act="word"><span class="pe">' + w.e + '</span><span class="pw"><span class="ar-big">' + w.ar + '</span><span class="ur">' + w.ur + '</span><small>' + w.ro + '</small></span></button>' +
          '<div class="cue">💡 ' + AA.esc(L.cue) + '</div>' + forms;
        V.seq([D.T.yehHai, { ar: L.say }, 450, { ar: w.ar }, w]);
        later(enable, 1800);
        UI.bind(el, {
          say() { V.sayAr(L.say); UI.pulse(AA.$('.letter-card', el), 'pulse-once'); },
          word() { V.seq([{ ar: w.ar }, w]); UI.pulse(AA.$('.pic-card', el), 'pulse-once'); }
        });
      }

      /* ---------- 🔊 Suno aur bolo ---------- */
      function stepHear(el) {
        el.innerHTML = '<div class="step-say"><span class="ur">سنو اور بولو</span></div>' +
          '<div class="letter-card" style="max-width:300px"><span class="ar-big big-letter" style="font-size:130px">' + L.ch + '</span><span class="letter-name">' + L.n + '</span></div>' +
          '<div class="echo"><div class="mic-ring" id="mic">🗣️</div><div class="counter-dots" id="cd"><i></i><i></i><i></i></div><div class="q-text" id="hear-t">Suno…</div></div>' +
          '<button class="btn ghost" data-act="again">' + UI.icon('redo') + ' Dobara</button>';
        const mic = AA.$('#mic', el), dots = AA.$$('#cd i', el), t = AA.$('#hear-t', el);
        let run = 0;
        async function loop() {
          const my = ++run; V.stop();
          dots.forEach((d) => d.classList.remove('on'));
          for (let k = 0; k < 3 && alive && my === run; k++) {
            mic.classList.remove('live'); t.textContent = 'Suno…';
            await V.arab(L.say, 0.85);
            if (!alive || my !== run) return;
            dots[k].classList.add('on');
            t.textContent = 'Ab tum bolo! 🗣️'; mic.classList.add('live');
            if (k === 0) await V.word(D.T.abBolo);
            await AA.wait(1500 / (Store.settings.speed || 1));
          }
          if (alive && my === run) { mic.classList.remove('live'); t.textContent = 'Shabash! 👏'; AA.sfx.play('good'); enable(); }
        }
        later(loop, 400);
        later(enable, 6000);
        UI.bind(el, { again() { loop(); } });
      }

      /* ---------- ✍️ Likho  /  🎨 Rang bharo ---------- */
      function stepPaint(el, mode) {
        const trace = mode === 'trace';
        el.innerHTML = '<div class="step-say"><span class="ur">' + (trace ? 'ungli phero — harf bharo' : 'rang bharo') + '</span></div>' +
          '<div class="meter"><i id="pm"></i><b id="pt">0%</b></div>' +
          '<div class="board" id="pb"></div>' +
          (trace ? '' : '<div class="palette" id="pal">' + AA.trace.PALETTE.map((c, k) => '<button class="swatch ' + (k === 4 ? 'on' : '') + '" style="--sw:' + c + '" data-act="sw" data-c="' + c + '" aria-label="Rang"></button>').join('') + '<button class="swatch rainbow" data-act="sw" data-c="rainbow" aria-label="Rainbow"></button></div>') +
          '<div class="tools"><button class="btn ghost small" data-act="clear">' + UI.icon('erase') + ' Saaf</button></div>';
        const meter = AA.$('#pm', el), pt = AA.$('#pt', el);
        let celebrated = false;
        tr = AA.trace.create(AA.$('#pb', el), {
          ch: L.ch, mode, nanha: !bada, color: AA.trace.PALETTE[4],
          onProgress(p) { const v = Math.round(p * 100); meter.style.width = v + '%'; pt.textContent = v + '%'; if (p >= 0.3) enable(); },
          onDone() {
            if (celebrated) return; celebrated = true;
            AA.sfx.play('great'); V.praise(); UI.confetti(AA.$('#pb', el), 24); enable();
            UI.floatText(AA.$('#pb', el), 'Shabash! ⭐', 90, 120, '');
          }
        });
        V.seq([trace ? { ur: 'ungli se harf bharo', hi: 'उँगली से हर्फ़ भरो', ro: 'Ungli se harf bharo' } : { ur: 'اپنی پسند کا رنگ چنو', hi: 'अपनी पसंद का रंग चुनो', ro: 'Apni pasand ka rang chuno' }]);
        later(enable, 25000);
        UI.bind(el, {
          sw(t) { AA.$$('.swatch', el).forEach((b) => b.classList.toggle('on', b === t)); tr.setColor(t.dataset.c); AA.sfx.play('tap'); },
          clear() { tr.clear(); celebrated = false; }
        });
      }

      /* ---------- 🧠 Yaad karo ---------- */
      function stepRecall(el) {
        const nOpt = bada ? 3 : 2, total = 3;
        const types = bada ? ['hear', 'pic', 'hear'] : ['hear', 'hear', 'pic'];
        let r = 0, wrong = 0, locked = false;
        const dots = () => '<div class="dots-row">' + types.map((_, k) => '<i class="' + (k < r ? 'ok' : k === r ? 'cur' : '') + '"></i>').join('') + '</div>';
        function round() {
          locked = false; wrong = 0;
          const type = types[r];
          const opts = AA.letterOpts(i, nOpt, { similar: false });
          const prompt = type === 'hear'
            ? '<button class="listen-btn" data-act="hear" aria-label="Suno">' + UI.icon('sound') + '</button>'
            : '<span class="big">' + L.w.e + '</span>';
          el.innerHTML = '<div class="q-card">' + dots() +
            '<div class="q-text"><span class="ur">' + (type === 'hear' ? 'سنو اور ڈھونڈو' : 'اس کا حرف کون سا؟') + '</span></div>' +
            '<div class="q-prompt ' + (type === 'hear' ? 'listen' : '') + '">' + prompt + '</div>' +
            '<div class="opt-grid" style="--cols:' + nOpt + '">' + opts.map((k) => '<button class="opt" data-act="pick" data-k="' + k + '"><span class="ar-big">' + D.LETTERS[k].ch + '</span></button>').join('') + '</div></div>';
          if (type === 'hear') V.seq([{ ar: L.say }]); else V.seq([{ ar: L.w.ar }, L.w, D.T.kaunSaHarf]);
        }
        async function pick(t) {
          if (locked) return;
          const k = +t.dataset.k;
          if (k === i) {
            locked = true; t.classList.add('right'); AA.sfx.play('good');
            await V.seq([{ ar: L.say }]);
            r++;
            if (r >= total) { await AA.wait(250); if (alive) finish(); } else { await AA.wait(350); if (alive) round(); }
          } else {
            wrong++; t.classList.add('wrong'); AA.sfx.play('oops'); V.seq([D.T.dobara]);
            setTimeout(() => t.classList.remove('wrong'), 500);
            if (wrong >= 2) { const good = AA.$('[data-k="' + i + '"]', el); if (good) good.classList.add('hint'); }
          }
        }
        UI.bind(el, { pick, hear() { V.seq([{ ar: L.say }]); } });
        round();
      }

      async function finish() {
        if (!alive) return;
        const first = Store.finishLetter(i);
        await UI.reward(first ? 3 : 1, 'lesson');
        UI.mission('learn');
        if (!alive) return;
        const res = await UI.celebrate({
          title: 'MashaAllah!', big: '<span class="ar-big" style="font-size:5.5rem">' + L.ch + '</span>',
          sub: L.n + ' seekh liya!', btn: i < 27 ? 'Agla harf' : 'Wapas', btn2: i < 27 ? 'Safar par wapas' : '', voice: [AA.pick(D.PRAISE)]
        });
        if (!alive) return;
        if (res === 'ok' && i < 27) UI.go('lesson', { i: i + 1 }, { replace: true }); else UI.back();
      }

      const STEP = { see: stepSee, hear: stepHear, trace: (e) => stepPaint(e, 'trace'), colour: (e) => stepPaint(e, 'colour'), recall: stepRecall };
      UI.bind(root, {
        next() { if (!canNext) return; AA.sfx.play('whoosh'); go(si + 1); },
        prev() { go(si - 1); }
      });
      go(0);
    },
    leave(root) { if (root && root._kill) root._kill(); }
  };
})();
