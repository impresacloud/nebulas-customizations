// ==UserScript==
// @name         Select All Text in All Input Fields on Focus
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  ImpresaCloud: Automatically select all text on input field focus, with delay and debugging
// @author       Jack arru
// @match        https://app.impresacloud.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Helper function to select all text in the input field with a delay
    function handleFocus(event) {
        const target = event.target;
        //console.log("Focus event triggered on:", target); // Log focus event

        setTimeout(() => {
            //console.log("Timeout triggered, checking if still focused on:", target); // Log timeout
            if (document.activeElement === target) {
                //console.log("Selecting all text in:", target); // Log selection
                target.select();
            }
        }, 100); // 100ms delay
    }

    // MutationObserver to monitor the DOM for new input fields
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const inputs = node.querySelectorAll('input');
                    inputs.forEach((input) => {
                        //console.log("New input field added:", input); // Log new input field
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
        //console.log("Setting up focus listener for existing input field:", input); // Log initial setup
        input.addEventListener('focus', handleFocus);
    });
})();
