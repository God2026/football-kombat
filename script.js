// script.js
// شبیه‌سازی صدا و لرزش هنگام کلیک روی دکمه‌های ارتقا
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.upgrade-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // انیمیشن فعال‌سازی دکمه
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 100);

      // لرزش تلفن (در صورت پشتیبانی)
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      // صدای کلیک (در صورت نیاز، با بارگذاری فایل صوتی)
      // let clickSound = new Audio('click.mp3');
      // clickSound.play();

      // HapticFeedback تلگرام (در صورتی که WebApp فعال باشد)
      if (window.Telegram && Telegram.WebApp && Telegram.WebApp.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.impactOccurred("light");
      }
    });
  });
});
