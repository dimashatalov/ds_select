import Class  from "./class.js";

export default class Events extends Class {
    constructor(app,settings) {
        super(settings);

        this.app = app;

        this.listenClick();
        this.listenKeyUp();

        this.keyUpTimeout = false;
    }

 
    listenClick() {

        var self = this;
        document.body.addEventListener("click", function(e) {

            if (self.app.template.get("options_container") && self.app.template.get("options_container").contains(e.target)) {
                self.clickOutsideField();
            }
            else 
            if (self.app.template.node.contains(e.target)) {
                self.clickOnField();
            }
            else {
                self.clickOutsideField();
            }
        });        
    }

    listenKeyUp() {
        if (this.app.template.get("selector"))
            this.app.template.get("selector").addEventListener("keyup", this.keyup.bind(this));

        if (this.app.template.get("type") == false) {
            this.app.template.get("input").addEventListener("keyup", this.keyup.bind(this));
        }
    }


    keyup() {

        if (this.app.template.get("type") == false) {
            this.app.template.get("input").value = this.app.template.get("selector").value;

            console.log("KEY IP", this.app.template.get("input").value);
        }

        if (this.keyUpTimeout) {
            clearTimeout(this.keyUpTimeout);
        }

        this.keyuptimeout = setTimeout(this.onKeyUp.bind(this), 100);
    }

    onKeyUp() {

        console.log("onKeyUp 3");

        if (this.app.get("type") == "autocomplete") {
            this.app.template.get("input").value = "";
        }
 
        this.app.template.node.classList.add("focus");
        this.app.template.get("wrapper").classList.add("focus");

        this.app.options.draw();

        this.onEvent("onKeyUp");
    }

    clickOnField() {

        if (this.app.template.node.classList.contains("disable")) {
            return false;
        }

        this.app.template.node.classList.add("focus");
        this.app.template.get("wrapper").classList.add("focus");

        this.onEvent("onFocus");
    }
    

    clickOutsideField() {

        if (this.app.template.node.classList.contains("disable")) {
            return false;
        }

        this.app.template.node.classList.remove("focus");
        this.app.template.get("wrapper").classList.remove("focus");

        this.onEvent("onBlur");
    }


    triggerEvent(event, obj) {
        
        if (event == "onSelect") {

            this.app.template.drawSelected(obj);
            this.app.select(obj);
            this.onEvent(event);

        }
    }


    onEvent(event) {

 
        if (this.app.get(event)) {
            this.app.get(event)(this.app);
        }
    }
         
 
}   