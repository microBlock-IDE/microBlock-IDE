Blockly.Python['gerora_set_color1'] = function(block) {
  Blockly.Python.definitions_['import_gerora'] = 'import gerora';
  
  var colour_color = block.getFieldValue('color');
  
  var code = `gerora.color(${colour_color.replace("#", "0x")})\n`;
  return code;
};

Blockly.Python['gerora_set_color2'] = function(block) {
  Blockly.Python.definitions_['import_gerora'] = 'import gerora';

  var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
  var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
  var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);

  var code = `gerora.colorRGB(${value_red}, ${value_green}), ${value_blue})\n`;
  return code;
};

Blockly.Python['gerora_clear'] = function(block) {
  Blockly.Python.definitions_['import_gerora'] = 'import gerora';

  var code = 'gerora.color(0)\n';
  return code;
};

Blockly.Python['gerora_rainbow'] = function(block) {
  Blockly.Python.definitions_['import_gerora'] = 'import gerora';

  var value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC) || '30';

  var code = `gerora.rainbow(${value_wait})\n`;
  return code;
};

Blockly.Python['gerora_set_brightness'] = function(block) {
  Blockly.Python.definitions_['import_gerora'] = 'import gerora';

  var value_brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC);
  var code = `gerora.bright(${value_brightness})\n`;
  return code;
};
