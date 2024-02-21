Blockly.Python['motor_forward'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.forward(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_backward'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.backward(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_turn_left'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.turn_left(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_turn_right'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.turn_right(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_spin_left'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.spin_left(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_spin_right'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.spin_right(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_slide_left'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  
  var code = `motor.slide_left(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_slide_right'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.slide_right(${value_speed}, ${value_time})\n`;
  return code;
};

Blockly.Python['motor_move'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var dropdown_move = block.getFieldValue('move');
  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.move(${dropdown_move}, ${value_speed})\n`;
  return code;
};

Blockly.Python['motor_wheel'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_speed1 = Blockly.Python.valueToCode(block, 'speed1', Blockly.Python.ORDER_ATOMIC);
  var value_speed2 = Blockly.Python.valueToCode(block, 'speed2', Blockly.Python.ORDER_ATOMIC);
  var value_speed3 = Blockly.Python.valueToCode(block, 'speed3', Blockly.Python.ORDER_ATOMIC);
  var value_speed4 = Blockly.Python.valueToCode(block, 'speed4', Blockly.Python.ORDER_ATOMIC);

  var code = `motor.wheel(${value_speed1}, ${value_speed2}, ${value_speed3}, ${value_speed4})\n`;
  return code;
};

Blockly.Python['motor_stop'] = function(block) {
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var code = `motor.stop()\n`;
  return code;
};

Blockly.Python['motor_set_pwm'] = function(block) {
  // Blockly.Python.definitions_['from_board_import_pca9685'] = 'from board import pca9685';
  Blockly.Python.definitions_['from_board_import_motor'] = 'from board import motor';

  var value_freq = Blockly.Python.valueToCode(block, 'freq', Blockly.Python.ORDER_ATOMIC);

  /*
  var functionName = Blockly.Python.provideFunction_(
    'motor_set_pwn_frequency',
    [
      'def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(freq):',
      '  # Set frequency',
      '  pca9685.i2c.writeto_mem(pca9685.addr, 0x00, b"\\x10") # Sleep mode',
      '  pca9685.i2c.writeto_mem(pca9685.addr, 0xFE, bytes([ int((25000000 / (4096 * freq)) - 1) ])) # Prescaler',
      '  pca9685.i2c.writeto_mem(pca9685.addr, 0x00, b"\\x80") # Restart',
      '  pca9685.i2c.writeto_mem(pca9685.addr, 0x00, b"\\x20") # Auto-Increment enabled',
      '  pca9685.i2c.writeto_mem(pca9685.addr, 0x01, b"\\x04") # OUTDRV -> 1',
    ]
  );

  var code = `${functionName}(${value_freq})\n`;
  */
  
  var code = `motor.set_frequency(${value_freq})\n`;
  return code;
};
