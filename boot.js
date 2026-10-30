/* Aghaaz-e-Asaas Kids — boot.js : sab kuch shuru karta hai */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, V = AA.voice;

  function hideSplash() {
    const s = document.getElementById('splash');
    if (!s) return;
    s.classList.add('out');
    setTimeout(() => s.remove(), 600);
  }

  // koi galti ho to splash par likh do (taake pata chale), splash hamesha hat jaye
  window.addEventListener('error', (e) => {
    if (AA.booted) return;
    const sp = document.getElementById('splash');
    if (sp) { let d = document.getElementById('boot-err'); if (!d) { d = document.createElement('pre'); d.id = 'boot-err'; d.style.cssText = 'position:absolute;left:12px;right:12px;bottom:16px;font:12px/1.4 monospace;color:#b00020;white-space:pre-wrap;direction:ltr;text-align:left;max-height:40%;overflow:auto;background:#fff;padding:8px;border-radius:8px'; sp.appendChild(d); } d.textContent += (e.message || 'error') + ' @' + (e.filename || '').split('/').pop() + ':' + (e.lineno || '') + '\n'; }
  });
  /* ---------- install popup ---------- */
  function offerInstall() {
    try {
      if (AA.installShown || !AA.booted || !/^https?:$/.test(location.protocol)) return;
      const standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone;
      if (standalone) return;
      const st = AA.lsGet('aa:install', {}) || {};
      if (st.done || (st.later && Date.now() - st.later < 7 * 864e5)) return;
      const cur = UI.cur && UI.cur.name;
      if (cur !== 'home' && cur !== 'welcome') { setTimeout(offerInstall, 8000); return; }
      const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      if (!ios && !AA.installPrompt) return;   // Android/Chrome: browser tayyar ho tab dikhao
      AA.installShown = true;
      const body = ios
        ? '<p class="sub">Safari mein neeche <b>Share</b> (⬆️) dabayein, phir <b>"Add to Home Screen"</b> chunein.</p>'
        : '<p class="sub">Home screen par rakhein — phir app internet ke baghair bhi chalegi.</p>';
      const m = UI.modal('<div class="gate"><div style="font-size:3rem">📲</div><h3>App phone mein rakh lein</h3>' + body +
        '<div class="row" style="justify-content:center;margin-top:12px">' + (ios ? '' : '<button class="btn green" data-i="yes">Install karein</button>') + '<button class="btn ghost" data-i="later">' + (ios ? 'Theek hai' : 'Baad mein') + '</button></div></div>');
      m.el.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-i]'); if (!b) return;
        if (b.dataset.i === 'yes' && AA.installPrompt) {
          try { AA.installPrompt.prompt(); const r = await AA.installPrompt.userChoice; if (r && r.outcome === 'accepted') AA.lsSet('aa:install', { done: 1 }); else AA.lsSet('aa:install', { later: Date.now() }); } catch (x) {}
        } else AA.lsSet('aa:install', { later: Date.now() });
        UI.closeModal(m);
      });
    } catch (e) { console.warn(e); }
  }
  function start() {
    document.documentElement.setAttribute('dir', 'rtl'); document.documentElement.setAttribute('lang', 'ur');
    try { const n = document.getElementById('splash-noori'); if (n) n.innerHTML = UI.mascot('happy', 'splash-m'); } catch (e) {}
    try { V.init(); } catch (e) { console.error(e); }
    try { Store.init(); } catch (e) { console.error(e); }
    try { UI.startTimer(); } catch (e) { console.error(e); }
    try { UI.go(Store.profile ? 'home' : 'welcome', {}, { root: true }); AA.booted = true; } catch (e) { console.error(e); const d = document.getElementById('boot-err'); if (d) d.textContent += 'go: ' + e.message; return; }
    setTimeout(hideSplash, 700);

    // pehli touch par audio chalu (browser ki shart)
    const unlock = () => { try { AA.sfx.play('tap'); } catch (e) {} window.removeEventListener('pointerdown', unlock); };
    window.addEventListener('pointerdown', unlock, { once: true });

    // install
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); AA.installPrompt = e; setTimeout(offerInstall, 3500); });
    window.addEventListener('appinstalled', () => { AA.installPrompt = null; AA.lsSet('aa:install', { done: 1 }); });
    setTimeout(offerInstall, 6000);

    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').catch((e) => console.warn('sw', e));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
