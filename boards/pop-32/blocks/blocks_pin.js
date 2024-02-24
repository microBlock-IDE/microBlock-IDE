Blockly.defineBlocksWithJsonArray([
{
  "type": "pin_mode",
  "message0": "set pin %1 as %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
        [ "A", "PC13" ],
        [ "B", "PB2" ],
        [ "OK", "PB1" ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "mode",
      "options": [
        [
          "OUTPUT",
          "OUTPUT"
        ],
        [
          "INPUT",
          "INPUT"
        ],
        [
          "INPUT_PULLUP",
          "INPUT_PULLUP"
        ],
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_digital_write",
  "message0": "digital write %1 to pin %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": [
        "Boolean",
        "Number"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
        [ "A", "PC13" ],
        [ "B", "PB2" ],
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_digital_read",
  "message0": "digital read pin %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
        [ "A", "PC13" ],
        [ "B", "PB2" ],
        [ "OK", "PB1" ],
      ]
    }
  ],
  "output": [
    "Number",
    "Boolean"
  ],
  "inputsInline": true,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_analog_read",
  "message0": "analog read pin %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "KNOB", "PB1" ],
      ]
    }
  ],
  "output": "Number",
  "inputsInline": true,
  "colour": "#E74C3C",
  "tooltip": "Read analog value from pin A0 to A0 in range 0 - 1023",
  "helpUrl": ""
},
{
  "type": "pin_analog_write",
  "message0": "PWM write %1 to pin %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E74C3C",
  "tooltip": "Write PWM value 0 to 255 to any pin",
  "helpUrl": ""
},
{
  "type": "pin_attach_interrupt",
  "message0": "attach interrupt pin %1 mode %2 %3 %4",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "mode",
      "options": [
        [ "LOW", "LOW" ],
        [ "CHANGE", "CHANGE" ],
        [ "RISING", "RISING" ],
        [ "FALLING", "FALLING" ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "code"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_detach_interrupt",
  "message0": "detach interrupt pin %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_pulse_in",
  "message0": "reads a pulse %1 on a pin %2 timeout %3 uS (uS)",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "value",
      "options": [
        [ "HIGH", "HIGH" ],
        [ "LOW", "LOW" ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
      ]
    },
    {
      "type": "input_value",
      "name": "timeout",
      "check": "Number"
    },
  ],
  "output": [
    "Number",
    "Boolean"
  ],
  "inputsInline": true,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_shift_in",
  "message0": "shift in with data pin %1 , clock pin %2 , bit order %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "data_pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "clock_pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "bit_order",
      "options": [
        [ "MSBFIRST", "MSBFIRST" ],
        [ "LSBFIRST", "LSBFIRST" ],
      ]
    },
  ],
  "output": [
    "Number",
    "Boolean"
  ],
  "inputsInline": true,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pin_shift_out",
  "message0": "shift out %1 with data pin %2 , clock pin %3 , bit order %4",
  "args0": [
    {
      "type": "input_value",
      "name": "value",
      "check": [
        "Boolean",
        "Number"
      ]
    },
    {
      "type": "field_dropdown",
      "name": "data_pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "clock_pin",
      "options": [
        [ "0", "PA0" ],
        [ "1", "PA1" ],
        [ "2", "PA2" ],
        [ "3", "PA3" ],
        [ "4", "PA4" ],
        [ "5", "PA5" ],
        [ "6", "PA6" ],
        [ "7", "PA7" ],
        [ "16", "PB0" ],
        [ "SERVO1", "PB10" ],
        [ "SERVO2", "PB3" ],
        [ "SERVO3", "PC15" ],
        [ "SERVO4", "PC14" ],
        [ "SERVO5", "PA15" ],
        [ "SERVO6", "PB11" ],
      ]
    },
    {
      "type": "field_dropdown",
      "name": "bit_order",
      "options": [
        [ "MSBFIRST", "MSBFIRST" ],
        [ "LSBFIRST", "LSBFIRST" ],
      ]
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#E74C3C",
  "tooltip": "",
  "helpUrl": ""
},
]);