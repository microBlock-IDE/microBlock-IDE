Blockly.defineBlocksWithJsonArray([
{
  "type": "switch_is_press",
  "message0": "switch %1 is press ?",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "n",
      "options": [
        [
          "SW1",
          "SW1"
        ],
        [
          "SW2",
          "SW2"
        ]
      ]
    }
  ],
  "output": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "switch_is_release",
  "message0": "switch %1 is release ?",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "n",
      "options": [
        [
          "SW1",
          "SW1"
        ],
        [
          "SW2",
          "SW2"
        ]
      ]
    }
  ],
  "output": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "switch_get_value",
  "message0": "switch %1 get value",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "n",
      "options": [
        [
          "SW1",
          "SW1"
        ],
        [
          "SW2",
          "SW2"
        ]
      ]
    }
  ],
  "output": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "switch_on_press",
  "message0": "switch %1 on press %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [
          "SW1",
          "SW1"
        ],
        [
          "SW2",
          "SW2"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "callback"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "switch_on_release",
  "message0": "switch %1 on release %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [
          "SW1",
          "SW1"
        ],
        [
          "SW2",
          "SW2"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "callback"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "switch_on_pressed",
  "message0": "switch %1 on pressed %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [
          "SW1",
          "SW1"
        ],
        [
          "SW2",
          "SW2"
        ],
        [
          "SW1+SW2",
          "SW12"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "callback"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
]);