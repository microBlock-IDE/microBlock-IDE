Blockly.Python['external_servo'] = function (block) {
    Blockly.Python.definitions_['import_servo'] = 'import servo';

    var dropdown_ch = block.getFieldValue('ch');
    var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
    var code = `servo.angle(servo.${dropdown_ch}, ${value_angle})\n`;
    return code;
};