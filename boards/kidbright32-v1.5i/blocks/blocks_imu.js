Blockly.defineBlocksWithJsonArray([
{
  "type": "imu_update",
  "message0": "IMU update",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},  
{
  "type": "imu_is_gesture",
  "message0": "is %1 gesture",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "gesture",
      "options": [
        [
          "shake",
          "EVENT_SHAKE"
        ],
        [
          "board up",
          "EVENT_BOARD_UP"
        ],
        [
          "board down",
          "EVENT_BOARD_DOWN"
        ],
        [
          "screen up",
          "EVENT_SCREEN_UP"
        ],
        [
          "screen down",
          "EVENT_SCREEN_DOWN"
        ],
        [
          "tilt left",
          "EVENT_TILT_LEFT"
        ],
        [
          "tilt right",
          "EVENT_TILT_RIGHT"
        ],
        [
          "free fall",
          "EVENT_FREE_FALL"
        ],
        [
          "3g",
          "EVENT_3G"
        ],
        [
          "6g",
          "EVENT_6G"
        ],
        [
          "8g",
          "EVENT_8G"
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
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "imu_compass_heading",
  "message0": "compass heading (°)",
  "output": null,
  "colour": "#E67E22",
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
  "colour": "#E67E22",
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
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "imu_calibrate_compass",
  "message0": "calibrate compass",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
}
]);