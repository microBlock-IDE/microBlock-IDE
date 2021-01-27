Blockly.defineBlocksWithJsonArray([
  {
    "type": "math_arithmetic",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Number"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": "#34495E",
    "helpUrl": "%{BKY_MATH_ARITHMETIC_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },
  {
    "type": "math_random_int",
    "message0": "%{BKY_MATH_RANDOM_INT_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "FROM",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "TO",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": "#34495E",
    "tooltip": "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_RANDOM_INT_HELPURL}"
  },
  {
    "type": "logic_compare",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["=", "EQ"],
          ["\u2260", "NEQ"],
          ["\u200F<", "LT"],
          ["\u200F\u2264", "LTE"],
          ["\u200F>", "GT"],
          ["\u200F\u2265", "GTE"]
        ]
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": "#34495E",
    "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
    "extensions": ["logic_compare", "logic_op_tooltip"]
  },
  {
    "type": "logic_operation",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A",
        "check": "Boolean"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
          ["%{BKY_LOGIC_OPERATION_OR}", "OR"]
        ]
      },
      {
        "type": "input_value",
        "name": "B",
        "check": "Boolean"
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": "#34495E",
    "helpUrl": "%{BKY_LOGIC_OPERATION_HELPURL}",
    "extensions": ["logic_op_tooltip"]
  },
  {
    "type": "logic_negate",
    "message0": "%{BKY_LOGIC_NEGATE_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "BOOL",
        "check": "Boolean"
      }
    ],
    "output": "Boolean",
    "colour": "#34495E",
    "tooltip": "%{BKY_LOGIC_NEGATE_TOOLTIP}",
    "helpUrl": "%{BKY_LOGIC_NEGATE_HELPURL}"
  },
  {
    "type": "math_trig",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_TRIG_SIN}", "SIN"],
          ["%{BKY_MATH_TRIG_COS}", "COS"],
          ["%{BKY_MATH_TRIG_TAN}", "TAN"],
          ["%{BKY_MATH_TRIG_ASIN}", "ASIN"],
          ["%{BKY_MATH_TRIG_ACOS}", "ACOS"],
          ["%{BKY_MATH_TRIG_ATAN}", "ATAN"]
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#34495E",
    "helpUrl": "%{BKY_MATH_TRIG_HELPURL}",
    "extensions": ["math_op_tooltip"]
  },
  {
    "type": "math_round",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["%{BKY_MATH_ROUND_OPERATOR_ROUND}", "ROUND"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}", "ROUNDUP"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}", "ROUNDDOWN"]
        ]
      },
      {
        "type": "input_value",
        "name": "NUM",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": "#34495E",
    "helpUrl": "%{BKY_MATH_ROUND_HELPURL}",
    "tooltip": "%{BKY_MATH_ROUND_TOOLTIP}"
  },
  {
    "type": "text",
    "message0": "%1",
    "args0": [{
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    }],
    "output": "String",
    "colour": "#34495E",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
    "extensions": [
      "text_quotes",
      "parent_tooltip_when_inline"
    ]
  },
  {
    "type": "text_join",
    "message0": "",
    "output": "String",
    "colour": "#34495E",
    "helpUrl": "%{BKY_TEXT_JOIN_HELPURL}",
    "tooltip": "%{BKY_TEXT_JOIN_TOOLTIP}",
    "mutator": "text_join_mutator"
  },
  {
    "type": "random_seed",
    "message0": "random seed",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#34495E",
    "tooltip": "initialize the pseudo-random number generator",
    "helpUrl": ""
  },
  {
    "type": "math_modulo",
    "message0": "%{BKY_MATH_MODULO_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "DIVIDEND",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "DIVISOR",
        "check": "Number"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": "#34495E",
    "tooltip": "%{BKY_MATH_MODULO_TOOLTIP}",
    "helpUrl": "%{BKY_MATH_MODULO_HELPURL}"
  },
]);