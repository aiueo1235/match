:root {
    --primary: #6c5ce7;
    --bg: #f0f2f5;
    --card: #ffffff;
    --text: #2d3436;
    --accent: #ff7675;
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
    :root {
        --primary: #a29bfe;
        --bg: #1e272e;
        --card: #2f3640;
        --text: #f5f6fa;
    }
}

body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--bg);
    color: var(--text);
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.3s;
}

header { text-align: center; margin-bottom: 20px; }
h1 { color: var(--primary); margin-bottom: 5px; }
.sub-text { font-size: 0.8rem; opacity: 0.7; }

.card {
    background: var(--card);
    width: 100%;
    max-width: 400px;
    padding: 24px;
    border-radius: 30px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    box-sizing: border-box;
    margin-bottom: 20px;
}

h3 {
    font-size: 0.9rem;
    margin-top: 20px;
    border-left: 4px solid var(--primary);
    padding-left: 10px;
}

/* グリッド */
.grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    margin: 15px 0;
}

.slot {
    aspect-ratio: 1;
    background: rgba(128,128,128,0.1);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    cursor: pointer;
    transition: 0.2s;
}

.slot.selected {
    background: var(--primary);
    color: white;
    transform: scale(1.05);
}

/* 入力 */
input, select {
    width: 100%;
    padding: 15px;
    border-radius: 15px;
    border: 2px solid rgba(128,128,128,0.1);
    background: rgba(128,128,128,0.05);
    color: var(--text);
    font-size: 1rem;
    box-sizing: border-box;
    margin-bottom: 10px;
}

/* ボタン */
button {
    width: 100%;
    padding: 18px;
    border-radius: 20px;
    border: none;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
}

.btn-primary { background: var(--primary); color: white; box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3); }
.btn-secondary { background: transparent; color: var(--primary); border: 2px solid var(--primary); margin-top: 10px; }

/* マッチ結果 */
.match-banner { background: var(--primary); color: white; padding: 15px; border-radius: 15px; text-align: center; font-weight: bold; margin-bottom: 20px; }
.res-box { background: rgba(128,128,128,0.05); padding: 15px; border-radius: 15px; margin-bottom: 15px; }
.main-loc { font-size: 1.2rem; font-weight: bold; color: var(--primary); }

.task-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding-right: 5px; }
.urgent { color: var(--accent); font-weight: bold; border-right: 4px solid var(--accent); }
.done-btn { width: auto; padding: 5px 10px; font-size: 0.7rem; background: #2ecc71; color: white; border-radius: 8px; }

.hidden { display: none; }
#qrcode { display: flex; justify-content: center; padding: 15px; background: white; border-radius: 15px; }
