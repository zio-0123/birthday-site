document.addEventListener('DOMContentLoaded', () => {
    // --- 設定ここから ---
    const birthday = '2024-10-19';
    const normalItems = [
        'haburashi', 'gameki', 'kasa', 'nuigurumi', 'koppu', 't_shirt', 
        'zubon', 'boushi', 'okikagami', 'dryer', 'cd', 'dvd', 'kuchibeni', 
        'cola', 'snack_kashi'
    ];
    const specialItems = ['hairbrush', 'sneaker', 'ude_dokei'];
    const imageFileExtension = '.jpg';
    // --- 設定ここまで ---

    // アイテム名の日本語マッピング
    const itemNamesMap = {
        'haburashi': '歯ブラシ',
        'gameki': 'ゲーム機',
        'kasa': '傘',
        'nuigurumi': 'ぬいぐるみ',
        'koppu': 'コップ',
        't_shirt': 'Tシャツ',
        'zubon': 'ズボン',
        'boushi': '帽子',
        'okikagami': '置き鏡',
        'dryer': 'ドライヤー',
        'cd': 'CD',
        'dvd': 'DVD',
        'kuchibeni': '口紅',
        'cola': 'コーラ',
        'snack_kashi': 'スナック菓子',
        'hairbrush': 'ヘアブラシ',
        'sneaker': 'スニーカー',
        'ude_dokei': '腕時計'
    };

    const allItems = [...normalItems, ...specialItems];
    const gachaState = JSON.parse(localStorage.getItem('gachaState_' + birthday)) || { collectedItems: [] };
    const collectionGrid = document.getElementById('collection-grid');
    const collectionStatus = document.getElementById('collection-status');
    const progressBar = document.getElementById('progress-bar');

    let collectedCount = 0;

    allItems.forEach(item => {
        const isCollected = gachaState.collectedItems.includes(item);
        const itemElement = document.createElement('div');
        itemElement.classList.add('collection-item');
        if (isCollected) {
            itemElement.classList.add('collected');
            collectedCount++;
        }

        const imagePath = `img/${item}${imageFileExtension}`;

        itemElement.innerHTML = `
            ${isCollected ? 
                `<img src="${imagePath}" alt="${item}" class="item-image" onerror="this.style.filter='brightness(0) invert(0.8)'; this.src=''"><span class='item-placeholder' style='display:none'>?</span>` : 
                '<span class="item-placeholder">?</span>'
            }
            <p class="item-name">${isCollected ? itemNamesMap[item] : '？？？'}</p>
        `;
        collectionGrid.appendChild(itemElement);
    });

    // ステータスとプログレスバーの更新
    collectionStatus.textContent = `${collectedCount} / ${allItems.length}`;
    progressBar.style.width = `${(collectedCount / allItems.length) * 100}%`;

    // --- モーダル関連 ---
    const itemModal = document.getElementById('item-modal');
    const modalItemImage = document.getElementById('modal-item-image');
    const modalItemName = document.getElementById('modal-item-name');
    const closeButton = document.querySelector('.close-button');

    collectionGrid.addEventListener('click', (event) => {
        const clickedItem = event.target.closest('.collection-item.collected');
        if (clickedItem) {
            const itemName = clickedItem.querySelector('.item-name').textContent;
            const itemImageSrc = clickedItem.querySelector('.item-image').src;

            modalItemImage.src = itemImageSrc;
            modalItemName.textContent = itemName;
            itemModal.classList.add('active');
        }
    });

    closeButton.addEventListener('click', () => {
        itemModal.classList.remove('active');
    });

    // モーダルの外側をクリックで閉じる
    window.addEventListener('click', (event) => {
        if (event.target === itemModal) {
            itemModal.classList.remove('active');
        }
    });
});