const tg = window.Telegram.WebApp;
tg.expand();

// دیتابیس تیم‌ها با لینک‌های واقعی لوگوها
const TEAMS_DB = [
    { id: 'eng1', cat: 'eng', name: 'آرسنال', img: 'https://p.nomic.ai/logos/arsenal.png', cost: 10000, profit: 800 },
    { id: 'eng2', cat: 'eng', name: 'منچستر سیتی', img: 'https://p.nomic.ai/logos/manchester-city.png', cost: 12000, profit: 900 },
    { id: 'spa1', cat: 'spa', name: 'رئال مادرید', img: 'https://p.nomic.ai/logos/real-madrid.png', cost: 15000, profit: 1100 },
    { id: 'spa2', cat: 'spa', name: 'بارسلونا', img: 'https://p.nomic.ai/logos/barcelona.png', cost: 14000, profit: 1050 },
    { id: 'irn1', cat: 'irn', name: 'پرسپولیس', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Persepolis_FC_logo.svg/150px-Persepolis_FC_logo.svg.png', cost: 5000, profit: 400 },
    { id: 'irn2', cat: 'irn', name: 'استقلال', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Esteghlal_F.C._logo.svg/150px-Esteghlal_F.C._logo.svg.png', cost: 5000, profit: 400 },
    { id: 'fifa1', cat: 'fifa', name: 'آرژانتین', img: 'https://p.nomic.ai/logos/argentina.png', cost: 50000, profit: 3000 }
];

// لیدربرد فرضی (در آینده می‌تونی از سرور بگیری)
const LEADERBOARD_DATA = [
    { name: "آتبین 👑", coins: 15000000 },
    { name: "طاها 🐌", coins: 12000000 },
    { name: "جسیکا 🐾", coins: 8000000 },
    { name: "کارامل 🍭", coins: 5000000 },
    { name: "فلور ✨", coins: 2000000 }
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

function initGame() {
    const saved = localStorage.getItem('football_kombat_save_v2');
    if (saved) user = JSON.parse(saved);

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        user.username = tg.initDataUnsafe.user.first_name;
    }
    
    document.getElementById('username').innerText = user.username;

    setInterval(saveData, 5000);
    setInterval(gameLoop, 1000);
    
    updateUI();
    filterShop('eng');
    renderLeaderboard();
}

function updateUI() {
    document.getElementById('total-coins').innerText = Math.floor(user.coins).toLocaleString();
    document.getElementById('profit-per-hour').innerText = "+" + formatNumber(user.profitPerHour);
    document.getElementById('earn-per-tap').innerText = user.tapLevel;
    document.getElementById('current-energy').innerText = Math.floor(user.energy);
    
    // درصد انرژی برای بار پایین
    let energyPct = (user.energy / user.maxEnergy) * 100;
    document.getElementById('energy-progress').style.width = energyPct + "%";
}

function handleTap(event) {
    if (user.energy >= user.tapLevel) {
        user.energy -= user.tapLevel;
        user.coins += user.tapLevel;
        
        if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
        
        createFloatingText(event);
        updateUI();
    }
}

function createFloatingText(e) {
    const floatTxt = document.createElement('div');
    floatTxt.className = 'floating-text';
    floatTxt.innerText = `+${user.tapLevel}`;
    floatTxt.style.left = `${e.clientX}px`;
    floatTxt.style.top = `${e.clientY}px`;
    document.body.appendChild(floatTxt);
    setTimeout(() => floatTxt.remove(), 800);
}

function gameLoop() {
    if (user.energy < user.maxEnergy) user.energy += (user.maxEnergy / 600);
    if (user.profitPerHour > 0) user.coins += (user.profitPerHour / 3600);
    updateUI();
}

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    container.innerHTML = LEADERBOARD_DATA.map((player, index) => `
        <div class="leader-item ${index === 0 ? 'top-player' : ''}">
            <span>#${index + 1} ${player.name}</span>
            <span>${formatNumber(player.coins)} سکه</span>
        </div>
    `).join('');
}

function filterShop(category) {
    const container = document.getElementById('team-cards-container');
    container.innerHTML = '';
    const filtered = TEAMS_DB.filter(t => t.cat === category);
    
    filtered.forEach(team => {
        const isOwned = user.purchasedTeams.includes(team.id);
        const div = document.createElement('div');
        div.className = 'team-card';
        div.innerHTML = `
            <img src="${team.img}" class="team-logo" onerror="this.src='https://cdn-icons-png.flaticon.com/512/53/53283.png'">
            <h4>${team.name}</h4>
            <div class="card-profit">💰 +${team.profit}/h</div>
            <button class="buy-btn" ${isOwned ? 'disabled' : `onclick="buyTeam('${team.id}')"`}>
                ${isOwned ? 'خریداری شده ✅' : `${formatNumber(team.cost)} سکه`}
            </button>
        `;
        container.appendChild(div);
    });
}

function buyTeam(id) {
    const team = TEAMS_DB.find(t => t.id === id);
    if (user.coins >= team.cost) {
        user.coins -= team.cost;
        user.profitPerHour += team.profit;
        user.purchasedTeams.push(id);
        saveData();
        updateUI();
        filterShop(team.cat);
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
    } else {
        tg.showAlert("رفیق سکه‌هات کافی نیست! ❌");
    }
}

function openTab(tabName, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.querySelectorAll('.full-screen-view').forEach(v => v.classList.add('hidden'));
    document.getElementById(`${tabName}-view`).classList.remove('hidden');
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}

function saveData() {
    localStorage.setItem('football_kombat_save_v2', JSON.stringify(user));
}

initGame();
