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
          "LED",
          "18"
        ],
        [
          "DAC1",
          "26"
        ],
        [
          "5",
          "5"
        ],
        [
          "19",
          "19"
        ],
        [
          "23",
          "23"
        ]
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
          "ADC4",
          "32"
        ],
        [
          "ADC5",
          "33"
        ],
        [
          "ADC6",
          "34"
        ],
        [
          "ADC7",
          "35"
        ],
        [
          "DAC1",
          "26"
        ],
        [
          "5",
          "5"
        ],
        [
          "19",
          "19"
        ],
        [
          "23",
          "23"
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
          "ADC4",
          "32"
        ],
        [
          "ADC5",
          "33"
        ],
        [
          "ADC6",
          "34"
        ],
        [
          "ADC7",
          "35"
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
          "LED",
          "18"
        ],
        [
          "DAC1",
          "26"
        ],
        [
          "5",
          "5"
        ],
        [
          "19",
          "19"
        ],
        [
          "23",
          "23"
        ]
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