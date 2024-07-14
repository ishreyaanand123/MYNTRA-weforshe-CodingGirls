document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const questions = [
        {
            question: "Which accessory best complements a little black dress?",
            options: ["Pearl Necklace", "Chunky Sneakers", "Denim Jacket", "Baseball Cap"],
            correct: 0
        },
        {
            question: "What shoe style pairs well with wide-leg trousers?",
            options: ["Flip Flops", "Ankle Boots", "Platform Heels", "Running Shoes"],
            correct: 2
        },
        {
            question: "Which bag type goes best with a formal suit?",
            options: ["Backpack", "Clutch", "Tote Bag", "Fanny Pack"],
            correct: 1
        },
        {
            question: "What jewelry complements a bohemian-style outfit?",
            options: ["Diamond Studs", "Layered Necklaces", "Tennis Bracelet", "Minimalist Watch"],
            correct: 1
        },
        {
            question: "Which scarf style pairs well with a leather jacket?",
            options: ["Silk Square Scarf", "Chunky Knit Scarf", "Bandana", "Pashmina"],
            correct: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function displayQuestion() {
        const question = questions[currentQuestion];
        gameArea.innerHTML = `
            <div class="question">
                <h2>Question ${currentQuestion + 1}/${questions.length}</h2>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <div class="option" onclick="selectOption(${index})">${option}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    window.selectOption = (index) => {
        if (index === questions[currentQuestion].correct) {
            score++;
            alert("Great pairing!");
        } else {
            alert("Not quite. The best pairing was: " + questions[currentQuestion].options[questions[currentQuestion].correct]);
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            gameArea.innerHTML = `<h2>Challenge Complete!</h2><p>You've completed all pairings.</p><p>Your score: ${score}/${questions.length}</p>`;
        }
    };

    displayQuestion();
});