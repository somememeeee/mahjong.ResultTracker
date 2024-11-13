let mode = 'four'; // 初期モードを四麻に設定
let fourPlayerData = { data: [], totalPoints: 0 };
let threePlayerData = { data: [], totalPoints: 0 };
let currentRank = null;

// モード選択
function selectMode(selectedMode) {
    mode = selectedMode;
    document.getElementById("currentPoints").value = 0;
    currentRank = null;
    updateRankButtons();
}

// 四麻と三麻のボタン切り替え
function updateRankButtons() {
    document.getElementById("fourthRankButton").style.display = (mode === 'four') ? "inline-block" : "none";
}

// 着順を設定
function setRank(rank) {
    currentRank = rank;
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
    document.getElementById("currentPoints").value = "";  // 入力フィールドをクリア

    if (currentRank === null) {
        alert("着順を選択してください。");
        return;
    }

    const currentData = mode === 'four' ? fourPlayerData : threePlayerData;
    
    // データ形式：[mode, rank, point]
    currentData.data.push([mode, currentRank, currentPoints]);
    currentData.totalPoints += currentPoints;

    document.getElementById("currentPoints").value = "";
    currentRank = null;
    updateResults();
}

// 結果更新
function updateResults() {
    updatePlayerResults(fourPlayerData, 'four', 4);
    updatePlayerResults(threePlayerData, 'three', 3);
}

// 各モードの結果更新
function updatePlayerResults(data, prefix, maxRank) {
    // 平均着順計算
    const rankSum = data.data.reduce((sum, entry) => sum + entry[1], 0);
    const avgRank = data.data.length ? (rankSum / data.data.length).toFixed(2) : "-";
    document.getElementById(`${prefix}AverageRank`).innerText = `平均着順: ${avgRank}`;

    // 着順履歴作成
    const rankHistory = data.data.map(entry => entry[1]).join('');
    document.getElementById(`${prefix}RankHistory`).innerText = `着順履歴: ${rankHistory}`;

    // 着順の回数
    let rankCount = Array(maxRank).fill(0);
    data.data.forEach(entry => {
        const rank = entry[1];
        if (rank >= 1 && rank <= maxRank) {
            rankCount[rank - 1]++;
        }
    });
    document.getElementById(`${prefix}RankCount`).innerText = `着順回数: ${rankCount.join('-')}`;

    // ポイント合計表示
    document.getElementById(`${prefix}TotalPoints`).innerText = `増減ポイント: ${data.totalPoints}`;

    // 現在のポイント更新（打ち始めのポイント/目標点数の形式）
    const startingPointsInput = document.getElementById(`${prefix}StartingPoints`);
    const [initialPointsStr, targetPointsStr] = startingPointsInput.value.split('/');
    const initialPoints = parseInt(initialPointsStr) || 0;
    const targetPoints = parseInt(targetPointsStr) || 500;

    // 配列内のポイントの合計を計算して打ち始めのポイントに加算
    const totalChange = data.data.reduce((sum, entry) => sum + entry[2], 0);
    const newCurrentPoints = initialPoints + totalChange;

    // 計算結果を「計算した数字/目標点数」の形式で指定の <div> 要素に更新
    document.getElementById(`${prefix}CurrentPoints`).innerText = `増減ポイント: ${newCurrentPoints}/${targetPoints}`;
}

function updateCurrentPoints(mode) {
    const startingPointsInput = document.getElementById(`${mode}StartingPoints`);
    const currentPointsDisplay = document.getElementById(`${mode}CurrentPoints`);
    
    // 入力値を「現在の点数/目標点数」の形式で分割
    const [currentPoints, targetPoints] = startingPointsInput.value.split('/');
    
    // 「現在のポイント」に反映
    if (currentPoints && targetPoints) {
        currentPointsDisplay.innerText = `現在のポイント: ${currentPoints}/${targetPoints}`;
    } else {
        currentPointsDisplay.innerText = `現在のポイント: -`;
    }
}
