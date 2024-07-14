document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    
    // Generate mock data for the leaderboard
    const leaderboardData = Array.from({length: 50}, (_, i) => ({
        rank: i + 1,
        username: `Player${Math.floor(Math.random() * 1000)}`,
        score: Math.floor(Math.random() * 1000)
    })).sort((a, b) => b.score - a.score);

    // Assign ranks based on sorted scores
    leaderboardData.forEach((player, index) => {
        player.rank = index + 1;
    });

    function displayLeaderboard() {
        gameArea.innerHTML = `
            <h2>Top 50 Players</h2>
            <table class="leaderboard">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    ${leaderboardData.map(player => `
                        <tr>
                            <td>${player.rank}</td>
                            <td>${player.username}</td>
                            <td>${player.score}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    displayLeaderboard();
});