Blockly.defineBlocksWithJsonArray([
{
  "type": "controls_wait",
  "message0": "wait %1 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#D4AC0D",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "controls_repeat_ext",
  "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
  "args0": [{
    "type": "input_value",
    "name": "TIMES",
    "check": "Number"
  }],
  "message1": "%1",
  "args1": [{
    "type": "input_statement",
    "name": "DO"
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#D4AC0D",
  "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
  "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
},
{
  "type": "controls_if",
  "message0": "%{BKY_CONTROLS_IF_MSG_IF} %1",
  "args0": [
    {
      "type": "input_value",
      "name": "IF0",
      "check": "Boolean"
    }
  ],
  "message1": "%1",
  "args1": [
    {
      "type": "input_statement",
      "name": "DO0"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#D4AC0D",
  "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
  "mutator": "controls_if_mutator",
  "extensions": ["controls_if_tooltip"]
},
{
  "type": "controls_wait_until",
  "message0": "wait until %1",
  "args0": [
    {
      "type": "input_value",
      "name": "condition",
      "check": [
        "Number",
        "Boolean"
      ]
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#D4AC0D",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "controls_forever",
  "message0": "forever %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "block"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#D4AC0D",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "controls_whileUntil",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "MODE",
      "options": [
        ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_WHILE}", "WHILE"],
        ["%{BKY_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL}", "UNTIL"]
      ]
    },
    {
      "type": "input_value",
      "name": "BOOL",
      "check": "Boolean"
    }
  ],
  "message1": "%1",
  "args1": [{
    "type": "input_statement",
    "name": "DO"
  }],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#D4AC0D",
  "helpUrl": "%{BKY_CONTROLS_WHILEUNTIL_HELPURL}",
  "extensions": ["controls_whileUntil_tooltip"]
},
{
  "type": "controls_for",
  "message0": "%{BKY_CONTROLS_FOR_TITLE}",
  "args0": [
    {
      "type": "field_variable",
      "name": "VAR",
      "variable": null
    },
    {
      "type": "input_value",
      "name": "FROM",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "TO",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "BY",
      "check": "Number",
      "align": "RIGHT"
    }
  ],
  "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
  "args1": [{
    "type": "input_statement",
    "name": "DO"
  }],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#D4AC0D",
  "helpUrl": "%{BKY_CONTROLS_FOR_HELPURL}",
  "extensions": [
    "contextMenu_newGetVariableBlock",
    "controls_for_tooltip"
  ]
},
]);