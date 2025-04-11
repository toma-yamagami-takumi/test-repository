// DOM要素が読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
    // 詳細を見るボタンのイベントリスナー
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                // スムーズにスクロール
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // お問い合わせフォームのイベントリスナー
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // フォームのデフォルト送信を防止
            
            // フォームデータの取得
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // バリデーション（簡易版）
            if (!name || !email || !message) {
                showNotification('すべてのフィールドを入力してください', 'error');
                return;
            }
            
            // メールアドレスの簡易バリデーション
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('有効なメールアドレスを入力してください', 'error');
                return;
            }
            
            // 実際のアプリではここでAPIリクエストを送信する
            // 今回はモックの成功レスポンスを表示
            showNotification('お問い合わせありがとうございます！', 'success');
            contactForm.reset(); // フォームをリセット
        });
    }

    // ナビゲーションリンクのイベントリスナー
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // リンクのデフォルト動作をキャンセル
            e.preventDefault();
            
            // リンクのhref属性からターゲットIDを取得
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // スムーズにスクロール
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // サービスカードのアニメーション
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        // Intersection Observerを使用して要素が画面に表示されたかどうかを検出
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // 一度表示されたら監視を停止
                }
            });
        }, { threshold: 0.2 }); // 要素の20%が表示されたら発火
        
        // 各カードを監視
        serviceCards.forEach(card => {
            observer.observe(card);
        });
    }
});

// 通知メッセージを表示する関数
function showNotification(message, type = 'info') {
    // 既存の通知があれば削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 新しい通知要素を作成
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 通知を画面に追加
    document.body.appendChild(notification);
    
    // CSSアニメーション用のクラスを追加
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 3秒後に通知を削除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300); // フェードアウトアニメーションの時間
    }, 3000);
}

// 通知システム用のスタイルを動的に追加
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
.notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s, transform 0.3s;
    z-index: 1000;
    max-width: 90%;
}

.notification.show {
    opacity: 1;
    transform: translateY(0);
}

.notification.success {
    background-color: #4CAF50;
}

.notification.error {
    background-color: #F44336;
}

.notification.info {
    background-color: #2196F3;
}

/* サービスカードのアニメーション */
.service-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.service-card.visible {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(notificationStyles);