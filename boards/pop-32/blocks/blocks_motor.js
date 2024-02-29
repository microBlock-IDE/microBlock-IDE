Blockly.defineBlocksWithJsonArray([
    {
        "type": "motor1",
        "message0": "motor %1 speed %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "n",
                "options": [
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["1+2", "12"],
                    ["3+4", "34"],
                    ["1+2+3+4", "100"],
                ]
            },
            {
                "type": "input_value",
                "name": "speed",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#3498DB",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor2",
        "message0": "motor speed1 %1 speed2 %2 speed3 %3 speed4 %4",
        "args0": [
            {
                "type": "input_value",
                "name": "speed1",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "speed2",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "speed3",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "speed4",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#3498DB",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_move",
        "message0": "%1 speed %2",
        "args0": [{
            "type": "field_dropdown",
            "name": "move",
            "options": [
                ["move forward", "fd"],
                ["move backward", "bk"],
                ["turn left", "tl"],
                ["turn right", "tr"],
                ["spin left", "sl"],
                ["spin right", "sr"]
            ]
        }, {
            "type": "input_value",
            "name": "speed",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#3498DB",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_move2",
        "message0": "%1 speed1 %2 speed2 %3",
        "args0": [{
            "type": "field_dropdown",
            "name": "move",
            "options": [
                ["move forward", "fd2"],
                ["move backward", "bk2"],
            ]
        }, {
            "type": "input_value",
            "name": "speed1",
        }, {
            "type": "input_value",
            "name": "speed2",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#3498DB",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_move_4wd",
        "message0": "4 WD %1 speed %2",
        "args0": [{
            "type": "field_dropdown",
            "name": "move",
            "options": [
                ["move forward", "FD"],
                ["move backward", "BK"],
                ["turn left", "TL"],
                ["turn right", "TR"],
                ["spin left", "SL"],
                ["spin right", "SR"]
            ]
        }, {
            "type": "input_value",
            "name": "speed",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#3498DB",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_move2_4wd",
        "message0": "4 WD %1 speed1 %2 speed2 %3",
        "args0": [{
            "type": "field_dropdown",
            "name": "move",
            "options": [
                ["move forward", "FD2"],
                ["move backward", "BK2"],
            ]
        }, {
            "type": "input_value",
            "name": "speed1",
        }, {
            "type": "input_value",
            "name": "speed2",
        }],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#3498DB",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "turn",
        "message0": "Turn %1 speed %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "dir",
                "options": [
                    [
                        "Left",
                        "LEFT"
                    ],
                    [
                        "Right",
                        "RIGHT"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "speed",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#3498DB",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "spin",
        "message0": "Spin %1 speed %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "dir",
                "options": [
                    [
                        "Left",
                        "LEFT"
                    ],
                    [
                        "Right",
                        "RIGHT"
                    ]
                ]
            },
            {
                "type": "input_value",
                "name": "speed",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#3498DB",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "motor_stop",
        "message0": "motor %1 stop",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "n",
                "options": [
                    ["1", "1"],
                    ["2", "2"],
                    ["3", "3"],
                    ["4", "4"],
                    ["1+2", "12"],
                    ["3+4", "34"],
                    ["1+2+3+4", "100"],
                ]
            },
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#3498DB",
        "tooltip": "",
        "helpUrl": ""
    },
]);
