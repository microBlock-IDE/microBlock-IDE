Blockly.defineBlocksWithJsonArray([
{
  "type": "display_draw_text",
  "message0": "Display draw text %1 at (x: %2 , y: %3 )",
  "args0": [
    {
      "type": "input_value",
      "name": "text"
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
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "Draw text on display",
  "helpUrl": ""
},
{
  "type": "display_draw_line",
  "message0": "Display draw line start at (x: %1 , y: %2 ) end at (x: %3 , y: %4 )",
  "args0": [
    {
      "type": "input_value",
      "name": "x1",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "y1",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "x2",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "y2",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "Draw line on display",
  "helpUrl": ""
},
{
  "type": "display_draw_rect",
  "message0": "Display draw rectangle start at (x: %1 , y: %2 ) width: %3 height: %4 fill: %5",
  "args0": [
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
      "name": "width",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "height",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "fill",
      "options": [
        [
          "No",
          "0"
        ],
        [
          "Yes",
          "1"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "Draw rectangle on display",
  "helpUrl": ""
},
{
  "type": "display_fill",
  "message0": "Display fill",
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "Fill screen",
  "helpUrl": ""
},
{
  "type": "display_clear",
  "message0": "Display clear",
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "clear screen",
  "helpUrl": ""
}
]);
