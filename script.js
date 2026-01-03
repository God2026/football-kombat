const tg = window.Telegram.WebApp;
tg.expand();

// سطح بندی لیگ (بر اساس پوشه assets/leagues در گیت‌هاب تو)
const LEAGUES = [
    { name: "تازه کار", score: 0, img: "assets/leagues/1.png" },
    { name: "کار آموز", score: 5000, img: "assets/leagues/2.png" },
    { name: "آماتور", score: 25000, img: "assets/leagues/3.png" },
    { name: "حرفه ای", score: 100000, img: "assets/leagues/4.png" },
    { name: "با تجربه", score: 500000, img: "assets/leagues/5.png" },
    { name: "متخصص", score: 2000000, img: "assets/leagues/6.png" },
    { name: "ماهر", score: 10000000, img: "assets/leagues/7.png" },
    { name: "افسانه ای", score: 50000000, img: "assets/leagues/8.png" },
    { name: "ابر قدرت", score: 100000000, img: "assets/leagues/9.png" },
    { name: "خدا", score: 1000000000, img: "assets/leagues/10.png" }
];

// لیست کامل تیم‌ها با لینک مستقیم عکس
const TEAMS_DB = [
    // --- لیگ برتر انگلیس (cat: eng) ---
    { id: 'e1', cat: 'eng', name: 'آرسنال', img: 'https://www.thesportsdb.com/images/media/team/badge/7f89v81515431604.png', cost: 10000, profit: 800 },
    { id: 'e2', cat: 'eng', name: 'منچستر سیتی', img: 'https://www.thesportsdb.com/images/media/team/badge/89t6201520188737.png', cost: 12000, profit: 900 },
    { id: 'e3', cat: 'eng', name: 'استون ویلا', img: 'https://www.thesportsdb.com/images/media/team/badge/7786961550999554.png', cost: 8000, profit: 600 },
    { id: 'e4', cat: 'eng', name: 'لیورپول', img: 'https://www.thesportsdb.com/images/media/team/badge/098r3p1515431616.png', cost: 11000, profit: 850 },
    { id: 'e5', cat: 'eng', name: 'چلسی', img: 'https://www.thesportsdb.com/images/media/team/badge/73617u1515431590.png', cost: 10500, profit: 820 },
    { id: 'e6', cat: 'eng', name: 'منچستر یونایتد', img: 'https://www.thesportsdb.com/images/media/team/badge/9d7y931551000302.png', cost: 10500, profit: 820 },
    { id: 'e7', cat: 'eng', name: 'ساندرلند', img: 'https://www.thesportsdb.com/images/media/team/badge/ovp82r1511453225.png', cost: 5000, profit: 300 },
    { id: 'e8', cat: 'eng', name: 'اورتون', img: 'https://www.thesportsdb.com/images/media/team/badge/9692481534064098.png', cost: 6000, profit: 400 },
    { id: 'e9', cat: 'eng', name: 'برنتفورد', img: 'https://www.thesportsdb.com/images/media/team/badge/6wst4n1534064434.png', cost: 5500, profit: 350 },
    { id: 'e10', cat: 'eng', name: 'تاتنهام', img: 'https://www.thesportsdb.com/images/media/team/badge/vvn90b1515431631.png', cost: 9000, profit: 700 },

    // --- لالیگا اسپانیا (cat: spa) ---
    { id: 's1', cat: 'spa', name: 'رئال مادرید', img: 'https://www.thesportsdb.com/images/media/team/badge/v799011532007887.png', cost: 15000, profit: 1100 },
    { id: 's2', cat: 'spa', name: 'بارسلونا', img: 'https://www.thesportsdb.com/images/media/team/badge/7498d21547159656.png', cost: 14000, profit: 1050 },
    { id: 's3', cat: 'spa', name: 'اتلتیکو مادرید', img: 'https://www.thesportsdb.com/images/media/team/badge/0995v01547159816.png', cost: 10000, profit: 750 },
    { id: 's4', cat: 'spa', name: 'سویا', img: 'https://www.thesportsdb.com/images/media/team/badge/v998f41547160351.png', cost: 7000, profit: 500 },
    { id: 's5', cat: 'spa', name: 'رئال سوسیداد', img: 'https://www.thesportsdb.com/images/media/team/badge/66u44s1547160121.png', cost: 6500, profit: 450 },
    { id: 's6', cat: 'spa', name: 'ویارئال', img: 'https://www.thesportsdb.com/images/media/team/badge/7f7e2v1547160410.png', cost: 6000, profit: 400 },
    { id: 's7', cat: 'spa', name: 'والنسیا', img: 'https://www.thesportsdb.com/images/media/team/badge/8009361547160279.png', cost: 6500, profit: 450 },

    // --- لیگ خلیج فارس (cat: irn) ---
    { id: 'i1', cat: 'irn', name: 'پرسپولیس', img: 'https://static.farakav.com/images/teams/92.png', cost: 3000, profit: 300 },
    { id: 'i2', cat: 'irn', name: 'استقلال', img: 'https://static.farakav.com/images/teams/91.png', cost: 3000, profit: 300 },
    { id: 'i3', cat: 'irn', name: 'سپاهان', img: 'https://static.farakav.com/images/teams/95.png', cost: 2800, profit: 280 },
    { id: 'i4', cat: 'irn', name: 'تراکتور', img: 'https://static.farakav.com/images/teams/96.png', cost: 2700, profit: 270 },
    { id: 'i5', cat: 'irn', name: 'ملوان', img: 'https://static.farakav.com/images/teams/102.png', cost: 1500, profit: 150 },
    { id: 'i6', cat: 'irn', name: 'فولاد', img: 'https://static.farakav.com/images/teams/93.png', cost: 1800, profit: 180 },

    // --- نخبگان آسیا (cat: asia) ---
    { id: 'a1', cat: 'asia', name: 'الهلال', img: 'https://www.thesportsdb.com/images/media/team/badge/v6r8p31544603460.png', cost: 9000, profit: 700 },
    { id: 'a2', cat: 'asia', name: 'النصر', img: 'https://www.thesportsdb.com/images/media/team/badge/y64y0u1544603487.png', cost: 8500, profit: 650 },
    { id: 'a3', cat: 'asia', name: 'السد', img: 'https://www.thesportsdb.com/images/media/team/badge/xqruqv1423402422.png', cost: 5000, profit: 400 },
    { id: 'a4', cat: 'asia', name: 'ویسل کوبه', img: 'https://www.thesportsdb.com/images/media/team/badge/uuyrqu1424103323.png', cost: 4500, profit: 350 },

    // --- فیفا 2026 (cat: fifa) ---
    { id: 'f1', cat: 'fifa', name: 'آرژانتین', img: 'https://www.thesportsdb.com/images/media/team/badge/m077s51547633633.png', cost: 50000, profit: 3000 },
    { id: 'f2', cat: 'fifa', name: 'برزیل', img: 'https://www.thesportsdb.com/images/media/team/badge/7968501547634015.png', cost: 48000, profit: 2900 },
    { id: 'f3', cat: 'fifa', name: 'ایران', img: 'https://www.thesportsdb.com/images/media/team/badge/5760161544603681.png', cost: 15000, profit: 1000 },
    { id: 'f4', cat: 'fifa', name: 'آلمان', img: 'https://www.thesportsdb.com/images/media/team/badge/9v6r881547635207.png', cost: 45000, profit: 2700 },
    { id: 'f5', cat: 'fifa', name: 'فرانسه', img: 'https://www.thesportsdb.com/images/media/team/badge/5770021547633838.png', cost: 48000, profit: 2900 }
];

