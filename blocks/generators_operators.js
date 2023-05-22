Blockly.Python['math_map'] = function (block) {
    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var value_from_min = Blockly.Python.valueToCode(block, 'from_min', Blockly.Python.ORDER_ATOMIC);
    var value_from_max = Blockly.Python.valueToCode(block, 'from_max', Blockly.Python.ORDER_ATOMIC);
    var value_to_min = Blockly.Python.valueToCode(block, 'to_min', Blockly.Python.ORDER_ATOMIC);
    var value_to_max = Blockly.Python.valueToCode(block, 'to_max', Blockly.Python.ORDER_ATOMIC);

    var code = `((${value_value} - ${value_from_min}) * (${value_to_max} - ${value_to_min}) / (${value_from_max} - ${value_from_min}) + ${value_to_min})`;
    return [code, Blockly.Python.ORDER_NONE];
};
