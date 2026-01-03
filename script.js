const tg = window.Telegram.WebApp;
tg.expand();

// سطح بندی لیگ (عکس‌ها از assets/1.png تا assets/11.png)
const LEAGUES = [
    { name: "تازه کار", score: 0, img: "assets/1.png" },
    { name: "کار آموز", score: 5000, img: "assets/2.png" },
    { name: "آماتور", score: 25000, img: "assets/3.png" },
    { name: "حرفه ای", score: 100000, img: "assets/4.png" },
    { name: "با تجربه", score: 500000, img: "assets/5.png" },
    { name: "متخصص", score: 2000000, img: "assets/6.png" },
    { name: "ماهر", score: 10000000, img: "assets/7.png" },
    { name: "افسانه ای", score: 50000000, img: "assets/8.png" },
    { name: "ابر قدرت", score: 100000000, img: "assets/9.png" },
    { name: "پادشاه", score: 500000000, img: "assets/10.png" },
    { name: "خدا", score: 1000000000, img: "assets/11.png" }
];

// لیست کامل تیم‌ها با دسته‌بندی
const TEAMS_DB = [
    // --- لیگ برتر انگلیس (cat: eng) ---
    { id: 'eng1', cat: 'eng', name: 'آرسنال', img: 'arsenal.png', cost: 10000, profit: 800 },
    { id: 'eng2', cat: 'eng', name: 'منچستر سیتی', img: 'man_city.png', cost: 12000, profit: 900 },
    { id: 'eng3', cat: 'eng', name: 'استون ویلا', img: 'aston_villa.png', cost: 8000, profit: 600 },
    { id: 'eng4', cat: 'eng', name: 'لیورپول', img: 'liverpool.png', cost: 11000, profit: 850 },
    { id: 'eng5', cat: 'eng', name: 'چلسی', img: 'chelsea.png', cost: 10500, profit: 820 },
    { id: 'eng6', cat: 'eng', name: 'منچستر یونایتد', img: 'man_utd.png', cost: 10500, profit: 820 },
    { id: 'eng7', cat: 'eng', name: 'ساندرلند', img: 'sunderland.png', cost: 5000, profit: 300 },
    { id: 'eng8', cat: 'eng', name: 'اورتون', img: 'everton.png', cost: 6000, profit: 400 },
    { id: 'eng9', cat: 'eng', name: 'برنتفورد', img: 'brentford.png', cost: 5500, profit: 350 },
    { id: 'eng10', cat: 'eng', name: 'کریستال پالاس', img: 'crystal_palace.png', cost: 5500, profit: 350 },
    { id: 'eng11', cat: 'eng', name: 'فولام', img: 'fulham.png', cost: 5000, profit: 300 },
    { id: 'eng12', cat: 'eng', name: 'تاتنهام', img: 'tottenham.png', cost: 9000, profit: 700 },
    { id: 'eng13', cat: 'eng', name: 'نیوکاسل', img: 'newcastle.png', cost: 8500, profit: 650 },
    { id: 'eng14', cat: 'eng', name: 'برایتون', img: 'brighton.png', cost: 6000, profit: 400 },
    { id: 'eng15', cat: 'eng', name: 'بورنموث', img: 'bournemouth.png', cost: 4500, profit: 250 },
    { id: 'eng16', cat: 'eng', name: 'لیدز یونایتد', img: 'leeds.png', cost: 5000, profit: 300 },
    { id: 'eng17', cat: 'eng', name: 'ناتینگهام فارست', img: 'nottingham.png', cost: 4500, profit: 250 },
    { id: 'eng18', cat: 'eng', name: 'وستهام', img: 'westham.png', cost: 6500, profit: 450 },
    { id: 'eng19', cat: 'eng', name: 'برنلی', img: 'burnley.png', cost: 4000, profit: 200 },
    { id: 'eng20', cat: 'eng', name: 'ولورهمپتون', img: 'wolves.png', cost: 5000, profit: 300 },

    // --- لالیگا اسپانیا (cat: spa) ---
    { id: 'spa1', cat: 'spa', name: 'رئال مادرید', img: 'real_madrid.png', cost: 15000, profit: 1100 },
    { id: 'spa2', cat: 'spa', name: 'بارسلونا', img: 'barcelona.png', cost: 14000, profit: 1050 },
    { id: 'spa3', cat: 'spa', name: 'اتلتیکو مادرید', img: 'atletico.png', cost: 10000, profit: 750 },
    { id: 'spa4', cat: 'spa', name: 'سویا', img: 'sevilla.png', cost: 7000, profit: 500 },
    { id: 'spa5', cat: 'spa', name: 'رئال سوسیداد', img: 'sociedad.png', cost: 6500, profit: 450 },
    { id: 'spa6', cat: 'spa', name: 'ویارئال', img: 'villarreal.png', cost: 6000, profit: 400 },
    { id: 'spa7', cat: 'spa', name: 'رئال بتیس', img: 'betis.png', cost: 6000, profit: 400 },
    { id: 'spa8', cat: 'spa', name: 'والنسیا', img: 'valencia.png', cost: 6500, profit: 450 },
    { id: 'spa9', cat: 'spa', name: 'سلتا ویگو', img: 'celta.png', cost: 5000, profit: 300 },
    { id: 'spa10', cat: 'spa', name: 'اتلتیک بیلبائو', img: 'bilbao.png', cost: 6500, profit: 450 },
    { id: 'spa11', cat: 'spa', name: 'مایورکا', img: 'mallorca.png', cost: 4000, profit: 250 },
    { id: 'spa12', cat: 'spa', name: 'اسپانیول', img: 'espanyol.png', cost: 4500, profit: 280 },
    { id: 'spa13', cat: 'spa', name: 'کادیس', img: 'cadiz.png', cost: 3500, profit: 200 },
    { id: 'spa14', cat: 'spa', name: 'اوساسونا', img: 'osasuna.png', cost: 4500, profit: 280 },
    { id: 'spa15', cat: 'spa', name: 'گرانادا', img: 'granada.png', cost: 4000, profit: 250 },
    { id: 'spa16', cat: 'spa', name: 'آلاوس', img: 'alaves.png', cost: 3500, profit: 200 },

    // --- لیگ خلیج فارس (cat: irn) ---
    { id: 'irn1', cat: 'irn', name: 'سپاهان', img: 'sepahan.png', cost: 3000, profit: 250 },
    { id: 'irn2', cat: 'irn', name: 'پرسپولیس', img: 'persepolis.png', cost: 3000, profit: 250 },
    { id: 'irn3', cat: 'irn', name: 'استقلال', img: 'esteghlal.png', cost: 3000, profit: 250 },
    { id: 'irn4', cat: 'irn', name: 'چادرملو اردکان', img: 'chadormalu.png', cost: 1000, profit: 80 },
    { id: 'irn5', cat: 'irn', name: 'تراکتور', img: 'tractor.png', cost: 2800, profit: 220 },
    { id: 'irn6', cat: 'irn', name: 'گل‌گهر', img: 'golgohar.png', cost: 2000, profit: 150 },
    { id: 'irn7', cat: 'irn', name: 'ملوان', img: 'malavan.png', cost: 1800, profit: 140 },
    { id: 'irn8', cat: 'irn', name: 'خیبر خرم‌آباد', img: 'kheibar.png', cost: 1200, profit: 90 },
    { id: 'irn9', cat: 'irn', name: 'فجر سپاسی', img: 'fajr.png', cost: 1200, profit: 90 },
    { id: 'irn10', cat: 'irn', name: 'فولاد', img: 'foolad.png', cost: 2200, profit: 180 },
    { id: 'irn11', cat: 'irn', name: 'استقلال خوزستان', img: 'est_khz.png', cost: 1500, profit: 110 },
    { id: 'irn12', cat: 'irn', name: 'پیکان', img: 'paykan.png', cost: 1000, profit: 80 },
    { id: 'irn13', cat: 'irn', name: 'آلومینیوم', img: 'aluminium.png', cost: 1600, profit: 120 },
    { id: 'irn14', cat: 'irn', name: 'ذوب‌آهن', img: 'zobahan.png', cost: 1800, profit: 140 },
    { id: 'irn15', cat: 'irn', name: 'شمس‌آذر', img: 'shamsazar.png', cost: 1100, profit: 85 },
    { id: 'irn16', cat: 'irn', name: 'مس رفسنجان', img: 'mes_raf.png', cost: 1500, profit: 110 },

    // --- نخبگان آسیا (cat: asia) ---
    { id: 'asia1', cat: 'asia', name: 'الهلال', img: 'alhilal.png', cost: 8000, profit: 600 },
    { id: 'asia2', cat: 'asia', name: 'الاهلی', img: 'alahli.png', cost: 7000, profit: 500 },
    { id: 'asia3', cat: 'asia', name: 'الاتحاد', img: 'ittihad.png', cost: 7000, profit: 500 },
    { id: 'asia4', cat: 'asia', name: 'السد', img: 'alsadd.png', cost: 5000, profit: 350 },
    { id: 'asia5', cat: 'asia', name: 'الشارجه', img: 'sharjah.png', cost: 4000, profit: 280 },
    { id: 'asia6', cat: 'asia', name: 'ویسل کوبه', img: 'vissel.png', cost: 4500, profit: 300 },
    { id: 'asia7', cat: 'asia', name: 'شانگهای پورت', img: 'shanghai.png', cost: 4000, profit: 280 },

    // --- فیفا 2026 (cat: fifa) ---
    { id: 'fifa1', cat: 'fifa', name: 'آرژانتین', img: 'arg.png', cost: 50000, profit: 3000 },
    { id: 'fifa2', cat: 'fifa', name: 'برزیل', img: 'bra.png', cost: 48000, profit: 2900 },
    { id: 'fifa3', cat: 'fifa', name: 'فرانسه', img: 'fra.png', cost: 48000, profit: 2900 },
    { id: 'fifa4', cat: 'fifa', name: 'انگلیس', img: 'eng_nat.png', cost: 45000, profit: 2700 },
    { id: 'fifa5', cat: 'fifa', name: 'آلمان', img: 'ger.png', cost: 45000, profit: 2700 },
    { id: 'fifa6', cat: 'fifa', name: 'ایران', img: 'iran.png', cost: 15000, profit: 1000 },
    { id: 'fifa7', cat: 'fifa', name: 'آمریکا', img: 'usa.png', cost: 20000, profit: 1200 },
    { id: 'fifa8', cat: 'fifa', name: 'پرتغال', img: 'por.png', cost: 40000, profit: 2500 }
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
    const saved = localStorage.getItem('football_kombat_save');
    if (saved) user = JSON.parse(saved);

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        user.username = tg.initDataUnsafe.user.first_name;
    }
    document.getElementById('username').innerText = user.username;

    // شروع لوپ‌ها
    setInterval(saveData, 5000);
    setInterval(gameLoop, 1000); // بازیابی انرژی و سود
    
    updateUI();
    filterShop('eng'); // پیش‌فرض تب انگلیس باز باشه
}

