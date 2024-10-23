// Function to toggle the visibility of the 'Recent Communities' section
function toggleRecentPages(shouldShow) {
    const recentPages = document.querySelector('reddit-recent-pages');
    if (recentPages) {
        recentPages.style.display = shouldShow ? 'block' : 'none'; // Show or hide based on the toggle state
    }
}

// Load the current state and set visibility accordingly
chrome.storage.sync.get(['enabled'], (result) => {
    const isEnabled = result.enabled !== undefined ? result.enabled : true; // Default to true
    toggleRecentPages(isEnabled); // Set initial visibility
});

// Use MutationObserver to handle dynamic content loading
const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
        const recentPages = document.querySelector('reddit-recent-pages');
        if (recentPages) {
            chrome.storage.sync.get(['enabled'], (result) => {
                const isEnabled = result.enabled !== undefined ? result.enabled : true; // Default to true
                toggleRecentPages(isEnabled); // Update visibility based on toggle state
            });
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'refreshPage') {
        // Re-check the toggle state and update visibility
        chrome.storage.sync.get(['enabled'], (result) => {
            const isEnabled = result.enabled !== undefined ? result.enabled : true; // Default to true
            toggleRecentPages(isEnabled);
        });
    }
});
