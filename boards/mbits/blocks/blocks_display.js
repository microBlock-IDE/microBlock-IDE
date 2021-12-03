Blockly.defineBlocksWithJsonArray([
{
  "type": "display_custom",
  "message0": "display show %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dotmatrix_rgb",
      "name": "value"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_show",
  "message0": "display show 1-chars %1 color %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_scroll",
  "message0": "display show scroll %1 color %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_show2x5",
  "message0": "display show number %1 color %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_left_show",
  "message0": "display left show number %1 color %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_right_show",
  "message0": "display right show number %1 color %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_plot",
  "message0": "display plot %1 color %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_clear",
  "message0": "display clear",
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_dot_show",
  "message0": "display dot at %1 (x: %2 , y: %3) set color %4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "x",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "y",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_dot_hide",
  "message0": "display dot at %1 (x: %2 , y: %3) turn off",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "x",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "y",
      "check": "Number"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},

// Color
{
  "type": "colour_picker",
  "message0": "%1",
  "args0": [
    {
      "type": "field_colour",
      "name": "COLOUR",
      "colour": "#ff0000"
    }
  ],
  "output": "Colour",
  "helpUrl": "%{BKY_COLOUR_PICKER_HELPURL}",
  "colour": "#C0392B",
  "tooltip": "%{BKY_COLOUR_PICKER_TOOLTIP}",
  "extensions": ["parent_tooltip_when_inline"]
},
{
  "type": "colour_random",
  "message0": "random color",
  "output": "Colour",
  "helpUrl": "%{BKY_COLOUR_RANDOM_HELPURL}",
  "colour": "#C0392B",
  "tooltip": "%{BKY_COLOUR_RANDOM_TOOLTIP}"
},
{
  "type": "colour_rgb",
  "message0": "color with red %1 green %2 blue %3",
  "args0": [
    {
      "type": "input_value",
      "name": "RED",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "GREEN",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "BLUE",
      "check": "Number",
      "align": "RIGHT"
    }
  ],
  "output": "Colour",
  "helpUrl": "%{BKY_COLOUR_RGB_HELPURL}",
  "colour": "#C0392B",
  "tooltip": "%{BKY_COLOUR_RGB_TOOLTIP}"
},
]);
