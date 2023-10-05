Blockly.defineBlocksWithJsonArray([
{
  "type": "external_servo",
  "message0": "servo %1 set angle %2 °",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ch",
      "options": [
        [ "S1", "S1" ],
        [ "S2", "S2" ],
        [ "S3", "S3" ],
        [ "S4", "S4" ],
      ]
    },
    {
      "type": "input_value",
      "name": "angle"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#2C3E50",
  "tooltip": "",
  "helpUrl": ""
}
]);