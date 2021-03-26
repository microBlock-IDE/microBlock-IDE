Blockly.Python['sht40_temperature'] = function (block) {
    Blockly.Python.definitions_['import_sht40'] = 'import sht40';

    var code = `sht40.read()[0]`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['sht40_humidity'] = function (block) {
    Blockly.Python.definitions_['import_sht40'] = 'import sht40';

    var code = `sht40.read()[1]`;
    return [code, Blockly.Python.ORDER_NONE];
};
