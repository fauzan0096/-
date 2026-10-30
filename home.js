/* Aghaaz-e-Asaas Kids — home.js
   Welcome (naya bachcha), bachon ki list, aur Home. */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;

  /* ------------------------- Welcome: naya bachcha ------------------------- */
  S.welcome = {
    render(p) {
      const first = !Store.profiles.length;
      return '<div class="welcome">' + UI.mascot('happy') +
        '<div class="ur">السلام علیکم</div><h1>' + (first ? 'Assalamu Alaikum!' : 'Naya Dost') + '</h1>' +
        '<p class="sub">Bachche ka naam likhein (zaroori nahi), phir tasveer aur umar chunein.</p>' +
        '<div class="col" style="margin-top:14px"><input class="text-in" id="w-name" maxlength="14" placeholder="Naam" autocomplete="off" aria-label="Bachche ka naam">' +
        '<div class="avatars" id="w-av">' + D.AVATARS.map((a, i) => '<button data-act="av" data-v="' + a + '" class="' + (i === 0 ? 'on' : '') + '">' + a + '</button>').join('') + '</div>' +
        '<div class="age-pick" id="w-age"><button data-act="age" data-v="nanha" class="on"><span class="e">🧸</span>Nanha<small>3 – 4 saal</small></button>' +
        '<button data-act="age" data-v="bada" class=""><span class="e">🎒</span>Bada<small>5 – 7 saal</small></button></div>' +
        '<button class="btn big green block" data-act="go">Shuru Karein ' + UI.icon('next') + '</button>' +
        (first ? '' : '<button class="btn ghost block" data-act="back">Wapas</button>') + '</div></div>';
    },
    mount(root) {
      let av = D.AVATARS[0], age = 'nanha';
      UI.bind(root, {
        av(t) { av = t.dataset.v; AA.$$('#w-av button', root).forEach((b) => b.classList.toggle('on', b === t)); AA.sfx.play('tap'); },
        age(t) { age = t.dataset.v; AA.$$('#w-age button', root).forEach((b) => b.classList.toggle('on', b === t)); AA.sfx.play('tap'); },
        go() {
          const id = Store.addProfile({ name: AA.$('#w-name', root).value, avatar: av, age });
          Store.switchProfile(id);
          UI.resetRest();
          UI.go('home', {}, { root: true });
        }
      });
    }
  };

  /* ------------------------- Bachon ki list ------------------------- */
  S.profiles = {
    render() {
      return UI.topbar({ ur: 'کون کھیلے گا؟', ro: 'Kaun khelega?', right: '' }) +
        '<div class="pad"><div class="profile-list">' +
        Store.profiles.map((p) => '<button class="profile-row" data-act="pick" data-id="' + p.id + '"><span class="av">' + p.avatar + '</span><span class="grow"><b style="font-size:1.25rem">' + AA.esc(p.name) + '</b><br><small class="sub">' + (p.age === 'bada' ? '5 – 7 saal' : '3 – 4 saal') + '</small></span>' + UI.icon('next') + '</button>').join('') +
        '</div><button class="btn blue block" data-act="new">+ Naya dost</button></div>';
    },
    mount(root) {
      UI.bind(root, {
        pick(t) { Store.switchProfile(t.dataset.id); UI.resetRest(); UI.go('home', {}, { root: true }); },
        new() { UI.go('welcome'); }
      });
    }
  };

  /* ------------------------- Agla qadam ------------------------- */
  function nextStep() {
    const due = Store.dueList();
    const idx = D.LETTERS.findIndex((_, i) => !Store.isLearned(i));
    if (idx === 0 && !Store.learnedList().length) return { type: 'lesson', i: 0, t: 'Chalo seekhein!', s: 'Pehla harf: ' + D.LETTERS[0].n };
    if (due.length >= 3) return { type: 'review', t: 'Paani do 💧', s: 'Purane harf dohrayein (' + due.length + ')' };
    if (idx >= 0) return { type: 'lesson', i: idx, t: 'Chalo seekhein!', s: 'Agla harf: ' + D.LETTERS[idx].n };
    if (due.length) return { type: 'review', t: 'Paani do 💧', s: 'Dohrayein (' + due.length + ')' };
    return { type: 'games', t: 'Chalo khelein!', s: 'Sab harf seekh liye — MashaAllah!' };
  }
  AA.nextStep = nextStep;

  function tilesFor(age) {
    const T = {
      duniya: { id: 'duniya', ur: 'میری دنیا', ro: 'Rang • Jaanwar • Ginti', e: '🌈', a: '#FFB020', b: '#FF8A3D', d: '#C77700', go: 'early' },
      harf: { id: 'harf', ur: 'حرف سیکھو', ro: 'Qaida — Alif Ba Ta', e: '🔤', a: '#FF7A59', b: '#FF5E7E', d: '#C94430', go: 'learn' },
      khel: { id: 'khel', ur: 'کھیل', ro: 'Games', e: '🎮', a: '#3DA9FC', b: '#5B7CFA', d: '#2358B8', go: 'games' },
      rang: { id: 'rang', ur: 'رنگ بھرو', ro: 'Rang bharo', e: '🎨', a: '#FF6FA8', b: '#C75BFF', d: '#9A3AB8', go: 'art' },
      dua: { id: 'dua', ur: 'دعائیں', ro: 'Roz ki duaein', e: '🤲', a: '#2ED1A0', b: '#12B5A6', d: '#0B7F73', go: 'duas' },
      surah: { id: 'surah', ur: 'چھوٹی سورتیں', ro: 'Chhoti surahein', e: '📖', a: '#8B6CFF', b: '#6A4FDB', d: '#4631A8', go: 'surahs' },
      namaz: { id: 'namaz', ur: 'نماز', ro: 'Wudu aur namaz', e: '🕌', a: '#12B5A6', b: '#2E9BD6', d: '#0B6F88', go: 'namaz' },
      aadat: { id: 'aadat', ur: 'اچھی باتیں', ro: 'Achhi aadatein', e: '💚', a: '#7BD65A', b: '#2ED1A0', d: '#3B9B28', go: 'habits' },
      bagh: { id: 'bagh', ur: 'میرا باغ', ro: 'Darakht aur stickers', e: '🌳', a: '#FFC83D', b: '#7BD65A', d: '#B98A00', go: 'album' }
    };
    const order = age === 'bada'
      ? ['harf', 'khel', 'duniya', 'rang', 'dua', 'surah', 'namaz', 'aadat', 'bagh']
      : ['duniya', 'harf', 'khel', 'rang', 'dua', 'bagh', 'aadat', 'namaz', 'surah'];
    return order.map((k) => T[k]);
  }

  function badge(id) {
    const p = Store.p;
    if (id === 'harf') return Store.learnedList().length + '/28';
    if (id === 'surah') return Object.values(p.surahs).filter((x) => x.known).length + '/' + D.SURAHS.length;
    if (id === 'dua') return Object.values(p.duas).filter((x) => x.known).length + '/' + D.DUAS.length;
    if (id === 'bagh') return p.stickers.length + '/' + D.STICKERS.length;
    if (id === 'aadat') return Store.habitsToday().length + ' aaj';
    return '';
  }

  /* ------------------------- Home ------------------------- */
  let greeted = false;
  S.home = {
    render() {
      const pr = Store.profile, p = Store.p;
      const ns = nextStep();
      const m = Store.missionToday();
      const due = Store.dueCount();
      const say = due >= 3 ? 'Tumhare <b>darakht</b> ko paani chahiye 💧' : 'Aaj kya seekhein? <b>' + AA.esc(pr.name) + '</b>!';
      const week = AA.weekDays().map((d) => '<i class="' + (Store.active(d) ? 'on' : '') + '" title="' + d + '"></i>').join('');
      return '<div class="home-hero">' +
        '<div class="home-bar">' +
          '<button class="kid-chip" data-act="who" aria-label="Bachcha badlein"><span class="av">' + pr.avatar + '</span><b>' + AA.esc(pr.name) + '</b></button>' +
          '<span class="grow"></span>' + UI.starsChip() +
          '<button class="icon-btn sm" data-act="sound" aria-label="Awaaz">' + UI.icon(Store.settings.sound ? 'sound' : 'mute') + '</button>' +
          '<button class="icon-btn sm" data-act="parent" aria-label="Walidain">' + UI.icon('lock') + '</button>' +
        '</div>' +
        '<div class="hero-body"><div class="hero-noori" data-act="noori">' + UI.mascot('happy') + '</div>' +
          '<div class="hero-talk"><div class="bubble-say">' + say + '</div>' +
          '<button class="btn big cta" data-act="cta"><span class="t">' + ns.t + '<small>' + ns.s + '</small></span><span class="go">' + UI.icon('play') + '</span></button></div></div>' +
      '</div>' +
      '<div class="card missions">' +
        [['learn', '🔤', 'Seekho'], ['play', '🎮', 'Khelo'], ['deen', '🤲', 'Deen']].map((x) => '<div class="mis ' + (m[x[0]] ? 'on' : '') + '"><div class="st">' + (m[x[0]] ? '⭐' : x[1]) + '</div>' + x[2] + '</div>').join('') +
      '</div><div class="week" aria-label="Is hafte ke din">' + week + '</div>' +
      '<div class="tiles">' + tilesFor(pr.age).map((t) => {
        const b = badge(t.id);
        return '<button class="tile" data-act="tile" data-go="' + t.go + '" style="--a:' + t.a + ';--b:' + t.b + ';--d:' + t.d + '">' +
          (b ? '<span class="badge">' + b + '</span>' : '') +
          '<span class="te">' + t.e + '</span><span class="tt ur">' + t.ur + '</span><span class="ts">' + t.ro + '</span></button>';
      }).join('') + '</div>';
    },
    mount(root) {
      if (!greeted) { greeted = true; setTimeout(() => V.seq([D.T.salam]), 500); }
      UI.bind(root, {
        who() { UI.go('profiles'); },
        sound() { const on = UI.toggleSound(); root.querySelector('[data-act=sound]').innerHTML = UI.icon(on ? 'sound' : 'mute'); },
        async parent() { if (await UI.parentGate('Walidain ka hissa kholne ke liye')) UI.go('parent'); },
        noori(t) { V.seq([D.T.salam]); const n = t.querySelector('.noori'); n.dataset.mood = 'cheer'; setTimeout(() => (n.dataset.mood = 'happy'), 1400); },
        tile(t) { AA.sfx.play('whoosh'); UI.go(t.dataset.go); },
        cta() {
          const ns = nextStep();
          AA.sfx.play('whoosh');
          if (ns.type === 'lesson') UI.go('lesson', { i: ns.i });
          else if (ns.type === 'review') UI.go('play', { id: 'review' });
          else UI.go('games');
        }
      });
    }
  };
})();
