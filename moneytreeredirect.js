// ==UserScript==
// @name         Money Tree Redirect
// @version      1
// @description  Redirect to Money Tree
// @author       Nyjah
// @match        **https://www.neopets.com/takedonation_new.phtml?donation_id=**
// @grant        none
// ==/UserScript==

(function() {
    setTimeout(window.location.replace("https://www.neopets.com/donations.phtml"), 2000000);
})();