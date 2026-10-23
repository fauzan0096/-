// Nabiyon ke waqiaat — har waqia taqreeban 2 minute ka.
// Sab waqiaat Quran-e-Kareem aur sahih ahadees par mabni hain.
// Naya waqia add karna ho to is list mein ek object aur jod dein.
//   body  : paragraphs ki list
//   dua   : (optional) Quran/hadees ka Arabic jumla + uska matlab
//   seekh : is waqie se sabaq
const waqiaatData = [
    {
        id: "adam", emoji: "🌍", name: "Hazrat Adam (a.s.)", ar: "آدَمُ عَلَيْهِ السَّلَام", tag: "Pehle Insaan",
        ref: "Surah Baqarah 30–39 • Surah A'raf 11–25", color: "#2E7D5B",
        body: [
            "Allah Ta'ala ne farishton se farmaya ki main zameen par ek khalifa banane wala hoon. Phir Allah ne Hazrat Adam (a.s.) ko mitti se paida kiya, unmein apni taraf se rooh phoonki aur unhein cheezon ke naam sikha diye. Farishton ko hukm hua ki Adam ko sajda karo. Sab ne sajda kiya, magar Iblis ne inkar kar diya. Usne kaha, 'Main isse behtar hoon, mujhe aag se banaya aur isse mitti se.' Yeh takabbur tha, aur isi ki wajah se woh Allah ki rehmat se door ho gaya.",
            "Allah ne Adam (a.s.) aur unki biwi Hazrat Hawwa ko Jannat mein rehne ki jagah di aur farmaya ki jahan se chaho khao, bas us ek darakht ke qareeb na jana. Iblis ne dushmani mein unhein behkaya aur qasam kha kar kaha ki main tumhara khair-khwah hoon. Dono se chook ho gayi aur unhone us darakht se kha liya.",
            "Ghalti ka ehsaas hote hi dono sharminda hue. Unhone Iblis ki tarah zid nahi ki, balki Allah ke saamne jhuk gaye aur arz kiya: 'Aye hamare Rab! Hum ne apni jaanon par zulm kiya. Agar tu hamein maaf na kare aur reham na farmaye to hum zaroor nuqsan uthane walon mein se ho jayenge.' Allah ne unki tauba qabool farma li.",
            "Phir Allah ne unhein zameen par utaar diya aur farmaya ki mere paas se tumhare liye hidayat aayegi. Jo meri hidayat par chalega, na use koi dar hoga na woh ghamgeen hoga. Is tarah zameen par insaan ki nasl ka silsila shuru hua."
        ],
        dua: { ar: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", ro: "Aye hamare Rab! Humne apni jaanon par zulm kiya. Agar tu maaf na kare aur reham na kare to hum nuqsan uthane walon mein honge. (A'raf 23)" },
        seekh: "Ghalti har insaan se ho sakti hai, magar behtareen woh hai jo foran tauba kar le. Takabbur se bacho — yahi Iblis ki tabahi ki wajah bana."
    },
    {
        id: "nuh", emoji: "⛵", name: "Hazrat Nuh (a.s.)", ar: "نُوحٌ عَلَيْهِ السَّلَام", tag: "Sabr ke Paikar",
        ref: "Surah Hud 25–48 • Surah Nuh • Ankabut 14", color: "#2A7FA8",
        body: [
            "Hazrat Nuh (a.s.) apni qaum ki taraf bheje gaye. Log Allah ko chhod kar Wadd, Suwa', Yaghuth, Ya'uq aur Nasr jaise butoon ki ibadat karte the. Nuh (a.s.) ne saade nau sau saal (950 saal) tak unhein raat din, khule aam aur chupke chupke Allah ki taraf bulaya. Woh farmate: 'Apne Rab se maafi maango, beshak woh bahut maaf karne wala hai.'",
            "Magar bahut thode log imaan laye. Qaum ke sardar kehte, 'Yeh to hum jaisa hi insaan hai, aur iske saath sirf kamzor log hain.' Kuch log to unki baat se bachne ke liye kaanon mein ungliyan de lete aur kapdon se munh dhak lete.",
            "Aakhir Allah ne wahi ki ki ab tumhari qaum mein se koi aur imaan nahi layega. Nuh (a.s.) ko kashti banane ka hukm hua. Woh kashti banate aur qaum ke sardar paas se guzarte to mazaaq udate. Nuh (a.s.) sabr se farmate, 'Agar tum hum par hanste ho to ek din hum bhi tum par hansenge.'",
            "Phir Allah ka hukm aaya: tannur ubal pada, aasman se tez baarish barsi aur zameen se chashme phoot pade. Nuh (a.s.) ne har jaandar ka ek ek jora kashti mein rakha aur imaan walon ko sawar kiya. Lehrein pahadon jaisi thin. Nuh (a.s.) ne apne bete ko pukara, 'Beta! Hamare saath sawar ho ja.' Usne kaha, 'Main kisi pahad par chadh jaunga jo mujhe pani se bacha lega.' Nuh (a.s.) ne farmaya, 'Aaj Allah ke hukm se koi bachane wala nahi, siwaye us ke jis par woh reham kare.' Itne mein ek lehar dono ke beech aa gayi aur woh doobne walon mein shamil ho gaya.",
            "Jab toofan thama to Allah ke hukm se pani utar gaya aur kashti Judi pahad par aa thehri."
        ],
        dua: { ar: "بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا", ro: "Allah ke naam se is (kashti) ka chalna bhi hai aur thehrna bhi. (Hud 41)" },
        seekh: "Nijaat rishte se nahi, imaan aur amal se milti hai. Haq ki dawat mein sabr rakho, chahe log kam hi maanein."
    },
    {
        id: "salih", emoji: "🐪", name: "Hazrat Salih (a.s.)", ar: "صَالِحٌ عَلَيْهِ السَّلَام", tag: "Oontni ki Nishani",
        ref: "Surah A'raf 73–79 • Hud 61–68 • Shu'ara 141–159", color: "#B9772E",
        body: [
            "Aad ke baad Thamud ki qaum aayi. Allah ne unhein zameen mein basaya; woh maidanon mein mehal banate aur pahadon ko tarash kar ghar banate the. Magar neematon ka shukr karne ke bajaye woh butparasti aur fasaad mein pad gaye. Allah ne unhi mein se Hazrat Salih (a.s.) ko nabi bana kar bheja.",
            "Salih (a.s.) ne farmaya: 'Aye meri qaum! Sirf Allah ki ibadat karo, uske siwa tumhara koi mabood nahi. Beshak mera Rab qareeb hai aur dua qabool karne wala hai.' Qaum ke sardaron ne kaha, 'Salih! Tum to is se pehle hamari ummeedon ka markaz the. Agar sachche ho to koi nishani le aao.'",
            "Allah ne ek oontni ko nishani bana kar bheja. Salih (a.s.) ne farmaya: 'Yeh Allah ki oontni hai, tumhare liye nishani. Ise Allah ki zameen mein charne do aur ise burai ke saath haath na lagana, warna dardnaak azaab tumhein pakad lega. Pani ki baari ek din iski hogi aur ek din tumhari.'",
            "Kuch din aise hi guzre. Phir qaum ke sab se badbakht shakhs ne oontni ki taangein kaat dein aur use maar daala. Salih (a.s.) ne farmaya, 'Teen din apne gharon mein faida utha lo. Yeh aisa wada hai jo jhoota nahi hoga.'",
            "Teen din baad ek zordaar chikh aur zalzale ne unhein pakad liya, aur subah woh apne gharon mein ghutnon ke bal mare pade the. Salih (a.s.) aur imaan walon ko Allah ne azaab se bacha liya."
        ],
        dua: { ar: "إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ", ro: "Beshak mera Rab qareeb hai, dua qabool karne wala hai. (Hud 61)" },
        seekh: "Allah ki neematon ka shukr karo. Allah ki nishaniyon ka mazaaq udane aur ahl-e-haq ko satane ka anjaam tabahi hai."
    },
    {
        id: "ibrahim", emoji: "🔥", name: "Hazrat Ibrahim (a.s.)", ar: "إِبْرَاهِيمُ عَلَيْهِ السَّلَام", tag: "Khaleelullah",
        ref: "Surah Anbiya 51–70 • Surah Saffat 83–98", color: "#D2691E",
        body: [
            "Hazrat Ibrahim (a.s.) bachpan hi se tawheed ke chahne wale the. Unki qaum apne haathon ke banaye hue butoon ki pooja karti thi. Ibrahim (a.s.) ne apne walid aur qaum se poochha, 'Yeh murtiyan kya hain jin ke saamne tum jame baithe rehte ho?' Unhone jawab diya, 'Humne apne baap dadaon ko inki ibadat karte paaya hai.'",
            "Ek din qaum mele ke liye shehar se bahar gayi. Ibrahim (a.s.) butkhane mein aaye, butoon se poochha, 'Tum khaate kyun nahi? Bolte kyun nahi?' Phir unhone sab butoon ko tod diya, siwaye sab se bade but ke, taake log usi se poochhein. Qaum lauti to bahut ghabrayi, 'Humare mabudon ke saath yeh kis ne kiya?' Ibrahim (a.s.) ko bulaya gaya. Unhone kaha, 'Un se hi poochh lo, agar yeh bolte hain.' Woh dil hi dil mein sochne lage, phir kehne lage, 'Tum sab hi zalim ho.' Phir sharminda hokar bole, 'Tum to jaante ho yeh bolte nahi.' Ibrahim (a.s.) ne farmaya, 'Phir kya tum Allah ke siwa unki ibadat karte ho jo na tumhein faida de sakte hain na nuqsan?'",
            "Ghusse mein qaum ne kaha, 'Ise jala do aur apne mabudon ki madad karo.' Bahut badi aag bhadkayi gayi aur Ibrahim (a.s.) ko us mein daal diya gaya. Us waqt unki zaban par yeh alfaaz the: 'Hasbunallahu wa ni'mal wakeel.'",
            "Allah ne aag ko hukm diya: 'Aye aag! Ibrahim par thandi aur salamati ban ja.' Aag unhein nuqsan na pahuncha saki aur qaum ki saari chaal nakaam ho gayi.",
            "Ibrahim (a.s.) ne Allah ke liye watan bhi chhoda, aur Allah ne unhein apna khaleel (dost) banaya. Aaj bhi har namaz mein unke naam par darood padha jata hai."
        ],
        dua: { ar: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ", ro: "Hamein Allah kaafi hai aur woh behtareen kaarsaaz hai. (Bukhari)" },
        seekh: "Haq par qaim raho chahe saari qaum mukhalif ho. Jo Allah par bharosa karta hai, Allah uske liye aag ko bhi thandak bana deta hai."
    },
    {
        id: "yusuf", emoji: "⭐", name: "Hazrat Yusuf (a.s.)", ar: "يُوسُفُ عَلَيْهِ السَّلَام", tag: "Ahsan-ul-Qasas",
        ref: "Surah Yusuf (poori surah)", color: "#8E5BC0",
        body: [
            "Hazrat Yusuf (a.s.) ne bachpan mein khwab dekha ki gyarah sitare, suraj aur chand unhein sajda kar rahe hain. Walid Hazrat Yaqub (a.s.) ne farmaya, 'Beta! Apna khwab bhaiyon ko na sunana, woh tumhare khilaf saazish karenge.'",
            "Bhai jalan se jal gaye. Woh Yusuf ko saath le gaye, kuen mein daal diya aur ro ro kar walid ko jhoota qissa suna diya ki bheriya kha gaya. Ek qafila aaya, kuen se Yusuf ko nikala aur Misr mein bech diya. Misr ke Aziz ne unhein izzat ke saath ghar mein rakha.",
            "Jawani mein Aziz ki biwi ne unhein gunah ki taraf bulaya. Yusuf (a.s.) ne farmaya, 'Maazallah! Woh mera maalik hai, usne mujhe achhi jagah di.' Woh darwaze ki taraf bhaage aur bequsoor hone ke bawajood kayi saal qaid khane mein rahe. Wahan bhi unhone qaidiyon ko tawheed ki dawat di aur unke khwabon ki tabeer batayi.",
            "Baad mein Misr ke badshah ne khwab dekha: saat mote gaaye ko saat dubli gaayein kha rahi hain. Yusuf (a.s.) ne tabeer di: saat saal khushhali ke aayenge, phir saat saal qahat ke. Unhone mashwara diya ki khushhali mein ghalla bacha kar rakho. Badshah ne unhein mulk ke khazaano par muqarrar kar diya.",
            "Qahat mein Kanaan se unke bhai ghalla lene aaye. Yusuf (a.s.) ne unhein pehchan liya, magar bhai nahi pehchane. Jab raaz khula to bhai sharminda hue. Yusuf (a.s.) ne farmaya, 'Aaj tum par koi malamat nahi, Allah tumhein maaf kare.' Phir walid aur sab se milaap hua aur bachpan ke khwab ki tabeer poori hui."
        ],
        dua: { ar: "لَا تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ ۖ يَغْفِرُ اللَّهُ لَكُمْ", ro: "Aaj tum par koi malamat nahi, Allah tumhein maaf kare. (Yusuf 92)" },
        seekh: "Sabr aur taqwa ka anjaam hamesha achha hota hai. Badla lene ki taqat hone ke bawajood maaf kar dena sab se bada akhlaq hai."
    },
    {
        id: "ayyub", emoji: "🌱", name: "Hazrat Ayyub (a.s.)", ar: "أَيُّوبُ عَلَيْهِ السَّلَام", tag: "Sabr-e-Jameel",
        ref: "Surah Anbiya 83–84 • Surah Sad 41–44", color: "#3C9D6E",
        body: [
            "Hazrat Ayyub (a.s.) Allah ke nek, shukr guzaar aur sabr karne wale nabi the. Allah ne unhein ek lambi aur sakht bimari mein mubtala kiya. Quran mein Allah ne khaas taur par farmaya: 'Hamare banday Ayyub ko yaad karo.'",
            "Bimari ne unke jism ko kamzor kar diya, magar unki zaban par kabhi shikwa nahi aaya. Woh sabr karte rahe aur Allah ko yaad karte rahe. Aakhir ek din unhone apne Rab ko pukara: 'Mujhe takleef pahunchi hai aur tu sab se zyada reham karne wala hai.' Dekhiye, unhone apni takleef Allah ke saamne rakh di aur uski rehmat ka zikr kiya — yeh dua ka bahut khoobsurat tareeqa hai.",
            "Allah ne unki dua qabool ki aur farmaya, 'Apna paon zameen par maaro, yeh thanda chashma hai, nahane aur peene ke liye.' Ayyub (a.s.) ne paon maara, chashma phoot pada. Unhone us se ghusl kiya, pani piya aur Allah ne unhein sehat ata farma di. Unhone ek qasam khayi thi; Allah ne aasan raasta bataya ki tinkon ka ek mutthha haath mein lo, us se maaro aur apni qasam na todo.",
            "Allah ne unhein unke ghar wale bhi lauta diye, aur unke saath utne hi aur ata kiye, apni khaas rehmat ki wajah se aur ibadat guzaaron ke liye nasihat ke taur par.",
            "Quran ne unke baare mein gawahi di: 'Beshak humne use sabr karne wala paaya, woh bahut achha banda tha, bahut rujoo karne wala.'"
        ],
        dua: { ar: "أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ", ro: "Mujhe takleef pahunchi hai aur tu sab se zyada reham karne wala hai. (Anbiya 83)" },
        seekh: "Bimari aur takleef mein shikwa nahi, dua karo. Allah sabr karne walon ko be-hisaab ajar deta hai."
    },
    {
        id: "musa", emoji: "🌊", name: "Hazrat Musa (a.s.)", ar: "مُوسَى عَلَيْهِ السَّلَام", tag: "Kaleemullah",
        ref: "Surah Qasas 3–42 • Taha 9–98 • Shu'ara 10–68", color: "#2563A8",
        body: [
            "Misr ka badshah Firaun bahut zalim tha. Woh Bani Israel ke bete qatl karwata aur betiyon ko zinda rakhta. Isi zamane mein Hazrat Musa (a.s.) paida hue. Allah ne unki walida ko ilham kiya, 'Ise doodh pilao, jab khatra mehsoos ho to ise darya mein daal do. Dar mat, gham na kar, hum use tere paas wapas laayenge aur use rasool banayenge.' Sandooq behta hua Firaun ke mahal tak pahunch gaya. Firaun ki biwi ne kaha, 'Yeh mere aur tere liye aankhon ki thandak hai, ise qatl na karo.'",
            "Jawani mein ek jhagde ke dauran Musa (a.s.) ke ghoonse se ek Qibti mar gaya. Woh bahut pareshan hue, Allah se maafi maangi aur Allah ne maaf farma diya. Khatre ke darr se woh Madyan chale gaye aur kai saal wahan rahe. Wapsi par Tur pahad ke qareeb unhein aag nazar aayi. Wahan Allah ne unhein pukara, 'Aye Musa! Beshak main hi tera Rab hoon.' Unhein nabuwwat mili, aur asa aur roshan haath ke maujize diye gaye. Musa (a.s.) ne dua ki, 'Aye mere Rab! Mera seena khol de aur mera kaam aasan kar de.' Bhai Harun (a.s.) ko unka madadgar banaya gaya.",
            "Firaun ne dawat qabool na ki. Muqable mein jadugaron ne rassiyan daalin, Musa (a.s.) ka asa saanp ban kar sab ko nigal gaya. Jadugar sajde mein gir pade aur bole, 'Hum Musa aur Harun ke Rab par imaan laye.'",
            "Phir Musa (a.s.) Bani Israel ko raat ko le kar nikle. Peeche Firaun ka lashkar tha, saamne samundar. Log bole, 'Hum to pakde gaye!' Musa (a.s.) ne farmaya, 'Hargiz nahi! Mera Rab mere saath hai, woh zaroor raasta dikhayega.' Allah ke hukm se asa samundar par maara gaya, samundar phat gaya aur har hissa bade pahad jaisa ho gaya. Bani Israel paar ho gaye aur Firaun apne lashkar samet doob gaya."
        ],
        dua: { ar: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي", ro: "Aye mere Rab! Mera seena khol de aur mera kaam aasan kar de. (Taha 25–26)" },
        seekh: "Zalim chahe kitna taqatwar ho, Allah ke saamne kuch nahi. Mushkil ke waqt yaqeen rakho ki Allah raasta nikalega."
    },
    {
        id: "dawud", emoji: "🛡️", name: "Hazrat Dawud (a.s.)", ar: "دَاوُودُ عَلَيْهِ السَّلَام", tag: "Zabur wale",
        ref: "Surah Baqarah 246–251 • Surah Sad 17–26 • Saba 10–11", color: "#7A6A2F",
        body: [
            "Bani Israel ka ek zalim badshah Jalut tha. Allah ne Talut ko unka sardar banaya. Jab lashkar nikla to Talut ne kaha, 'Allah tumhara imtihan ek nehar se lega: jo us se pi lega woh mere saath nahi, aur jo na piyega ya sirf ek chullu pi lega woh mere saath hai.' Zyadatar logon ne khoob pani pi liya; sirf thode saath rahe. Jab Jalut ka lashkar saamne aaya to jinhein Allah se milne ka yaqeen tha unhone kaha, 'Kitni hi chhoti jamaatein Allah ke hukm se badi jamaaton par ghalib aayi hain, aur Allah sabr karne walon ke saath hai.'",
            "Unhone dua ki, 'Aye hamare Rab! Hum par sabr undel de, hamare qadam jama de aur kafir qaum ke muqable mein hamari madad farma.' Is lashkar mein Dawud (a.s.) bhi the. Allah ke hukm se unhone Jalut ko maar giraya. Phir Allah ne unhein badshahat, hikmat aur ilm ata farmaya.",
            "Allah ne unhein Zabur ata ki. Pahad aur parinde unke saath tasbeeh karte. Allah ne unke liye lohe ko narm kar diya taake woh zirahein banayein. Nabi ﷺ ne farmaya ki Dawud (a.s.) apne haath ki mehnat se khaate the (Bukhari).",
            "Woh bahut ibadat guzaar the. Nabi ﷺ ne farmaya, 'Allah ke nazdeek sab se pasandida roza Dawud (a.s.) ka roza hai, ek din roza rakhte aur ek din chhod dete. Aur sab se pasandida namaz Dawud (a.s.) ki namaz hai, aadhi raat tak sote, phir raat ka tihai hissa qiyam karte aur chhatha hissa phir so jaate.' (Bukhari, Muslim)",
            "Allah ne unhein farmaya, 'Aye Dawud! Humne tumhein zameen mein khalifa banaya, to logon ke darmiyan haq ke saath faisla karo aur nafs ki pairvi na karo.'"
        ],
        dua: { ar: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", ro: "Aye hamare Rab! Hum par sabr undel de, hamare qadam jama de aur hamari madad kar. (Baqarah 250)" },
        seekh: "Jeet taadaad se nahi, Allah ki madad aur sabr se milti hai. Badshahat milne ke baad bhi ibadat aur mehnat na chhodo."
    },
    {
        id: "sulaiman", emoji: "🐜", name: "Hazrat Sulaiman (a.s.)", ar: "سُلَيْمَانُ عَلَيْهِ السَّلَام", tag: "Shukr guzaar Badshah",
        ref: "Surah Naml 15–44 • Surah Sad 30–40", color: "#C2872B",
        body: [
            "Hazrat Sulaiman (a.s.), Hazrat Dawud (a.s.) ke bete the. Allah ne unhein nabuwwat, ilm aur aisi badshahat di jaisi unke baad kisi ko nahi mili. Hawa unke hukm mein thi, jinnat unke liye kaam karte aur Allah ne unhein parindon ki boli sikha di. Sulaiman (a.s.) ne farmaya, 'Yeh mere Rab ka khula fazl hai.'",
            "Ek din woh lashkar ke saath chiyuntiyon ki wadi se guzre. Ek chiyunti ne kaha, 'Aye chiyuntiyo! Apne bilon mein ghus jao, kahin Sulaiman aur uska lashkar tumhein be-khabri mein kuchal na dein.' Sulaiman (a.s.) uski baat sun kar muskura diye aur dua ki, 'Aye mere Rab! Mujhe taufeeq de ki main tere us ehsaan ka shukr ada karun jo tune mujh par aur mere walidain par kiya, aur aisa nek amal karun jo tujhe pasand ho.'",
            "Ek din unhone parindon ka jaiza liya to Hud-hud gayab tha. Thodi der mein Hud-hud aa gaya aur bola, 'Main woh khabar laya hoon jo aap ko maloom nahi: Saba ki sarzameen par ek aurat hukmrani karti hai, magar woh aur uski qaum Allah ko chhod kar suraj ko sajda karte hain.'",
            "Sulaiman (a.s.) ne Saba ki malika ko khat bheja jis ki ibtida 'Bismillahir Rahmanir Raheem' se thi. Aakhir malika khud aayi. Allah ke fazl se uska takht pal bhar mein Sulaiman (a.s.) ke saamne aa gaya. Unhone ghamand nahi kiya, balki farmaya, 'Yeh mere Rab ka fazl hai taake woh mujhe aazmaye ki main shukr karta hoon ya nashukri.' Malika ne bhi imaan qabool kar liya aur kaha, 'Aye mere Rab! Main ne apni jaan par zulm kiya, ab main Sulaiman ke saath Allah, Rabb-ul-Aalameen ke liye jhuk gayi.'"
        ],
        dua: { ar: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ", ro: "Aye mere Rab! Mujhe taufeeq de ki main tere us ehsaan ka shukr karun jo tune mujh par aur mere walidain par kiya. (Naml 19)" },
        seekh: "Taqat aur daulat milne par ghamand nahi, shukr karo. Har neemat ko Allah ka fazl samjho."
    },
    {
        id: "yunus", emoji: "🐋", name: "Hazrat Yunus (a.s.)", ar: "يُونُسُ عَلَيْهِ السَّلَام", tag: "Zun-Nun",
        ref: "Surah Yunus 98 • Anbiya 87–88 • Saffat 139–148", color: "#1F8A9E",
        body: [
            "Hazrat Yunus (a.s.) ko Allah ne Ninawa ki qaum ki taraf bheja. Unhone qaum ko Allah ki taraf bulaya, magar qaum ne jhutlaya. Yunus (a.s.) mayoos ho kar naraazgi mein shehar se nikal gaye, aur unhone Allah ke hukm ka intezar na kiya.",
            "Woh ek kashti mein sawar hue. Kashti bhar gayi aur qur'a dala gaya to Yunus (a.s.) ka naam nikla, aur unhein samundar mein phenk diya gaya. Allah ke hukm se ek bahut badi machhli ne unhein nigal liya.",
            "Machhli ke pet, samundar aur raat ke teen andheron mein Yunus (a.s.) ne Allah ko pukara: 'Tere siwa koi mabood nahi, tu paak hai, beshak main hi zalimon mein se tha.' Agar woh tasbeeh karne walon mein se na hote to qayamat tak usi ke pet mein rehte.",
            "Allah ne unki dua qabool ki aur unhein gham se nijaat di. Machhli ne unhein ek khule maidan mein dal diya. Woh bimar aur kamzor the, to Allah ne un par ek bel wala darakht ugaya (jis ke patte unhein saaya dete the).",
            "Idhar qaum ne azaab ki nishaniyan dekh kar sachche dil se tauba ki aur imaan le aayi, to Allah ne dunya ki zindagi mein un se zillat ka azaab hata liya. Allah ne Yunus (a.s.) ko ek lakh ya us se zyada logon ki taraf bheja, woh sab imaan laye.",
            "Hadees mein aata hai ki jo musalman kisi bhi hajat ke liye Yunus (a.s.) ki yeh dua karega, Allah uski dua qabool farmayega (Tirmidhi)."
        ],
        dua: { ar: "لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ", ro: "Tere siwa koi mabood nahi, tu paak hai, beshak main zalimon mein se tha. (Anbiya 87)" },
        seekh: "Mushkil se mushkil halat mein bhi Allah ki taraf lautna chahiye. Allah ke hukm ka intezar karna sabr ka hissa hai."
    },
    {
        id: "isa", emoji: "🌴", name: "Hazrat Isa (a.s.)", ar: "عِيسَى عَلَيْهِ السَّلَام", tag: "Ruhullah",
        ref: "Surah Aal-e-Imran 35–59 • Surah Maryam 16–36", color: "#4F9A5A",
        body: [
            "Hazrat Maryam (a.s.) ek nek aur ibadat guzaar khatoon thin, jo Hazrat Zakariya (a.s.) ki kafalat mein parwan chadhin. Ek din Allah ka bheja hua farishta Jibreel (a.s.) insaan ki shakl mein aaya aur kaha, 'Main tere Rab ka qasid hoon, taake tujhe ek paak beta dun.' Maryam (a.s.) ne hairat se kaha, 'Mere haan beta kaise hoga, mujhe to kisi insaan ne haath tak nahi lagaya?' Jawab mila, 'Aisa hi hoga. Tere Rab ne farmaya hai ki yeh mere liye aasan hai.'",
            "Jab wiladat ka waqt aaya to dard ke mare woh khajoor ke tane ke paas aayin aur kehne lagin, 'Kaash main is se pehle mar jaati.' Unhein pukara gaya, 'Gham na karo, tumhare Rab ne tumhare neeche ek chashma jaari kar diya hai. Khajoor ke tane ko hilao, tum par taaza khajoorein girengi.'",
            "Woh bachche ko lekar qaum ke paas aayin to logon ne baatein banayin. Maryam (a.s.) ne bachche ki taraf ishara kar diya. Log bole, 'Hum godi ke bachche se kaise baat karein?' Tab Isa (a.s.) ne jhoole mein farmaya: 'Main Allah ka banda hoon. Usne mujhe kitab di aur mujhe nabi banaya. Jahan bhi main hoon mujhe barkat wala banaya, aur jab tak zinda hoon namaz aur zakat ka hukm diya, aur apni walida ke saath achha sulook karne wala banaya.'",
            "Jab Isa (a.s.) bade hue to Allah ne unhein Injeel di aur khaas maujize ata kiye. Allah ke hukm se woh mitti se parinde ki shakl banakar phoonkte to woh parinda ban jaata; madar-zad andhe aur korh ke marizon ko shifa dete aur murdon ko zinda karte.",
            "Dushmanon ne saazish ki, magar Allah ne unhein apni taraf uthaa liya. Nabi ﷺ ne khabar di ki Isa (a.s.) qayamat ke qareeb zameen par nazil honge (Bukhari)."
        ],
        dua: { ar: "إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا", ro: "Beshak main Allah ka banda hoon, usne mujhe kitab di aur mujhe nabi banaya. (Maryam 30)" },
        seekh: "Allah har cheez par qadir hai. Walidain ke saath husn-e-sulook aur Allah ki bandagi sab se bada maqam hai."
    },
    {
        id: "muhammad", emoji: "🕋", name: "Nabi-e-Akram ﷺ — Hijrat", ar: "مُحَمَّدٌ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ", tag: "Ghar-e-Thawr",
        ref: "Surah Anfal 30 • Surah Tauba 40 • Bukhari 3905, 3653", color: "#123B7A",
        body: [
            "Makka mein Quraish ne Nabi ﷺ aur sahaba par zulm ki inteha kar di. Jab Allah ne Madina ki taraf hijrat ki ijazat di, to dushmanon ne mashwara kiya ki Nabi ﷺ ko qatl kar diya jaye. Allah ne is saazish ka zikr Quran mein kiya: 'Woh bhi tadbeer kar rahe the aur Allah bhi tadbeer kar raha tha, aur Allah sab se behtar tadbeer karne wala hai.'",
            "Nabi ﷺ dopahar ke waqt Hazrat Abu Bakr (r.a.) ke ghar tashreef laye aur hijrat ka faisla hua. Raat ke andhere mein dono Makka se nikle aur Thawr pahad ki ek ghaar mein pahunch gaye, jahan woh teen raaton tak ruke rahe. Quraish ne elan kiya ki jo Nabi ﷺ ko pakad kar laye use sau oont inaam milenge.",
            "Dushman unhein dhoondte hue ghaar ke bilkul qareeb pahunch gaye. Abu Bakr (r.a.) ne kaha, 'Ya Rasoolallah! Agar inme se koi apne qadmon ki taraf nazar kar le to hamein dekh lega.' Nabi ﷺ ne farmaya, 'Abu Bakr! Un do ke baare mein tumhara kya gumaan hai jin ka teesra Allah hai?' (Bukhari, Muslim)",
            "Quran ne is manzar ko yun bayan kiya: 'Jab woh dono ghaar mein the, jab woh apne saathi se keh rahe the: gham na karo, beshak Allah hamare saath hai. To Allah ne un par apni taraf se sakoon utaara.'",
            "Phir Nabi ﷺ aur Abu Bakr (r.a.) Madina ki taraf rawana hue. Madina walon ne bahut khushi aur mohabbat se unka istiqbal kiya. Yahin se Islam ki ek nayi aur roshan manzil shuru hui, aur isi hijrat se baad mein hijri calendar ka aaghaz hua."
        ],
        dua: { ar: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", ro: "Gham na karo, beshak Allah hamare saath hai. (Tauba 40)" },
        seekh: "Mushkil mein Allah par bharosa aur saathi se wafadari sikhni chahiye. Jo Allah ke saath hota hai, Allah uske saath hota hai."
    }
];
