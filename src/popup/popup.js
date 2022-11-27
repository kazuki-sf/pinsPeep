"use strict";

window.onload = () => {
    document.getElementById("search_input").focus();
}

document.getElementById("see_on_pinterest").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: 'pins_peep' });
}, false);

document.getElementById("search_input").addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
        const query = document.getElementById("search_input").value;
        chrome.runtime.sendMessage({ action: 'search_on_pinterest', data: query });
    }
}, false);