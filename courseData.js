// courseData.js
const qaidaData = [
    {
        id: "sabaq_1",
        title: "Sabaq 1: Mufradat (Alone Letters)",
        description: "Alif se Yaa tak",
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
        id: "sabaq_2",
        title: "Sabaq 2: Murakkabat (Joined)",
        description: "Huruf ko jodna seekhein",
        items: [
            { ar: "لَا", ro: "Laa", audio: "laa" }, { ar: "بَا", ro: "Baa", audio: "baa_m" }, { ar: "تَاء", ro: "Taa", audio: "taa_m" },
            { ar: "لُو", ro: "Loo", audio: "loo" }, { ar: "يُو", ro: "Yoo", audio: "yoo" }, { ar: "بُو", ro: "Boo", audio: "boo" },
            { ar: "لِي", ro: "Lee", audio: "lee" }, { ar: "بِي", ro: "Bee", audio: "bee" }, { ar: "تِي", ro: "Tee", audio: "tee" }
        ]
    },
    {
        id: "sabaq_3",
        title: "Sabaq 3: Zabar (Fatha)",
        description: "2 Harf, 3 Harf aur Alfaz",
        items: [
            // 2 Harf
            { ar: "اَبَ", ro: "Aba", audio: "aba" }, { ar: "بَبَ", ro: "Baba", audio: "baba" }, { ar: "تَبَ", ro: "Taba", audio: "taba" },
            // 3 Harf
            { ar: "اَبَتَ", ro: "Abata", audio: "abata" }, { ar: "بَبَتَ", ro: "Babata", audio: "babata" }, { ar: "تَبَتَ", ro: "Tabata", audio: "tabata" },
            // Alfaz (Words)
            { ar: "كَتَبَ", ro: "Kataba", audio: "kataba" }, { ar: "ذَهَبَ", ro: "Zahaba", audio: "zahaba" }, { ar: "عَلَمَ", ro: "Alama", audio: "alama" }
        ]
    },
    {
        id: "sabaq_4",
        title: "Sabaq 4: Zer (Kasra)",
        description: "2 Harf, 3 Harf aur Alfaz",
        items: [
            // 2 Harf
            { ar: "اِبِ", ro: "Ibi", audio: "ibi" }, { ar: "بِبِ", ro: "Bibi", audio: "bibi" }, { ar: "تِبِ", ro: "Tibi", audio: "tibi" },
            // 3 Harf
            { ar: "اِبِتِ", ro: "Ibiti", audio: "ibiti" }, { ar: "بِبِتِ", ro: "Bibiti", audio: "bibiti" }, { ar: "تِبِتِ", ro: "Tibiti", audio: "tibiti" },
            // Alfaz
            { ar: "بِسْمِ", ro: "Bismi", audio: "bismi" }, { ar: "عِلْمِ", ro: "Ilmi", audio: "ilmi" }, { ar: "مِنْ", ro: "Min", audio: "min" }
        ]
    },
    {
        id: "sabaq_5",
        title: "Sabaq 5: Pesh (Damma)",
        description: "2 Harf, 3 Harf aur Alfaz",
        items: [
            // 2 Harf
            { ar: "اُبُ", ro: "Ubu", audio: "ubu" }, { ar: "بُبُ", ro: "Bubu", audio: "bubu" }, { ar: "تُبُ", ro: "Tubu", audio: "tubu" },
            // 3 Harf
            { ar: "اُبُتُ", ro: "Ubutu", audio: "ubutu" }, { ar: "بُبُتُ", ro: "Bubutu", audio: "bubutu" }, { ar: "تُبُتُ", ro: "Tubutu", audio: "tubutu" },
            // Alfaz
            { ar: "كُتُبُ", ro: "Kutubu", audio: "kutubu" }, { ar: "رُسُلُ", ro: "Rusulu", audio: "rusulu" }, { ar: "قُلْ", ro: "Qul", audio: "qul" }
        ]
    },
    {
        id: "sabaq_6",
        title: "Sabaq 6: Jazm (Sukoon)",
        description: "Harf ko rokna",
        items: [
            // 2 Harf
            { ar: "اَبْ", ro: "Ab", audio: "ab" }, { ar: "بَبْ", ro: "Bab", audio: "bab" }, { ar: "تَبْ", ro: "Tab", audio: "tab" },
            // Zabar ke sath 3 Harf
            { ar: "اَبْزَ", ro: "Abza", audio: "abza" }, { ar: "بَبْزَ", ro: "Babza", audio: "babza" },
            // Zer ke sath 3 Harf
            { ar: "اِبْزِ", ro: "Ibzi", audio: "ibzi" }, { ar: "بِبْزِ", ro: "Bibzi", audio: "bibzi" },
            // Pesh ke sath 3 Harf
            { ar: "اُبْزُ", ro: "Ubzu", audio: "ubzu" }, { ar: "بُبْزُ", ro: "Bubzu", audio: "bubzu" }
        ]
    },
    {
        id: "sabaq_7",
        title: "Sabaq 7: Tashdeed",
        description: "Harf ko do baar padhna",
        items: [
            { ar: "اَبَّ", ro: "Abba", audio: "abba" }, { ar: "بَبَّ", ro: "Babba", audio: "babba" },
            { ar: "رَبَّ", ro: "Rabba", audio: "rabba" }, { ar: "جَنَّة", ro: "Jannat", audio: "jannat" }
        ]
    }
];

const storiesData = [
    {
        id: "story_1",
        title: "Hazrat Nuh (A.S) ki Kashti",
        desc: "Allah ke hukum par kashti banana aur momino ko bachana.",
        audio: "story_nuh",
        color: "#4facfe"
    },
    {
        id: "story_2",
        title: "Hazrat Sulaiman (A.S) aur Cheenti",
        desc: "Ek choti cheenti ki fikar aur Nabi ka adab.",
        audio: "story_sulaiman",
        color: "#f39c12"
    },
    {
        id: "story_3",
        title: "Hazrat Yunus (A.S) aur Machhli",
        desc: "Machhli ke pait mein Allah ki tasbeeh.",
        audio: "story_yunus",
        color: "#2fbf71"
    }
];
