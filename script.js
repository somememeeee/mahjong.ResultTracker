let mode = 'four'; // 初期モードを四麻に設定
let fourPlayerData = { rankHistory: [], totalPoints: 0 };
let threePlayerData = { rankHistory: [], totalPoints: 0 };

// モード選択
function selectMode(selectedMode) {
    mode = selectedMode;
    document.getElementById("currentPoints").value = 0;
    updateRankButtons();
}

// 四麻と三麻のボタン切り替え
function updateRankButtons() {
    document.getElementById("fourthRankButton").style.display = (mode === 'four') ? "inline-block" : "none";
}

// 着順を設定
function setRank(rank) {
    const currentData = mode === 'four' ? fourPlayerData : threePlayerData;
    currentData.rankHistory.push(rank);
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
    const currentData = mode === 'four' ? fourPlayerData : threePlayerData;

    currentData.totalPoints += currentPoints;
    document.getElementById("currentPoints").value = 0;
    updateResults();
}

// 結果更新
function updateResults() {
    updatePlayerResults(fourPlayerData, 'four', 4);
    updatePlayerResults(threePlayerData, 'three', 3);
}

// 各モードの結果更新
function updatePlayerResults(data, prefix, maxRank) {
    // 平均着順
    const avgRank = data.rankHistory.length ? (data.rankHistory.reduce((a, b) => a + b) / data.rankHistory.length).toFixed(2) : "-";
    document.getElementById(`${prefix}AverageRank`).innerText = `平均着順: ${avgRank}`;

    // 着順履歴
    document.getElementById(`${prefix}RankHistory`).innerText = `着順履歴: ${data.rankHistory.join('')}`;

    // 着順の回数
    let rankCount = Array(maxRank).fill(0);
    data.rankHistory.forEach(rank => {
        if (rank >= 1 && rank <= maxRank) {
            rankCount[rank - 1]++;
        }
    });
    document.getElementById(`${prefix}RankCount`).innerText = `着順回数: ${rankCount.join('-')}`;

    // ポイント合計
    document.getElementById(`${prefix}TotalPoints`).innerText = `ポイント合計: ${data.totalPoints}`;
}
