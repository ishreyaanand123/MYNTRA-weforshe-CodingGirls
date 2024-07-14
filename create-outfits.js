document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const questions = [
        {
            question: "Create an outfit for a summer beach party",
            options: ["Sundress", "Flip-flops", "Sun hat", "Denim shorts"],
            correct: [0, 1, 2]
        },
        {
            question: "Assemble a business casual look",
            options: ["Blazer", "Jeans", "Dress shirt", "Sneakers"],
            correct: [0, 2]
        },
        {
            question: "Design an outfit for a winter wonderland",
            options: ["Puffer jacket", "Beanie", "Shorts", "Snow boots"],
            correct: [0, 1, 3]
        },
        {
            question: "Put together a trendy streetwear look",
            options: ["Oversized hoodie", "Cargo pants", "High heels", "Snapback cap"],
            correct: [0, 1, 3]
        },
        {
            question: "Create a chic evening outfit",
            options: ["Cocktail dress", "Statement necklace", "Stilettos", "Denim jacket"],
            correct: [0, 1, 2]
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function displayQuestion() {
        const question = questions[currentQuestion];
        gameArea.innerHTML = `
            <div class="question">
                <h2>Outfit Challenge ${currentQuestion + 1}/${questions.length}</h2>
                <p>${question.question}</p>
                <div class="options">
                    ${question.options.map((option, index) => `
                        <div class="option" onclick="toggleOption(${index})">${option}</div>
                    `).join('')}
                </div>
                <button class="submit-button" onclick="submitOutfit()">Submit Outfit</button>
                <div id="message"></div>
            </div>
        `;
        addButtonStyles();
        addOptionStyles();
    }

    function addButtonStyles() {
        const button = document.querySelector('.submit-button');
        button.style.padding = "10px 20px";
        button.style.fontSize = "16px";
        button.style.color = "#fff";
        button.style.backgroundColor = "#ff3f6c";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.marginTop = "20px";
    }

    function addOptionStyles() {
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.padding = "10px";
            option.style.border = "1px solid #ccc";
            option.style.borderRadius = "5px";
            option.style.cursor = "pointer";
            option.style.marginBottom = "10px";
        });
    }

    let selectedOptions = [];

    window.toggleOption = (index) => {
        const optionElement = document.querySelectorAll('.option')[index];
        if (selectedOptions.includes(index)) {
            selectedOptions = selectedOptions.filter(i => i !== index);
            optionElement.classList.remove('selected');
        } else {
            selectedOptions.push(index);
            optionElement.classList.add('selected');
        }
    };

    window.submitOutfit = () => {
        const correctOptions = questions[currentQuestion].correct;
        const isCorrect = correctOptions.every(i => selectedOptions.includes(i)) && selectedOptions.length === correctOptions.length;
        const messageElement = document.getElementById('message');

        if (isCorrect) {
            score++;
            messageElement.textContent = "Great outfit creation!";
            messageElement.style.color = "green";
        } else {
            messageElement.textContent = "Not quite right. Try again!";
            messageElement.style.color = "red";
        }

        setTimeout(() => {
            currentQuestion++;
            selectedOptions = [];
            if (currentQuestion < questions.length) {
                displayQuestion();
            } else {
                gameArea.innerHTML = `<h2>Challenge Complete!</h2><p>You've created all outfits.</p><p>Your score: ${score}/${questions.length}</p>`;
            }
        }, 2000); // Delay for 2 seconds before moving to the next question
    };

    displayQuestion();
});

// Add this CSS to your styles
const style = document.createElement('style');
style.innerHTML = `
    .option.selected {
        box-shadow: 0 0 10px red;
    }
`;
document.head.appendChild(style);
