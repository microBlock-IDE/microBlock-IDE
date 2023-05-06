Blockly.Python['controls_wait'] = function(block) {
  Blockly.Python.definitions_['from_time_import_sleep'] = 'from time import sleep';

  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  var code = `sleep(${value_time})\n`;
  return code;
};

Blockly.Python['controls_wait_until'] = function(block) {
  var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var code = `while not ${value_condition}: pass\n`;
  return code;
};

Blockly.Python['controls_forever'] = function(block) {
  var statements_block = Blockly.Python.statementToCode(block, 'block');
  var code = `while True:\n${statements_block}`;
  return code;
};

Blockly.Python['controls_on_start'] = function(block) {
  var statements_block = Blockly.Python.statementToCode(block, 'block');
  const line = statements_block.split(/\r\n|\r|\n/);
  const code = line.map(a => a.substring(2)).join("\n") + "\n";
  return code;
};

Blockly.Python['controls_forever_no_connect'] = function(block) {
  var statements_block = Blockly.Python.statementToCode(block, 'block');
  var code = `while True:\n${statements_block || "  pass"}\n`;
  return code;
};
