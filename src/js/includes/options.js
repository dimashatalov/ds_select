import Class  from "./class.js";
import Option from "./option.js";

export default class Options extends Class {
    constructor(App) {
        super();
        this.App        = App;
        this.Template   = App.Template;
        this.setDefault();

        this.lastFocus = -1;
    }
    

    setOptions(data) {
        
        
        this.options = [];

        if (data == false || data.length == 0) {
            this.Template.get("container").classList.add("ds_select__no-options");
        }
        else {
            this.Template.get("container").classList.remove("ds_select__no-options");
        }

        for (let i in data) {
            this.options.push(new Option(this,data[i]));
        }    

        this.draw();

        if (this.App.get("type") != "external_autocomplete") {
            this.setDefault();
        }
    }

    setDefault() {

        let defaultOption     = false;
        let placeHolderOption = this.get("placeHolderOption");


        for (let i in this.options) {
            let option = this.options[i];

            if (typeof option.data.default != "undefined" && option.data.default == true) {
                defaultOption = option;
            }
            else
            if (typeof option.data.value == "") {
                defaultOption = option;
            }            
        }

 

    
        if (defaultOption != false) {
            defaultOption.onClick();
        }
        else 
        if (defaultOption != false) {
            defaultOption.onClick();
        }
        else
        if (placeHolderOption != false) {
            console.log("placeHolderOption",placeHolderOption);
            placeHolderOption.pick();
        }
        else {
            this.Template.reset();
        }

    }
     

    search() {

        if (this.Template.get("selector").tagName.toLowerCase() == "div") {
            var searchString = this.Template.get("selector").innerHTML;
        }
        else {
            var searchString = this.Template.get("selector").value;
        }

        if (this.App.getValue() == "") {
            searchString = '';  // Might be placeholder
        }

        if (this.App.get("type") == "select") {
            
            return this.options;
        }
         

        console.log("searchString 2", searchString, this.options);

        if (searchString == "" ||  (this.App.get("type") != "autocomplete" &&  this.App.get("type") != "suggest"))  {
            return this.options;
        }

        let found = [];
        for (let i in this.options) {
            let option = this.options[i];
            
            let score = this.isMatch(option.data.search, searchString);

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

    pickByValue() {
        let placeHolderOption = this.get("placeHolderOption");

        
        for (let i = 0; i < this.options.length; i++) {
            let option = this.options[i];

            if (option.data.value == this.App.get("value")) {
                option.pick();
                return true;
            }
        }


        if (placeHolderOption != false) {
            placeHolderOption.pick();
        }        
        

    }

    drawLoading() {
        this.Template.get("options_container").innerHTML = '';
        let html__noResults = document.createElement("div");
        html__noResults.classList.add("ds_select__loading-results");
        html__noResults.innerHTML = '<div>' + this.App.get("loading_results_message")+ '</div>';
        this.Template.get("options_container").appendChild(html__noResults);        
    }
    
    draw() {

        try {
            var self = this;

            let count = 0;
 
            this.Template.get("options_container").innerHTML = '';
            
            if (this.App.get("externalAutocomplete") == true) { 
                var foundOptions = this.options;
            }
            else {
                var foundOptions = this.search();
            }

            if (typeof foundOptions == "undefined" || foundOptions == false || foundOptions.length == 0) {
                this.App.Template.get("container").classList.add("ds_select__no-options");
            }
            else {
                this.App.Template.get("container").classList.remove("ds_select__no-options");
            }  
            
            this.drawPlaceHolder();

            
            for (let i in foundOptions) {
                
                let option = foundOptions[i];

                if (count >= this.App.get("options_length")) {
                    break;
                }

                this.Template.get("options_container").appendChild(option.data.container);
                count++;
            }

            if (count == 0) {
                this.noResults();
            }
        }
        catch(e) {
            console.log("draw error", e);
        }
    }

    noResults() {

        let html__noResults = document.createElement("div");
        html__noResults.classList.add("ds_select__no-results");
        html__noResults.innerHTML = '<div>' + this.App.get("no_results_message")+ '</div>';
        this.Template.get("options_container").appendChild(html__noResults);
    }

    focusOnOption(direction) {
        
        if (direction == "next")
            this.lastFocus++;
        else {
            this.lastFocus--;
        }

        if (this.lastFocus < 0) 
            this.lastFocus = 0;

        console.log("lastFocus", this.lastFocus);

        let nodes = this.Template.container.querySelectorAll(".ds_select__option-wrapper");
        
        this.removeFocus();
        
        if (this.lastFocus > nodes.length-1) {
            this.lastFocus = 0;
        }

        for (let i = 0; i < nodes.length; i++) {
            if (i == this.lastFocus) {
                nodes[i].classList.add("ds_select__option-wrapper--focus");
            }
        }
    }

    pickFocused() {
        let placeHolderOption = this.get("placeHolderOption");

        if (placeHolderOption != false && placeHolderOption.isFocused() == true) {
            placeHolderOption.pick();
        }
        else {
            for (let i = 0; i < this.options.length; i++) {
                let option = this.options[i];

                if (option.isFocused()) {
                    option.pick();
                }
            }
        }
    }

    removeFocus() {
        let placeHolderOption = this.get("placeHolderOption");

        if (placeHolderOption != false) {
            placeHolderOption.unFocus()
        }
        
            for (let i = 0; i < this.options.length; i++) {
                let option = this.options[i];

                option.unFocus();
                 
            }
        
    }

    drawPlaceHolder() {
        let placeHolderOption = this.get("placeHolderOption");

        if (placeHolderOption === false) {
            // Create placeholder
            let placeholder = this.App.get("placeholder");

            if (placeholder == false) {
                return false;
            }

            if (typeof placeholder == "string") {
                placeholder = {
                    value : "",
                    label : placeholder,
                };
            }

            placeholder.type    = "placeholder";
            placeholder.default = true;

            placeHolderOption = new Option(this, placeholder);
            
        }

        this.set("placeHolderOption", placeHolderOption);
        
        this.Template.get("options_container").appendChild(placeHolderOption.data.container);
        
        
    }

}   