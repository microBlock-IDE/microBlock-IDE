Blockly.defineBlocksWithJsonArray([
{
  "type": "dht_read",
  "message0": "%1 pin %2 read %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [
          "DHT11",
          "11"
        ],
        [
          "DHT22",
          "22"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "pin",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "valueIndex",
      "options": [
        [
          "temperature",
          "0"
        ],
        [
          "humidity",
          "1"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ds18x20_read",
  "message0": "DS18x20 pin %1 read temperature",
  "args0": [
    {
      "type": "input_value",
      "name": "pin",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
]);