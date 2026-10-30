/* Aghaaz-e-Asaas Kids — learn.js
   Harf seekhne ka safar (7 manzilein), Alif-Ba-Ta ka gaana, aur Harkat (zabar zer pesh). */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;

  /* ------------------------- Safar (path) ------------------------- */
  S.learn = {
    render() {
      const learned = Store.learnedList();
      const next = D.LETTERS.findIndex((_, i) => !Store.isLearned(i));
      const bada = Store.profile.age === 'bada';
      const manz = D.MANZIL.map((m) => {
        const idx = []; for (let i = m.from; i <= m.to; i++) idx.push(i);
        const done = idx.filter((i) => Store.isLearned(i)).length;
        return '<div class="manzil" style="--mc:' + m.color + '"><div class="manzil-h"><span class="me">' + m.e + '</span><div><b class="ur">' + m.ur + '</b><small>' + m.ro + '</small></div><span class="cnt">' + done + '/' + idx.length + '</span></div>' +
          '<div class="letters-row">' + idx.map((i) => {
            const L = D.LETTERS[i], st = Store.letterState(i);
            return '<button class="lchip ' + (st ? 'done' : '') + (i === next ? ' next' : '') + (st === 3 ? ' thirsty' : '') + '" data-act="letter" data-i="' + i + '" aria-label="' + L.n + '"><span class="ar-big">' + L.ch + '</span>' + (st ? '<span class="tick">' + UI.icon('check') + '</span>' : '') + '</button>';
          }).join('') + '</div>' +
          (done ? '<div class="manzil-f"><button class="btn small green" data-act="review" data-m="' + m.id + '">🧠 Dohrao</button></div>' : '<div style="height:10px"></div>') + '</div>';
      }).join('');
      const harkatOpen = bada && learned.length >= 10;
      return UI.topbar({ ur: 'حرف سیکھو', ro: 'Alif Ba Ta — ' + learned.length + '/28' }) +
        '<button class="song-card" data-act="song"><span class="se">🎵</span><span class="grow"><b style="font-size:1.25rem">Alif Ba Ta ka Gaana</b><br><small style="opacity:.9">Sab huroof suno aur saath bolo</small></span>' + UI.icon('play') + '</button>' +
        manz +
        (bada ? '<button class="card chapter" data-act="harkat" ' + (harkatOpen ? '' : 'style="opacity:.75"') + '><span class="ce">' + (harkatOpen ? '⬆️' : '🔒') + '</span><span class="grow"><b class="ur">زبر زیر پیش</b><b style="font-size:1rem">Zabar • Zer • Pesh</b><span class="lockmsg">' + (harkatOpen ? 'Harf ko awaaz dena seekho' : 'Pehle 10 harf seekh lo, phir yeh khulega') + '</span></span>' + UI.icon('next') + '</button>' : '');
    },
    mount(root) {
      const cur = root.querySelector('.lchip.next');
      if (cur) setTimeout(() => cur.scrollIntoView({ block: 'center', behavior: 'smooth' }), 250);
      UI.bind(root, {
        letter(t) { AA.sfx.play('tap'); UI.go('lesson', { i: +t.dataset.i }); },
        song() { UI.go('song'); },
        review(t) {
          const m = D.MANZIL.find((x) => x.id === +t.dataset.m);
          const ids = []; for (let i = m.from; i <= m.to; i++) if (Store.isLearned(i)) ids.push(i);
          UI.go('play', { id: 'review', letters: ids });
        },
        harkat() {
          if (Store.learnedList().length < 10) { UI.toast('Pehle 10 harf seekh lo 🙂'); V.seq([{ ur: 'پہلے دس حرف سیکھو', hi: 'पहले दस हर्फ़ सीखो', ro: 'Pehle das harf seekho' }]); return; }
          UI.go('harkat');
        }
      });
    }
  };

  /* ------------------------- Alif Ba Ta ka gaana ------------------------- */
  let songRun = 0;
  S.song = {
    render() {
      return UI.topbar({ ur: 'الف با تا', ro: 'Huroof ka gaana' }) +
        '<div class="pad col" style="align-items:center"><div class="step-say">Suno aur saath bolo 🎵</div>' +
        '<div class="letters-row" id="song-row" style="max-width:420px">' + D.LETTERS.map((L, i) => '<div class="lchip" data-sl="' + i + '"><span class="ar-big">' + L.ch + '</span></div>').join('') + '</div>' +
        '<div class="row"><button class="btn big green" data-act="play" id="song-btn">' + UI.icon('play') + ' Shuru</button></div></div>';
    },
    mount(root) {
      let running = false;
      const btn = root.querySelector('#song-btn');
      async function run() {
        const my = ++songRun; running = true;
        btn.innerHTML = UI.icon('close') + ' Ruko';
        for (let i = 0; i < 28 && my === songRun; i++) {
          AA.$$('[data-sl]', root).forEach((c) => c.classList.remove('next'));
          const chip = root.querySelector('[data-sl="' + i + '"]');
          if (chip) { chip.classList.add('next'); chip.scrollIntoView({ block: 'nearest' }); }
          V.stop();
          await V.arab(D.LETTERS[i].say, 0.9);
          await AA.wait(700 / (Store.settings.speed || 1));
        }
        if (my === songRun) {
          running = false; btn.innerHTML = UI.icon('play') + ' Dobara';
          AA.$$('[data-sl]', root).forEach((c) => c.classList.remove('next'));
          const today = AA.today();
          if (Store.p.song !== today) { Store.p.song = today; Store.save(); await UI.reward(2, 'song'); UI.mission('learn'); }
        }
      }
      UI.bind(root, { play() { if (running) { songRun++; running = false; V.stop(); btn.innerHTML = UI.icon('play') + ' Shuru'; AA.$$('[data-sl]', root).forEach((c) => c.classList.remove('next')); } else run(); } });
    },
    leave() { songRun++; }
  };

  /* ------------------------- Harkat ------------------------- */
  S.harkat = {
    render() {
      const seen = Store.p.harkat.seen;
      return UI.topbar({ ur: 'زبر زیر پیش', ro: 'Harkat' }) +
        '<div class="pad col"><p class="center sub">Harf ke upar ya neeche chhota nishan lagta hai — wohi harf ki awaaz badalta hai.</p>' +
        D.HARKAT.map((h) => '<button class="lrow ' + (seen.includes(h.id) ? 'done' : '') + '" data-act="open" data-id="' + h.id + '" style="--lc:' + h.color + '22"><span class="le" style="background:' + h.color + ';color:#fff"><span class="ar-big" style="font-size:2.6rem;line-height:1.5">بَ</span></span><span class="lt"><b class="ur">' + h.ur + '</b><small>' + h.ro + ' — ' + h.cue + '</small></span>' + (seen.includes(h.id) ? '<span class="lr">✅</span>' : '<span class="lr">▶</span>') + '</button>').join('') +
        '</div>';
    },
    mount(root) { UI.bind(root, { open(t) { UI.go('harkatLesson', { id: t.dataset.id }); } }); }
  };

  S.harkatLesson = {
    render(p) {
      const h = D.HARKAT.find((x) => x.id === p.id);
      return UI.topbar({ ur: h.ur, ro: h.ro }) +
        '<div class="pad col" style="align-items:center"><div class="step-say"><span class="ur">' + h.ur + '</span> — ' + h.cue + '</div>' +
        '<button class="letter-card" data-act="say" id="hk-card"><span class="ar-big big-letter" id="hk-ar"></span><span class="letter-name" id="hk-syl"></span><span class="speak-fab">' + UI.icon('sound') + '</span></button>' +
        '<div class="counter-dots" id="hk-dots">' + D.LETTERS.slice(0, 10).map(() => '<i></i>').join('') + '</div>' +
        '<div class="row"><button class="btn ghost" data-act="prev" aria-label="Pichla">' + UI.icon('back') + '</button><button class="btn big green" data-act="next">Agla ' + UI.icon('next') + '</button></div></div>';
    },
    mount(root, p) {
      const h = D.HARKAT.find((x) => x.id === p.id);
      let i = 0, maxSeen = 0, rewarded = Store.p.harkat.seen.includes(h.id);
      const show = (say) => {
        const L = D.LETTERS[i], txt = D.harakatLetter(i, h.mark);
        root.querySelector('#hk-ar').textContent = txt;
        const syl = i === 0 ? h.vow : D.SYL[i] + h.vow;
        root.querySelector('#hk-syl').textContent = syl;
        AA.$$('#hk-dots i', root).forEach((d, k) => d.classList.toggle('on', k <= Math.min(maxSeen, 9)));
        if (say) V.sayAr(txt, 0.8);
      };
      UI.bind(root, {
        say() { V.sayAr(D.harakatLetter(i, h.mark), 0.8); UI.pulse(root.querySelector('#hk-card'), 'pulse-once'); },
        async next() {
          i = (i + 1) % 28; maxSeen = Math.max(maxSeen, i); show(true); AA.sfx.play('tap');
          if (!rewarded && maxSeen >= 9) {
            rewarded = true; Store.p.harkat.seen.push(h.id); Store.save();
            await UI.reward(2, 'harkat'); UI.mission('learn');
            UI.celebrate({ title: 'Shabash!', big: '<span class="ar-big" style="font-size:5rem">بَ بِ بُ</span>', sub: h.ro + ' ke 10 harf sun liye', voice: [AA.pick(D.PRAISE)] });
          }
        },
        prev() { i = (i + 27) % 28; show(true); }
      });
      show(false);
      setTimeout(() => V.seq([h, 300, { ar: D.harakatLetter(0, h.mark) }]), 400);
    }
  };
})();
