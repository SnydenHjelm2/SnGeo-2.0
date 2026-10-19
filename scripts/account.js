const account = {
    bodyMargin(remove) {
        if (remove) document.body.style.margin = "0px";
        else document.body.style.margin = "20px";
    },

    driver() {
        this.hide(this.elements.profileButton);
        this.hide(this.elements.overlay);

        this.elements.signUpButton.addEventListener("click", () => {
            this.show(this.elements.overlay, "flex");
            this.bodyMargin(true);
            this.emptyOverlay();
            
        });
    },

    elements: {
        logInButton: document.querySelector("#log-in"),

        overlay: document.querySelector("#account-overlay"),

        profileButton: document.querySelector("#profile"),

        signUpButton: document.querySelector("#sign-up")
    },

    emptyOverlay() {
        this.elements.overlay.innerHTML = "";
    },

    hide(element) {
        element.style.display = "none";
    },

    show(element, type) {
        element.style.display = type;
    }
}

account.driver();