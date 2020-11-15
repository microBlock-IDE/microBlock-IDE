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
          "OUT1",
          "26"
        ],
        [
          "OUT2",
          "27"
        ],
        [
          "DAC1",
          "25"
        ],
        [
          "23",
          "23"
        ],
        [
          "19",
          "19"
        ],
        [
          "18",
          "18"
        ],
        [
          "BT LED",
          "17"
        ],
        [
          "WIFI LED",
          "2"
        ],
        [
          "NTP LED",
          "15"
        ],
        [
          "IOT LED",
          "12"
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
          "IN1",
          "32"
        ],
        [
          "IN2",
          "33"
        ],
        [
          "IN3",
          "34"
        ],
        [
          "IN4",
          "35"
        ],
        [
          "OUT1",
          "26"
        ],
        [
          "OUT2",
          "27"
        ],
        [
          "DAC1",
          "25"
        ],
        [
          "23",
          "23"
        ],
        [
          "19",
          "19"
        ],
        [
          "18",
          "18"
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
  "type": "pin_touch_read",
  "message0": "touch read pin %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [
          "IN1",
          "32"
        ],
        [
          "IN2",
          "33"
        ]
      ]
    }
  ],
  "output": "Number",
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
          "IN1",
          "32"
        ],
        [
          "IN2",
          "33"
        ],
        [
          "IN3",
          "34"
        ],
        [
          "IN4",
          "35"
        ]
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
          "OUT1",
          "26"
        ],
        [
          "OUT2",
          "27"
        ],
        [
          "23",
          "23"
        ],
        [
          "19",
          "19"
        ],
        [
          "18",
          "18"
        ],
        [
          "DAC1",
          "25"
        ],
        [
          "BT LED",
          "17"
        ],
        [
          "WIFI LED",
          "2"
        ],
        [
          "NTP LED",
          "15"
        ],
        [
          "IOT LED",
          "12"
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