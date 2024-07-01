import Class  from "./class.js";
import Option from "./option.js";

export default class Options extends Class {
    constructor(app,settings) {
        super(settings);

        this.app = app;
    }
    

    setOptions(data) {
        
        this.options = [];

        if (data == false || data.length == 0) {
            this.app.template.get("options_container").classList.add("empty");
        }
        else {
            this.app.template.get("options_container").classList.remove("empty");
        }

        for (let i in data) {
            this.options.push(new Option(this,data[i]));
        }    

        this.draw();
    }

    setDefault() {

        let def         = false;
        let placeholder = false;

        for (let i in this.options) {
            let option = this.options[i];

            if (typeof option.data.default != "undefined" && option.data.default == true) {
                def = option;
            }

            if (typeof option.data.value == "") {
                placeholder = option;
            }            
        }

    
        if (def != false) {
            def.onClick();
        }
        else 
        if (placeholder != false) {
            placeholder.onClick();
        }
        else {
            // Just empty
            this.app.template.reset();
        }

    }
     

    search() {

        let searchString = this.app.template.get("selector").value;

        console.log("searchString", searchString, this.options);

        if (searchString == "" ||  (this.app.get("type") != "autocomplete" &&  this.app.get("type") != "suggest"))  {
            return this.options;
        }

        let found = [];
        for (let i in this.options) {
            let option = this.options[i];
            
            let score = this.isMatch(option.data.value, searchString);

            found.push({
                option : option,
                score : score
            });
        }

        found.sort((a, b) => b.score - a.score);


        let out = [];
        for (let i in found) {
            if (found[i].score == 0) {
                continue;
            }

            out.push(found[i].option);
        }

        return out;
    }

    isMatch(value, searchString) {
        value = value.toLowerCase();
        searchString = searchString.toLowerCase();

        const maxLength = Math.max(value.length, searchString.length);
        let matchingChars = 0;

        for (let i = 0; i < maxLength; i++) {
            if (value[i] === searchString[i]) {
                matchingChars++;
            }
        }

        // Normalize the score to be between 0 and 1
        const score = matchingChars / maxLength || 0;

        return score;
    }

    draw() {

        try {
            var self = this;

            let count = 0;
 
            this.app.template.get("options_container").innerHTML = '';
            
            if (this.app.get("externalAutocomplete") == true) { 
                var foundOptions = this.options;
            }
            else {
                var foundOptions = this.search();
            }

            if (typeof foundOptions == "undefined" || foundOptions == false || foundOptions.length == 0) {
                this.app.template.get("options_container").classList.add("empty");
            }
            else {
                this.app.template.get("options_container").classList.remove("empty");
            }            

            for (let i in foundOptions) {
                
                let option = foundOptions[i];

                if (count >= this.app.get("options_length")) {
                    break;
                }

                this.app.template.get("options_container").appendChild(option.data.node);
                count++;
            }
        }
        catch(e) {
            console.log(e);
        }
        /*
        var self = this;

        let options = this.get("options");

		let str = this.get("input").value;
		let input_regexp = new RegExp(str.replace(/\s+/, '|'));

        this.autoSelect();

        let html = [];

        let optionsCount = 0;
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

            optionsCount++;
        }

        html = `<div class="ds_select__options-list">` + html.join("") + '</div>';

        this.get("options_container").innerHTML = html;

        console.log("optionsCount", optionsCount);

        if (optionsCount == 0) {
            this.get("options_container").classList.add("empty");
        }
        else {
            this.get("options_container").classList.remove("empty");
        }
        */

    }


}   