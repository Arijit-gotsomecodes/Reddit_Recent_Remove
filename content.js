// Function to remove the 'Recent Communities' section
function removeRecentPages() {
    chrome.storage.sync.get(['enabled'], (result) => {
        if (result.enabled) {
            const recentPages = document.querySelector('reddit-recent-pages');
            if (recentPages) {
                recentPages.remove();
            }

            const hrElement = document.querySelector('hr.w-100.my-sm.border-neutral-border-weak');
            if (hrElement) {
                hrElement.remove();
            }
        }
    });
}

// Initial run
removeRecentPages();

// Use MutationObserver to handle dynamic content
const observer = new MutationObserver(removeRecentPages);
observer.observe(document.body, { childList: true, subtree: true });
