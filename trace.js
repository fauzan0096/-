/* Aghaaz-e-Asaas Kids — trace.js
   Harf par ungli phera kar "bharna" (tracing) aur rang bharna (colouring).
   Ungli sirf harf ke ANDAR rang chhodti hai — bahar ki lakeer nazar nahi aati,
   is liye bachcha kabhi "galat" mehsoos nahi karta. Kitna bhara — woh % se pata chalta hai. */
(function () {
  'use strict';
  const AA = window.AA;
  const FONT = '"Noto Naskh Arabic","Amiri","Traditional Arabic","DejaVu Sans",serif';
  const G = 96; // coverage grid

  AA.trace = {
    PALETTE: ['#FF4D4D', '#FF9A3D', '#FFD23D', '#2ED1A0', '#3DA9FC', '#8B6CFF', '#FF6FA8', '#8B5A2B'],

    /* o: { ch, mode:'trace'|'colour', nanha:bool, color, doneAt, onProgress(pct), onDone() } */
    create(host, o) {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const S = Math.round(host.clientWidth || 340);
      const mk = () => { const c = document.createElement('canvas'); c.width = c.height = Math.round(S * dpr); return c; };
      const view = mk(), raw = mk(), mask = mk(), tmp = mk();
      view.setAttribute('aria-label', 'Likhne ki jagah');
      host.appendChild(view);
      const vx = view.getContext('2d'), rx = raw.getContext('2d'), mx = mask.getContext('2d'), tx = tmp.getContext('2d');
      [vx, rx, mx, tx].forEach((c) => c.setTransform(dpr, 0, 0, dpr, 0, 0));

      const state = { color: o.color || AA.trace.PALETTE[4], rainbow: false, hue: 0, drawing: false, last: null, pct: 0, done: false, alive: true, dirty: true, frame: 0, strokes: 0, covT: 0 };
      const doneAt = o.doneAt || (o.mode === 'colour' ? 0.6 : o.nanha ? 0.5 : 0.62);
      const brush = S * (o.mode === 'colour' ? 0.12 : o.nanha ? 0.14 : 0.1);
      let fs = 100, gx = 0, gy = 0, maskCells = null, maskTotal = 1;

      function layout() {
        const t = document.createElement('canvas').getContext('2d');
        t.font = '700 100px ' + FONT;
        const m = t.measureText(o.ch);
        const l = m.actualBoundingBoxLeft || 0, r = m.actualBoundingBoxRight || m.width, a = m.actualBoundingBoxAscent || 70, d = m.actualBoundingBoxDescent || 20;
        const w = Math.max(1, l + r), h = Math.max(1, a + d);
        const k = Math.min((S * 0.78) / w, (S * 0.74) / h);
        fs = 100 * k;
        gx = S / 2 - ((r - l) / 2) * k;
        gy = S / 2 - ((d - a) / 2) * k;
      }
      function glyph(ctx, mode) {
        ctx.font = '700 ' + fs + 'px ' + FONT;
        ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.direction = 'ltr';
        if (mode === 'fill') ctx.fillText(o.ch, gx, gy); else ctx.strokeText(o.ch, gx, gy);
      }
      function buildMask() {
        mx.clearRect(0, 0, S, S);
        mx.fillStyle = '#000'; glyph(mx, 'fill');
        const small = document.createElement('canvas'); small.width = small.height = G;
        const sx = small.getContext('2d'); sx.drawImage(mask, 0, 0, G, G);
        const d = sx.getImageData(0, 0, G, G).data;
        maskCells = new Uint8Array(G * G); maskTotal = 0;
        for (let i = 0; i < G * G; i++) if (d[i * 4 + 3] > 110) { maskCells[i] = 1; maskTotal++; }
        if (!maskTotal) maskTotal = 1;
      }
      function paint() {
        vx.clearRect(0, 0, S, S);
        vx.fillStyle = document.documentElement.dataset.theme === 'night' ? '#E4E1FF' : '#E8EAFE';
        glyph(vx, 'fill');
        // rang — sirf harf ke andar
        tx.save(); tx.setTransform(1, 0, 0, 1, 0, 0);
        tx.globalCompositeOperation = 'source-over'; tx.clearRect(0, 0, tmp.width, tmp.height);
        tx.drawImage(raw, 0, 0);
        tx.globalCompositeOperation = 'destination-in'; tx.drawImage(mask, 0, 0);
        tx.restore();
        vx.save(); vx.setTransform(1, 0, 0, 1, 0, 0); vx.drawImage(tmp, 0, 0); vx.restore();
        // dotted kinara
        vx.save(); vx.lineWidth = 3; vx.strokeStyle = '#7A68E8'; vx.setLineDash([9, 8]); vx.lineJoin = 'round';
        glyph(vx, 'stroke'); vx.restore();
      }
      function measure() {
        const small = document.createElement('canvas'); small.width = small.height = G;
        const sx = small.getContext('2d'); sx.drawImage(tmp, 0, 0, G, G);
        const d = sx.getImageData(0, 0, G, G).data;
        let c = 0;
        for (let i = 0; i < G * G; i++) if (maskCells[i] && d[i * 4 + 3] > 40) c++;
        const pct = Math.min(1, c / maskTotal);
        state.pct = pct;
        if (o.onProgress) o.onProgress(pct, state);
        if (!state.done && pct >= doneAt) { state.done = true; if (o.onDone) o.onDone(); }
      }
      function loop() {
        state.frame = 0;
        if (!state.alive) return;
        if (state.dirty) { paint(); state.dirty = false; }
        const now = performance.now();
        if (state.needMeasure && now - state.covT > 140) { state.needMeasure = false; state.covT = now; measure(); }
        if (state.drawing || state.dirty || state.needMeasure) state.frame = requestAnimationFrame(loop);
      }
      const kick = () => { if (!state.frame && state.alive) state.frame = requestAnimationFrame(loop); };

      function pos(e) { const r = view.getBoundingClientRect(); return { x: ((e.clientX - r.left) / r.width) * S, y: ((e.clientY - r.top) / r.height) * S }; }
      function col() {
        if (!state.rainbow) return state.color;
        state.hue = (state.hue + 9) % 360;
        return 'hsl(' + state.hue + ',90%,58%)';
      }
      function seg(a, b) {
        rx.strokeStyle = col(); rx.lineWidth = brush; rx.lineCap = 'round'; rx.lineJoin = 'round';
        rx.beginPath(); rx.moveTo(a.x, a.y); rx.lineTo(b.x + 0.01, b.y + 0.01); rx.stroke();
      }
      const down = (e) => { e.preventDefault(); state.drawing = true; try { view.setPointerCapture(e.pointerId); } catch (x) {} state.last = pos(e); seg(state.last, state.last); state.strokes++; state.dirty = state.needMeasure = true; kick(); };
      const move = (e) => { if (!state.drawing) return; e.preventDefault(); const p = pos(e); seg(state.last, p); state.last = p; state.dirty = state.needMeasure = true; kick(); };
      const up = () => { if (!state.drawing) return; state.drawing = false; state.needMeasure = true; state.dirty = true; kick(); };
      view.addEventListener('pointerdown', down);
      view.addEventListener('pointermove', move);
      view.addEventListener('pointerup', up);
      view.addEventListener('pointercancel', up);

      layout(); buildMask(); paint();
      // font der se aaye to dobara naap lo
      if (document.fonts && document.fonts.load) {
        Promise.race([document.fonts.load('700 100px "Noto Naskh Arabic"', o.ch), AA.wait(1500)]).then(() => {
          if (!state.alive) return;
          if (!state.strokes) { layout(); buildMask(); state.dirty = true; kick(); }
        }).catch(() => {});
      }

      return {
        setColor(c) { if (c === 'rainbow') { state.rainbow = true; } else { state.rainbow = false; state.color = c; } },
        clear() { rx.clearRect(0, 0, S, S); state.pct = 0; state.done = false; state.strokes = 0; state.dirty = true; if (o.onProgress) o.onProgress(0, state); kick(); },
        pct: () => state.pct,
        isDone: () => state.done,
        destroy() { state.alive = false; cancelAnimationFrame(state.frame); view.remove(); }
      };
    }
  };
})();
