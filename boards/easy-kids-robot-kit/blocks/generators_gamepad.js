Blockly.Python.forBlock['gamepad_is_connected'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `bluepad32.is_connected()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.forBlock['gamepad_forget_keys'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = 'bluepad32.forget_keys()\n';
    return code;
};

Blockly.Python.forBlock['gamepad_enable_new_bluetooth_connections'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var dropdown_enable = block.getFieldValue('enable');

    var code = `bluepad32.enable_bluetooth_connections(${dropdown_enable})\n`;
    return code;
};

Blockly.Python.forBlock['gamepad_axis'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var dropdown_fn_name = block.getFieldValue('fn_name');

    var code = `bluepad32.${dropdown_fn_name}()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.forBlock['gamepad_button_is_press'] = function(block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var dropdown_fn_name = block.getFieldValue('fn_name');

    var code = `bluepad32.${dropdown_fn_name}()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.forBlock['gamepad_temperature'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = 'bluepad32.temperature()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.forBlock['gamepad_battery_level'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = 'bluepad32.battery()';
    return [code, Blockly.Python.ORDER_NONE];
};
