export default class Class {
    constructor() {
        this.args = {};
    }

    applySettings(settings) {
        for (let i in settings) {
            this.set(i, settings[i]);
        }
    }

    set(k, v) {
        this.args[k] = v;
    }


    get(k) {
        if (typeof this.args[k] == "undefined") {
            return false;
        }
        else {
            return this.args[k];
        }
    }

}   