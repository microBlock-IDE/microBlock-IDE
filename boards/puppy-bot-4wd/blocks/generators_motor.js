Blockly.Python['motor_forward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.forward(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_backward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.backward(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_turn_left'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.turn_left(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_turn_right'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.turn_right(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_spin_left'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.spin_left(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_spin_right'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.spin_right(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_forward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.mecanum_forward(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_backward'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.mecanum_backward(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_turn_left'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.mecanum_turn_left(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_turn_right'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.mecanum_turn_right(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_spin_left'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.mecanum_spin_left(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_spin_right'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.mecanum_spin_right(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_slide_left'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.mecanum_slide_left(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_slide_right'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.mecanum_slide_right(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_diagonal_left'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.mecanum_diagonal_left(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_mecanum_diagonal_right'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.mecanum_diagonal_right(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_move'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var dropdown_move = block.getFieldValue('move');
  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.move(motor.${dropdown_move}, ${value_speed})\n`;
  return code;
};

Blockly.Python['motor_move_mecanum'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var dropdown_move = block.getFieldValue('move');
  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.move_mecanum(motor.${dropdown_move}, ${value_speed})\n`;
  return code;
};

Blockly.Python['motor_wheel'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed_m1 = Blockly.Python.valueToCode(block, 'speed_m1', Blockly.Python.ORDER_ATOMIC);
  var value_speed_m2 = Blockly.Python.valueToCode(block, 'speed_m2', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.wheel(${value_speed_m1}, ${value_speed_m2})\n`;
  return code;
};

Blockly.Python['motor_mecanum_wheel'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var value_speed_m1 = Blockly.Python.valueToCode(block, 'speed_m1', Blockly.Python.ORDER_ATOMIC);
  var value_speed_m2 = Blockly.Python.valueToCode(block, 'speed_m2', Blockly.Python.ORDER_ATOMIC);
  var value_speed_m3 = Blockly.Python.valueToCode(block, 'speed_m1', Blockly.Python.ORDER_ATOMIC);
  var value_speed_m4 = Blockly.Python.valueToCode(block, 'speed_m2', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.wheel(${value_speed_m1}, ${value_speed_m2}, ${value_speed_m3}, ${value_speed_m4})\n`;
  return code;
};

Blockly.Python['motor_stop'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var code = `motor.stop()\n`;
  return code;
};

Blockly.Python['motor_stop_mecanum'] = function(block) {
  Blockly.Python.definitions_['import_motor'] = 'import motor';

  var code = `motor.stop_mecanum()\n`;
  return code;
};
