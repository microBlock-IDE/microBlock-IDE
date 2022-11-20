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
    Blockly.Python.definitions_['from_analog_import_analog_read'] = 'from analog import analog_read';

    var dropdown_pin = block.getFieldValue('pin');
    if ((+dropdown_pin) >= 8) {
        Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
        Blockly.Python.definitions_['from_machine_import_adc'] = 'from machine import ADC';

        var functionName = Blockly.Python.provideFunction_(
            'adcRead',
            ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(analog_pin):',
            '  adc = ADC(Pin(analog_pin))',
            '  return (adc.read_u16() >> 4)']);
            
        var code = `${functionName}(${((+dropdown_pin) - 8) + 27})`;
        return [code, Blockly.Python.ORDER_NONE];
    } else {
        var code = `analog_read(${dropdown_pin})`;
        return [code, Blockly.Python.ORDER_NONE];
    }
};

Blockly.Python['pin_analog_read_calibrated'] = function (block) {
    Blockly.Python.definitions_['from_analog_import_analog_read_dalibrated'] = 'from analog import analog_read_calibrated';

    var dropdown_pin = block.getFieldValue('pin');

    var code = `analog_read_calibrated(${dropdown_pin})`;
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