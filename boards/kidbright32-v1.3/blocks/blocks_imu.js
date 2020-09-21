Blockly.defineBlocksWithJsonArray([
{
  "type": "imu_update",
  "message0": "IMU update",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#F39C12",
  "tooltip": "",
  "helpUrl": ""
},    
{
  "type": "imu_acceleration",
  "message0": "acceleration (mg) %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "axis",
      "options": [
        [
          "x",
          "0"
        ],
        [
          "y",
          "1"
        ],
        [
          "z",
          "2"
        ],
        [
          "strength",
          "3"
        ]
      ]
    }
  ],
  "output": null,
  "colour": "#F39C12",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "imu_compass_heading",
  "message0": "compass heading (°)",
  "output": null,
  "colour": "#F39C12",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "imu_rotation",
  "message0": "rotation (°) %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "axis",
      "options": [
        [
          "pitch",
          "1"
        ],
        [
          "roll",
          "0"
        ]
      ]
    }
  ],
  "output": null,
  "colour": "#F39C12",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "imu_magnetic_force",
  "message0": "magnetic force (uT) %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "axis",
      "options": [
        [
          "x",
          "0"
        ],
        [
          "y",
          "1"
        ],
        [
          "z",
          "2"
        ],
        [
          "strength",
          "3"
        ]
      ]
    }
  ],
  "output": null,
  "colour": "#F39C12",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "imu_calibrate_compass",
  "message0": "calibrate compass",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#F39C12",
  "tooltip": "",
  "helpUrl": ""
}
]);