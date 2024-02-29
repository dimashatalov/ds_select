import Class  from "./class.js";
;

export default class Option extends Class {
    constructor(options, optionData) {
        super();
        this.app = options.app;
        this.createModel();
        this.listenEvents();


        this.makeOption(optionData);
    }

    createModel() {

        
        this.data = {
            html : "",  // will be displayed in list
            value: "", // Picked value to send to server
        };

        this.data.node = document.createElement("div");
        this.data.node.classList.add("option-wrapper");

        this.data.searchValue =  "";  // Value to use in search
        this.data.selectedValue = ""; // Value to display picked variant        
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

            if (typeof optionData.html != "undefined")
                this.data.node.innerHTML = optionData.html;
            else {
                this.data.node.innerHTML = optionData.value;
            }
            
        }
    }

    makeFromString(data) {
        this.data.node.innerHTML =  data;
        this.data.value          =  data;    
        this.data.searchValue    =  data;    
        this.data.selectedValue  =  data;    

        
    }

    listenEvents() {
        this.data.node.addEventListener("click", this.onClick.bind(this));
    }

    onClick() {
        this.app.Events.triggerEvent("onSelect", this);
    }
}
    