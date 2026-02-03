const days = ['月', '火', '水', '木', '金'];
let myData = JSON.parse(localStorage.getItem('studySyncData') || '{"slots":[], "tasks":""}');

const grid = document.getElementById('timetable-grid');
for (let i = 0; i < 25; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot' + (myData.slots.includes(String(i)) ? ' selected' : '');
    slot.innerHTML = `<span>${days[i % 5]}</span><span>${Math.floor(i / 5) + 1}</span>`;
    slot.onclick = () => {
        slot.classList.toggle('selected');
        saveData();
    };
    slot.dataset.id = i;
    grid.appendChild(slot);
}

document.getElementById('task-input').value = myData.tasks;
document.getElementById('task-input').oninput = saveData;

function saveData() {
    myData = {
        slots: Array.from(document.querySelectorAll('.slot.selected')).map(s => s.dataset.id),
        tasks: document.getElementById('task-input').value
    };
    localStorage.setItem('studySyncData', JSON.stringify(myData));
}

document.getElementById('generate-btn').onclick = () => {
    const jsonStr = JSON.stringify(myData);
    const url = `${window.location.origin}${window.location.pathname}?data=${encodeURIComponent(jsonStr)}`;
    const qrContainer = document.getElementById("qrcode");
    qrContainer.innerHTML = ""; 
    new QRCode(qrContainer, { text: url, width: 220, height: 220 });
    toggleScreen('qr-screen');
};

const params = new URLSearchParams(window.location.search);
if (params.has('data')) {
    const friendData = JSON.parse(decodeURIComponent(params.get('data')));
    showResults(friendData);
}

function showResults(friend) {
    toggleScreen('match-screen');
    const common = friend.slots.filter(s => myData.slots.includes(s));
    document.getElementById('common-slots').innerHTML = common.length > 0 
        ? common.map(id => `${days[id % 5]}${Math.floor(id / 5) + 1}`).join(', ') : "なし";

    const myT = myData.tasks.split(',').map(t => t.trim().toLowerCase()).filter(t => t);
    const frT = friend.tasks.split(',').map(t => t.trim().toLowerCase()).filter(t => t);
    const commonT = frT.filter(t => myT.includes(t));
    const onlyFrT = frT.filter(t => !myT.includes(t));

    document.getElementById('common-tasks').innerHTML = commonT.length > 0
        ? `<ul>${commonT.map(t => `<li>${t}</li>`).join('')}</ul>` : "なし";
    document.getElementById('friend-tasks').innerHTML = `<ul>${onlyFrT.map(t => `<li>${t}</li>`).join('')}</ul>`;
}

function toggleScreen(id) {
    ['setup-screen', 'qr-screen', 'match-screen'].forEach(s => document.getElementById(s).classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}
