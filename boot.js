/* Aghaaz-e-Asaas Kids — boot.js : sab kuch shuru karta hai */
(function () {
  'use strict';
  const AA = window.AA, UI = AA.ui, Store = AA.store, V = AA.voice;

  function hideSplash() {
    const s = document.getElementById('splash');
    if (!s) return;
    s.classList.add('hide');
    setTimeout(() => s.remove(), 600);
  }

  function start() {
    document.documentElement.setAttribute('dir', 'rtl'); document.documentElement.setAttribute('lang', 'ur');
    try { const n = document.getElementById('splash-noori'); if (n) n.innerHTML = UI.mascot('happy', 'splash-m'); } catch (e) {}
    try { V.init(); } catch (e) { console.error(e); }
    try { Store.init(); } catch (e) { console.error(e); }
    try { UI.startTimer(); } catch (e) { console.error(e); }
    UI.go(Store.profile ? 'home' : 'welcome', {}, { root: true });
    setTimeout(hideSplash, 700);

    // pehli touch par audio chalu (browser ki shart)
    const unlock = () => { try { AA.sfx.play('tap'); } catch (e) {} window.removeEventListener('pointerdown', unlock); };
    window.addEventListener('pointerdown', unlock, { once: true });

    // install
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); AA.installPrompt = e; });

    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').catch((e) => console.warn('sw', e));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
