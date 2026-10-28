const namazData = {
    wudu: [
        { step: 1, emoji: "🌊", title: "Niyyat aur Bismillah", ar: "بِسْمِ اللَّهِ", ro: "Bismillah", detail: "Dil mein wudu ki niyyat karo (ke main paak hone ke liye wudu kar raha hoon) aur 'Bismillah' kaho.", tip: "Niyyat dil ka irada hai — zaban se kehna zaroori nahi. Wudu ke bina namaz nahi hoti." },
        { step: 2, emoji: "🤲", title: "Haath — kalaiyon tak", ar: "", ro: "3 baar", detail: "Dono haath kalaiyon tak 3 baar dhoyo. Pehle daaya haath, phir baaya. Ungliyon ke beech khilal karo.", tip: "Rasoolullah ﷺ ne farmaya: 'Jo achhi tarah wudu kare, uske gunah paani ke qatron ke saath gir jate hain.'" },
        { step: 3, emoji: "💧", title: "Kulli — mooh mein paani", ar: "", ro: "3 baar", detail: "3 baar kulli karo. Roza na ho to gale tak paani pahunchao aur achhi tarah mooh saaf karo.", tip: "Kulli se mooh ki safai hoti hai — sunnat hai." },
        { step: 4, emoji: "👃", title: "Naak — naak mein paani", ar: "", ro: "3 baar", detail: "3 baar naak mein paani chadhao. Daaya haath se paani chadhao, baaya haath se naak saaf karo.", tip: "Naak saaf rakhna sehat ke liye bhi zaroori hai." },
        { step: 5, emoji: "😊", title: "Chehra — poora mooh", ar: "", ro: "3 baar", detail: "Peshani ke baalon ki jarh se thodi (chin) tak, ek kaan se doosre kaan tak — 3 baar poora chehra dhoyo.", tip: "Chehre par paani daalne se gunah mit jate hain, inshaAllah." },
        { step: 6, emoji: "💪", title: "Baazu — kohniyon tak", ar: "", ro: "3 baar", detail: "Pehle daaya baazu (kohni samet) 3 baar dhoyo, phir baaya baazu 3 baar. Kohni ke andar bhi paani pahunchao.", tip: "Quran mein Allah ne farmaya: 'Aur apne haath kohniyon tak dhoyo.' (Maidah 6)" },
        { step: 7, emoji: "👤", title: "Sar aur kaanon ka masah", ar: "", ro: "1 baar", detail: "Geele haath se poore sar par masah karo — peshani se peechhe tak, phir wapas. Phir kaanon ke andar shaahadat ki ungli se aur baahar angoothe se masah karo.", tip: "Masah matlab — geela haath phairna, paani bahana nahi." },
        { step: 8, emoji: "🦶", title: "Paon — takhnon tak", ar: "", ro: "3 baar", detail: "Pehle daaya paon (takhne samet) 3 baar dhoyo, phir baaya paon 3 baar. Ungliyon ke beech khilal karo.", tip: "Wudu mukammal hone par Kalima Shahadat padho." }
    ],
    namaz: [
        { id: "fajr", name: "Fajr", ar: "الفجر", emoji: "🌅", time: "Subah sadiq se tulu-e-aftab tak", rakats: [{ type: "Sunnah", count: 2, note: "Muakkadah" }, { type: "Farz", count: 2, note: "Zaroori" }] },
        { id: "zuhr", name: "Zuhr", ar: "الظهر", emoji: "☀️", time: "Zawaal ke baad Asr tak", rakats: [{ type: "Sunnah", count: 4, note: "Muakkadah" }, { type: "Farz", count: 4, note: "Zaroori" }, { type: "Sunnah", count: 2, note: "Muakkadah" }, { type: "Nafl", count: 2, note: "Mustahab" }] },
        { id: "asr", name: "Asr", ar: "العصر", emoji: "🌤️", time: "Asr se Maghrib tak", rakats: [{ type: "Sunnah", count: 4, note: "Ghair Muakkadah" }, { type: "Farz", count: 4, note: "Zaroori" }] },
        { id: "maghrib", name: "Maghrib", ar: "المغرب", emoji: "🌇", time: "Maghrib se Isha tak", rakats: [{ type: "Farz", count: 3, note: "Zaroori" }, { type: "Sunnah", count: 2, note: "Muakkadah" }, { type: "Nafl", count: 2, note: "Mustahab" }] },
        { id: "isha", name: "Isha", ar: "العشاء", emoji: "🌙", time: "Isha se Fajr tak", rakats: [{ type: "Sunnah", count: 4, note: "Ghair Muakkadah" }, { type: "Farz", count: 4, note: "Zaroori" }, { type: "Sunnah", count: 2, note: "Muakkadah" }, { type: "Witr", count: 3, note: "Wajib" }, { type: "Nafl", count: 2, note: "Mustahab" }] }
    ],
    positions: [
        { id: "takbeer", emoji: "🤲", title: "Takbeer-e-Tahreema", ar: "اللَّهُ أَكْبَرُ", ro: "Allahu Akbar", detail: "Kaanon tak dono haath uthao (ungliyan kaanon ke barabar), 'Allahu Akbar' kaho, phir naaf ke neeche haath baandh lo.", note: "Yahan se namaz shuru hoti hai." },
        { id: "sana", emoji: "📿", title: "Sana (sirf pehli rakat)", ar: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ", ro: "Subhanaka Allahumma...", detail: "Takbeer ke baad, qirat se pehle, pehli rakat mein Sana padho.", note: "Sirf pehli rakat mein — baaki rakton mein nahi." },
        { id: "qiyam", emoji: "🧍", title: "Qiyam (khade ho kar qirat)", ar: "بِسْمِ اللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", ro: "Bismillah...", detail: "Qiyam mein: A'oozu billah, Bismillah, Surah Fatiha, phir koi ek surah ya 3 chhoti ayat.", note: "Fatiha har rakat mein — Farz ki pehli 2 aur baaki sab mein." },
        { id: "ruku", emoji: "🙇", title: "Ruku", ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", ro: "Subhana Rabbiyal Adheem", detail: "Jhuk kar dono haath ghutnon par rakho, peeth seedhi, nazar sajde ki jagah. 3 baar kaho.", note: "Ruku ka waqt kam se kam ek tasbeeh — 3 baar behtar hai." },
        { id: "qaumah", emoji: "🧍", title: "Qaumah (ruku ke baad khada hona)", ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ رَبَّنَا لَكَ الْحَمْدُ", ro: "Sami'Allahu liman hamidah, Rabbana lakal hamd", detail: "Ruku se uthte waqt 'Sami'Allahu liman hamidah' kaho, seedhe khade ho kar 'Rabbana lakal hamd' kaho.", note: "Har rakat mein." },
        { id: "sajda", emoji: "🧎", title: "Sajda", ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", ro: "Subhana Rabbiyal A'la", detail: "Saat azra (peshani+naak, dono haath, dono ghutne, dono paon ki ungliyan) zameen par. 3 baar kaho.", note: "Har rakat mein 2 sajde — beech mein thoda baithna." },
        { id: "jalsa", emoji: "🧎", title: "Jalsa (do sajdon ke beech)", ar: "رَبِّ اغْفِرْ لِي", ro: "Rabbighfir li", detail: "Pehle sajde ke baad baith kar 'Rabbighfir li' kaho, phir doosre sajde mein jao.", note: "Bahut chhota sa bayaan." },
        { id: "qaida", emoji: "🧎", title: "Qaida Akhira (aakhri baithak)", ar: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ...", ro: "At-tahiyyatu lillahi...", detail: "Aakhri rakat mein baith kar Attahiyyat padho, phir Durood-e-Ibrahim, phir Dua-e-Masoora.", note: "Durood zaroori — Dua-e-Masoora bhi behtar." },
        { id: "salam", emoji: "🤝", title: "Salam", ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ", ro: "Assalamu alaikum wa rahmatullah", detail: "Daayein taraf munh pher kar salam kaho, phir baayein taraf.", note: "Yahan namaz mukammal hoti hai." }
    ],
    fatiha: {
        ayat: [
            "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
            "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
            "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
            "مَٰلِكِ يَوْمِ ٱلدِّينِ",
            "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
            "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
            "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ"
        ],
        tr: [
            "Allah ke naam se jo Rehman aur Raheem hai.",
            "Tamam tareef Allah ke liye hai jo saare jahanon ka Rab hai.",
            "Woh Rehman aur Raheem hai.",
            "Roz-e-jaza ka Malik hai.",
            "Hum sirf teri ibadat karte hain aur sirf tujh se madad maangte hain.",
            "Humain seedha raasta dikha.",
            "Un logon ka raasta jin par tune inaam kiya, na un ka jin par ghazab hua, na un ka jo gumraah hue."
        ],
        fazilat: "Rasoolullah ﷺ ne farmaya: 'Jis ne Fatiha padhi, usne goya poora Quran padh liya.' Fatiha namaz ki rooh hai — iske bina namaz nahi hoti."
    },
    tasbeeh: [
        { ar: "سُبْحَانَ اللَّهِ", ro: "SubhanAllah", meaning: "Allah paak hai", count: 33, emoji: "🌹" },
        { ar: "الْحَمْدُ لِلَّهِ", ro: "Alhamdulillah", meaning: "Tamam tareef Allah ke liye hai", count: 33, emoji: "💚" },
        { ar: "اللَّهُ أَكْبَرُ", ro: "Allahu Akbar", meaning: "Allah sab se bara hai", count: 34, emoji: "⭐" }
    ]
};
