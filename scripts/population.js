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
    }
}

population.driver();