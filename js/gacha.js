document.addEventListener('DOMContentLoaded', () => {
    // --- 設定 ---
    const birthday = '2024-07-18';
    const normalItems = ['haburashi', 'gameki', 'kasa', 'nuigurumi', 'koppu', 't_shirt', 'zubon', 'boushi', 'okikagami', 'dryer', 'cd', 'dvd', 'kuchibeni', 'cola', 'snack_kashi'];
    const specialItems = ['hairbrush', 'sneaker', 'ude_dokei'];
    const imageFileExtension = '.jpg';

    // --- 状態管理 ---
    let gachaCount = localStorage.getItem('gachaCount') ? parseInt(localStorage.getItem('gachaCount')) : 0;
    const collectedItems = JSON.parse(localStorage.getItem('collectedItems_' + birthday)) || [];

    // --- DOM要素 ---
    const gachaResultElement = document.getElementById('gacha-result');
    const pullGachaButton = document.getElementById('pull-gacha-button');
    const pullsLeftElement = document.getElementById('pulls-left');
    const birthdayChanceElement = document.getElementById('birthday-chance');
    const pullChanceButton = document.getElementById('pull-chance-button');
    const resetButton = document.getElementById('reset-button');

    let currentItem = null;
    let packIsOpening = false;

    // --- 関数 ---
    const saveCollectedItems = () => localStorage.setItem('collectedItems_' + birthday, JSON.stringify(collectedItems));
    const createConfetti = () => { /* ... 変更なし ... */ };

    function updatePullsLeft() {
        pullsLeftElement.textContent = gachaCount > 0 ? gachaCount : 0;
        pullGachaButton.disabled = packIsOpening || gachaCount <= 0;
        if (gachaCount <= 0) {
            pullGachaButton.textContent = 'また明日！';
        } else if (!packIsOpening) {
            pullGachaButton.textContent = 'パックを引く';
        }

        const today = new Date().toISOString().split('T')[0];
        if (today === birthday && gachaCount <= 0) {
            const collectedNormalCount = collectedItems.filter(item => normalItems.includes(item)).length;
            if (collectedNormalCount >= 12 && collectedItems.length < (normalItems.length + specialItems.length)) {
                birthdayChanceElement.style.display = 'block';
            }
        }
    }

    function finalizeGacha() {
        const isNew = !collectedItems.includes(currentItem);
        if (isNew) {
            collectedItems.push(currentItem);
            saveCollectedItems();
            setTimeout(createConfetti, 500);
        }
        gachaCount--;
        localStorage.setItem('gachaCount', gachaCount);
        updatePullsLeft();

        pullGachaButton.disabled = false;
        pullGachaButton.textContent = '次のパックを引く';
        packIsOpening = false;
    }

    function showCard() {
        console.log('showCard called');
        const isNew = !collectedItems.includes(currentItem);
        const imagePath = `img/${currentItem}${imageFileExtension}`;
        
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('item-card-container');

        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.alt = currentItem;
        imgElement.classList.add('item-image');
        imgElement.onerror = function() {
            this.onerror = null;
            this.src = '';
            this.style.filter = 'brightness(0) invert(0.8)';
            this.style.backgroundColor = '#ccc';
        };
        cardContainer.appendChild(imgElement);

        if (isNew) {
            const newText = document.createElement('p');
            newText.classList.add('new-item-text');
            newText.textContent = 'NEW!';
            cardContainer.appendChild(newText);
        }

        gachaResultElement.innerHTML = '';
        gachaResultElement.appendChild(cardContainer);

        console.log('Image Path:', imagePath);
        console.log('gachaResultElement innerHTML after assignment (programmatic):', gachaResultElement.innerHTML);

        void cardContainer.offsetWidth; 
        cardContainer.classList.add('visible');
        
        finalizeGacha();
    }

    function openPack() {
        console.log('openPack called');
        const packTop = document.querySelector('.pack-top');
        const packBottom = document.querySelector('.pack-bottom');
        if (packTop && packBottom) {
            packTop.classList.add('opened');
            packBottom.classList.add('opened');
            setTimeout(showCard, 500);
        }
    }

    function handleTear(packBottomElement) {
        let isDragging = false;
        let hasOpened = false;

        const onDown = (e) => {
            isDragging = true;
            hasOpened = false;
            const wrapper = packBottomElement.closest('.pack-wrapper');
            if(wrapper) wrapper.style.cursor = 'grabbing';

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp, { once: true });
            document.addEventListener('touchmove', onMove, { passive: true });
            document.addEventListener('touchend', onUp, { once: true });
        };

        const onMove = (e) => {
            if (!isDragging || hasOpened) return;
            hasOpened = true;
            openPack();
        };

        const onUp = () => {
            if (!isDragging) return;
            isDragging = false;
            const wrapper = packBottomElement.closest('.pack-wrapper');
            if(wrapper) wrapper.style.cursor = 'grab';

            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('touchmove', onMove);
        };

        packBottomElement.addEventListener('mousedown', onDown);
        packBottomElement.addEventListener('touchstart', onDown, { passive: true });
    }

    function showPack(itemList) {
        packIsOpening = true;
        pullGachaButton.disabled = true;
        currentItem = itemList[Math.floor(Math.random() * itemList.length)];

        gachaResultElement.innerHTML = `
            <div class="pack-wrapper">
                <div class="pack-part pack-top"></div>
                <div class="pack-part pack-bottom">
                    <div class="tear-line"></div>
                </div>
            </div>`;
        
        const packBottom = gachaResultElement.querySelector('.pack-bottom');
        handleTear(packBottom);
    }

    pullGachaButton.addEventListener('click', () => {
        if (!packIsOpening && gachaCount > 0) {
            showPack(normalItems);
        }
    });

    if(resetButton) {
        resetButton.addEventListener('click', () => {
            if (confirm('本当に進行状況をリセットしますか？集めたアイテムがすべてなくなります。')) {
                localStorage.removeItem('collectedItems_' + birthday);
                localStorage.setItem('gachaCount', 3); // Reset gacha count as well
                location.reload();
            }
        });
    }

    pullChanceButton.addEventListener('click', () => {
        if (!packIsOpening) {
            const remainingSpecials = specialItems.filter(item => !collectedItems.includes(item));
            if (remainingSpecials.length > 0) {
                currentItem = remainingSpecials[0];
                showPack(remainingSpecials);
            } else {
                pullChanceButton.textContent = 'コンプリート！';
                pullChanceButton.disabled = true;
            }
        }
    });

    updatePullsLeft();
});