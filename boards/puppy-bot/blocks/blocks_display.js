Blockly.defineBlocksWithJsonArray([
{
  "type": "display_draw_text",
  "message0": "Display draw text %1 x: %2 y: %3 colour: %4 font: %5",
  "args0": [
    {
      "type": "input_value",
      "name": "text",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "x",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "y",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour",
      "align": "RIGHT"
    },
    {
      "type": "field_dropdown",
      "name": "font",
      "options": [
        [
          "Supermarket 20",
          "FONT_SUPERMARKET_20"
        ],
        [
          "Supermarket 40",
          "FONT_SUPERMARKET_40"
        ],
        [
          "Supermarket 60",
          "FONT_SUPERMARKET_60"
        ],
        [
          "Supermarket 120",
          "FONT_SUPERMARKET_120"
        ],
        [
          "TH Sarabun New 20",
          "FONT_TH_SARABUN_NEW_20"
        ],
        [
          "TH Sarabun New 40",
          "FONT_TH_SARABUN_NEW_40"
        ],
        [
          "TH Sarabun New 60",
          "FONT_TH_SARABUN_NEW_60"
        ]
      ]
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "Draw text on screen",
  "helpUrl": ""
},
{
  "type": "display_draw_line",
  "message0": "Display draw line %1 start x: %2 start y: %3 x end: %4 y end: %5 colour: %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "x1",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "y1",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "x2",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "y2",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour",
      "align": "RIGHT"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "Draw line on screen",
  "helpUrl": ""
},
{
  "type": "display_draw_rect",
  "message0": "Display draw rectangle %1 x start: %2 y start: %3 width: %4 height: %5 colour: %6 fill: %7",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "x",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "y",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "width",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "height",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour",
      "align": "RIGHT"
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
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "Draw rectangle on screen",
  "helpUrl": ""
},
{
  "type": "display_draw_circle",
  "message0": "Display draw circle %1 x center: %2 y center: %3 radius: %4 colour: %5 fill: %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "x",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "y",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "r",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour",
      "align": "RIGHT"
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
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "Draw circle on screen",
  "helpUrl": ""
},
{
  "type": "display_fill",
  "message0": "Display fill colour %1",
  "args0": [
    {
      "type": "input_value",
      "name": "color",
      "check": "Colour"
    },
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2980B9",
  "tooltip": "Fill screen with color",
  "helpUrl": ""
},
{
  "type": "display_draw_bitmap",
  "message0": "Display show image %1 %2 at (x: %3 , y: %4)",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_bitmap",
      "name": "image",
      "colour": "#ff0000"
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
  "colour": "#2980B9",
  "tooltip": "Show image on screen",
  "helpUrl": ""
}
]);
