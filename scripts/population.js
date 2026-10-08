const population = {
    async driver() {
        await initialize;
        elements.populationButton.addEventListener("click", () => {
            hide.main();
            show.game();
        })
    }
}

population.driver();