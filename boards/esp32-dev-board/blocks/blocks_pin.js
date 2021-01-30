Blockly.defineBlocksWithJsonArray([
{
  "type": "pin_digital_write",
  "message0": "digital write %1 to pin %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": [
        "Boolean",
        "Number"
      ]
    },
    {
      "type": "input_value",
      "name": "pin",
      "check": [
        "Boolean",
        "Number"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_digital_read",
  "message0": "digital read pin %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pin",
      "check": [
        "Boolean",
        "Number"
      ]
    }
  ],
  "output": [
    "Number",
    "Boolean"
  ],
  "inputsInline": true,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_touch_read",
  "message0": "touch read pin %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pin",
      "check": [
        "Boolean",
        "Number"
      ]
    }
  ],
  "output": "Number",
  "inputsInline": true,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_analog_read",
  "message0": "analog read pin %1",
  "args0": [
    {
      "type": "input_value",
      "name": "pin",
      "check": [
        "Boolean",
        "Number"
      ]
    }
  ],
  "output": "Number",
  "inputsInline": true,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_analog_write",
  "message0": "PWM write %1 to pin %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "pin",
      "check": [
        "Boolean",
        "Number"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
}
]);