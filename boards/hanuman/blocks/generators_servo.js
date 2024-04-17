Blockly.JavaScript['external_servo'] = function (block) {
    Blockly.JavaScript.definitions_['include']['Hanuman.h'] = '#include <Hanuman.h>';

    var dropdown_ch = block.getFieldValue('ch');
    var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `servo(${dropdown_ch}, ${value_angle});\n`;
    return code;
};