class GameCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="components/game-card/game-card.css">

            <h3>${this.getAttribute("game-title")}</h3>
            <div id="top-img">
                <img src="images/${this.getAttribute("img-src")}">
            </div>
            <p>${this.getAttribute("desc")}</p>
            <button id="${this.getAttribute("game-title").toLowerCase() + "Button"}">PLAY</button>
        `;

        this.setAttribute("id", this.getAttribute("game-title"));
    }
}

customElements.define("game-card", GameCard);