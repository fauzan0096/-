/* Aghaaz-e-Asaas Kids — parent.js
   Walidain ka hissa: hafta-waar report, settings, ammi/abbu ki awaaz record karna, bachon ka intezam. */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, D = AA.data, V = AA.voice;
  const S = AA.screens;
  const DAYN = ['Ait', 'Pir', 'Mang', 'Budh', 'Jum', 'Jumaa', 'Hafta'];
  const dayShort = (d) => ['Itwar', 'Peer', 'Mangal', 'Budh', 'Jumerat', 'Jumma', 'Hafta'][new Date(d + 'T12:00:00').getDay()].slice(0, 3);

  function report() {
    const days = AA.weekDays();
    const mins = days.map((d) => Math.round(((Store.p.days[d] && Store.p.days[d].sec) || 0) / 60));
    const max = Math.max(10, ...mins);
    const learned = Store.learnedList().length, mastered = Store.masteredList().length;
    const weak = Store.weakList(6);
    const activeDays = days.filter((d) => Store.active(d)).length;
    const duasKnown = Object.values(Store.p.duas).filter((x) => x.known).length;
    const surKnown = Object.values(Store.p.surahs).filter((x) => x.known).length;
    return { days, mins, max, learned, mastered, weak, activeDays, duasKnown, surKnown, total: mins.reduce((a, b) => a + b, 0) };
  }
  function shareText(r) {
    const n = Store.profile.name;
    return '📒 ' + n + ' ki hafta-waar report (Aghaaz-e-Asaas)\n' +
      '• Is hafte ' + r.activeDays + ' din practice, kul ' + r.total + ' minute\n' +
      '• Harf seekhe: ' + r.learned + '/28 (pakke yaad: ' + r.mastered + ')\n' +
      '• Duaein yaad: ' + r.duasKnown + '/' + D.DUAS.length + ', surahein yaad: ' + r.surKnown + '/' + D.SURAHS.length + '\n' +
      '• Sitare: ' + Store.p.stars + ', stickers: ' + Store.p.stickers.length + '\n' +
      (r.weak.length ? '• Dohrane wale harf: ' + r.weak.map((i) => D.LETTERS[i].n).join(', ') + '\n' : '');
  }

  const tg = (id, on) => '<button class="toggle ' + (on ? 'on' : '') + '" data-act="tg" data-k="' + id + '" role="switch" aria-checked="' + !!on + '"></button>';
  const pills = (k, opts, cur) => '<div class="pills">' + opts.map(([v, l]) => '<button class="pill ' + (String(cur) === String(v) ? 'on' : '') + '" data-act="pl" data-k="' + k + '" data-v="' + v + '">' + l + '</button>').join('') + '</div>';

  // record karne ki list: harf, alfaaz, duaein  (key = arabic text; Voice.arab pehle yahi clip bajata hai)
  function recItems(tab) {
    if (tab === 'letters') return D.LETTERS.map((L) => ({ key: L.say, ar: L.ch, nm: L.n }));
    if (tab === 'words') { const seen = {}; return D.LETTERS.filter((L) => L.w && L.w.ar).map((L) => ({ key: L.w.ar, ar: L.w.e, nm: L.w.ro + ' (' + L.w.ar + ')' })).filter((x) => !seen[x.key] && (seen[x.key] = 1)); }
    return D.DUAS.map((d) => ({ key: d.ar, ar: d.e, nm: d.ro }));
  }

  S.parent = {
    render() {
      const r = report(), st = Store.settings, prof = Store.profile;
      const bars = r.days.map((d, i) => '<div class="' + (d === AA.today() ? 'today' : '') + '"><span>' + (r.mins[i] || '') + '</span><i style="height:' + Math.round((r.mins[i] / r.max) * 70) + 'px"></i><span>' + dayShort(d) + '</span></div>').join('');
      return '<div class="parent">' + UI.topbar({ ro: 'Walidain ka hissa', right: '' }) +
        '<div class="pa"><h3>📒 ' + AA.esc(prof.name) + ' — is hafte ki report</h3>' +
        '<div class="kpis"><div class="kpi"><b>' + Store.streak() + '🔥</b><small>din lagatar</small></div><div class="kpi"><b>' + Store.todayMinutes() + '</b><small>minute aaj</small></div><div class="kpi"><b>' + r.learned + '/28</b><small>harf seekhe</small></div>' +
        '<div class="kpi"><b>' + r.mastered + '</b><small>pakke yaad</small></div><div class="kpi"><b>' + r.duasKnown + '/' + D.DUAS.length + '</b><small>duaein</small></div><div class="kpi"><b>' + r.surKnown + '/' + D.SURAHS.length + '</b><small>surahein</small></div></div>' +
        '<div class="bars">' + bars + '</div><p class="center">Minute har din (7 din)</p>' +
        (r.weak.length ? '<p><b>Dohrane wale harf:</b></p><div class="weak">' + r.weak.map((i) => '<span class="ar">' + D.LETTERS[i].ch + '</span>').join('') + '</div><button class="mini" style="margin-top:8px" data-act="rev">💧 Inhein dohrao</button>' : '<p>Abhi koi harf kamzor nahi 👍</p>') +
        '<div class="row wrap" style="margin-top:10px"><button class="mini gray" data-act="share">📤 Report bhejein</button></div></div>' +

        '<div class="pa"><h3>⚙️ Settings</h3>' +
        '<div class="set-row"><div class="lbl"><b>Awaaz</b><small>Awaaz aur effects</small></div>' + tg('sound', st.sound) + '</div>' +
        '<div class="set-row"><div class="lbl"><b>Bolne ki raftaar</b></div>' + pills('speed', [[0.8, 'Dheemi'], [1, 'Normal'], [1.15, 'Tez']], st.speed) + '</div>' +
        '<div class="set-row"><div class="lbl"><b>English bhi bolo</b><small>Urdu ke baad English lafz</small></div>' + tg('bilingual', st.bilingual) + '</div>' +
        '<div class="set-row"><div class="lbl"><b>Rozana waqt ki had</b><small>Poora hone par "aaram" screen</small></div>' + pills('limit', [[0, 'Band'], [10, '10'], [20, '20'], [30, '30'], [45, '45']], st.limit) + '</div>' +
        '<div class="set-row"><div class="lbl"><b>Theme</b></div>' + pills('theme', [['auto', 'Auto'], ['light', 'Din'], ['night', 'Raat']], st.theme) + '</div>' +
        '</div>' +

        '<div class="pa"><h3>🎙️ Ammi/Abbu ki awaaz</h3><p>Bachche apni ammi ya abbu ki awaaz mein seekhein to yaad zyada rehta hai. Neeche kisi bhi cheez par record dabayein — jahan recording ho, wahan phone ki awaaz ki jagah aap ki awaaz bajegi.</p>' +
        '<div class="pills" style="justify-content:flex-start;margin:8px 0">' + [['letters', 'Harf'], ['words', 'Alfaaz'], ['duas', 'Duaein']].map(([k, l]) => '<button class="pill ' + (k === 'letters' ? 'on' : '') + '" data-act="rtab" data-k="' + k + '">' + l + '</button>').join('') + '</div>' +
        '<div id="rec-list"></div>' +
        '<div class="row wrap" style="margin-top:10px"><button class="mini gray" data-act="rexp">⬇️ Backup</button><button class="mini gray" data-act="rimp">⬆️ Wapas laayein</button><input type="file" id="rfile" accept="application/json" hidden></div></div>' +

        '<div class="pa"><h3>📶 Offline aur install</h3><p>Phone ke browser menu se <b>"Add to Home Screen"</b> chunein — phir app internet ke baghair bhi chalegi.</p>' +
        '<button class="mini" data-act="cache">⬇️ Surahon ki qari awaaz offline karein</button><p id="cache-st" class="note" style="display:none"></p></div>' +

        '<div class="pa"><h3>👧 Bachon ka intezam</h3>' +
        '<div class="set-row"><div class="lbl"><b>' + prof.avatar + ' ' + AA.esc(prof.name) + '</b><small>' + (prof.age === 'bada' ? 'Bada (5–7 saal)' : 'Nanha (3–4 saal)') + '</small></div>' + pills('age', [['nanha', 'Nanha'], ['bada', 'Bada']], prof.age) + '</div>' +
        '<div class="row wrap" style="margin-top:8px"><button class="mini gray" data-act="switch">👥 Dost badlein</button><button class="mini gray" data-act="exp">📦 Progress save</button><button class="mini red" data-act="reset">🔄 Progress saaf</button><button class="mini red" data-act="del">🗑️ Hata dein</button></div></div>' +

        '<div class="pa"><h3>📚 Seekhne ka tareeqa</h3>' +
        '<p><b>1. Dekho</b> — harf ka bada rang-birangi nishan aur ek tasveer wala lafz.<br><b>2. Suno</b> — awaaz aur harf ek saath.<br><b>3. Chhoo kar likho</b> — ungli se (5+ saal).<br><b>4. Rang bharo</b> — harf ko apna rang do; rang aur harakat se yaad pakki hoti hai.<br><b>5. Pehchano</b> — galti par sazaa nahi, bas dobara mauqa.</p>' +
        '<p>Har seekha hua harf agle din, phir 2, 4, 8, 16 din baad khud wapas aata hai ("Paani do") — yeh yaad pakki karne ka tareeqa hai.</p>' +
        '<p class="note">Deeni matn (duaein/surahein) walidain ya ustad se zaroor sun kar tasdeeq kar lein. Tafseeli masail ke liye apne alim se rujoo karein.</p></div>' +
        '</div>';
    },
    mount(root) {
      const r = report();
      let tab = 'letters', rec = null, recKey = null;
      const list = AA.$('#rec-list', root);
      function drawList() {
        list.innerHTML = recItems(tab).map((it) => '<div class="rec-row ' + (recKey === it.key ? 'live' : '') + '" data-key="' + AA.esc(it.key) + '"><span class="ar-big ar">' + it.ar + '</span><span class="nm">' + AA.esc(it.nm) + '<small>' + (V.hasClip(it.key) ? '✅ Recording hai' : 'Phone ki awaaz') + '</small></span>' +
          '<button class="mini gray" data-act="rplay" data-key="' + AA.esc(it.key) + '" aria-label="Sunein">▶</button><button class="mini ' + (recKey === it.key ? 'red' : '') + '" data-act="rrec" data-key="' + AA.esc(it.key) + '">' + (recKey === it.key ? '⏹ Ruko' : '⏺ Record') + '</button>' +
          (V.hasClip(it.key) ? '<button class="mini gray" data-act="rdel" data-key="' + AA.esc(it.key) + '" aria-label="Hatayein">✕</button>' : '') + '</div>').join('');
      }
      drawList();
      async function toggleRec(key) {
        if (rec) { rec.stop(); return; }
        if (!navigator.mediaDevices || !window.MediaRecorder) { UI.toast('Is browser mein record nahi ho sakta'); return; }
        let stream;
        try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); } catch (e) { UI.toast('Mic ki ijazat dein'); return; }
        const chunks = []; const mr = new MediaRecorder(stream);
        rec = mr; recKey = key; drawList();
        mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
        mr.onstop = async () => {
          stream.getTracks().forEach((t) => t.stop());
          const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' });
          const url = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(blob); });
          rec = null; recKey = null;
          if (blob.size > 800) { await V.saveClip(key, url); UI.toast('Recording save ✅'); }
          drawList();
        };
        mr.start();
        setTimeout(() => { if (rec === mr && mr.state === 'recording') mr.stop(); }, 8000);
      }
      const setK = (k, v) => { Store.settings[k] = v; Store.saveSettings(); };
      UI.bind(root, {
        tg(t) { const k = t.dataset.k; setK(k, !Store.settings[k]); t.classList.toggle('on', Store.settings[k]); t.setAttribute('aria-checked', Store.settings[k]); if (k === 'sound' && Store.settings.sound) AA.sfx.play('good'); },
        pl(t) {
          const k = t.dataset.k; let v = t.dataset.v;
          if (k === 'age') { Store.updateProfile(Store.profile.id, { age: v }); UI.refresh(); return; }
          if (k === 'speed' || k === 'limit') v = +v;
          setK(k, v);
          AA.$$('[data-act=pl][data-k=' + k + ']', root).forEach((b) => b.classList.toggle('on', b === t));
          if (k === 'speed') V.seq([D.T.shabash || AA.pick(D.PRAISE)]);
        },
        rev() { UI.go('play', { id: 'review' }); },
        async share() {
          const txt = shareText(r);
          try { if (navigator.share) { await navigator.share({ text: txt }); return; } } catch (e) { return; }
          try { await navigator.clipboard.writeText(txt); UI.toast('Report copy ho gayi — WhatsApp mein paste karein'); } catch (e) { prompt('Copy karein:', txt); }
        },
        rtab(t) { tab = t.dataset.k; AA.$$('[data-act=rtab]', root).forEach((b) => b.classList.toggle('on', b === t)); drawList(); },
        rplay(t) { V.sayAr(t.dataset.key); },
        rrec(t) { toggleRec(t.dataset.key); },
        async rdel(t) { await V.deleteClip(t.dataset.key); drawList(); },
        async rexp() {
          const o = {}; Object.keys(V.clips).forEach((k) => { if (V.clips[k] && String(V.clips[k]).startsWith('data:')) o[k] = V.clips[k]; });
          const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(o)], { type: 'application/json' })); a.download = 'ustad-awaaz.json'; a.click();
        },
        rimp() { AA.$('#rfile', root).click(); },
        async cache() {
          const st = AA.$('#cache-st', root); st.style.display = 'block'; st.textContent = 'Download ho raha hai…';
          try { const o = await AA.cacheSurahAudio((i, n) => { st.textContent = 'Download: ' + i + ' / ' + n; }); st.textContent = o.ok === o.total ? '✅ Sab surahein offline ho gayin' : '⚠️ ' + o.ok + '/' + o.total + ' mil sakeen. Internet check karke dobara koshish karein.'; }
          catch (e) { st.textContent = 'Is browser mein offline cache nahi chalta.'; }
        },
        switch() { UI.go('profiles'); },
        exp() {
          const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([Store.exportProfile()], { type: 'application/json' })); a.download = 'progress-' + Store.profile.name + '.json'; a.click();
        },
        reset() {
          const m = UI.modal('<div class="gate"><h3>Progress saaf karein?</h3><p class="sub">Sitare, stickers aur seekhe hue harf mita diye jayenge.</p><div class="row" style="justify-content:center;margin-top:12px"><button class="btn red" data-y="1">Haan, saaf</button><button class="btn ghost" data-y="0">Nahi</button></div></div>');
          m.el.addEventListener('click', (e) => { const b = e.target.closest('[data-y]'); if (!b) return; if (b.dataset.y === '1') { Store.resetProgress(); UI.toast('Saaf ho gaya'); UI.refresh(); } UI.closeModal(m); });
        },
        del() {
          const m = UI.modal('<div class="gate"><h3>' + AA.esc(Store.profile.name) + ' ko hata dein?</h3><p class="sub">Yeh wapas nahi aayega.</p><div class="row" style="justify-content:center;margin-top:12px"><button class="btn red" data-y="1">Haan, hata do</button><button class="btn ghost" data-y="0">Nahi</button></div></div>');
          m.el.addEventListener('click', (e) => {
            const b = e.target.closest('[data-y]'); if (!b) return;
            UI.closeModal(m);
            if (b.dataset.y === '1') { Store.deleteProfile(Store.profile.id); if (Store.profiles.length) UI.go('profiles', {}, { root: true }); else UI.go('welcome', {}, { root: true }); }
          });
        }
      });
      AA.$('#rfile', root).addEventListener('change', async (e) => {
        const f = e.target.files[0]; if (!f) return;
        try { const j = JSON.parse(await f.text()); let n = 0; for (const k of Object.keys(j)) { if (String(j[k]).startsWith('data:')) { await V.saveClip(k, j[k]); n++; } } UI.toast(n + ' recording wapas aa gayin'); drawList(); }
        catch (err) { UI.toast('File sahi nahi hai'); }
      });
    },
    leave() { V.stop(); }
  };
})();
