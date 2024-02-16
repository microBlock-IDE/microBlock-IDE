Blockly.defineBlocksWithJsonArray([
{
  "type": "gamepad_is_connected",
  "message0": "Gamepad is Connected",
  "inputsInline": true,
  "output": [
    "Number",
    "Boolean"
  ],
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gamepad_forget_keys",
  "message0": "Gamepad Forget Keys",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gamepad_enable_new_bluetooth_connections",
  "message0": "Gamepad %1 New Bluetooth Connections",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "enable",
      "options": [
        [
          "Enable",
          "True"
        ],
        [
          "Disable",
          "False"
        ],
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gamepad_axis",
  "message0": "Gamepad Axis %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "fn_name",
      "options": [
        [
          "Left Stick X",
          "axisX"
        ],
        [
          "Left Stick Y",
          "axisY"
        ],
        [
          "Right Stick X",
          "axisRX"
        ],
        [
          "Right Stick Y",
          "axisRY"
        ],
        [
          "Accelerometer X",
          "accelX"
        ],
        [
          "Accelerometer Y",
          "accelY"
        ],
        [
          "Accelerometer Z",
          "accelZ"
        ],
        [
          "Gyroscope X",
          "gyroX"
        ],
        [
          "Gyroscope Y",
          "gyroY"
        ],
        [
          "Gyroscope Z",
          "gyroZ"
        ]
      ]
    }
  ],
  "output": "Number",
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gamepad_button_is_press",
  "message0": "Gamepad Button %1 is Pressed",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "fn_name",
      "options": [
        [
          "Up",
          "up"
        ],
        [
          "Left",
          "left"
        ],
        [
          "Right",
          "right"
        ],
        [
          "Down",
          "down"
        ],
        [
          "Cross",
          "cross"
        ],
        [
          "Square",
          "square"
        ],
        [
          "Triangle",
          "triangle"
        ],
        [
          "Circle",
          "circle"
        ],
        [
          "L1",
          "l1"
        ],
        [
          "L2",
          "l2"
        ],
        [
          "R1",
          "r1"
        ],
        [
          "R2",
          "r2"
        ]
      ]
    }
  ],
  "output": [
    "Boolean",
    "Number"
  ],
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gamepad_temperature",
  "message0": "Gamepad Temperature",
  "output": "Number",
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "gamepad_battery_level",
  "message0": "Gamepad Battery Level",
  "output": "Number",
  "colour": "#E67E22",
  "tooltip": "",
  "helpUrl": ""
}
]);