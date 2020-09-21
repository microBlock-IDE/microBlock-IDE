Blockly.defineBlocksWithJsonArray([
{
  "type": "imu_update",
  "message0": "IMU update",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
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
          "AXIS_X"
        ],
        [
          "y",
          "AXIS_Y"
        ],
        [
          "z",
          "AXIS_Z"
        ],
        [
          "strength",
          "STRENGTH"
        ]
      ]
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "imu_compass_heading",
  "message0": "compass heading (°)",
  "output": null,
  "colour": 230,
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
          "AXIS_PITCH"
        ],
        [
          "roll",
          "AXIS_ROLL"
        ]
      ]
    }
  ],
  "output": null,
  "colour": 230,
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
          "AXIS_X"
        ],
        [
          "y",
          "AXIS_Y"
        ],
        [
          "z",
          "AXIS_Z"
        ],
        [
          "strength",
          "STRENGTH"
        ]
      ]
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "imu_calibrate_compass",
  "message0": "calibrate compass",
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
]);