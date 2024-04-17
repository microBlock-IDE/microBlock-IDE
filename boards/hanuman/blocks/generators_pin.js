Blockly.JavaScript['pin_mode'] = function (block) {
    Blockly.JavaScript.definitions_['include']['Hanuman.h'] = '#include <Hanuman.h>';

    var dropdown_pin = block.getFieldValue('pin');
    var dropdown_mode = block.getFieldValue('mode');

    var code = `pinMode(${dropdown_pin}, ${dropdown_mode});\n`;
    return code;
};

Blockly.JavaScript['pin_digital_write'] = function (block) {
    Blockly.JavaScript.definitions_['include']['Hanuman.h'] = '#include <Hanuman.h>';

    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_pin = block.getFieldValue('pin');

    var code = `out(${dropdown_pin}, ${value_value});\n`;
    return code;
};

Blockly.JavaScript['pin_digital_read'] = function (block) {
    Blockly.JavaScript.definitions_['include']['Hanuman.h'] = '#include <Hanuman.h>';

    var dropdown_pin = block.getFieldValue('pin');

    var code = `in(${dropdown_pin})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['pin_analog_read'] = function (block) {
    Blockly.JavaScript.definitions_['include']['Hanuman.h'] = '#include <Hanuman.h>';
    
    var dropdown_pin = block.getFieldValue('pin');

    var code = `analog(${dropdown_pin})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['pin_analog_write'] = function (block) {
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_pin = block.getFieldValue('pin');

    var code = `analogWrite(${dropdown_pin}, ${value_value});\n`;
    return code;
};

Blockly.JavaScript['pin_attach_interrupt'] = function (block) {
    var dropdown_pin = block.getFieldValue('pin');
    var dropdown_mode = block.getFieldValue('mode');
    var statements_code = Blockly.JavaScript.statementToCode(block, 'code');

    var code = `attachInterrupt(digitalPinToInterrupt(${dropdown_pin}), []() {\n${statements_code}\n}, ${dropdown_mode});\n`;
    return code;
};

Blockly.JavaScript['pin_pulse_in'] = function (block) {
    var dropdown_value = block.getFieldValue('value');
    var dropdown_pin = block.getFieldValue('pin');
    var value_timeout = Blockly.JavaScript.valueToCode(block, 'timeout', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `pulseIn(${dropdown_pin}, ${dropdown_value}, ${value_timeout})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['pin_shift_in'] = function (block) {
    var dropdown_data_pin = block.getFieldValue('data_pin');
    var dropdown_clock_pin = block.getFieldValue('clock_pin');
    var dropdown_bit_order = block.getFieldValue('bit_order');

    var code = `shiftIn(${dropdown_data_pin}, ${dropdown_clock_pin}, ${dropdown_bit_order})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['pin_shift_out'] = function (block) {
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_data_pin = block.getFieldValue('data_pin');
    var dropdown_clock_pin = block.getFieldValue('clock_pin');
    var dropdown_bit_order = block.getFieldValue('bit_order');

    var code = `shiftOut(${dropdown_data_pin}, ${dropdown_clock_pin}, ${dropdown_bit_order}, ${value_value});\n`;
    return code;
};
