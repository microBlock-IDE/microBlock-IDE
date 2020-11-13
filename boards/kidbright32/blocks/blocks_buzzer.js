Blockly.defineBlocksWithJsonArray([
{
  "type": "buzzer_tone",
  "message0": "buzzer tone frequency %1 Hz duration %2 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "freq",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "duration",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2C3E50",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "buzzer_notes",
  "message0": "buzzer notes %1 duration %2",
  "args0": [
    {
      "type": "input_value",
      "name": "notes",
      "check": "String"
    },
    {
      "type": "field_dropdown",
      "name": "duration",
      "options": [
        [
          {
            "src": `${rootPath}/boards/kidbright32/images/notes/whole.svg`,
            "width": 20,
            "height": 20,
            "alt": "whole note"
          },
          "4"
        ],
        [
          {
            "src": `${rootPath}/boards/kidbright32/images/notes/half.svg`,
            "width": 20,
            "height": 20,
            "alt": "half note"
          },
          "2"
        ],
        [
          {
            "src": `${rootPath}/boards/kidbright32/images/notes/quarter.svg`,
            "width": 20,
            "height": 20,
            "alt": "quarter note"
          },
          "1"
        ],
        [
          {
            "src": `${rootPath}/boards/kidbright32/images/notes/eighth.svg`,
            "width": 20,
            "height": 20,
            "alt": "eighth note"
          },
          "1 / 2"
        ],
        [
          {
            "src": `${rootPath}/boards/kidbright32/images/notes/sixteenth.svg`,
            "width": 20,
            "height": 20,
            "alt": "sixteenth note"
          },
          "1 / 4"
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
  "type": "buzzer_volume",
  "message0": "buzzer set volume %1 %%",
  "args0": [
    {
      "type": "input_value",
      "name": "level",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2C3E50",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "make_note",
  "message0": "%1 %2 %3",
  "args0": [
    {
      "type": "field_image",
      "src": `${rootPath}/boards/kidbright32/images/itunes-note-brands.svg`,
      "width": 15,
      "height": 15,
      "alt": "notes",
      "flipRtl": false
    },
    {
      "type": "field_label_serializable",
      "name": "label",
      "text": ""
    },
    {
      "type": "field_note",
      "name": "notes",
      "value": ""
    }
  ],
  "inputsInline": true,
  "output": "String",
  "colour": "#2C3E50",
  "tooltip": "",
  "helpUrl": ""
}
]);
