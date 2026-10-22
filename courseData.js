// courseData.js - Complete Syllabus & Data (Ahle Hadith Manhaj)

const qaidaData = [
    {
        id: "sabaq_1", title: "Sabaq 1: Mufradat", description: "Alif se Yaa tak",
        items: [
            { ar: "ا", ro: "Alif", audio: "alif" }, { ar: "ب", ro: "Baa", audio: "baa" }, { ar: "ت", ro: "Taa", audio: "taa" },
            { ar: "ث", ro: "Saa", audio: "saa" }, { ar: "ج", ro: "Jeem", audio: "jeem" }, { ar: "ح", ro: "Haa", audio: "haa" },
            { ar: "خ", ro: "Khaa", audio: "khaa" }, { ar: "د", ro: "Daal", audio: "daal" }, { ar: "ذ", ro: "Zaal", audio: "zaal" },
            { ar: "ر", ro: "Raa", audio: "raa" }, { ar: "ز", ro: "Zaa", audio: "zaa" }, { ar: "س", ro: "Seen", audio: "seen" },
            { ar: "ش", ro: "Sheen", audio: "sheen" }, { ar: "ص", ro: "Swaad", audio: "swaad" }, { ar: "ض", ro: "Dwaad", audio: "dwaad" },
            { ar: "ط", ro: "Twah", audio: "twah" }, { ar: "ظ", ro: "Zwah", audio: "zwah" }, { ar: "ع", ro: "Ain", audio: "ain" },
            { ar: "غ", ro: "Ghain", audio: "ghain" }, { ar: "ف", ro: "Faa", audio: "faa" }, { ar: "ق", ro: "Qaaf", audio: "qaaf" },
            { ar: "ك", ro: "Kaaf", audio: "kaaf" }, { ar: "ل", ro: "Laam", audio: "laam" }, { ar: "م", ro: "Meem", audio: "meem" },
            { ar: "ن", ro: "Noon", audio: "noon" }, { ar: "و", ro: "Wao", audio: "wao" }, { ar: "ه", ro: "Haa", audio: "haa_m" },
            { ar: "ي", ro: "Yaa", audio: "yaa" }
        ]
    },
    {
        id: "sabaq_2", title: "Sabaq 2: Murakkabat", description: "Huruf ko jodna",
        items: [
            { ar: "لَا", ro: "Laa", audio: "laa" }, { ar: "بَا", ro: "Baa", audio: "baa_m" }, { ar: "تَاء", ro: "Taa", audio: "taa_m" },
            { ar: "لُو", ro: "Loo", audio: "loo" }, { ar: "يُو", ro: "Yoo", audio: "yoo" }, { ar: "بُو", ro: "Boo", audio: "boo" },
            { ar: "لِي", ro: "Lee", audio: "lee" }, { ar: "بِي", ro: "Bee", audio: "bee" }, { ar: "تِي", ro: "Tee", audio: "tee" }
        ]
    },
    {
        id: "sabaq_3", title: "Sabaq 3: Zabar", description: "2 Harf, 3 Harf aur Alfaz",
        items: [
            { ar: "اَبَ", ro: "Aba", audio: "aba" }, { ar: "بَبَ", ro: "Baba", audio: "baba" }, { ar: "تَبَ", ro: "Taba", audio: "taba" },
            { ar: "اَبَتَ", ro: "Abata", audio: "abata" }, { ar: "بَبَتَ", ro: "Babata", audio: "babata" }, { ar: "تَبَتَ", ro: "Tabata", audio: "tabata" },
            { ar: "كَتَبَ", ro: "Kataba", audio: "kataba" }, { ar: "ذَهَبَ", ro: "Zahaba", audio: "zahaba" }, { ar: "عَلَمَ", ro: "Alama", audio: "alama" }
        ]
    },
    {
        id: "sabaq_4", title: "Sabaq 4: Zer", description: "2 Harf, 3 Harf aur Alfaz",
        items: [
            { ar: "اِبِ", ro: "Ibi", audio: "ibi" }, { ar: "بِبِ", ro: "Bibi", audio: "bibi" }, { ar: "تِبِ", ro: "Tibi", audio: "tibi" },
            { ar: "اِبِتِ", ro: "Ibiti", audio: "ibiti" }, { ar: "بِبِتِ", ro: "Bibiti", audio: "bibiti" }, { ar: "تِبِتِ", ro: "Tibiti", audio: "tibiti" },
            { ar: "بِسْمِ", ro: "Bismi", audio: "bismi" }, { ar: "عِلْمِ", ro: "Ilmi", audio: "ilmi" }, { ar: "مِنْ", ro: "Min", audio: "min" }
        ]
    },
    {
        id: "sabaq_5", title: "Sabaq 5: Pesh", description: "2 Harf, 3 Harf aur Alfaz",
        items: [
            { ar: "اُبُ", ro: "Ubu", audio: "ubu" }, { ar: "بُبُ", ro: "Bubu", audio: "bubu" }, { ar: "تُبُ", ro: "Tubu", audio: "tubu" },
            { ar: "اُبُتُ", ro: "Ubutu", audio: "ubutu" }, { ar: "بُبُتُ", ro: "Bubutu", audio: "bubutu" }, { ar: "تُبُتُ", ro: "Tubutu", audio: "tubutu" },
            { ar: "كُتُبُ", ro: "Kutubu", audio: "kutubu" }, { ar: "رُسُلُ", ro: "Rusulu", audio: "rusulu" }, { ar: "قُلْ", ro: "Qul", audio: "qul" }
        ]
    },
    {
        id: "sabaq_6", title: "Sabaq 6: Jazm", description: "Harf ko rokna",
        items: [
            { ar: "اَبْ", ro: "Ab", audio: "ab" }, { ar: "بَبْ", ro: "Bab", audio: "bab" }, { ar: "تَبْ", ro: "Tab", audio: "tab" },
            { ar: "اَبْزَ", ro: "Abza", audio: "abza" }, { ar: "بَبْزَ", ro: "Babza", audio: "babza" },
            { ar: "اِبْزِ", ro: "Ibzi", audio: "ibzi" }, { ar: "بِبْزِ", ro: "Bibzi", audio: "bibzi" },
            { ar: "اُبْزُ", ro: "Ubzu", audio: "ubzu" }, { ar: "بُبْزُ", ro: "Bubzu", audio: "bubzu" }
        ]
    },
    {
        id: "sabaq_7", title: "Sabaq 7: Tashdeed", description: "Harf ko do baar padhna",
        items: [
            { ar: "اَبَّ", ro: "Abba", audio: "abba" }, { ar: "بَبَّ", ro: "Babba", audio: "babba" },
            { ar: "رَبَّ", ro: "Rabba", audio: "rabba" }, { ar: "جَنَّة", ro: "Jannat", audio: "jannat" }
        ]
    }
];

