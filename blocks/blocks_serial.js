Blockly.defineBlocksWithJsonArray([
    {
        "type": "serial_begin",
        "message0": "Serial begin with baud rate %1",
        "args0": [
            {
                "type": "input_value",
                "name": "baud",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#8E44AD",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "serial_print",
        "message0": "Serial print %1",
        "args0": [
            {
                "type": "input_value",
                "name": "text",
                "check": [
                    "Number",
                    "String"
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#8E44AD",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "serial_println",
        "message0": "Serial print %1 with new line",
        "args0": [
            {
                "type": "input_value",
                "name": "text",
                "check": [
                    "Number",
                    "String"
                ]
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#8E44AD",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "serial_set_timeout",
        "message0": "Serial set timeout %1 ms",
        "args0": [
            {
                "type": "input_value",
                "name": "timeout",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#8E44AD",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "serial_available",
        "message0": "Serial available",
        "output": [
            "Number",
            "Boolean"
        ],
        "colour": "#8E44AD",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "serial_read_string",
        "message0": "Serial read text",
        "output": [
            "String"
        ],
        "colour": "#8E44AD",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "serial_read_number_float",
        "message0": "Serial read number (float)",
        "output": "Number",
        "colour": "#8E44AD",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "serial_read_number",
        "message0": "Serial read number",
        "output": "Number",
        "colour": "#8E44AD",
        "tooltip": "",
        "helpUrl": ""
    }
]);