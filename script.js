// داده‌های اولیه کاربر
let user = {
    coins: 0,
    profitPerHour: 0,
    energy: 500,
    maxEnergy: 500,
    leagueLevel: 1, // 1 تا 11
    socialTasks: { youtube: 0, like: 0 } // 0: انجام نشده, 1: انجام شده
};

// لیست لیگ‌ها (نام‌ها و حد نصاب سکه)
const LEAGUES = [
    { name: "تازه کار", min: 0 },
    { name: "کار آموز", min: 5000 },
    { name: "آماتور", min: 25000 },
    { name: "حرفه ای", min: 100000 },
    { name: "با تجربه", min: 1000000 },
    { name: "متخصص", min: 2000000 },
    { name: "ماهر", min: 10000000 },
    { name: "افسانه ای", min: 50000000 },
    { name: "ابر قدرت", min: 100000000 },
    { name: "پادشاه", min: 500000000 },
    { name: "خدا", min: 1000000000 }
];

// دیتابیس تیم‌ها (نمونه)
const TEAMS = [
    // لیگ خلیج فارس (ارزون)
    { id: 't1', name: 'تیم ته جدولی', league: 'pgpl', price: 500, profit: 50, level: 0 },
    { id: 't2', name: 'تیم میان جدولی', league: 'pgpl', price: 1500, profit: 160, level: 0 },
    // لالیگا (گرون)
    { id: 't3', name: 'رئال مادرید', league: 'laliga', price: 50000, profit: 4000, level: 0 },
    { id: 't4', name: 'بارسلونا', league: 'laliga', price: 50000, profit: 4000, level: 0 }
];

// --- سیستم انرژی ---
// هر ثانیه چقدر پر بشه؟ (ظرفیت تقسیم بر 300 ثانیه = 5 دقیقه)
function getEnergyRecoveryRate() {
    return user.maxEnergy / 300;
}

// حلقه بازی (هر ثانیه اجرا میشه)
setInterval(() => {
    // 1. پر کردن انرژی
    if (user.energy < user.maxEnergy) {
        user.energy += getEnergyRecoveryRate();
        if (user.energy > user.maxEnergy) user.energy = user.maxEnergy;
        updateUI();
    }

    // 2. اضافه کردن سود ساعتی (تقسیم بر 3600 ثانیه)
    if (user.profitPerHour > 0) {
        user.coins += user.profitPerHour / 3600;
        updateUI();
    }
}, 1000);

// --- توابع کلیک و بازی ---

function tapClick(event) {
    if (user.energy >= 1) {
        user.coins += 1; // مقدار تپ (قابل ارتقا)
        user.energy -= 1;
        
        // نمایش عدد +1 روی صفحه (افکت)
        showFloatingText(event.clientX, event.clientY, "+1");
        
        checkLeagueUpgrade();
        updateUI();
    }
}

function checkLeagueUpgrade() {
    // پیدا کردن لیگ فعلی بر اساس سکه
    for (let i = LEAGUES.length - 1; i >= 0; i--) {
        if (user.coins >= LEAGUES[i].min) {
            if (user.leagueLevel !== i + 1) {
                user.leagueLevel = i + 1;
                // تغییر عکس لیگ
                document.getElementById('main-character').src = `assets/leagues/${user.leagueLevel}.png`;
                document.getElementById('league-name').innerText = LEAGUES[i].name;
            }
            break;
        }
    }
}

function updateUI() {
    // آپدیت متن‌ها
    document.getElementById('total-coins').innerText = Math.floor(user.coins).toLocaleString();
    document.getElementById('profit-per-hour').innerText = "+" + user.profitPerHour.toLocaleString();
    
    // آپدیت نوار انرژی
    document.getElementById('current-energy').innerText = Math.floor(user.energy);
    document.getElementById('max-energy').innerText = user.maxEnergy;
    let percentage = (user.energy / user.maxEnergy) * 100;
    document.getElementById('energy-fill').style.width = percentage + "%";
}

// --- بخش خرید تیم‌ها ---
function filterTeams(category) {
    // فعلاً ساده: نمایش همه یا فیلتر (اینجا باید کد رندر کارت‌ها باشه)
    renderTeams(category);
}

function renderTeams(filterLeague) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ""; // پاک کردن قبلی‌ها

    TEAMS.forEach(team => {
        if (team.league === filterLeague || filterLeague === 'all') {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `
                <h4>${team.name}</h4>
                <p class="gold-text">سود: +${team.profit}</p>
                <p>لول: ${team.level}</p>
                <button class="action-btn" onclick="buyTeam('${team.id}')">
                    💰 ${team.price.toLocaleString()}
                </button>
            `;
            container.appendChild(card);
        }
    });
}

function buyTeam(teamId) {
    let team = TEAMS.find(t => t.id === teamId);
    if (user.coins >= team.price) {
        user.coins -= team.price;
        user.profitPerHour += team.profit;
        
        // فرمول افزایش قیمت: قیمت قبلی * 1.5
        team.price = Math.floor(team.price * 1.5);
        team.level += 1;
        
        updateUI();
        renderTeams(team.league); // رفرش کارت
    } else {
        alert("سکه کافی نداری رفیق! 😐");
    }
}

// --- سوشال مدیا ---
function doSocialTask(type) {
    if (user.socialTasks[type] < 2) { // ماکسیمم 2 بار
        // اینجا باید لینک یوتیوب باز بشه
        user.coins += 1500;
        user.socialTasks[type] += 1;
        alert("ایول! 1500 سکه گرفتی 🎉");
        updateUI();
    } else {
        alert("دیگه نمیشه! سهمیه‌ت تموم شد. 🚫");
    }
}

// --- نویگیشن ---
function switchTab(tabId, element) {
    // مخفی کردن همه تب‌ها
    document.querySelectorAll('.content-section').forEach(el => el.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
    
    // اکتیو کردن دکمه پایین
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    // اگر تب تیم‌ها باز شد، لیست رو بساز
    if(tabId === 'tab-teams') renderTeams('pgpl');
}

// افکت کلیک (متن شناور)
function showFloatingText(x, y, text) {
    let el = document.createElement('div');
    el.innerText = text;
    el.style.position = 'absolute';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.color = 'white';
    el.style.fontWeight = 'bold';
    el.style.pointerEvents = 'none';
    el.style.animation = 'floatUp 1s ease-out forwards';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
}

// استایل انیمیشن توی فایل JS تزریق میشه (یا توی CSS بذار)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes floatUp {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(-50px); opacity: 0; }
}
`;
document.head.appendChild(styleSheet);

// شروع بازی
updateUI();
checkLeagueUpgrade(); // ست کردن عکس اولیه