const namazData = [
    { ar: "اللَّهُ أَكْبَرُ", ro: "Takbeer-e-Tahreema", audio: "takbeer", ref: "Namaz ka aghaaz" },
    { ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ...", ro: "Sana", audio: "sana", ref: "Pehli Rakat" },
    { ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", ro: "Ruku ki Tasbeeh", audio: "ruku", ref: "Ruku mein 3 baar" },
    { ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ", ro: "Ruku se uthne par", audio: "tasmee", ref: "Qaumah" },
    { ar: "رَبَّنَا وَلَكَ الْحَمْدُ", ro: "Tahmeed", audio: "tahmeed", ref: "Qaumah" },
    { ar: "سُبْحَانَ رَبِّيَ الأَعْلَى", ro: "Sajdah ki Tasbeeh", audio: "sajdah", ref: "Sajdah mein 3 baar" },
    { ar: "التَّحِيَّاتُ لِلَّهِ...", ro: "At-Tahiyyat", audio: "tahiyyat", ref: "Qadah" },
    { ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ...", ro: "Durood-e-Ibrahim", audio: "durood", ref: "Aakhri Qadah" },
    { ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ", ro: "Salam", audio: "salam", ref: "Namaz ka ikhtitaam" }
];

const surahsData = [
    { ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", ro: "Surah Al-Fatiha", audio: "fatiha", ref: "Namaz ki pehli surah" },
    { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", ro: "Surah Al-Ikhlas", audio: "ikhlas", ref: "Tawheed ki surah" },
    { ar: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", ro: "Surah Al-Falaq", audio: "falaq", ref: "Hifazat ki surah" },
    { ar: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ", ro: "Surah An-Nas", audio: "nas", ref: "Hifazat ki surah" },
    { ar: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ", ro: "Surah Al-Kawthar", audio: "kawthar", ref: "Choti surah" }
];

const duasData = [
    { ar: "بِسْمِ اللَّهِ", ro: "Khane se pehle", audio: "bismillah", ref: "Abu Dawud" },
    { ar: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", ro: "Khane ke baad", audio: "alhamdulillah", ref: "Tirmidhi" },
    { ar: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا", ro: "Sone se pehle", audio: "sleep", ref: "Bukhari" },
    { ar: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", ro: "Neend se uthne par", audio: "wakeup", ref: "Bukhari" },
    { ar: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ", ro: "Sehat ki dua", audio: "health", ref: "Abu Dawud" }
];

const storiesData = [
    { id: "story_1", title: "Hazrat Adam (A.S)", desc: "Allah ne mitti se insaan ko banaya aur farishton ko sajda karne ka hukum diya.", audio: "story_adam", color: "#1abc9c" },
    { id: "story_2", title: "Hazrat Nuh (A.S) ki Kashti", desc: "Jab log Allah ko manne se mukar gaye, toh Hazrat Nuh (A.S) ne kashti banayi.", audio: "story_nuh", color: "#4facfe" },
    { id: "story_3", title: "Hazrat Hud (A.S)", desc: "Qawm-e-Aad ne apne Nabi ki baat nahi maani, toh Allah ne unpar sakht aandhi bheji.", audio: "story_hud", color: "#e67e22" },
    { id: "story_4", title: "Hazrat Salih (A.S)", desc: "Allah ne chattan se ek oontni paida ki, par zalim logon ne usay maar diya.", audio: "story_salih", color: "#d35400" },
    { id: "story_5", title: "Hazrat Ibrahim (A.S) aur Aag", desc: "Zalim badshah ne aag mein daala, par Allah ne aag ko thanda aur salamati banaya.", audio: "story_ibrahim", color: "#e74c3c" },
    { id: "story_6", title: "Hazrat Ibrahim (A.S) aur Namrud", desc: "Hazrat Ibrahim (A.S) ne badshah ko samjhaya ke Allah hi sab kuch kar sakta hai.", audio: "story_namrud", color: "#c0392b" },
    { id: "story_7", title: "Hazrat Ibrahim (A.S) aur Kabah", desc: "Hazrat Ibrahim aur Ismail (A.S) ne mil kar Allah ke ghar (Kabah) ki tameer ki.", audio: "story_kabah", color: "#f1c40f" },
    { id: "story_8", title: "Hazrat Ismail (A.S) aur Zamzam", desc: "Pyasi hui Hazrat Hajra ke liye Allah ne zamzam ka paani chashme ki tarah jari kiya.", audio: "story_zamzam", color: "#3498db" },
    { id: "story_9", title: "Hazrat Lut (A.S) ki Qawm", desc: "Buri aadaton mein mubtala qawm ko Hazrat Lut (A.S) ne Allah ka azab sunaya.", audio: "story_lut", color: "#9b59b6" },
    { id: "story_10", title: "Hazrat Yaqub (A.S)", desc: "Ek baap ka apne chote bete se pyar, aur bhaiyon ki jalan ki kahani.", audio: "story_yaqub", color: "#34495e" },
    { id: "story_11", title: "Hazrat Yusuf (A.S) ka Khwab", desc: "Chote se khwab ne Hazrat Yusuf (A.S) ki zindagi badal di.", audio: "story_yusuf_khwab", color: "#16a085" },
    { id: "story_12", title: "Hazrat Yusuf (A.S) aur Zulekha", desc: "Ghalat ilzam lagne par bhi Hazrat Yusuf (A.S) ne sabr kiya aur gunah se bacha.", audio: "story_zulekha", color: "#8e44ad" },
    { id: "story_13", title: "Hazrat Yusuf (A.S) aur Misr", desc: "Jail se nikal kar Hazrat Yusuf (A.S) Misr ke khazane ke wali ban gaye.", audio: "story_misr", color: "#2c3e50" },
    { id: "story_14", title: "Hazrat Ayyub (A.S) ka Sabr", desc: "Lambey bimari aur dukh ke baad Allah ne Hazrat Ayyub (A.S) ko sehat ata ki.", audio: "story_ayyub", color: "#27ae60" },
    { id: "story_15", title: "Hazrat Musa (A.S) ki Paidaish", desc: "Firaun ke darr se bacche ko dariya mein daala, Allah ne usay bacha kar wapas maa ke paas diya.", audio: "story_musa_paidaish", color: "#2980b9" },
    { id: "story_16", title: "Hazrat Musa (A.S) aur Firaun", desc: "Firaun ne khud ko khuda kaha, par Hazrat Musa (A.S) ki laathi ne uske jadu ko khatam kar diya.", audio: "story_musa_firaun", color: "#c0392b" },
    { id: "story_17", title: "Hazrat Musa (A.S) aur Samundar", desc: "Dariya ke raste khulne ka mojza jab Firaun apne lashkar ke sath peeche aaya.", audio: "story_musa_samundar", color: "#3498db" },
    { id: "story_18", title: "Hazrat Musa (A.S) aur Toor", desc: "Hazrat Musa (A.S) ko Toor-e-Sina par Allah se baat karne ki saadat mili.", audio: "story_toor", color: "#f39c12" },
    { id: "story_19", title: "Hazrat Khizr (A.S) aur Musa (A.S)", desc: "Sabr aur ilm ka sabaq jo Hazrat Khizr (A.S) ne Hazrat Musa (A.S) ko diya.", audio: "story_khizr", color: "#1abc9c" },
    { id: "story_20", title: "Hazrat Harun (A.S)", desc: "Hazrat Musa (A.S) ki gaye halaat mein Hazrat Harun (A.S) ne qawm ko sambhala.", audio: "story_harun", color: "#d35400" },
    { id: "story_21", title: "Hazrat Dawud (A.S) aur Jalut", desc: "Ek chote se pathar ne bade zalim sipah salar Jalut ko hara diya.", audio: "story_dawud", color: "#7f8c8d" },
    { id: "story_22", title: "Hazrat Sulaiman (A.S) aur Cheenti", desc: "Ek dafa lashkar guzar raha tha, ek cheenti ne apni sathiyon ko bacha liya.", audio: "story_sulaiman", color: "#f39c12" },
    { id: "story_23", title: "Hazrat Sulaiman (A.S) aur Hudhud", desc: "Ek chote parinde (Hudhud) ne Hazrat Sulaiman (A.S) ko nayi qawm ke baare mein bataya.", audio: "story_hudhud", color: "#2ecc71" },
    { id: "story_24", title: "Hazrat Yunus (A.S)", desc: "Hazrat Yunus (A.S) machhli ke pait mein chale gaye, unki tasbeeh se Allah ne bacha liya.", audio: "story_yunus", color: "#2fbf71" },
    { id: "story_25", title: "Hazrat Zakariya (A.S)", desc: "Boodhe hote hue bhi Allah ne Hazrat Zakariya (A.S) ko beta (Yahya A.S) ata kiya.", audio: "story_zakariya", color: "#9b59b6" },
    { id: "story_26", title: "Hazrat Isa (A.S) ki Pedaish", desc: "Hazrat Maryam ko bina baap ke beta ata hua, jo paida hote hi baat karne laga.", audio: "story_isa_paidaish", color: "#3498db" },
    { id: "story_27", title: "Hazrat Isa (A.S) ke Mojzay", desc: "Allah ke hukum se murdon ko zinda karna aur bimaron ko shifa dena.", audio: "story_isa_mojza", color: "#1abc9c" },
    { id: "story_28", title: "Hazrat Muhammad (S.A.W)", desc: "Rehmatul Lil Aalameen ki paidaish, Makkah mein, Aur unka bachpan.", audio: "story_muhammad", color: "#2fbf71" }
];
