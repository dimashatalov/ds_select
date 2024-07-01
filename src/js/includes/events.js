import Class  from "./class.js";

export default class Events extends Class {
    constructor(App) {
        super();

        this.App      = App;
        this.Template = App.Template;
        this.Options  = App.Options;

        this.listenClick();
        this.listenKeyUp();

        this.keyUpTimeout = false;
    }

 
    listenClick() {

        var self = this;
        document.body.addEventListener("click", function(e) {

            if (self.Template.get("options_container") && self.Template.get("options_container").contains(e.target)) {
                self.clickOutsideField();
            }
            else 
            if (self.Template.container.contains(e.target)) {
                self.clickOnField();
            }
            else {
                self.clickOutsideField();

                if (self.App.getValue() == "")
                    self.Options.setDefault();
            }
        });        
    }

    listenKeyUp() {

        document.addEventListener("keydown", this.listenArrows.bind(this));

        this.Template.get("options_container").addEventListener("mouseenter", this.mousenter.bind(this));

        if (this.Template.get("selector"))
            this.Template.get("selector").addEventListener("keyup", this.keyup.bind(this));

        if (this.Template.get("type") == false) {
            this.Template.get("input").addEventListener("keyup", this.keyup.bind(this));
        }

        if (this.Template.get("selector")) {
            this.Template.get("selector").addEventListener("change", this.onChange.bind(this));
            this.Template.get("selector").addEventListener("click", this.onSelectorClick.bind(this));
            
        }

        if (this.Template.get("type") == false) {
            this.Template.get("input").addEventListener("change", this.onChange.bind(this));
        }        
    }

    onChange() { 
        this.keyup();
        this.onEvent("onChange");
    }


    keyup(e) {
        
        if (typeof e == "undefined") {
            return false;
        }

        if (e.key == "ArrowDown" || e.key == "ArrowUp" || e.key == "Enter") {
            return false;
        }

        if (this.Template.get("type") == false) {

            if (this.Template.get("selector").tagName.toLowerCase() == "div") {
                this.Template.get("input").value = this.Template.get("selector").innerHTML;
            }
            else {
                this.Template.get("input").value = this.Template.get("selector").value;
            }

            console.log("KEY IP", this.Template.get("input").value);
        }

        if (this.keyUpTimeout) {
            clearTimeout(this.keyUpTimeout);
        }

        this.keyuptimeout = setTimeout(this.onKeyUp.bind(this), 100);
    }

    onSelectorClick() {
        if (this.App.get("type") == "autocomplete" || this.App.get("type") == "external_autocomplete") {
            
            if (this.App.getValue() == "") {
                this.Template.get("selector").value = '';
                this.Template.get("selector").innerHTML = '';
            }
        }
    }

    mousenter() {
        
        
        this.App.Options.removeFocus();
        

    }

    onKeyUp() {
        
        if (this.App.get("type") == "autocomplete" || this.App.get("type") == "external_autocomplete") {
            this.Template.get("hidden_input").value = "";
        }
 
        this.Template.container.classList.add("ds_select__focus");
        
        if (this.App.get("type") == "external_autocomplete") {
            if (this.App.get("loading_options"))
                this.Options.drawLoading();
        }
        else {
            this.Options.draw();
        }
        

        this.onEvent("onKeyUp");
    }

    listenArrows(e) {
        console.log(e);
        // Check if the pressed key is the down arrow key or the up arrow key
        if (e.key === "ArrowDown" && this.isFocused() === true) {
            console.log("Arrow Down Key Pressed");
            // Implement your logic for when the down arrow key is pressed
            e.preventDefault();
            this.handleArrowDown();
        } else if (e.key === "ArrowUp" && this.isFocused() === true) {
            console.log("Arrow Up Key Pressed");
            // Implement your logic for when the up arrow key is pressed
            e.preventDefault();
            this.handleArrowUp();
        }
        else if (e.key === "Enter" && this.isFocused() === true) {
            e.preventDefault();
            this.handleEnter();
        }

    }

    isFocused() {
        if (this.Template.container.classList.contains("ds_select__focus")) {
            return true;
        }
        else {
            return false;
        }
    }

    handleArrowDown() {
        this.Options.focusOnOption("next");    
    }
    
    handleArrowUp() {
        this.Options.focusOnOption("prev");
    }    

    handleEnter() {
        this.Options.pickFocused();
        this.Options.removeFocus();
        this.Template.get("selector").blur();
        this.clickOutsideField();
    }


    clickOnField() {

        if (this.Template.container.classList.contains("disable")) {
            return false;
        }

        this.Template.container.classList.add("ds_select__focus");

        this.onEvent("onFocus");
    }
    

    clickOutsideField() {

        if (this.Template.container.classList.contains("ds_select__disable")) {
            return false;
        }

        this.Template.container.classList.remove("ds_select__focus");

        this.onEvent("onBlur");
    }
 
    triggerEvent(event, obj) {
        
        if (event == "onSelect") {

            this.App.Template.drawSelected(obj);
            this.App.select(obj);
            this.onEvent(event);
            
            this.Template.container.classList.remove("ds_select__focus");
        }
    }


    onEvent(event) {

 
        if (this.App.get(event)) {
            this.App.get(event)(this.app);
        }
    }
         
 
}   