export default class Template {
    constructor(App) {
        this.args = {};
        this.App = App;
        this.node = false;
        this.makeTemplate();
    }


    makeTemplate() {

        let target = this.App.get("target");


        this.container = this.getContainer();

        if (this.App.get("template") != false) {
            // Taker custom template
            this.container.innerHTML = this.get("template");
        }
        else {
            // Render template automaticly
            
            let html = `
                <div class="ds_select__wrapper">
                    <div class="ds_select__input-container">
                        ` + this.getHTMLBefore() + ` 
                        ` + this.getSearchElement() + `
                        ` + this.getSelectIcon() + ` 
                        ` + this.getHTMLAfter() + ` 
                        <input type="hidden" value="" class="ds_select__hidden-input" name="`+this.getInputName() +`">
                    </div>
                    <div class="ds_select__options-container"></div>
                </div>
            `;

            this.container.innerHTML = html;
        }


        this.set("wrapper",             this.container.querySelector(".ds_select__wrapper"));   
        this.set("input_container",     this.container.querySelector(".ds_select__input-container"));

        this.set("selector",            this.container.querySelector(".ds_select__selector"));
        this.set("hidden_input",        this.container.querySelector(".ds_select__hidden-input"));
        this.set("options_container",   this.container.querySelector(".ds_select__options-container"));   
        
        this.readSettings();

        console.log("this.container", this.container);
        target.innerHTML = '';
        target.appendChild(this.container);
    }

    getSearchElement() {
        if (this.App.get("editableDiv") || this.App.get("type") == "select") {
            return `<div type="text"   value="" class="ds_select__selector"></div>`;
        }
        else {
            return `<input type="text"   value="" class="ds_select__selector" name="search__`+this.getInputName() +`"></input>`;
        }
    }


    getHTMLBefore() {
        if (this.App.get("template_before")) {
            return this.App.get("template_before");
        }
        else {
            return "";
        }
    }

    getHTMLAfter() {
        if (this.App.get("template_after")) {
            return this.App.get("template_after");
        }
        else {
            return "";
        }
    }


    getSelectIcon() {
        

        if (this.App.get("template_select_icon")) {
            return this.App.get("template_select_icon");
        }
        else {
            return `
            <svg class="ds_select__select-icon" version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="451.847px" height="451.847px" viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;"
                xml:space="preserve">
            <g>
                <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
                    c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
                    c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>
            </g>
            </svg>
            `;
            }
        
    }

    drawSelected(obj) {
        console.log("drawSelected", obj);

        
        this.get("hidden_input").value = obj.data.value;

        if (this.get("selector")) {
            this.get("selector").innerHTML = obj.data.selected;
            this.get("selector").value = obj.data.selected;

            this.get("container").classList.remove("ds_select__placeholder");
        }

        if (obj.data.selected == "") {
            this.container.classList.add("ds_select__placeholder");
        }


        if (typeof obj.data.type != "undefined" && obj.data.type == "placeholder") {
            this.container.classList.add("ds_select__placeholder");
        }

    }

    reset() {

        this.get("selector").innerHTML = "";
        this.get("selector").value = "";
    }

    readSettings() {

        let type = this.App.get("type");
        
        if (type == "select" || type == false) { 
            this.set("type", "select");
        }
        else 
            this.set("type", type);
        
    }
 
    getInputName() {
    
        if (this.App.get("name") === false) {
            return "ds_select";
        }
        else {
            return this.App.get("name");
        }
    }


    applySettings(settings) {
        for (let i in settings) {
            this.set(i, settings[i]);
        }

        if (this.get("type") == "select") {
            
        }        
    }

    getContainer() {
        if (this.get("container")) {
            return this.get("container");
        }
        else  {
            let container = document.createElement("div");
            container.classList.add("ds_select_container");

            this.set("container", container);

            return container;
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