let user = {
    username: "Guest",
    coins: 0,
    energy: 1000,
    maxEnergy: 1000,
    profitPerHour: 0,
    tapLevel: 1,
    purchasedTeams: []
};

// --- منطق بازی ---

function initGame() {
    const saved = localStorage.getItem('football_kombat_save');
    if (saved) user = JSON.parse(saved);

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        user.username = tg.initDataUnsafe.user.first_name;
    }
    document.getElementById('username').innerText = user.username;

    setInterval(saveData, 5000);
    setInterval(gameLoop, 1000);
    
    updateUI();
    filterShop('eng'); 
}

function updateUI() {
    document.getElementById('total-coins').innerText = Math.floor(user.coins).toLocaleString();
    document.getElementById('profit-per-hour').innerText = "+" + formatNumber(user.profitPerHour);
    document.getElementById('earn-per-tap').innerText = user.tapLevel;
    document.getElementById('current-energy').innerText = Math.floor(user.energy);
    
    // منطق سطح‌بندی
    let leagueIdx = 0;
    for(let i = 0; i < LEAGUES.length; i++) {
        if(user.coins >= LEAGUES[i].score) leagueIdx = i;
    }
    
    let activeLeague = LEAGUES[leagueIdx];
    document.getElementById('league-name').innerText = activeLeague.name;
    
    const charImg = document.getElementById('main-character');
    if (charImg && !charImg.src.includes(activeLeague.img)) {
        charImg.src = activeLeague.img;
    }

    let nextLeague = LEAGUES[leagueIdx + 1];
    if (nextLeague) {
        document.getElementById('coins-to-levelup').innerText = formatNumber(nextLeague.score);
        let pct = ((user.coins - activeLeague.score) / (nextLeague.score - activeLeague.score)) * 100;
        document.getElementById('level-progress-bar').style.width = Math.min(pct, 100) + "%";
    } else {
        document.getElementById('coins-to-levelup').innerText = "MAX";
        document.getElementById('level-progress-bar').style.width = "100%";
    }
}

