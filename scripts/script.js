const driver = async () => {
    let gamesTypes = await req.send("gameTypes");
    for (let type of gamesTypes) {
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

    main: document.querySelector("main"),

    mainDiv: document.querySelector("main div")
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

    async send(endpoint) {
        let resp = await fetch("http://localhost:8000/" + endpoint);

        if (resp.ok) return resp.json();
        else return {code: resp.status, msg: resp.statusText};
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

const initialize = driver();