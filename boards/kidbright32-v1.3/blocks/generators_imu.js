Blockly.Python['imu_update'] = function(block) {
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var code = 'imu.update()\n';
    return code;
};

Blockly.Python['imu_acceleration'] = function (block) {
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var dropdown_axis = block.getFieldValue('axis');

    var code = `int(imu.acc[${dropdown_axis}])`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['imu_compass_heading'] = function (block) {
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var code = 'int(imu.heading())';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['imu_rotation'] = function (block) {
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var dropdown_axis = block.getFieldValue('axis');

    var code = `int(imu.rotation()[${dropdown_axis}])`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['imu_magnetic_force'] = function (block) {
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var dropdown_axis = block.getFieldValue('axis');

    var code = `int(imu.mag[${dropdown_axis}])`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['imu_calibrate_compass'] = function (block) {

    var code = 'imu.calibrate_compass()\n';
    return code;
};