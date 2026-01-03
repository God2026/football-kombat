const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#000000'); // هدر مشکی برای یکدستی با تم

// --- 1. سیستم سطح‌بندی کامل (11 سطح) ---
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
    { name: "خدا", score: 1000000000, img: "assets/leagues/10.png" },
    { name: "خالق", score: 10000000000, img: "assets/leagues/11.png" }
];

// --- 2. دیتابیس جامع تیم‌ها (لینک‌های واقعی و بالانس شده) ---
const TEAMS_DB = [
    // --- 🇬🇧 لیگ برتر انگلیس (Premier League) ---
    { id: 'eng_mci', cat: 'eng', name: 'منچستر سیتی', img: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg', cost: 15000, profit: 950 },
    { id: 'eng_ars', cat: 'eng', name: 'آرسنال', img: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', cost: 14000, profit: 850 },
    { id: 'eng_liv', cat: 'eng', name: 'لیورپول', img: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg', cost: 13500, profit: 800 },
    { id: 'eng_che', cat: 'eng', name: 'چلسی', img: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg', cost: 12000, profit: 750 },
    { id: 'eng_mun', cat: 'eng', name: 'منچستر یونایتد', img: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg', cost: 12000, profit: 750 },
    { id: 'eng_tot', cat: 'eng', name: 'تاتنهام', img: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg', cost: 10000, profit: 600 },
    { id: 'eng_new', cat: 'eng', name: 'نیوکاسل', img: 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg', cost: 9500, profit: 550 },
    { id: 'eng_avl', cat: 'eng', name: 'استون ویلا', img: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg', cost: 8000, profit: 450 },
    { id: 'eng_whu', cat: 'eng', name: 'وست هم', img: 'https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg', cost: 7000, profit: 350 },
    { id: 'eng_bri', cat: 'eng', name: 'برایتون', img: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg', cost: 6500, profit: 300 },

    // --- 🇪🇸 لالیگا اسپانیا (La Liga) ---
    { id: 'spa_rmd', cat: 'spa', name: 'رئال مادرید', img: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg', cost: 18000, profit: 1200 },
    { id: 'spa_bar', cat: 'spa', name: 'بارسلونا', img: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', cost: 17000, profit: 1100 },
    { id: 'spa_atl', cat: 'spa', name: 'اتلتیکو مادرید', img: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg', cost: 11000, profit: 650 },
    { id: 'spa_sev', cat: 'spa', name: 'سویا', img: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg', cost: 8000, profit: 400 },
    { id: 'spa_val', cat: 'spa', name: 'والنسیا', img: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg', cost: 7500, profit: 380 },
    { id: 'spa_vil', cat: 'spa', name: 'ویارئال', img: 'https://upload.wikimedia.org/wikipedia/en/7/70/Villarreal_CF_logo.svg', cost: 7000, profit: 350 },
    { id: 'spa_bet', cat: 'spa', name: 'رئال بتیس', img: 'https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg', cost: 6500, profit: 300 },

    // --- 🇮🇷 لیگ برتر ایران (Persian Gulf Pro League) ---
    { id: 'irn_prs', cat: 'irn', name: 'پرسپولیس', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Persepolis_F.C._logo.png', cost: 4000, profit: 250 },
    { id: 'irn_est', cat: 'irn', name: 'استقلال', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Esteghlal_FC_Logo.png', cost: 4000, profit: 250 },
    { id: 'irn_sep', cat: 'irn', name: 'سپاهان', img: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Sepahan_FC_Logo.png', cost: 3500, profit: 200 },
    { id: 'irn_tra', cat: 'irn', name: 'تراکتور', img: 'https://upload.wikimedia.org/wikipedia/en/0/06/Tractor_S.C._Logo.png', cost: 3500, profit: 200 },
    { id: 'irn_foo', cat: 'irn', name: 'فولاد', img: 'https://upload.wikimedia.org/wikipedia/en/3/30/Foolad_FC_Logo.png', cost: 2500, profit: 150 },
    { id: 'irn_mal', cat: 'irn', name: 'ملوان', img: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Malavan_FC_logo.png', cost: 2000, profit: 120 },
    { id: 'irn_gol', cat: 'irn', name: 'گل گهر', img: 'https://upload.wikimedia.org/wikipedia/fa/2/25/Gol_Gohar_Sirjan_FC_Logo.png', cost: 2000, profit: 120 },

    // --- 🌏 برترین‌های آسیا (AFC Giants) ---
    { id: 'asa_hil', cat: 'asia', name: 'الهلال', img: 'https://upload.wikimedia.org/wikipedia/en/a/a9/Al-Hilal_Saudi_FC_Logo.svg', cost: 12000, profit: 800 },
    { id: 'asa_nas', cat: 'asia', name: 'النصر', img: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Al_Nassr_FC_Logo.svg', cost: 11500, profit: 750 },
    { id: 'asa_iti', cat: 'asia', name: 'الاتحاد', img: 'https://upload.wikimedia.org/wikipedia/en/5/52/Al-Ittihad_Club_logo.svg', cost: 10000, profit: 650 },
    { id: 'asa_sad', cat: 'asia', name: 'السد قطر', img: 'https://upload.wikimedia.org/wikipedia/en/8/82/Al_Sadd_SC_logo.svg', cost: 9000, profit: 600 },
    { id: 'asa_kaw', cat: 'asia', name: 'کاوازاکی', img: 'https://upload.wikimedia.org/wikipedia/en/9/93/Kawasaki_Frontale_logo.svg', cost: 8000, profit: 500 },

    // --- 🏆 تیم‌های ملی (World Cup Legends) ---
    { id: 'fifa_arg', cat: 'fifa', name: 'آرژانتین', img: 'https://upload.wikimedia.org/wikipedia/en/c/c1/Argentina_national_football_team_logo.svg', cost: 60000, profit: 4000 },
    { id: 'fifa_fra', cat: 'fifa', name: 'فرانسه', img: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Logo_France_national_football_team.svg', cost: 58000, profit: 3800 },
    { id: 'fifa_bra', cat: 'fifa', name: 'برزیل', img: 'https://upload.wikimedia.org/wikipedia/en/9/99/Brazilian_Football_Confederation_logo.svg', cost: 55000, profit: 3600 },
    { id: 'fifa_eng', cat: 'fifa', name: 'انگلیس', img: 'https://upload.wikimedia.org/wikipedia/en/8/87/England_national_football_team_crest.svg', cost: 50000, profit: 3400 },
    { id: 'fifa_por', cat: 'fifa', name: 'پرتغال', img: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Portuguese_Football_Federation.svg', cost: 48000, profit: 3200 },
    { id: 'fifa_ger', cat: 'fifa', name: 'آلمان', img: 'https://upload.wikimedia.org/wikipedia/en/e/e3/DFB-Logo_2011.svg', cost: 45000, profit: 3000 },
    { id: 'fifa_ita', cat: 'fifa', name: 'ایتالیا', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Logo_Italy_National_Football_Team_2023.png', cost: 42000, profit: 2800 },
];

// --- تنظیمات اولیه کاربر ---
let user = {
    username: "Guest",
    coins: 0,
    energy: 1000,
    maxEnergy: 1000,
    profitPerHour: 0,
    tapLevel: 1,
    purchasedTeams: [],
    lastLogin: Date.now()
};

function initGame() {
    const saved = localStorage.getItem('football_kombat_save_v3'); // ورژن سیو رو بردم بالا
    if (saved) {
        let savedUser = JSON.parse(saved);
        // ادغام سیو با مقادیر پیش فرض برای جلوگیری از باگ نسخه‌های قبلی
        user = { ...user, ...savedUser };
    }

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        user.username = tg.initDataUnsafe.user.first_name;
    }
    document.getElementById('username').innerText = user.username;

    // محاسبه درآمد آفلاین (وقتی کاربر نبود)
    calculateOfflineProfit();

    setInterval(saveData, 3000); // ذخیره خودکار هر 3 ثانیه
    setInterval(gameLoop, 1000); // لوپ اصلی بازی
    
    updateUI();
    filterShop('eng'); // پیش فرض روی لیگ انگلیس
}

function calculateOfflineProfit() {
    const now = Date.now();
    const last = user.lastLogin || now;
    const diffSeconds = (now - last) / 1000;
    
    // اگر بیشتر از 5 دقیقه آفلاین بوده
    if (diffSeconds > 60 && user.profitPerHour > 0) {
        const earned = Math.floor((user.profitPerHour / 3600) * diffSeconds);
        if (earned > 0) {
            user.coins += earned;
            tg.showAlert(`خوش برگشتی رفیق! 🤑\nدر نبودت ${formatNumber(earned)} سکه جمع شد.`);
        }
    }
}

function updateUI() {
    user.lastLogin = Date.now();
    
    // بروزرسانی اعداد
    document.getElementById('total-coins').innerText = Math.floor(user.coins).toLocaleString();
    document.getElementById('profit-per-hour').innerText = "+" + formatNumber(user.profitPerHour);
    document.getElementById('earn-per-tap').innerText = user.tapLevel;
    document.getElementById('current-energy').innerText = Math.floor(user.energy);
    document.getElementById('max-energy').innerText = user.maxEnergy;

    // محاسبه لیگ فعلی
    let currentLeague = LEAGUES[0];
    let nextLeague = LEAGUES[1];
    
    for (let i = 0; i < LEAGUES.length; i++) {
        if (user.coins >= LEAGUES[i].score) {
            currentLeague = LEAGUES[i];
            nextLeague = LEAGUES[i+1] || null;
        }
    }

    document.getElementById('league-name').innerText = currentLeague.name;
    // اینجا میتونی عکس لیگ رو هم عوض کنی اگه خواستی
    // document.getElementById('league-icon').src = currentLeague.img;

    // نوار پیشرفت لول
    if (nextLeague) {
        let prevScore = currentLeague.score;
        let targetScore = nextLeague.score;
        let pct = ((user.coins - prevScore) / (targetScore - prevScore)) * 100;
        if (pct < 0) pct = 0;
        if (pct > 100) pct = 100;
        
        document.getElementById('level-progress-bar').style.width = pct + "%";
        document.getElementById('coins-to-levelup').innerText = formatNumber(targetScore - user.coins);
    } else {
        document.getElementById('level-progress-bar').style.width = "100%";
        document.getElementById('coins-to-levelup').innerText = "MAX";
    }
}

function handleTap(event) {
    if (user.energy >= user.tapLevel) {
        user.energy -= user.tapLevel;
        user.coins += user.tapLevel;
        
        // ویبره برای حس بهتر
        if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
        
        // افکت عدد پرنده
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = (Math.random() - 0.5) * 50; 
        const x = event.clientX - rect.left + offsetX;
        const y = event.clientY - rect.top;
        
        const floatTxt = document.createElement('div');
        floatTxt.className = 'floating-text';
        floatTxt.innerText = '+' + user.tapLevel;
        floatTxt.style.left = x + 'px';
        floatTxt.style.top = y + 'px';
        event.currentTarget.appendChild(floatTxt);
        
        setTimeout(() => floatTxt.remove(), 800);
        updateUI();
    }
}

function gameLoop() {
    // پر شدن انرژی
    if (user.energy < user.maxEnergy) {
        user.energy += (user.maxEnergy / 300); // 5 دقیقه تا پر شدن کامل
    }
    
    // اضافه شدن سود ساعتی
    if (user.profitPerHour > 0) {
        user.coins += (user.profitPerHour / 3600);
    }
    
    updateUI();
}

function saveData() {
    localStorage.setItem('football_kombat_save_v3', JSON.stringify(user));
}

function filterShop(category) {
    // اکتیو کردن تب
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    // پیدا کردن دکمه‌ای که این تابع رو صدا زده (اگر با کلیک باشه)
    const btns = document.querySelectorAll('.cat-btn');
    btns.forEach(btn => {
        if(btn.getAttribute('onclick').includes(category)) btn.classList.add('active');
    });

    const container = document.getElementById('team-cards-container');
    container.innerHTML = '';

    const filtered = TEAMS_DB.filter(t => t.cat === category);
    
    if(filtered.length === 0) {
        container.innerHTML = '<p style="color:#777; width:200%; text-align:center; margin-top:30px;">تیمی یافت نشد!</p>';
        return;
    }

    filtered.forEach(team => {
        const isOwned = user.purchasedTeams.includes(team.id);
        const div = document.createElement('div');
        div.className = 'team-card glass-panel'; // اضافه کردن کلاس پنل شیشه‌ای برای زیبایی
        
        // هندل کردن ارور عکس با عکس پیش‌فرض
        const defaultImg = 'https://img.icons8.com/color/96/football2.png';
        
        div.innerHTML = `
            <img src="${team.img}" class="team-logo" onerror="this.src='${defaultImg}'" alt="${team.name}">
            <h4>${team.name}</h4>
            <p style="font-size:11px; color:#aaa; margin-bottom:10px">سود: +${formatNumber(team.profit)} 💰</p>
            ${isOwned ? 
                `<button class="buy-btn" disabled style="background:rgba(255,255,255,0.1); color:#fff; border:1px solid #555;">✅ مالکی</button>` : 
                `<button class="buy-btn" onclick="buyTeam('${team.id}')">خرید ${formatNumber(team.cost)}</button>`
            }
        `;
        container.appendChild(div);
    });
}

function buyTeam(id) {
    const team = TEAMS_DB.find(t => t.id === id);
    if (!team) return;

    if (user.purchasedTeams.includes(id)) return; // قبلا خریده

    if (user.coins >= team.cost) {
        user.coins -= team.cost;
        user.profitPerHour += team.profit;
        user.purchasedTeams.push(id);
        saveData();
        
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
        
        // آپدیت همون لحظه لیست
        filterShop(team.cat);
        
        tg.showAlert(`ایول! تیم ${team.name} رو خریدی 🎉\nسود ساعتیت رفت بالا!`);
    } else {
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('error');
        tg.showAlert("پول کم داری رفیق! ❌\nباید بیشتر تپ بزنی!");
    }
}

function upgradeBoost(type) {
    // سیستم قیمت تصاعدی برای ارتقا
    let baseCost = 2000;
    
    // محاسبه قیمت بر اساس لول فعلی کاربر (ساده)
    let cost = baseCost * (type === 'multitap' ? user.tapLevel : (user.maxEnergy/500 - 1));
    if(cost < 2000) cost = 2000;

    if(user.coins >= cost) {
        user.coins -= cost;
        if(type === 'multitap') {
            user.tapLevel += 1;
            tg.showAlert(`قدرت ضربه شد: ${user.tapLevel} 💪`);
        }
        if(type === 'energy') {
            user.maxEnergy += 500;
            tg.showAlert(`انرژی مکس شد: ${user.maxEnergy} 🔋`);
        }
        saveData();
        updateUI();
    } else {
        tg.showAlert(`برای ارتقا ${formatNumber(cost)} سکه میخوای!`);
    }
}

function openTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const navItems = document.querySelectorAll('.nav-item');
    
    // مپ کردن ایندکس‌ها
    let idx = 0;
    if(tabName === 'shop') idx = 1;
    if(tabName === 'upgrade') idx = 2;
    if(tabName === 'friends') idx = 3;
    
    navItems[idx].classList.add('active');

    document.querySelectorAll('.full-screen-view').forEach(v => v.classList.add('hidden'));
    
    if (tabName === 'game') {
        document.getElementById('main-view').classList.remove('hidden');
    } else {
        const view = document.getElementById(tabName + '-view');
        view.classList.remove('hidden');
        // انیمیشن اسلاید
        view.style.animation = 'none';
        view.offsetHeight; /* trigger reflow */
        view.style.animation = 'slideUp 0.3s ease-out';
    }
    
    if (tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num).toString();
}

// جلوگیری از زوم و اسکرول اضافی در iOS
window.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, { passive: false });

// شروع بازی
initGame();
