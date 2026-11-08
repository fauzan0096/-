# Aghaaz-e-Asaas Kids

3 se 7 saal ke bachon ka Urdu Qaida app — harf, rang, jaanwar, ginti, duaein, surahein, namaz, mashq aur khel. **Poora app offline chalta hai:** koi Google Fonts nahi, koi CDN nahi, qari ki awaaz bhi app ke andar hai.

## Chalane ka tareeqa

Folder kisi static server par rakhein (`python3 -m http.server`, GitHub Pages, koi bhi hosting) aur `index.html` kholein. `file://` se service worker nahi chalta, is liye install aur offline ke liye http(s) zaroori hai.

## Structure

- `index.html` — app ka shell (meta, splash, script tags).
- `app.css` — saari styling, `@font-face` bhi (fonts local hain).
- `util.js`, `i18n.js`, `data.js`, `audio.js`, `store.js`, `ui.js`, `home.js`, `learn.js`, `trace.js`, `lesson.js`, `games.js`, `games2.js`, `early.js`, `art.js`, `deen.js`, `album.js`, `duo.js`, `stories.js`, `parent.js`, `boot.js` — 20 files, isi tarteeb se load hoti hain (i18n sab se pehle, taake lafz turant tarjuma hon).
- `fonts/` — 8 font files (Fredoka, Noto Naskh Arabic, Amiri, Amiri Quran).
- `audio/quran/` — 28 ayat ki mp3 (Husary Muallim), `surah+ayat` ke 6-digit naam se.
- `audio/ustad-awaaz.json` — walidain ki pehle se record ki hui clips (khali `{}` bhi chalega).
- `icons/` — app ka icon: `icon.svg` (asli naqsha, Noori mascot), `icon-maskable.svg` (Android ke gol/round mask ke liye) aur unse bane PNG (`icon-192`, `icon-512`, `icon-maskable-512`, `apple-touch-icon`).
- `manifest.json`, `sw.js` — install aur offline.

## Offline

`sw.js` pehli baar khulte hi app, fonts aur saari ayat cache kar leta hai; uske baad internet ki zaroorat nahi. App files network-first hain (taake update aa jaye), fonts aur audio cache-first.

Naya version dene ke liye `sw.js` mein `VER` badal dein — app khud "Naya version tayyar hai" ki patti dikhayegi.

## Content badalna

Huroof, rang, jaanwar, ginti (1–20), shakal, lafz, **do harfi lafz (JOIN)**, duaein, surahein, namaz aur aadatein sab `data.js` mein hain. Naya harf ya surah add karein to `sw.js` ki `SURAH_AYAT` list aur `audio/quran/` ki file bhi update karein.

## Bachon ke liye jo cheezein andar hain

