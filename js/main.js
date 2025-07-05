document.addEventListener('DOMContentLoaded', () => {
    console.log('main.js loaded and DOMContentLoaded fired'); // 追加
    // 試験テスト用: 誕生日までの残り日数を設定
    // 例: 今日から10日後を誕生日に設定する場合
    const testDaysUntilBirthday = 10; // ここを変更してテストしたい日数を設定
    const birthday = new Date();
    birthday.setDate(birthday.getDate() + testDaysUntilBirthday);
    birthday.setHours(0, 0, 0, 0); // 日付のみを比較するため、時刻をリセット
    // 本番環境に戻す場合は、上記の3行をコメントアウトし、以下の行を有効にしてください
    // const birthday = new Date('2024-10-19T00:00:00');
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