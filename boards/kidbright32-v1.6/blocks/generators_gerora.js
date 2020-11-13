Blockly.Python['gerora_setup'] = function(block) {
  Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['from_gerora_import_neopixel'] = 'from neopixel import NeoPixel';

  var code = `np = NeoPixel(Pin(23, Pin.OUT), 6); np.bright = 50\n`;
  return code;
};

Blockly.Python['gerora_set_color1'] = function(block) {
  var value_n = Blockly.Python.valueToCode(block, 'n', Blockly.Python.ORDER_ATOMIC);
  var colour_color = block.getFieldValue('color');

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour_color);
  var red = parseInt(result[1], 16);
  var green = parseInt(result[2], 16);
  var blue = parseInt(result[3], 16);

  var code = `np[${value_n}] = (int(${red} * np.bright / 100), int(${green} * np.bright / 100), int(${blue} * np.bright / 100))\n`;
  return code;
};

Blockly.Python['gerora_set_color2'] = function(block) {
  var value_n = Blockly.Python.valueToCode(block, 'n', Blockly.Python.ORDER_ATOMIC);
  var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
  var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
  var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);

  var code = `np[${value_n}] = (int(${value_red} * np.bright / 100), int(${value_green} * np.bright / 100), int(${value_blue} * np.bright / 100))\n`;
  return code;
};

Blockly.Python['gerora_fill_color1'] = function(block) {
  var colour_color = block.getFieldValue('color');

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour_color);
  var red = parseInt(result[1], 16);
  var green = parseInt(result[2], 16);
  var blue = parseInt(result[3], 16);

  var code = `for i in range(np.n): np[i] = (int(${red} * np.bright / 100), int(${green} * np.bright / 100), int(${blue} * np.bright / 100))\n`;
  return code;
};

Blockly.Python['gerora_fill_color2'] = function(block) {
  var value_red = Blockly.Python.valueToCode(block, 'red', Blockly.Python.ORDER_ATOMIC);
  var value_green = Blockly.Python.valueToCode(block, 'green', Blockly.Python.ORDER_ATOMIC);
  var value_blue = Blockly.Python.valueToCode(block, 'blue', Blockly.Python.ORDER_ATOMIC);

  var code = `for i in range(np.n): np[i] = (int(${value_red} * np.bright / 100), int(${value_green} * np.bright / 100), int(${value_blue} * np.bright / 100))\n`;
  return code;
};

Blockly.Python['gerora_show'] = function(block) {
  var code = 'np.write()\n';
  return code;
};

Blockly.Python['gerora_clear'] = function(block) {
  var code = 'for i in range(np.n): np[i] = (0, 0, 0)\n';
  return code;
};

Blockly.Python['gerora_rainbow'] = function(block) {
  var value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC) || '30';

  Blockly.Python.definitions_['from_time_import_sleep_ms'] = 'from time import sleep_ms';

  var functionName = Blockly.Python.provideFunction_(
    'neopixelRainbow',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(np, wait):',
    '  for j in range(256):',
    '    for i in range(np.n):',
    '      WheelPos = (i * 1 + j) & 255',
    '      if WheelPos < 85:',
    '        np[i] = (int((WheelPos * 3) * np.bright / 100), int((255 - WheelPos * 3) * np.bright / 100), 0)',
    '      elif WheelPos < 170:',
    '        WheelPos -= 85',
    '        np[i] = (int((255 - WheelPos * 3) * np.bright / 100), 0, int((WheelPos * 3) * np.bright / 100))',
    '      else:',
    '        WheelPos -= 170',
    '        np[i] = (0, int((WheelPos * 3) * np.bright / 100), int((255 - WheelPos * 3) * np.bright / 100))',
    '    np.write()',
    '    sleep_ms(wait)']);

  var code = `${functionName}(np, ${value_wait})\n`;
  return code;
};

Blockly.Python['gerora_set_brightness'] = function(block) {
  var value_brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC);
  var code = `np.bright = ${value_brightness}\n`;
  return code;
};
