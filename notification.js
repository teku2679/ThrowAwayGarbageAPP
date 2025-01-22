function btnClick() {
    if (window.Notification) {
        alert('Notificationは有効です');
        // Permissionの確認
        if (Notification.permission === 'granted') {
            alert('通知許可されています');
            Push.create("通知が有効になりました");
            startDailyNotifications();
        } else if (Notification.permission === 'denied') {
            alert('通知拒否されています');
        } else if (Notification.permission === 'default') {
            alert('通知可能か不明です');
            // 許可が取れていない場合はNotificationの許可を取る
            Notification.requestPermission(function(result) {
                if (result === 'denied') {
                    alert('通知許可されませんでした');
                } else if (result === 'default') {
                    alert('通知可能か不明です');
                } else if (result === 'granted') {
                    alert('通知許可されました');
                    Push.create("通知が有効になりました");
                    startDailyNotifications();
                }
            });
        }
    } else {
        alert('Notificationは無効です');
    }
}

function startDailyNotifications() {
    // 1分ごとに時間をチェックします
    setInterval(checkTimeAndNotify, 60 * 1000);
}

function scheduleWeeklyNotification(targetDays, alternativeMessages) {
    const now = new Date();
    const currentDate = now.getDate();
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    const sentAlternativeNotifications = new Set();

    targetDays.forEach(({ day, occurrence, message }) => {
        let count = 0;

        for (let d = 1; d <= new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); d++) {
            const dateToCheck = new Date(now.getFullYear(), now.getMonth(), d);
            if (dateToCheck.getDay() === day) {
                count++;
                if (count === occurrence && currentDate === d) {
                    Push.create("お知らせ", { body: message });
                }
            }
        }
    });

    targetDays.forEach(({ day, occurrence }) => {
        let count = 0;

        for (let d = 1; d <= new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); d++) {
            const dateToCheck = new Date(now.getFullYear(), now.getMonth(), d);
            if (dateToCheck.getDay() === day) {
                count++;
                if (count === occurrence && !sentAlternativeNotifications.has(day)) {
                    if (alternativeMessages[day]) {
                        Push.create("お知らせ", { body: alternativeMessages[day] });
                        sentAlternativeNotifications.add(day);
                    }
                }
            }
        }
    });
}

let lastNotificationSent = null; // 最後に通知を送信した時間

function checkTimeAndNotify() {
    const now = new Date();
    const currentMinutes = now.getMinutes();

    // 通知を送信する条件
    if (now.getHours() === 18 && currentMinutes === 17) {
        lastNotificationSent = new Date(); // 現在の時間を記録

        const targetDays = [
            { day: 3, occurrence: 1, message: "今日は不燃ごみの日です!"},
            { day: 3, occurrence: 3, message: "今日は不燃ごみの日です!"},
            { day: 3, occurrence: 5, message: "今日は不燃ごみの日です!"},
            { day: 3, occurrence: 2, message: "今日は缶びんごみの日です!"},
            { day: 3, occurrence: 4, message: "今日は缶びんごみの日です!"}
        ];

        const alternativeMessages = {
            1: "今日は古紙・古着ごみの日です!",
            2: "今日は可燃ごみの日です!",
            4: "今日は廃プラ・ペットごみの日です!",
            5: "今日は可燃ごみの日です!"
        };

        scheduleWeeklyNotification(targetDays, alternativeMessages);
    }
}

// ボタンがクリックされた時に通知の許可を取得する
document.getElementById('btn').addEventListener('click', btnClick);