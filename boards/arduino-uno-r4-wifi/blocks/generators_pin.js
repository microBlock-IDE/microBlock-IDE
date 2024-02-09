Blockly.JavaScript['pin_mode'] = function (block) {
    var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_mode = block.getFieldValue('mode');

    var code = `pinMode(${value_pin}, ${dropdown_mode});\n`;
    return code;
};

Blockly.JavaScript['pin_digital_write'] = function (block) {
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `digitalWrite(${dropdown_pin}, ${value_value});\n`;
    return code;
};

Blockly.JavaScript['pin_digital_read'] = function (block) {
    var dropdown_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `digitalRead(${dropdown_pin})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['pin_analog_read'] = function (block) {
    var dropdown_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `analogRead(${dropdown_pin})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['pin_analog_write'] = function (block) {
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
    
    var code = `analogWrite(${dropdown_pin}, ${value_value});\n`;
    return code;
};