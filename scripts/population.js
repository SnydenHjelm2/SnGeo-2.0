const population = {
    create() {
        let gameType = gameTypes.find(x => x.title === "Population");
        elements.gameH2.textContent = gameType.title;
        elements.gameDesc.textContent = gameType.desc;
        elements.gameHelp.textContent = "Select a country or make the game select for you!";

        let randomButton = document.createElement("button");
        randomButton.classList.add("random");
        randomButton.textContent = "Random Country";
        elements.gameControls.appendChild(randomButton);
        randomButton.addEventListener("click", () => {this.spawn(true)});

        let allCountries = document.createElement("select");
        elements.gameControls.appendChild(allCountries);
        let startingOpt = document.createElement("option");
        startingOpt.value = "";
        startingOpt.textContent = "Select Country";
        allCountries.appendChild(startingOpt);
        for (let country of countries.table) {
            let opt = document.createElement("option");
            opt.value = country.alias;
            opt.textContent = `${country.name} ${country.flag} (${country.alias})`;
            allCountries.appendChild(opt);
        }
    },

    driver() {
        elements.populationButton.addEventListener("click", () => {this.initiate()});
    },

    initiate() {
        empty.game();
        hide.main();
        show.game();
        
        this.create();
    },

    numbers(pop) {
        console.log(pop);
        pop = pop * 1000;
        let popString = pop.toString();
        let popObj = {fullPop: pop};

        switch (popString.length) {
            case 4: 
                popObj.shortPop = `${popString[0]}.${popString[1]}k`;
                return popObj;

            case 5:
                popObj.shortPop = `${popString[0]}${popString[1]}k`;
                return popObj;

            case 6:
                popObj.shortPop = `${popString[0]}${popString[1]}${popString[3]}k`;
                return popObj;
                
            case 7:
                popObj.shortPop = `${popString[0]}.${popString[1]}m`;
                return popObj;

            case 8:
                popObj.shortPop = `${popString[0]}${popString[1]}.${popString[2]}m`;
                return popObj;

            case 9:
                popObj.shortPop = `${popString[0]}${popString[1]}${popString[2]}.${popString[3]}m`;
                return popObj;
            
            case 10:
                popObj.shortPop = `${popString[0]}.${popString[1]}b`;
                return popObj;
        }
    },

    async spawn(random, selected) {
        if (random) {
            let country = countries.random();
            let countryFromApi = await req.api(country.alias);
            let population = this.numbers(countryFromApi[0].population);
            console.log(countryFromApi);
            console.log(population);
        }
    }
}

population.driver();