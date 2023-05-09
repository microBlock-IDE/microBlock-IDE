Blockly.defineBlocksWithJsonArray([
    {
        "type": "motor_forward",
        "message0": "move forward at power %1 %% for %2 secs",
        "args0": [{
            "type": "field_number",
            "name": "speed",
            "value": 50,
            "min": 0,
            "max": 100
        }, {
            "type": "field_number",
            "name": "time",
            "value": 1,
            "min": 0
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#28B463",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_backward",
        "message0": "move backward at power %1 %% for %2 secs",
        "args0": [{
            "type": "field_number",
            "name": "speed",
            "value": 50,
            "min": 0,
            "max": 100
        }, {
            "type": "field_number",
            "name": "time",
            "value": 1,
            "min": 0
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#28B463",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_turn_left",
        "message0": "turn left at power %1 %% for %2 secs",
        "args0": [{
            "type": "field_number",
            "name": "speed",
            "value": 50,
            "min": 0,
            "max": 100
        }, {
            "type": "field_number",
            "name": "time",
            "value": 1,
            "min": 0
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#28B463",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_turn_right",
        "message0": "turn right at power %1 %% for %2 secs",
        "args0": [{
            "type": "field_number",
            "name": "speed",
            "value": 50,
            "min": 0,
            "max": 100
        }, {
            "type": "field_number",
            "name": "time",
            "value": 1,
            "min": 0
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#28B463",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_move",
        "message0": "%1 at power %2 %%",
        "args0": [{
            "type": "field_dropdown",
            "name": "move",
            "options": [
                ["move forward", "1"],
                ["move backward", "2"],
                ["turn left", "3"],
                ["turn right", "4"]
            ]
        }, {
            "type": "field_number",
            "name": "speed",
            "value": 50,
            "min": 0,
            "max": 100
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#28B463",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_wheel",
        "message0": "left wheel turns at power %1 %%, right wheel turns at power %2 %%",
        "args0": [{
            "type": "field_number",
            "name": "speed1",
            "value": 50,
            "min": -100,
            "max": 100
        }, {
            "type": "field_number",
            "name": "speed2",
            "value": 50,
            "min": -100,
            "max": 100
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#28B463",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_stop",
        "message0": "stop moving",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#28B463",
        "tooltip": "",
        "helpUrl": ""
    }
]);