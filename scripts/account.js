const account = {
    driver() {
        this.hide(this.elements.profileButton);
        this.hide(this.elements.logOutButton);
        this.hide(this.elements.overlay);
        this.empty();

        this.elements.back.addEventListener("click", () => {
            this.hide(this.elements.overlay);
            this.empty();
        });

        this.elements.signUpButton.addEventListener("click", () => {
            this.show(this.elements.overlay, "flex");
            this.elements.overlayH2.textContent = "Sign Up";
        });

        this.elements.logInButton.addEventListener("click", () => {
            this.show(this.elements.overlay, "flex");
            this.elements.overlayH2.textContent = "Log In";
        });

        this.elements.logOutButton.addEventListener("click", () => {
            store.reset();
            this.elements.accountP.textContent = "Currently not logged in";
            this.hide(this.elements.logOutButton);
            this.hide(this.elements.profileButton);
            this.show(this.elements.logInButton, "inline");
            this.show(this.elements.signUpButton, "inline");
        });

        this.elements.submit.addEventListener("click", this.submit);
    },

    elements: {
        accountP: document.querySelector("#account p"),

        back: document.querySelector("#back"),

        logInButton: document.querySelector("#log-in"),

        logOutButton: document.querySelector("#log-out"),

        overlay: document.querySelector("#account-overlay"),

        overlayDiv: document.querySelector("#overlay-div"),

        overlayH2: document.querySelector("#overlay-div h2"),

        profileButton: document.querySelector("#profile"),

        pwd: document.querySelector("#pwd"),

        signUpButton: document.querySelector("#sign-up"),

        status: document.querySelector("#status"),

        submit: document.querySelector("#submit"),

        username: document.querySelector("#username")
    },

    empty() {
        this.elements.username.value = "";
        this.elements.pwd.value = "";
    },

    hide(element) {
        element.style.display = "none";
    },

    async initializeLogIn(user) {
        let games = await req.send(`games?=user=${user.id}`);

        store.setState({
            user: {
                username: user.username,
                id: user.id
            },

            games: [...store.getState().games, ...games]
        });
    },

    show(element, type) {
        element.style.display = type;
    },

    async submit() {
        let type = account.elements.overlayH2.textContent;
        let username = account.elements.username.value;
        let pwd = account.elements.pwd.value;

        account.elements.status.textContent = "Please wait...";
        if (type.toLowerCase() === "sign up") {
            let result = await req.send("sign-up", "POST", {
                username: username,
                pwd: pwd
            });
            if (result.error) {account.elements.status.textContent = "Error: " + result.error; return;}

            account.elements.status.textContent = result.success;
            setTimeout(() => {
                account.hide(account.elements.overlay);
                account.empty();
            }, 2000);
        } else if (type.toLowerCase() === "log in") {
            let result = await req.send("log-in", "POST", {
                username: username,
                pwd: pwd
            });
            if (result.error) {account.elements.status.textContent = "Error: " + result.error; return;}

            account.elements.status.textContent = "Successfully logged in!";
            await account.initializeLogIn(result);
            setTimeout(() => {
                account.hide(account.elements.overlay);
                account.empty();
                account.hide(account.elements.signUpButton);
                account.hide(account.elements.logInButton);
                account.show(account.elements.profileButton, "inline");
                account.show(account.elements.logOutButton, "inline");
                account.elements.accountP.textContent = `Logged in as: ${result.username}`;
            }, 2000)
        }
    }
}

account.driver();