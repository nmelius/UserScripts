// ==UserScript==
// @name         Money Tree Surfer
// @version      1
// @description  Surfing the Money Tree
// @author       Nyjah
// @match        **https://www.neopets.com/donations.phtml**
// ==/UserScript==

(function() {
    const desiredItems = ["Paint Brush", "Codestone", "Morphing Potion", "Transmogrification Potion", "Thunder Sticks", "Thyoras Tear", "Super Attack Pea", "Wand of the Dark Faerie", "Void Blade"];

    const collection = document.getElementsByClassName("donated");

    console.log("Length" + collection.length);

    for(let i = 19; i >= 0; i--)
    {
        let item = collection[i];
        console.log(item);
        const anchorElement = item.querySelector('a');
        const page = anchorElement.href;
        console.log(page);

        const anchorDiv = anchorElement.getElementsByClassName("item-name");
        const itemName = anchorDiv[0].innerHTML;
        console.log(itemName);

        for(let x = 0; x < desiredItems.length; x++)
        {
            if(itemName.includes(desiredItems[x]))
            {
                console.log("TRUEEEEE");
                anchorElement.click();
            }
        }
    }

    setTimeout(function(){
        location.reload();
    }, Math.floor(3200 - Math.random() * 3000));

})();