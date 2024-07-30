
const db = firebase.database();
const auth = firebase.auth();

let currentUser = 0;
let userCoins = 0;

const trendQuestions = [
    {
        question: "Which color do you think will dominate the next summer season?",
        options: ["Neon Green", "Pastel Blue", "Earth Tones", "Metallic Silver"],
        correct: 2
    },
    {
        question: "What fabric trend do you predict for the upcoming winter?",
        options: ["Velvet", "Chunky Knits", "Leather", "Silk"],
        correct: 1
    },
    {
        question: "Which accessory trend do you think will make a comeback?",
        options: ["Chokers", "Oversized Sunglasses", "Anklets", "Bucket Hats"],
        correct: 3
    }
];

const pairingChallenges = [
    {
        outfit: "Little Black Dress",
        outfitImage: "black-dress.jpg",
        options: [
            { name: "Pearl Necklace", image: "pearl-necklace.jpg" },
            { name: "Sneakers", image: "sneakers.jpg" },
            { name: "Leather Jacket", image: "leather-jacket.jpg" },
            { name: "Statement Earrings", image: "statement-earrings.jpg" }
        ],
        correct: [0, 3]
    },
    {
        outfit: "Casual Jeans and T-shirt",
        outfitImage: "jeans-tshirt.jpg",
        options: [
            { name: "High Heels", image: "high-heels.jpg" },
            { name: "Sneakers", image: "sneakers.jpg" },
            { name: "Scarf", image: "scarf.jpg" },
            { name: "Baseball Cap", image: "baseball-cap.jpg" }
        ],
        correct: [1, 3]
    },
    {
        outfit: "Business Suit",
        outfitImage: "business-suit.jpg",
        options: [
            { name: "Tie", image: "tie.jpg" },
            { name: "Smartwatch", image: "smartwatch.jpg" },
            { name: "Flip-flops", image: "flip-flops.jpg" },
            { name: "Sunglasses", image: "sunglasses.jpg" }
        ],
        correct: [0, 1]
    }
];

const outfitItems = [
    { name: 'T-Shirt', image: 'tshirt.png' },
    { name: 'Jeans', image: 'jeans.png' },
    { name: 'Sneakers', image: 'sneakers.png' },
    { name: 'Hat', image: 'hat.png' },
    { name: 'Sunglasses', image: 'sunglasses.png' },
    { name: 'Watch', image: 'watch.png' }
];

let currentQuestion = 0;
let currentPairingChallenge = 0;
let score = 0;

function signIn() {
    auth.signInAnonymously().catch(error => {
        console.error("Error signing in:", error);
    });
}

auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        loadUserData();
    } else {
        console.log("User is signed out");
    }
});
function loadUserData() {
    db.ref('users/' + currentUser.uid).once('value', snapshot => {
        const userData = snapshot.val() || { coins: 0 };
        userCoins = userData.coins;
        updateUIWithUserData();
    });
}

function updateUserCoins(coinsEarned) {
    userCoins += coinsEarned;
    db.ref('users/' + currentUser.uid).update({ coins: userCoins });
    updateUIWithUserData();
}

function updateUIWithUserData() {
    const userCoinsElement = document.getElementById('userCoins');
    if (userCoinsElement) {
        userCoinsElement.textContent = `Coins: ${userCoins}`;
    }
}

