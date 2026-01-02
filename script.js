// دسترسی به API تلگرام
const tg = window.Telegram.WebApp;
tg.expand(); // تمام صفحه کردن ربات

// تنظیمات اولیه بازی
const LEAGUES = [
    { name: "تازه کار", score: 0, img: "assets/1.png" },
    { name: "کار آموز", score: 5000, img: "assets/2.png" },
    { name: "آماتور", score: 25000, img: "assets/3.png" },
    { name: "حرفه ای", score: 100000, img: "assets/4.png" },
    { name: "با تجربه", score: 1000000, img: "assets/5.png" },
    { name: "متخصص", score: 2000000, img: "assets/6.png" },
    { name: "ماهر", score: 10000000, img: "assets/7.png" },
    { name: "افسانه ای", score: 50000000, img: "assets/8.png" },
    { name: "ابر قدرت", score: 100000000, img: "assets/9.png" },
    { name: "پادشاه", score: 500000000, img: "assets/10.png" },
    { name: "خدا", score: 1000000000, img: "assets/11.png" }
];

// دیتای پیش‌فرض کاربر (رفیق جان، این ساختار اصلیه)
let defaultUser = {
    username: "Guest",
    coins: 0,
    energy: 1000,
    maxEnergy: 1000,
    profitPerHour: 0,
    lastLogin: Date.now(),
    tapLevel: 1,
    purchasedCards: [] 
};

let user = { ...defaultUser };

// تیم‌هایی که میشه خرید (نمونه)
const TEAMS = [
    { id: 't1', name: 'تیم محلی', cost: 500, profit: 50 },
    { id: 't2', name: 'استقلال', cost: 2000, profit: 250 },
    { id: 't3', name: 'پرسپولیس', cost: 2000, profit: 250 },
    { id: 't4', name: 'بارسلونا', cost: 50000, profit: 4000 },
    { id: 't5', name: 'رئال مادرید', cost: 55000, profit: 4200 }
];

// --- 1. شروع بازی و لود کردن اطلاعات ---
function initGame() {
    // تلاش برای لود کردن از حافظه
    const savedData = localStorage.getItem('fk_user_data');
    if (savedData) {
        user = JSON.parse(savedData);
        // محاسبه سود آفلاین (زمانی که نبودی)
        const now = Date.now();
        const secondsPassed = (now - user.lastLogin) / 1000;
        
        // پر کردن انرژی آفلاین
        user.energy += Math.min(secondsPassed, user.maxEnergy - user.energy);
        
        // محاسبه سکه آفلاین (حداکثر 3 ساعت)
        const profitSeconds = Math.min(secondsPassed, 3 * 3600);
        if (user.profitPerHour > 0) {
            const earned = (user.profitPerHour / 3600) * profitSeconds;
            if (earned > 1) {
                alert(`رفیق! وقتی نبودی ${Math.floor(earned)} سکه جمع شد! 💰`);
                user.coins += earned;
            }
        }
    }

    // گرفتن نام واقعی از تلگرام
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        user.username = tg.initDataUnsafe.user.first_name;
    }
    document.getElementById('username').innerText = user.username;

    // رندر اولیه
    updateUI();
    renderShop();
    
    // لوپ اصلی بازی (هر ثانیه)
    setInterval(gameLoop, 1000);
    // ذخیره خودکار (هر 5 ثانیه)
    setInterval(saveData, 5000);
}

// --- 2. آپدیت ظاهر (UI) ---
function updateUI() {
    // نمایش سکه
    document.getElementById('total-coins').innerText = Math.floor(user.coins).toLocaleString();
    document.getElementById('profit-per-hour').innerText = "+" + formatNumber(user.profitPerHour);
    document.getElementById('earn-per-tap').innerText = user.tapLevel;
    
    // انرژی
    document.getElementById('current-energy').innerText = Math.floor(user.energy);
    document.getElementById('max-energy').innerText = user.maxEnergy;
    
    // پیدا کردن لیگ فعلی
    let currentLeagueIndex = LEAGUES.findIndex(l => user.coins < l.score) - 1;
    if (currentLeagueIndex < 0) currentLeagueIndex = LEAGUES.length - 1; // برای حالت خدا
    if (user.coins < LEAGUES[0].score) currentLeagueIndex = -1; // هندل کردن زیر صفر (باگ احتمالی)

    let activeLeague = LEAGUES[Math.max(0, currentLeagueIndex)];
    let nextLeague = LEAGUES[currentLeagueIndex + 1];

    // آپدیت عکس و اسم لیگ
    document.getElementById('league-name').innerText = activeLeague.name;
    document.getElementById('league-level').innerText = `Level ${currentLeagueIndex + 1}/${LEAGUES.length}`;
    
    // فقط اگه عکس تغییر کرده عوضش کن (جلوگیری از پرش تصویر)
    const charImg = document.getElementById('main-character');
    if (!charImg.src.includes(activeLeague.img)) {
        charImg.src = activeLeague.img;
    }

    // نوار پیشرفت
    if (nextLeague) {
        document.getElementById('coins-to-levelup').innerText = formatNumber(nextLeague.score);
        let progress = (user.coins / nextLeague.score) * 100;
        document.getElementById('level-progress-bar').style.width = `${progress}%`;
    } else {
        document.getElementById('coins-to-levelup').innerText = "MAX";
        document.getElementById('level-progress-bar').style.width = "100%";
    }
}

