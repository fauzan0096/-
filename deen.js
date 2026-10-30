/* Aghaaz-e-Asaas Kids — deen.js
   Duaein, chhoti surahein, wudu/namaz, achhi baatein.
   Sab awaaz-pehle: bachcha suney, phir dohraaye ("echo"). Parhna zaroori nahi. */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;
  const sp = () => Store.settings.speed || 1;

  /* ========================= DUAEIN ========================= */
  S.duas = {
    render() {
      return UI.topbar({ ur: 'دعائیں', ro: 'Roz ki duaein' }) +
        '<div class="list">' + D.DUAS.map((d) => {
          const k = Store.p.duas[d.id] && Store.p.duas[d.id].known;
          return '<button class="lrow ' + (k ? 'done' : '') + '" data-act="open" data-id="' + d.id + '"><span class="le">' + d.e + '</span><span class="lt"><b class="ur">' + d.ur + '</b><small>' + d.ro + '</small></span><span class="lr">' + (k ? '✅' : '▶') + '</span></button>';
        }).join('') + '</div>';
    },
    mount(root) { UI.bind(root, { open(t) { AA.sfx.play('whoosh'); UI.go('dua', { id: t.dataset.id }); } }); }
  };

  let duaRun = 0;
  S.dua = {
    render(p) {
      const d = D.DUAS.find((x) => x.id === p.id);
      const known = Store.p.duas[d.id] && Store.p.duas[d.id].known;
      return UI.topbar({ ur: d.ur, ro: d.ro }) +
        '<div class="pad col" style="align-items:center"><div class="step-card"><div class="se">' + d.e + '</div>' +
        '<div class="dua-ar ar" id="dua-ar">' + d.parts.map((x, k) => '<span class="part" data-p="' + k + '">' + AA.esc(x) + '</span>').join(' ') + '</div></div>' +
        '<div class="mic-ring" id="dmic" style="width:90px;height:90px;font-size:2.4rem;display:none">🗣️</div>' +
        '<div class="row wrap" style="justify-content:center"><button class="btn big blue" data-act="listen">' + UI.icon('sound') + ' Suno</button>' +
        '<button class="btn big green" data-act="echo">' + UI.icon('mic') + ' Saath bolo</button></div>' +
        '<button class="btn ' + (known ? 'sun' : 'ghost') + ' block" id="dknow" data-act="know">' + (known ? '⭐ Mujhe yaad hai!' : '☆ Mujhe yaad ho gayi') + '</button>' +
        '<div class="note" style="max-width:420px"><b>Matlab (walidain ke liye):</b> ' + AA.esc(d.tr) + '</div></div>';
    },
    mount(root, p) {
      const d = D.DUAS.find((x) => x.id === p.id);
      const rec = Store.p.duas[d.id] || (Store.p.duas[d.id] = { known: false, heard: 0 });
      const parts = AA.$$('.part', root), mic = AA.$('#dmic', root);
      const clear = () => { parts.forEach((x) => x.classList.remove('on')); mic.style.display = 'none'; mic.classList.remove('live'); };
      async function credit() {
        rec.heard++; Store.save();
        if (rec.heard === 1) { await UI.reward(1, 'dua'); }
        UI.mission('deen');
      }
      UI.bind(root, {
        async listen() {
          const my = ++duaRun; clear(); V.stop();
          await V.arab(d.ar, 0.8);
          if (my === duaRun) credit();
        },
        async echo() {
          const my = ++duaRun; V.stop(); clear();
          for (let k = 0; k < d.parts.length && my === duaRun; k++) {
            clear(); parts[k].classList.add('on');
            await V.arab(d.parts[k], 0.8);
            if (my !== duaRun) return;
            mic.style.display = 'grid'; mic.classList.add('live');
            await AA.wait(Math.max(1500, d.parts[k].length * 120) / sp());
          }
          if (my === duaRun) { clear(); AA.sfx.play('good'); V.praise(); credit(); }
        },
        async know(t) {
          rec.known = !rec.known; Store.save();
          t.className = 'btn block ' + (rec.known ? 'sun' : 'ghost'); t.textContent = rec.known ? '⭐ Mujhe yaad hai!' : '☆ Mujhe yaad ho gayi';
          if (rec.known) { AA.sfx.play('great'); UI.confetti(root, 24); if (!rec.rewarded) { rec.rewarded = true; Store.save(); await UI.reward(2, 'dua-known'); } }
        }
      });
    },
    leave() { duaRun++; }
  };

  /* ========================= SURAHEIN ========================= */
  // Awaaz: pehle offline cache, phir internet, warna phone ki awaaz
  AA.audioCache = 'aa-audio-v1';
  async function ayahSrc(url) {
    try {
      if ('caches' in window) { const c = await caches.open(AA.audioCache); const hit = await c.match(url); if (hit) return URL.createObjectURL(await hit.blob()); }
    } catch (e) {}
    return url;
  }
  let ayahAudio = null;
  function stopAyah() { try { if (ayahAudio) { ayahAudio.pause(); ayahAudio = null; } } catch (e) {} }
  async function playAyah(n, idx, text) {
    stopAyah(); V.stop();
    if (!Store.settings.sound) return;
    const url = D.ayahUrl(n, idx + 1);
    const key = text;
    if (V.clips[key]) return V.arab(key);
    const src = await ayahSrc(url);
    return new Promise((resolve) => {
      const a = new Audio(); ayahAudio = a; let done = false;
      const fin = (fallback) => { if (done) return; done = true; clearTimeout(tm); if (fallback) V.arab(text, 0.75).then(resolve); else resolve(); };
      const tm = setTimeout(() => { try { a.pause(); } catch (e) {} fin(true); }, 7000);
      a.onplaying = () => clearTimeout(tm);
      a.onended = () => fin(false);
      a.onerror = () => fin(true);
      a.src = src;
      const pr = a.play(); if (pr && pr.catch) pr.catch(() => fin(true));
    });
  }
  AA.cacheSurahAudio = async function (onProgress) {
    if (!('caches' in window)) throw new Error('no cache');
    const c = await caches.open(AA.audioCache);
    const urls = [];
    D.SURAHS.forEach((s) => s.ayat.forEach((_, i) => urls.push(D.ayahUrl(s.n, i + 1))));
    let ok = 0;
    for (let i = 0; i < urls.length; i++) {
      try { if (!(await c.match(urls[i]))) { const r = await fetch(urls[i], { mode: 'cors' }); if (r.ok) await c.put(urls[i], r); else throw new Error('x'); } ok++; } catch (e) { /* is ayat ko chhod do */ }
      if (onProgress) onProgress(i + 1, urls.length, ok);
    }
    return { ok, total: urls.length };
  };

  S.surahs = {
    render() {
      return UI.topbar({ ur: 'چھوٹی سورتیں', ro: 'Suno aur yaad karo' }) +
        '<div class="list">' + D.SURAHS.map((s) => {
          const k = Store.p.surahs[s.n] && Store.p.surahs[s.n].known;
          return '<button class="lrow ' + (k ? 'done' : '') + '" data-act="open" data-n="' + s.n + '" style="--lc:' + s.color + '33"><span class="le">' + s.e + '</span><span class="lt"><b class="ur">' + s.ur + '</b><small>' + s.ro + ' • ' + s.ayat.length + ' ayat</small></span><span class="lr">' + (k ? '✅' : '▶') + '</span></button>';
        }).join('') + '</div><p class="center sub" style="padding:0 20px">Qari ki awaaz ke liye internet chahiye. Walidain "Parent" hissay se offline bhi kar sakte hain.</p>';
    },
    mount(root) { UI.bind(root, { open(t) { AA.sfx.play('whoosh'); UI.go('surah', { n: +t.dataset.n }); } }); }
  };

  let surahRun = 0;
  S.surah = {
    render(p) {
      const s = D.SURAHS.find((x) => x.n === p.n);
      const known = Store.p.surahs[s.n] && Store.p.surahs[s.n].known;
      return UI.topbar({ ur: s.ur, ro: s.ro }) +
        '<div class="pad col" style="align-items:center">' +
        '<div class="row wrap" style="justify-content:center"><button class="btn blue" data-act="all">' + UI.icon('play') + ' Suno</button><button class="btn green" data-act="echo">' + UI.icon('mic') + ' Dohrao</button><button class="btn ghost" id="hidebtn" data-act="hide">🙈 Chhupao</button></div>' +
        (s.n !== 1 ? '<div class="ar center" style="font-size:1.6rem;color:var(--ink2)">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</div>' : '') +
        '<div class="col" style="width:100%;max-width:460px" id="ayat">' + s.ayat.map((a, i) => '<div class="surah-ayah" data-act="ayah" data-i="' + i + '"><span class="no">' + (s.n === 1 ? i + 1 : i + 1) + '</span><span class="ar">' + AA.esc(a) + '</span></div>').join('') + '</div>' +
        '<button class="btn ' + (known ? 'sun' : 'ghost') + ' block" id="sknow" data-act="know" style="max-width:460px">' + (known ? '⭐ Mujhe yaad hai!' : '☆ Mujhe yaad ho gayi') + '</button>' +
        '<div class="note" style="max-width:460px">' + AA.esc(s.m) + '<br>Qari: Husary (Muallim) — har ayat ruk ruk kar, sikhane ke andaz mein.</div></div>';
    },
    mount(root, p) {
      const s = D.SURAHS.find((x) => x.n === p.n);
      const rec = Store.p.surahs[s.n] || (Store.p.surahs[s.n] = { known: false, heard: 0 });
      const cards = AA.$$('.surah-ayah', root);
      const mark = (i) => cards.forEach((c, k) => c.classList.toggle('on', k === i));
      let hiding = false;
      async function credit() {
        rec.heard++; Store.save();
        if (rec.heard === 1) await UI.reward(2, 'surah');
        UI.mission('deen');
      }
      UI.bind(root, {
        async all() {
          const my = ++surahRun; stopAyah(); V.stop();
          for (let i = 0; i < s.ayat.length && my === surahRun; i++) { mark(i); cards[i].scrollIntoView({ block: 'center', behavior: 'smooth' }); await playAyah(s.n, i, s.ayat[i]); await AA.wait(250); }
          if (my === surahRun) { mark(-1); credit(); }
        },
        async echo() {
          const my = ++surahRun; stopAyah(); V.stop();
          for (let i = 0; i < s.ayat.length && my === surahRun; i++) {
            mark(i); cards[i].scrollIntoView({ block: 'center', behavior: 'smooth' });
            await playAyah(s.n, i, s.ayat[i]);
            if (my !== surahRun) return;
            UI.floatText(root, '🗣️ Ab tum bolo', window.innerWidth / 2 - 70, window.innerHeight * 0.5, 'soft');
            await AA.wait(Math.max(1800, s.ayat[i].length * 110) / sp());
          }
          if (my === surahRun) { mark(-1); AA.sfx.play('good'); V.praise(); credit(); }
        },
        hide(t) { hiding = !hiding; cards.forEach((c) => c.classList.toggle('hide', hiding)); t.classList.toggle('on', hiding); t.innerHTML = hiding ? '👀 Dikhao' : '🙈 Chhupao'; },
        async ayah(t) {
          const i = +t.dataset.i; ++surahRun; mark(i);
          if (hiding) t.classList.remove('hide');
          await playAyah(s.n, i, s.ayat[i]);
          mark(-1);
        },
        async know(t) {
          rec.known = !rec.known; Store.save();
          t.className = 'btn block ' + (rec.known ? 'sun' : 'ghost'); t.textContent = rec.known ? '⭐ Mujhe yaad hai!' : '☆ Mujhe yaad ho gayi';
          if (rec.known) { AA.sfx.play('win'); UI.confetti(root, 30); if (!rec.rewarded) { rec.rewarded = true; Store.save(); await UI.reward(3, 'surah-known'); } }
        }
      });
    },
    leave() { surahRun++; stopAyah(); }
  };

  /* ========================= NAMAZ ========================= */
  S.namaz = {
    render() {
      const n = Store.p.namaz;
      const row = (act, e, ur, ro, done) => '<button class="lrow ' + (done ? 'done' : '') + '" data-act="' + act + '"><span class="le">' + e + '</span><span class="lt"><b class="ur">' + ur + '</b><small>' + ro + '</small></span><span class="lr">' + (done ? '✅' : '▶') + '</span></button>';
      return UI.topbar({ ur: 'نماز', ro: 'Wudu aur Namaz' }) +
        '<div class="list">' + row('wudu', '💧', 'وضو کیسے کریں', 'Wudu kaise karein', n.wudu > 0) + row('namazein', '🕌', 'پانچ نمازیں', 'Panch namazein', n.namazein > 0) + row('postures', '🧎', 'نماز کا طریقہ', 'Namaz ka tareeqa', n.postures > 0) + '</div>' +
        '<div class="note" style="margin:8px 16px">Namaz ke tafseeli masail apne ustad ya alim se seekhein — tareeqay mein fiqh ka farq ho sakta hai. Yahan bachon ke liye sirf bunyadi tasveeri tareeqa hai.</div>';
    },
    mount(root) { UI.bind(root, { wudu() { UI.go('wudu'); }, namazein() { UI.go('namazein'); }, postures() { UI.go('postures'); } }); }
  };

  // chhote "stepper" wale screens ke liye ek hi dhancha
  function stepper(name, titleUr, titleRo, items, cardFn, speakFn, key) {
    S[name] = {
      render() {
        return '<div class="lesson">' + UI.topbar({ ur: titleUr, ro: titleRo }) +
          '<div class="cards-wrap"><div class="dots-row" id="sd"></div><div class="step-card" id="sc" data-act="say"></div>' +
          '<div class="cards-nav"><button class="btn ghost" data-act="prev" aria-label="Pichla">' + UI.icon('back') + '</button><span class="count" id="sn"></span><button class="btn big green" data-act="next" aria-label="Agla">' + UI.icon('next') + '</button></div></div></div>';
      },
      mount(root) {
        let i = 0, maxI = 0, rewarded = Store.p.namaz[key] > 0;
        function show(speak) {
          const el = AA.$('#sc', root); el.innerHTML = cardFn(items[i], i); el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
          AA.$('#sn', root).textContent = (i + 1) + ' / ' + items.length;
          AA.$('#sd', root).innerHTML = items.map((_, k) => '<i class="' + (k < i ? 'ok' : k === i ? 'cur' : '') + '"></i>').join('');
          if (speak) speakFn(items[i]);
        }
        UI.bind(root, {
          say() { speakFn(items[i]); },
          async next() {
            if (i < items.length - 1) { i++; maxI = Math.max(maxI, i); AA.sfx.play('tap'); show(true); }
            else if (!rewarded) { rewarded = true; Store.p.namaz[key] = 1; Store.save(); await UI.reward(3, key); UI.mission('deen'); UI.celebrate({ title: 'MashaAllah!', big: '🕌', sub: titleRo + ' seekh liya', voice: [AA.pick(D.PRAISE)] }); }
            else { AA.sfx.play('win'); UI.toast('Aap ne sab dekh liya ✅'); }
          },
          prev() { if (i > 0) { i--; show(true); } }
        });
        show(false); setTimeout(() => speakFn(items[0]), 400);
      },
      leave() {}
    };
  }
  stepper('wudu', 'وضو', 'Wudu — 8 qadam', D.WUDU,
    (w, i) => '<div class="se">' + w.e + '</div><div class="ur">' + w.ur + '</div>' + (w.cnt ? '<span class="cnt">' + w.cnt + ' baar</span>' : '') + '<div class="sub" style="margin-top:6px">' + w.ro + '</div>' + (w.ar ? '<div class="ar" style="font-size:2rem">' + w.ar + '</div>' : ''),
    (w) => { const list = [w]; if (w.ar) list.push({ ar: w.ar }); if (w.cnt) list.push({ ur: w.cnt === '1' ? 'ایک بار' : w.cnt === '3' ? 'تین بار' : w.cnt, hi: w.cnt === '1' ? 'एक बार' : 'तीन बार', ro: w.cnt + ' baar' }); V.seq(list); }, 'wudu');
  stepper('namazein', 'پانچ نمازیں', 'Panch Namazein', D.NAMAZEIN,
    (n) => '<div class="se">' + n.e + '</div><div class="ur" style="font-size:2.6rem">' + n.ur + '</div><span class="cnt">' + n.rak + ' rakat (fard)</span><div class="sub" style="margin-top:8px">' + n.when + '</div>',
    (n) => V.seq([n, { ur: D.NUMBERS[n.rak - 1].ur + ' رکعت', hi: D.NUMBERS[n.rak - 1].hi + ' रकअत', ro: n.rak + ' rakat' }]), 'namazein');

  // Namaz ke aasan figures
  function fig(id) {
    const body = '#FF7A59', skin = '#FFD9B0', cap = '#2ED1A0';
    const L = (x1, y1, x2, y2, c, w) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || body) + '" stroke-width="' + (w || 12) + '" stroke-linecap="round"/>';
    const H = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="15" fill="' + skin + '" stroke="#2B2250" stroke-width="2.5"/><path d="M' + (x - 15) + ' ' + (y - 3) + ' A15 15 0 0 1 ' + (x + 15) + ' ' + (y - 3) + ' Z" fill="' + cap + '"/>';
    const mat = '<rect x="10" y="172" width="210" height="14" rx="7" fill="#43A047"/>';
    let g = '';
    if (id === 'takbeer') g = L(95, 56, 95, 118) + L(95, 118, 88, 168, '#4B6BFB') + L(95, 118, 104, 168, '#4B6BFB') + L(95, 68, 74, 46) + L(95, 68, 116, 46) + H(95, 38);
    else if (id === 'qiyam') g = L(95, 56, 95, 118) + L(95, 118, 88, 168, '#4B6BFB') + L(95, 118, 104, 168, '#4B6BFB') + L(95, 70, 78, 90) + L(95, 70, 112, 90) + L(78, 90, 112, 90, '#FFD9B0', 8) + H(95, 38);
    else if (id === 'ruku') g = L(60, 100, 134, 100) + L(60, 100, 60, 168, '#4B6BFB') + L(60, 100, 74, 168, '#4B6BFB') + L(126, 102, 64, 134, '#FFD9B0', 9) + H(152, 100);
    else if (id === 'sajda') g = L(76, 112, 94, 168, '#4B6BFB') + L(94, 168, 40, 170, '#4B6BFB') + L(76, 112, 128, 154) + L(128, 154, 150, 172, '#FFD9B0', 9) + H(146, 156);
    else g = L(62, 92, 62, 150) + L(62, 150, 110, 156, '#4B6BFB') + L(110, 156, 50, 168, '#4B6BFB') + L(62, 100, 98, 148, '#FFD9B0', 9) + H(id === 'salam' ? 70 : 62, 72);
    return '<svg class="fig" viewBox="0 0 230 190" aria-hidden="true">' + mat + g + (id === 'salam' ? '<text x="150" y="62" font-size="28">↔️</text>' : '') + '</svg>';
  }
  stepper('postures', 'نماز کا طریقہ', 'Namaz kaise padhein', D.POSTURES,
    (p) => fig(p.id) + '<div class="ur" style="font-size:1.7rem">' + p.ur + '</div><div class="sub">' + p.ro + '</div>' + (p.ar ? '<div class="ar" style="font-size:1.8rem;line-height:1.7">' + p.ar + '</div>' : ''),
    (p) => { const l = [p]; if (p.ar) l.push({ ar: p.ar }); V.seq(l); }, 'postures');

  /* ========================= ACHHI BAATEIN ========================= */
  S.habits = {
    render() {
      const today = Store.habitsToday();
      return UI.topbar({ ur: 'اچھی باتیں', ro: 'Aaj main ne kya kiya?' }) +
        '<p class="center sub" style="padding:0 20px">Jo kaam aaj kiya uspar dabao — sitara milega ⭐</p>' +
        '<div class="list">' + D.HABITS.map((h) => '<button class="habit ' + (today.includes(h.id) ? 'on' : '') + '" data-act="h" data-id="' + h.id + '"><span class="he">' + h.e + '</span><span class="ht"><span class="ur">' + h.ur + '</span><small>' + h.ro + '</small></span><span class="hs">⭐</span></button>').join('') + '</div>';
    },
    mount(root) {
      UI.bind(root, {
        async h(t) {
          const h = D.HABITS.find((x) => x.id === t.dataset.id);
          const on = Store.toggleHabit(h.id);
          t.classList.toggle('on', on);
          if (on) { AA.sfx.play('great'); V.seq(h.ar ? [h, { ar: h.ar }, AA.pick(D.PRAISE)] : [h, AA.pick(D.PRAISE)]); await UI.reward(1, 'habit'); UI.mission('deen'); }
          else AA.sfx.play('tap');
        }
      });
    }
  };
})();
