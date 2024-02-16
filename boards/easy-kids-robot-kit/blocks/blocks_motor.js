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
        "colour": "#205388",
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
        "colour": "#205388",
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
        "colour": "#205388",
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
        "colour": "#205388",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_spin_left",
        "message0": "spin left at power %1 %% for %2 secs",
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
        "colour": "#205388",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_spin_right",
        "message0": "spin right at power %1 %% for %2 secs",
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
        "colour": "#205388",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_slide_left",
        "message0": "slide left at power %1 %% for %2 secs",
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
        "colour": "#205388",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_slide_right",
        "message0": "slide right at power %1 %% for %2 secs",
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
        "colour": "#205388",
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
                ["move forward", "motor.FORWARD"],
                ["move backward", "motor.BACKWARD"],
                ["turn left", "motor.TURN_LEFT"],
                ["turn right", "motor.TURN_RIGHT"],
                ["spin left", "motor.SPIN_LEFT"],
                ["spin right", "motor.SPIN_RIGHT"],
                ["slide left", "motor.SLIDE_LEFT"],
                ["slide right", "motor.SLIDE_RIGHT"]
            ]
        }, {
            "type": "input_value",
            "name": "speed",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#205388",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_wheel",
        "message0": "M1 at power %1 %%, M2 at power %2 %%, M3 at power %3 %%, M4 at power %4 %%",
        "args0": [{
            "type": "input_value",
            "name": "speed1",
        }, {
            "type": "input_value",
            "name": "speed2",
        }, {
            "type": "input_value",
            "name": "speed3",
        }, {
            "type": "input_value",
            "name": "speed4",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#205388",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_stop",
        "message0": "stop moving",
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#205388",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_set_pwm",
        "message0": "Set PWM Motor %1 Hz",
        "args0": [{
            "type": "input_value",
            "name": "freq",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#205388",
        "tooltip": "",
        "helpUrl": ""
    },
]);