// myntra-script.js

function showPredictTrends() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Predict Trends</h2>
        <p>What do you think will be the next big trend?</p>
        <select id="trend-prediction">
            <option value="">Select a trend</option>
            <option value="oversized">Oversized Clothing</option>
            <option value="neon">Neon Colors</option>
            <option value="sustainable">Sustainable Fashion</option>
            <option value="retro">Retro Revival</option>
        </select>
        <button onclick="submitPrediction()" class="btn">Submit Prediction</button>
    `;
    gameArea.classList.remove('hidden');
}

function showCreateOutfits() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Create Outfits</h2>
        <p>Drag and drop items to create your outfit:</p>
        <div id="wardrobe">
            <img src="tshirt.png" draggable="true" ondragstart="drag(event)" id="item1" width="100" height="100">
            <img src="jeans.png" draggable="true" ondragstart="drag(event)" id="item2" width="100" height="100">
            <img src="jacket.png" draggable="true" ondragstart="drag(event)" id="item3" width="100" height="100">
        </div>
        <div id="outfit-canvas" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <button onclick="saveOutfit()" class="btn">Save Outfit</button>
    `;
    gameArea.classList.remove('hidden');
}

function showLeaderboard() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Leaderboard</h2>
        <ol>
            <li>Player1 - 1000 points</li>
            <li>Player2 - 950 points</li>
            <li>Player3 - 900 points</li>
            <li>Player4 - 850 points</li>
            <li>Player5 - 800 points</li>
        </ol>
    `;
    gameArea.classList.remove('hidden');
}

function submitPrediction() {
    const prediction = document.getElementById('trend-prediction').value;
    if (prediction) {
        alert(`Your prediction (${prediction}) has been submitted!`);
    } else {
        alert('Please select a trend before submitting.');
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function saveOutfit() {
    alert('Your outfit has been saved!');
}