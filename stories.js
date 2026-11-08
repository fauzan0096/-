/* Aghaaz-e-Asaas Kids — stories.js
   Chhoti kahaniyan: har line bachche ki zubaan mein likhi hai aur TTS usi
   zubaan mein padhta hai. Ammi/abbu har line 🎙️ se apni awaaz mein bhi record kar sakte hain. */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;

  S.stories = {
    render() {
      return UI.topbar({ ur: 'کہانیاں', ro: 'Chhoti kahaniyan' }) +
        '<p class="center sub" style="padding:0 20px">Har kahani paanch chhoti lines ki hai. 🔊 dabao to app khud padh kar sunayegi.</p>' +
        '<div class="list">' + D.STORIES.map((st) => {
          const done = Store.p.story && Store.p.story[st.id];
          return '<button class="lrow ' + (done ? 'done' : '') + '" data-act="open" data-id="' + st.id + '" style="--lc:' + st.color + '33"><span class="le">' + st.e + '</span><span class="lt"><b class="ur">' + AA.esc(AA.mn(st.title)) + '</b><small>' + st.lines.length + ' lines</small></span><span class="lr">' + (done ? '✅' : '▶') + '</span></button>';
        }).join('') + '</div>';
    },
    mount(root) { UI.bind(root, { open(t) { AA.sfx.play('whoosh'); UI.go('story', { id: t.dataset.id }); } }); }
  };

  let storyRun = 0;
  S.story = {
    render(p) {
      const st = D.STORIES.find((x) => x.id === p.id);
      return '<div class="lesson">' + UI.topbar({ ur: 'کہانی', ro: AA.mn(st.title) }) +
        '<div class="cards-wrap">' +
        '<div class="story-card" id="st-c" data-act="say"></div>' +
        '<div class="cards-nav"><button class="btn ghost" data-act="prev" aria-label="Pichla">' + UI.icon('back') + '</button><span class="count" id="st-n"></span><button class="btn big green" data-act="next" aria-label="Agla">' + UI.icon('next') + '</button></div>' +
        '<button class="btn blue" data-act="all">' + UI.icon('play') + ' Poori kahani</button>' +
        '</div></div>';
    },
    mount(root, p) {
      const st = D.STORIES.find((x) => x.id === p.id);
      let i = 0;
      const card = AA.$('#st-c', root), num = AA.$('#st-n', root);
      function show(speak) {
        const ln = st.lines[i];
        const txt = AA.mn(ln);
        card.innerHTML = '<div class="story-em">' + (ln.e || st.e) + '</div><p class="story-tx" dir="auto">' + AA.esc(txt) + '</p>' + UI.recBtn(txt, String(i + 1));
        AA.$('#st-n', root).textContent = (i + 1) + ' / ' + st.lines.length;
        if (speak) V.speakText(txt);
      }
      async function all() {
        const my = ++storyRun;
        const texts = st.lines.map((x) => AA.mn(x));
        await V.readLines(texts, (k) => {
          if (my !== storyRun) return;
          i = k; show(false);
        });
        if (my !== storyRun) return;
        AA.$('#st-n', root).textContent = st.lines.length + ' / ' + st.lines.length;
        reward();
      }
      function reward() {
        if (!Store.p.story) Store.p.story = {};
        if (Store.p.story[st.id]) return;
        Store.p.story[st.id] = 1; Store.save();
        AA.sfx.play('tada');
        UI.confetti(root, 26);
        UI.reward(2, 'story').then(() => UI.mission('learn'));
      }
      UI.bind(root, {
        say() { V.speakText(AA.mn(st.lines[i])); },
        next() {
          if (i < st.lines.length - 1) { i++; AA.sfx.play('tap'); show(true); }
          else { AA.sfx.play('win'); reward(); UI.toast('Kahani poori! 🌟'); }
        },
        prev() { if (i > 0) { i--; AA.sfx.play('tap'); show(true); } },
        all
      });
      show(true);
    },
    leave() { storyRun++; }
  };
})();
