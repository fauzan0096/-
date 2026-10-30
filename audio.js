/* Aghaaz-e-Asaas Kids — audio.js
   1) Voice: awaaz (walidain ki record ki hui awaaz > phone ki TTS awaaz)
   2) SFX : chhoti chhoti khushi ki awaazein (koi file nahi — WebAudio se bani hain)  */
(function () {
  'use strict';
  const AA = window.AA;

  /* ============================ VOICE ============================ */
  const Voice = (AA.voice = {
    on: true,
    speed: 1,        // parent setting
    base: 0.85,      // umar ke hisaab se (nanha dheere)
    bilingual: false,
    voices: [],
    token: 0,
    clips: {},
    audio: null,
    ready: false
  });

  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    Voice.voices = window.speechSynthesis.getVoices() || [];
  }
  Voice.init = function () {
    if ('speechSynthesis' in window) {
      loadVoices();
      try { window.speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) {}
    }
    // walidain ki recording (IndexedDB) + optional audio/ustad-awaaz.json
    try {
      fetch('audio/ustad-awaaz.json').then((r) => (r.ok ? r.json() : {})).then((j) => { Object.assign(Voice.clips, j || {}); }).catch(() => {});
    } catch (e) {}
    Voice.loadClips();
    Voice.ready = true;
  };

  /* ---------- IndexedDB clips (record.html wala hi format: db 'qa-voice', store 'clips') ---------- */
  function openDb() {
    return new Promise((res, rej) => {
      try {
        const r = indexedDB.open('qa-voice', 1);
        r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains('clips')) r.result.createObjectStore('clips'); };
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      } catch (e) { rej(e); }
    });
  }
  Voice.loadClips = function () {
    return openDb().then((db) => new Promise((res) => {
      const s = db.transaction('clips', 'readonly').objectStore('clips');
      const k = s.getAllKeys(), v = s.getAll();
      v.onsuccess = () => { k.result.forEach((key, i) => { if (v.result[i] && v.result[i].data) Voice.clips[key] = v.result[i].data; }); res(); };
      v.onerror = () => res();
    })).catch(() => {});
  };
  Voice.saveClip = function (key, dataUrl) {
    Voice.clips[key] = dataUrl;
    return openDb().then((db) => new Promise((res) => { const t = db.transaction('clips', 'readwrite'); t.objectStore('clips').put({ data: dataUrl }, key); t.oncomplete = () => res(); t.onerror = () => res(); })).catch(() => {});
  };
  Voice.deleteClip = function (key) {
    delete Voice.clips[key];
    return openDb().then((db) => new Promise((res) => { const t = db.transaction('clips', 'readwrite'); t.objectStore('clips').delete(key); t.oncomplete = () => res(); t.onerror = () => res(); })).catch(() => {});
  };

  /* ---------- awaaz chunna ---------- */
  function findVoice(kind) {
    const list = Voice.voices.length ? Voice.voices : (loadVoices(), Voice.voices);
    const by = (re) => list.find((v) => re.test(v.lang.replace('_', '-')));
    if (kind === 'ar') return by(/^ar/i) || null;
    if (kind === 'ur') return by(/^ur/i) || null;
    if (kind === 'hi') return by(/^hi/i) || null;
    if (kind === 'en') return by(/^en-(IN|GB|US)/i) || by(/^en/i) || null;
    return null;
  }
  Voice.hasUrdu = () => !!findVoice('ur');
  Voice.hasArabic = () => !!findVoice('ar');

  Voice.rate = function (mult) { return AA.clamp(Voice.base * Voice.speed * (mult || 1), 0.5, 1.4); };

  // Quran ke chhote nishan jo TTS ko uljhate hain unhein saaf karo
  Voice.cleanAr = function (t) {
    return String(t)
      .replace(/[ۖ-ۜ۟-۠ۢ-۪ۨ-ۭ]/g, '')
      .replace(/ۡ/g, 'ْ')
      .replace(/[ٰٱ]/g, 'ا')
      .replace(/‍/g, '');
  };

  function tts(text, lang, voice, rate) {
    return new Promise((resolve) => {
      const ss = window.speechSynthesis;
      if (!ss || !text) return resolve();
      let done = false, tm;
      const fin = () => { if (done) return; done = true; clearTimeout(tm); resolve(); };
      try {
        const u = new SpeechSynthesisUtterance(text);
        if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = lang;
        u.rate = rate; u.pitch = 1.08;
        u.onend = fin; u.onerror = fin;
        tm = setTimeout(fin, Math.max(1800, (text.length * 230) / rate) + 1000);
        setTimeout(() => { try { ss.speak(u); } catch (e) { fin(); } }, 40);
      } catch (e) { fin(); }
    });
  }

  function playClip(url) {
    return new Promise((resolve, reject) => {
      try {
        const a = new Audio(url);
        Voice.audio = a;
        a.onended = () => resolve();
        a.onerror = () => reject(new Error('clip'));
        const p = a.play();
        if (p && p.catch) p.catch(reject);
      } catch (e) { reject(e); }
    });
  }

  Voice.stop = function () {
    Voice.token++;
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
    try { if (Voice.audio) { Voice.audio.pause(); Voice.audio = null; } } catch (e) {}
  };

  // Arabic lafz (harf, lafz, dua). Pehle ustad/ammi ki recording, warna TTS.
  Voice.arab = async function (text, mult) {
    if (!Voice.on || !text) return;
    const tok = Voice.token;
    if (Voice.clips[text]) {
      try { await playClip(Voice.clips[text]); return; } catch (e) { /* TTS par jao */ }
    }
    if (tok !== Voice.token) return;
    await tts(Voice.cleanAr(text), 'ar-SA', findVoice('ar'), Voice.rate(mult || 0.85));
  };

  // Urdu/Hindi/Roman jumla. spec = { ur, hi, ro, en }
  Voice.urdu = async function (spec, mult) {
    if (!Voice.on || !spec) return;
    if (typeof spec === 'string') spec = { ro: spec, en: spec };
    if (spec.ar) return Voice.arab(spec.ar, mult);
    const ur = findVoice('ur'), hi = findVoice('hi'), en = findVoice('en');
    const r = Voice.rate(mult || 1);
    if (ur && spec.ur) return tts(spec.ur, 'ur-PK', ur, r);
    if (hi && spec.hi) return tts(spec.hi, 'hi-IN', hi, r);
    if (spec.hi) return tts(spec.hi, 'hi-IN', null, r);   // voice list khali ho to bhi hi-IN try
    return tts(spec.ro || spec.en || '', 'en-IN', en, r);
  };

  Voice.english = async function (text, mult) {
    if (!Voice.on || !text) return;
    return tts(text, 'en-US', findVoice('en'), Voice.rate(mult || 1));
  };

  // Ek item bolo (Urdu), bilingual ho to English bhi
  Voice.word = async function (item, mult) {
    if (!Voice.on) return;
    const tok = Voice.token;
    await Voice.urdu(item, mult);
    if (Voice.bilingual && item.en && tok === Voice.token) { await AA.wait(150); if (tok === Voice.token) await Voice.english(item.en, mult); }
  };

  // Tareeb-war bolo: list mein { ar }, { ur.. }, { en:'..', lang:'en' }, ya number (pause ms)
  Voice.seq = async function (list) {
    if (!Voice.on) return;
    Voice.stop();
    const tok = Voice.token;
    for (const it of list) {
      if (tok !== Voice.token) return;
      if (typeof it === 'number') { await AA.wait(it); continue; }
      if (it.ar) await Voice.arab(it.ar, it.rate);
      else if (it.lang === 'en') await Voice.english(it.en, it.rate);
      else await Voice.word(it, it.rate);
    }
  };

  // Aasaan shortcut: naya bolna shuru karo (purana band)
  Voice.say = function (spec, mult) {
    Voice.stop();
    if (spec.ar) return Voice.arab(spec.ar, mult);
    return Voice.word(spec, mult);
  };
  Voice.sayAr = function (text, mult) { Voice.stop(); return Voice.arab(text, mult); };

  Voice.praise = function () { return Voice.say(AA.pick(AA.data.PRAISE)); };
  Voice.hasClip = (k) => !!Voice.clips[k];

  /* ============================ SFX ============================ */
  const SFX = (AA.sfx = { on: true, ctx: null });
  function ctx() {
    if (!SFX.ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      try { SFX.ctx = new C(); } catch (e) { return null; }
    }
    if (SFX.ctx.state === 'suspended') SFX.ctx.resume().catch(() => {});
    return SFX.ctx;
  }
  function tone(freq, start, dur, type, vol, slideTo) {
    const c = ctx(); if (!c) return;
    const t0 = c.currentTime + start;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.18, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.03);
  }
  SFX.unlock = () => { ctx(); };
  SFX.play = function (name) {
    if (!SFX.on || !Voice.on) return;
    switch (name) {
      case 'tap': tone(520, 0, 0.06, 'triangle', 0.08); break;
      case 'pop': tone(700, 0, 0.12, 'sine', 0.22, 180); tone(1100, 0, 0.05, 'triangle', 0.08, 300); break;
      case 'good': tone(660, 0, 0.14, 'sine', 0.16); tone(880, 0.1, 0.2, 'sine', 0.16); break;
      case 'great': [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.09, 0.22, 'triangle', 0.16)); break;
      case 'oops': tone(300, 0, 0.18, 'sine', 0.12, 210); break;       // narm — daraane wali nahi
      case 'star': tone(1175, 0, 0.1, 'sine', 0.12); tone(1568, 0.08, 0.22, 'sine', 0.12); break;
      case 'whoosh': tone(300, 0, 0.18, 'sawtooth', 0.04, 900); break;
      case 'win': [523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.26, 'triangle', 0.17)); break;
      case 'drop': tone(420, 0, 0.1, 'sine', 0.14, 260); break;
    }
  };

  // Pehli touch par audio ko jagao (browser ki shart)
  window.addEventListener('pointerdown', () => { SFX.unlock(); }, { once: true, passive: true });
})();
