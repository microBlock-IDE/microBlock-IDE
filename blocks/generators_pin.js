Blockly.Python['pin_digital_write'] = function(block) {
  Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';

  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);

  var code = `Pin(${value_pin}, Pin.OUT).value(${value_value})\n`;
  return code;
};

Blockly.Python['pin_pwm_write'] = function(block) {
  Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['from_machine_import_pwm'] = 'from machine import PWM';

  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var code = `PWM(Pin(${value_pin}), freq=20000, duty=${value_value})\n`;
  return code;
};

Blockly.Python['pin_digital_read'] = function(block) {
  Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';

  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var code = `Pin(${value_pin}, Pin.IN).value()`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['pin_analog_read'] = function(block) {
  Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
  Blockly.Python.definitions_['from_machine_import_adc'] = 'from machine import ADC';

  var functionName = Blockly.Python.provideFunction_(
    'adcRead',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(analog_pin):',
    '  adc = ADC(Pin(analog_pin))',
    '  adc.atten(ADC.ATTN_11DB)',
    '  adc.width(ADC.WIDTH_12BIT)',
    '  return adc.read()']);

  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  var code = `${functionName}(${value_pin})`;
  return [code, Blockly.Python.ORDER_NONE];
};