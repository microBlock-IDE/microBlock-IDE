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
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "D0", "26" ],
        [ "D1", "13" ],
        [ "D2", "14" ],
        [ "D3", "15" ],
        [ "D4", "27" ],
        [ "D5", "32" ],
        [ "D6", "33" ],
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_digital_read",
  "message0": "digital read pin %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "D0", "26" ],
        [ "D1", "13" ],
        [ "D2", "14" ],
        [ "D3", "15" ],
        [ "D4", "27" ],
        [ "D5", "32" ],
        [ "D6", "33" ],
      ]
    }
  ],
  "output": [
    "Number",
    "Boolean"
  ],
  "inputsInline": true,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_analog_read",
  "message0": "analog read pin %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "VR", "34" ],
        [ "A0", "26" ],
        [ "A1", "13" ],
        [ "A2", "14" ],
        [ "A3", "15" ],
        [ "A4", "27" ],
        [ "A5", "32" ],
        [ "A6", "33" ],
      ]
    }
  ],
  "output": "Number",
  "inputsInline": true,
  "colour": "#E74C3C",
  "tooltip": "Read analog value from pin Ax in range 0 - 4095",
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
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "D0", "26" ],
        [ "D1", "13" ],
        [ "D2", "14" ],
        [ "D3", "15" ],
        [ "D4", "27" ],
        [ "D5", "32" ],
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E74C3C",
  "tooltip": "Write PWM value 0 to 1023 to any pin",
  "helpUrl": ""
},
{
  "type": "pin_pulse_in",
  "message0": "reads a pulse %1 on a pin %2 timeout %3 uS (uS)",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "value",
      "options": [
        [ "HIGH", "HIGH" ],
        [ "LOW", "LOW" ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "D0", "26" ],
        [ "D1", "13" ],
        [ "D2", "14" ],
        [ "D3", "15" ],
        [ "D4", "27" ],
        [ "D5", "32" ],
        [ "D6", "33" ],
      ]
    },
    {
      "type": "input_value",
      "name": "timeout",
      "check": "Number"
    },
  ],
  "output": [
    "Number",
    "Boolean"
  ],
  "inputsInline": true,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
]);