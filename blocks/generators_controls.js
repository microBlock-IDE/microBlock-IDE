Blockly.JavaScript['controls_wait'] = function(block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['controls_wait_until'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['controls_forever'] = function(block) {
  var statements_block = Blockly.JavaScript.statementToCode(block, 'block');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};