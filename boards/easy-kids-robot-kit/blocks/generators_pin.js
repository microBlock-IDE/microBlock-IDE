Blockly.Python['pin_digital_write'] = function (block) {
    Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = block.getFieldValue('pin');

    var code = `Pin(${dropdown_pin}, Pin.OUT).value(${value_value})\n`;
    return code;
};

Blockly.Python['pin_digital_read'] = function (block) {
    Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';

    var dropdown_pin = block.getFieldValue('pin');

    var code = `Pin(${dropdown_pin}, Pin.IN).value()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['pin_analog_read'] = function (block) {
    var dropdown_pin = block.getFieldValue('pin');

    Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['from_machine_import_adc'] = 'from machine import ADC';

    var functionName = Blockly.Python.provideFunction_(
        'adcRead',
        ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(analog_pin):',
            '  adc = ADC(Pin(analog_pin))',
            '  adc.atten(ADC.ATTN_11DB)',
            '  adc.width(ADC.WIDTH_12BIT)',
            '  return adc.read()']);

    var code = `${functionName}(${dropdown_pin})`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['pin_analog_write'] = function (block) {
    Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['from_machine_import_pwm'] = 'from machine import PWM';

    var functionName = Blockly.Python.provideFunction_(
        'pwmWrite',
        ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(pin, duty):',
        '  pwm = PWM(Pin(pin))',
        '  pwm.freq(1000)',
        '  pwm.duty_u16(int(duty / 1023 * 65535))']);

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var dropdown_pin = block.getFieldValue('pin');
    var code = `${functionName}(${dropdown_pin}, ${value_value})\n`;
    return code;
};

Blockly.Python['pin_pulse_in'] = function (block) {
    Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['from_machine_import_time_pulse_us'] = 'from machine import time_pulse_us';

    var dropdown_value = block.getFieldValue('value');
    var dropdown_pin = block.getFieldValue('pin');
    var value_timeout = Blockly.Python.valueToCode(block, 'timeout', Blockly.Python.ORDER_ATOMIC);

    var code = `time_pulse_us(Pin(${dropdown_pin}, mode=Pin.IN, pull=None), ${dropdown_value === "HIGH" ? "1" : "0"}, ${value_timeout})`;
    return [code, Blockly.Python.ORDER_NONE];
};
