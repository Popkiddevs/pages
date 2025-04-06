const container = document.querySelector('.container');
const pages = document.querySelectorAll('.page');
const numPages = pages.length;
let currentPageIndex = 0;
let isSwiping = false;
let startX;

function updateContainerPosition() {
    container.style.transform = `translateX(-${currentPageIndex * 100}vw)`;
}

function nextPage() {
    if (currentPageIndex < numPages - 1) {
        currentPageIndex++;
        updateContainerPosition();
    }
}

function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        updateContainerPosition();
    }
}

// Touch event listeners for swiping
container.addEventListener('touchstart', (e) => {
    isSwiping = true;
    startX = e.touches[0].clientX;
});

container.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    container.style.transform = `translateX(calc(-${currentPageIndex * 100}vw - ${diffX}px))`;
});

container.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    isSwiping = false;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (diffX > 50) { // Swipe right to left
        nextPage();
    } else if (diffX < -50) { // Swipe left to right
        prevPage();
    } else {
        updateContainerPosition(); // Snap back to the current page
    }
});

// Optional: Add click/arrow key navigation
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'ArrowRight') {
//         nextPage();
//     } else if (e.key === 'ArrowLeft') {
//         prevPage();
//     }
// });

// --- DYNAMIC DATA LOADING (Requires API calls) ---

// Function to fetch GitHub stats (requires a server-side component or a third-party API)
async function fetchGitHubStats(username) {
    // This is a simplified example - you'll likely need to use a backend
    // or a service like GitHub's API (which might have rate limits and require authentication)
    const apiUrl = `https://api.github.com/users/$Popkiddevs`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (response.ok) {
            document.getElementById('github-stats').innerHTML = `
                <p>Public Repositories: ${data.public_repos}</p>
                <p>Followers: ${data.followers}</p>
                <p>Following: ${data.following}</p>
            `;
            // You would need a more complex way to determine "level" based on GitHub activity
            document.getElementById('github-level').textContent = "Level: Enthusiast (Example)";
        } else {
            document.getElementById('github-stats').textContent = "Failed to fetch GitHub stats.";
            document.getElementById('github-level').textContent = "";
        }
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        document.getElementById('github-stats').textContent = "Error fetching GitHub stats.";
        document.getElementById('github-level').textContent = "";
    }
}

// Call the function with your GitHub username
fetchGitHubStats('Popkiddevs');

// You would need similar JavaScript functions to:
// 1. Dynamically load friend data and images (potentially from a data source).
// 2. Handle form submissions for the email page (requires backend).
