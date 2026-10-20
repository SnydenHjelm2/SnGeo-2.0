const store = {
    getState() {
        return this.state;
    },

    initialize() {
        this.setState(state);
    },

    setState(state) {
        if (typeof state !== "object" || Array.isArray(state)) return false;
        this.stateHistoy.push(this.state);
        Object.assign(this.state, state);
    },

    state: {},

    stateHistoy: []
}

store.initialize();