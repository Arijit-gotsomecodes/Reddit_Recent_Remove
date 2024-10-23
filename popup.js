document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');

    // Load the current state of the toggle from storage
    chrome.storage.sync.get(['enabled'], (result) => {
        toggle.checked = result.enabled !== undefined ? result.enabled : true; // Default to true
    });

    // Update the state when the toggle is changed
    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        chrome.storage.sync.set({ enabled: isEnabled }, () => {
            console.log('Toggle state saved:', isEnabled);
        });

        // Send a message to content.js to refresh the visibility
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'refreshPage' });
        });
    });
});
