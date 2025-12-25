chrome.commands.onCommand.addListener((command) => {
  if (command === "insert-phone") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: insertPhone
      });
    });
  }
});

function insertPhone() {
  const phone = "0547213517";
  const el = document.activeElement;

  if (!el) return;

  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    el.focus();
    el.value += phone;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

