# Aghaaz-e-Asaas Kids (3–7 saal)

## Chalane ka tareeqa
- Folder ko kisi bhi static hosting par rakhein (GitHub Pages, Netlify) ya local: `python3 -m http.server` phir `http://localhost:8000`.
- HTTPS par kholne se "Add to Home Screen" aur offline (service worker) chalta hai.
- Fonts Google Fonts se aate hain. Poora offline chahiye to Fredoka, Noto Naskh Arabic, Amiri, Amiri Quran `fonts/` mein rakh kar `@font-face` se jodein.

## Structure
`js/` — util, data (harf, duaein, surahein...), audio (awaaz), store (progress + yaad ka nizam), ui, home, learn, trace, lesson, games, games2, early, art, deen, album, parent, boot.
`sw.js` — offline cache (version badalne par `VER` barhayein). `manifest.json`, `icons/`.

## Awaaz
Ammi/Abbu ki recording (Parent > Awaaz) > phone ki TTS. Quran ki ayat ki awaaz everyayah.com (Husary Muallim) se; Parent mein "offline karein" se cache hoti hai.

## Zaroori
Deeni matn (duaein, surahein, namaz ka tareeqa) kisi alim/ustad se tasdeeq karwa lein release se pehle.

## GitHub Pages par lagana
1. Repo ki purani saari files hata dein (ya naya repo banayein).
2. Is zip ke **andar ki** files repo ke root par daalein (index.html root par honi chahiye).
3. Repo > Settings > Pages > Branch: main, folder: / (root) > Save.
4. Kuch minute baad `https://<naam>.github.io/<repo>/` par app khulegi. Phone mein "Add to Home Screen" karein.
