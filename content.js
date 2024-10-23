// Function to remove the 'Recent Communities' section and related elements
function removeRecentPages() {
    chrome.storage.sync.get(['enabled'], (result) => {
        if (result.enabled) {
            // Remove <reddit-recent-pages> and the <hr> below it
            const recentPages = document.querySelector('reddit-recent-pages');
            if (recentPages) {
                recentPages.remove();
            }

            const hrElement = document.querySelector('reddit-recent-pages + hr.w-100.my-sm.border-neutral-border-weak');
            if (hrElement) {
                hrElement.remove();
            }

            // Remove <faceplate-loader> that loads the recent section
            const faceplateLoader = document.querySelector('faceplate-loader[name="LeftNavRecentSection_wrMMJh"]');
            if (faceplateLoader) {
                faceplateLoader.remove();
            }
        }
    });
}

// Initial run
removeRecentPages();

// Use MutationObserver to handle dynamic content loading
const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
        removeRecentPages();
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
