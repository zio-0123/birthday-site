document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded and DOMContentLoaded fired'); // 追加
    const birthday = new Date('2024-10-19T00:00:00');
    const today = new Date();
    const timeDiff = birthday.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const daysElement = document.getElementById('days');
    if (daysElement) {
        daysElement.textContent = daysLeft > 0 ? daysLeft : 0;
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
        currentDateElement.textContent = today.toLocaleDateString('ja-JP', options);
    }
});