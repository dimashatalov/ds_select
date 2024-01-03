# ds_select

## Init
    let select = new DS_Select.default({
        "name" : "test"
    });

    document.getElementById("test").appendChild(select.node);

## Init Example 2
    <script>
    let select = new DS_Select.default({
        "name" : "test",
        "options_length" : 5,
        "options" : [
            {
                "value" :  1,
                "searchable" : "Dmytro Shatalov",
                "label" : "<div class='adadad'><b>Dmytro Shatalov</b></div>",
                "selectedLabel" : "Dmytro"
            },
            {
                "value" :  2,
                "searchable" : "Roma Shatalov",
                "label" : "Roma Shatalov"
            }                   
        ],

    });


    document.getElementById("test").appendChild(select.node);
    </script>


## Events

onBlur(this)
onFocus(this)
onSelect(this, option)

## Default settings you can override
### allow_input_value
    Default value is "true"
    Possible value is "false"
    It allow user's free input to be used as value. If you set it to false - only picked value from drop down will be possible.

## setOptions on init
    let select = new DS_Select.default({
        "name" : "test"
        "options" : [options]
    });

    document.getElementById("test").appendChild(select.node);

## setOptions later
    select.setOptions([options]);

## Options structure
    [
        {
            "value" : "Value you actually will pick",
            "label" : "How you want represent  value in UI, html also"
        }
    ]