Blockly.defineBlocksWithJsonArray([
{
  "type": "external_servo",
  "message0": "servo %1 set angle %2 °",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "ch",
      "options": [
        [
          "SV1",
          "servo.SV1"
        ],
        [
          "SV2",
          "servo.SV2"
        ],
        [
          "SV3",
          "servo.SV3"
        ],
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
