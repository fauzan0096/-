/* Aghaaz-e-Asaas Kids — art.js
   "Rang Bharo": 8 tasveerein. Rang chuno, jagah dabao. Rang ka naam bhi bolta hai (rang seekhne ka mauqa). */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;

  const star = (cx, cy, R, r) => {
    let d = '';
    for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (k * Math.PI) / 5, rad = k % 2 ? r : R; d += (k ? 'L' : 'M') + (cx + rad * Math.cos(a)).toFixed(1) + ' ' + (cy + rad * Math.sin(a)).toFixed(1); }
    return '<path d="' + d + 'Z"/>';
  };
  // parts: 'r' = rang bharne wala hissa, 'l' = sirf lakeer
  function build(id, ur, ro, e, parts) {
    let n = 0;
    const svg = parts.map((p) => (p[0] === 'r' ? p[1].replace(/^<(\w+)/, '<$1 data-r="' + n++ + '"') : p[1])).join('');
    return { id, ur, ro, e, svg, n };
  }

  const flowerPetals = [];
  for (let k = 0; k < 6; k++) { const a = (k * Math.PI) / 3 - Math.PI / 2; flowerPetals.push(['r', '<circle cx="' + (100 + 30 * Math.cos(a)).toFixed(1) + '" cy="' + (80 + 30 * Math.sin(a)).toFixed(1) + '" r="19"/>']); }

  const PAGES = [
    build('masjid', 'مسجد', 'Masjid', '🕌', [
      ['r', '<rect x="0" y="0" width="200" height="160"/>'], ['r', '<rect x="0" y="158" width="200" height="42"/>'],
      ['r', star(30, 34, 14, 6)], ['r', star(172, 26, 10, 4.5)],
      ['r', '<rect x="20" y="92" width="24" height="68"/>'], ['r', '<path d="M17 92 L32 64 L47 92 Z"/>'],
      ['r', '<rect x="156" y="92" width="24" height="68"/>'], ['r', '<path d="M153 92 L168 64 L183 92 Z"/>'],
      ['r', '<rect x="52" y="104" width="96" height="56"/>'], ['r', '<path d="M58 104 A42 42 0 0 1 142 104 Z"/>'],
      ['r', '<circle cx="100" cy="52" r="8"/>'], ['r', '<path d="M86 160 V134 A14 14 0 0 1 114 134 V160 Z"/>'],
      ['r', '<circle cx="68" cy="130" r="9"/>'], ['r', '<circle cx="132" cy="130" r="9"/>']
    ]),
    build('machhli', 'مچھلی', 'Machhli', '🐟', [
      ['r', '<rect x="0" y="0" width="200" height="200"/>'],
      ['r', '<path d="M160 200 Q150 170 162 150 Q172 130 160 110 Q184 130 176 156 Q170 176 176 200 Z"/>'],
      ['r', '<path d="M140 100 L184 66 Q176 100 184 134 Z"/>'], ['r', '<path d="M78 70 Q96 36 120 72 Z"/>'],
      ['r', '<ellipse cx="96" cy="100" rx="56" ry="36"/>'], ['r', '<path d="M84 130 Q100 158 118 130 Z"/>'],
      ['r', '<circle cx="62" cy="92" r="7"/>'], ['r', '<circle cx="34" cy="58" r="9"/>'], ['r', '<circle cx="48" cy="34" r="6"/>'], ['r', '<circle cx="22" cy="86" r="5"/>'],
      ['l', '<path class="ol" d="M100 80 q8 8 0 16 M114 84 q8 8 0 16 M86 86 q6 6 0 12"/>']
    ]),
    build('phool', 'پھول', 'Phool', '🌸', [
      ['r', '<rect x="0" y="0" width="200" height="200"/>'], ['r', '<rect x="0" y="162" width="200" height="38"/>'],
      ['r', '<rect x="96" y="100" width="8" height="70"/>'],
      ['r', '<path d="M96 150 Q60 130 54 150 Q70 172 96 160 Z"/>'], ['r', '<path d="M104 140 Q140 118 148 138 Q132 162 104 150 Z"/>']
    ].concat(flowerPetals, [['r', '<circle cx="100" cy="80" r="17"/>']])),
    build('gubbare', 'غبارے', 'Gubbare', '🎈', [
      ['r', '<rect x="0" y="0" width="200" height="200"/>'],
      ['r', '<path d="M20 190 q0 -14 16 -14 q4 -14 22 -10 q16 -6 22 10 q18 0 18 14 z"/>'],
      ['l', '<path class="ol" d="M60 118 Q48 150 62 176 M108 96 Q118 130 104 168 M150 118 Q140 140 152 170"/>'],
      ['r', '<ellipse cx="60" cy="72" rx="30" ry="38"/>'], ['r', '<path d="M54 108 L66 108 L60 118 Z"/>'],
      ['r', '<ellipse cx="110" cy="60" rx="28" ry="36"/>'], ['r', '<path d="M104 94 L116 94 L110 104 Z"/>'],
      ['r', '<ellipse cx="152" cy="84" rx="26" ry="34"/>'], ['r', '<path d="M146 116 L158 116 L152 126 Z"/>']
    ]),
    build('ghar', 'گھر', 'Ghar', '🏠', [
      ['r', '<rect x="0" y="0" width="200" height="200"/>'], ['r', '<circle cx="164" cy="38" r="20"/>'], ['r', '<rect x="0" y="150" width="200" height="50"/>'],
      ['r', '<rect x="128" y="62" width="16" height="30"/>'], ['r', '<rect x="50" y="94" width="100" height="66"/>'], ['r', '<path d="M40 98 L100 46 L160 98 Z"/>'],
      ['r', '<path d="M88 160 L114 160 L124 200 L78 200 Z"/>'], ['r', '<rect x="88" y="120" width="26" height="40" rx="3"/>'],
      ['r', '<rect x="60" y="106" width="20" height="20" rx="2"/>'], ['r', '<rect x="120" y="106" width="20" height="20" rx="2"/>']
    ]),
    build('titli', 'تتلی', 'Titli', '🦋', [
      ['r', '<rect x="0" y="0" width="200" height="200"/>'],
      ['r', '<ellipse cx="68" cy="72" rx="36" ry="28" transform="rotate(-25 68 72)"/>'], ['r', '<ellipse cx="132" cy="72" rx="36" ry="28" transform="rotate(25 132 72)"/>'],
      ['r', '<ellipse cx="74" cy="126" rx="28" ry="22" transform="rotate(20 74 126)"/>'], ['r', '<ellipse cx="126" cy="126" rx="28" ry="22" transform="rotate(-20 126 126)"/>'],
      ['r', '<circle cx="64" cy="70" r="9"/>'], ['r', '<circle cx="136" cy="70" r="9"/>'],
      ['l', '<path class="ol" d="M96 50 Q88 32 78 28 M104 50 Q112 32 122 28"/>'],
      ['r', '<ellipse cx="100" cy="100" rx="9" ry="40"/>'], ['r', '<circle cx="100" cy="56" r="9"/>']
    ]),
    build('chaand', 'چاند ستارے', 'Chaand Sitare', '🌙', [
      ['r', '<rect x="0" y="0" width="200" height="200"/>'],
      ['r', '<path transform="translate(22 14) scale(1.55)" d="M64 10 A40 40 0 1 0 90 66 A32 32 0 1 1 64 10 Z"/>'],
      ['r', star(150, 50, 18, 8)], ['r', star(170, 110, 12, 5.5)], ['r', star(46, 32, 11, 5)], ['r', star(130, 160, 14, 6.5)],
      ['r', '<path d="M0 178 Q50 150 100 172 Q150 190 200 160 L200 200 L0 200 Z"/>']
    ]),
    build('darakht', 'درخت', 'Darakht', '🌳', [
      ['r', '<rect x="0" y="0" width="200" height="200"/>'], ['r', '<circle cx="34" cy="36" r="18"/>'], ['r', '<rect x="0" y="158" width="200" height="42"/>'],
      ['r', '<path d="M88 162 L94 104 L106 104 L112 162 Z"/>'],
      ['r', '<circle cx="66" cy="102" r="28"/>'], ['r', '<circle cx="134" cy="102" r="28"/>'], ['r', '<circle cx="100" cy="76" r="38"/>'],
      ['r', '<circle cx="84" cy="74" r="6"/>'], ['r', '<circle cx="118" cy="90" r="6"/>'], ['r', '<circle cx="64" cy="106" r="6"/>']
    ])
  ];
  AA.artPages = PAGES;
  const SWATCH = ['#E53935', '#FB8C00', '#FDD835', '#43A047', '#1E88E5', '#8E24AA', '#EC407A', '#795548', '#263238', '#FFFFFF', '#81D4FA', '#C5E1A5'];
  const swName = (hex) => D.COLORS.find((c) => c.hex.toLowerCase() === hex.toLowerCase());

  function previewSvg(pg, fills) {
    const el = document.createElement('div'); el.innerHTML = '<svg viewBox="0 0 200 200" class="art-svg-p">' + pg.svg + '</svg>';
    AA.$$('[data-r]', el).forEach((r) => { const f = fills && fills[r.dataset.r]; r.style.fill = f || '#fff'; r.style.stroke = '#2B2250'; r.style.strokeWidth = '3'; r.style.strokeLinejoin = 'round'; });
    AA.$$('.ol', el).forEach((r) => { r.style.fill = 'none'; r.style.stroke = '#2B2250'; r.style.strokeWidth = '3'; });
    return el.innerHTML;
  }

  S.art = {
    render() {
      return UI.topbar({ ur: 'رنگ بھرو', ro: 'Rang Bharo' }) +
        '<div class="art-grid">' + PAGES.map((pg) => {
          const rec = Store.p.art[pg.id] || {}, done = Object.keys(rec).length >= pg.n;
          return '<button class="art-tile" data-act="open" data-id="' + pg.id + '">' + (done ? '<span class="done-tag">✅</span>' : '') + previewSvg(pg, rec) + '<b class="ur">' + pg.ur + '</b></button>';
        }).join('') + '</div>';
    },
    mount(root) { UI.bind(root, { open(t) { AA.sfx.play('whoosh'); UI.go('paint', { id: t.dataset.id }); } }); }
  };

  S.paint = {
    render(p) {
      const pg = PAGES.find((x) => x.id === p.id);
      return UI.topbar({ ur: pg.ur, ro: pg.ro }) +
        '<div class="pad col" style="align-items:center">' +
        '<svg class="art-svg" id="art" viewBox="0 0 200 200">' + pg.svg + '</svg>' +
        '<div class="palette" id="pal" style="max-width:420px">' + SWATCH.map((c, k) => '<button class="swatch ' + (k === 0 ? 'on' : '') + '" style="--sw:' + c + '" data-act="sw" data-c="' + c + '" aria-label="Rang"></button>').join('') + '</div>' +
        '<div class="tools"><button class="btn ghost small" data-act="undo">' + UI.icon('undo') + ' Wapas</button><button class="btn ghost small" data-act="clear">' + UI.icon('erase') + ' Saaf</button></div></div>';
    },
    mount(root, p) {
      const pg = PAGES.find((x) => x.id === p.id);
      const rec = Store.p.art[pg.id] || (Store.p.art[pg.id] = {});
      const svg = AA.$('#art', root), hist = [];
      let color = SWATCH[0], rewarded = Object.keys(rec).length >= pg.n;
      AA.$$('[data-r]', svg).forEach((r) => { if (rec[r.dataset.r]) r.style.fill = rec[r.dataset.r]; });
      svg.addEventListener('click', async (e) => {
        const r = e.target.closest('[data-r]'); if (!r) return;
        const k = r.dataset.r;
        hist.push([k, rec[k] || null]);
        r.style.fill = color; rec[k] = color; AA.sfx.play('pop'); Store.saveSoon();
        if (!rewarded && Object.keys(rec).length >= pg.n) {
          rewarded = true; Store.save(); UI.confetti(root, 30);
          await UI.reward(2, 'art'); UI.mission('play');
          UI.celebrate({ title: 'Kitni sundar tasveer!', big: pg.e, sub: 'Poori tasveer mein rang bhar diya', voice: [AA.pick(D.PRAISE)] });
        }
      });
      UI.bind(root, {
        sw(t) {
          color = t.dataset.c; AA.$$('.swatch', root).forEach((b) => b.classList.toggle('on', b === t)); AA.sfx.play('tap');
          const c = swName(color); if (c) V.say(c);
        },
        undo() {
          const h = hist.pop(); if (!h) return;
          const r = AA.$('[data-r="' + h[0] + '"]', svg);
          if (h[1]) { r.style.fill = h[1]; rec[h[0]] = h[1]; } else { r.style.fill = ''; delete rec[h[0]]; }
          Store.saveSoon();
        },
        clear() { AA.$$('[data-r]', svg).forEach((r) => { r.style.fill = ''; }); Object.keys(rec).forEach((k) => delete rec[k]); hist.length = 0; Store.save(); }
      });
    }
  };
})();
