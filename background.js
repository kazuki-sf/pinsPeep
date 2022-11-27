"use strict";

console.log("connected...");
const onInstallURL = "https://www.notion.so/Pins-Peep-3a3c25ac99844402a2b38e6f0e21d77d";

// On Chrome Install
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.tabs.create({ url: onInstallURL });
    }
});

// Runtime Message Listener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action && request.action == "pins_peep") {
        peepPins();
        sendResponse();
    } else if (request.action && request.action == "search_on_pinterest") {
        searchOnPinterest(request.data);
        sendResponse();
    }
});

// Context Menu Listeners
chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({ id: 'search', title: "Search on Pinterest", contexts: ["selection"] });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "search") {
        info.linkUrl ? peepPins(info.linkUrl) : searchOnPinterest(info.selectionText);
    }
});

// Functions
function peepPins(url_context) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = (url_context !== undefined) ? new URL(url_context) : new URL(tabs[0].url);
        const openURL = `https://www.pinterest.com/search/pins/?q=${url.href}`;
        chrome.tabs.create({ url: openURL });
    });
}

function searchOnPinterest(searchTerm) {
    const openURL = `https://www.pinterest.com/search/pins/?q=${searchTerm}`;
    chrome.tabs.create({ url: openURL });
}