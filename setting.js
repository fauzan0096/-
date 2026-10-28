'use strict';

const THEMES = ['auto', 'light', 'dark'];
const FONTS = ['normal', 'large', 'small'];

const SETTINGS = {
    theme: lsGet('theme', 'auto'),
    font: lsGet('font_size', 'normal')
};
if (!THEMES.includes(SETTINGS.theme)) SETTINGS.theme = 'auto';
if (!FONTS.includes(SETTINGS.font)) SETTINGS.font = 'normal';

function resolvedTheme() {
    if (SETTINGS.theme !== 'auto') return SETTINGS.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function themeIcon() { return SETTINGS.theme === 'dark' ? '☀️' : SETTINGS.theme === 'light' ? '🌙' : '🌗'; }
function themeLabel() { return SETTINGS.theme === 'dark' ? 'Dark' : SETTINGS.theme === 'light' ? 'Light' : 'Auto'; }
function fontLabel() { return SETTINGS.font === 'large' ? 'Bada' : SETTINGS.font === 'small' ? 'Chhota' : 'Normal'; }
function applyTheme() { document.documentElement.setAttribute('data-theme', resolvedTheme()); updateSettingsUI(); }
function applyFont() { document.documentElement.setAttribute('data-font', SETTINGS.font); updateSettingsUI(); }
function updateSettingsUI() {
    const ti = $('theme-icon'); const tl = $('theme-label'); const fl = $('font-label');
    if (ti) ti.textContent = themeIcon();
    if (tl) tl.textContent = themeLabel();
    if (fl) fl.textContent = fontLabel();
}
function cycleTheme() { const i = THEMES.indexOf(SETTINGS.theme); SETTINGS.theme = THEMES[(i + 1) % THEMES.length]; lsSet('theme', SETTINGS.theme); applyTheme(); toast('Theme: ' + themeLabel()); }
function cycleFont() { const i = FONTS.indexOf(SETTINGS.font); SETTINGS.font = FONTS[(i + 1) % FONTS.length]; lsSet('font_size', SETTINGS.font); applyFont(); toast('Font: ' + fontLabel()); }

function setupSettings() {
    applyTheme();
    applyFont();
    const themeBtn = $('menu-theme'); const fontBtn = $('menu-font');
    if (themeBtn) themeBtn.addEventListener('click', (e) => { e.stopPropagation(); cycleTheme(); });
    if (fontBtn) fontBtn.addEventListener('click', (e) => { e.stopPropagation(); cycleFont(); });
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', () => { if (SETTINGS.theme === 'auto') applyTheme(); });
    else if (mq.addListener) mq.addListener(() => { if (SETTINGS.theme === 'auto') applyTheme(); });
}

(function () {
    document.documentElement.setAttribute('data-theme', resolvedTheme());
    document.documentElement.setAttribute('data-font', SETTINGS.font);
})();

window.addEventListener('DOMContentLoaded', setupSettings);
