const days = ['月', '火', '水', '木', '金'];
let myData = JSON.parse(localStorage.getItem('studySyncPro') || '{"slots":[], "tasks":"", "loc":"図書館"}');

// 1. 初期化: 空きコマグリッドの作成
const grid = document.getElementById('timetable-grid');
for (let i = 0; i < 25; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot' + (myData.slots.includes(String(i)) ? ' selected' : '');
    slot.innerHTML = `<b>${days[i % 5]}</b>${Math.floor(i / 5) + 1}`;
    slot.onclick = () => {
        slot.classList.toggle('selected');
        save();
    };
    slot.dataset.id = i;
    grid.appendChild(slot);
}

// データの復元
document.getElementById('task-input').value = myData.tasks;
document.getElementById('location-input').value = myData.loc;

// 入力イベントの登録
document.querySelectorAll('input, select').forEach(el => {
    el.oninput = save;
});

function save() {
    myData = {
        slots: Array.from(document.querySelectorAll('.slot.selected')).map(s => s.dataset.id),
        tasks: document.getElementById('task-input').value,
        loc: document.getElementById('location-input').value
    };
    localStorage.setItem('studySyncPro', JSON.stringify(myData));
}

// QR生成ボタン
document.getElementById('generate-btn').onclick = () => {
    const dataStr = encodeURIComponent(JSON.stringify(myData));
    const url = `${window.location.origin}${window.location.pathname}?data=${dataStr}`;
    
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = ""; 
    new QRCode(qrContainer, { text: url, width: 220, height: 220 });
    
    toggleScreen('qr-screen');
};

// URLパラメータによるマッチング処理
const params = new URLSearchParams(window.location.search);
if (params.has('data')) {
    try {
        const friendData = JSON.parse(decodeURIComponent(params.get('data')));
        showResults(friendData);
    } catch (e) {
        console.error("データ解析エラー", e);
    }
}

function showResults(friend) {
    toggleScreen('match-screen');
    document.getElementById('res-loc').textContent = friend.loc + "にいるよ！";
    
    const common = friend.slots.filter(s => myData.slots.includes(s));
    document.getElementById('res-slots').innerHTML = common.length > 0 
        ? common.map(id => `【${days[id % 5]}${Math.floor(id / 5) + 1}】`).join(' ') 
        : "重なる時間がないみたい...";

    const myT = myData.tasks.split(',').map(t => t.trim().toLowerCase());
    const frT = friend.tasks.split(',').map(t => t.trim());
    
    const taskHTML = frT.map(t => {
        const isUrgent = t.includes('!');
        const cleanT = t.replace('!', '');
        const isCommon = myT.includes(cleanT.toLowerCase());
        
        return `
        <div class="task-item ${isUrgent ? 'urgent' : ''}">
            <span>${isCommon ? '🤝' : '📄'} ${cleanT} ${isUrgent ? '⚠️' : ''}</span>
            <button class="done-btn" onclick="finishTask(this)">完了</button>
        </div>`;
    }).join('');
    
    document.getElementById('res-tasks').innerHTML = taskHTML || "課題はないようです。";
}

// 完了ボタン（紙吹雪）
function finishTask(btn) {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6c5ce7', '#a29bfe', '#ff7675']
    });
    const parent = btn.parentElement;
    parent.style.opacity = "0.3";
    parent.style.textDecoration = "line-through";
    btn.remove();
}

function toggleScreen(id) {
    ['setup-screen', 'qr-screen', 'match-screen'].forEach(s => {
        document.getElementById(s).classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}
