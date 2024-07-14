document.addEventListener('DOMContentLoaded', () => {
    const accessories = document.querySelectorAll('.accessory');
    let selectedAccessories = {};

    // Define correct pairings (this could be dynamic based on the outfit)
    const correctPairings = {
        bag: 'Brown designer bag',
        shoes: 'Black Heels',
        jewel: 'Golden necklace'
    };

    accessories.forEach(accessory => {
        accessory.addEventListener('click', () => {
            const type = accessory.getAttribute('data-type');
            const accessoryName = accessory.getAttribute('data-accessory');
            selectedAccessories[type] = accessoryName;
            console.log(`Selected ${type}: ${accessoryName}`);
            accessories.forEach(acc => {
                if (acc.getAttribute('data-type') === type) {
                    acc.classList.remove('selected');
                }
            });
            accessory.classList.add('selected');
        });
    });

    document.getElementById('submit').addEventListener('click', () => {
        const requiredAccessoryTypes = ['bag', 'shoes', 'jewelry'];
        const selectedAccessoryTypes = Object.keys(selectedAccessories);

        if (selectedAccessoryTypes.length !== requiredAccessoryTypes.length) {
            document.getElementById('result').innerText = 'Please select one of each accessory type.';
            return;
        }

        let totalCoins = 0;
        let correctCount = 0;
        let resultText = 'You selected accessories:\n';

        for (const type of requiredAccessoryTypes) {
            const selected = selectedAccessories[type];
            resultText += `${type.charAt(0).toUpperCase() + type.slice(1)} - ${selected}\n`;

            if (selected === correctPairings[type]) {
                totalCoins += 5; // 5 coins for a perfect match
                correctCount++;
            } else {
                totalCoins += 2; // 2 coins for participating
            }
        }

        // Build the result text
        resultText += `\nYou earned ${totalCoins} coins!\n`;
        resultText += `You got ${correctCount} out of 3 pairings correct!\n`;

        // Performance message
        let performanceMessage;
        if (totalCoins === 15) {
            performanceMessage = "Perfect pairing! You're a fashion expert!";
        } else if (totalCoins > 6) {
            performanceMessage = "Good effort! You have a great sense of style.";
        } else {
            performanceMessage = "Nice try! Keep exploring different fashion combinations.";
        }
        resultText += `Performance: ${performanceMessage}\n`;

        // Additional feedback on pairing
        // let feedbackText = '';
        // for (const type of requiredAccessoryTypes) {
        //     if (selectedAccessories[type] !== correctPairings[type]) {
        //         feedbackText += `\nTip: For the ${type}, ${correctPairings[type]} might be a better match.`;
        //     }
        // }
        // if (feedbackText) {
        //     resultText += `\nStyling Tips:${feedbackText}`;
        // }

        // Update result text on the page
        document.getElementById('result').innerText = resultText;
    });
});
