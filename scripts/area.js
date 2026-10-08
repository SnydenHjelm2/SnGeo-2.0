const area = {
    async driver() {
        await initialize;
        elements.areaButton.addEventListener("click", () => {
            hide.main();
            show.game();
        })
    }
}

area.driver();