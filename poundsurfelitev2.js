// ==UserScript==
// @name       Neopets Pound Surf Elite
// @version    2
// @description  Surfing pound for you
// @match    **https://www.neopets.com/pound/get_adopt.phtml**
// @match    **https://www.neopets.com/pound/adopt.phtml**
// @copyright  2024+, You
// ==/UserScript==
(function() {
    //Initiate Flags
    var refreshEnabled = true;
    var autoAdoptEnabled = true;
    var petFound = false;
    var selectedPet = null;
    var regexEnabled = true;

    //Maps for Value mapping
    const targetAdoptionFee = new Map([
        [5000, 1],
        [10000, 2],
        [50000, 5],
        [100000, 10],
        [200000, 15],
        [300000, 30],
    ]);

    const targetLevel = new Map([
        [50, 1],
        [100, 3],
        [150, 5],
        [200, 20],
        [250, 30],
    ]);

    const targetStrength = new Map([
        [200, 1],
        [300, 3],
        [400, 5],
        [500, 30],
    ]);

    const targetDefence = new Map([
        [200, 1],
        [300, 3],
        [400, 5],
        [500, 30],
    ]);

    const targetSpecies = new Map([
        ["Draik", 15],
        //["Chomby", 10],
    ]);

    const targetColors = new Map([
        //["Baby", 1],
        ["Darigan", 10],
        ["Invisible", 1],
        ["Maraquan", 2],
        ["Mosaic", 2],
        ["Mutant", 10],
        ["Pastel", 10],
        ["Plushie", 10],
        ["Robot", 30],
        ["Transparent", 5],
        ["Wraith", 3],
        ["Faerie", 5],
        ["Toy", 3],
        ["Burlap", 30],
        ["Alien", 30],
    ]);

    const blacklist = new Map([
        //["Ohyq", 1],
        //["Quinfray", 1],
        //["Tucman", 1],
        //["GoldenDomer", 1],
        //["Flora144561", 1],
        //["Manifcint", 1],
        ["TempName", 1],
    ]);

    const blacklistSpecies = new Map([
        ["Lenny", 1],
        ["Moehog", 1],
    ]);

    const blacklistColors = new Map([
        ["Pirate", 1],
    ]);

    //Event Listener and Function for forcing Pause on auto refresh loop
    document.addEventListener('keydown', keyPressed);

    function keyPressed(e) {
        if(e.code == "Enter") {
            alert("New Pet found");
        }
    }

    //Initiate Pets
    let pet0 = null;
    let pet1 = null;
    let pet2 = null;

    //Pet object
    function Pet(adoptionFee, color, species, level, strength, defence, div, name)
    {
        this.adoptionFee = adoptionFee;
        this.color = color;
        this.species = species;
        this.level = level;
        this.strength = strength;
        this.defence = defence;
        this.div = div;
        this.name = name;
        this.petValue = 0;
    }

    //Function to calculate Pet Value
    function calculatePetValue(pet)
    {
        console.log('Calculating Pet Value');
        let totalValue = 0;
        pet.petValue = totalValue;

        let adoptionFeeValue = 0;
        let levelValue = 0;
        let strengthValue = 0;
        let defenceValue = 0;

        if(pet.adoptionFee < 5000)
        {
            adoptionFeeValue = 0;
        }
        else if(pet.adoptionFee == 5000)
        {
            adoptionFeeValue = 5000;
        }
        else if(pet.adoptionFee <= 10000)
        {
            adoptionFeeValue = 10000;
        }
        else if(pet.adoptionFee <= 50000)
        {
            adoptionFeeValue = 50000;
        }
        else if(pet.adoptionFee <= 100000)
        {
            adoptionFeeValue = 100000;
        }
        else if(pet.adoptionFee <= 200000)
        {
            adoptionFeeValue = 200000;
        }
        else if(pet.adoptionFee >= 300000)
        {
            adoptionFeeValue = 300000;
        }

        if(!targetAdoptionFee.has(adoptionFeeValue))
        {
            totalValue += 0;
        }
        else
        {
            totalValue += targetAdoptionFee.get(adoptionFeeValue);
        }

        if(pet.level < 50)
        {
            levelValue = 0;
        }
        else if(pet.level == 50)
        {
            levelValue = 50;
        }
        else if(pet.level <= 100)
        {
            levelValue = 100;
        }
        else if(pet.level <= 150)
        {
            levelValue = 150;
        }
        else if(pet.level <= 200)
        {
            levelValue = 200;
        }
        else if(pet.level >= 250)
        {
            levelValue = 250;
        }

        if(!targetLevel.has(levelValue))
        {
            totalValue += 0;
        }
        else
        {
            totalValue += targetLevel.get(levelValue);
        }

        if(pet.strength < 200)
        {
            strengthValue = 0;
        }
        else if(pet.strength == 200)
        {
            strengthValue = 200;
        }
        else if(pet.strength <= 300)
        {
            strengthValue = 300;
        }
        else if(pet.strength <= 400)
        {
            strengthValue = 400;
        }
        else if(pet.strength >= 500)
        {
            strengthValue = 500;
        }

        if(!targetStrength.has(strengthValue))
        {
            totalValue += 0;
        }
        else
        {
            totalValue += targetStrength.get(strengthValue);
        }

        if(pet.defence < 200)
        {
            defenceValue = 0;
        }
        else if(pet.defence == 200)
        {
            defenceValue = 200;
        }
        else if(pet.defence <= 300)
        {
            defenceValue = 300;
        }
        else if(pet.defence <= 400)
        {
            defenceValue = 400;
        }
        else if(pet.defence >= 500)
        {
            defenceValue = 500;
        }

        if(!targetDefence.has(defenceValue))
        {
            totalValue += 0;
        }
        else
        {
            totalValue += targetDefence.get(defenceValue);
        }

        if(!targetSpecies.has(pet.species))
        {
            totalValue += 0;
        }
        else
        {
            totalValue += targetSpecies.get(pet.species);
        }

        if(!targetColors.has(pet.color))
        {
            totalValue += 0;
        }
        else
        {
            totalValue += targetColors.get(pet.color);
        }

        if((blacklist.has(pet.name) || blacklistSpecies.has(pet.species) || blacklistColors.has(pet.colors)) && totalValue < 20)
        {
            totalValue = 0;
        }

        if(regexEnabled && totalValue < 20)
        {
            var nameRegex = /^[a-zA-Z]*$/g;
            if(!nameRegex.test(pet.name)){
                totalValue = 0;
            }
        }

        pet.petValue = totalValue;
        console.log('Pet: ' + pet.div + ' PetValue: ' + pet.petValue);
    }

    //Function to randomize values for delay
    function getRandomMillisecond(min, max){
        if(max - min <= 0){
            return 1;
        }
        return Math.floor((Math.random * (max - min)) + min);
    }

    //Function to select desired Pet div element
    function selectDiv(div){
        document.getElementById(div).click();
    }

    //Function to select the Adopt Button
    function pressAdopt(){
        if(document.body.innerHTML.indexOf('processAdoptBtn') != -1){
            document.getElementById('processAdoptBtn').click();
        }
    }

    //Function to select the Okay button
    function pressOkay(){
        document.querySelector(".button-green__2020").click();
    }

    //Function to check for pet existence and load pet values
    function loadPets(){
        if(document.body.innerHTML.indexOf('pet0_name') != -1){
            pet0 = new Pet(document.getElementById('pet0_price').innerHTML,
                           document.getElementById('pet0_color').innerHTML,
                           document.getElementById('pet0_species').innerHTML,
                           document.getElementById('pet0_level').innerHTML,
                           document.getElementById('pet0_str').innerHTML,
                           document.getElementById('pet0_def').innerHTML,
                           'pet0',
                           document.getElementById('pet0_name').innerHTML);
            calculatePetValue(pet0);

        }
        if(document.body.innerHTML.indexOf('pet1_name') != -1){
            pet1 = new Pet(document.getElementById('pet1_price').innerHTML,
                           document.getElementById('pet1_color').innerHTML,
                           document.getElementById('pet1_species').innerHTML,
                           document.getElementById('pet1_level').innerHTML,
                           document.getElementById('pet1_str').innerHTML,
                           document.getElementById('pet1_def').innerHTML,
                           'pet1',
                           document.getElementById('pet1_name').innerHTML);
            calculatePetValue(pet1);

        }
        if(document.body.innerHTML.indexOf('pet2_name') != -1){
            pet2 = new Pet(document.getElementById('pet2_price').innerHTML,
                           document.getElementById('pet2_color').innerHTML,
                           document.getElementById('pet2_species').innerHTML,
                           document.getElementById('pet2_level').innerHTML,
                           document.getElementById('pet2_str').innerHTML,
                           document.getElementById('pet2_def').innerHTML,
                           'pet2',
                           document.getElementById('pet2_name').innerHTML);
            calculatePetValue(pet2);

        }
    }

    //Start Script
    loadPets();

    //Determine most valuable pet if found
    if(pet0 != null)
    {
        if(pet0.petValue > 0)
        {
            petFound = true;
            selectedPet = pet0.div;
        }
    }

    if(pet1 != null)
    {
        if(pet1.petValue > 0 && petFound == true)
        {
            if(pet1.petValue > pet0.petValue)
            {
                selectedPet = pet1.div;
            }
        }
        else if(pet1.petValue > 0)
        {
            petFound = true;
            selectedPet = pet1.div;
        }
    }

    if(pet2 != null)
    {
        if(pet2.petValue > 0 && petFound == true)
        {
            if(selectedPet == 'pet0')
            {
                if(pet2.petValue > pet0.petValue)
                {
                    selectedPet = pet2.div;
                }
            }
            else if(selectedPet == 'pet1')
            {
                if(pet2.petValue > pet1.petValue)
                {
                    selectedPet = pet2.div;
                }
            }
        }
        else if(pet2.petValue > 0)
        {
            petFound = true;
            selectedPet = pet2.div;
        }
    }

    //If pet found, start adoption sequence
    if(petFound)
    {
        setTimeout(selectDiv(selectedPet), getRandomMillisecond(1000, 3000));

        setTimeout(pressAdopt(), getRandomMillisecond(2000, 3000));

        //Auto adopt if flag enabled
        if(autoAdoptEnabled){
            setTimeout(pressOkay(), getRandomMillisecond(4000, 5000));
        }
    }

    //Auto refresh if flag enabled
    if(refreshEnabled)
    {
        if(petFound != true)
        {
            setTimeout(function(){
                location.reload();
            }, Math.floor(3200 - Math.random() * 3000));
        }
    }
})();
