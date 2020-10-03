Blockly.Python['sensor_light'] = function (block) {
    Blockly.Python.definitions_['import_sensor'] = 'import sensor';

    var code = 'sensor.light()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['sensor_temp'] = function (block) {
    Blockly.Python.definitions_['import_sensor'] = 'import sensor';

    var code = 'sensor.temperature()';
    return [code, Blockly.Python.ORDER_NONE];
};
