class GameCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/game-card/game-card.css">

            <h3>${this.getAttribute("title")}</h3>
            <div id="top-img">
                <img src="images/${this.getAttribute("img-src")}">
            </div>
            <p>${this.getAttribute("desc")}</p>
            <button>PLAY</button>
        `;
    }
}

customElements.define("game-card", GameCard);