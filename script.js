const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#000000');

// لیست کامل سطح‌ها (11 مرحله)
const LEAGUES = [
    { name: "تازه کار", score: 0 },
    { name: "کار آموز", score: 5000 },
    { name: "آماتور", score: 25000 },
    { name: "حرفه ای", score: 100000 },
    { name: "با تجربه", score: 500000 },
    { name: "متخصص", score: 2000000 },
    { name: "ماهر", score: 10000000 },
    { name: "افسانه ای", score: 50000000 },
    { name: "ابر قدرت", score: 100000000 },
    { name: "خدا", score: 1000000000 },
    { name: "خالق", score: 10000000000 }
];

// لیست کامل تیم‌ها با عکس آنلاین
const TEAMS_DB = [
    // انگلیس
    { id: 'eng1', cat: 'eng', name: 'منچستر سیتی', img: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', cost: 15000, profit: 900 },
    { id: 'eng2', cat: 'eng', name: 'آرسنال', img: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', cost: 14000, profit: 850 },
    { id: 'eng3', cat: 'eng', name: 'لیورپول', img: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', cost: 13500, profit: 800 },
    { id: 'eng4', cat: 'eng', name: 'چلسی', img: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', cost: 12000, profit: 750 },
    
    // اسپانیا
    { id: 'spa1', cat: 'spa', name: 'رئال مادرید', img: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', cost: 18000, profit: 1200 },
    { id: 'spa2', cat: 'spa', name: 'بارسلونا', img: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', cost: 17000, profit: 1100 },
    { id: 'spa3', cat: 'spa', name: 'اتلتیکو', img: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg', cost: 10000, profit: 600 },

    // ایران
    { id: 'irn1', cat: 'irn', name: 'پرسپولیس', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Persepolis_F.C._logo.png', cost: 4000, profit: 250 },
    { id: 'irn2', cat: 'irn', name: 'استقلال', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Esteghlal_FC_Logo.png', cost: 4000, profit: 250 },
    { id: 'irn3', cat: 'irn', name: 'سپاهان', img: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Sepahan_FC_Logo.png', cost: 3500, profit: 200 },

    // آسیا
    { id: 'asia1', cat: 'asia', name: 'الهلال', img: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Al-Hilal_Saudi_FC_Logo.svg', cost: 10000, profit: 600 },
    { id: 'asia2', cat: 'asia', name: 'النصر', img: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Al_Nassr_FC_Logo.svg', cost: 9500, profit: 550 },

    // ملی (گران قیمت)
    { id: 'fifa1', cat: 'fifa', name: 'آرژانتین', img: 'https://upload.wikimedia.org/wikipedia/en/c/c1/Argentina_national_football_team_logo.svg', cost: 50000, profit: 3000 },
    { id: 'fifa2', cat: 'fifa', name: 'برزیل', img: 'https://upload.wikimedia.org/wikipedia/en/9/99/Brazilian_Football_Confederation_logo.svg', cost: 48000, profit: 2800 },
];

let user = {
    coins: 0,
    energy: 1000,
    maxEnergy: 1000,
    profitPerHour: 0,
    tapLevel: 1,
    purchasedTeams: []
};

function initGame() {
    // لود کردن سیو قبلی
    const saved = localStorage.getItem('football_kombat_v1');
    if (saved) {
        user = JSON.parse(saved);
    }

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        document.getElementById('username').innerText = tg.initDataUnsafe.user.first_name;
    }

    updateUI();
    filterShop('eng');
    setInterval(gameLoop, 1000);
}

function updateUI() {
    document.getElementById('total-coins').innerText = Math.floor(user.coins).toLocaleString();
    document.getElementById('profit-per-hour').innerText = user.profitPerHour.toLocaleString();
    document.getElementById('current-energy').innerText = Math.floor(user.energy);
    document.getElementById('max-energy').innerText = user.maxEnergy;

    // پیدا کردن لیگ فعلی
    let currentLeague = LEAGUES[0];
    for(let l of LEAGUES) {
        if(user.coins >= l.score) currentLeague = l;
    }
    document.getElementById('league-name').innerText = currentLeague.name;
    
    // آپدیت نوار پیشرفت (اختیاری برای زیبایی)
    let percent = (user.energy / user.maxEnergy) * 100;
    document.getElementById('level-progress-bar').style.width = percent + '%';
}

function handleTap(event) {
    if (user.energy >= user.tapLevel) {
        user.energy -= user.tapLevel;
        user.coins += user.tapLevel;
        
        // افکت ویبره
        if(tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');

        // افکت متن پرنده
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const floatTxt = document.createElement('div');
        floatTxt.className = 'floating-text';
        floatTxt.innerText = '+' + user.tapLevel;
        floatTxt.style.left = x + 'px';
        floatTxt.style.top = y + 'px';
        event.currentTarget.appendChild(floatTxt);
        
        setTimeout(() => floatTxt.remove(), 800);
        
        updateUI();
        saveData();
    }
}

function gameLoop() {
    // پر شدن انرژی
    if(user.energy < user.maxEnergy) user.energy += 2;
    // اضافه شدن سود ساعتی (تقسیم بر 3600 برای ثانیه)
    if(user.profitPerHour > 0) user.coins += (user.profitPerHour / 3600);
    
    updateUI();
    // ذخیره هر چند ثانیه یکبار (اینجا توی لوپ هر ثانیه ذخیره نمیکنیم که سنگین نشه)
    if(Math.random() < 0.1) saveData(); 
}

function saveData() {
    localStorage.setItem('football_kombat_v1', JSON.stringify(user));
}

function filterShop(cat) {
    // تغییر استایل دکمه‌ها
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const container = document.getElementById('team-cards-container');
    container.innerHTML = '';

    const teams = TEAMS_DB.filter(t => t.cat === cat);
    
    teams.forEach(team => {
        const isOwned = user.purchasedTeams.includes(team.id);
        const div = document.createElement('div');
        div.className = 'team-card';
        div.innerHTML = `
            <img src="${team.img}" class="team-logo" onerror="this.src='https://img.icons8.com/color/96/football2.png'">
            <div class="card-info">
                <h3>${team.name}</h3>
                <p>سود: +${team.profit}</p>
            </div>
            ${isOwned ? 
                `<button class="buy-btn" disabled>مالک هستید</button>` : 
                `<button class="buy-btn" onclick="buyTeam('${team.id}')">خرید ${team.cost.toLocaleString()}</button>`
            }
        `;
        container.appendChild(div);
    });
}

function buyTeam(id) {
    const team = TEAMS_DB.find(t => t.id === id);
    if(user.coins >= team.cost) {
        user.coins -= team.cost;
        user.profitPerHour += team.profit;
        user.purchasedTeams.push(id);
        saveData();
        updateUI();
        
        // رفرش کردن لیست برای غیرفعال کردن دکمه
        const activeTab = document.querySelector('.cat-btn.active');
        if(activeTab) activeTab.click();
        
        tg.showAlert(`تیم ${team.name} خریداری شد!`);
    } else {
        tg.showAlert("سکه کافی نداری!");
    }
}

function upgradeBoost(type) {
    const cost = 2000;
    if(user.coins >= cost) {
        user.coins -= cost;
        if(type === 'multitap') user.tapLevel++;
        if(type === 'energy') user.maxEnergy += 500;
        saveData();
        updateUI();
        tg.showAlert("ارتقا انجام شد!");
    } else {
        tg.showAlert("سکه کم داری!");
    }
}

function openTab(name) {
    document.querySelectorAll('.full-screen-view').forEach(el => el.classList.add('hidden'));
    document.getElementById('main-view').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    // پیدا کردن دکمه و اکتیو کردنش (ساده)
    
    if(name === 'game') {
        document.getElementById('main-view').classList.remove('hidden');
        document.querySelectorAll('.nav-item')[0].classList.add('active');
    } else {
        document.getElementById(name + '-view').classList.remove('hidden');
        if(name === 'shop') document.querySelectorAll('.nav-item')[1].classList.add('active');
        if(name === 'upgrade') document.querySelectorAll('.nav-item')[2].classList.add('active');
        if(name === 'friends') document.querySelectorAll('.nav-item')[3].classList.add('active');
    }
}

initGame();
