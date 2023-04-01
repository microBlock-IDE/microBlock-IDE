Blockly.Python['sensor_light_is_color'] = function(block) {
    Blockly.Python.definitions_['import_sensor'] = 'import sensor';

    var dropdown_sensor = block.getFieldValue('sensor');
    var dropdown_color = block.getFieldValue('color');

    var code = `sensor.light${dropdown_sensor}_is_${dropdown_color}()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['sensor_set_threshold'] = function(block) {
    Blockly.Python.definitions_['import_sensor'] = 'import sensor';

    var dropdown_color = block.getFieldValue('color');
    var value_threshold = Blockly.Python.valueToCode(block, 'threshold', Blockly.Python.ORDER_ATOMIC) || "2000";

    var code = `sensor.${dropdown_color}_threshold(${value_threshold})\n`;
    return code;
};

Blockly.Python['sensor_light'] = function(block) {
    Blockly.Python.definitions_['import_sensor'] = 'import sensor';

    var dropdown_sensor = block.getFieldValue('sensor');

    var code = `sensor.ldr${dropdown_sensor}()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['ultrasonic_read'] = function(block) {
    Blockly.Python.definitions_['import_sensor'] = 'import sensor';
  
    var code = `sensor.distance()`;
    return [code, Blockly.Python.ORDER_NONE];
};
