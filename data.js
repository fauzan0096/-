/* Aghaaz-e-Asaas Kids — data.js
   Bachon ke liye saara content: huroof, rang, jaanwar, ginti, shakal, duaein, surahein, namaz, achhi baatein.
   Har cheez ke saath ur (Urdu), hi (Hindi — awaaz ke liye backup), ro (Roman), e (emoji) hai.
   NOTE: Deeni matn (Quran/dua) ko kisi Alim/ustad se ek baar zaroor check karwa lein. */
(function () {
  'use strict';
  const D = (window.AA.data = window.AA.data || {});

  /* ---------------------------------------------------------
     28 HUROOF
     ch=harf, n=naam (Roman), say=Arabic awaaz ka lafz, join=agle harf se judta hai?
     cue=shakal ki pehchaan (walidain ke liye), w=tasveer wala lafz
     --------------------------------------------------------- */
  D.LETTERS = [
    { ch: 'ا', n: 'Alif', say: 'ألف', join: false, cue: 'Seedhi khadi lakeer — "1" jaisa', w: { ar: 'أَسَد', ur: 'شیر', hi: 'शेर', ro: 'Sher', e: '🦁' } },
    { ch: 'ب', n: 'Ba', say: 'باء', join: true, cue: 'Kashti ⛵ — neeche 1 nuqta', w: { ar: 'بَطَّة', ur: 'بطخ', hi: 'बतख़', ro: 'Batakh', e: '🦆' } },
    { ch: 'ت', n: 'Ta', say: 'تاء', join: true, cue: 'Kashti ⛵ — upar 2 nuqte', w: { ar: 'تُفَّاح', ur: 'سیب', hi: 'सेब', ro: 'Seb', e: '🍎' } },
    { ch: 'ث', n: 'Sa', say: 'ثاء', join: true, cue: 'Kashti ⛵ — upar 3 nuqte', w: { ar: 'ثَعْلَب', ur: 'لومڑی', hi: 'लोमड़ी', ro: 'Lomri', e: '🦊' } },
    { ch: 'ج', n: 'Jeem', say: 'جيم', join: true, cue: 'Pait wala — neeche 1 nuqta', w: { ar: 'جَمَل', ur: 'اونٹ', hi: 'ऊँट', ro: 'Oont', e: '🐪' } },
    { ch: 'ح', n: 'Bari Ha', say: 'حاء', join: true, cue: 'Jeem jaisa — koi nuqta nahi', w: { ar: 'حِصَان', ur: 'گھوڑا', hi: 'घोड़ा', ro: 'Ghora', e: '🐴' } },
    { ch: 'خ', n: 'Kha', say: 'خاء', join: true, cue: 'Jeem jaisa — upar 1 nuqta', w: { ar: 'خَرُوف', ur: 'بھیڑ', hi: 'भेड़', ro: 'Bher', e: '🐑' } },
    { ch: 'د', n: 'Daal', say: 'دال', join: false, cue: 'Chhota darwaza 🚪 — nuqta nahi', w: { ar: 'دَجَاجَة', ur: 'مرغی', hi: 'मुर्गी', ro: 'Murghi', e: '🐔' } },
    { ch: 'ذ', n: 'Zaal', say: 'ذال', join: false, cue: 'Darwaza 🚪 — upar 1 nuqta', w: { ar: 'ذُرَة', ur: 'مکئی', hi: 'भुट्टा', ro: 'Makai', e: '🌽' } },
    { ch: 'ر', n: 'Ra', say: 'راء', join: false, cue: 'Jhuki hui dum — nuqta nahi', w: { ar: 'رِيشَة', ur: 'پر', hi: 'पंख', ro: 'Par', e: '🪶' } },
    { ch: 'ز', n: 'Za', say: 'زاي', join: false, cue: 'Jhuki hui dum — upar 1 nuqta', w: { ar: 'زَرَافَة', ur: 'زرافہ', hi: 'ज़राफ़ा', ro: 'Zarafa', e: '🦒' } },
    { ch: 'س', n: 'Seen', say: 'سين', join: true, cue: 'Teen daant 🦷 — nuqta nahi', w: { ar: 'سَمَكَة', ur: 'مچھلی', hi: 'मछली', ro: 'Machhli', e: '🐟' } },
    { ch: 'ش', n: 'Sheen', say: 'شين', join: true, cue: 'Teen daant 🦷 — upar 3 nuqte', w: { ar: 'شَمْس', ur: 'سورج', hi: 'सूरज', ro: 'Suraj', e: '☀️' } },
    { ch: 'ص', n: 'Saad', say: 'صاد', join: true, cue: 'Gol pait aur dum — nuqta nahi', w: { ar: 'صَقْر', ur: 'باز', hi: 'बाज़', ro: 'Baaz', e: '🦅' } },
    { ch: 'ض', n: 'Zaad', say: 'ضاد', join: true, cue: 'Saad jaisa — upar 1 nuqta', w: { ar: 'ضِفْدَع', ur: 'مینڈک', hi: 'मेंढक', ro: 'Mendhak', e: '🐸' } },
    { ch: 'ط', n: 'Toay', say: 'طاء', join: true, cue: 'Gol pait aur khadi lakeer', w: { ar: 'طَائِر', ur: 'چڑیا', hi: 'चिड़िया', ro: 'Chirya', e: '🐦' } },
    { ch: 'ظ', n: 'Zoay', say: 'ظاء', join: true, cue: 'Toay jaisa — upar 1 nuqta', w: { ar: 'ظَبْي', ur: 'ہرن', hi: 'हिरन', ro: 'Hiran', e: '🦌' } },
    { ch: 'ع', n: 'Ain', say: 'عين', join: true, cue: 'Aankh 👁️ jaisa — nuqta nahi', w: { ar: 'عِنَب', ur: 'انگور', hi: 'अंगूर', ro: 'Angoor', e: '🍇' } },
    { ch: 'غ', n: 'Ghain', say: 'غين', join: true, cue: 'Ain jaisa — upar 1 nuqta', w: { ar: 'غَيْمَة', ur: 'بادل', hi: 'बादल', ro: 'Baadal', e: '☁️' } },
    { ch: 'ف', n: 'Fa', say: 'فاء', join: true, cue: 'Gol sar — upar 1 nuqta', w: { ar: 'فِيل', ur: 'ہاتھی', hi: 'हाथी', ro: 'Hathi', e: '🐘' } },
    { ch: 'ق', n: 'Qaaf', say: 'قاف', join: true, cue: 'Gol sar — upar 2 nuqte', w: { ar: 'قَلَم', ur: 'قلم', hi: 'क़लम', ro: 'Qalam', e: '✏️' } },
    { ch: 'ك', n: 'Kaaf', say: 'كاف', join: true, cue: 'Chhoti kursi 🪑 jaisa', w: { ar: 'كِتَاب', ur: 'کتاب', hi: 'किताब', ro: 'Kitaab', e: '📖' } },
    { ch: 'ل', n: 'Laam', say: 'لام', join: true, cue: 'Lambi lakeer, neeche se jhuki', w: { ar: 'لَيْمُون', ur: 'لیموں', hi: 'नींबू', ro: 'Nimbu', e: '🍋' } },
    { ch: 'م', n: 'Meem', say: 'ميم', join: true, cue: 'Chhota gol sar aur dum', w: { ar: 'مَوْز', ur: 'کیلا', hi: 'केला', ro: 'Kela', e: '🍌' } },
    { ch: 'ن', n: 'Noon', say: 'نون', join: true, cue: 'Pyala 🥣 — upar 1 nuqta', w: { ar: 'نَحْلَة', ur: 'مکھی', hi: 'मक्खी', ro: 'Makkhi', e: '🐝' } },
    { ch: 'و', n: 'Wao', say: 'واو', join: false, cue: 'Gol sar aur dum — nuqta nahi', w: { ar: 'وَرْدَة', ur: 'گلاب', hi: 'गुलाब', ro: 'Gulab', e: '🌹' } },
    { ch: 'ه', n: 'Chhoti Ha', say: 'هاء', join: true, cue: 'Chhota gol — jaise anda', w: { ar: 'هِلَال', ur: 'چاند', hi: 'चाँद', ro: 'Chaand', e: '🌙' } },
    { ch: 'ي', n: 'Ya', say: 'ياء', join: true, cue: 'Neeche 2 nuqte — lambi dum', w: { ar: 'يَد', ur: 'ہاتھ', hi: 'हाथ', ro: 'Haath', e: '✋' } }
  ];

  // 7 manzilein (alphabetical tarteeb waisi hi — madrase wali). Har manzil mein shakal ke milte julte harf saath.
  D.MANZIL = [
    { id: 1, ur: 'پہلی منزل', ro: 'Pehli Manzil', color: '#FF7A59', e: '🌅', from: 0, to: 3 },   // ا ب ت ث
    { id: 2, ur: 'دوسری منزل', ro: 'Doosri Manzil', color: '#FFB020', e: '🐪', from: 4, to: 6 },   // ج ح خ
    { id: 3, ur: 'تیسری منزل', ro: 'Teesri Manzil', color: '#2ED1A0', e: '🚪', from: 7, to: 10 },  // د ذ ر ز
    { id: 4, ur: 'چوتھی منزل', ro: 'Chauthi Manzil', color: '#3DA9FC', e: '🦷', from: 11, to: 14 }, // س ش ص ض
    { id: 5, ur: 'پانچویں منزل', ro: 'Panchvi Manzil', color: '#8B6CFF', e: '👁️', from: 15, to: 18 }, // ط ظ ع غ
    { id: 6, ur: 'چھٹی منزل', ro: 'Chhathi Manzil', color: '#FF6FA8', e: '📖', from: 19, to: 22 },  // ف ق ك ل
    { id: 7, ur: 'ساتویں منزل', ro: 'Satvi Manzil', color: '#12B5A6', e: '🌙', from: 23, to: 27 }   // م ن و ه ي
  ];

  // Shakal mein milte julte harf (galti ginwane nahi — farq sikhane ke liye)
  D.SIMILAR = [
    [1, 2, 3, 24, 27],  // ب ت ث ن ي
    [4, 5, 6],          // ج ح خ
    [7, 8],             // د ذ
    [9, 10],            // ر ز
    [11, 12],           // س ش
    [13, 14],           // ص ض
    [15, 16],           // ط ظ
    [17, 18],           // ع غ
    [19, 20],           // ف ق
    [0, 22, 25],        // ا ل و (seedhe/lambe)
    [23, 26]            // م ه
  ];
  D.similarTo = (i) => { const g = D.SIMILAR.find((x) => x.includes(i)); return g ? g.filter((x) => x !== i) : []; };

  // Harf ki positional shakalein (ZWJ ke zariye browser khud jodta hai)
  D.forms = (ch, join) => join
    ? { alone: ch, start: ch + '‍', mid: '‍' + ch + '‍', end: '‍' + ch }
    : { alone: ch, end: '‍' + ch };

  /* ---------------------------------------------------------
     HARKAT (Zabar, Zer, Pesh)
     --------------------------------------------------------- */
  D.HARKAT = [
    { id: 'zabar', mark: 'َ', ur: 'زبر', ro: 'Zabar', hi: 'ज़बर', e: '⬆️', vow: 'a', cue: 'Harf ke UPAR chhoti si lakeer', color: '#FF7A59' },
    { id: 'zer', mark: 'ِ', ur: 'زیر', ro: 'Zer', hi: 'ज़ेर', e: '⬇️', vow: 'i', cue: 'Harf ke NEECHE chhoti si lakeer', color: '#3DA9FC' },
    { id: 'pesh', mark: 'ُ', ur: 'پیش', ro: 'Pesh', hi: 'पेश', e: '🔝', vow: 'u', cue: 'Harf ke upar chhota sa "و" (wao)', color: '#2ED1A0' }
  ];
  // Harkat ki Roman awaaz ka aadha hissa (ba, bi, bu ke liye)
  D.SYL = ['', 'b', 't', 's', 'j', 'h', 'kh', 'd', 'z', 'r', 'z', 's', 'sh', 's', 'z', 't', 'z', '', 'gh', 'f', 'q', 'k', 'l', 'm', 'n', 'w', 'h', 'y'];
  // Harkat ke liye Alif ki jagah Hamza wala Alif
  D.harakatLetter = (i, mark) => (i === 0 ? 'أ' : D.LETTERS[i].ch) + mark;

  /* ---------------------------------------------------------
     LAFZ BANAO (bade bachon ke liye) — 2, 3, 4 harf ke lafz
     --------------------------------------------------------- */
  D.WORDS = [
    { w: 'يد', ur: 'ہاتھ', hi: 'हाथ', ro: 'Haath', e: '✋', lv: 1 },
    { w: 'فم', ur: 'منہ', hi: 'मुँह', ro: 'Munh', e: '👄', lv: 1 },
    { w: 'دب', ur: 'ریچھ', hi: 'भालू', ro: 'Reechh', e: '🐻', lv: 1 },
    { w: 'باب', ur: 'دروازہ', hi: 'दरवाज़ा', ro: 'Darwaza', e: '🚪', lv: 2 },
    { w: 'بيت', ur: 'گھر', hi: 'घर', ro: 'Ghar', e: '🏠', lv: 2 },
    { w: 'قلم', ur: 'قلم', hi: 'क़लम', ro: 'Qalam', e: '✏️', lv: 2 },
    { w: 'جمل', ur: 'اونٹ', hi: 'ऊँट', ro: 'Oont', e: '🐪', lv: 2 },
    { w: 'فيل', ur: 'ہاتھی', hi: 'हाथी', ro: 'Hathi', e: '🐘', lv: 2 },
    { w: 'قمر', ur: 'چاند', hi: 'चाँद', ro: 'Chaand', e: '🌙', lv: 2 },
    { w: 'نجم', ur: 'ستارہ', hi: 'सितारा', ro: 'Sitara', e: '⭐', lv: 2 },
    { w: 'ورد', ur: 'گلاب', hi: 'गुलाब', ro: 'Gulab', e: '🌹', lv: 2 },
    { w: 'تمر', ur: 'کھجور', hi: 'खजूर', ro: 'Khajoor', e: '🌴', lv: 2 },
    { w: 'حوت', ur: 'وہیل', hi: 'व्हेल', ro: 'Whale', e: '🐋', lv: 3 },
    { w: 'سمك', ur: 'مچھلی', hi: 'मछली', ro: 'Machhli', e: '🐟', lv: 3 },
    { w: 'شمس', ur: 'سورج', hi: 'सूरज', ro: 'Suraj', e: '☀️', lv: 3 },
    { w: 'عنب', ur: 'انگور', hi: 'अंगूर', ro: 'Angoor', e: '🍇', lv: 3 },
    { w: 'موز', ur: 'کیلا', hi: 'केला', ro: 'Kela', e: '🍌', lv: 3 },
    { w: 'ديك', ur: 'مرغا', hi: 'मुर्गा', ro: 'Murgha', e: '🐓', lv: 3 },
    { w: 'شجر', ur: 'درخت', hi: 'पेड़', ro: 'Darakht', e: '🌳', lv: 3 },
    { w: 'بحر', ur: 'سمندر', hi: 'समुंदर', ro: 'Samandar', e: '🌊', lv: 3 },
    { w: 'جبل', ur: 'پہاڑ', hi: 'पहाड़', ro: 'Pahad', e: '⛰️', lv: 3 },
    { w: 'خبز', ur: 'روٹی', hi: 'रोटी', ro: 'Roti', e: '🍞', lv: 3 },
    { w: 'كتاب', ur: 'کتاب', hi: 'किताब', ro: 'Kitaab', e: '📖', lv: 4 },
    { w: 'ولد', ur: 'لڑکا', hi: 'लड़का', ro: 'Larka', e: '👦', lv: 4 },
    { w: 'بنت', ur: 'لڑکی', hi: 'लड़की', ro: 'Larki', e: '👧', lv: 4 }
  ];

  /* ---------------------------------------------------------
     RANG
     --------------------------------------------------------- */
  D.COLORS = [
    { id: 'laal', ur: 'لال', hi: 'लाल', ro: 'Laal', en: 'Red', hex: '#E53935', things: ['🍎', '🍓', '🌹'] },
    { id: 'neela', ur: 'نیلا', hi: 'नीला', ro: 'Neela', en: 'Blue', hex: '#1E88E5', things: ['🐳', '🌊', '🧢'] },
    { id: 'peela', ur: 'پیلا', hi: 'पीला', ro: 'Peela', en: 'Yellow', hex: '#FDD835', things: ['🍌', '🌻', '🐥'] },
    { id: 'hara', ur: 'ہرا', hi: 'हरा', ro: 'Hara', en: 'Green', hex: '#43A047', things: ['🥒', '🐸', '🌳'] },
    { id: 'narangi', ur: 'نارنجی', hi: 'नारंगी', ro: 'Narangi', en: 'Orange', hex: '#FB8C00', things: ['🍊', '🥕', '🎃'] },
    { id: 'gulabi', ur: 'گلابی', hi: 'गुलाबी', ro: 'Gulabi', en: 'Pink', hex: '#EC407A', things: ['🌸', '🐷', '🍬'] },
    { id: 'jamni', ur: 'جامنی', hi: 'जामुनी', ro: 'Jamni', en: 'Purple', hex: '#8E24AA', things: ['🍇', '🍆', '☂️'] },
    { id: 'bhura', ur: 'بھورا', hi: 'भूरा', ro: 'Bhura', en: 'Brown', hex: '#795548', things: ['🐻', '🍫', '🥔'] },
    { id: 'kala', ur: 'کالا', hi: 'काला', ro: 'Kala', en: 'Black', hex: '#263238', things: ['🐈‍⬛', '🕶️', '🎩'] },
    { id: 'safed', ur: 'سفید', hi: 'सफ़ेद', ro: 'Safed', en: 'White', hex: '#FAFAFA', things: ['☁️', '🥛', '🐑'] }
  ];

  /* ---------------------------------------------------------
     JAANWAR
     --------------------------------------------------------- */
  D.ANIMALS = [
    { id: 'gaye', e: '🐄', ur: 'گائے', hi: 'गाय', ro: 'Gaye', en: 'Cow', snd: 'Moo moo' },
    { id: 'kutta', e: '🐕', ur: 'کتا', hi: 'कुत्ता', ro: 'Kutta', en: 'Dog', snd: 'Woof woof' },
    { id: 'billi', e: '🐈', ur: 'بلی', hi: 'बिल्ली', ro: 'Billi', en: 'Cat', snd: 'Meow meow' },
    { id: 'bakri', e: '🐐', ur: 'بکری', hi: 'बकरी', ro: 'Bakri', en: 'Goat', snd: 'Meh meh' },
    { id: 'bher', e: '🐑', ur: 'بھیڑ', hi: 'भेड़', ro: 'Bher', en: 'Sheep', snd: 'Baa baa' },
    { id: 'murghi', e: '🐔', ur: 'مرغی', hi: 'मुर्गी', ro: 'Murghi', en: 'Hen', snd: 'Cluck cluck' },
    { id: 'batakh', e: '🦆', ur: 'بطخ', hi: 'बतख़', ro: 'Batakh', en: 'Duck', snd: 'Quack quack' },
    { id: 'ghora', e: '🐴', ur: 'گھوڑا', hi: 'घोड़ा', ro: 'Ghora', en: 'Horse', snd: 'Neigh neigh' },
    { id: 'sher', e: '🦁', ur: 'شیر', hi: 'शेर', ro: 'Sher', en: 'Lion', snd: 'Roar' },
    { id: 'hathi', e: '🐘', ur: 'ہاتھی', hi: 'हाथी', ro: 'Hathi', en: 'Elephant', snd: 'Toot toot' },
    { id: 'mendhak', e: '🐸', ur: 'مینڈک', hi: 'मेंढक', ro: 'Mendhak', en: 'Frog', snd: 'Ribbit ribbit' },
    { id: 'makkhi', e: '🐝', ur: 'مکھی', hi: 'मक्खी', ro: 'Makkhi', en: 'Bee', snd: 'Buzz buzz' }
  ];

  /* ---------------------------------------------------------
     GINTI 1–10
     --------------------------------------------------------- */
  D.NUMBERS = [
    { n: 1, ur: 'ایک', hi: 'एक', ro: 'Ek', en: 'One' },
    { n: 2, ur: 'دو', hi: 'दो', ro: 'Do', en: 'Two' },
    { n: 3, ur: 'تین', hi: 'तीन', ro: 'Teen', en: 'Three' },
    { n: 4, ur: 'چار', hi: 'चार', ro: 'Chaar', en: 'Four' },
    { n: 5, ur: 'پانچ', hi: 'पाँच', ro: 'Paanch', en: 'Five' },
    { n: 6, ur: 'چھ', hi: 'छह', ro: 'Chhe', en: 'Six' },
    { n: 7, ur: 'سات', hi: 'सात', ro: 'Saat', en: 'Seven' },
    { n: 8, ur: 'آٹھ', hi: 'आठ', ro: 'Aath', en: 'Eight' },
    { n: 9, ur: 'نو', hi: 'नौ', ro: 'Nau', en: 'Nine' },
    { n: 10, ur: 'دس', hi: 'दस', ro: 'Das', en: 'Ten' }
  ];
  D.COUNT_THINGS = ['🍎', '⭐', '🎈', '🐟', '🌸', '🚗', '🍪', '🐥', '🦋', '🍓'];

  /* ---------------------------------------------------------
     SHAKAL (SVG inner shapes, viewBox 0 0 100 100)
     --------------------------------------------------------- */
  D.SHAPES = [
    { id: 'gol', ur: 'گول', hi: 'गोल', ro: 'Gol', en: 'Circle', svg: '<circle cx="50" cy="50" r="38"/>' },
    { id: 'chaukor', ur: 'چوکور', hi: 'चौकोर', ro: 'Chaukor', en: 'Square', svg: '<rect x="14" y="14" width="72" height="72" rx="6"/>' },
    { id: 'tikon', ur: 'تکون', hi: 'तिकोन', ro: 'Tikon', en: 'Triangle', svg: '<path d="M50 10 L92 86 L8 86 Z" stroke-linejoin="round"/>' },
    { id: 'sitara', ur: 'ستارہ', hi: 'सितारा', ro: 'Sitara', en: 'Star', svg: '<path d="M50 6 L62 37 L95 39 L69 59 L78 92 L50 73 L22 92 L31 59 L5 39 L38 37 Z" stroke-linejoin="round"/>' },
    { id: 'dil', ur: 'دل', hi: 'दिल', ro: 'Dil', en: 'Heart', svg: '<path d="M50 88 C10 58 6 30 26 20 C38 14 47 22 50 30 C53 22 62 14 74 20 C94 30 90 58 50 88 Z"/>' },
    { id: 'chaand', ur: 'چاند', hi: 'चाँद', ro: 'Chaand', en: 'Crescent', svg: '<path d="M64 10 A40 40 0 1 0 90 66 A32 32 0 1 1 64 10 Z" stroke-linejoin="round"/>' }
  ];

  /* ---------------------------------------------------------
     Awaaz ke chhote jumley (Urdu / Hindi / Roman)
     --------------------------------------------------------- */
  D.T = {
    salam: { ar: 'السلام عليكم' },
    suno: { ur: 'سنو', hi: 'सुनो', ro: 'Suno' },
    dekho: { ur: 'دیکھو', hi: 'देखो', ro: 'Dekho' },
    dhoondo: { ur: 'ڈھونڈو', hi: 'ढूँढो', ro: 'Dhoondo' },
    chuno: { ur: 'چنو', hi: 'चुनो', ro: 'Chuno' },
    yehHai: { ur: 'یہ ہے', hi: 'यह है', ro: 'Yeh hai' },
    abBolo: { ur: 'اب تم بولو', hi: 'अब तुम बोलो', ro: 'Ab tum bolo' },
    gino: { ur: 'گنو', hi: 'गिनो', ro: 'Gino' },
    kitne: { ur: 'کتنے ہیں؟', hi: 'कितने हैं?', ro: 'Kitne hain?' },
    kaunSaHarf: { ur: 'کون سا حرف؟', hi: 'कौन सा हर्फ़?', ro: 'Kaun sa harf?' },
    kaunSaRang: { ur: 'کون سا رنگ؟', hi: 'कौन सा रंग?', ro: 'Kaun sa rang?' },
    kaunHai: { ur: 'کون ہے؟', hi: 'कौन है?', ro: 'Kaun hai?' },
    kaunSaAlag: { ur: 'کون سا الگ ہے؟', hi: 'कौन सा अलग है?', ro: 'Kaun sa alag hai?' },
    kaunSaShakal: { ur: 'کون سی شکل؟', hi: 'कौन सी शक्ल?', ro: 'Kaun si shakal?' },
    shuruHota: { ur: 'سے شروع ہوتا ہے', hi: 'से शुरू होता है', ro: 'se shuru hota hai' },
    jodiMilao: { ur: 'جوڑی ملاؤ', hi: 'जोड़ी मिलाओ', ro: 'Jodi milao' },
    lafzBanao: { ur: 'لفظ بناؤ', hi: 'लफ़्ज़ बनाओ', ro: 'Lafz banao' },
    pakdo: { ur: 'پکڑو', hi: 'पकड़ो', ro: 'Pakdo' },
    phoro: { ur: 'پھوڑو', hi: 'फोड़ो', ro: 'Phoro' },
    aglaHarf: { ur: 'اگلا حرف کون سا ہے؟', hi: 'अगला हर्फ़ कौन सा है?', ro: 'Agla harf kaun sa hai?' },
    dobara: { ur: 'پھر کوشش کرو', hi: 'फिर कोशिश करो', ro: 'Phir koshish karo' },
    koiBaatNahi: { ur: 'کوئی بات نہیں', hi: 'कोई बात नहीं', ro: 'Koi baat nahi' },
    ekBaarAur: { ur: 'ایک بار اور', hi: 'एक बार और', ro: 'Ek baar aur' },
    sahiJawab: { ur: 'صحیح جواب یہ ہے', hi: 'सही जवाब यह है', ro: 'Sahi jawab yeh hai' },
    harkatDhoondo: { ur: 'ڈھونڈو', hi: 'ढूँढो', ro: 'Dhoondo' },
    aaramKaWaqt: { ur: 'آج کے لیے بس، اب آرام کرو', hi: 'आज के लिए बस, अब आराम करो', ro: 'Aaj ke liye bas, ab aaram karo' },
    nayaSticker: { ur: 'نیا اسٹیکر', hi: 'नया स्टिकर', ro: 'Naya sticker' },
    kamaal: { ur: 'کمال کر دیا', hi: 'कमाल कर दिया', ro: 'Kamaal kar diya' },
    chalo: { ur: 'چلو شروع کریں', hi: 'चलो शुरू करें', ro: 'Chalo shuru karein' }
  };
  D.PRAISE = [
    { ur: 'ماشاءاللہ', hi: 'माशाअल्लाह', ro: 'MashaAllah' },
    { ur: 'شاباش', hi: 'शाबाश', ro: 'Shabash' },
    { ur: 'بہت خوب', hi: 'बहुत ख़ूब', ro: 'Bohat khoob' },
    { ur: 'واہ', hi: 'वाह', ro: 'Wah' },
    { ur: 'زبردست', hi: 'ज़बरदस्त', ro: 'Zabardast' },
    { ur: 'بالکل ٹھیک', hi: 'बिल्कुल ठीक', ro: 'Bilkul theek' }
  ];

  /* ---------------------------------------------------------
     DUAEIN — ar (poora), parts (tukray, dohrane ke liye)
     --------------------------------------------------------- */
  D.DUAS = [
    { id: 'khane_pehle', e: '🍽️', ur: 'کھانے سے پہلے', ro: 'Khane se pehle', ar: 'بِسْمِ اللَّهِ', parts: ['بِسْمِ اللَّهِ'], tr: 'Allah ke naam se shuru.' },
    { id: 'khane_baad', e: '😋', ur: 'کھانے کے بعد', ro: 'Khane ke baad', ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ', parts: ['الْحَمْدُ لِلَّهِ', 'الَّذِي أَطْعَمَنَا وَسَقَانَا', 'وَجَعَلَنَا مُسْلِمِينَ'], tr: 'Allah ka shukar jis ne khilaya, pilaya aur musalman banaya.' },
    { id: 'sone_pehle', e: '🛏️', ur: 'سونے سے پہلے', ro: 'Sone se pehle', ar: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا', parts: ['اللَّهُمَّ بِاسْمِكَ', 'أَمُوتُ وَأَحْيَا'], tr: 'Ae Allah! Tere hi naam se marta aur jeeta hoon.' },
    { id: 'uthne_par', e: '🌅', ur: 'نیند سے اٹھ کر', ro: 'Neend se uthne par', ar: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', parts: ['الْحَمْدُ لِلَّهِ', 'الَّذِي أَحْيَانَا', 'بَعْدَ مَا أَمَاتَنَا', 'وَإِلَيْهِ النُّشُورُ'], tr: 'Allah ka shukar jis ne sone ke baad jagaya.' },
    { id: 'bathroom_pehle', e: '🚿', ur: 'بیت الخلا جانے سے پہلے', ro: 'Bathroom jane se pehle', ar: 'بِسْمِ اللَّهِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', parts: ['بِسْمِ اللَّهِ', 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ', 'مِنَ الْخُبُثِ وَالْخَبَائِثِ'], tr: 'Ae Allah! Main buri cheezon se teri panah mangta hoon.' },
    { id: 'bathroom_baad', e: '🧼', ur: 'بیت الخلا سے نکل کر', ro: 'Bathroom se nikal kar', ar: 'غُفْرَانَكَ', parts: ['غُفْرَانَكَ'], tr: 'Ae Allah! Teri maafi chahta hoon.' },
    { id: 'ghar_se_nikalte', e: '🚪', ur: 'گھر سے نکلتے وقت', ro: 'Ghar se nikalte waqt', ar: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', parts: ['بِسْمِ اللَّهِ', 'تَوَكَّلْتُ عَلَى اللَّهِ', 'وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ'], tr: 'Allah ke naam se, maine Allah par bharosa kiya.' },
    { id: 'ghar_aate', e: '🏠', ur: 'گھر میں آتے وقت', ro: 'Ghar mein aate waqt', ar: 'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا', parts: ['بِسْمِ اللَّهِ وَلَجْنَا', 'وَبِسْمِ اللَّهِ خَرَجْنَا', 'وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا'], tr: 'Allah ke naam se hum dakhil hue aur nikle, Allah par bharosa kiya.' },
    { id: 'masjid_jate', e: '🕌', ur: 'مسجد میں جاتے وقت', ro: 'Masjid mein jate waqt', ar: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', parts: ['اللَّهُمَّ', 'افْتَحْ لِي', 'أَبْوَابَ رَحْمَتِكَ'], tr: 'Ae Allah! Mere liye apni rehmat ke darwaze khol de.' },
    { id: 'masjid_nikalte', e: '🌤️', ur: 'مسجد سے نکلتے وقت', ro: 'Masjid se nikalte waqt', ar: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', parts: ['اللَّهُمَّ إِنِّي أَسْأَلُكَ', 'مِنْ فَضْلِكَ'], tr: 'Ae Allah! Main tujh se tera fazl mangta hoon.' },
    { id: 'cheenk', e: '🤧', ur: 'چھینک آنے پر', ro: 'Cheenk aane par', ar: 'الْحَمْدُ لِلَّهِ', parts: ['الْحَمْدُ لِلَّهِ'], tr: 'Cheenk aaye to "Alhamdulillah" kaho. Sunne wala kahe "Yarhamukallah".' },
    { id: 'walidain', e: '👨‍👩‍👧', ur: 'امی ابو کے لیے', ro: 'Ammi Abbu ke liye', ar: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', parts: ['رَبِّ ارْحَمْهُمَا', 'كَمَا رَبَّيَانِي صَغِيرًا'], tr: 'Ae mere Rab! Un par raham kar jaise unhon ne bachpan mein mujhe pala.' },
    { id: 'ilm', e: '📚', ur: 'علم بڑھانے کی دعا', ro: 'Ilm barhane ki dua', ar: 'رَبِّ زِدْنِي عِلْمًا', parts: ['رَبِّ', 'زِدْنِي عِلْمًا'], tr: 'Ae mere Rab! Mera ilm barha de.' },
    { id: 'dunya_akhirat', e: '🌈', ur: 'دنیا اور آخرت کی بھلائی', ro: 'Dunya aur Aakhirat ki bhalai', ar: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', parts: ['رَبَّنَا آتِنَا', 'فِي الدُّنْيَا حَسَنَةً', 'وَفِي الْآخِرَةِ حَسَنَةً', 'وَقِنَا عَذَابَ النَّارِ'], tr: 'Ae hamare Rab! Hamein dunya aur aakhirat mein bhalai de.' },
    { id: 'salam', e: '👋', ur: 'سلام کرنا', ro: 'Salam karna', ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ', parts: ['السَّلَامُ عَلَيْكُمْ', 'وَرَحْمَةُ اللَّهِ', 'وَبَرَكَاتُهُ'], tr: 'Tum par salamati, Allah ki rehmat aur barkat ho.' },
    { id: 'kalima', e: '☝️', ur: 'کلمہ طیبہ', ro: 'Kalima Tayyab', ar: 'لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ', parts: ['لَا إِلَهَ إِلَّا اللَّهُ', 'مُحَمَّدٌ رَسُولُ اللَّهِ'], tr: 'Allah ke siwa koi mabood nahi, Muhammad ﷺ Allah ke rasool hain.' }
  ];

  /* ---------------------------------------------------------
     CHHOTI SURAHEIN — Hafs, Uthmani. Fatiha mein 1st ayat Bismillah hai
     (everyayah.com ki file tarteeb ke mutabiq).
     --------------------------------------------------------- */
  D.SURAHS = [
    { n: 1, ar: 'الفاتحة', ur: 'الفاتحہ', ro: 'Al-Fatiha', e: '🌟', color: '#FF7A59', m: 'Namaz ki pehli surah. Allah ki tareef aur seedhe raaste ki dua.',
      ayat: ['بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', 'ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ', 'ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ', 'مَٰلِكِ يَوۡمِ ٱلدِّينِ', 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ', 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ', 'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ'] },
    { n: 108, ar: 'الكوثر', ur: 'الکوثر', ro: 'Al-Kawthar', e: '💧', color: '#3DA9FC', m: 'Allah ne hamein bahut bhalai di, isliye namaz padho.',
      ayat: ['إِنَّآ أَعۡطَيۡنَٰكَ ٱلۡكَوۡثَرَ', 'فَصَلِّ لِرَبِّكَ وَٱنۡحَرۡ', 'إِنَّ شَانِئَكَ هُوَ ٱلۡأَبۡتَرُ'] },
    { n: 112, ar: 'الإخلاص', ur: 'الاخلاص', ro: 'Al-Ikhlas', e: '☝️', color: '#2ED1A0', m: 'Allah ek hai. Na us ki aulad, na koi us jaisa.',
      ayat: ['قُلۡ هُوَ ٱللَّهُ أَحَدٌ', 'ٱللَّهُ ٱلصَّمَدُ', 'لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ', 'وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ'] },
    { n: 114, ar: 'الناس', ur: 'الناس', ro: 'An-Nas', e: '🛡️', color: '#8B6CFF', m: 'Logon ke Rab ki panah — waswason se hifazat.',
      ayat: ['قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ', 'مَلِكِ ٱلنَّاسِ', 'إِلَٰهِ ٱلنَّاسِ', 'مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ', 'ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ', 'مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ'] },
    { n: 113, ar: 'الفلق', ur: 'الفلق', ro: 'Al-Falaq', e: '🌄', color: '#FFB020', m: 'Subah ke Rab ki panah — buraiyon se hifazat.',
      ayat: ['قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ', 'مِن شَرِّ مَا خَلَقَ', 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', 'وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ', 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ'] },
    { n: 103, ar: 'العصر', ur: 'العصر', ro: 'Al-Asr', e: '⏳', color: '#FF6FA8', m: 'Waqt ki qasam — imaan, neik amal, sach aur sabr wale kamyab hain.',
      ayat: ['وَٱلۡعَصۡرِ', 'إِنَّ ٱلۡإِنسَٰنَ لَفِي خُسۡرٍ', 'إِلَّا ٱلَّذِينَ ءَامَنُواْ وَعَمِلُواْ ٱلصَّٰلِحَٰتِ وَتَوَاصَوۡاْ بِٱلۡحَقِّ وَتَوَاصَوۡاْ بِٱلصَّبۡرِ'] }
  ];
  D.QARI = { id: 'Husary_Muallim_128kbps', alt: 'Minshawy_Teacher_128kbps' };
  D.ayahUrl = (s, a, qari) => 'https://everyayah.com/data/' + (qari || D.QARI.id) + '/' + String(s).padStart(3, '0') + String(a).padStart(3, '0') + '.mp3';

  /* ---------------------------------------------------------
     NAMAZ — kids ke liye aasaan
     --------------------------------------------------------- */
  D.WUDU = [
    { e: '🌙', ur: 'بسم اللہ کہو', hi: 'बिस्मिल्लाह कहो', ro: 'Bismillah kaho', cnt: '', ar: 'بِسْمِ اللَّهِ' },
    { e: '🤲', ur: 'ہاتھ دھوؤ', hi: 'हाथ धोओ', ro: 'Haath dhoyo', cnt: '3' },
    { e: '👄', ur: 'کلی کرو', hi: 'कुल्ली करो', ro: 'Kulli karo', cnt: '3' },
    { e: '👃', ur: 'ناک میں پانی ڈالو', hi: 'नाक में पानी डालो', ro: 'Naak mein paani', cnt: '3' },
    { e: '😊', ur: 'چہرہ دھوؤ', hi: 'चेहरा धोओ', ro: 'Chehra dhoyo', cnt: '3' },
    { e: '💪', ur: 'کہنیوں تک بازو دھوؤ', hi: 'कोहनियों तक बाज़ू धोओ', ro: 'Kohniyon tak bazu', cnt: '3' },
    { e: '🧒', ur: 'سر کا مسح کرو', hi: 'सर का मसह करो', ro: 'Sar ka masah', cnt: '1' },
    { e: '🦶', ur: 'پاؤں دھوؤ', hi: 'पाँव धोओ', ro: 'Paon dhoyo', cnt: '3' }
  ];
  D.NAMAZEIN = [
    { id: 'fajr', e: '🌅', ur: 'فجر', hi: 'फ़ज्र', ro: 'Fajr', rak: 2, when: 'Subah, suraj nikalne se pehle' },
    { id: 'zuhr', e: '☀️', ur: 'ظہر', hi: 'ज़ुहर', ro: 'Zuhr', rak: 4, when: 'Dopahar' },
    { id: 'asr', e: '🌤️', ur: 'عصر', hi: 'अस्र', ro: 'Asr', rak: 4, when: 'Dopahar ke baad' },
    { id: 'maghrib', e: '🌇', ur: 'مغرب', hi: 'मग़रिब', ro: 'Maghrib', rak: 3, when: 'Suraj dubne ke foran baad' },
    { id: 'isha', e: '🌙', ur: 'عشاء', hi: 'इशा', ro: 'Isha', rak: 4, when: 'Raat' }
  ];
  D.POSTURES = [
    { id: 'takbeer', ur: 'اللہ اکبر کہو', hi: 'अल्लाहु अकबर कहो', ro: 'Haath utha kar Allahu Akbar', ar: 'اللَّهُ أَكْبَرُ' },
    { id: 'qiyam', ur: 'کھڑے ہو کر سورہ فاتحہ', hi: 'खड़े होकर सूरह फ़ातिहा', ro: 'Qiyam — khade ho kar Surah Fatiha', ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
    { id: 'ruku', ur: 'رکوع میں جھک جاؤ', hi: 'रुकू में झुक जाओ', ro: 'Ruku — jhuk jao', ar: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ' },
    { id: 'sajda', ur: 'سجدہ — ماتھا زمین پر', hi: 'सज्दा — माथा ज़मीन पर', ro: 'Sajda — maatha zameen par', ar: 'سُبْحَانَ رَبِّيَ الْأَعْلَى' },
    { id: 'baithna', ur: 'سکون سے بیٹھو', hi: 'सुकून से बैठो', ro: 'Sukoon se baitho', ar: '' },
    { id: 'salam', ur: 'دائیں بائیں سلام', hi: 'दाएँ बाएँ सलाम', ro: 'Salam — daaye baaye', ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ' }
  ];

  /* ---------------------------------------------------------
     ACHHI BAATEIN
     --------------------------------------------------------- */
  D.HABITS = [
    { id: 'salam', e: '👋', ur: 'سلام کرو', hi: 'सलाम करो', ro: 'Salam karo', ar: 'السلام عليكم' },
    { id: 'bismillah', e: '🍽️', ur: 'بسم اللہ پڑھ کر کھاؤ', hi: 'बिस्मिल्लाह पढ़कर खाओ', ro: 'Bismillah padh kar khao', ar: 'بسم الله' },
    { id: 'sach', e: '🌟', ur: 'سچ بولو', hi: 'सच बोलो', ro: 'Sach bolo' },
    { id: 'walidain', e: '👨‍👩‍👧', ur: 'امی ابو کی بات مانو', hi: 'अम्मी अब्बू की बात मानो', ro: 'Ammi Abbu ki baat mano' },
    { id: 'shukriya', e: '🙏', ur: 'شکریہ کہو', hi: 'शुक्रिया कहो', ro: 'Shukriya kaho', ar: 'جزاك الله خيرا' },
    { id: 'share', e: '🍪', ur: 'مل بانٹ کر کھاؤ', hi: 'मिल बाँटकर खाओ', ro: 'Mil baant kar khao' },
    { id: 'safai', e: '🧼', ur: 'صفائی رکھو', hi: 'सफ़ाई रखो', ro: 'Safai rakho' },
    { id: 'maaf', e: '🤝', ur: 'معاف کر دو', hi: 'माफ़ कर दो', ro: 'Maaf kar do' },
    { id: 'jaanwar', e: '🐱', ur: 'جانوروں سے پیار کرو', hi: 'जानवरों से प्यार करो', ro: 'Jaanwaron se pyaar karo' },
    { id: 'bade', e: '🧓', ur: 'بڑوں کا ادب کرو', hi: 'बड़ों का अदब करो', ro: 'Barron ka adab karo' }
  ];

  /* ---------------------------------------------------------
     STICKERS (30) — sitaron se milte hain
     --------------------------------------------------------- */
  D.STICKERS = ['⭐', '🌙', '☀️', '🌈', '🦋', '🌸', '🦁', '🐘', '🐦', '🐟', '🌟', '🎈', '🎁', '🍬', '💖', '😊', '🍮', '🏠', '🌳', '☁️', '🕌', '📖', '🕋', '📿', '🤲', '🐪', '🌴', '🍇', '🚀', '🎨'];
  // k-wa sticker kitne sitaron par: k^2 + 2k  (3, 8, 15, 24, 35 ...)
  D.stickerAt = (k) => k * k + 2 * k;

  D.AVATARS = ['🦁', '🐘', '🐰', '🐼', '🦊', '🐯', '🐨', '🦋', '🐥', '🐬', '🦄', '🐢'];
})();
