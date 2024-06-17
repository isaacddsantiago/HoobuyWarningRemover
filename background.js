chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isActive: true }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      }, () => {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateIcon(tab.url);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateIcon(tab.url);
  });
});

function updateIcon(url) {
  if (url.includes('hoobuy.com')) {
    chrome.action.setIcon({
      path: {
        "16": "icon16.png",
        "48": "icon48.png",
        "128": "icon128.png"
      }
    });
  } else {
    chrome.action.setIcon({
      path: {
        "16": "icon16_bw.png",
        "48": "icon48_bw.png",
        "128": "icon128_bw.png"
      }
    });
  }
}
