Blockly.Python['imu_update'] = function(block) {
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var code = 'imu.update()\n';
    return code;
};

Blockly.Python['imu_is_gesture'] = function(block) {
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var dropdown_gesture = block.getFieldValue('gesture');

    var code = `imu.is_gesture(imu.${dropdown_gesture})`;
    return [code, Blockly.Python.ORDER_NONE];
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
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var code = 'imu.calibrate_compass()\n';
    return code;
};

Blockly.Python['imu_raw_gyro'] = function (block) {
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var dropdown_axis = block.getFieldValue('axis');

    var code = `int(imu.gyro[${dropdown_axis}])`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['imu_on_gesture'] = function(block) {
    Blockly.Python.definitions_['import_imu'] = 'import imu';

    var dropdown_gesture = block.getFieldValue('gesture');
    var statements_callback = Blockly.Python.statementToCode(block, 'callback');

    // -----------------------------
    var globals = [];
    var varName;
    var workspace = block.workspace;
    var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
    for (var i = 0, variable; variable = variables[i]; i++) {
      varName = variable.name;
      if (block.getVars().indexOf(varName) == -1) {
        globals.push(Blockly.Python.variableDB_.getName(varName,
            Blockly.VARIABLE_CATEGORY_NAME));
      }
    }
    // Add developer variables.
    var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (var i = 0; i < devVarList.length; i++) {
      globals.push(Blockly.Python.variableDB_.getName(devVarList[i],
          Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    }
  
    globals = globals.length ?
        Blockly.Python.INDENT + 'global ' + globals.join(', ') + '\n' : '';
    // -----------------------------

    var functionName = Blockly.Python.provideFunction_(
        'on' + dropdown_gesture + 'CB',
        ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        globals,
        statements_callback]);

    var code = `imu.on(imu.${dropdown_gesture}, ${functionName})\n`;
    return code;
};

