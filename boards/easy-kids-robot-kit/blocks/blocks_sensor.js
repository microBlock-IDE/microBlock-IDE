Blockly.defineBlocksWithJsonArray([
{
  "type": "sensor_light_is_color",
  "message0": "%1 is detect %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "sensor",
      "options": [
        [
          "Light1",
          "1"
        ],
        [
          "Light2",
          "2"
        ],
        [
          "Light3",
          "3"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "color",
      "options": [
        [
          "Black",
          "black"
        ],
        [
          "White",
          "white"
        ]
      ]
    }
  ],
  "output": "Boolean",
  "colour": "#E67E22",
  "tooltip": "Return true if sensor found color",
  "helpUrl": ""
},
{
  "type": "sensor_set_threshold",
  "message0": "set %1 threshold to %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "color",
      "options": [
        [
          "Black",
          "black"
        ],
        [
          "White",
          "white"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "threshold",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "Set Black & White threshold",
  "helpUrl": ""
},
{
  "type": "sensor_light",
  "message0": "%1 light level (%%)",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "sensor",
      "options": [
        [
          "LDR1",
          "1"
        ],
        [
          "LDR2",
          "2"
        ]
      ]
    }
  ],
  "output": "Number",
  "colour": "#E67E22",
  "tooltip": "Return 0% - 100% of light level",
  "helpUrl": ""
},
{
  "type": "ultrasonic_read",
  "message0": "distance (cm)",
  "output": "Number",
  "colour": "#E67E22",
  "tooltip": "Read distance in cm",
  "helpUrl": ""
}
]);