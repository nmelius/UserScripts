// ==UserScript==
// @name         Name Checker
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Checks if name(s) are available for Neopet Creation and Create Neopet
// @author       You
// @match        **https://www.neopets.com/reg/page4.phtml**
// ==/UserScript==

(function() {
    var nameFound = false;
    const desiredNames = ["TestName", "", ""];
    var desiredName = null;

    for(let i = 0; i < desiredNames.length; i++)
    {
        document.getElementById('neopet_name').value = desiredNames[i];

        document.getElementById('neopet_name').onblur();

        var buttons = document.querySelectorAll('button');
        var filteredButtons = Array.prototype.filter.call(buttons, function (el) {
            return el.textContent.trim() === 'Create!';
        });

        // Click the adopt button
        filteredButtons[0].click();
    }
})();