# ds_select

## Init
    let select = new DS_Select.default({
        "name" : "test"
    });

    document.getElementById("test").appendChild(select.node);

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