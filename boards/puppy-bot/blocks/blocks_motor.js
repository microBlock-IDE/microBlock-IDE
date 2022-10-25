Blockly.defineBlocksWithJsonArray([
    {
        "type": "motor_forward",
        "message0": "move forward at power %1 %% for %2 secs",
        "args0": [{
            "type": "input_value",
            "name": "speed"
        }, {
            "type": "input_value",
            "name": "time",
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
            "type": "input_value",
            "name": "speed",
        }, {
            "type": "input_value",
            "name": "time",
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
            "type": "input_value",
            "name": "speed",
        }, {
            "type": "input_value",
            "name": "time",
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
            "type": "input_value",
            "name": "speed",
        }, {
            "type": "input_value",
            "name": "time",
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
            "type": "input_value",
            "name": "speed",
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
            "type": "input_value",
            "name": "speed1",
        }, {
            "type": "input_value",
            "name": "speed2",
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