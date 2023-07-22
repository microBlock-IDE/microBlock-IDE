Blockly.Python['rgbled_set_color'] = function(block) {
  Blockly.Python.definitions_['from_board_import_rgbled'] = 'from board import rgbled';

  var dropdown_pin = block.getFieldValue('pin');
  var value_n = Blockly.Python.valueToCode(block, 'n', Blockly.Python.ORDER_ATOMIC);
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

  var code = `rgbled["${dropdown_pin}"].set_color(${value_n}, ${value_color})\n`;
  return code;
};

Blockly.Python['rgbled_fill_color'] = function(block) {
  Blockly.Python.definitions_['from_board_import_rgbled'] = 'from board import rgbled';

  var dropdown_pin = block.getFieldValue('pin');
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

  var code = `rgbled["${dropdown_pin}"].fill(${value_color})\n`;
  return code;
};

Blockly.Python['rgbled_show'] = function(block) {
  Blockly.Python.definitions_['from_board_import_rgbled'] = 'from board import rgbled';

  var dropdown_pin = block.getFieldValue('pin');

  var code = `rgbled["${dropdown_pin}"].show()\n`;
  return code;
};

Blockly.Python['rgbled_clear'] = function(block) {
  Blockly.Python.definitions_['from_board_import_rgbled'] = 'from board import rgbled';

  var dropdown_pin = block.getFieldValue('pin');

  var code = `rgbled["${dropdown_pin}"].clear()\n`;
  return code;
};

Blockly.Python['rgbled_rainbow'] = function(block) {
  Blockly.Python.definitions_['from_board_import_rgbled'] = 'from board import rgbled';

  var dropdown_pin = block.getFieldValue('pin');
  var value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC) || '30';

  var code = `rgbled["${dropdown_pin}"].rainbow(${value_wait})\n`;
  return code;
};

Blockly.Python['rgbled_set_brightness'] = function(block) {
  Blockly.Python.definitions_['from_board_import_rgbled'] = 'from board import rgbled';

  var dropdown_pin = block.getFieldValue('pin');
  var value_brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC);

  var code = `rgbled["${dropdown_pin}"].set_brightness(${value_brightness})`;
  return code;
};
