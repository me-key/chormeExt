const DATA = {
  firstName: "Mickey",
  lastName: "Starik",
  email: "mickey.starik@gmail.com",
  phone: "0547213517"
};

chrome.commands.onCommand.addListener((command) => {
  let text = "";

  switch (command) {
    case "insert-first-name":
      text = DATA.firstName;
      break;
    case "insert-last-name":
      text = DATA.lastName;
      break;
    case "insert-email":
      text = DATA.email;
      break;
    case "insert-phone":
      text = DATA.phone;
      break;
    default:
      return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: insertText,
      args: [text]
    });
  });
});

function insertText(text) {
  const el = document.activeElement;
  if (!el) return;

  if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;

    el.value =
      el.value.slice(0, start) +
      text +
      el.value.slice(end);

    el.selectionStart = el.selectionEnd = start + text.length;

    el.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

