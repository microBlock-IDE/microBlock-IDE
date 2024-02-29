Blockly.JavaScript['motor1'] = function (block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var dropdown_n = block.getFieldValue('n');
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `motor(${dropdown_n}, ${value_speed});\n`;
    return code;
};

Blockly.JavaScript['motor2'] = function (block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var value_speed1 = Blockly.JavaScript.valueToCode(block, 'speed1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_speed2 = Blockly.JavaScript.valueToCode(block, 'speed2', Blockly.JavaScript.ORDER_ATOMIC);
    var value_speed3 = Blockly.JavaScript.valueToCode(block, 'speed3', Blockly.JavaScript.ORDER_ATOMIC);
    var value_speed4 = Blockly.JavaScript.valueToCode(block, 'speed4', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `motor(${value_speed1}, ${value_speed2}, ${value_speed3}, ${value_speed4});\n`;
    return code;
};

Blockly.JavaScript['motor_move'] = function(block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';
  
    var dropdown_move = block.getFieldValue('move');
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
  
    var code = `${dropdown_move}(${value_speed});\n`;
    return code;
};

Blockly.JavaScript['motor_move2'] = function(block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';
  
    var dropdown_move = block.getFieldValue('move');
    var value_speed1 = Blockly.JavaScript.valueToCode(block, 'speed1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_speed2 = Blockly.JavaScript.valueToCode(block, 'speed2', Blockly.JavaScript.ORDER_ATOMIC);
  
    var code = `${dropdown_move}(${value_speed1}, ${value_speed2});\n`;
    return code;
};

Blockly.JavaScript['motor_move_4wd'] = function(block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';
  
    var dropdown_move = block.getFieldValue('move');
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
  
    var code = `${dropdown_move}(${value_speed});\n`;
    return code;
};

Blockly.JavaScript['motor_move2_4wd'] = function(block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';
  
    var dropdown_move = block.getFieldValue('move');
    var value_speed1 = Blockly.JavaScript.valueToCode(block, 'speed1', Blockly.JavaScript.ORDER_ATOMIC);
    var value_speed2 = Blockly.JavaScript.valueToCode(block, 'speed2', Blockly.JavaScript.ORDER_ATOMIC);
  
    var code = `${dropdown_move}(${value_speed1}, ${value_speed2});\n`;
    return code;
};

Blockly.JavaScript['turn'] = function (block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var dropdown_dir = block.getFieldValue('dir');
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `fd(${dropdown_dir === "RIGHT" ? value_speed : 0}); iBIT.M2.set(${dropdown_dir === "LEFT" ? value_speed : 0})\n`;
    return code;
};

Blockly.JavaScript['spin'] = function (block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var dropdown_dir = block.getFieldValue('dir');
    var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `iBIT.M1.set(${(dropdown_dir === "RIGHT" ? "" : "-") + value_speed}); iBIT.M2.set(${(dropdown_dir === "LEFT" ? "" : "-") + value_speed})\n`;
    return code;
};

Blockly.JavaScript['motor_stop'] = function (block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var dropdown_n = block.getFieldValue('n');

    var code = `motor_stop(${dropdown_n});\n`;
    return code;
};
