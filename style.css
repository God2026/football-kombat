* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Tahoma', sans-serif; user-select: none; }
body { background-color: #000; color: white; overflow: hidden; }
.app-container {
    background: radial-gradient(circle at center, #10243e 0%, #000 100%);
    height: 100vh; padding: 15px; display: flex; flex-direction: column; overflow-y: auto;
}
.hidden { display: none !important; }
.full-screen-view {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: #1c1f24; padding: 20px; overflow-y: auto; z-index: 50;
    padding-bottom: 100px;
}
/* هدر و آمار */
.top-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.user-info { display: flex; align-items: center; background: #272a2f; padding: 5px 10px; border-radius: 12px; }
.avatar-box img { width: 30px; height: 30px; border-radius: 8px; }
.user-details { margin-right: 10px; font-size: 14px; font-weight: bold; }
.league-badge { background: #d4af37; color: #000; padding: 5px 10px; border-radius: 8px; font-size: 12px; font-weight: bold;}

.stats-row { display: flex; gap: 10px; margin-bottom: 20px; }
.stat-box { background: #272a2f; flex: 1; padding: 10px; border-radius: 12px; text-align: center; display: flex; flex-direction: column; align-items: center; }
.stat-box .label { font-size: 10px; color: #8b8e93; }
.stat-box .value { font-size: 12px; font-weight: bold; display: flex; align-items: center; gap: 3px; margin-top: 5px;}
.tiny-coin { width: 12px; height: 12px; }
.warning-color { color: #f3ba2f; } .highlight-color { color: #5b97f7; }

.main-balance { display: flex; justify-content: center; align-items: center; gap: 10px; margin-bottom: 10px; }
.main-coin-icon { width: 40px; height: 40px; }
#total-coins { font-size: 32px; font-weight: bold; }

.progress-container { background: #2f3339; height: 8px; border-radius: 10px; margin-bottom: 20px; overflow: hidden; }
.progress-bar { background: #5b97f7; height: 100%; transition: width 0.3s; }

/* کاراکتر اصلی */
.tap-area { flex-grow: 1; display: flex; justify-content: center; align-items: center; position: relative; cursor: pointer; }
.circle-bg { position: absolute; width: 260px; height: 260px; background: radial-gradient(rgba(91,151,247,0.3), transparent 70%); border-radius: 50%; }
#main-character { width: 280px; z-index: 2; transition: transform 0.1s; }
#main-character:active { transform: scale(0.95); }

/* نویگیشن */
.bottom-nav { position: fixed; bottom: 10px; left: 50%; transform: translateX(-50%); width: 95%; background: #272a2f; border-radius: 15px; display: flex; justify-content: space-around; padding: 10px 0; z-index: 100; box-shadow: 0 5px 20px rgba(0,0,0,0.5); }
.nav-item { display: flex; flex-direction: column; align-items: center; color: #6e7279; font-size: 11px; cursor: pointer; }
.nav-item.active { color: white; }
.nav-item .icon { font-size: 20px; margin-bottom: 4px; }

/* استایل فروشگاه */
.category-tabs { display: flex; gap: 5px; overflow-x: auto; margin-bottom: 15px; padding-bottom: 5px; }
.cat-btn { background: #2b2e38; color: #fff; border: 1px solid #444; padding: 8px 12px; border-radius: 8px; white-space: nowrap; cursor: pointer; }
.cat-btn.active { background: #5b97f7; border-color: #5b97f7; }
.cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.team-card { background: #2b2e38; padding: 10px; border-radius: 10px; text-align: center; border: 1px solid #3d4252; display: flex; flex-direction: column; align-items: center; }
.team-logo { width: 50px; height: 50px; object-fit: contain; margin-bottom: 5px; border-radius: 50%; background: #1c1f24; padding: 2px;}
.buy-btn { background: #007aff; color: white; border: none; padding: 8px; width: 100%; border-radius: 8px; margin-top: auto; font-size: 12px; }
.buy-btn:disabled { background: #555; cursor: not-allowed; }
.floating-text { position: absolute; color: white; font-weight: bold; font-size: 24px; animation: floatUp 1s ease-out forwards; pointer-events: none; z-index: 10; }
@keyframes floatUp { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-80px); opacity: 0; } }
