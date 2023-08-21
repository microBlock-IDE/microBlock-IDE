Blockly.Python['easy_kids_ultrasonic_read'] = function(block) {
    Blockly.Python.definitions_['from_board_import_ultrasonic'] = 'from board import ultrasonic';
  
    var code = `ultrasonic.distance()`;
    return [code, Blockly.Python.ORDER_NONE];
};