function updateUI() {
    // اعداد
    document.getElementById('total-coins').innerText = Math.floor(user.coins).toLocaleString();
    document.getElementById('profit-per-hour').innerText = "+" + formatNumber(user.profitPerHour);
    document.getElementById('earn-per-tap').innerText = user.tapLevel;
    document.getElementById('current-energy').innerText = Math.floor(user.energy);
    
    // لیگ و عکس کاراکتر
    let leagueIdx = LEAGUES.findIndex(l => user.coins < l.score) - 1;
    if (leagueIdx < 0) leagueIdx = LEAGUES.length - 1; 
    if (user.coins < LEAGUES[0].score) leagueIdx = -1;
    
    let activeLeague = LEAGUES[Math.max(0, leagueIdx)];
    let nextLeague = LEAGUES[leagueIdx + 1];

    document.getElementById('league-name').innerText = activeLeague.name;
    
    // فقط اگه عکس تغییر کرد عوض کن
    const charImg = document.getElementById('main-character');
    if (!charImg.src.includes(activeLeague.img)) charImg.src = activeLeague.img;

    // پروگرس بار
    if (nextLeague) {
        document.getElementById('coins-to-levelup').innerText = formatNumber(nextLeague.score);
        let pct = (user.coins / nextLeague.score) * 100;
        document.getElementById('level-progress-bar').style.width = pct + "%";
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
        
        // افکت متن
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
    // انرژی
    if (user.energy < user.maxEnergy) user.energy += (user.maxEnergy / 300);
    // سود ساعتی
    if (user.profitPerHour > 0) user.coins += (user.profitPerHour / 3600);
    updateUI();
}

function saveData() {
    localStorage.setItem('football_kombat_save', JSON.stringify(user));
}

// مدیریت فروشگاه
function filterShop(category) {
    // فعال کردن تب
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active'); // دکمه کلیک شده

    const container = document.getElementById('team-cards-container');
    container.innerHTML = '';

    const filtered = TEAMS_DB.filter(t => t.cat === category);
    
    filtered.forEach(team => {
        const isOwned = user.purchasedTeams.includes(team.id);
        const div = document.createElement('div');
        div.className = 'team-card';
        // مسیر عکس: assets/teams/name.png (اگر نبود آیکون پیش‌فرض)
        div.innerHTML = `
            <img src="assets/teams/${team.img}" class="team-logo" onerror="this.src='assets/coin.png'">
            <h4>${team.name}</h4>
            <p style="font-size:10px; color:#aaa">سود: +${team.profit}</p>
            ${isOwned ? 
                `<button class="buy-btn" disabled>خریداری شد ✅</button>` : 
                `<button class="buy-btn" onclick="buyTeam('${team.id}')">${formatNumber(team.cost)} سکه</button>`
            }
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
        // رفرش کردن تب فعلی برای غیرفعال کردن دکمه
        document.querySelector('.cat-btn.active').click();
        alert(`تیم ${team.name} خریداری شد! 🎉`);
    } else {
        alert("سکه کافی نداری! ❌");
    }
}

// مدیریت تب‌های پایین
function openTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // مخفی کردن همه ویوها
    document.querySelectorAll('.full-screen-view').forEach(v => v.classList.add('hidden'));
    document.getElementById('main-view').classList.add('hidden');

    if (tabName === 'game') {
        document.getElementById('main-view').classList.remove('hidden');
    } else if (tabName === 'shop') {
        document.getElementById('shop-view').classList.remove('hidden');
    } else if (tabName === 'upgrade') {
        document.getElementById('upgrade-view').classList.remove('hidden');
    } else if (tabName === 'friends') {
        document.getElementById('friends-view').classList.remove('hidden');
    }
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}

// استارت
initGame();
