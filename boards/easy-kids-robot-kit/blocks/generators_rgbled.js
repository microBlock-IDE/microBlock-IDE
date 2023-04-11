Blockly.Python['rgbled_setup'] = function(block) {
  Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['from_neopixel_import_neopixel'] = 'from neopixel import NeoPixel';

  var code = `np = NeoPixel(Pin(25, Pin.OUT), 6); np.bright = 50\n`;
  return code;
};

Blockly.Python['rgbled_set_color'] = function(block) {
  var value_n = Blockly.Python.valueToCode(block, 'n', Blockly.Python.ORDER_ATOMIC);
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

  var code = `np[${value_n}] = ( int(int((${value_color})[1:3], 16) * (np.bright / 100)), int(int((${value_color})[3:5], 16) * (np.bright / 100)), int(int((${value_color})[5:7], 16) * (np.bright / 100)) )\n`;
  return code;
};

Blockly.Python['rgbled_fill_color'] = function(block) {
  var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);

  var code = `for i in range(np.n): np[i] = ( int(int((${value_color})[1:3], 16) * (np.bright / 100)), int(int((${value_color})[3:5], 16) * (np.bright / 100)), int(int((${value_color})[5:7], 16) * (np.bright / 100)) )\n`;
  return code;
};

Blockly.Python['rgbled_show'] = function(block) {
  var code = 'np.write()\n';
  return code;
};

Blockly.Python['rgbled_clear'] = function(block) {
  var code = 'for i in range(np.n): np[i] = (0, 0, 0)\n';
  return code;
};

Blockly.Python['rgbled_rainbow'] = function(block) {
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

Blockly.Python['rgbled_set_brightness'] = function(block) {
  var value_brightness = Blockly.Python.valueToCode(block, 'brightness', Blockly.Python.ORDER_ATOMIC);
  var code = `np.bright = ${value_brightness}\n`;
  return code;
};
