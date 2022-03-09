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
        [ "D1", "10" ],
        [ "D2", "11" ],
        [ "D3", "12" ],
        [ "D4", "26" ],
        [ "D5", "27" ],
        [ "SV1", "18" ],
        [ "SV2", "19" ],
        [ "SV3", "20" ],
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
        [ "D1", "10" ],
        [ "D2", "11" ],
        [ "D3", "12" ],
        [ "D4", "26" ],
        [ "D5", "27" ],
        [ "SV1", "18" ],
        [ "SV2", "19" ],
        [ "SV3", "20" ],
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
  "message0": "analog read pin %1 (raw)",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "D4", "26" ],
        [ "D5", "27" ],
      ]
    }
  ],
  "output": "Number",
  "inputsInline": true,
  "colour": "#E74C3C",
  "tooltip": "Read analog value from pin D4 or D5 in range 0 - 4095",
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
        [ "D1", "10" ],
        [ "D2", "11" ],
        [ "D3", "12" ],
        [ "D4", "26" ],
        [ "D5", "27" ],
        [ "SV1", "18" ],
        [ "SV2", "19" ],
        [ "SV3", "20" ],
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
  "type": "pin_analog_read_calibrated",
  "message0": "analog read pin %1 (calibrated)",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "D4", "26" ],
        [ "D5", "27" ],
      ]
    }
  ],
  "output": "Number",
  "inputsInline": true,
  "colour": "#E74C3C",
  "tooltip": "Read analog value from pin D4 or D5 in range 0 - 4000",
  "helpUrl": ""
},
]);