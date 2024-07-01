//import '../../dist/ds_select.css'; // Adjust the path accordingly

import Template  from './includes/template.js';
import Options   from './includes/options.js';
import Events    from './includes/events.js';

export default class DS_Select {

    constructor(settings) {
        this.args = [];

        this.applyDefaultSettings();        
        this.applyCustomSettings(settings);
        this.applySettingsFromTarget();

        this.Template   = new Template(this);
        this.Options    = new Options(this);
        this.Events     = new Events(this);
        
        this.Options.setOptions(this.get("options"));
        


        this.Options.pickByValue();
    }



    applyDefaultSettings() {
        this.set("blur", true);
        this.set('options_length', 20);
        this.set("allow_input_value", true);
        this.set("type", "select");
        this.set("no_results_message", "No results");
        this.set("loading_options", true);
        this.set("loading_results_message", "Loading options");
    }

    applySettingsFromTarget() {
        let object = this.get("target");

        if (object.getAttribute("data-name")) {
            this.set("name", object.getAttribute("data-name"));
        }

        if (object.getAttribute("data-placeholder")) {
            this.set("placeholder", object.getAttribute("data-placeholder"));
        }
    }


    setOptions(options) {
        this.Options.setOptions(options);
    }
 
    reset() {
        this.options.setDefault();
    }

    enable() {
        this.template.node.classList.remove("disable");
    }

    disable() {
        this.template.node.classList.add("disable");
    }


    setState(state) {
        if (state == "loading") {
            this.setLoadingState();
        }
        else 
        if (state == "default") {
            this.setDefaultState();
        }
        else 
        if (state == "disable") {
            this.setDisableState();
        }        
    }

    setLoadingState() {
        this.setDefaultState();

        this.Template.container.classList.add("ds_select__loading");
        this.Template.get("selector").innerHTML = "Loading";
        this.Template.get("selector").value = "Loading";
    }

    setDisableState() {
        this.setDefaultState();
        this.Template.container.classList.add("ds_select__disable");
    }

    setDefaultState() {
        let states = ["loading", "disable"];

        for (let i in states) {
            this.Template.container.classList.remove("ds_select__" + states[i]);
        }

        this.Options.setDefault();
    }

    getValue() {
        return this.Template.get("hidden_input").value;
    }


    setValue(value) {
        this.set("value", value);
        this.Options.pickByValue();
    }

    select(obj) {

        this.set("selected", obj);
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

 