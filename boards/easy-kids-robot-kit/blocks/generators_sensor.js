Blockly.Python['ultrasonic_read'] = function(block) {
    Blockly.Python.definitions_['from_board_import_sensor'] = 'from board import sensor';
  
    var code = `sensor.distance()`;
    return [code, Blockly.Python.ORDER_NONE];
};
