var youbi = ["日", "月", "火", "水", "木", "金", "土"];
var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();

function renderCalendar(year, month) {
    const today = new Date();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
    const currentDay = today.getDate();

    const firstdate = new Date(year, month, 1);
    const fdcount = firstdate.getDay();  // 月の最初の日の曜日
    const enddate = new Date(year, month + 1, 0);
    const edcount = enddate.getDate();  // 月末の日付

    let daycount = 1;
    let kareHTML = "<thead><tr>";

    // 曜日を表示
    for (const day of youbi) {
        kareHTML += `<td>${day}</td>`;
    }
    kareHTML += "</tr></thead><tbody>";

    let wednesdayCounter = 0;  // 水曜日のカウンター

    let rowCount = Math.ceil((edcount + fdcount) / 7);  // 行数計算

    for (let row = 0; row < rowCount; row++) {
        kareHTML += "<tr>";
        for (let col = 0; col < 7; col++) {
            if (daycount === 1 && col < fdcount) {
                kareHTML += '<td class="is-disabled"></td>'; // 初日の曜日の位置まで空白セル
            } else if (daycount <= edcount) {
                const currentDate = new Date(year, month, daycount);
                const dayOfWeek = currentDate.getDay();

                let cellClass = "";
                if (dayOfWeek === 1) cellClass = "monday";
                if (dayOfWeek === 2) cellClass = "tuesday";
                if (dayOfWeek === 4) cellClass = "thursday";
                if (dayOfWeek === 5) cellClass = "friday";
                if (dayOfWeek === 3) {
                    wednesdayCounter++;
                    if (wednesdayCounter % 2 === 1) {
                        cellClass = "first-third-fifth-wednesday";
                    } else {
                        cellClass = "second-fourth-wednesday";
                    }
                }
                
                if (isCurrentMonth && daycount === currentDay) {
                    cellClass += " current-day"; // 今日の日付にクラスを追加
                }

                kareHTML += `<td class="${cellClass}">${daycount}</td>`;
                daycount++;
            } else {
                kareHTML += '<td class="is-disabled"></td>'; // 残りを空白セル
            }
        }
        kareHTML += "</tr>";
    }

    kareHTML += "</tbody>";
    document.getElementById("karenda").innerHTML = kareHTML;
    document.querySelector(".thismonth").textContent = `${year}/${String(month + 1).padStart(2, "0")}`;
}

document.getElementById("prev").addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
});

document.getElementById("next").addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
});

// 初期描画
renderCalendar(currentYear, currentMonth);

document.addEventListener("DOMContentLoaded", function() {
    const gomiInfo = {
        monday: "古着・新聞",
        tuesday: "可燃ごみ",
        wednesday: { first: "不燃", second: "缶・びん" },
        thursday: "廃プラ・ペット",
        friday: "可燃ごみ"
    };

    const calendarTable = document.getElementById("karenda");

    calendarTable.addEventListener("mouseover", function(e) {
        if (e.target.tagName.toLowerCase() === 'td' && !e.target.classList.contains('is-disabled')) {
            const gomiBubble = document.getElementById('gomi-bubble');
            let gomiType = "";

            if (e.target.classList.contains("monday")) {
                gomiType = gomiInfo.monday;
            }
            if (e.target.classList.contains("tuesday") || e.target.classList.contains("friday")) {
                gomiType = gomiInfo.tuesday;
            }
            if (e.target.classList.contains("thursday")) {
                gomiType = gomiInfo.thursday;
            }
            if (e.target.classList.contains("first-third-fifth-wednesday")) {
                gomiType = gomiInfo.wednesday.first;
            }
            if (e.target.classList.contains("second-fourth-wednesday")) {
                gomiType = gomiInfo.wednesday.second;
            }

            gomiBubble.textContent = gomiType;
            gomiBubble.style.visibility = 'visible';
            gomiBubble.style.opacity = '1';

            // 吹き出しの位置をセルの右側に設定
            const rect = e.target.getBoundingClientRect();
            gomiBubble.style.top = `${window.scrollY + rect.top}px`;
            gomiBubble.style.left = `${window.scrollX + rect.right + 10}px`;
        }
    });

    calendarTable.addEventListener("mouseout", function(e) {
        if (e.target.tagName.toLowerCase() === 'td') {
            const gomiBubble = document.getElementById('gomi-bubble');
            gomiBubble.style.visibility = 'hidden';
            gomiBubble.style.opacity = '0';
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const colorSection = document.querySelector('.colorserect');

    colorSection.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});
