// این قسمت رو توی script.js جایگزین تابع updateUI قبلی کن

function updateUI() {
    // 1. آپدیت اعداد
    document.getElementById('total-coins').innerText = Math.floor(user.coins).toLocaleString();
    document.getElementById('profit-per-hour').innerText = "+" + formatNumber(user.profitPerHour);
    document.getElementById('earn-per-tap').innerText = user.tapLevel;
    document.getElementById('current-energy').innerText = Math.floor(user.energy);
    
    // 2. محاسبه لول کاربر (بر اساس سکه)
    // پیدا کردن آخرین لیگی که امتیازش کمتر یا مساوی سکه کاربره
    let currentLeagueIndex = LEAGUES.length - 1; // پیش فرض: آخرین لول (خدا)
    
    for (let i = 0; i < LEAGUES.length; i++) {
        if (user.coins < LEAGUES[i].score) {
            currentLeagueIndex = i - 1;
            break;
        }
    }
    
    // هندل کردن حالت اول (تازه کار)
    if (currentLeagueIndex < 0) currentLeagueIndex = 0;

    const activeLeague = LEAGUES[currentLeagueIndex];
    const nextLeague = LEAGUES[currentLeagueIndex + 1];

    // 3. آپدیت متن لیگ
    document.getElementById('league-name').innerText = activeLeague.name;
    
    // 4. آپدیت عکس کاراکتر (فیکس باگ نمایش)
    const charImg = document.getElementById('main-character');
    const avatarImg = document.getElementById('avatar-img');
    
    // مطمئن میشیم که مسیر درسته. فرض میکنیم فایل ها اسمشون 1.png هست
    // اگر عکس قبلا ست شده دوباره ست نمیکنیم که پرش نداشته باشه
    if (!charImg.src.includes(activeLeague.img)) {
        charImg.src = activeLeague.img;
        avatarImg.src = activeLeague.img; // عکس پروفایل بالا هم عوض شه
    }

    // 5. هندل کردن خطای لود عکس (اگه عکس نبود چی بشه)
    charImg.onerror = function() {
        this.src = 'assets/1.png'; // اگر عکس لول بالا نبود، برگرد به لول 1
        console.log('عکس پیدا نشد، لود کردن پیش فرض');
    };

    // 6. نوار پیشرفت
    if (nextLeague) {
        document.getElementById('coins-to-levelup').innerText = formatNumber(nextLeague.score);
        // جلوگیری از اعداد منفی یا تقسیم بر صفر
        let range = nextLeague.score - activeLeague.score;
        let progress = user.coins - activeLeague.score;
        let pct = (progress / range) * 100;
        
        // محدود کردن بین 0 تا 100
        pct = Math.max(0, Math.min(100, pct));
        
        document.getElementById('level-progress-bar').style.width = pct + "%";
    } else {
        document.getElementById('coins-to-levelup').innerText = "MAX";
        document.getElementById('level-progress-bar').style.width = "100%";
    }
}
