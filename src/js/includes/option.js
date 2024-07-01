import Class  from "./class.js";
;

export default class Option extends Class {
    constructor(options, optionData) {
        super();

        this.App = options.App;
        this.createModel();
        this.listenEvents();


        this.makeOption(optionData);
    }

    createModel() {
        
        this.data = {
            "value"    : false,
            "search"   : false,
            "label"    : false,
            "selected" : false
        };

        this.data.container = document.createElement("div");
        this.data.container.classList.add("ds_select__option-wrapper");
    }

    makeOption(optionData) {
        if (typeof optionData == "string") {
            this.makeFromString(optionData);
        }
        else
        if (typeof optionData == "object"){
            for (let i in optionData) {
                this.data[i] = optionData[i];
            }

            if (this.data.label == false) {
                this.data.label = optionData.value;
            }

            if (this.data.search == false) {
                this.data.search = optionData.value;
            }

            if (this.data.selected == false) {
                this.data.selected = optionData.label;
            }            

            if (optionData.label != false)
                this.data.container.innerHTML = optionData.label;
            else {
                this.data.container.innerHTML = optionData.value;
            }
            
        }
    }

    makeFromString(data) {
        this.data.container.innerHTML =  data;
        this.data.value     =  data;    
        this.data.search    =  data;    
        this.data.selected  =  data;    
        this.data.label     =  data;    

        
    }

    listenEvents() {
        this.data.container.addEventListener("click", this.onClick.bind(this));
    }

    onClick() {
        this.App.Events.triggerEvent("onSelect", this);
        this.App.Options.removeFocus();
    }

    isFocused() {
        if (this.data.container.classList.contains("ds_select__option-wrapper--focus")) {
            return true;
        }
        else {
            return false;
        }
    }

    unFocus() {
        this.data.container.classList.remove("ds_select__option-wrapper--focus") ;
    }

    pick() {
        
        this.onClick();
    }
}
    