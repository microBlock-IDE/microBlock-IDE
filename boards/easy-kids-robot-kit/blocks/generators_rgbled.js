Blockly.Python['rgbled_set_color'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');

  Blockly.Python.definitions_[`rom_board_import_rgbled_${dropdown_pin}`] = `from board import rgbled_${dropdown_pin}`;

  var value_n = Blockly.Python.valueToCode(block, 'n', Blockly.Python.ORDER_ATOMIC);
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

  var code = `rgbled_${dropdown_pin}.set_color(${value_n}, ${value_color})\n`;
  return code;
};

Blockly.Python['rgbled_fill_color'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');

  Blockly.Python.definitions_[`rom_board_import_rgbled_${dropdown_pin}`] = `from board import rgbled_${dropdown_pin}`;

  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

  var code = `rgbled_${dropdown_pin}.fill(${value_color})\n`;
  return code;
};

Blockly.Python['rgbled_show'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');

  Blockly.Python.definitions_[`rom_board_import_rgbled_${dropdown_pin}`] = `from board import rgbled_${dropdown_pin}`;

  var code = `rgbled_${dropdown_pin}.show()\n`;
  return code;
};

Blockly.Python['rgbled_clear'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');

  Blockly.Python.definitions_[`rom_board_import_rgbled_${dropdown_pin}`] = `from board import rgbled_${dropdown_pin}`;

  var code = `rgbled_${dropdown_pin}.clear()\n`;
  return code;
};

Blockly.Python['rgbled_rainbow'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');

  Blockly.Python.definitions_[`rom_board_import_rgbled_${dropdown_pin}`] = `from board import rgbled_${dropdown_pin}`;

  var value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC) || '30';

  var code = `rgbled_${dropdown_pin}.rainbow(${value_wait})\n`;
  return code;
};

Blockly.Python['rgbled_set_brightness'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');

  Blockly.Python.definitions_[`rom_board_import_rgbled_${dropdown_pin}`] = `from board import rgbled_${dropdown_pin}`;

  var value_brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC);

  var code = `rgbled_${dropdown_pin}.set_brightness(${value_brightness})\n`;
  return code;
};
