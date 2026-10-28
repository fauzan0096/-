'use strict';

const USTAD_KEY = 'qa_ustad_questions';
function loadQuestions() { try { return JSON.parse(localStorage.getItem(USTAD_KEY) || '[]'); } catch (e) { return []; } }
function saveQuestions(list) { try { localStorage.setItem(USTAD_KEY, JSON.stringify(list)); } catch (e) {} }
function unreadRepliesFor(name) { return loadQuestions().filter(q => q.from === name && q.reply && !q.seenBy).length; }
function markRepliesSeen(name) {
    const list = loadQuestions();
    let changed = false;
    list.forEach(q => { if (q.from === name && q.reply && !q.seenBy) { q.seenBy = true; changed = true; } });
    if (changed) saveQuestions(list);
    updateAskHero();
}

let ASK = { tab: 'faq', search: '', cat: 'all' };

function openAsk() { if (!currentUser) return; renderAskView(); $('ask-view').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeAsk() { $('ask-view').classList.remove('open'); document.body.style.overflow = ''; if (currentUser) markRepliesSeen(currentUser.name); }

function renderAskView() {
    const isAdmin = currentUser && currentUser.role === 'admin';
    const tabs = [
        { id: 'faq', label: '❓ FAQ' },
        { id: 'ask', label: '✍️ Poochho' },
        { id: isAdmin ? 'admin' : 'mine', label: isAdmin ? '👨‍🏫 Ustaad' : '💬 Mere Sawaal' }
    ];
    const unread = isAdmin ? loadQuestions().filter(q => !q.reply).length : unreadRepliesFor(currentUser.name);
    $('ask-view').innerHTML = `
        <div class="namaz-top">
            <button class="icon-btn" data-ask="close" aria-label="Band">${ico('x')}</button>
            <div class="t"><b>Ustad se Poochho</b><small>FAQ • Sawaal • Jawab</small></div>
        </div>
        <div class="namaz-tabs">${tabs.map(t => {
            const badge = ((t.id === 'admin' || t.id === 'mine') && unread > 0) ? ` <span class="ask-unread">${unread}</span>` : '';
            return `<button class="namaz-tab ${t.id === ASK.tab ? 'on' : ''}" data-ask="tab" data-tab="${t.id}">${t.label}${badge}</button>`;
        }).join('')}</div>
        <div class="ask-content" id="ask-content">${renderAskTab()}</div>`;
}

function renderAskTab() {
    if (ASK.tab === 'faq') return renderFaq();
    if (ASK.tab === 'ask') return renderAskForm();
    if (ASK.tab === 'mine') return renderMine();
    if (ASK.tab === 'admin') return renderAdmin();
    return '';
}

function renderFaq() {
    const search = (ASK.search || '').toLowerCase().trim();
    const cat = ASK.cat || 'all';
    let items = faqData;
    if (cat !== 'all') items = items.filter(f => f.cat === cat);
    if (search) items = items.filter(f => f.q.toLowerCase().includes(search) || f.a.toLowerCase().includes(search));
    return `
        <div class="ask-search"><input type="search" id="ask-search-input" placeholder="🔍 Sawaal dhoondein…" value="${esc(ASK.search)}"></div>
        <div class="ask-cats">
            <button class="ask-cat ${cat === 'all' ? 'on' : ''}" data-ask="cat" data-cat="all">Sab</button>
            ${faqCategories.map(c => `<button class="ask-cat ${cat === c.id ? 'on' : ''}" data-ask="cat" data-cat="${c.id}">${c.emoji} ${esc(c.name)}</button>`).join('')}
        </div>
        <div class="faq-list">
            ${items.length === 0 ? '<div class="ask-empty">😕 Kuch nahi mila — "Poochho" tab se apna sawaal likhein</div>' : ''}
            ${items.map(f => `<details class="faq-item"><summary><span class="fq-q">${esc(f.q)}</span><span class="fq-arrow">▾</span></summary><div class="fq-a">${esc(f.a)}</div>${f.ref ? `<div class="fq-ref">📖 ${esc(f.ref)}</div>` : ''}</details>`).join('')}
        </div>
        <div class="ask-cta"><button class="btn btn-gold btn-block" data-ask="newq">✍️ Apna sawaal poochho</button></div>`;
}

function renderAskForm() {
    return `
        <div class="ask-form">
            <div class="ask-form-head"><b>Apna sawaal likho</b><small>Ustad/parent ko dikhega, jawab milega</small></div>
            <label class="ask-label">Kis baare mein?</label>
            <select id="ask-q-cat" class="ask-select">${faqCategories.map(c => `<option value="${c.id}">${c.emoji} ${esc(c.name)}</option>`).join('')}</select>
            <label class="ask-label">Sawaal</label>
            <textarea id="ask-q-text" class="ask-textarea" placeholder="Yahan apna sawaal likho…" rows="6" maxlength="500"></textarea>
            <button class="btn btn-gold btn-lg btn-block" data-ask="submit">📤 Sawaal Bhejein</button>
            <p class="ask-note">💡 Foran jawab ke liye pehle <b>FAQ</b> tab check karo.</p>
        </div>`;
}

function renderMine() {
    const list = loadQuestions().filter(q => q.from === currentUser.name).sort((a, b) => b.createdAt - a.createdAt);
    if (list.length === 0) return `<div class="ask-empty">Abhi koi sawaal nahi — <b>Poochho</b> tab se pehla sawaal bhejo</div>`;
    return `<div class="my-q-list">${list.map(q => `
        <div class="my-q ${q.reply ? 'answered' : 'pending'}">
            <div class="mq-head"><small>${esc(q.date)}</small>${q.reply ? '<span class="mq-badge ok">✓ Jawab mila</span>' : '<span class="mq-badge wait">⏳ Intezar</span>'}</div>
            <div class="mq-q">${esc(q.text)}</div>
            ${q.reply ? `<div class="mq-reply"><b>Ustad ka jawab:</b> ${esc(q.reply)}</div>` : `<button class="mini" data-ask="share" data-qid="${q.id}">📤 WhatsApp par bhejo</button>`}
        </div>`).join('')}</div>`;
}

function renderAdmin() {
    const list = loadQuestions().sort((a, b) => b.createdAt - a.createdAt);
    const pending = list.filter(q => !q.reply);
    const answered = list.filter(q => q.reply);
    return `
        <div class="admin-summary">
            <div><b>${pending.length}</b><span>Pending</span></div>
            <div><b>${answered.length}</b><span>Jawab diye</span></div>
            <div><b>${list.length}</b><span>Total</span></div>
        </div>
        <div class="ask-subhead">⏳ Jawab ke intezar mein</div>
        ${pending.length === 0 ? '<div class="ask-empty">MashaAllah — koi pending nahi</div>' : pending.map(q => `
            <div class="admin-q"><div class="aq-head"><b>${esc(q.from)}</b><small>${esc(q.date)}</small></div>
                <div class="aq-text">${esc(q.text)}</div>
                <textarea class="ask-textarea" id="reply-${q.id}" placeholder="Jawab likhein…" rows="3"></textarea>
                <button class="btn btn-gold" data-ask="reply" data-qid="${q.id}">📩 Jawab bhejo</button>
            </div>`).join('')}
        <div class="ask-subhead" style="margin-top:24px">✓ Jawab diye gaye</div>
        ${answered.length === 0 ? '<div class="ask-empty">Abhi tak koi jawab nahi diya</div>' : answered.slice(0, 20).map(q => `
            <div class="admin-q answered"><div class="aq-head"><b>${esc(q.from)}</b><small>${esc(q.date)}</small></div>
                <div class="aq-text">${esc(q.text)}</div>
                <div class="aq-reply"><b>Jawab:</b> ${esc(q.reply)}</div>
            </div>`).join('')}`;
}

function submitQuestion() {
    const textEl = $('ask-q-text'), catEl = $('ask-q-cat');
    if (!textEl || !catEl) return;
    const text = textEl.value.trim();
    if (text.length < 5) { toast('Sawaal chhota hai'); return; }
    if (text.length > 500) { toast('Sawaal bahut lamba hai'); return; }
    const list = loadQuestions();
    list.push({ id: 'q' + Date.now(), from: currentUser.name, cat: catEl.value, text, createdAt: Date.now(), date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), reply: null, seenBy: false });
    saveQuestions(list);
    toast('Sawaal bhej diya');
    ASK.tab = 'mine';
    renderAskView();
    updateAskHero();
}
function replyToQuestion(qid) {
    const ta = $('reply-' + qid);
    if (!ta) return;
    const text = ta.value.trim();
    if (text.length < 3) { toast('Jawab chhota hai'); return; }
    const list = loadQuestions();
    const q = list.find(x => x.id === qid);
    if (!q) return;
    q.reply = text; q.repliedBy = currentUser.name; q.repliedAt = Date.now(); q.seenBy = false;
    saveQuestions(list);
    toast('Jawab bhej diya');
    renderAskView();
}
function shareQuestionWhatsApp(qid) {
    const q = loadQuestions().find(x => x.id === qid);
    if (!q) return;
    const text = `Assalamu alaikum,\n\n*${q.from}* ka sawaal:\n\n"${q.text}"\n\n📅 ${q.date}\n\n— Aghaaz-e-Asaas`;
    if (navigator.share) navigator.share({ title: 'Sawaal', text }).catch(() => window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank'));
    else window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
}
function updateAskHero() {
    const el = $('ask-progress');
    if (!el || !currentUser) return;
    const isAdmin = currentUser.role === 'admin';
    const n = isAdmin ? loadQuestions().filter(q => !q.reply).length : unreadRepliesFor(currentUser.name);
    if (n > 0) { el.textContent = isAdmin ? `${n} sawaal pending` : `${n} naya jawab`; el.style.color = 'var(--ok)'; el.style.fontWeight = '800'; }
    else { el.textContent = isAdmin ? 'Sab jawab diye' : 'Kuch bhi poochho'; el.style.color = ''; el.style.fontWeight = ''; }
}

function setupAskEvents() {
    const hero = $('ask-hero'); if (hero) hero.addEventListener('click', openAsk);
    const v = $('ask-view');
    if (!v) return;
    v.addEventListener('click', (e) => {
        const b = e.target.closest('[data-ask]');
        if (!b || b.disabled) return;
        const act = b.dataset.ask;
        if (act === 'close') return closeAsk();
        if (act === 'tab') return switchAskTab(b.dataset.tab);
        if (act === 'cat') { ASK.cat = b.dataset.cat; renderAskView(); return; }
        if (act === 'newq') { ASK.tab = 'ask'; renderAskView(); return; }
        if (act === 'submit') return submitQuestion();
        if (act === 'reply') return replyToQuestion(b.dataset.qid);
        if (act === 'share') return shareQuestionWhatsApp(b.dataset.qid);
    });
    v.addEventListener('input', (e) => {
        if (e.target.id === 'ask-search-input') {
            ASK.search = e.target.value;
            const pos = e.target.selectionStart;
            renderAskView();
            const inp = $('ask-search-input');
            if (inp) { inp.focus(); inp.setSelectionRange(pos, pos); }
        }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('ask-view') && $('ask-view').classList.contains('open')) closeAsk(); });
    setTimeout(updateAskHero, 800);
}
function switchAskTab(tab) { ASK.tab = tab; renderAskView(); }
window.addEventListener('DOMContentLoaded', setupAskEvents);
