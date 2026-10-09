const area = {
    driver() {
        elements.areaButton.addEventListener("click", () => {
            hide.main();
            show.game();
        })
    }
}

area.driver();