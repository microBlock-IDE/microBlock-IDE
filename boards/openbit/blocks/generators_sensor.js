Blockly.Python.forBlock['sensor_light'] = function (block) {
    Blockly.Python.definitions_['import_sensor'] = 'import sensor';

    var code = 'sensor.light()';
    return [code, Blockly.Python.ORDER_NONE];
};
