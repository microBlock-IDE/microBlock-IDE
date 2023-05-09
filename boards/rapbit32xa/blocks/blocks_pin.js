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
        [
          "LED1",
          "23"
        ],
        [
          "LED2",
          "25"
        ],
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2C3E50",
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
        [
          "SW1",
          "32"
        ]
      ]
    }
  ],
  "output": [
    "Number",
    "Boolean"
  ],
  "colour": "#E67E22",
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
        [
          "KNOB",
          "36"
        ],
        [
          "LDR1",
          "34"
        ],
        [
          "LDR2",
          "32"
        ],
        [
          "Ligth1",
          "39"
        ],
        [
          "Ligth2",
          "35"
        ],
        [
          "Ligth3",
          "33"
        ],
      ]
    }
  ],
  "output": "Number",
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
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [
          "LED1",
          "23"
        ],
        [
          "LED2",
          "25"
        ],
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2C3E50",
  "tooltip": "",
  "helpUrl": ""
}
]);