function handleTap(event) {
    if (user.energy >= user.tapLevel) {
        user.energy -= user.tapLevel;
        user.coins += user.tapLevel;
        if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
        
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const floatTxt = document.createElement('div');
        floatTxt.className = 'floating-text';
        floatTxt.innerText = '+' + user.tapLevel;
        floatTxt.style.left = x + 'px';
        floatTxt.style.top = y + 'px';
        event.currentTarget.appendChild(floatTxt);
        setTimeout(() => floatTxt.remove(), 1000);
        
        updateUI();
    }
}

function gameLoop() {
    if (user.energy < user.maxEnergy) user.energy += (user.maxEnergy / 600);
    if (user.profitPerHour > 0) user.coins += (user.profitPerHour / 3600);
    updateUI();
}

function saveData() {
    localStorage.setItem('football_kombat_save', JSON.stringify(user));
}

function filterShop(category) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    // پیدا کردن دکمه و فعال کردن آن
    const container = document.getElementById('team-cards-container');
    container.innerHTML = '';

    const filtered = TEAMS_DB.filter(t => t.cat === category);
    
    filtered.forEach(team => {
        const isOwned = user.purchasedTeams.includes(team.id);
        const div = document.createElement('div');
        div.className = 'team-card';
        div.innerHTML = `
            <img src="${team.img}" class="team-logo" onerror="this.src='assets/coin.png'">
            <h4>${team.name}</h4>
            <p style="font-size:10px; color:#aaa">سود: +${team.profit}/ساعت</p>
            <button class="buy-btn" ${isOwned ? 'disabled' : ''} onclick="buyTeam('${team.id}')">
                ${isOwned ? 'خریداری شد ✅' : formatNumber(team.cost) + ' سکه'}
            </button>
        `;
        container.appendChild(div);
    });
}

function buyTeam(id) {
    const team = TEAMS_DB.find(t => t.id === id);
    if (user.purchasedTeams.includes(id)) return;
    
    if (user.coins >= team.cost) {
        user.coins -= team.cost;
        user.profitPerHour += team.profit;
        user.purchasedTeams.push(id);
        saveData();
        updateUI();
        filterShop(team.cat);
    } else {
        tg.showAlert("سکه کافی نداری!");
    }
}

function openTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.full-screen-view').forEach(v => v.classList.add('hidden'));
    document.getElementById('main-view').classList.add('hidden');

    if (tabName === 'game') {
        document.getElementById('main-view').classList.remove('hidden');
    } else {
        document.getElementById(tabName + '-view').classList.remove('hidden');
    }
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}
function createTeamCard(team) {
    return `
        <div class="team-card">
            <img src="${team.image}" class="team-logo">
            <span class="team-name">${team.name}</span>
            <span class="profit-text">سود در ساعت</span>
            <div class="profit-value">
                <img src="assets/coin.png">
                <span>+${team.profit}</span>
            </div>
            
            <div class="card-footer">
                <span class="lvl-text">lvl ${team.level || 1}</span>
                <div class="price-box">
                    <img src="assets/coin.png" width="12">
                    <span>${team.price}</span>
                </div>
            </div>
            <button class="buy-btn" onclick="buyTeam('${team.id}')"></button>
        </div>
    `;
}

initGame();

