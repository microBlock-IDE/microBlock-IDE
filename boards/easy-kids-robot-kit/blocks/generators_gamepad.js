Blockly.Python['gamepad_is_connected'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `bluepad32.is_connected()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['gamepad_axis_x'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `bluepad32.axisX()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['gamepad_axis_y'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `bluepad32.axisY()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['gamepad_axis_right_x'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `bluepad32.axisRX()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['gamepad_axis_right_y'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `bluepad32.axisRY()`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['gamepad_dpad_left'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `True if (bluepad32.dpad() & 0x08) else False`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['gamepad_dpad_top'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `True if (bluepad32.dpad() & 0x01) else False`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['gamepad_dpad_right'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `True if (bluepad32.dpad() & 0x04) else False`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['gamepad_dpad_bottom'] = function (block) {
    Blockly.Python.definitions_['import_bluepad32'] = 'import bluepad32';

    var code = `True if (bluepad32.dpad() & 0x02) else False`;
    return [code, Blockly.Python.ORDER_NONE];
};
