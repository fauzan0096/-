/* Aghaaz-e-Asaas Kids — i18n.js
   Panch zubanein: Roman Urdu (default), اردو, हिन्दी, English, मराठी.
   - AA.t(key)      : ek lafz ka tarjuma
   - AA.i18n(html)  : poori screen/HTML ka tarjuma (ji dost nahi mila, wo waise hi rehta hai)
   - AA.mn(item)    : content ka matlab chuni hui zubaan mein (data.js ke mr/hi/ro/en fields)
*/
(function () {
  'use strict';
  const AA = window.AA;

  AA.LANGS = [
    { id: 'ro', native: 'Roman Urdu' },
    { id: 'ur', native: 'اردو' },
    { id: 'hi', native: 'हिन्दी' },
    { id: 'en', native: 'English' },
    { id: 'mr', native: 'मराठी' }
  ];
  // tarjuma kis tarteeb se: [ur, hi, en, mr]
  const ORDER = ['ur', 'hi', 'en', 'mr'];
  AA.lang = 'ro';

  const D = {
    /* ---- aam ---- */
    'Wapas': ['واپس', 'वापस', 'Back', 'मागे'],
    'Aage chalo': ['آگے چلو', 'आगे चलो', 'Next', 'पुढे चला'],
    'Agla': ['اگلا', 'अगला', 'Next', 'पुढे'],
    'Pichla': ['پچھلا', 'पिछला', 'Previous', 'मागे'],
    'Saaf': ['صاف', 'साफ़', 'Clear', 'साफ'],
    'Dobara': ['دوبارہ', 'दोबारा', 'Again', 'पुन्हा'],
    'Shuru Karein': ['شروع کریں', 'शुरू करें', 'Start', 'सुरू करा'],
    'Shuru': ['شروع', 'शुरू', 'Start', 'सुरू'],
    'Ruko': ['رکو', 'रुको', 'Stop', 'थांबा'],
    'Naya dost': ['نیا دوست', 'नया दोस्त', 'New child', 'नवीन मित्र'],
    'Kaun khelega?': ['کون کھیلے گا؟', 'कौन खेलेगा?', 'Who will play?', 'कोण खेळणार?'],
    'Bachcha badlein': ['بچہ بدلیں', 'बच्चा बदलें', 'Switch child', 'मूल बदला'],
    'Awaaz': ['آواز', 'आवाज़', 'Sound', 'आवाज'],
    'Walidain': ['والدین', 'माता-पिता', 'Parents', 'पालक'],
    'Walidain ka hissa': ['والدین کا حصہ', 'माता-पिता का हिस्सा', 'Parents area', 'पालक विभाग'],
    'Bachcha ka naam likhein': ['بچے کا نام لکھیں', 'बच्चे का नाम लिखें', 'Write the child\'s name', 'मुलाचे नाव लिहा'],
    'Naam': ['نام', 'नाम', 'Name', 'नाव'],
    'Nanha': ['ننھا', 'नन्हा', 'Little (3–4)', 'लहान (३–४)'],
    'Bada': ['بڑا', 'बड़ा', 'Big (5–7)', 'मोठा (५–७)'],

    /* ---- home ---- */
    'Seekho': ['سیکھو', 'सीखो', 'Learn', 'शिका'],
    'Khelo': ['کھیلو', 'खेलो', 'Play', 'खेळा'],
    'Deen': ['دین', 'दीन', 'Deen', 'दीन'],
    'میری دنیا': ['میری دنیا', 'मेरी दुनिया', 'My world', 'माझे जग'],
    'دیکھو • سنو • سیکھو': ['دیکھو • سنو • سیکھو', 'देखो • सुनो • सीखो', 'See • Hear • Learn', 'पहा • ऐका • शिका'],
    'حرف سیکھو': ['حرف سیکھو', 'हरफ़ सीखो', 'Learn letters', 'अक्षरे शिका'],
    'کھیل': ['کھیل', 'खेल', 'Games', 'खेळ'],
    'دو دوست': ['دو دوست', 'दो दोस्त', 'Two friends', 'दोन मित्र'],
    'رنگ بھرو': ['رنگ بھرو', 'रंग भरो', 'Colour', 'रंग भरा'],
    'Rang Bharo': ['رنگ بھرو', 'रंग भरो', 'Colour', 'रंग भरा'],
    'دعائیں': ['دعائیں', 'दुआएँ', 'Duas', 'दुआ'],
    'چھوٹی سورتیں': ['چھوٹی سورتیں', 'छोटी सूरतें', 'Short surahs', 'छोट्या सुरा'],
    'نماز': ['نماز', 'नमाज़', 'Namaz', 'नमाज'],
    'پانچ نمازیں': ['پانچ نمازیں', 'पाँच नमाज़ें', 'Five namaz', 'पाच नमाज'],
    'نماز کا طریقہ': ['نماز کا طریقہ', 'नमाज़ का तरीक़ा', 'How to pray', 'नमाज कशी करावी'],
    'پانچ نمازیں ': ['پانچ نمازیں ', 'पाँच नमाज़ें ', 'Five namaz ', 'पाच नमाज '],
    'اچھی باتیں': ['اچھی باتیں', 'अच्छी बातें', 'Good habits', 'चांगल्या गोष्टी'],
    'میرا باغ': ['میرا باغ', 'मेरा बाग़', 'My garden', 'माझी बाग'],
    'Rang • Jaanwar • Ginti': ['رنگ • جانور • گنتی', 'रंग • जानवर • गिनती', 'Colours • Animals • Counting', 'रंग • प्राणी • मोजणी'],
    'Qaida — Alif Ba Ta': ['قاعدہ — الف ب ت', 'क़ायदा — अलिफ़ बा ता', 'Qaida — Alif Ba Ta', 'कायदा — अलिफ बा ता'],
    'Games': ['کھیل', 'खेल', 'Games', 'खेळ'],
    'Bari badal kar khelo': ['باری بدل کر کھیلو', 'बारी बदल कर खेलो', 'Take turns and play', 'पाळी घेऊन खेळा'],
    'Roz ki duaein': ['روز کی دعائیں', 'रोज़ की दुआएँ', 'Daily duas', 'रोजच्या दुआ'],
    'Chhoti surahein': ['چھوٹی سورتیں', 'छोटी सूरतें', 'Short surahs', 'छोट्या सुरा'],
    'Wudu aur namaz': ['وضو اور نماز', 'वज़ू और नमाज़', 'Wudu and namaz', 'वुजू आणि नमाज'],
    'Achhi aadatein': ['اچھی عادتیں', 'अच्छी आदतें', 'Good habits', 'चांगल्या सवयी'],
    'Darakht aur stickers': ['درخت اور اسٹیکر', 'पेड़ और स्टिकर', 'Tree and stickers', 'झाड आणि स्टिकर'],
    'Aaj ki dua': ['آج کی دعا', 'आज की दुआ', 'Today\'s dua', 'आजची दुआ'],
    'آج کا دہراؤ': ['آج کا دہراؤ', 'आज का दोहराव', 'Today\'s revision', 'आजची उजळणी'],
    'harf wapas aaye hain': ['حرف واپس آئے ہیں', 'हरफ़ वापस आए हैं', 'letters are due again', 'अक्षरे पुन्हा आली'],
    'کی باری': ['کی باری', 'की बारी', '\'s turn', 'ची पाळी'],

    /* ---- learn / lesson ---- */
    'Alif Ba Ta ka Gaana': ['الف با تا کا گانا', 'अलिफ़ बा ता का गाना', 'The Alif Ba Ta song', 'अलिफ बा ता गाणे'],
    'Sab huroof suno aur saath bolo': ['سب حروف سنو اور ساتھ بولو', 'सब हरफ़ सुनो और साथ बोलो', 'Hear all letters and say along', 'सर्व अक्षरे ऐका आणि सोबत म्हणा'],
    'دو حرفی الفاظ': ['دو حرفی الفاظ', 'दो अक्षरी शब्द', 'Two-letter words', 'दोन अक्षरी शब्द'],
    'Jodo — 2 harf ke lafz': ['جوڑو — دو حرف کے لفظ', 'जोड़ो — दो अक्षर के शब्द', 'Join — 2 letter words', 'जोडा — दोन अक्षरी शब्द'],
    'Harf jur kar lafz banta hai': ['حرف جڑ کر لفظ بنتا ہے', 'हरफ़ जुड़ कर शब्द बनता है', 'Letters join to make a word', 'अक्षरे जोडून शब्द बनतो'],
    'Dohrao': ['دہراؤ', 'दोहराओ', 'Revise', 'उजळणी'],
    'دہراؤ': ['دہراؤ', 'दोहराओ', 'Revise', 'उजळणी'],
    'Seekhe hue harf phir se': ['سیکھے ہوئے حرف پھر سے', 'सीखे हुए हरफ़ फिर से', 'Letters you know, again', 'शिकलेली अक्षरे पुन्हा'],
    'زبر زیر پیش': ['زبر زیر پیش', 'ज़बर ज़ेर पेश', 'Zabar Zer Pesh', 'जबर जेर पेश'],
    'Zabar • Zer • Pesh': ['زبر • زیر • پیش', 'ज़बर • ज़ेर • पेश', 'Zabar • Zer • Pesh', 'जबर • जेर • पेश'],
    'Harf ko awaaz dena seekho': ['حرف کو آواز دینا سیکھو', 'हरफ़ को आवाज़ देना सीखो', 'Learn how letters sound', 'अक्षराला आवाज देणे शिका'],
    'Pehle 10 harf seekh lo, phir yeh khulega': ['پہلے 10 حرف سیکھ لو، پھر یہ کھلے گا', 'पहले 10 हरफ़ सीख लो, फिर यह खुलेगा', 'Learn 10 letters first, then this opens', 'आधी 10 अक्षरे शिका, मगर हे उघडेल'],
    'Suno aur saath bolo 🎵': ['سنو اور ساتھ بولو 🎵', 'सुनो और साथ बोलो 🎵', 'Listen and say along 🎵', 'ऐका आणि सोबत म्हणा 🎵'],
    'DHYAN': ['دھیان', 'ध्यान', 'Focus', 'लक्ष'],
    'Aage': ['آگے', 'आगे', 'Next', 'पुढे'],
    'Suno aur bolo': ['سنو اور بولو', 'सुनो और बोलो', 'Listen and say', 'ऐका आणि बोला'],
    'Suno…': ['سنو…', 'सुनो…', 'Listen…', 'ऐका…'],
    'Ab tum bolo! 🗣️': ['اب تم بولو!', 'अब तुम बोलो!', 'Now you say it!', 'आता तू म्हण!'],
    'Shabash! 👏': ['شاباش!', 'शाबाश!', 'Well done!', 'शाब्बास!'],
    'ungli phero — harf bharo': ['انگلی پھیرو — حرف بھرو', 'उँगली फेरो — हरफ़ भरो', 'trace the letter', 'बोट फिरवा — अक्षर भरा'],
    'rang bharo': ['رنگ بھرو', 'रंग भरो', 'colour it', 'रंग भरा'],
    'اپنی پسند کا رنگ چنو': ['اپنی پسند کا رنگ چنو', 'अपनी पसंद का रंग चुनो', 'Pick a colour you like', 'आवडता रंग निवडा'],
    'ungli se harf bharo': ['انگلی سے حرف بھرو', 'उँगली से हरफ़ भरो', 'fill the letter with your finger', 'बोटाने अक्षर भरा'],
    'یہ ہے': ['یہ ہے', 'यह है', 'This is', 'हे आहे'],
    'سنو اور ڈھونڈو': ['سنو اور ڈھونڈو', 'सुनो और ढूँढो', 'Listen and find', 'ऐका आणि शोधा'],
    'اس کا حرف کون سا؟': ['اس کا حرف کون سا؟', 'इसका हरफ़ कौन सा?', 'Which letter is it?', 'याचे अक्षर कोणते?'],
    'MashaAllah!': ['ماشاءاللہ!', 'माशाअल्लाह!', 'MashaAllah!', 'माशाअल्लाह!'],
    'Shabash!': ['شاباش!', 'शाबाश!', 'Well done!', 'शाब्बास!'],

    /* ---- games ---- */
    'Khelte khelte seekho': ['کھیلتے کھیلتے سیکھو', 'खेलते खेलते सीखो', 'Learn while playing', 'खेळता खेळता शिका'],
    'Phir khelo': ['پھر کھیلو', 'फिर खेलो', 'Play again', 'पुन्हा खेळा'],
    'Pehli koshish mein sahi: ': ['پہلی کوشش میں صحیح: ', 'पहली कोशिश में सही: ', 'Right on first try: ', 'पहिल्या प्रयत्नात बरोबर: '],
    'Dohrao — ': ['دہراؤ — ', 'दोहराओ — ', 'Revise — ', 'उजळणी — '],
    'Dohrao': ['دہراؤ', 'दोहराओ', 'Revise', 'उजळणी'],
    'Harf Suno': ['حرف سنو', 'हरफ़ सुनो', 'Hear the letter', 'अक्षर ऐका'],
    'Harf aur Tasveer': ['حرف اور تصویر', 'हरफ़ और तस्वीर', 'Letter and picture', 'अक्षर आणि चित्र'],
    'Alag Harf Dhoondo': ['الگ حرف ڈھونڈو', 'अलग हरफ़ ढूँढो', 'Find the odd letter', 'वेगळे अक्षर शोधा'],
    'Agla Harf': ['اگلا حرف', 'अगला हरफ़', 'Next letter', 'पुढचे अक्षर'],
    'Rang Pehchano': ['رنگ پہچانو', 'रंग पहचानो', 'Know the colour', 'रंग ओळखा'],
    'Jaanwar ki Awaaz': ['جانور کی آواز', 'जानवर की आवाज़', 'Animal sounds', 'प्राण्यांचे आवाज'],
    'Ginti Karo': ['گنتی کرو', 'गिनती करो', 'Count', 'मोजा'],
    'Shakal Pehchano': ['شکل پہچانو', 'शक्ल पहचानो', 'Know the shape', 'आकार ओळखा'],
    'Gubbare Phoro': ['غبارے پھوڑو', 'गुब्बारे फोड़ो', 'Pop the balloons', 'फुगे फोडा'],
    'Harf ki Tokri': ['حرف کی ٹوکری', 'हरफ़ की टोकरी', 'Letter basket', 'अक्षराची टोपली'],
    'Yaad ka Khel': ['یاد کا کھیل', 'याद का खेल', 'Memory game', 'स्मरणाचा खेळ'],
    'Lafz Banao': ['لفظ بناؤ', 'शब्द बनाओ', 'Make a word', 'शब्द बनवा'],
    'Shakal ka Ghar': ['شکل کا گھر', 'शक्ल का घर', 'Shape house', 'आकाराचे घर'],
    'Pehle 6 harf seekho': ['پہلے 6 حرف سیکھو', 'पहले 6 हरफ़ सीखो', 'Learn 6 letters first', 'आधी 6 अक्षरे शिका'],
    'Pehle "Zabar Zer Pesh" seekho': ['پہلے "زبر زیر پیش" سیکھو', 'पहले "ज़बर ज़ेर पेश" सीखो', 'Learn "Zabar Zer Pesh" first', 'आधी "जबर जेर पेश" शिका'],

    /* ---- early ---- */
    'Ginti 1–20': ['گنتی 1–20', 'गिनती 1–20', 'Counting 1–20', 'मोजणी 1–20'],
    'Har card dabao — awaaz aayegi 🔊': ['ہر کارڈ دباؤ — آواز آئے گی', 'हर कार्ड दबाओ — आवाज़ आएगी', 'Tap any card — it will speak', 'प्रत्येक कार्ड दाबा — आवाज येईल'],
    'Rang': ['رنگ', 'रंग', 'Colour', 'रंग'],
    'Jaanwar': ['جانور', 'जानवर', 'Animals', 'प्राणी'],
    'Ginti': ['گنتی', 'गिनती', 'Counting', 'मोजणी'],
    'Shakalein': ['شکلیں', 'शक्लें', 'Shapes', 'आकार'],
    'Khelo 🎮': ['کھیلو 🎮', 'खेलो 🎮', 'Play 🎮', 'खेळा 🎮'],
    'Rang • Jaanwar • Ginti • Shakal': ['رنگ • جانور • گنتی • شکل', 'रंग • जानवर • गिनती • शक्ल', 'Colours • Animals • Counting • Shapes', 'रंग • प्राणी • मोजणी • आकार'],

    /* ---- art / huroof ---- */
    'حروف — رنگ بھرو اور مشق کرو': ['حروف — رنگ بھرو اور مشق کرو', 'हरफ़ — रंग भरो और अभ्यास करो', 'Letters — colour and practise', 'अक्षरे — रंग भरा आणि सराव करा'],
    '🎨 Rang bharo': ['🎨 رنگ بھرو', '🎨 रंग भरो', '🎨 Colour', '🎨 रंग भरा'],
    '✍️ Mashq karo': ['✍️ مشق کرو', '✍️ अभ्यास करो', '✍️ Practise', '✍️ सराव करा'],
    'Rang bharo 🙈': ['رنگ بھرو', 'रंग भरो', 'Colour', 'रंग भरा'],

    /* ---- deen ---- */
    'Suno aur yaad karo': ['سنو اور یاد کرو', 'सुनो और याद करो', 'Listen and remember', 'ऐका आणि लक्षात ठेवा'],
    'Suno': ['سنو', 'सुनो', 'Listen', 'ऐका'],
    'Saath bolo': ['ساتھ بولو', 'साथ बोलो', 'Say along', 'सोबत म्हणा'],
    'Dohrao 🎤': ['دہراؤ', 'दोहराओ', 'Repeat', 'पुन्हा म्हणा'],
    'Chhupao': ['چھپاؤ', 'छिपाओ', 'Hide', 'लपवा'],
    'Dikhao': ['دکھاؤ', 'दिखाओ', 'Show', 'दाखवा'],
    'Mujhe yaad hai!': ['مجھے یاد ہے!', 'मुझे याद है!', 'I know it!', 'मला आठवते!'],
    'Mujhe yaad ho gayi': ['مجھے یاد ہو گئی', 'मुझे याद हो गई', 'I have learnt it', 'मला पाठ झाले'],
    'Wudu kaise karein': ['وضو کیسے کریں', 'वज़ू कैसे करें', 'How to do wudu', 'वुजू कसा करावा'],
    'Panch namazein': ['پانچ نمازیں', 'पाँच नमाज़ें', 'Five namaz', 'पाच नमाज'],
    'Namaz ka tareeqa': ['نماز کا طریقہ', 'नमाज़ का तरीक़ा', 'How to pray', 'नमाज कशी करावी'],
    'Aaj main ne kya kiya?': ['آج میں نے کیا کیا؟', 'आज मैंने क्या किया?', 'What did I do today?', 'आज मी काय केले?'],

    /* ---- album / duo ---- */
    'Mere stickers': ['میرے اسٹیکر', 'मेरे स्टिकर', 'My stickers', 'माझे स्टिकर'],
    'یاد کا درخت': ['یاد کا درخت', 'याद का पेड़', 'Tree of memory', 'आठवणीचे झाड'],
    'Meri kamyabi': ['میری کامیابی', 'मेरी कामयाबी', 'My achievement', 'माझे यश'],
    'Meri kamyabi ki tasveer': ['میری کامیابی کی تصویر', 'मेरी कामयाबी की तस्वीर', 'My achievement picture', 'माझ्या यशाचे चित्र'],
    'Dono barabar — MashaAllah!': ['دونوں برابر — ماشاءاللہ!', 'दोनों बराबर — माशाअल्लाह!', 'Both equal — MashaAllah!', 'दोघे समान — माशाअल्लाह!'],
    'Shabash dono ko!': ['شاباش دونوں کو!', 'शाबाश दोनों को!', 'Well done, both!', 'शाब्बास दोघांना!'],
    'Phir khelo': ['پھر کھیلو', 'फिर खेलो', 'Play again', 'पुन्हा खेळा'],

    /* ---- parent ---- */
    'Is hafte ki report': ['اس ہفتے کی رپورٹ', 'इस हफ़्ते की रिपोर्ट', 'This week\'s report', 'या आठवड्याचा अहवाल'],
    'is hafte ki report': ['اس ہفتے کی رپورٹ', 'इस हफ़्ते की रिपोर्ट', 'this week\'s report', 'या आठवड्याचा अहवाल'],
    'din lagatar': ['دن لگاتار', 'दिन लगातार', 'days in a row', 'सलग दिवस'],
    'minute aaj': ['منٹ آج', 'मिनट आज', 'minutes today', 'मिनिटे आज'],
    'harf seekhe': ['حرف سیکھے', 'हरफ़ सीखे', 'letters learnt', 'अक्षरे शिकली'],
    'pakke yaad': ['پکے یاد', 'पक्के याद', 'known well', 'पक्के लक्षात'],
    'duaein': ['دعائیں', 'दुआएँ', 'duas', 'दुआ'],
    'surahein': ['سورتیں', 'सूरतें', 'surahs', 'सुरा'],
    'Dohrane wale harf:': ['دہرانے والے حرف:', 'दोहराने वाले हरफ़:', 'Letters to revise:', 'उजळणीची अक्षरे:'],
    'Inhein dohrao': ['انہیں دہراؤ', 'इन्हें दोहराओ', 'Revise these', 'ही पुन्हा म्हणा'],
    'Abhi koi harf kamzor nahi 👍': ['ابھی کوئی حرف کمزور نہیں', 'अभी कोई हरफ़ कमज़ोर नहीं', 'No weak letters yet', 'अजून कोणतेही अक्षर कमजोर नाही'],
    'Report bhejein': ['رپورٹ بھیجیں', 'रिपोर्ट भेजें', 'Send report', 'अहवाल पाठवा'],
    'Tasveer bana kar bhejein': ['تصویر بنا کر بھیجیں', 'तस्वीर बना कर भेजें', 'Make a picture and send', 'चित्र बनवून पाठवा'],
    'Minute har din (7 din)': ['منٹ ہر دن (7 دن)', 'मिनट हर दिन (7 दिन)', 'Minutes each day (7 days)', 'मिनिटे रोज (7 दिवस)'],
    'Awaaz aur effects': ['آواز اور اثرات', 'आवाज़ और इफ़ेक्ट', 'Sound and effects', 'आवाज आणि इफेक्ट'],
    'Bolne ki raftaar': ['بولنے کی رفتار', 'बोलने की रफ़्तार', 'Speaking speed', 'बोलण्याचा वेग'],
    'Dheemi': ['دھیمی', 'धीमी', 'Slow', 'हळू'],
    'Normal': ['نارمل', 'नॉर्मल', 'Normal', 'सामान्य'],
    'Tez': ['تیز', 'तेज़', 'Fast', 'वेगाने'],
    'English bhi bolo': ['انگریزی بھی بولو', 'अंग्रेज़ी भी बोलो', 'Speak English too', 'इंग्रजीही बोला'],
    'Urdu ke baad English lafz': ['اردو کے بعد انگریزی لفظ', 'उर्दू के बाद अंग्रेज़ी शब्द', 'English word after Urdu', 'उर्दूनंतर इंग्रजी शब्द'],
    'Rozana waqt ki had': ['روزانہ وقت کی حد', 'रोज़ाना वक़्त की हद', 'Daily time limit', 'रोजची वेळ मर्यादा'],
    'Band': ['بند', 'बंद', 'Off', 'बंद'],
    'Theme': ['تھیم', 'थीम', 'Theme', 'थीम'],
    'Auto': ['آٹو', 'ऑटो', 'Auto', 'ऑटो'],
    'Din': ['دن', 'दिन', 'Day', 'दिवस'],
    'Raat': ['رات', 'रात', 'Night', 'रात'],
    'Zubaan': ['زبان', 'ज़ुबान', 'Language', 'भाषा'],
    'App ki zubaan': ['ایپ کی زبان', 'ऐप की ज़ुबान', 'App language', 'अ‍ॅपची भाषा'],
    'Ammi/Abbu ki awaaz': ['امی/ابو کی آواز', 'अम्मी/अब्बू की आवाज़', 'Ammi/Abbu\'s voice', 'आई/बाबांचा आवाज'],
    'Harf': ['حرف', 'हरफ़', 'Letter', 'अक्षर'],
    'Alfaaz': ['الفاظ', 'अल्फ़ाज़', 'Words', 'शब्द'],
    'Duaein': ['دعائیں', 'दुआएँ', 'Duas', 'दुआ'],
    'Backup': ['بیک اپ', 'बैकअप', 'Backup', 'बॅकअप'],
    'Wapas laayein': ['واپس لائیں', 'वापस लाएँ', 'Restore', 'परत आणा'],
    'Offline aur install': ['آف لائن اور انسٹال', 'ऑफ़लाइन और इंस्टॉल', 'Offline and install', 'ऑफलाइन आणि इंस्टॉल'],
    'Bachon ka intezam': ['بچوں کا انتظام', 'बच्चों का इंतज़ाम', 'Children', 'मुलांची व्यवस्था'],
    'Dost badlein': ['دوست بدلیں', 'दोस्त बदलें', 'Switch child', 'मित्र बदला'],
    'Progress save': ['پروگریس محفوظ', 'प्रोग्रेस सेव', 'Save progress', 'प्रगती जतन'],
    'Progress wapas': ['پروگریس واپس', 'प्रोग्रेस वापस', 'Restore progress', 'प्रगती परत'],
    'Progress saaf': ['پروگریس صاف', 'प्रोग्रेस साफ़', 'Clear progress', 'प्रगती साफ'],
    'Hata dein': ['ہٹا دیں', 'हटा दें', 'Delete', 'काढून टाका'],
    'Seekhne ka tareeqa': ['سیکھنے کا طریقہ', 'सीखने का तरीक़ा', 'How learning works', 'शिकण्याची पद्धत'],
    'Wudu': ['وضو', 'वज़ू', 'Wudu', 'वुजू'],
    'Namaz': ['نماز', 'नमाज़', 'Namaz', 'नमाज'],
    'Awaaz': ['آواز', 'आवाज़', 'Sound', 'आवाज'],

    /* ---- messages ---- */
    'Aaram ka waqt 🌙': ['آرام کا وقت', 'आराम का वक़्त', 'Time to rest', 'आरामाची वेळ'],
    'Walidain: thoda aur waqt': ['والدین: تھوڑا اور وقت', 'माता-पिता: थोड़ा और वक्त', 'Parents: a little more time', 'पालक: थोडा अधिक वेळ'],
    'Saaf ho gaya': ['صاف ہو گیا', 'साफ़ हो गया', 'Cleared', 'साफ झाले'],
    'Recording save ✅': ['ریکارڈنگ محفوظ', 'रिकॉर्डिंग सेव', 'Recording saved', 'रेकॉर्डिंग जतन'],
    'App phone mein rakh lein': ['ایپ فون میں رکھ لیں', 'ऐप फ़ोन में रख लें', 'Put the app on your phone', 'अ‍ॅप फोनमध्ये ठेवा'],
    'Install karein': ['انسٹال کریں', 'इंस्टॉल करें', 'Install', 'इंस्टॉल करा'],
    'Baad mein': ['بعد میں', 'बाद में', 'Later', 'नंतर'],
    'Theek hai': ['ٹھیک ہے', 'ठीक है', 'Okay', 'ठीक आहे'],
    'Naya version tayyar hai — yahan dabayein': ['نیا ورژن تیار ہے — یہاں دبائیں', 'नया वर्ज़न तैयार है — यहाँ दबाएँ', 'New version ready — tap here', 'नवीन आवृत्ती तयार — इथे दाबा'],

    /* ---- games ka nateeja ---- */
    'ماشاءاللہ! کمال کر دیا': ['ماشاءاللہ! کمال کر دیا', 'माशाअल्लाह! कमाल कर दिया', 'MashaAllah! Excellent', 'माशाअल्लाह! छान केले'],
    'بہت خوب!': ['بہت خوب!', 'बहुत ख़ूब!', 'Very good!', 'खूप छान!'],
    'شاباش! کوشش کرتے رہو': ['شاباش! کوشش کرتے رہو', 'शाबाश! कोशिश करते रहो', 'Well done, keep trying', 'शाब्बास! प्रयत्न करत राहा'],
    'Kitni sundar tasveer!': ['کتنی سندر تصویر!', 'कितनी सुंदर तस्वीर!', 'What a lovely picture!', 'किती सुंदर चित्र!'],
    'Poori tasveer mein rang bhar diya': ['پوری تصویر میں رنگ بھر دیا', 'पूरी तस्वीर में रंग भर दिया', 'You coloured the whole picture', 'पूर्ण चित्र रंगले'],
    'Aaj ke teeno sitare!': ['آج کے تینوں ستارے!', 'आज के तीनों सितारे!', 'All three stars today!', 'आजचे तिन्ही तारे!'],
    'Naya Sticker!': ['نیا اسٹیکر!', 'नया स्टिकर!', 'New sticker!', 'नवीन स्टिकर!'],
    'Sitare jama karke sticker mila': ['ستارے جمع کر کے اسٹیکر ملا', 'सितारे जमा कर के स्टिकर मिला', 'Collect stars, get a sticker', 'तारे जमवून स्टिकर मिळाला'],
    'Wah!': ['واہ!', 'वाह!', 'Wow!', 'वा!'],
    'Aap ne sab dekh liya ✅': ['آپ نے سب دیکھ لیا', 'आपने सब देख लिया', 'You have seen it all', 'तुम्ही सर्व पाहिले'],

    /* ---- welcome / home ---- */
    'Naya Dost': ['نیا دوست', 'नया दोस्त', 'New child', 'नवीन मित्र'],
    'Assalamu Alaikum!': ['السلام علیکم!', 'अस्सलामु अलैकुम!', 'Assalamu Alaikum!', 'अस्सलामु अलैकुम!'],
    'Bachche ka naam likhein (zaroori nahi), phir tasveer aur umar chunein.': ['بچے کا نام لکھیں (ضروری نہیں)، پھر تصویر اور عمر چنیں۔', 'बच्चे का नाम लिखें (ज़रूरी नहीं), फिर तस्वीर और उम्र चुनें।', 'Write a name (optional), then pick a picture and age.', 'मुलाचे नाव लिहा (आवश्यक नाही), मगर चित्र आणि वय निवडा.'],
    '3 – 4 saal': ['3 – 4 سال', '3 – 4 साल', '3 – 4 years', '३ – ४ वर्षे'],
    '5 – 7 saal': ['5 – 7 سال', '5 – 7 साल', '5 – 7 years', '५ – ७ वर्षे'],
    'Chalo seekhein!': ['چلو سیکھیں!', 'चलो सीखें!', 'Let us learn!', 'चला शिकूया!'],
    'Chalo khelein!': ['چلو کھیلیں!', 'चलो खेलें!', 'Let us play!', 'चला खेळूया!'],
    'Paani do 💧': ['پانی دو 💧', 'पानी दो 💧', 'Water it 💧', 'पाणी दे 💧'],
    'Sab harf seekh liye — MashaAllah!': ['سب حرف سیکھ لیے — ماشاءاللہ!', 'सब हरफ़ सीख लिए — माशाअल्लाह!', 'All letters learnt — MashaAllah!', 'सर्व अक्षरे शिकली — माशाअल्लाह!'],
    'Pehla harf: ': ['پہلا حرف: ', 'पहला हरफ़: ', 'First letter: ', 'पहिले अक्षर: '],
    'Agla harf: ': ['اگلا حرف: ', 'अगला हरफ़: ', 'Next letter: ', 'पुढचे अक्षर: '],
    'Purane harf dohrayein (': ['پرنے حرف دہرائیں (', 'पुराने हरफ़ दोहराएँ (', 'Revise old letters (', 'जुनी अक्षरे पुन्हा म्हणा ('],
    'Dohrayein (': ['دہرائیں (', 'दोहराएँ (', 'Revise (', 'उजळणी ('],
    'Tumhare <b>darakht</b> ko paani chahiye 💧': ['تمہارے <b>درخت</b> کو پانی چاہیے 💧', 'तुम्हारे <b>पेड़</b> को पानी चाहिए 💧', 'Your <b>tree</b> needs water 💧', 'तुझ्या <b>झाडा</b>ला पाणी हवे 💧'],

    /* ---- learn: manzilein ---- */
    'پہلی منزل': ['پہلی منزل', 'पहली मंज़िल', 'First floor', 'पहिला मजला'],
    'دوسری منزل': ['دوسری منزل', 'दूसरी मंज़िल', 'Second floor', 'दुसरा मजला'],
    'تیسری منزل': ['تیسری منزل', 'तीसरी मंज़िल', 'Third floor', 'तिसरा मजला'],
    'چوتھی منزل': ['چوتھی منزل', 'चौथी मंज़िल', 'Fourth floor', 'चौथा मजला'],
    'پانچویں منزل': ['پانچویں منزل', 'पाँचवीं मंज़िल', 'Fifth floor', 'पाचवा मजला'],
    'چھٹی منزل': ['چھٹی منزل', 'छठी मंज़िल', 'Sixth floor', 'सहावा मजला'],
    'ساتویں منزل': ['ساتویں منزل', 'सातवीं मंज़िल', 'Seventh floor', 'सातवा मजला'],
    'Pehli Manzil': ['پہلی منزل', 'पहली मंज़िल', 'First floor', 'पहिला मजला'],
    'Doosri Manzil': ['دوسری منزل', 'दूसरी मंज़िल', 'Second floor', 'दुसरा मजला'],
    'Teesri Manzil': ['تیسری منزل', 'तीसरी मंज़िल', 'Third floor', 'तिसरा मजला'],
    'Chauthi Manzil': ['چوتھی منزل', 'चौथी मंज़िल', 'Fourth floor', 'चौथा मजला'],
    'Panchvi Manzil': ['پانچویں منزل', 'पाँचवीं मंज़िल', 'Fifth floor', 'पाचवा मजला'],
    'Chhathi Manzil': ['چھٹی منزل', 'छठी मंज़िल', 'Sixth floor', 'सहावा मजला'],
    'Satvi Manzil': ['ساتویں منزل', 'सातवीं मंज़िल', 'Seventh floor', 'सातवा मजला'],

    /* ---- learn: gaana / harkat / jodo ---- */
    'Huroof ka gaana': ['حروف کا گانا', 'हरफ़ का गाना', 'The letters song', 'अक्षरांचे गाणे'],
    'الف با تا': ['الف با تا', 'अलिफ़ बा ता', 'Alif Ba Ta', 'अलिफ बा ता'],
    'Harf ke upar ya neeche chhota nishan lagta hai — wohi harf ki awaaz badalta hai.': ['حرف کے اوپر یا نیچے چھوٹا نشان لگتا ہے — وہی حرف کی آواز بدلتا ہے۔', 'हरफ़ के ऊपर या नीचे छोटा निशान लगता है — वही हरफ़ की आवाज़ बदलता है।', 'A small mark above or below changes the sound of the letter.', 'अक्षराच्या वर किंवा खाली छोटी खूण येते — त्यानेच अक्षराचा आवाज बदलतो.'],
    'Harf ke UPAR chhoti si lakeer': ['حرف کے اوپر چھوٹی سی لکیر', 'हरफ़ के ऊपर छोटी सी लकीर', 'a small line above the letter', 'अक्षराच्या वर छोटी रेषा'],
    'Harf ke NEECHE chhoti si lakeer': ['حرف کے نیچے چھوٹی سی لکیر', 'हरफ़ के नीचे छोटी सी लकीर', 'a small line below the letter', 'अक्षराच्या खाली छोटी रेषा'],
    'Harf ke upar chhota sa "و" (wao)': ['حرف کے اوپر چھوٹا سا "و"', 'हरफ़ के ऊपर छोटा सा "वाव"', 'a small "wao" above the letter', 'अक्षराच्या वर छोटा "वाव"'],
    'Do harf mil kar ek lafz banate hain. Card dabao — pehle har harf, phir poora lafz sunaya jayega.': ['دو حرف مل کر ایک لفظ بناتے ہیں۔ کارڈ دباؤ — پہلے ہر حرف، پھر پورا لفظ سنایا جائے گا۔', 'दो हरफ़ मिल कर एक शब्द बनाते हैं। कार्ड दबाओ — पहले हर हरफ़, फिर पूरा शब्द सुनाया जाएगा।', 'Two letters join to make a word. Tap a card — each letter, then the whole word.', 'दोन अक्षरे जोडून शब्द बनतो. कार्ड दाबा — आधी प्रत्येक अक्षर, मगर संपूर्ण शब्द.'],
    'Jab harf jurte hain to shakal badal jati hai — yahi asli mashq hai. Baad mein bachche se kaghaz par likhwa kar batayein.': ['جب حرف جڑتے ہیں تو شکل بدل جاتی ہے — یہی اصل مشق ہے۔ بعد میں بچے سے کاغذ پر لکھوا کر بتائیں۔', 'जब हरफ़ जुड़ते हैं तो शक्ल बदल जाती है — यही असली अभ्यास है। बाद में बच्चे से काग़ज़ पर लिखवा कर बताएँ।', 'Letters change shape when joined — that is the real practice. Later ask the child to write it on paper.', 'अक्षरे जोडल्यावर आकार बदलतो — हाच खरा सराव. नंतर मुलाकडून कागदावर लिहून घ्या.'],
    'Saare do harfi lafz dekh liye': ['سارے دو حرفی الفاظ دیکھ لیے', 'सारे दो अक्षरी शब्द देख लिए', 'You have seen all the two-letter words', 'सर्व दोन अक्षरी शब्द पाहिले'],
    'سنو اور بولو': ['سنو اور بولو', 'सुनो और बोलो', 'Listen and say', 'ऐका आणि बोला'],
    'Agla harf': ['اگلا حرف', 'अगला हरफ़', 'Next letter', 'पुढचे अक्षर'],
    'Safar par wapas': ['سفر پر واپس', 'सफ़र पर वापस', 'Back to the path', 'प्रवासावर परत'],

    /* ---- early / art / album ---- */
    'رنگ': ['رنگ', 'रंग', 'Colour', 'रंग'],
    'جانور': ['جانور', 'जानवर', 'Animals', 'प्राणी'],
    'گنتی': ['گنتی', 'गिनती', 'Counting', 'मोजणी'],
    'شکلیں': ['شکلیں', 'शक्लें', 'Shapes', 'आकार'],
    'الف سے ی تک — har harf ko rang bharo, ungli se likho, phir mitti mein ya kaghaz par dohrao': ['الف سے ی تک — ہر حرف کو رنگ بھرو، انگلی سے لکھو، پھر مٹی میں یا کاغذ پر دہراؤ', 'अलिफ़ से या तक — हर हरफ़ को रंग भरो, उँगली से लिखो, फिर मिट्टी या काग़ज़ पर दोहराओ', 'Alif to Ya — colour each letter, trace it, then write it in sand or on paper', 'अलिफ ते या — प्रत्येक अक्षर रंग भरा, बोटाने लिहा, मगर वाळूत किंवा कागदावर पुन्हा लिहा'],
    'MashaAllah! Saari album poori 🎉': ['ماشاءاللہ! ساری البم پوری 🎉', 'माशाअल्लाह! सारी अल्बम पूरी 🎉', 'MashaAllah! The whole album is complete 🎉', 'माशाअल्लाह! संपूर्ण अल्बम पूर्ण 🎉'],
    'Agle sticker ke liye ': ['اگلے اسٹیکر کے لیے ', 'अगले स्टिकर के लिए ', 'For the next sticker ', 'पुढच्या स्टिकरसाठी '],
    'Harf seekho — pehla phal ugega 🌱': ['حرف سیکھو — پہلا پھل اگے گا 🌱', 'हरफ़ सीखो — पहला फल उगेगा 🌱', 'Learn a letter — the first fruit will grow 🌱', 'अक्षर शिका — पहिले फळ उगवेल 🌱'],
    'Poora darakht pak gaya! MashaAllah 🎉': ['پورا درخت پک گیا! ماشاءاللہ 🎉', 'पूरा पेड़ पक गया! माशाअल्लाह 🎉', 'The whole tree is ripe! MashaAllah 🎉', 'संपूर्ण झाड पिकले! माशाअल्लाह 🎉'],
    'Dohrate raho — phal pakte jayenge 🍎': ['دہراتے رہو — پھل پکتے جائیں گے 🍎', 'दोहराते रहो — फल पकते जाएँगे 🍎', 'Keep revising — the fruits will ripen 🍎', 'उजळणी करत राहा — फळे पिकत जातील 🍎'],
    'Yeh harf abhi seekhna hai 🌱': ['یہ حرف ابھی سیکھنا ہے 🌱', 'यह हरफ़ अभी सीखना है 🌱', 'This letter is still to be learnt 🌱', 'हे अक्षर अजून शिकायचे आहे 🌱'],
    'paka': ['پکا', 'पका', 'ripe', 'पिकले'],
    'ug raha': ['اگ رہا', 'उग रहा', 'growing', 'उगवत आहे'],
    'pyasa': ['پیاسا', 'प्यासा', 'thirsty', 'तहानलेले'],

    /* ---- games ke sawal ---- */
    'یہ کس حرف سے شروع ہوتا ہے؟': ['یہ کس حرف سے شروع ہوتا ہے؟', 'यह किस हरफ़ से शुरू होता है?', 'Which letter does it start with?', 'हे कोणत्या अक्षराने सुरू होते?'],
    'اس حرف کی تصویر کون سی؟': ['اس حرف کی تصویر کون سی؟', 'इस हरफ़ की तस्वीर कौन सी?', 'Which picture goes with this letter?', 'या अक्षराचे चित्र कोणते?'],
    'کون سا الگ ہے؟': ['کون سا الگ ہے؟', 'कौन सा अलग है?', 'Which one is different?', 'कोणते वेगळे आहे?'],
    'غور سے دیکھو': ['غور سے دیکھو', 'ग़ौर से देखो', 'Look carefully', 'नीट पहा'],
    'ان کے بعد کون سا حرف؟': ['ان کے بعد کون سا حرف؟', 'इनके बाद कौन सा हरफ़?', 'Which letter comes next?', 'यांच्यानंतर कोणते अक्षर?'],
    'ان سے پہلے کون سا حرف؟': ['ان سے پہلے کون سا حرف؟', 'इनसे पहले कौन सा हरफ़?', 'Which letter comes before?', 'यांच्यापूर्वी कोणते अक्षर?'],
    'بیچ میں کون سا حرف؟': ['بیچ میں کون سا حرف؟', 'बीच में कौन सा हरफ़?', 'Which letter is in the middle?', 'मध्ये कोणते अक्षर?'],
    'کون بول رہا ہے؟': ['کون بول رہا ہے؟', 'कौन बोल रहा है?', 'Who is making this sound?', 'कोण बोलत आहे?'],
    ' کہاں ہے؟': [' کہاں ہے؟', ' कहाँ है?', ' where?', ' कुठे आहे?'],
    'گنو — کتنے ہیں؟': ['گنو — کتنے ہیں؟', 'गिनो — कितने हैं?', 'Count — how many?', 'मोजा — किती आहेत?'],
    'یہ کس رنگ کا ہے؟': ['یہ کس رنگ کا ہے؟', 'यह किस रंग का है?', 'What colour is this?', 'हे कोणत्या रंगाचे आहे?'],
    ' رنگ ڈھونڈو': [' رنگ ڈھونڈو', ' रंग ढूँढो', ' find the colour', ' रंग शोधा'],
    ' شکل ڈھونڈو': [' شکل ڈھونڈو', ' शक्ल ढूँढो', ' find the shape', ' आकार शोधा'],
    'یہ کون سی شکل ہے؟': ['یہ کون سی شکل ہے؟', 'यह कौन सी शक्ल है?', 'Which shape is this?', 'हा कोणता आकार आहे?'],
    ' والا الگ ہے': [' والا الگ ہے', ' वाला अलग है', ' is different', ' आहे वेगळे'],
    ' والا ڈھونڈو': [' والا ڈھونڈو', ' वाला ढूँढो', ' find', ' शोधा'],
    'جوڑی ملاؤ': ['جوڑی ملاؤ', 'जोड़ी मिलाओ', 'Match the pairs', 'जोडी जुळवा'],
    'لفظ بناؤ': ['لفظ بناؤ', 'शब्द बनाओ', 'Make the word', 'शब्द बनवा'],
    'شکل کو اس کے گھر میں رکھو': ['شکل کو اس کے گھر میں رکھو', 'शक्ल को उसके घर में रखो', 'Put each shape in its house', 'आकार त्याच्या घरात ठेवा'],
    'یہ کس حرف سے شروع ہوتا ہے؟ ': ['یہ کس حرف سے شروع ہوتا ہے؟ ', 'यह किस हरफ़ से शुरू होता है? ', 'Which letter does it start with? ', 'हे कोणत्या अक्षराने सुरू होते? '],
    'Sahi gubbare: ': ['صحیح غبارے: ', 'सही गुब्बारे: ', 'Right balloons: ', 'बरोबर फुगे: '],
    'Sahi: ': ['صحیح: ', 'सही: ', 'Right: ', 'बरोबर: '],
    'Pakde: ': ['پکڑے: ', 'पकड़े: ', 'Caught: ', 'पकडले: '],
    'Doosre: ': ['دوسرے: ', 'दूसरे: ', 'Others: ', 'इतर: '],
    'Yeh nahi 🙂': ['یہ نہیں 🙂', 'यह नहीं 🙂', 'Not this one 🙂', 'हे नाही 🙂'],
    'Chaalein: ': ['چالیں: ', 'चालें: ', 'Moves: ', 'चाली: '],
    ' jodiyan ': [' جوڑیاں ', ' जोड़ियाँ ', ' pairs ', ' जोड्या '],
    ' chaalon mein': [' چالوں میں', ' चालों में', ' moves', ' चालींमध्ये'],
    'Ab tumhari baari': ['اب تمہاری باری', 'अब तुम्हारी बारी', 'Now your turn', 'आता तुझी पाळी'],
    'Chaalein: 0': ['چالیں: 0', 'चालें: 0', 'Moves: 0', 'चाली: 0'],

    /* ---- deen ---- */
    'Matlab (walidain ke liye):': ['مطلب (والدین کے لیے):', 'मतलब (माता-पिता के लिए):', 'Meaning (for parents):', 'अर्थ (पालकांसाठी):'],
    '⭐ Mujhe yaad hai!': ['⭐ مجھے یاد ہے!', '⭐ मुझे याद है!', '⭐ I know it!', '⭐ मला आठवते!'],
    '☆ Mujhe yaad ho gayi': ['☆ مجھے یاد ہو گئی', '☆ मुझे याद हो गई', '☆ I have learnt it', '☆ मला पाठ झाले'],
    '🙈 Chhupao': ['🙈 چھپاؤ', '🙈 छिपाओ', '🙈 Hide', '🙈 लपवा'],
    '👀 Dikhao': ['👀 دکھاؤ', '👀 दिखाओ', '👀 Show', '👀 दाखवा'],
    ' 🗣️ Ab tum bolo': [' 🗣️ اب تم بولو', ' 🗣️ अब तुम बोलो', ' 🗣️ Now you say it', ' 🗣️ आता तू म्हण'],
    'Qari ki awaaz app ke andar hi hai — pehli baar khulne ke baad internet ki zaroorat nahi.': ['قاری کی آواز ایپ کے اندر ہی ہے — پہلی بار کھلنے کے بعد انٹرنیٹ کی ضرورت نہیں۔', 'क़ारी की आवाज़ ऐप के अंदर ही है — पहली बार खुलने के बाद इंटरनेट की ज़रूरत नहीं।', 'The qari\'s voice is inside the app — no internet needed after the first open.', 'काऱ्याचा आवाज अ‍ॅपमध्येच आहे — पहिल्यांदा उघडल्यानंतर इंटरनेटची गरज नाही.'],
    'Qari: Husary (Muallim) — har ayat ruk ruk kar, sikhane ke andaz mein.': ['قاری: حصری (معلم) — ہر آیت رک رک کر، سکھانے کے انداز میں۔', 'क़ारी: हुसरी (मुअल्लिम) — हर आयत रुक रुक कर, सिखाने के अंदाज़ में।', 'Qari: Husary (Muallim) — each ayah slowly, in a teaching style.', 'कारी: हुसरी (मुअल्लिम) — प्रत्येक आयत थांबून, शिकवण्याच्या शैलीत.'],
    'Namaz ke tafseeli masail apne ustad ya alim se seekhein — tareeqay mein fiqh ka farq ho sakta hai. Yahan bachon ke liye sirf bunyadi tasveeri tareeqa hai.': ['نماز کے تفصیلی مسائل اپنے استاد یا عالم سے سیکھیں — طریقے میں فقہ کا فرق ہو سکتا ہے۔ یہاں بچوں کے لیے صرف بنیادی تصویری طریقہ ہے۔', 'नमाज़ के तफ़सीली मसाइल अपने उस्ताद या आलिम से सीखें — तरीक़े में फ़िक़्ह का फ़र्क़ हो सकता है। यहाँ बच्चों के लिए सिर्फ़ बुनियादी तस्वीरी तरीक़ा है।', 'Learn the details of namaz from your teacher — schools differ. Here it is only a basic picture method for children.', 'नमाजचे तपशील आपल्या उस्तादांकडून शिका — पद्धतीत फरक असू शकतो. इथे मुलांसाठी फक्त सोपी चित्रपद्धत आहे.'],
    'Wudu kaise karein': ['وضو کیسے کریں', 'वज़ू कैसे करें', 'How to do wudu', 'वुजू कसा करावा'],
    'Panch namazein': ['پانچ نمازیں', 'पाँच नमाज़ें', 'Five namaz', 'पाच नमाज'],
    'Namaz ka tareeqa': ['نماز کا طریقہ', 'नमाज़ का तरीक़ा', 'How to pray', 'नमाज कशी करावी'],
    'Namaz kaise padhein': ['نماز کیسے پڑھیں', 'नमाज़ कैसे पढ़ें', 'How to pray', 'नमाज कशी करावी'],
    'وضو': ['وضو', 'वज़ू', 'Wudu', 'वुजू'],
    'Wudu — 8 qadam': ['وضو — 8 قدم', 'वज़ू — 8 क़दम', 'Wudu — 8 steps', 'वुजू — 8 पायऱ्या'],
    'Panch Namazein': ['پانچ نمازیں', 'पाँच नमाज़ें', 'Five namaz', 'पाच नमाज'],
    ' rakat (fard)': [' رکعت (فرض)', ' रकअत (फ़र्ज़)', ' rakat (fard)', ' रकअत (फर्ज)'],
    'Jo kaam aaj kiya uspar dabao — sitara milega ⭐': ['جو کام آج کیا اس پر دباؤ — ستارہ ملے گا ⭐', 'जो काम आज किया उस पर दबाओ — सितारा मिलेगा ⭐', 'Tap what you did today — you get a star ⭐', 'आज केले ते काम दाबा — तारा मिळेल ⭐'],

    /* ---- wudu / namaz / postures (data.js) ---- */
    'بسم اللہ کہو': ['بسم اللہ کہو', 'बिस्मिल्लाह कहो', 'Say Bismillah', 'बिस्मिल्लाह म्हणा'],
    'ہاتھ دھوؤ': ['ہاتھ دھوؤ', 'हाथ धोओ', 'Wash the hands', 'हात धुवा'],
    'کلی کرو': ['کلی کرو', 'कुल्ली करो', 'Rinse the mouth', 'कुळा करा'],
    'ناک میں پانی ڈالو': ['ناک میں پانی ڈالو', 'नाक में पानी डालो', 'Water in the nose', 'नाकात पाणी घ्या'],
    'چہرہ دھوؤ': ['چہرہ دھوؤ', 'चेहरा धोओ', 'Wash the face', 'चेहरा धुवा'],
    'کہنیوں تک بازو دھوؤ': ['کہنیوں تک بازو دھوؤ', 'कोहनियों तक बाज़ू धोओ', 'Wash arms to the elbows', 'कोपरांपर्यंत हात धुवा'],
    'سر کا مسح کرو': ['سر کا مسح کرو', 'सर का मसह करो', 'Wipe the head', 'डोक्यावर मसह करा'],
    'پاؤں دھوؤ': ['پاؤں دھوؤ', 'पाँव धोओ', 'Wash the feet', 'पाय धुवा'],
    'فجر': ['فجر', 'फ़ज्र', 'Fajr', 'फजर'],
    'ظہر': ['ظہر', 'ज़ुहर', 'Zuhr', 'जोहर'],
    'عصر': ['عصر', 'अस्र', 'Asr', 'असर'],
    'مغرب': ['مغرب', 'मग़रिब', 'Maghrib', 'मगरीब'],
    'عشاء': ['عشاء', 'इशा', 'Isha', 'इशा'],
    'اللہ اکبر کہو': ['اللہ اکبر کہو', 'अल्लाहु अकबर कहो', 'Say Allahu Akbar', 'अल्लाहु अकबर म्हणा'],
    'کھڑے ہو کر سورہ فاتحہ': ['کھڑے ہو کر سورہ فاتحہ', 'खड़े होकर सूरह फ़ातिहा', 'Stand and recite Fatiha', 'उभे राहून फातिहा'],
    'رکوع میں جھک جاؤ': ['رکوع میں جھک جاؤ', 'रुकू में झुक जाओ', 'Bow in ruku', 'रुकूमध्ये वाका'],
    'سجدہ — ماتھا زمین پر': ['سجدہ — ماتھا زمین پر', 'सज्दा — माथा ज़मीन पर', 'Sajda — forehead on the ground', 'सजदा — कपाळ जमिनीवर'],
    'سکون سے بیٹھو': ['سکون سے بیٹھو', 'सुकून से बैठो', 'Sit calmly', 'शांत बसा'],
    'دائیں بائیں سلام': ['دائیں بائیں سلام', 'दाएँ बाएँ सलाम', 'Salam to right and left', 'उजवीकडे-डावीकडे सलाम'],

    /* ---- duas ke naam (data.js) ---- */
    'کھانے سے پہلے': ['کھانے سے پہلے', 'खाने से पहले', 'Before eating', 'जेवणापूर्वी'],
    'کھانے کے بعد': ['کھانے کے بعد', 'खाने के बाद', 'After eating', 'जेवणानंतर'],
    'سونے سے پہلے': ['سونے سے پہلے', 'सोने से पहले', 'Before sleeping', 'झोपण्यापूर्वी'],
    'نیند سے اٹھ کر': ['نیند سے اٹھ کر', 'नींद से उठ कर', 'On waking up', 'उठल्यावर'],
    'بیت الخلا جانے سے پہلے': ['بیت الخلا جانے سے پہلے', 'बैतुल-ख़ला जाने से पहले', 'Before the toilet', 'शौचालयात जाण्यापूर्वी'],
    'بیت الخلا سے نکل کر': ['بیت الخلا سے نکل کر', 'बैतुल-ख़ला से निकल कर', 'Coming out of the toilet', 'बाहेर आल्यावर'],
    'گھر سے نکلتے وقت': ['گھر سے نکلتے وقت', 'घर से निकलते वक़्त', 'Leaving the house', 'घरातून निघताना'],
    'گھر میں آتے وقت': ['گھر میں آتے وقت', 'घर में आते वक़्त', 'Entering the house', 'घरात येताना'],
    'مسجد میں جاتے وقت': ['مسجد میں جاتے وقت', 'मस्जिद में जाते वक़्त', 'Going to the masjid', 'मशिदीत जाताना'],
    'مسجد سے نکلتے وقت': ['مسجد سے نکلتے وقت', 'मस्जिद से निकलते वक़्त', 'Leaving the masjid', 'मशिदीतून निघताना'],
    'چھینک آنے پر': ['چھینک آنے پر', 'छींक आने पर', 'When sneezing', 'शिंका आल्यावर'],
    'امی ابو کے لیے': ['امی ابو کے لیے', 'अम्मी अब्बू के लिए', 'For parents', 'आई-बाबांसाठी'],
    'علم بڑھانے کی دعا': ['علم بڑھانے کی دعا', 'इल्म बढ़ाने की दुआ', 'Dua for knowledge', 'ज्ञानासाठी दुआ'],
    'دنیا اور آخرت کی بھلائی': ['دنیا اور آخرت کی بھلائی', 'दुनिया और आख़िरत की भलाई', 'Good in this world and the next', 'दुनिया व आखिरतचे बरे'],
    'سلام کرنا': ['سلام کرنا', 'सलाम करना', 'Greeting', 'सलाम करणे'],
    'کلمہ طیبہ': ['کلمہ طیبہ', 'कलिमा तय्यबा', 'Kalima Tayyaba', 'कलिमा तय्यबा'],

    /* ---- parent ---- */
    'Settings': ['سیٹنگز', 'सेटिंग्स', 'Settings', 'सेटिंग्ज'],
    'Poora hone par "aaram" screen': ['پورا ہونے پر "آرام" اسکرین', 'पूरा होने पर "आराम" स्क्रीन', 'A "rest" screen when the limit is over', 'मर्यादा पूर्ण झाल्यावर "आराम" स्क्रीन'],
    'Bachche apni ammi ya abbu ki awaaz mein seekhein to yaad zyada rehta hai. Neeche kisi bhi cheez par record dabayein — jahan recording ho, wahan phone ki awaaz ki jagah aap ki awaaz bajegi.': ['بچے اپنی امی یا ابو کی آواز میں سیکھیں تو یاد زیادہ رہتا ہے۔ نیچے کسی بھی چیز پر ریکارڈ دبائیں — جہاں ریکارڈنگ ہو، وہاں فون کی آواز کی جگہ آپ کی آواز بجے گی۔', 'बच्चे अपनी अम्मी या अब्बू की आवाज़ में सीखें तो याद ज़्यादा रहता है। नीचे किसी भी चीज़ पर रिकॉर्ड दबाएँ — जहाँ रिकॉर्डिंग हो, वहाँ फ़ोन की आवाज़ की जगह आपकी आवाज़ बजेगी।', 'Children remember more in a parent\'s voice. Tap record next to anything — wherever you record, your voice plays instead of the phone voice.', 'मुले आई-बाबांच्या आवाजात शिकली तर जास्त लक्षात राहते. खाली कोणत्याही गोष्टीवर रेकॉर्ड दाबा — जिथे रेकॉर्ड केले, तिथे फोनच्या आवाजाऐवजी तुमचा आवाज वाजेल.'],
    'Poora app phone mein hi hai — internet ki zaroorat nahi: harf, duaein, surahein (qari ki awaaz ke saath), khel aur rang bhi. Pehli baar khulne ke baad sab kuch baghair net chalega.': ['پورا ایپ فون میں ہی ہے — انٹرنیٹ کی ضرورت نہیں: حرف، دعائیں، سورتیں (قاری کی آواز کے ساتھ)، کھیل اور رنگ بھی۔ پہلی بار کھلنے کے بعد سب کچھ بغیر نیٹ چلے گا۔', 'पूरा ऐप फ़ोन में ही है — इंटरनेट की ज़रूरत नहीं: हरफ़, दुआएँ, सूरतें (क़ारी की आवाज़ के साथ), खेल और रंग भी। पहली बार खुलने के बाद सब कुछ बिना नेट चलेगा।', 'The whole app is on the phone — no internet needed: letters, duas, surahs (with the qari), games and colouring. After the first open everything works without net.', 'संपूर्ण अ‍ॅप फोनमध्येच आहे — इंटरनेटची गरज नाही: अक्षरे, दुआ, सुरा (काऱ्यासह), खेळ आणि रंग. पहिल्यांदा उघडल्यानंतर सर्व नेटशिवाय चालेल.'],
    'Phone ke browser menu se <b>"Add to Home Screen"</b> chunein — icon ban jayega aur app seedha khulegi.': ['فون کے براؤزر مینیو سے <b>"Add to Home Screen"</b> چنیں — آئیکن بن جائے گا اور ایپ سیدھا کھلے گی۔', 'फ़ोन के ब्राउज़र मेन्यू से <b>"Add to Home Screen"</b> चुनें — आइकन बन जाएगा और ऐप सीधा खुलेगा।', 'From your browser menu choose <b>"Add to Home Screen"</b> — you get an icon and the app opens straight away.', 'फोनच्या ब्राउझर मेनूमधून <b>"Add to Home Screen"</b> निवडा — आयकॉन तयार होईल आणि अ‍ॅप थेट उघडेल.'],
    'Nanha (3–4 saal)': ['ننھا (3–4 سال)', 'नन्हा (3–4 साल)', 'Little (3–4 years)', 'लहान (३–४ वर्षे)'],
    'Bada (5–7 saal)': ['بڑا (5–7 سال)', 'बड़ा (5–7 साल)', 'Big (5–7 years)', 'मोठा (५–७ वर्षे)'],
    '1. Dekho': ['1. دیکھو', '1. देखो', '1. See', '1. पहा'],
    '2. Suno': ['2. سنو', '2. सुनो', '2. Hear', '2. ऐका'],
    '3. Chhoo kar likho': ['3. چھو کر لکھو', '3. छू कर लिखो', '3. Touch and write', '3. स्पर्श करून लिहा'],
    '4. Rang bharo': ['4. رنگ بھرو', '4. रंग भरो', '4. Colour', '4. रंग भरा'],
    '5. Pehchano': ['5. پہچانو', '5. पहचानो', '5. Recognise', '5. ओळखा'],
    'Har seekha hua harf agle din, phir 2, 4, 8, 16 din baad khud wapas aata hai ("Paani do") — yeh yaad pakki karne ka tareeqa hai.': ['ہر سیکھا ہوا حرف اگلے دن، پھر 2، 4، 8، 16 دن بعد خود واپس آتا ہے ("پانی دو") — یہ یاد پکی کرنے کا طریقہ ہے۔', 'हर सीखा हुआ हरफ़ अगले दिन, फिर 2, 4, 8, 16 दिन बाद खुद वापस आता है ("पानी दो") — यह याद पक्की करने का तरीक़ा है।', 'Every learnt letter comes back the next day, then after 2, 4, 8, 16 days ("water it") — that is how it sticks.', 'प्रत्येक शिकलेले अक्षर दुसऱ्या दिवशी, नंतर 2, 4, 8, 16 दिवसांनी परत येते ("पाणी दे") — हीच पाठ गडण्याची पद्धत.'],
    'Deeni matn (duaein/surahein) walidain ya ustad se zaroor sun kar tasdeeq kar lein. Tafseeli masail ke liye apne alim se rujoo karein.': ['دینی متن (دعائیں/سورتیں) والدین یا استاد سے ضرور سن کر تصدیق کر لیں۔ تفصیلی مسائل کے لیے اپنے عالم سے رجوع کریں۔', 'दीनी मतन (दुआएँ/सूरतें) माता-पिता या उस्ताद से ज़रूर सुन कर तस्दीक़ कर लें। तफ़सीली मसाइल के लिए अपने आलिम से रुजू करें।', 'Please check the religious text (duas/surahs) with a parent or teacher. For details, ask your scholar.', 'धार्मिक मजकूर (दुआ/सुरा) पालक किंवा उस्तादांकडून ऐकून खात्री करा. तपशिलांसाठी आपल्या आलिमांकडे जा.'],
    'Progress saaf karein?': ['پروگریس صاف کریں؟', 'प्रोग्रेस साफ़ करें?', 'Clear progress?', 'प्रगती साफ करायची?'],
    'Sitare, stickers aur seekhe hue harf mita diye jayenge.': ['ستارے، اسٹیکر اور سیکھے ہوئے حرف مٹا دیے جائیں گے۔', 'सितारे, स्टिकर और सीखे हुए हरफ़ मिटा दिए जाएँगे।', 'Stars, stickers and learnt letters will be removed.', 'तारे, स्टिकर आणि शिकलेली अक्षरे पुसली जातील.'],
    'Haan, saaf': ['ہاں، صاف', 'हाँ, साफ़', 'Yes, clear', 'होय, साफ'],
    'Yeh wapas nahi aayega.': ['یہ واپس نہیں آئے گا۔', 'यह वापस नहीं आएगा।', 'This cannot be undone.', 'हे परत येणार नाही.'],
    'Haan, hata do': ['ہاں، ہٹا دو', 'हाँ, हटा दो', 'Yes, delete', 'होय, काढून टाका'],
    'Nahi': ['نہیں', 'नहीं', 'No', 'नाही'],
    'Is browser mein record nahi ho sakta': ['اس براؤزر میں ریکارڈ نہیں ہو سکتا', 'इस ब्राउज़र में रिकॉर्ड नहीं हो सकता', 'Recording is not possible in this browser', 'या ब्राउझरमध्ये रेकॉर्ड होत नाही'],
    'Mic ki ijazat dein': ['مائیک کی اجازت دیں', 'माइक की इजाज़त दें', 'Please allow the microphone', 'मायक्रोफोनला परवानगी द्या'],
    'File sahi nahi hai': ['فائل صحیح نہیں ہے', 'फ़ाइल सही नहीं है', 'The file is not valid', 'फाइल बरोबर नाही'],
    ' recording wapas aa gayin': [' ریکارڈنگ واپس آ گئیں', ' रिकॉर्डिंग वापस आ गईं', ' recordings restored', ' रेकॉर्डिंग परत आल्या'],
    'Progress wapas aa gayi ✅': ['پروگریس واپس آ گئی ✅', 'प्रोग्रेस वापस आ गई ✅', 'Progress restored ✅', 'प्रगती परत आली ✅'],
    'Yeh file is app ki nahi lagti': ['یہ فائل اس ایپ کی نہیں لگتی', 'यह फ़ाइल इस ऐप की नहीं लगती', 'This file does not belong to this app', 'ही फाइल या अ‍ॅपची वाटत नाही'],
    'Report copy ho gayi — WhatsApp mein paste karein': ['رپورٹ کاپی ہو گئی — واٹس ایپ میں پیسٹ کریں', 'रिपोर्ट कॉपी हो गई — व्हाट्सऐप में पेस्ट करें', 'Report copied — paste it in WhatsApp', 'अहवाल कॉपी झाला — व्हॉट्सअ‍ॅपमध्ये पेस्ट करा'],
    'Copy karein:': ['کاپی کریں:', 'कॉपी करें:', 'Copy:', 'कॉपी करा:'],
    'Report ki tasveer save ho gayi': ['رپورٹ کی تصویر محفوظ ہو گئی', 'रिपोर्ट की तस्वीर सेव हो गई', 'Report picture saved', 'अहवालाचे चित्र जतन झाले'],
    'Tasveer save ho gayi — gallery mein dekhein 📷': ['تصویر محفوظ ہو گئی — گیلری میں دیکھیں 📷', 'तस्वीर सेव हो गई — गैलरी में देखें 📷', 'Picture saved — see it in your gallery 📷', 'चित्र जतन झाले — गॅलरीत पहा 📷'],
    'Phone mein jagah kam hai — purani recordings hata dein': ['فون میں جگہ کم ہے — پرانی ریکارڈنگ ہٹا دیں', 'फ़ोन में जगह कम है — पुरानी रिकॉर्डिंग हटा दें', 'Phone storage is low — remove old recordings', 'फोनमध्ये जागा कमी आहे — जुन्या रेकॉर्डिंग काढा'],

    /* ---- parent gate / rest / boot ---- */
    'Sirf walidain ke liye': ['صرف والدین کے لیے', 'सिर्फ़ माता-पिता के लिए', 'Parents only', 'फक्त पालकांसाठी'],
    'Aage jaane ke liye hisaab hal karein': ['آگے جانے کے لیے حساب حل کریں', 'आगे जाने के लिए हिसाब हल करें', 'Solve the sum to continue', 'पुढे जाण्यासाठी बेरीज सोडवा'],
    'Bachche ko 10 minute aur dene ke liye': ['بچے کو 10 منٹ اور دینے کے لیے', 'बच्चे को 10 मिनट और देने के लिए', 'To give the child 10 more minutes', 'मुलाला 10 मिनिटे अधिक देण्यासाठी'],
    'Aaj ke liye bohat khel liya. Ab aankhon ko aaram do, kal phir milenge, in shaa Allah!': ['آج کے لیے بہت کھیل لیا۔ اب آنکھوں کو آرام دو، کل پھر ملیں گے، ان شاء اللہ!', 'आज के लिए बहुत खेल लिया। अब आँखों को आराम दो, कल फिर मिलेंगे, इंशाअल्लाह!', 'That is enough playing for today. Rest your eyes, see you tomorrow, in shaa Allah!', 'आजसाठी खूप खेळले. आता डोळ्यांना आराम दे, उद्या पुन्हा भेटू, इंशाअल्लाह!'],
    'Seekha, khela aur deen ki baat bhi ki. +3 sitare': ['سیکھا، کھیلا اور دین کی بات بھی کی۔ +3 ستارے', 'सीखा, खेला और दीन की बात भी की। +3 सितारे', 'Learnt, played and did deen too. +3 stars', 'शिकले, खेळले आणि दीनही केले. +3 तारे'],
    'Safari mein neeche <b>Share</b> (⬆️) dabayein, phir <b>"Add to Home Screen"</b> chunein.': ['سفاری میں نیچے <b>Share</b> (⬆️) دبائیں، پھر <b>"Add to Home Screen"</b> چنیں۔', 'सफ़ारी में नीचे <b>Share</b> (⬆️) दबाएँ, फिर <b>"Add to Home Screen"</b> चुनें।', 'In Safari tap <b>Share</b> (⬆️) below, then choose <b>"Add to Home Screen"</b>.', 'सफारीमध्ये खाली <b>Share</b> (⬆️) दाबा, मगर <b>"Add to Home Screen"</b> निवडा.'],
    'Home screen par rakhein — phir app internet ke baghair bhi chalegi.': ['ہوم اسکرین پر رکھیں — پھر ایپ انٹرنیٹ کے بغیر بھی چلے گی۔', 'होम स्क्रीन पर रखें — फिर ऐप इंटरनेट के बग़ैर भी चलेगा।', 'Keep it on the home screen — then the app works without internet.', 'होम स्क्रीनवर ठेवा — मगर अ‍ॅप इंटरनेटशिवाय चालेल.'],
    'Level ': ['لیول ', 'लेवल ', 'Level ', 'लेव्हल '],

    /* ---- parent: seekhne ka tareeqa (5 qadam) ---- */
    '<b>1. Dekho</b> — harf ka bada rang-birangi nishan aur ek tasveer wala lafz.': ['<b>1. دیکھو</b> — حرف کا بڑا رنگ برنگی نشان اور ایک تصویر والا لفظ۔', '<b>1. देखो</b> — हरफ़ का बड़ा रंग-बिरंगी निशान और एक तस्वीर वाला शब्द।', '<b>1. See</b> — the big colourful letter and one picture word.', '<b>1. पहा</b> — मोठे रंगीत अक्षर आणि एक चित्राचा शब्द.'],
    '<b>2. Suno</b> — awaaz aur harf ek saath.': ['<b>2. سنو</b> — آواز اور حرف ایک ساتھ۔', '<b>2. सुनो</b> — आवाज़ और हरफ़ एक साथ।', '<b>2. Hear</b> — the sound and the letter together.', '<b>2. ऐका</b> — आवाज आणि अक्षर एकत्र.'],
    '<b>3. Chhoo kar likho</b> — ungli se (5+ saal).': ['<b>3. چھو کر لکھو</b> — انگلی سے (5+ سال)۔', '<b>3. छू कर लिखो</b> — उँगली से (5+ साल)।', '<b>3. Touch and write</b> — with a finger (5+ years).', '<b>3. स्पर्श करून लिहा</b> — बोटाने (५+ वर्षे).'],
    '<b>4. Rang bharo</b> — harf ko apna rang do; rang aur harakat se yaad pakki hoti hai.': ['<b>4. رنگ بھرو</b> — حرف کو اپنا رنگ دو؛ رنگ اور حرکت سے یاد پکی ہوتی ہے۔', '<b>4. रंग भरो</b> — हरफ़ को अपना रंग दो; रंग और हरकत से याद पक्की होती है।', '<b>4. Colour</b> — give the letter your colour; colour and movement make it stick.', '<b>4. रंग भरा</b> — अक्षराला तुझा रंग दे; रंग व हालचालीने पाठ गडतो.'],
    '<b>5. Pehchano</b> — galti par sazaa nahi, bas dobara mauqa.': ['<b>5. پہچانو</b> — غلطی پر سزا نہیں، بس دوبارہ موقع۔', '<b>5. पहचानो</b> — ग़लती पर सज़ा नहीं, बस दोबारा मौक़ा।', '<b>5. Recognise</b> — no punishment for a mistake, just another try.', '<b>5. ओळखा</b> — चुकीवर शिक्षा नाही, फक्त पुन्हा संधी.'],

    /* ---- duas ke matlab (data.js tr) ---- */
    'Allah ke naam se shuru.': ['اللہ کے نام سے شروع۔', 'अल्लाह के नाम से शुरू।', 'In the name of Allah.', 'अल्लाहच्या नावाने सुरुवात.'],
    'Allah ka shukar jis ne khilaya, pilaya aur musalman banaya.': ['اللہ کا شکر جس نے کھلایا، پلایا اور مسلمان بنایا۔', 'अल्लाह का शुक्र जिसने खिलाया, पिलाया और मुसलमान बनाया।', 'Thanks to Allah who fed us, gave us drink and made us Muslim.', 'अल्लाहचे आभार, ज्याने खायला दिले, पाजले आणि मुसलमान केले.'],
    'Ae Allah! Tere hi naam se marta aur jeeta hoon.': ['اے اللہ! تیرے ہی نام سے مرتا اور جیتا ہوں۔', 'ऐ अल्लाह! तेरे ही नाम से मरता और जीता हूँ।', 'O Allah, in Your name I die and live.', 'हे अल्लाह, तुझ्या नावानेच मरतो आणि जगतो.'],
    'Allah ka shukar jis ne sone ke baad jagaya.': ['اللہ کا شکر جس نے سونے کے بعد جگایا۔', 'अल्लाह का शुक्र जिसने सोने के बाद जगाया।', 'Thanks to Allah who woke us after sleep.', 'अल्लाहचे आभार, ज्याने झोपेनंतर उठवले.'],
    'Ae Allah! Main buri cheezon se teri panah mangta hoon.': ['اے اللہ! میں بری چیزوں سے تیری پناہ مانگتا ہوں۔', 'ऐ अल्लाह! मैं बुरी चीज़ों से तेरी पनाह माँगता हूँ।', 'O Allah, I seek Your protection from evil.', 'हे अल्लाह, वाईट गोष्टींपासून तुझा आसरा मागतो.'],
    'Ae Allah! Teri maafi chahta hoon.': ['اے اللہ! تیری معافی چاہتا ہوں۔', 'ऐ अल्लाह! तेरी माफ़ी चाहता हूँ।', 'O Allah, I seek Your forgiveness.', 'हे अल्लाह, तुझी माफी मागतो.'],
    'Allah ke naam se, maine Allah par bharosa kiya.': ['اللہ کے نام سے، میں نے اللہ پر بھروسہ کیا۔', 'अल्लाह के नाम से, मैंने अल्लाह पर भरोसा किया।', 'In Allah\'s name, I trust in Allah.', 'अल्लाहच्या नावाने, मी अल्लाहवर भरवसा ठेवला.'],
    'Allah ke naam se hum dakhil hue aur nikle, Allah par bharosa kiya.': ['اللہ کے نام سے ہم داخل ہوئے اور نکلے، اللہ پر بھروسہ کیا۔', 'अल्लाह के नाम से हम दाख़िल हुए और निकले, अल्लाह पर भरोसा किया।', 'In Allah\'s name we enter and leave, trusting in Allah.', 'अल्लाहच्या नावाने आत येतो व बाहेर जातो, अल्लाहवर भरवसा.'],
    'Ae Allah! Mere liye apni rehmat ke darwaze khol de.': ['اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔', 'ऐ अल्लाह! मेरे लिए अपनी रहमत के दरवाज़े खोल दे।', 'O Allah, open for me the doors of Your mercy.', 'हे अल्लाह, माझ्यासाठी तुझ्या दयेचे दरवाजे उघड.'],
    'Ae Allah! Main tujh se tera fazl mangta hoon.': ['اے اللہ! میں تجھ سے تیرا فضل مانگتا ہوں۔', 'ऐ अल्लाह! मैं तुझ से तेरा फ़ज़्ल माँगता हूँ।', 'O Allah, I ask You of Your bounty.', 'हे अल्लाह, तुझ्याकडून तुझी कृपा मागतो.'],
    'Cheenk aaye to "Alhamdulillah" kaho. Sunne wala kahe "Yarhamukallah".': ['چھینک آئے تو "الحمدللہ" کہو۔ سننے والا کہے "یرحمک اللہ"۔', 'छींक आए तो "अलहम्दुलिल्लाह" कहो। सुनने वाला कहे "यरहमुकल्लाह"।', 'When you sneeze say "Alhamdulillah". The listener says "Yarhamukallah".', 'शिंका आली तर "अलहम्दुलिल्लाह" म्हणा. ऐकणारा "यरहमुकल्लाह" म्हणेल.'],
    'Ae mere Rab! Un par raham kar jaise unhon ne bachpan mein mujhe pala.': ['اے میرے رب! ان پر رحم کر جیسے انہوں نے بچپن میں مجھے پالا۔', 'ऐ मेरे रब! उन पर रहम कर जैसे उन्होंने बचपन में मुझे पाला।', 'My Lord, have mercy on them as they raised me as a child.', 'हे माझ्या रब, त्यांच्यावर दया कर जशी त्यांनी बालपणी मला सांभाळले.'],
    'Ae mere Rab! Mera ilm barha de.': ['اے میرے رب! میرا علم بڑھا دے۔', 'ऐ मेरे रब! मेरा इल्म बढ़ा दे।', 'My Lord, increase my knowledge.', 'हे माझ्या रब, माझे ज्ञान वाढव.'],
    'Ae hamare Rab! Hamein dunya aur aakhirat mein bhalai de.': ['اے ہمارے رب! ہمیں دنیا اور آخرت میں بھلائی دے۔', 'ऐ हमारे रब! हमें दुनिया और आख़िरत में भलाई दे।', 'Our Lord, give us good in this world and the next.', 'हे आमच्या रब, आम्हाला दुनिया व आखिरतमध्ये बरे दे.'],
    'Tum par salamati, Allah ki rehmat aur barkat ho.': ['تم پر سلامتی، اللہ کی رحمت اور برکت ہو۔', 'तुम पर सलामती, अल्लाह की रहमत और बरकत हो।', 'Peace, Allah\'s mercy and blessings on you.', 'तुमच्यावर शांती, अल्लाहची दया व बरकत असो.'],
    'Allah ke siwa koi maabood nahi, Muhammad ﷺ Allah ke rasool hain.': ['اللہ کے سوا کوئی معبود نہیں، محمد ﷺ اللہ کے رسول ہیں۔', 'अल्लाह के सिवा कोई माबूद नहीं, मुहम्मद ﷺ अल्लाह के रसूल हैं।', 'There is no god but Allah, Muhammad ﷺ is Allah\'s messenger.', 'अल्लाहशिवाय कोणताही देव नाही, मुहम्मद ﷺ अल्लाहचे रसूल आहेत.'],

    /* ---- surahs ke matlab (data.js m) ---- */
    'Namaz ki pehli surah. Allah ki tareef aur seedhe raaste ki dua.': ['نماز کی پہلی سورت۔ اللہ کی تعریف اور سیدھے راستے کی دعا۔', 'नमाज़ की पहली सूरत। अल्लाह की तारीफ़ और सीधे रास्ते की दुआ।', 'The first surah of namaz — praise of Allah and a prayer for the straight path.', 'नमाजची पहिली सूरा — अल्लाहची स्तुती आणि सरळ मार्गाची दुआ.'],
    'Allah ne hamein bahut bhalai di, isliye namaz padho.': ['اللہ نے ہمیں بہت بھلائی دی، اس لیے نماز پڑھو۔', 'अल्लाह ने हमें बहुत भलाई दी, इसलिए नमाज़ पढ़ो।', 'Allah gave us much good, so pray to Him.', 'अल्लाहने आम्हाला खूप बरे दिले, म्हणून नमाज पढा.'],
    'Allah ek hai. Na us ki aulad, na koi us jaisa.': ['اللہ ایک ہے۔ نہ اس کی اولاد، نہ کوئی اس جیسا۔', 'अल्लाह एक है। न उसकी औलाद, न कोई उस जैसा।', 'Allah is one — no child, nothing like Him.', 'अल्लाह एक आहे — ना त्याची संतती, ना त्याच्यासारखा कोणी.'],
    'Logon ke Rab ki panah — waswason se hifazat.': ['لوگوں کے رب کی پناہ — وسوسوں سے حفاظت۔', 'लोगों के रब की पनाह — वसवसों से हिफ़ाज़त।', 'Refuge with the Lord of people — safety from whispers.', 'लोकांच्या रबाचा आसरा — वाईट सुचवण्यांपासून संरक्षण.'],
    'Subah ke Rab ki panah — buraiyon se hifazat.': ['صبح کے رب کی پناہ — برائیوں سے حفاظت۔', 'सुबह के रब की पनाह — बुराइयों से हिफ़ाज़त।', 'Refuge with the Lord of the dawn — safety from evil.', 'पहाटेच्या रबाचा आसरा — वाईटांपासून संरक्षण.'],
    'Waqt ki qasam — imaan, neik amal, sach aur sabr wale kamyab hain.': ['وقت کی قسم — ایمان، نیک عمل، سچ اور صبر والے کامیاب ہیں۔', 'वक़्त की क़सम — ईमान, नेक अमल, सच और सब्र वाले कामयाब हैं।', 'By time — those with faith, good deeds, truth and patience succeed.', 'वेळेची शपथ — श्रद्धा, चांगली कृती, सत्य व संयम असणारे यशस्वी.']
  };

  const keys = Object.keys(D).sort((a, b) => b.length - a.length);

  AA.t = function (k) {
    const v = D[k];
    const i = ORDER.indexOf(AA.lang);
    if (!v || i < 0) return k;
    return v[i] || k;
  };

  // poori HTML/screen ka tarjuma (jo lafz dictionary mein hai)
  AA.i18n = function (html) {
    const i = ORDER.indexOf(AA.lang);
    if (i < 0 || html == null) return html;
    let out = String(html);
    for (let k = 0; k < keys.length; k++) {
      const key = keys[k], val = D[key][i];
      if (val && out.indexOf(key) !== -1) out = out.split(key).join(val);
    }
    return out;
  };

  // content ka matlab chuni hui zubaan mein
  AA.mn = function (o) {
    if (!o) return '';
    const l = AA.lang;
    if (l === 'ur') return o.ur || o.ro || '';
    if (l === 'mr') return o.mr || o.hi || o.ro || '';
    if (l === 'hi') return o.hi || o.ro || '';
    if (l === 'en') return o.en || o.ro || '';
    return o.ro || o.ur || '';
  };
})();
