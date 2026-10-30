/* Aghaaz-e-Asaas Kids — album.js
   Sticker album + "Yaad ka Darakht" (har seekha hua harf ek phal; dohrane se phal pakta hai). */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;

  S.album = {
    render() {
      const have = Store.p.stickers, info = Store.nextStickerInfo();
      const pct = info.done ? 100 : AA.clamp(Math.round(((info.have - info.prev) / (info.need - info.prev)) * 100), 0, 100);
      const grid = D.STICKERS.map((s) => have.includes(s) ? '<div class="stk" data-act="stk" data-s="' + s + '">' + s + '</div>' : '<div class="stk locked">❔</div>').join('');
      return UI.topbar({ ur: 'میرا باغ', ro: 'Mere stickers' }) +
        '<div class="pad" style="padding-bottom:0"><button class="btn big green block" data-act="tree">🌳 Yaad ka Darakht ' + UI.icon('next') + '</button></div>' +
        '<div class="pa progress-sticker" style="margin:6px 16px 0"><div class="row" style="justify-content:space-between"><b>' + have.length + ' / ' + D.STICKERS.length + ' stickers</b><span>⭐ ' + Store.p.stars + (info.done ? '' : ' / ' + info.need) + '</span></div>' +
        '<div class="bar" style="margin-top:8px"><i style="width:' + pct + '%"></i></div>' +
        '<p class="center" style="margin-top:6px">' + (info.done ? 'MashaAllah! Saari album poori 🎉' : 'Agle sticker ke liye ' + Math.max(0, info.need - info.have) + ' ⭐ aur') + '</p></div>' +
        '<div class="stk-grid">' + grid + '</div>';
    },
    mount(root) {
      UI.bind(root, { tree() { AA.sfx.play('whoosh'); UI.go('tree'); }, stk(t) { AA.sfx.play('pop'); UI.pulse(t, 'wob'); t.style.animation = 'wobble .5s'; setTimeout(() => { t.style.animation = ''; }, 520); } });
    }
  };

  /* ---------- Yaad ka Darakht ---------- */
  // 28 phal, canopy ke andar jagah (viewBox 360 x 420)
  const SPOTS = (function () {
    const out = [];
    const rows = [[5, 180, 70, 50], [7, 180, 110, 90], [8, 180, 150, 118], [8, 180, 190, 130]];
    // har row: (kitne, cx, cy, half-width)
    rows.forEach(([n, cx, cy, hw]) => { for (let k = 0; k < n; k++) out.push([cx - hw + (2 * hw * (k + 0.5)) / n, cy + (k % 2 ? 8 : -4)]); });
    return out.slice(0, 28);
  })();
  const FRUIT_COL = ['#FF6FA8', '#FFB020', '#7BD65A', '#3DA9FC', '#C75BFF', '#FF7A59', '#2ED1A0'];

  S.tree = {
    render() {
      const states = D.LETTERS.map((_, i) => Store.letterState(i));
      const cnt = [0, 0, 0, 0]; states.forEach((s) => cnt[s]++);
      const fruits = D.LETTERS.map((L, i) => {
        const st = states[i], [x, y] = SPOTS[i];
        const col = st === 0 ? '#C9D3C0' : st === 1 ? '#9ED86B' : st === 3 ? '#B79B6A' : FRUIT_COL[i % FRUIT_COL.length];
        return '<g class="fruit s' + st + '" data-act="fr" data-i="' + i + '" role="button" aria-label="' + L.n + '">' +
          '<circle cx="' + x + '" cy="' + y + '" r="' + (st === 0 ? 11 : 15) + '" fill="' + col + '" stroke="#2B2250" stroke-opacity=".35" stroke-width="2"/>' +
          (st === 0 ? '' : '<text x="' + x + '" y="' + (y + 7) + '" text-anchor="middle" font-size="19" font-family="Amiri,\'Noto Naskh Arabic\',serif" fill="#2B2250">' + L.ch + '</text>') +
          '</g>';
      }).join('');
      const ripe = cnt[2], growing = cnt[1], thirsty = cnt[3];
      const msg = thirsty ? '💧 ' + thirsty + ' phal ko paani chahiye!' : (ripe + growing + thirsty === 0 ? 'Harf seekho — pehla phal ugega 🌱' : ripe >= 28 ? 'Poora darakht pak gaya! MashaAllah 🎉' : 'Dohrate raho — phal pakte jayenge 🍎');
      return UI.topbar({ ur: 'یاد کا درخت', ro: 'Yaad ka Darakht' }) +
        '<div class="tree-wrap"><svg viewBox="0 0 360 420" role="img" aria-label="Yaad ka darakht">' +
        '<circle cx="300" cy="46" r="26" fill="#FFD84D"/>' +
        '<path d="M160 420 C165 330 170 290 168 240 L192 240 C190 290 196 330 200 420 Z" fill="#9B6B3F"/>' +
        '<ellipse cx="180" cy="130" rx="168" ry="118" fill="#4FBF6A"/><ellipse cx="110" cy="160" rx="90" ry="70" fill="#5ACB74"/><ellipse cx="256" cy="160" rx="90" ry="70" fill="#5ACB74"/>' +
        '<ellipse cx="180" cy="396" rx="150" ry="16" fill="#000" opacity=".06"/>' +
        fruits + '</svg></div>' +
        '<p class="tree-msg"><b>' + msg + '</b></p>' +
        '<div class="row wrap" style="justify-content:center;margin-top:10px"><span class="chip">🍎 ' + ripe + ' paka</span><span class="chip">🌱 ' + growing + ' ug raha</span><span class="chip">🥀 ' + thirsty + ' pyasa</span></div>' +
        '<div class="pad col" style="align-items:center"><button class="btn big blue" data-act="water">💧 Paani do</button></div>';
    },
    mount(root) {
      UI.bind(root, {
        fr(t) {
          const i = +t.dataset.i, L = D.LETTERS[i];
          AA.sfx.play('pop');
          if (Store.letterState(i) === 0) { UI.toast('Yeh harf abhi seekhna hai 🌱'); return; }
          V.seq([{ ar: L.say }]);
          UI.floatText(root, L.n, window.innerWidth / 2 - 30, window.innerHeight * 0.55, 'soft');
        },
        water() { AA.sfx.play('whoosh'); UI.go('play', { id: 'review' }); }
      });
    }
  };
})();
