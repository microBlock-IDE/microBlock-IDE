Blockly.Python['math_change'] = function (block) {
  // Add to a variable in place.
  var argument0 = Blockly.Python.valueToCode(block, 'DELTA',
    Blockly.Python.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME);
  return `${varName} = (${varName} if type(${varName}) in [ int, float ] else 0) + ${argument0}\n`;
};
