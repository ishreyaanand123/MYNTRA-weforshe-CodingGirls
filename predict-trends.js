document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const questions = [
        {
            question: "Which color trend will dominate next season?",
            options: ["Neon Green", "Pastel Blue", "Earth Tones", "Metallic Silver"],
            correct: 2
        },
        {
            question: "What accessory trend is likely to make a comeback?",
            options: ["Chokers", "Oversized Sunglasses", "Anklets", "Pocket Watches"],
            correct: 1
        },
        {
            question: "Which fabric will be most popular in upcoming fashion shows?",
            options: ["Velvet", "Denim", "Silk", "Recycled Plastics"],
            correct: 3
        },
        {
            question: "What style of jeans will be trending next?",
            options: ["Skinny", "Flare", "Boyfriend", "Low-Rise"],
            correct: 1
        },
        {
            question: "Which outerwear piece will be a must-have next winter?",
            options: ["Puffer Jackets", "Trench Coats", "Leather Jackets", "Cape Coats"],
            correct: 3
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
            alert("Correct!");
        } else {
            alert("Incorrect. The correct answer was: " + questions[currentQuestion].options[questions[currentQuestion].correct]);
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            gameArea.innerHTML = `<h2>Game Over!</h2><p>You've completed all questions.</p><p>Your score: ${score}/${questions.length}</p>`;
        }
    };

    displayQuestion();
});