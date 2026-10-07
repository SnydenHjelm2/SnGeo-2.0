const driver = async () => {
    let gamesTypes = await req.send("gameTypes");
    for (let type of gamesTypes) {
        let e = document.createElement("game-card");
        e.setAttribute("title", type.title);
        e.setAttribute("img-src", type.src);
        e.setAttribute("desc", type.desc);
        elements.mainDiv.appendChild(e);
    }
}

const elements = {
    mainDiv: document.querySelector("main div")
}

const req = {
    async send(endpoint) {
        let resp = await fetch("http://localhost:8000/" + endpoint);

        if (resp.ok) return resp.json();
        else return {code: resp.status, msg: resp.statusText};
    }
}

driver();