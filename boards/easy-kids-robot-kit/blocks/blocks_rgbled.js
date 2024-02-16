Blockly.defineBlocksWithJsonArray(
[
{
  "type": "rgbled_set_color",
  "message0": "RGBLED %1 number %2 set color %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
          ["Board", "board"],
          ["Car", "car"],
      ]
    },
    {
      "type": "input_value",
      "name": "n",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour",
      "align": "RIGHT"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#058863",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rgbled_fill_color",
  "message0": "RGBLED %1 fill color %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
          ["Board", "board"],
          ["Car", "car"],
      ]
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour",
      "align": "RIGHT"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#058863",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rgbled_show",
  "message0": "RGBLED %1 show",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
          ["Board", "board"],
          ["Car", "car"],
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#058863",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rgbled_clear",
  "message0": "RGBLED %1 clear",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
          ["Board", "board"],
          ["Car", "car"],
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#058863",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rgbled_rainbow",
  "message0": "RGBLED %1 rainbow with wait %2 ms",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
          ["Board", "board"],
          ["Car", "car"],
      ]
    },
    {
      "type": "input_value",
      "name": "wait",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#058863",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rgbled_set_brightness",
  "message0": "RGBLED %1 set brightness %2 %%",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
          ["Board", "board"],
          ["Car", "car"],
      ]
    },
    {
      "type": "input_value",
      "name": "brightness",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#058863",
  "tooltip": "",
  "helpUrl": ""
}]
);
