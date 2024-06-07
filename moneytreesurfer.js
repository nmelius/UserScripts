// ==UserScript==
// @name         Money Tree Surfer
// @version      1
// @description  Surfing the Money Tree
// @author       Nyjah
// @match        **https://www.neopets.com/donations.phtml**
// ==/UserScript==

(function() {
    const desiredItems = ["Grey Scamander", "Grey Money Tree Plushie"];
          //["Paint Brush", "Codestone", "Morphing Potion", "Transmogrification Potion",
          //                "Thunder Sticks", "Thyoras Tear", "Super Attack Pea", "Wand of the Dark Faerie",
          //                "Void Blade", "Cool Negg", "Blue Negg", "Ferocious Negg", "Ferocious Negg",
          //               "Snegg", "Spiked Negg", "Super Negg", "Sword of Lameness"];

    const collection = document.getElementsByClassName("donated");
    console.log("Length" + collection.length);

    for(let i = collection.length; i >= 0; i--)
    {
        try
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
                if(itemName.includes(desiredItems[x]) && !itemName.includes("Goo") && !itemName.includes("Plushie"))
                {
                    console.log("True");
                    anchorElement.click();
                }
            }
        }
        catch(e)
        {
            console.log("Error");
        }
    }

    setTimeout(function(){
        location.reload();
    }, Math.floor(800 - Math.random() * 600));

})();
