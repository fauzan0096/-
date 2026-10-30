/* Aghaaz-e-Asaas Kids — early.js
   "Meri Duniya": rang, jaanwar, ginti, shakal — nanhe bachon ke liye dekho-suno wale card. */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;

  const CATS = {
    rang: { ur: 'رنگ', ro: 'Rang', e: '🎨', items: () => D.COLORS, a: '#FF6FA8', b: '#C75BFF', d: '#9A3AB8', game: 'rang' },
    jaanwar: { ur: 'جانور', ro: 'Jaanwar', e: '🐮', items: () => D.ANIMALS, a: '#7BD65A', b: '#2ED1A0', d: '#3B9B28', game: 'jaanwar' },
    ginti: { ur: 'گنتی', ro: 'Ginti 1–10', e: '🔢', items: () => D.NUMBERS, a: '#FFB020', b: '#FF7A59', d: '#C77700', game: 'ginti' },
    shakal: { ur: 'شکلیں', ro: 'Shakalein', e: '🔷', items: () => D.SHAPES, a: '#3DA9FC', b: '#12B5A6', d: '#2184D6', game: 'shakal' }
  };

  S.early = {
    render() {
      const bada = Store.profile.age === 'bada';
      return UI.topbar({ ur: 'میری دنیا', ro: 'Dekho • Suno • Seekho' }) +
        '<div class="cat-grid">' + Object.keys(CATS).map((k) => {
          const c = CATS[k], seen = (Store.p.early[k] && Store.p.early[k].seen) ? Store.p.early[k].seen.length : 0, tot = c.items().length;
          return '<button class="tile" data-act="cat" data-k="' + k + '" style="--a:' + c.a + ';--b:' + c.b + ';--d:' + c.d + '"><span class="badge">' + seen + '/' + tot + '</span><span class="te">' + c.e + '</span><span class="tt ur">' + c.ur + '</span><span class="ts">' + c.ro + '</span></button>';
        }).join('') + '</div>' +
        (bada ? '' : '<p class="center sub" style="padding:0 20px">Har card dabao — awaaz aayegi 🔊</p>');
    },
    mount(root) { UI.bind(root, { cat(t) { AA.sfx.play('whoosh'); UI.go('cards', { k: t.dataset.k }); } }); }
  };

  function cardHtml(k, it) {
    if (k === 'rang') return '<div class="disc-xl" style="--hex:' + it.hex + '"></div><div class="fu ur">' + it.ur + '</div><div class="fr">' + it.ro + '</div><div class="fen">' + it.en + '</div><div class="things">' + it.things.join(' ') + '</div>';
    if (k === 'jaanwar') return '<div class="fe">' + it.e + '</div><div class="fu ur">' + it.ur + '</div><div class="fr">' + it.ro + '</div><div class="fen">' + it.en + '</div><div class="snd">🔊 ' + it.snd + '</div>';
    if (k === 'ginti') return '<div class="num">' + it.n + '</div><div class="things">' + Array.from({ length: it.n }, () => D.COUNT_THINGS[it.n % D.COUNT_THINGS.length]).join('') + '</div><div class="fu ur">' + it.ur + '</div><div class="fr">' + it.ro + '</div><div class="fen">' + it.en + '</div>';
    const cols = D.COLORS.slice(0, 6);
    return AA.shapeSvg(it, cols[D.SHAPES.indexOf(it) % 6].hex) + '<div class="fu ur">' + it.ur + '</div><div class="fr">' + it.ro + '</div><div class="fen">' + it.en + '</div>';
  }
  function speakCard(k, it) {
    if (k === 'ginti') { const list = []; for (let i = 0; i < it.n; i++) list.push(D.NUMBERS[i], 250); list.push(400, it); return V.seq(list.length > 12 ? [it] : list); }
    if (k === 'jaanwar') return V.seq([it, { lang: 'en', en: it.snd }]);
    return V.seq([it]);
  }

  S.cards = {
    render(p) {
      const c = CATS[p.k];
      return '<div class="lesson">' + UI.topbar({ ur: c.ur, ro: c.ro }) +
        '<div class="cards-wrap"><button class="fcard" id="fc" data-act="say"></button>' +
        '<div class="cards-nav"><button class="btn ghost" data-act="prev" aria-label="Pichla">' + UI.icon('back') + '</button><span class="count" id="fc-n"></span><button class="btn big green" data-act="next" aria-label="Agla">' + UI.icon('next') + '</button></div>' +
        '<button class="btn blue small" data-act="play">🎮 Khelo</button></div></div>';
    },
    mount(root, p) {
      const k = p.k, c = CATS[k], items = c.items();
      const rec = Store.p.early[k] || (Store.p.early[k] = { seen: [], done: false });
      let i = 0;
      function show(speak) {
        const it = items[i];
        const el = AA.$('#fc', root);
        el.innerHTML = cardHtml(k, it); el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
        AA.$('#fc-n', root).textContent = (i + 1) + ' / ' + items.length;
        if (!rec.seen.includes(i)) { rec.seen.push(i); Store.saveSoon(); }
        if (speak) speakCard(k, it);
        if (!rec.done && rec.seen.length >= items.length) { rec.done = true; Store.save(); UI.reward(2, 'early').then(() => UI.mission('learn')); }
      }
      UI.bind(root, {
        say() { speakCard(k, items[i]); AA.sfx.play('pop'); },
        next() { i = (i + 1) % items.length; AA.sfx.play('tap'); show(true); },
        prev() { i = (i + items.length - 1) % items.length; AA.sfx.play('tap'); show(true); },
        play() { UI.go('play', { id: c.game }); }
      });
      show(false);
      setTimeout(() => speakCard(k, items[0]), 450);
    }
  };
})();
