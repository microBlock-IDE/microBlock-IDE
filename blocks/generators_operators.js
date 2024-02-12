Blockly.Python['math_map'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var value_from_min = Blockly.Python.valueToCode(block, 'from_min', Blockly.Python.ORDER_ATOMIC);
    var value_from_max = Blockly.Python.valueToCode(block, 'from_max', Blockly.Python.ORDER_ATOMIC);
    var value_to_min = Blockly.Python.valueToCode(block, 'to_min', Blockly.Python.ORDER_ATOMIC);
    var value_to_max = Blockly.Python.valueToCode(block, 'to_max', Blockly.Python.ORDER_ATOMIC);

    var code = `((${value_value} - ${value_from_min}) * (${value_to_max} - ${value_to_min}) / (${value_from_max} - ${value_from_min}) + ${value_to_min})`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.JavaScript.forBlock['math_map'] = function (block) {
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var value_from_min = Blockly.JavaScript.valueToCode(block, 'from_min', Blockly.JavaScript.ORDER_ATOMIC);
    var value_from_max = Blockly.JavaScript.valueToCode(block, 'from_max', Blockly.JavaScript.ORDER_ATOMIC);
    var value_to_min = Blockly.JavaScript.valueToCode(block, 'to_min', Blockly.JavaScript.ORDER_ATOMIC);
    var value_to_max = Blockly.JavaScript.valueToCode(block, 'to_max', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `map(${value_value}, ${value_from_min}, ${value_from_max}, ${value_to_min}, ${value_to_max})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript.forBlock['logic_compare'] = function (block) {
    // Comparison operator.
    const OPERATORS = { 'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>=' };
    const operator = OPERATORS[block.getFieldValue('OP')];
    const order = (operator === '==' || operator === '!=') ? Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
    let argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
    let argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);

    const getTypeValue = valueName => {
        if (block.childBlocks_.length >= 1) {
            const child = block.getInputTargetBlock(valueName);
            return child?.outputConnection?.check[0];
        }
        return NaN;
    };

    if ((!argument0) || (!argument1)) {
        const type0 = getTypeValue("A");
        const type1 = getTypeValue("B");

        if ([type0, type1].indexOf("String")) {
            if (!argument0) {
                argument0 = '""';
            }
            if (!argument1) {
                argument1 = '""';
            }
        }

        argument0 = argument0 || "0";
        argument1 = argument1 || "0";
    }

    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

/*
Blockly.JavaScript.forBlock['logic_operation'] = function (block) {
    // Operations 'and', 'or'.
    const operator = (block.getFieldValue('OP') === 'AND') ? '&&' : '||';
    const order = (operator === '&&') ? Blockly.Python.ORDER_LOGICAL_AND : Blockly.Python.ORDER_LOGICAL_OR;
    let argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
    let argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);

    console.log("argument", argument0, argument1);

    if (!argument0 && !argument1) {
        // If there are no arguments, then the return value is false.
        argument0 = 'false';
        argument1 = 'false';
    } else {
        // Single missing arguments have no effect on the return value.
        const defaultArgument = (operator === '&&') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }

    const code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};
*/


Blockly.JavaScript.forBlock['math_round'] = function (block) {
    // Math operators with single operand.
    var operator = block.getFieldValue('OP');
    var code;
    var arg = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

    switch (operator) {
        case 'ROUND':
            code = 'round(' + arg + ')';
            break;
        case 'ROUNDUP':
            code = 'ceil(' + arg + ')';
            break;
        case 'ROUNDDOWN':
            code = 'floor(' + arg + ')';
            break;
    }
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.forBlock['math_trig'] = function (block) {
    // Math operators with single operand.
    var operator = block.getFieldValue('OP');
    var code;
    var arg = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

    code = operator.toLowerCase() + '(' + arg + ' * PI / 180.0)';
    /*
    switch (operator) {
        case 'SIN':
            code = 'sin(' + arg + ' * PI/180.0)';
            break;
        case 'COS':
            code = 'cos(' + arg + ' * PI/180.0)';
            break;
        case 'TAN':
            code = 'tan(' + arg + ' * PI/180.0)';
            break;
        case 'ASIN':
            code = 'asin(' + arg + ') * 180.0 / PI';
            break;
        case 'ACOS':
            code = 'acos(' + arg + ') * 180.0 / PI';
            break;
        case 'ATAN':
            code = 'atan(' + arg + ') * 180.0 / PI';
            break;
    }*/

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
}
