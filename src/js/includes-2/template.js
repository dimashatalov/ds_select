export default class Template {
    constructor(app,settings) {
        this.args = {};

        this.applySettings(settings);

        this.node = false;
        this.makeTemplate();

        this.applySettings();
    }


    makeTemplate() {


        if (this.get("node")) {
            this.node = this.get("node");
        }
        else  {
            this.node = document.createElement("div");
            this.node.classList.add("ds_select_container");
        }

        if (this.get("node"))  {
            // Do nothing
        }
        else 
        if (this.get("template") != false) {

            //Render template with js, which set by coder
            this.node.innerHTML = this.get("template");
        }
        else {

            // Render template automaticly
            let html = `
                <div class="ds_select__wrapper">
                    <div class="ds_select__input-container">
                        <input type="text" value="" class="ds_select__input" name="search__`+this.getInputName() +`">
                        <input type="hidden" value="" class="ds_select__hidden-input" name="`+this.getInputName() +`">
                    </div>
                    <div class="ds_select__options-container"></div>
                </div>
            `;

            this.node.innerHTML = html;
        }


        this.set("input", this.node.querySelector(".ds_select__input"));
        this.set("hidden_input", this.node.querySelector(".ds_select__hidden-input"));
        this.set("input_container", this.node.querySelector(".ds_select__input-container"));
        this.set("options_container", this.node.querySelector(".ds_select__options-container"));   
        this.set("wrapper", this.node.querySelector(".ds_select__wrapper"));   
        this.set("selector", this.node.querySelector(".ds_select__selector"));   

        

        
        console.log("options_container", this.get("options_container"));
        this.readSettings();
    }


    drawSelected(obj) {

        this.get("input").value = obj.data.value;

        if (this.get("selector")) {
            this.get("selector").innerHTML = obj.data.selectedValue;
            this.get("selector").value = obj.data.selectedValue;

            this.get("selector").classList.remove("placeholder");
        }

        if (obj.data.selectedValue == "") {
            this.get("selector").classList.add("placeholder");
        }

        console.log("drawSelected", obj);

    }

    reset() {
        if (this.get("input"))
            this.get("input").value = "";

        if (this.get("selector")) {
            this.get("selector").innerHTML = "";
            this.get("selector").value = "";
        }
    }

    readSettings() {

        let dataType = this.get("input").getAttribute("data-type");
        console.log("readSettings", dataType);
        if (dataType == "select") { 
            this.set("type", "select");
        }
        if (dataType == "autocomplete") { 
            this.set("type", "autocomplete");
        }        
    }
 
    getInputName() {
        console.log('this.get("name")', this.get("name"));

        if (this.get("name") === false) {
            return "ds_select";
        }
        else {
            return this.get("name");
        }
    }


    applySettings(settings) {
        for (let i in settings) {
            this.set(i, settings[i]);
        }

        if (this.get("type") == "select") {
            
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