window.addEventListener('load',
    function(event){
        startwatch();
    }
, false);

function startwatch(){
    var watch = document.getElementById('watch');
    window.setInterval(
        function(){
            var time = new Date();
            watch.innerHTML = 
                zero2D(time.getHours()) + ':' +
                zero2D(time.getMinutes()) + ':' +
                zero2D(time.getSeconds()) + ' ' + 
                time.getFullYear() + '年' +
                (time.getMonth() + 1 ) + '月' +
                time.getDate() + '日';
        }
    ,1000);
}

function zero2D(num) {
    return num < 10 ? '0' + num : num; // 修正: 10未満の数字に0を付加
}