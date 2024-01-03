import '../../dist/ds_select.css'; // Adjust the path accordingly

export default class DS_Select {

    constructor(settings) {
        this.args = [];

        this.drawOptionsTM = false;

        this.applyDefaultSettings();
        this.applyCustomSettings(settings);

        this.makeTemplate();
        this.listenEvents();
        this.drawOptions(); 
    }


    applyDefaultSettings() {
        this.set("blur", true);
        this.set('options_length', 20);
        this.set("allow_input_value", true);
    }


    setOptions(data) {
        this.set("data", data);
        this.drawOptions();
    }


    makeTemplate() {
        this.node = document.createElement("div");
        this.node.classList.add("ds_select_container");

        if (this.get("template") != false) {
            this.node.innerHTML = this.get("template");
        }
        else {
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


        console.log("this.node",this.node);
        this.set("input", this.node.querySelector(".ds_select__input"));
        this.set("hidden_input", this.node.querySelector(".ds_select__hidden-input"));
        this.set("input_container", this.node.querySelector(".ds_select__input-container"));
        this.set("options_container", this.node.querySelector(".ds_select__options-container"));
        
    }
 

    listenEvents() {

        var self  = this;


        document.addEventListener('click', function(event) {
            
            

            setTimeout(function(){

                if (self.get("blur") === true) {
                    self.node.classList.remove("focus");
                    self.set("blur", true);
                    
                    if (self.get("onBlur")) {
                        self.get("onBlue")(self);
                    }
                }

                self.set("blur", true);
            }, 50);

        });   

        this.node.addEventListener("click", function(e) {
            let container = e.target.closest(".ds_select__input-container");
 

            if (container) {
                self.node.classList.add("focus");
                self.set("blur", false);
                if (self.get("onFocus")) {
                    self.get("onFocus")(self);
                }
            }

            let option = e.target.closest(".ds_select__option");

            if (option) {
                self.selectOption(option);
                if (self.get("onSelect")) {
                    self.get("onSelect")(self, option);
                }
            }
             
        });

              

        let onkeyup = this.onkeyup.bind(this);

        this.get("input").addEventListener("keyup", onkeyup);
    }

 

    updatePickedvalue(option) {

        let value = option.value;
        let selectedLabel = option.value;

        if (typeof option.selectedLabel != "undefined") {
            selectedLabel = option.selectedLabel;
        }

        this.get("hidden_input").value = value;
        this.get("input").value = selectedLabel;
    }


    selectOption(pickedOption) {
        let value = pickedOption.getAttribute("data-value");

        let options = this.get("options");

        for (let i in options) {
            let option = options[i];

            if (option.value == value) {

                this.updatePickedvalue(option);

                break;
            }
        }
    }

    drawOptions() {
        var self = this;

        let options = this.get("options");

		let str = this.get("input").value;
		let input_regexp = new RegExp(str.replace(/\s+/, '|'));

        this.autoSelect();

        let html = [];

        for (let i in options) {
            let option = options[i];

            str = option.value;

            if (typeof option.searchable != "undefined") {
                str = option.searchable;
            }

            if (str.search(input_regexp) != -1) {

            }
            else {
				continue;
            }

            if (i >= this.get("options_length")-1) {
                break;
            }

            let label = option.value;

            if (typeof option.label != "undefined") {
                label = option.label;
            }

            let classState = '';

            if (option.value == this.get("hidden_input").value) {
                classState = " selected ";
            }

            html.push(`
                <div class="ds_select__option `+classState+`" data-value="`+option.value+`">
                    ` + label + `
                </div>
            `);
        }

        html = `<div class="ds_select__options-list">` + html.join("") + '</div>';

        this.get("options_container").innerHTML = html;


        
    }

    autoSelect() {
        let insertedValue = this.get("input").value;

        let options = this.get("options");

        for (let i in options) {
            let option = options[i];
            let searchable = false;

            if (typeof option.searchable != "undefined") {
                searchable = option.searchable;
            }


            if (searchable != false && searchable == insertedValue) {
                this.updatePickedvalue(option);
                break;
            }

            if (option.value == insertedValue) {
                this.updatePickedvalue(option);
                break;
            }

            
        }
    }

    onkeyup() {
        let value = this.get("input").value;

        if (this.get("allow_input_value") === true) {
            this.get("hidden_input").value = value;
        }

        let drawOptions = this.drawOptions.bind(this);

        if (this.drawOptionsTM != false) {
            clearTimeout(this.drawOptionsTM);
        }

        this.drawOptionsTM = setTimeout(drawOptions, 150); 
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


    applyCustomSettings(settings) {

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

 