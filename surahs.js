// Quran ke aakhri 10 surah (105–114).
// Ayaat ka text Shamela ke Hafs (KFQPC mushaf rendering) se liya gaya hai.
// Awaaz: everyayah.com se qari ki recitation (internet chahiye).

const QARIS = [
    { id: "Alafasy_128kbps",              name: "Mishary Alafasy",           note: "Saaf aur khoobsurat" },
    { id: "Husary_Muallim_128kbps",       name: "Al-Husary (Mu'allim)",      note: "Sikhane wala, ruk ruk kar" },
    { id: "Abdul_Basit_Murattal_192kbps", name: "Abdul Basit (Murattal)",    note: "Sukoon wali tilawat" },
    { id: "Minshawy_Teacher_128kbps",     name: "Al-Minshawi (Teacher)",     note: "Bachon ke liye sikhane wala" }
];

const BISMILLAH = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";

// Mushaf ki tarteeb mein (105 se 114). Dikhane ki tarteeb app.js/quran.js mein tay hoti hai.
const surahData = [
    {
        n: 105, ar: "الفيل", ro: "Al-Fil", meaning: "Hathi",
        summary: "Abraha ke hathiyon wale lashkar ko Allah ne chhoti chidiyon ke zariye tabah kar diya.",
        ayat: [
            "أَلَمۡ تَرَ كَيۡفَ فَعَلَ رَبُّكَ بِأَصۡحَٰبِ ٱلۡفِيلِ",
            "أَلَمۡ يَجۡعَلۡ كَيۡدَهُمۡ فِي تَضۡلِيلٖ",
            "وَأَرۡسَلَ عَلَيۡهِمۡ طَيۡرًا أَبَابِيلَ",
            "تَرۡمِيهِم بِحِجَارَةٖ مِّن سِجِّيلٖ",
            "فَجَعَلَهُمۡ كَعَصۡفٖ مَّأۡكُولِۭ"
        ]
    },
    {
        n: 106, ar: "قريش", ro: "Quraish", meaning: "Quraish (qabila)",
        summary: "Quraish par Allah ke ehsaan: sardi garmi ke safar, khana aur aman. Isliye is ghar ke Rab ki ibadat karo.",
        ayat: [
            "لِإِيلَٰفِ قُرَيۡشٍ",
            "إِۦلَٰفِهِمۡ رِحۡلَةَ ٱلشِّتَآءِ وَٱلصَّيۡفِ",
            "فَلۡيَعۡبُدُواْ رَبَّ هَٰذَا ٱلۡبَيۡتِ",
            "ٱلَّذِيٓ أَطۡعَمَهُم مِّن جُوعٖ وَءَامَنَهُم مِّنۡ خَوۡفِۭ"
        ]
    },
    {
        n: 107, ar: "الماعون", ro: "Al-Ma'un", meaning: "Chhoti chhoti cheezein",
        summary: "Jo deen ko jhutlata hai, yateem ko dhutkarta hai, miskeen ko khana dene par ubharta nahi, namaz mein susti aur dikhawa karta hai.",
        ayat: [
            "أَرَءَيۡتَ ٱلَّذِي يُكَذِّبُ بِٱلدِّينِ",
            "فَذَٰلِكَ ٱلَّذِي يَدُعُّ ٱلۡيَتِيمَ",
            "وَلَا يَحُضُّ عَلَىٰ طَعَامِ ٱلۡمِسۡكِينِ",
            "فَوَيۡلٞ لِّلۡمُصَلِّينَ",
            "ٱلَّذِينَ هُمۡ عَن صَلَاتِهِمۡ سَاهُونَ",
            "ٱلَّذِينَ هُمۡ يُرَآءُونَ",
            "وَيَمۡنَعُونَ ٱلۡمَاعُونَ"
        ]
    },
    {
        n: 108, ar: "الكوثر", ro: "Al-Kawthar", meaning: "Khair-e-kaseer",
        summary: "Allah ne Nabi ﷺ ko Kawthar ata ki. Is liye namaz aur qurbani sirf Allah ke liye karo.",
        ayat: [
            "إِنَّآ أَعۡطَيۡنَٰكَ ٱلۡكَوۡثَرَ",
            "فَصَلِّ لِرَبِّكَ وَٱنۡحَرۡ",
            "إِنَّ شَانِئَكَ هُوَ ٱلۡأَبۡتَرُ"
        ]
    },
    {
        n: 109, ar: "الكافرون", ro: "Al-Kafirun", meaning: "Inkar karne wale",
        summary: "Tawheed par pakka rehne ka elan: tumhara deen tumhare liye, mera deen mere liye.",
        ayat: [
            "قُلۡ يَٰٓأَيُّهَا ٱلۡكَٰفِرُونَ",
            "لَآ أَعۡبُدُ مَا تَعۡبُدُونَ",
            "وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ",
            "وَلَآ أَنَا۠ عَابِدٞ مَّا عَبَدتُّمۡ",
            "وَلَآ أَنتُمۡ عَٰبِدُونَ مَآ أَعۡبُدُ",
            "لَكُمۡ دِينُكُمۡ وَلِيَ دِينِ"
        ]
    },
    {
        n: 110, ar: "النصر", ro: "An-Nasr", meaning: "Madad",
        summary: "Jab Allah ki madad aur fatah aa jaye to tasbeeh, hamd aur istighfar karo.",
        ayat: [
            "إِذَا جَآءَ نَصۡرُ ٱللَّهِ وَٱلۡفَتۡحُ",
            "وَرَأَيۡتَ ٱلنَّاسَ يَدۡخُلُونَ فِي دِينِ ٱللَّهِ أَفۡوَاجٗا",
            "فَسَبِّحۡ بِحَمۡدِ رَبِّكَ وَٱسۡتَغۡفِرۡهُۚ إِنَّهُۥ كَانَ تَوَّابَۢا"
        ]
    },
    {
        n: 111, ar: "المسد", ro: "Al-Masad", meaning: "Khajoor ki rassi",
        summary: "Abu Lahab aur uski biwi ka anjaam: maal aur kamayi us ke kuch kaam na aayi.",
        ayat: [
            "تَبَّتۡ يَدَآ أَبِي لَهَبٖ وَتَبَّ",
            "مَآ أَغۡنَىٰ عَنۡهُ مَالُهُۥ وَمَا كَسَبَ",
            "سَيَصۡلَىٰ نَارٗا ذَاتَ لَهَبٖ",
            "وَٱمۡرَأَتُهُۥ حَمَّالَةَ ٱلۡحَطَبِ",
            "فِي جِيدِهَا حَبۡلٞ مِّن مَّسَدِۭ"
        ]
    },
    {
        n: 112, ar: "الإخلاص", ro: "Al-Ikhlas", meaning: "Khalis tawheed",
        summary: "Allah ek hai, be-niyaz hai. Na us ki koi aulad, na woh kisi ki aulad, aur koi us ka humsar nahi.",
        ayat: [
            "قُلۡ هُوَ ٱللَّهُ أَحَدٌ",
            "ٱللَّهُ ٱلصَّمَدُ",
            "لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ",
            "وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ"
        ]
    },
    {
        n: 113, ar: "الفلق", ro: "Al-Falaq", meaning: "Subah ki roshni",
        summary: "Andheri raat, jadu aur hasad jaisi buraiyon se Subah ke Rab ki panah.",
        ayat: [
            "قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ",
            "مِن شَرِّ مَا خَلَقَ",
            "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
            "وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِي ٱلۡعُقَدِ",
            "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"
        ]
    },
    {
        n: 114, ar: "الناس", ro: "An-Nas", meaning: "Insaan",
        summary: "Waswase daalne wale shaitan ki burai se logon ke Rab, Badshah aur Mabood ki panah.",
        ayat: [
            "قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ",
            "مَلِكِ ٱلنَّاسِ",
            "إِلَٰهِ ٱلنَّاسِ",
            "مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ",
            "ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ",
            "مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ"
        ]
    }
];
