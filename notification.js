function btnClick(){
    alert('ボタンがクリックされました２');
    if (window.Notification) {
        alert('Notificationは有効です');
      
        // Permissionの確認
        if (Notification.permission === 'granted') {
      
          // 許可されている場合はNotificationで通知
          alert('通知許可されています');
          var n = new Notification("Hello World");
      
        } else if (Notification.permission === 'denied') {
      
          alert('通知拒否されています');
      
        } else if (Notification.permission === 'default') {
      
          alert('通知可能か不明です');
      
          // 許可が取れていない場合はNotificationの許可を取る
          Notification.requestPermission(function(result) {
            if (result === 'denied') {
      
              alert('リクエスト結果：通知許可されませんでした');
      
            } else if (result === 'default') {
      
              alert('リクエスト結果：通知可能か不明です');
      
            } else if (result === 'granted') {
      
              alert('リクエスト結果：通知許可されました！！');
              var n = new Notification("Hello World");
            }
          })
        }
      } else {
        alert('Notificationは無効です');
      }
}

let button = document.getElementById('btn');

// addEventListener( 'イベント', 処理)で要素にイベントが発火した際に処理を実行する
button.addEventListener('click', btnClick);


