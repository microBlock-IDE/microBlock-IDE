Blockly.defineBlocksWithJsonArray([
{
  "type": "external_servo",
  "message0": "servo %1 set angle %2 °",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ch",
      "options": [
        [ "SV1", "SV1" ],
        [ "SV2", "SV2" ],
        [ "SV3", "SV3" ],
        [ "SV4", "SV4" ],
        [ "SV5", "SV5" ],
        [ "SV6", "SV6" ],
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
  "colour": "#205388",
  "tooltip": "",
  "helpUrl": ""
}
]);