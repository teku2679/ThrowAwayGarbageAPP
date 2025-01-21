const gomi_title = ['古紙・古着の日', '可燃ごみの日', '不燃ごみの日', '廃プラ・ペットの日', '缶・びんの日'];
const gomi_date = [['1'], ['2,5'], ['3'], ['4'], ['3']];
const gomi_exclusionsdate = [[], [], ['2-WED', '4-WED'], [], ['1-WED', '3-WED', '5-WED']]; // 除外日として「第1水曜日(1-WED)」や「第2木曜日(2-THU)」を指定

function untilnextday(day, exclusions) {
    const daystable = day.split(',').map(Number); // 複数の曜日をカンマで区切って数値に変換する
    const today = new Date();
    const currentday = today.getDay();
    const validdays = daystable.filter(day => day >= 0 && day <= 6); // 有効な曜日をフィルタリング

    if (validdays.length === 0) {
        throw new Error('曜日指定エラー');
    }

    let computeddays = 0;

    while (true) {
        // 日数を計算
        computeddays += (computeddays === 0) ? (validdays[0] - currentday + 7) % 7 || 7 : 7;
        
        // 対象日を計算
        const targetdate = new Date(today);
        targetdate.setDate(today.getDate() + computeddays);
        
        // 除外処理
        if (!exclusions.some(exclusion => {
            const [n, weekday] = exclusion.split('-'); // nと曜日を分割
            const excludedDay = getNthWeekdayInMonth(targetdate.getFullYear(), targetdate.getMonth() + 1, parseInt(n), weekday);
            return excludedDay && excludedDay.toDateString() === targetdate.toDateString();
        })) {
            return computeddays; // 除外日でなく、次の有効な日を返す
        }
    }
}

// 指定された月の第n回目の曜日の日付を取得する関数
function getNthWeekdayInMonth(year, month, n, weekday) {
    const weekdaysMap = {SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, };

    const dayOfWeek = weekdaysMap[weekday.toUpperCase()];
    let date = new Date(year, month - 1, 1); // 月の初日

    let count = 0;
    while (date.getMonth() === month - 1) {
        if (date.getDay() === dayOfWeek) {
            count++;
            if (count === n) {
                return new Date(date); // 第n回目の曜日の日付を返す
            }
        }
        date.setDate(date.getDate() + 1); // 翌日へ
    }
    return null; // 該当する日がなければnullを返す
}

// HTMLの出力
document.write('<table>'); // テーブル開始
document.write('<tr>');
document.write('<td>ごみの種類</td>');
for (let i = 0; i < gomi_title.length; i++) {
    document.write('<td>' + gomi_title[i] + '</td>');
}
document.write('</tr>');
document.write('<tr>');
document.write('<td>ごみの日</td>');
for (let i = 0; i < gomi_date.length; i++) {
    const days = untilnextday(gomi_date[i][0], gomi_exclusionsdate[i]); // 除外日を適切に渡す
    document.write('<td>残り <b>' + days + '</b> 日</td>');
}
document.write('</tr>');
document.write('</table>'); // テーブル終了