//import '../../dist/ds_select.css'; // Adjust the path accordingly

import Template  from './includes/template.js';
import Options   from './includes/options.js';
import Events    from './includes/events.js';

export default class DS_Select {

    constructor(settings) {
        this.args = [];

        this.drawOptionsTM = false;

        this.applyDefaultSettings();
        this.applyCustomSettings(settings);

        this.template = new Template(this,settings);


        this.set("type", this.template.get("input").getAttribute("data-type"));

        this.options  = new Options(this,settings);


        this.legacySupport();

        this.Events = new Events(this,settings);

     
        //this.drawOptions(); 
    }



    applyDefaultSettings() {
        this.set("blur", true);
        this.set('options_length', 20);
        this.set("allow_input_value", true);
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

    getValue() {
        return this.template.get("input").value;
    }


    setValue(value) {
        
        let selectorValue = '';

        if (typeof value == "array") {
            this.template.get("input").value = value[0];
            selectorValue = value[1];
        }
        else {
            this.template.get("input").value = value;
            selectorValue = value;
        }

        if (this.template.get("selector")) {
            this.template.get("selector").value = selectorValue;
            this.template.get("selector").innerHTML = selectorValue;
        }
    }

    select(obj) {

        this.set("selected", obj);
    }
 
 

 

 



    applyCustomSettings(settings) {

        for (let i in settings) {
            this.set(i, settings[i]);
        }
        
    }


    legacySupport() {
        this.set("input", this.template.get("input"));
        this.node = this.template.node;
        this.setOptions = this.options.setOptions;
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

 