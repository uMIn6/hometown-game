let turn = 0;
let money = 1000;
let education = 50;
let health = 50;
let water = 50;
let trust = 50;

let friends = [];

// 更新狀態
function updateStatus(msg) {
  document.getElementById("status").innerText =
    `回合 ${turn} | 資金:$${money} | 教育:${education} | 醫療:${health} | 飲水:${water} | 信任:${trust}\n` + msg;
  renderFriends();
}

// 回合事件
function nextTurn() {
  turn++;
  money -= 50; // 維持花費
  let msg = "你在村莊努力工作。";

  let eventChance = Math.random();
  if (eventChance < 0.25) {
    msg = "你遇到了一位醫生，他願意成為朋友！";
    addFriend("醫生", "醫療加成");
  } else if (eventChance < 0.5) {
    msg = "你遇到了一位老師，他願意成為朋友！";
    addFriend("老師", "教育加成");
  } else if (eventChance < 0.7) {
    msg = "你參加了文化音樂節 → 信任 +10";
    trust += 10;
    money -= 80;
  } else {
    msg = "這回合沒有特別事件。";
  }

  if (money < -200) {
    msg += "\n💔 你的資金耗盡，遊戲結束。";
    document.querySelector("#game-controls button").disabled = true;
  }

  updateStatus(msg);
}

// 加入朋友
function addFriend(name, skill) {
  if (!friends.find(f => f.name === name)) {
    friends.push({ name, skill, friendship: 50 });
  }
}

// 顯示朋友名單
function renderFriends() {
  let list = document.getElementById("friend-list");
  list.innerHTML = "";
  friends.forEach(f => {
    let li = document.createElement("li");
    li.textContent = `${f.name} (專長:${f.skill}, 友情:${f.friendship})`;
    list.appendChild(li);
  });
}

// 旅行
function travel(region) {
  let msg = `你搭乘飛機前往 ${region}。`;
  if (region === "沙漠地區") {
    msg += " 你幫忙打深水井 → 飲水 +15";
    water += 15;
    money -= 100;
  } else if (region === "山區") {
    msg += " 你協助修路 → 信任 +10";
    trust += 10;
    money -= 120;
  } else if (region === "海岸") {
    msg += " 你幫忙漁民建立防洪堤 → 醫療 +5, 教育 +5";
    health += 5;
    education += 5;
    money -= 150;
  }
  updateStatus(msg);
}

// 初始化
updateStatus("準備開始旅程，探索文化與交朋友！");