// --- 3. کلیک کردن (Tapping) ---
function handleTap(event) {
    if (user.energy >= user.tapLevel) {
        // کم کردن انرژی و زیاد کردن سکه
        user.energy -= user.tapLevel;
        user.coins += user.tapLevel;
        
        // ویبره گوشی (فقط در تلگرام موبایل کار میکنه)
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('medium');
        }

        // افکت متن شناور (+1)
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left; 
        const y = event.clientY - rect.top;
        
        const floatingText = document.createElement('div');
        floatingText.className = 'floating-text';
        floatingText.innerText = '+' + user.tapLevel;
        floatingText.style.left = x + 'px';
        floatingText.style.top = y + 'px';
        event.currentTarget.appendChild(floatingText);
        
        setTimeout(() => floatingText.remove(), 1000);

        updateUI();
    }
}

// --- 4. لوپ بازی (انرژی و سود) ---
function gameLoop() {
    // پر شدن انرژی (کل ظرفیت در 300 ثانیه = 5 دقیقه)
    const recoveryRate = user.maxEnergy / 300;
    if (user.energy < user.maxEnergy) {
        user.energy += recoveryRate;
    }
    
    // اضافه شدن سود ساعتی (هر ثانیه یک 3600ام)
    if (user.profitPerHour > 0) {
        user.coins += user.profitPerHour / 3600;
    }
    
    user.lastLogin = Date.now();
    updateUI();
}

// --- 5. ذخیره سازی ---
function saveData() {
    localStorage.setItem('fk_user_data', JSON.stringify(user));
}

// --- 6. فروشگاه (بخش Mine) ---
function renderShop() {
    const container = document.getElementById('team-cards-container');
    container.innerHTML = '';
    
    TEAMS.forEach(team => {
        // محاسبه قیمت بر اساس تعداد خرید (فرمول نمایی)
        // اینجا فعلا ساده میذارم
        const div = document.createElement('div');
        div.className = 'team-card';
        div.innerHTML = `
            <h3>${team.name}</h3>
            <p style="color: #888; font-size: 12px;">سود: +${team.profit}</p>
            <div style="display:flex; align-items:center; justify-content:center; gap:5px; margin-top:5px;">
                <img src="assets/coin.png" style="width:15px;">
                <b>${formatNumber(team.cost)}</b>
            </div>
            <button class="buy-btn" onclick="buyTeam('${team.id}')">خرید</button>
        `;
        container.appendChild(div);
    });
}

function buyTeam(id) {
    const team = TEAMS.find(t => t.id === id);
    if (user.coins >= team.cost) {
        user.coins -= team.cost;
        user.profitPerHour += team.profit;
        
        alert(`تیم ${team.name} خریداری شد! سودت رفت بالا 🚀`);
        saveData();
        updateUI();
    } else {
        alert("پول نداری رفیق! 😐");
    }
}

// --- ابزار کمکی: فرمت اعداد (مثلا 1000 میشه 1K) ---
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num);
}

// مدیریت تب‌ها
function openTab(tabName) {
    // فعال کردن دکمه پایین
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (tabName === 'mine') {
        document.getElementById('mine-modal').classList.remove('hidden');
    } else if (tabName === 'game') {
        // برگشت به صفحه اصلی
    } else {
        alert("این بخش به زودی اضافه میشه رفیق! 🚧");
    }
}

function closeModal(id) {
    document.getElementById(id + '-modal').classList.add('hidden');
}

// اجرا
initGame();