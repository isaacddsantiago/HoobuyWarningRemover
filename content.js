// Function to remove the risk warning dialog
function removeRiskWarning() {
    const riskWarningDialog = document.querySelector('.el-overlay[style="z-index: 2005;"]');
    if (riskWarningDialog) {
      console.log('Risk warning dialog found and removed');
      riskWarningDialog.remove();
    } else {
      console.log('Risk warning dialog not found');
    }
  }
  
  // Check if the document is already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      removeRiskWarning();
      // Set up a MutationObserver to watch for changes in the DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
          removeRiskWarning();
        });
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
    });
  } else {
    removeRiskWarning();
    // Set up a MutationObserver to watch for changes in the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        removeRiskWarning();
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }
  