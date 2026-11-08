/* Aghaaz-e-Asaas Kids — duo.js
   "Do dost": do bachche bari badal kar harf pehchanne ka khel khelte hain.
   Koi "haar" nahi — dono ke sitare dikhte hain aur aakhir mein dono ko shabash. */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;

  const ROUNDS = 6;

  S.duo = {
    render() {
      if (Store.profiles.length < 2) {
        return UI.topbar({ ur: 'دو دوست', ro: 'Do dost' }) +
          '<div class="pad col" style="align-items:center;padding-top:18px"><p class="center">Do dost ka khel do bachon ke liye hai. Pehle ek aur dost banayein — dono ka hisaab alag rehta hai.</p><button class="btn big green" data-act="new">+ Naya dost</button></div>';
      }
      return UI.topbar({ ur: 'دو دوست', ro: 'Bari badal kar khelo' }) + '<div class="pad col" id="duo-wrap"></div>';
    },
    mount(root) {
      if (Store.profiles.length < 2) { UI.bind(root, { new() { UI.go('welcome'); } }); return; }
      const two = Store.profiles.slice(0, 2);
      const wrap = AA.$('#duo-wrap', root);
      const letters = AA.pickLetters(ROUNDS, Store.pool(6));
      const score = [0, 0];
      let turn = 0, r = 0, wrong = 0, locked = false;

      function board() {
        return '<div class="row" style="gap:10px;margin-top:6px">' + two.map((c, k) =>
          '<div class="card grow" style="padding:8px 10px;text-align:center;' + (turn === k ? 'border:4px solid var(--c2)' : 'border:4px solid transparent') + '"><span style="font-size:1.9rem">' + c.avatar + '</span><b style="display:block;font-size:.95rem">' + AA.esc(c.name) + '</b><span class="chip">⭐ ' + score[k] + '</span></div>').join('') + '</div>';
      }
      function round() {
        if (r >= letters.length) { finish(); return; }
        const i = letters[r], who = two[turn];
        const nOpt = who.age === 'bada' ? 3 : 2;
        const opts = AA.letterOpts(i, nOpt);
        wrong = 0; locked = false;
        wrap.innerHTML = AA.i18n(board() +
          '<div class="q-card"><div class="q-text"><span class="ur">' + AA.esc(who.name) + ' کی باری</span></div>' +
          '<div class="q-prompt listen"><button class="listen-btn" data-act="hear">' + UI.icon('sound') + '</button></div>' +
          '<div class="opt-grid" style="--cols:' + nOpt + '">' + opts.map((k) => '<button class="opt" data-act="pick" data-k="' + k + '"><span class="ar-big">' + D.LETTERS[k].ch + '</span></button>').join('') + '</div></div>');
        V.seq([{ ar: D.LETTERS[i].say }]);
      }
      async function pick(t) {
        if (locked) return;
        const i = letters[r], k = +t.dataset.k;
        if (k === i) {
          locked = true; t.classList.add('right'); AA.sfx.play('good');
          score[turn]++; r++;
          await V.seq([AA.pick(D.PRAISE)]);
          await AA.wait(450);
          turn = 1 - turn;
          if (wrap.isConnected) round();
        } else {
          wrong++; t.classList.add('wrong'); AA.sfx.play('oops');
          setTimeout(() => t.classList.remove('wrong'), 480);
          if (wrong === 1) V.seq([D.T.dobara]);
          if (wrong >= 2) { const g = AA.$('[data-k="' + i + '"]', wrap); if (g) g.classList.add('hint'); }
        }
      }
      function finish() {
        const msg = score[0] === score[1] ? 'Dono barabar — MashaAllah!' : 'Shabash dono ko!';
        wrap.innerHTML = AA.i18n('<div class="result">' + UI.mascot('cheer') +
          '<h2 class="ur">' + AA.esc(msg) + '</h2>' +
          '<div class="row" style="gap:12px;justify-content:center">' + two.map((c, k) => '<div class="card" style="padding:10px 14px;text-align:center"><span style="font-size:1.8rem">' + c.avatar + '</span><br><b>' + AA.esc(c.name) + '</b><br><span class="chip">⭐ ' + score[k] + '</span></div>').join('') + '</div>' +
          '<button class="btn big green block" data-act="again">' + UI.icon('redo') + ' Phir khelo</button>' +
          '<button class="btn ghost block" data-act="back">Wapas</button></div>');
        AA.sfx.play('win');
        UI.confetti(wrap, 40);
        UI.reward(2, 'duo').then(() => UI.mission('play'));
      }
      UI.bind(wrap, {
        hear() { V.seq([{ ar: D.LETTERS[letters[Math.min(r, letters.length - 1)]].say }]); },
        pick,
        again() { UI.go('duo', {}, { replace: true }); }
      });
      round();
    }
  };
})();
