let mode = 'four'; // 初期モードを四麻に設定
let rankHistory = [];
let totalPoints = 0;

// モード選択
function selectMode(selectedMode) {
    mode = selectedMode;
    rankHistory = [];
    document.getElementById("currentPoints").value = 0;
    updateRankButtons();
    updateResults();
}

// 四麻と三麻のボタン切り替え
function updateRankButtons() {
    document.getElementById("fourthRankButton").style.display = (mode === 'four') ? "inline-block" : "none";
}

// 現在のポイントを入力
function setRank(rank) {
    rankHistory.push(rank);
    updateResults();
}

// 電卓でポイント入力
function inputPoint(value) {
    let pointField = document.getElementById("currentPoints");
    if (value === '-') {
        pointField.value = -Math.abs(parseInt(pointField.value) || 0);
    } else if (value === '') {
        pointField.value = "";
    } else {
        pointField.value += value;
    }
}

// ポイントをクリア
function clearPoint() {
    document.getElementById("currentPoints").value = "";
}

// 送信
function submitData() {
    const currentPoints = parseInt(document.getElementById("currentPoints").value) || 0;
    totalPoints += currentPoints;

    rankHistory.push(currentPoints);
    document.getElementById("currentPoints").value = 0;
    updateResults();
}

// 結果更新
function updateResults() {
    // 平均着順
    let avgRank = rankHistory.length ? (rankHistory.reduce((a, b) => a + b) / rankHistory.length).toFixed(2) : "-";
    document.getElementById("averageRank").innerText = `平均着順: ${avgRank}`;

    // 着順履歴
    document.getElementById("rankHistory").innerText = `着順履歴: ${rankHistory.join('')}`;

    // 着順の回数
    let rankCount = Array(mode === 'four' ? 4 : 3).fill(0);
    rankHistory.forEach(rank => {
        if (rank >= 1 && rank <= rankCount.length) {
            rankCount[rank - 1]++;
        }
    });
    document.getElementById("rankCount").innerText = `着順回数: ${rankCount.join('-')}`;

    // ポイント合計
    document.getElementById("totalPoints").innerText = `ポイント合計: ${totalPoints}`;
}
