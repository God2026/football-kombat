// --- تنظیمات اولیه تلگرام ---
const tg = window.Telegram.WebApp;
tg.expand();

// --- دیتابیس تیم‌ها (همان لیست کامل شما) ---
const TEAMS_DB = [
    { id: 'e1', cat: 'eng', name: 'آرسنال', img: 'https://www.thesportsdb.com/images/media/team/badge/7f89v81515431604.png', cost: 10000, profit: 800 },
    { id: 'e2', cat: 'eng', name: 'منچستر سیتی', img: 'https://www.thesportsdb.com/images/media/team/badge/89t6201520188737.png', cost: 12000, profit: 900 },
    { id: 's1', cat: 'spa', name: 'رئال مادرید', img: 'https://www.thesportsdb.com/images/media/team/badge/v799011532007887.png', cost: 15000, profit: 1100 },
    { id: 'i1', cat: 'irn', name: 'پرسپولیس', img: 'https://static.farakav.com/images/teams/92.png', cost: 3000, profit: 300 },
    // سایر تیم‌ها را بر اساس الگوی بالا اینجا اضافه کنید...
];

const LEAGUES = [
    { name: "تازه کار", min: 0, img: "assets/leagues/1.png" },
    { name: "کار آموز", min: 5000, img: "assets/leagues/2.png" },
    { name: "آماتور", min: 25000, img: "assets/leagues/3.png" },
    { name: "حرفه ای", min: 100000, img: "assets/leagues/4.png" }
];

// --- وضعیت کاربر (User State) ---
let state = {
    coins: 0,
    profitPerHour: 0,
    energy: 1000,
    maxEnergy: 1000,
    tapValue: 1,
    purchasedTeams: [],
    lastUpdate: Date.now()
};

// --- توابع اصلی ---

function init() {
    loadData();
    updateUI();
    renderTeams('eng');
    
    // حلقه تکرار برای سود ساعتی و بازیابی انرژی
    setInterval(() => {
        // محاسبه سود در ثانیه
        const pps = state.profitPerHour / 3600;
        state.coins += pps;
        
        // بازیابی انرژی (هر ثانیه 3 واحد)
        if (state.energy < state.maxEnergy) {
            state.energy = Math.min(state.maxEnergy, state.energy + 3);
        }
        
        updateUI();
    }, 1000);

    // ذخیره خودکار هر 5 ثانیه
    setInterval(saveData, 5000);
}

function handleTap(e) {
    if (state.energy >= state.tapValue) {
        state.energy -= state.tapValue;
        state.coins += state.tapValue;
        
        // افکت لرزش تلگرام
        if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');

        // نمایش عدد شناور
        createFloatingText(e);
        updateUI();
    }
}

function createFloatingText(e) {
    const tapArea = document.getElementById('tap-area');
    const rect = tapArea.getBoundingClientRect();
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;

    const el = document.createElement('div');
    el.className = 'float-text';
    el.innerText = `+${state.tapValue}`;
    el.style.left = `${x - rect.left}px`;
    el.style.top = `${y - rect.top}px`;
    
    tapArea.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

function updateUI() {
    document.getElementById('total-balance').innerText = Math.floor(state.coins).toLocaleString();
    document.getElementById('hour-profit').innerText = formatNum(state.profitPerHour);
    document.getElementById('current-energy').innerText = Math.floor(state.energy);
    document.getElementById('max-energy').innerText = state.maxEnergy;
    document.getElementById('tap-profit').innerText = `+${state.tapValue}`;
    
    // آپدیت نوار انرژی
    const energyPct = (state.energy / state.maxEnergy) * 100;
    document.getElementById('energy-fill').style.width = `${energyPct}%`;

    // آپدیت لیگ و کاراکتر
    let currentLeague = LEAGUES[0];
    LEAGUES.forEach((l, index) => {
        if (state.coins >= l.min) {
            currentLeague = l;
            document.getElementById('rank-number').innerText = index + 1;
        }
    });
    
    document.getElementById('league-name').innerText = currentLeague.name;
    const charImg = document.getElementById('character-img');
    if(!charImg.src.includes(currentLeague.img)) charImg.src = currentLeague.img;
}

function renderTeams(category) {
    const grid = document.getElementById('teams-grid');
    grid.innerHTML = '';
    
    const filtered = TEAMS_DB.filter(t => t.cat === category);
    filtered.forEach(team => {
        const isOwned = state.purchasedTeams.includes(team.id);
        const card = document.createElement('div');
        card.className = 'team-card';
        card.innerHTML = `
            <img src="${team.img}" class="team-logo-img">
            <h4>${team.name}</h4>
            <span class="p-label">سود در ساعت</span>
            <div class="p-amount">
                <img src="assets/coin.png" width="12">
                <span>+${team.profit}</span>
            </div>
            <div class="card-footer">
                <span class="lvl-badge">سطح 1</span>
                <div class="price-tag">
                    <img src="assets/coin.png" width="14">
                    <span>${formatNum(team.cost)}</span>
                </div>
            </div>
            ${isOwned ? '<div class="owned-overlay">✅</div>' : ''}
        `;
        card.onclick = () => buyTeam(team);
        grid.appendChild(card);
    });
}

function buyTeam(team) {
    if (state.purchasedTeams.includes(team.id)) return;
    
    if (state.coins >= team.cost) {
        state.coins -= team.cost;
        state.profitPerHour += team.profit;
        state.purchasedTeams.push(team.id);
        tg.showAlert(`${team.name} خریداری شد!`);
        renderTeams(team.cat);
        updateUI();
    } else {
        tg.showAlert("سکه کافی نداری!");
    }
}

function switchTab(tab, event) {
    document.querySelectorAll('.view-active, .view-hidden').forEach(v => {
        v.className = 'view-hidden';
    });
    document.getElementById(`${tab}-view`).className = 'view-active';
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function changeCategory(cat, event) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderTeams(cat);
}

function formatNum(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}

function saveData() {
    localStorage.setItem('fb_kombat_data', JSON.stringify(state));
}

function loadData() {
    const saved = localStorage.getItem('fb_kombat_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        // محاسبه سود آفلاین
        const offlineTime = (Date.now() - parsed.lastUpdate) / 1000;
        const offlineProfit = (parsed.profitPerHour / 3600) * offlineTime;
        
        state = {...parsed, coins: parsed.coins + offlineProfit, lastUpdate: Date.now()};
    }
}

// شروع بازی
document.getElementById('tap-area').addEventListener('touchstart', handleTap);
init();