// Leaderboard
function updateLeaderboard(score) {
    if (currentUser) {
        db.ref('leaderboard/' + currentUser.uid).set({
            score: score,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
}

function displayLeaderboard() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = '<h2>Leaderboard</h2><ul id="leaderboard-list"></ul>';
    gameArea.classList.remove('hidden');

    db.ref('leaderboard').orderByChild('score').limitToLast(5).on('value', snapshot => {
        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardList.innerHTML = '';
        const leaderboard = [];
        snapshot.forEach(childSnapshot => {
            leaderboard.unshift({
                id: childSnapshot.key,
                score: childSnapshot.val().score
            });
        });
        leaderboard.forEach((entry, index) => {
            leaderboardList.innerHTML += `
                <li class="leaderboard-item">
                    <span>${index + 1}. Player ${entry.id.substr(0, 5)}</span>
                    <span>${entry.score} points</span>
                </li>
            `;
        });
    });
}

function showPredictTrends() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Predict Trends</h2>
        <div class="question-container">
            <p id="question"></p>
            <div class="options-container" id="options"></div>
        </div>
        <p>Score: <span id="score">0</span></p>
    `;
    gameArea.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion < trendQuestions.length) {
        const question = trendQuestions[currentQuestion];
        document.getElementById('question').textContent = question.question;
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            optionsContainer.innerHTML += `
                <button class="option-btn" onclick="checkAnswer(${index})">${option}</button>
            `;
        });
    } else {
        endGame();
    }
}

function checkAnswer(selectedIndex) {
    const question = trendQuestions[currentQuestion];
    if (selectedIndex === question.correct) {
        score++;
        updateUserCoins(5); 
    }
    currentQuestion++;
    loadQuestion();
}


function endGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Game Over</h2>
        <p>Your final score is: ${score}</p>
        <button class="btn" onclick="showPredictTrends()">Play Again</button>
    `;
    updateLeaderboard(score);
}


function showCreateOutfits() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Create Outfits</h2>
        <div class="outfit-creator">
            <div class="wardrobe" id="wardrobe"></div>
            <div class="outfit-canvas" id="outfit-canvas" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        </div>
        <button class="btn" onclick="saveOutfit()">Save Outfit</button>
    `;
    gameArea.classList.remove('hidden');
    loadWardrobeItems();
}

function loadWardrobeItems() {
    const wardrobe = document.getElementById('wardrobe');
    outfitItems.forEach(item => {
        wardrobe.innerHTML += `
            <img src="${item.image}" alt="${item.name}" class="wardrobe-item" draggable="true" ondragstart="drag(event)" id="${item.name}">
        `;
    });
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
    var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = "item" + new Date().getTime();
    nodeCopy.classList.add('outfit-item');
    nodeCopy.style.position = 'absolute';
    nodeCopy.style.left = (ev.clientX - ev.target.getBoundingClientRect().left) + 'px';
    nodeCopy.style.top = (ev.clientY - ev.target.getBoundingClientRect().top) + 'px';
    ev.target.appendChild(nodeCopy);
}

function saveOutfit() {
    alert('Your outfit has been saved!');
    updateUserCoins(10); 
}

function showPairingChallenges() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Pairing Challenges</h2>
        <div class="pairing-container">
            <div class="outfit-display">
                <img id="outfit-image" src="" alt="Outfit">
                <p id="outfit-description"></p>
            </div>
            <div class="options-container" id="pairing-options"></div>
        </div>
        <button class="btn" onclick="submitPairing()">Submit Pairing</button>
        <p>Score: <span id="pairing-score">0</span></p>
    `;
    gameArea.classList.remove('hidden');
    loadPairingChallenge();
}

function loadPairingChallenge() {
    if (currentPairingChallenge < pairingChallenges.length) {
        const challenge = pairingChallenges[currentPairingChallenge];
        document.getElementById('outfit-description').textContent = `Pair accessories with: ${challenge.outfit}`;
        document.getElementById('outfit-image').src = challenge.outfitImage;
        const optionsContainer = document.getElementById('pairing-options');
        optionsContainer.innerHTML = '';
        challenge.options.forEach((option, index) => {
            optionsContainer.innerHTML += `
                <label class="pairing-option">
                    <input type="checkbox" value="${index}">
                    <img src="${option.image}" alt="${option.name}">
                    <span>${option.name}</span>
                </label>
            `;
        });
    } else {
        endPairingGame();
    }
}

function submitPairing() {
    const selectedOptions = Array.from(document.querySelectorAll('#pairing-options input:checked')).map(input => parseInt(input.value));
    const challenge = pairingChallenges[currentPairingChallenge];
    
    if (arraysEqual(selectedOptions.sort(), challenge.correct.sort())) {
        score++;
        updateUserCoins(5); 
    }
    
    currentPairingChallenge++;
    loadPairingChallenge();
}

function endPairingGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <h2>Pairing Challenge Complete</h2>
        <p>Your final score is: ${score}</p>
        <button class="btn" onclick="showPairingChallenges()">Play Again</button>
    `;
    updateLeaderboard(score);
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
// function checkGameAvailability(gameId) {
//     const lastPlayed = localStorage.getItem(gameId);
//     if (lastPlayed) {
//         const lastPlayedDate = new Date(parseInt(lastPlayed));
//         const today = new Date();
//         if (lastPlayedDate.toDateString() === today.toDateString()) {
//             document.querySelector(`#${gameId} .overlay`).classList.add('active');
//             document.querySelector(`#${gameId} .btn`).style.pointerEvents = 'none';
//         }
//     }
// }

// function setGamePlayed(gameId) {
//     localStorage.setItem(gameId, Date.now().toString());
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const games = ['predictTrends', 'pairingChallenges', 'styleShowdown'];
//     games.forEach(game => {
//         checkGameAvailability(game);
//         document.querySelector(`#${game} .btn`).addEventListener('click', (e) => {
//             e.preventDefault();
//             setGamePlayed(game);
//             window.location.href = e.target.href;
//         });
//     });
// });

// Initialize the app
signIn();

// function showLeaderboard() {
//     const gameArea = document.getElementById('game-area');
//     gameArea.innerHTML = `
//         <h2>Leaderboard</h2>
//         <ul class="leaderboard-list">
//             <li class="leaderboard-item"><span>1. FashionGuru101</span><span>1000 points</span></li>
//             <li class="leaderboard-item"><span>2. TrendSetter2024</span><span>950 points</span></li>
//             <li class="leaderboard-item"><span>3. StyleMaster</span><span>900 points</span></li>
//             <li class="leaderboard-item"><span>4. ChicExplorer</span><span>850 points</span></li>
//             <li class="leaderboard-item"><span>5. VogueVoyager</span><span>800 points</span></li>
//         </ul>
//     `;
//     gameArea.classList.remove('hidden');
// }