- **Mashq ke nishan:** trace/colour screen par harf ke andar sabz nuqta aur teer batata hai likhna kahan se shuru hota hai (`trace.js`, `D.letterDir`).
- **Do harfi lafz:** "Jodo" screen — do harf mil kar lafz banta hai (اب، لا، تو…), har harf alag sun kar phir poora lafz.
- **Ginti 1–20:** ginti ke cards aur game mein 20 tak.
- **Do dost:** do bachche bari badal kar harf pehchanne ka khel, dono ke sitare alag (`duo.js`).
- **Aaj ki dua:** home par roz badalne wali dua (din ke hisaab se).
- **Aaj ka dohrai:** jo harf bhoolne wale hain wo home se seedha dohrane ko milte hain.
- **Kamyabi / report ki tasveer:** `UI.cardImage` + `UI.shareImage` se PNG banti hai — WhatsApp par bhej dein ya gallery mein save ho jati hai.
- **Naam bol kar batana:** home ke tile dabane par agla screen apna naam bolta hai (`UI.speakNext`), kyunki chhote bachche padh nahi sakte.
- **Rang bharne ki 16 tasveerein:** masjid, machhli, phool, gubbaray, ghar, titli, chaand, darakht, sooraj, sitara, patang, rocket, bus, kitaab, seb aur dil — har tasveer alag alag hisson mein, ungli se rang bharne ke liye; saath hi 28 huroof ki mashq.
- **Halki music aur naye sound effects:** `audio.js` mein WebAudio se bani music (koi file nahi) aur `tap, pop, good, great, oops, star, whoosh, win, drop, coin, magic, boing, clap, tada` — sab Phone mein hi bante hain, offline.
- **Zubaan ka button har page par:** screen ke kinare par chhota 🌐/RO button — dabate hi paanch zubanon ki list.
- **Kahaniyan:** home par 📖 "کہانیاں" — **10** chhoti kahaniyan (Noori aur chirya, Ammi ki baat, Do dost aur ek seb, Billi ka doodh, Pyasa kauwa, Sher aur chuha, Sach bolne wala Zain, Dada jaan ki madad, Safai ka inaam, Chaand ko salam), har ek 5 lines. Tap par app khud padh kar sunati hai, "Poori kahani" sab lines ek ke baad ek, har line 🎙️ se record bhi ho sakti hai.
- **Har jagah apni awaaz:** har record button par 🎙️ ke saath **"Record"** likha hota hai aur us ke neeche us cheez ka naam (Alif, Sher, ayat 2, kahani ki line…) — taake sab ko saaf samajh aaye ke yeh record ka option hai. Harf, lafz, rang, jaanwar, ginti, shakal, dua, surah ki ayat, wudu/namaz ke qadam, achhi baatein, harkat, darakht ka har phal, do-harfi lafz aur kahani ki har line ke saath. Parent area mein ek hi list se sab record ho sakta hai (Harf / Alfaaz / Rang / Jaanwar / Ginti / Shakal / Duaein / Surah / Namaz / Aadat / Jodo / Kahani).
- **Sahi awaaz:** Arbi lafz Arbi awaaz mein, uske baad us ka matlab chuni hui zubaan mein; Urdu/English/Hindi/Marathi text apni zubaan ki awaaz mein (`Voice.speakText` script dekh kar voice chunta hai).


## Zubaan (languages)

App panch zubanon mein chalti hai: **Roman Urdu** (default), **اردو**, **हिन्दी**, **English**, **मराठी**.

- Badalne ki jagah: har page par kinare wala 🌐 button, Welcome screen par sab se upar, ya Parent area → Settings → Zubaan.
- `i18n.js` mein `AA.LANGS` (zubanein) aur `D` (tarjuma: Roman Urdu lafz → [ur, hi, en, mr]) hai. Naya lafz add karna ho to usi tarteeb se ek line daal dein.
- `AA.t('lafz')` ek lafz ka tarjuma deta hai; `AA.i18n(html)` poori screen ka; `AA.mn(item)` content ka matlab (`data.js` ke `mr`/`hi`/`ro`/`en` fields).
- Urdu mode mein app RTL chalti hai, baqi zubanon mein LTR; harf khud hamesha RTL rehte hain.
- Marathi naqshe `data.js` ke aakhir mein hain (huroof, rang, jaanwar, ginti, shakal, jodne wale lafz, aadatein). Jahan Marathi nahi diya, wahan Hindi/English par chala jata hai.

## Icon

Naqsha sirf SVG mein hai: `icons/icon.svg` (aam) aur `icons/icon-maskable.svg` (Android ke mask ke liye — mascot safe zone ke andar). Inhe badalne ke baad PNG khud ban jate hain:

- GitHub par: `.github/workflows/icons.yml` push par `tools/build-icons.mjs` chalata hai aur chaar PNG (192, 512, maskable 512, apple 180) commit kar deta hai.
- Apne computer par: `npm install --no-save @resvg/resvg-js && node tools/build-icons.mjs`

## GitHub Pages

Settings > Pages > Branch `main`, folder `/ (root)`.
