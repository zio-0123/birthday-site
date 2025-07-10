document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded and DOMContentLoaded fired');

    const birthday = new Date('2024-07-18T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 時刻をリセットして日付のみで比較

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