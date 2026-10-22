const qaidaData = [
    {
        id: 1, title: "Sabaq 1: Mufradat", desc: "Alone Letters (Alif se Yaa)",
        items: [
            { ar: "ا", ro: "Alif", voice: "الف" }, { ar: "ب", ro: "Baa", voice: "باء" }, 
            { ar: "ت", ro: "Taa", voice: "تاء" }, { ar: "ث", ro: "Saa", voice: "ثاء" },
            { ar: "ج", ro: "Jeem", voice: "جيم" }, { ar: "ح", ro: "Haa", voice: "حاء" }, 
            { ar: "خ", ro: "Khaa", voice: "خاء" }, { ar: "د", ro: "Daal", voice: "دال" },
            { ar: "ذ", ro: "Zaal", voice: "ذال" }, { ar: "ر", ro: "Raa", voice: "راء" }, 
            { ar: "ز", ro: "Zaa", voice: "زاي" }, { ar: "س", ro: "Seen", voice: "سين" },
            { ar: "ش", ro: "Sheen", voice: "شين" }, { ar: "ص", ro: "Swaad", voice: "صاد" }, 
            { ar: "ض", ro: "Dwaad", voice: "ضاد" }, { ar: "ط", ro: "Twah", voice: "طاء" },
            { ar: "ظ", ro: "Zwah", voice: "ظاء" }, { ar: "ع", ro: "Ain", voice: "عين" }, 
            { ar: "غ", ro: "Ghain", voice: "غين" }, { ar: "ف", ro: "Faa", voice: "فاء" },
            { ar: "ق", ro: "Qaaf", voice: "قاف" }, { ar: "ك", ro: "Kaaf", voice: "كاف" }, 
            { ar: "ل", ro: "Laam", voice: "لام" }, { ar: "م", ro: "Meem", voice: "ميم" },
            { ar: "ن", ro: "Noon", voice: "نون" }, { ar: "و", ro: "Wao", voice: "واو" }, 
            { ar: "ه", ro: "Haa", voice: "هاء" }, { ar: "ي", ro: "Yaa", voice: "ياء" }
        ]
    },
    {
        id: 2, title: "Sabaq 2: Murakkabat", desc: "Jode Hue Huruf (Joined Letters)",
        items: [
            { ar: "لَا", ro: "Laa", voice: "لا" }, { ar: "بَا", ro: "Baa", voice: "با" }, 
            { ar: "تَاء", ro: "Taa", voice: "تاء" }, { ar: "لُو", ro: "Loo", voice: "لو" }, 
            { ar: "يُو", ro: "Yoo", voice: "يو" }, { ar: "بُو", ro: "Boo", voice: "بو" },
            { ar: "لِي", ro: "Lee", voice: "لي" }, { ar: "بِي", ro: "Bee", voice: "بي" }, 
            { ar: "تِي", ro: "Tee", voice: "تي" }, { ar: "مَا", ro: "Maa", voice: "ما" },
            { ar: "نَا", ro: "Naa", voice: "نا" }, { ar: "هُوَ", ro: "Huwa", voice: "هو" },
            { ar: "هِيَ", ro: "Hiya", voice: "هي" }, { ar: "رَبِّ", ro: "Rabbi", voice: "رب" }
        ]
    },
    {
        id: 3, title: "Sabaq 3: Zabar (Fatha)", desc: "2 Harf, 3 Harf aur Alfaz",
        items: [
            { ar: "اَبَ", ro: "Aba", voice: "أبا" }, { ar: "بَبَ", ro: "Baba", voice: "ببا" }, 
            { ar: "تَبَ", ro: "Taba", voice: "تبا" }, { ar: "اَبَتَ", ro: "Abata", voice: "أبت" }, 
            { ar: "بَبَتَ", ro: "Babata", voice: "ببت" }, { ar: "تَبَتَ", ro: "Tabata", voice: "تبت" },
            { ar: "كَتَبَ", ro: "Kataba", voice: "كتب" }, { ar: "ذَهَبَ", ro: "Zahaba", voice: "ذهب" }, 
            { ar: "عَلَمَ", ro: "Alama", voice: "علم" }, { ar: "خَلَقَ", ro: "Khalaqa", voice: "خلق" }, 
            { ar: "جَعَلَ", ro: "Ja'ala", voice: "جعل" }, { ar: "رَزَقَ", ro: "Razaqa", voice: "رزق" },
            { ar: "عَبَدَ", ro: "Abada", voice: "عبد" }, { ar: "سَجَدَ", ro: "Sajada", voice: "سجد" }, 
            { ar: "نَصَرَ", ro: "Nasara", voice: "نصر" }, { ar: "فَتَحَ", ro: "Fataha", voice: "فتح" },
            { ar: "عَلِمَ", ro: "Alima", voice: "علم" }, { ar: "حَسَدَ", ro: "Hasada", voice: "حسد" }
        ]
    },
    {
        id: 4, title: "Sabaq 4: Zer (Kasra)", desc: "2 Harf, 3 Harf aur Alfaz",
        items: [
            { ar: "اِبِ", ro: "Ibi", voice: "إبي" }, { ar: "بِبِ", ro: "Bibi", voice: "بيبي" }, 
            { ar: "تِبِ", ro: "Tibi", voice: "تبي" }, { ar: "اِبِتِ", ro: "Ibiti", voice: "إبتي" }, 
            { ar: "بِبِتِ", ro: "Bibiti", voice: "بيبتي" }, { ar: "تِبِتِ", ro: "Tibiti", voice: "تبتي" },
            { ar: "بِسْمِ", ro: "Bismi", voice: "بسم" }, { ar: "عِلْمِ", ro: "Ilmi", voice: "علم" }, 
            { ar: "مِنْ", ro: "Min", voice: "من" }, { ar: "هِلْ", ro: "Hil", voice: "هل" }, 
            { ar: "عِبَادِ", ro: "Ibaadi", voice: "عباد" }, { ar: "كِتَابِ", ro: "Kitaabi", voice: "كتاب" },
            { ar: "بِنَا", ro: "Binaa", voice: "بنا" }, { ar: "لِرَبِّ", ro: "Li-rabbi", voice: "لرب" }, 
            { ar: "بِهِ", ro: "Bihi", voice: "به" }, { ar: "لَهُ", ro: "Lahu", voice: "له" },
            { ar: "فِيهِ", ro: "Feehi", voice: "فيه" }, { ar: "عَلَيْهِ", ro: "Alaihi", voice: "عليه" }
        ]
    },
    {
        id: 5, title: "Sabaq 5: Pesh (Damma)", desc: "2 Harf, 3 Harf aur Alfaz",
        items: [
            { ar: "اُبُ", ro: "Ubu", voice: "أبو" }, { ar: "بُبُ", ro: "Bubu", voice: "ببو" }, 
            { ar: "تُبُ", ro: "Tubu", voice: "تبو" }, { ar: "اُبُتُ", ro: "Ubutu", voice: "أبتو" }, 
            { ar: "بُبُتُ", ro: "Bubutu", voice: "ببتو" }, { ar: "تُبُتُ", ro: "Tubutu", voice: "تبتو" },
            { ar: "كُتُبُ", ro: "Kutubu", voice: "كتب" }, { ar: "رُسُلُ", ro: "Rusulu", voice: "رسل" }, 
            { ar: "قُلْ", ro: "Qul", voice: "قل" }, { ar: "هُوَ", ro: "Huwa", voice: "هو" }, 
            { ar: "هُمْ", ro: "Hum", voice: "هم" }, { ar: "أَنْتُمْ", ro: "Antum", voice: "أنتم" },
            { ar: "يَقُولُ", ro: "Yaqoolu", voice: "يقول" }, { ar: "يَعْلَمُ", ro: "Ya'lamu", voice: "يعلم" }, 
            { ar: "يَرْزُقُ", ro: "Yarzuqu", voice: "يرزق" }, { ar: "يَغْفِرُ", ro: "Yaghfiru", voice: "يغفر" },
            { ar: "كُفُوًا", ro: "Kufuwan", voice: "كفوا" }, { ar: "رَحِيمٌ", ro: "Raheemun", voice: "رحيم" }
        ]
    },
    {
        id: 6, title: "Sabaq 6: Khari Harakat", desc: "Khare Khare Zabar, Zer, Pesh",
        items: [
            { ar: "اٰ", ro: "Aa", voice: "آ" }, { ar: "بٰ", ro: "Baa", voice: "با" }, 
            { ar: "اٖ", ro: "Ee", voice: "إي" }, { ar: "بٖ", ro: "Bee", voice: "بي" },
            { ar: "اٗ", ro: "Oo", voice: "أو" }, { ar: "بٗ", ro: "Boo", voice: "بو" },
            { ar: "قَالَ", ro: "Qaala", voice: "قال" }, { ar: "يَقُولُ", ro: "Yaqoolu", voice: "يقول" }, 
            { ar: "قِيلَ", ro: "Qeela", voice: "قيل" }, { ar: "مَا", ro: "Maa", voice: "ما" }, 
            { ar: "هَذَا", ro: "Haazaa", voice: "هذا" }
        ]
    },
    {
        id: 7, title: "Sabaq 7: Tanween", desc: "Do Zabar, Do Zer, Do Pesh",
        items: [
            { ar: "اَبًا", ro: "Aban", voice: "أبن" }, { ar: "بَبًا", ro: "Baban", voice: "ببن" }, 
            { ar: "اِبٍ", ro: "Ibin", voice: "إبن" }, { ar: "بِبٍ", ro: "Bibin", voice: "ببن" },
            { ar: "اُبٌ", ro: "Ubun", voice: "أبن" }, { ar: "بُبٌ", ro: "Bubun", voice: "ببن" },
            { ar: "كِتَابٌ", ro: "Kitaabun", voice: "كتاب" }, { ar: "قَلَمٍ", ro: "Qalamin", voice: "قلم" }, 
            { ar: "رَحِيمٌ", ro: "Raheemun", voice: "رحيم" }, { ar: "عَلِيمٌ", ro: "Aleemun", voice: "عليم" },
            { ar: "غَفُورٌ", ro: "Ghafoorun", voice: "غفور" }, { ar: "بَابًا", ro: "Baaban", voice: "بابا" }, 
            { ar: "سَمِيعٌ", ro: "Samee'un", voice: "سميع" }, { ar: "بَصِيرٌ", ro: "Baseerun", voice: "بصير" }
        ]
    },
    {
        id: 8, title: "Sabaq 8: Huroof-e-Maddah", desc: "Maddah (Alif, Wao, Yaa)",
        items: [
            { ar: "اٰ", ro: "Aa", voice: "آ" }, { ar: "اُوْ", ro: "Oo", voice: "أو" }, 
            { ar: "اِيْ", ro: "Ee", voice: "إي" }, { ar: "قَالَ", ro: "Qaala", voice: "قال" }, 
            { ar: "يَقُوْلُ", ro: "Yaqoolu", voice: "يقول" }, { ar: "قِيْلَ", ro: "Qeela", voice: "قيل" },
            { ar: "نُوْحِيْهَا", ro: "Nooheeha", voice: "نوحيها" }, { ar: "أُوتُوا", ro: "Ootoo", voice: "أوتوا" }, 
            { ar: "إِيْمَانًا", ro: "Eemaanan", voice: "إيمانا" }, { ar: "يُؤْمِنُونَ", ro: "Yu'minoona", voice: "يؤمنون" }
        ]
    },
    {
        id: 9, title: "Sabaq 9: Huroof-e-Leen", desc: "Wao aur Yaa ki narm aawaz",
        items: [
            { ar: "خَوْفٌ", ro: "Khawfun", voice: "خوف" }, { ar: "بَيْتٌ", ro: "Baitun", voice: "بيت" },
            { ar: "كَوْثَر", ro: "Kausar", voice: "كوثر" }, { ar: "لَيْلٌ", ro: "Lailun", voice: "ليل" },
            { ar: "عَلَيْهِمْ", ro: "Alaihim", voice: "عليهم" }, { ar: "قَوْمٌ", ro: "Qawmun", voice: "قوم" }, 
            { ar: "شَيْءٌ", ro: "Shai'un", voice: "شيء" }, { ar: "خَيْرٌ", ro: "Khairun", voice: "خير" }
        ]
    },
    {
        id: 10, title: "Sabaq 10: Jazm (Sukoon)", desc: "Harf ko rokna (Quranic Words)",
        items: [
            { ar: "اَبْ", ro: "Ab", voice: "أب" }, { ar: "بَبْ", ro: "Bab", voice: "بب" }, 
            { ar: "اَبْزَ", ro: "Abza", voice: "أبزا" }, { ar: "اِبْزِ", ro: "Ibzi", voice: "إبزي" },
            { ar: "اُبْزُ", ro: "Ubzu", voice: "أبزو" }, { ar: "مَنْ", ro: "Man", voice: "من" }, 
            { ar: "قُلْ", ro: "Qul", voice: "قل" }, { ar: "يَكُنْ", ro: "Yakun", voice: "يكن" },
            { ar: "أَنْزَلَ", ro: "Anzala", voice: "أنزل" }, { ar: "يَدْخُلُوا", ro: "Yadkhuloo", voice: "يدخلوا" },
            { ar: "لَمْ يَلِدْ", ro: "Lam yalid", voice: "لم يلد" }, { ar: "يَكُنْ لَهُ", ro: "Yakun lahu", voice: "يكن له" }
        ]
    },
    {
        id: 11, title: "Sabaq 11: Tashdeed", desc: "Harf ko do baar padhna (Quranic Words)",
        items: [
            { ar: "اَبَّ", ro: "Abba", voice: "أبّ" }, { ar: "بَبَّ", ro: "Babba", voice: "ببّ" }, 
            { ar: "رَبَّ", ro: "Rabba", voice: "ربّ" }, { ar: "جَنَّة", ro: "Jannat", voice: "جنة" },
            { ar: "مُحَمَّدٌ", ro: "Muhammadun", voice: "محمد" }, { ar: "إِنَّ", ro: "Inna", voice: "إنّ" }, 
            { ar: "رَبَّنَا", ro: "Rabbana", voice: "ربنا" }, { ar: "عَلَّمَ", ro: "Allama", voice: "علّم" },
            { ar: "مُعَلِّمٌ", ro: "Mu'allimun", voice: "معلم" }, { ar: "إِيَّاكَ", ro: "Iyyaka", voice: "إياك" }, 
            { ar: "الْحَمْدُ", ro: "Alhamdu", voice: "الحمد" }
        ]
    },
    {
        id: 12, title: "Sabaq 12: Waqf", desc: "Rukna (Stopping Rules)",
        items: [
            { ar: "الْحَمْدُ لِلَّهِ", ro: "Alhamdulillah", voice: "الحمد لله" }, 
            { ar: "رَبِّ الْعَالَمِينَ", ro: "Rabbil Aalameen", voice: "رب العالمين" },
            { ar: "اِيَّاكَ نَعْبُدُ", ro: "Iyyaka Na'budu", voice: "إياك نعبد" },
            { ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", ro: "Qul huwallahu ahad", voice: "قل هو الله أحد" },
            { ar: "اللَّهُ الصَّمَدُ", ro: "Allahus Samad", voice: "الله الصمد" },
            { ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", ro: "Lam yalid wa lam yoolad", voice: "لم يلد ولم يولد" },
            { ar: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", ro: "Wa lam yakun lahu kufuwan ahad", voice: "ولم يكن له كفوا أحد" }
        ]
    }
];
