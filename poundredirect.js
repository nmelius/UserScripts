// ==UserScript==
// @name       Neopets Pound Redirect
// @version    1
// @description  Surfing pound for you
// @match    **https://www.neopets.com/quickref.phtml**
// @copyright  2024+, You
// ==/UserScript==
(function() {
    //Initiate Flags
    var totalCount = 0;
    const maxNeopetCount = 20;
    const minNeopointsRequired = 350000;
    var table = document.getElementById("nav");
    var tbodyRowCount = table.tBodies[0].rows.length;

    //Function to randomize values for delay
    function getRandomMillisecond(min, max){
        if(max - min <= 0){
            return 1;
        }
        return Math.floor((Math.random * (max - min)) + min);
    }

    var neopoints = Number((document.getElementById('npanchor').innerHTML).replace(',', ''));
    console.log('Neopoints ' + neopoints);

    for(let i = 0; i < table.tBodies[0].rows.length; i++)
    {
        totalCount += document.getElementById('nav').rows[i].cells.length;
    }
    console.log('Total Neopets Count ' + totalCount);

    if(totalCount < maxNeopetCount && neopoints > minNeopointsRequired)
    {
        setTimeout(window.location.replace("https://www.neopets.com/pound/adopt.phtml"), getRandomMillisecond(900000, 1000000));
    }

})();