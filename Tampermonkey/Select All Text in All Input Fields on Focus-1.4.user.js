// ==UserScript==
// @name         Select All Text in All Input Fields on Focus
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  ImpresaCloud: Automatically select all text on input field focus
// @author       Jack arru
// @match        https://app.impresacloud.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Helper function to handle focus event with 100ms delay
    function handleFocus(event) {
        // Add a 100ms delay before selecting all text
        setTimeout(() => {
            event.target.select();
        }, 100);
    }

    // MutationObserver to monitor the DOM for new input fields
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if the added node or its children are input fields
                    const inputs = node.querySelectorAll('input');
                    inputs.forEach((input) => {
                        input.addEventListener('focus', handleFocus);
                    });
                }
            });
        });
    });

    // Start observing the body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Initial setup for existing input fields
    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('focus', handleFocus);
    });
})();
