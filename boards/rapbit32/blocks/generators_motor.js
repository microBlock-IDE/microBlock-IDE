Blockly.Python['motor_forward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var number_speed = block.getFieldValue('speed');
  var number_time = block.getFieldValue('time');
  
  var code = `motor.forward(${number_speed}, ${number_time})\n`;
  return code;
};

Blockly.Python['motor_backward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var number_speed = block.getFieldValue('speed');
  var number_time = block.getFieldValue('time');

  var code = `motor.backward(${number_speed}, ${number_time})\n`;
  return code;
};

Blockly.Python['motor_turn_left'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var number_speed = block.getFieldValue('speed');
  var number_time = block.getFieldValue('time');
  
  var code = `motor.turn_left(${number_speed}, ${number_time})\n`;
  return code;
};

Blockly.Python['motor_turn_right'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var number_speed = block.getFieldValue('speed');
  var number_time = block.getFieldValue('time');

  var code = `motor.turn_right(${number_speed}, ${number_time})\n`;
  return code;
};

Blockly.Python['motor_move'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var dropdown_move = block.getFieldValue('move');
  var number_speed = block.getFieldValue('speed');

  var code = `motor.move(${dropdown_move}, ${number_speed})\n`;
  return code;
};

Blockly.Python['motor_wheel'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var number_speed1 = block.getFieldValue('speed1');
  var number_speed2 = block.getFieldValue('speed2');

  var code = `motor.wheel(${number_speed1}, ${number_speed2})\n`;
  return code;
};

Blockly.Python['motor_stop'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var code = `motor.stop()\n`;
  return code;
};