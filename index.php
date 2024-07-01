<?php 
echo $assets = time();
?><!DOCTYPE html>
<html>
<head>
<title>Default html</title>

<style>
body {
    font-family:Arial;
    font-size: 16px;
    line-height: 1.4;
}
</style>

<link rel="icon" type="image/png" href="favico.png" />
<link rel="stylesheet" href="dist/ds_select.css?t=<?php echo $assets;?>">
</head>
<body>
<h1>Default html</h1>
<p>This is default html page</p>

<h2>Start in empty div</h2>
<div id="test" data-name="test" data-placeholder="Please select time">Input goes here</div>

<script src="dist/ds-select.js?t=<?php echo $assets;?>"></script>

<div class="example-buttons">
    <button id="loading-state">Loading State</button>
    <button id="default-state">Default State</button>
    <button id="disable-state">Disable State</button>


<script>
let select = new DS_Select.default({
    "target"  : document.getElementById("test"),
    "name" : "test",
    "options_length" : 5,
    "options" : [
        {
            "value"    : 1,
            "search"   : "White Car",
            "label"    : "<div class='your-custom-class'><b>White Car</b></div>",
            "selected" : "Black car"
        },
        {
            "value"    : 2,
            "search"   : "Black Car",
            "label"    : "<div class='your-custom-class'><b>Black Car</b></div>",
            "selected" : "Black car"
        }
    ]        
});

let newOptions = 
[
        {
            "value"    : 3,
            "search"   : "White Car",
            "label"    : "<div class='your-custom-class'><b>White Car</b></div>",
            "selected" : "White car 2"
        },
        {
            "value"    : 4,
            "search"   : "Black Car",
            "label"    : "<div class='your-custom-class'><b>Black Car</b></div>",
            "selected" : "Black car 3"
        }
    ];

    
select.setOptions(newOptions);

document.getElementById("loading-state").addEventListener("click", function() {
    select.setState("loading");
});

document.getElementById("default-state").addEventListener("click", function() {
    select.setState("default");
});

document.getElementById("disable-state").addEventListener("click", function() {
    select.setState("disable");
});

</script>


<h2> Autocomplete </h2>
<div id="test_autocomplete"></div>
<script>
let selectAutocomplete = new DS_Select.default({
    "target"  : document.getElementById("test_autocomplete"),
    "name" : "test_autocomplete",
    "type" : "autocomplete",
    "placeholder" : "Please select car",
    "options_length" : 5,
    "options" : [
        {
            "value"    : 1,
            "search"   : "White Car",
            "label"    : "<div class='your-custom-class'><b>White Car</b></div>",
            "selected" : "Black car"
        },
        {
            "value"    : 2,
            "search"   : "Black Car",
            "label"    : "<div class='your-custom-class'><b>Black Car</b></div>",
            "selected" : "Black car"
        }
    ]        
});
</script>

<h2> External Autocomplete</h2>

<div id="test_external_autocomplete">External Autocomplete</div>
<script>
let selectExternalAutocomplete = new DS_Select.default({
    "target"  : document.getElementById("test_external_autocomplete"),
    "name" : "test_external_autocomplete",
    "type" : "external_autocomplete",
    "placeholder" : "Please select car",
    "options_length" : 5,
    "options" : [
        {
            "value"    : 1,
            "search"   : "White Car",
            "label"    : "<div class='your-custom-class'><b>White Car</b></div>",
            "selected" : "Black car"
        },
        {
            "value"    : 2,
            "search"   : "Black Car",
            "label"    : "<div class='your-custom-class'><b>Black Car</b></div>",
            "selected" : "Black car"
        }
    ],
    "onKeyUp" : function() {
            
            selectExternalAutocomplete.setOptions([
            {
                "value"    : 1,
                "search"   : "White Car",
                "label"    : "<div class='your-custom-class'><b>White Car Loaded</b></div>",
                "selected" : "Black car"
            },
            {
                "value"    : 2,
                "search"   : "Black Car",
                "label"    : "<div class='your-custom-class'><b>Black Car Loaded</b></div>",
                "selected" : "Black car"
            }
        ] );
    }      
});
</script>
</body>
</html>