document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('toggle-switch');
    const statusLabel = document.getElementById('status-label');
    let isActive = true;
  
    chrome.storage.local.get('isActive', (data) => {
      if (data.isActive === false) {
        isActive = false;
        toggleSwitch.checked = false;
        statusLabel.textContent = 'Activate';
      } else {
        toggleSwitch.checked = true;
        statusLabel.textContent = 'Deactivate';
      }
    });
  
    toggleSwitch.addEventListener('change', () => {
      isActive = toggleSwitch.checked;
      chrome.storage.local.set({ isActive }, () => {
        statusLabel.textContent = isActive ? 'Deactivate' : 'Activate';
        chrome.scripting.executeScript({
          target: { allFrames: true },
          function: setActiveState,
          args: [isActive]
        });
      });
    });
  
    function setActiveState(active) {
      if (active) {
        console.log('Extension activated');
      } else {
        console.log('Extension deactivated');
      }
    }
  });
  