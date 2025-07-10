document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded and DOMContentLoaded fired');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let birthday = new Date(today.getFullYear(), 6, 18); //月は0から始まるため、7月は6

    // 今年の誕生日がすでに過ぎていたら、来年の誕生日に設定
    if (today.getTime() > birthday.getTime()) {
        birthday.setFullYear(birthday.getFullYear() + 1);
    }

    const timeDiff = birthday.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const mainTitleElement = document.getElementById('main-title');
    if (mainTitleElement) {
        if (daysLeft <= 0) {
            mainTitleElement.textContent = 'Happy Birthday!';
        } else {
            mainTitleElement.textContent = 'Happy Event';
        }
    }

    const daysElement = document.getElementById('days');
    if (daysElement) {
        daysElement.textContent = daysLeft > 0 ? daysLeft : 0;
    }

    // ガチャ回数のリセット処理
    const lastVisit = localStorage.getItem('lastVisit');
    const todayStr = today.toDateString(); // YYYY-MM-DD形式

    if (lastVisit !== todayStr) {
        localStorage.setItem('gachaCount', 3);
        localStorage.setItem('lastVisit', todayStr);
    }


    const gachaButton = document.getElementById('gacha-button');
    if (gachaButton) {
        gachaButton.addEventListener('click', () => {
            window.location.href = 'gacha.html';
        });
    }

    // 現在の日付を表示
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = new Date().toLocaleDateString('ja-JP', options);
    }
});