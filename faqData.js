const faqCategories = [
    { id: 'huroof', name: 'Huroof', emoji: '🔤' },
    { id: 'namaz', name: 'Namaz', emoji: '🕌' },
    { id: 'quran', name: 'Quran', emoji: '📖' },
    { id: 'waqia', name: 'Waqiaat', emoji: '✨' },
    { id: 'general', name: 'Aam', emoji: '💡' }
];

const faqData = [
    { id: 'f1', cat: 'huroof', q: 'Harf ki shakal lafz mein badal jati hai — kyun?', a: 'Harf ki shakal badalti hai taake lafz likhne mein aasani ho. Jaise "ک" akela seedha hai — magar "کت" mein chhota ho jata hai. Harf ki ruh wahi hai, sirf shakal badalti hai.', ref: 'Sabaq 2 — Murakkabat' },
    { id: 'f2', cat: 'huroof', q: 'د aur ذ mein kya farq hai?', a: 'د (Daal) — halka "d", zaban danton se. ذ (Zaal) — "z" ki awaaz, zaban danton ke beech aati hai. Suno: Daal "da" (دل), Zaal "za" (ذكر).', ref: 'Huroof-e-Lisaniya' },
    { id: 'f3', cat: 'huroof', q: 'Madd kya hai? Kab padhte hain?', a: 'Madd = khinchna. Jab harf ke saath alif, wao ya yaa ki khari lakri ho (آ، و، ي) — to awaaz ko 2 gina khincho. Jaise "قَالَ" = "Qaala". "قُلْ" = "Qul" (chhota). Madd ke bina Quran ki awaaz adhoori hai.', ref: 'Sabaq 6 aur 8' },
    { id: 'f4', cat: 'huroof', q: 'Ghunna kya hai?', a: 'Ghunna = noon ki awaaz naak se. Jab نّ ya مّ par tashdeed ho, ya noon saakin ke baad "b" aaye — to awaaz 2 second naak se nikalti hai. Jaise "إِنَّ" = "Inna".', ref: 'Tajweed — pehla qaida' },
    { id: 'f5', cat: 'huroof', q: 'Qalqalah kya hai?', a: 'Qalqalah = harkat/uchhal. 5 huroof hain: ق ط ب ج د. Jab inke saath jazm/sukoon ho to halka uchhal ke padho. Jaise "قُلْ" mein "ق" halka uchhalta hai.', ref: 'Sabaq 10 (Jazm)' },
    { id: 'f6', cat: 'namaz', q: 'Namaz mein Bismillah kahan padhni hai?', a: 'Sirf pehli rakat mein Surah Fatiha se pehle — "A\'oozu billah, Bismillah" padho. Baaki rakton mein sirf "Bismillah".', ref: 'Fiqh' },
    { id: 'f7', cat: 'namaz', q: 'Rakat kaise ginte hain?', a: 'Rakat = ek poora cycle. Qiyam → Ruku → Sajda 1 → Baithna → Sajda 2. Fajr 2 farz, Zuhr 4, Asr 4, Maghrib 3, Isha 4.', ref: 'Namaz tab → positions' },
    { id: 'f8', cat: 'namaz', q: 'Wudu tootne ke baad namaz padh sakte hain?', a: 'Nahi. Wudu tootne par namaz nahi hoti — dobara wudu karo. Wudu tootne ki cheezein: peshab, paakhana, hawa, neend, bekhoshi.', ref: 'Fiqh — Wudu ka hukm' },
    { id: 'f9', cat: 'namaz', q: 'Qibla kahan hai? Kaise pata karun?', a: 'Qibla = Kaaba ki taraf munh (Makkah). Pakistan/Hind mein — Maghrib (west) ki taraf. Phone ka compass app ya kisi masjid ka rukh dekho.', ref: 'Surah Baqarah 144' },
    { id: 'f10', cat: 'namaz', q: 'Takbeer-e-Tahreema mein kaan tak haath kyun uthate hain?', a: 'Sunnat hai. "Allahu Akbar" kehte hue kaanon ki lobe tak dono haath uthao, phir naaf ke neeche haath bandho. Isse duniya se kat kar Allah ke saamne khade hone ka elan hota hai.', ref: 'Sahih Muslim 391' },
    { id: 'f11', cat: 'quran', q: 'Quran padhne se pehle "A\'oozu billah" kyun?', a: 'Kyunki Shaitan waswasa deta hai. Har tilawat se pehle "A\'oozu billahi min ash-shaitani rajeem" padho.', ref: 'Surah Nahl 98' },
    { id: 'f12', cat: 'quran', q: 'Surah Fatiha ki fazilat kya hai?', a: 'Fatiha = poora Quran ka khulasa. Rasoolullah ﷺ ne farmaya: "Jis ne Fatiha padhi, usne goya poora Quran padh liya." Namaz mein Fatiha ke bina namaz nahi hoti.', ref: 'Namaz tab → Fatiha' },
    { id: 'f13', cat: 'quran', q: 'Maddah (آ) aur alif (ا) mein kya farq?', a: 'ا = "A" chhota. آ = "Aa" khincha hua — 2 alif. Jaise "قَالَ" = "Qaala". "قَلَ" = "Qala".', ref: 'Sabaq 8' },
    { id: 'f14', cat: 'quran', q: 'Quran ko kis tarah yaad karun?', a: 'Chhote hisson mein. Pehle 1 ayat, phir 2, phir 3. Roz subah 15 min — kal ka dohrao, phir naya. Har juma — poora.', ref: 'Quran tab → Hifz' },
    { id: 'f15', cat: 'waqia', q: 'Hazrat Adam (a.s.) ki khata maaf kyun hui, Iblis ki nahi?', a: 'Adam (a.s.) ne tauba ki — Allah ke saamne jhuke. Iblis ne zid ki — takabbur kiya. Farq yahi hai: galti ke baad kya karte ho?', ref: 'Surah Baqarah 34-37' },
    { id: 'f16', cat: 'waqia', q: 'Hazrat Nuh (a.s.) ki kashti mein sab janwar kaise aa sake?', a: 'Allah ne hukm diya — "Har jaandar ka ek jora". Har qism se ek jora, taake nasl chale. Allah ka kamaal tha.', ref: 'Surah Hud 40' },
    { id: 'f17', cat: 'waqia', q: 'Hazrat Ibrahim (a.s.) ko aag kyun nahi jali?', a: 'Allah ne aag ko hukm diya: "Aye aag! Ibrahim par thandi aur salamati ban ja." Aag ne kaha "Haan". Jo Allah par bharosa kare, uske liye mushkil aag bhi thandi ho jati hai.', ref: 'Surah Anbiya 69' },
    { id: 'f18', cat: 'general', q: 'Namaz mein dil kahin aur hota hai — kya karun?', a: 'Samajh kar padho — matlab yaad karo. Jaise Fatiha ka matlab: "Hum sirf teri ibadat karte hain." "A\'oozu billah" padho waswase ke waqt.', ref: 'Surah Mu\'minun 1-2' },
    { id: 'f19', cat: 'general', q: 'Sabaq bhool jata hoon — kya karun?', a: 'Roz subah 10 min — kal ka sabaq. Roz shaam 10 min — pichhle hafte ka sabaq. Har juma — poora. App ka "Daily Target" use karo.', ref: 'Daily Target' },
    { id: 'f20', cat: 'general', q: 'Kya sirf app se Quran seekh sakta hoon?', a: 'App achha tool hai — magar asli ustad zaroori. App awaaz deta hai, magar zubaan ko theek koi ustad hi kar sakta hai. Dono saath chalao.', ref: 'Ustad ki baat' },
    { id: 'f21', cat: 'general', q: 'Din mein kitna waqt dena chahiye?', a: 'Kam se kam 15 min. Subah 10 min (naya sabaq), shaam 5 min (dohrana). Roz ki aadat > lambi ek din ki mehnat.', ref: 'Daily Target' },
    { id: 'f22', cat: 'general', q: 'Ghalti hone par kya karna chahiye?', a: 'Foran tauba: "Astaghfirullah." Phir dobara koshish. Rasoolullah ﷺ ne farmaya: "Har insaan ghalti karta hai, magar behtar woh hai jo tauba kare." Iblis ki tabahi takabbur thi, Adam (a.s.) ki nijaat tauba.', ref: 'Tirmidhi 2499' }
];
