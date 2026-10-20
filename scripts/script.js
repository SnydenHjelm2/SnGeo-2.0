const driver = () => {
    for (let type of gameTypes) {
        let e = document.createElement("game-card");
        e.setAttribute("game-title", type.title);
        e.setAttribute("img-src", type.src);
        e.setAttribute("desc", type.desc);
        elements.mainDiv.appendChild(e);

        elements[type.title.toLowerCase() + "Button"] = e.shadowRoot.children[4];
    }
}

const elements = {
    game: document.querySelector("#game"),

    gameControls: document.querySelector("#game #controls"),

    gameDesc: document.querySelector("#game #desc"),

    gameField: document.querySelector("#game #field"),

    gameH2: document.querySelector("#game h2"),

    gameHelp: document.querySelector("#game #help"),

    main: document.querySelector("main"),

    mainDiv: document.querySelector("main div")
}

const empty = {
    game() {
        elements.gameControls.innerHTML = "";
        elements.gameField.innerHTML = "";
    }
}

const hide = {
    game() {
        elements.game.style.display = "none";
    },

    main() {
        elements.main.style.display = "none";
    }
}

const req = {
    async api(country) {
        let apiKey = await this.send("key");

        let request =  new Request(`https://api.api-ninjas.com/v1/country?name=${country}`, {
            headers: {"X-Api-key": apiKey}
        });

        let resp = await fetch(request);
        if (resp.ok) {
            let reso = await resp.json();
            return reso;
        } else {
            console.log({code: resp.status, msg: resp.statusText});
        }
    },

    async send(endpoint, method, body = null) {
        let options = {
            method: method,
            headers: {"Content-Type": "application/json"}
        }
        if (body !== null) options.body = JSON.stringify(body);
        let request = new Request("http://localhost:8000/" + endpoint, options);

        let resp = await fetch(request);
        let reso = await resp.json();
        return reso;
    }
}

const show = {
    game() {
        elements.game.style.display = "block";
    },

    main() {
        elements.main.style.display = "flex";
    }
}

driver();