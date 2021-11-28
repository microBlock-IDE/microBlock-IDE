Blockly.Python['switch_is_press'] = function (block) {
    Blockly.Python.definitions_['import_switch'] = 'import switch';

    var dropdown_n = block.getFieldValue('n');

    var code = `switch.value(switch.${dropdown_n}) == 1`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['switch_is_release'] = function (block) {
    Blockly.Python.definitions_['import_switch'] = 'import switch';

    var dropdown_n = block.getFieldValue('n');

    var code = `switch.value(switch.${dropdown_n}) == 0`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['switch_get_value'] = function (block) {
    Blockly.Python.definitions_['import_switch'] = 'import switch';

    var dropdown_n = block.getFieldValue('n');

    var code = `switch.value(switch.${dropdown_n})`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['switch_on_press'] = function(block) {
    Blockly.Python.definitions_['import_switch'] = 'import switch';

    var dropdown_pin = block.getFieldValue('pin');
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
        dropdown_pin + 'PressCB',
        ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(_=None):',
        globals,
        statements_callback]);

    var code = `switch.press(switch.${dropdown_pin}, ${functionName})\n`;
    return code;
};

Blockly.Python['switch_on_release'] = function(block) {
    Blockly.Python.definitions_['import_switch'] = 'import switch';

    var dropdown_pin = block.getFieldValue('pin');
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
        dropdown_pin + 'ReleaseCB',
        ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(_=None):',
        globals,
        statements_callback]);

    var code = `switch.release(switch.${dropdown_pin}, ${functionName})\n`;
    return code;
};

Blockly.Python['switch_on_pressed'] = function(block) {
    Blockly.Python.definitions_['import_switch'] = 'import switch';

    var dropdown_pin = block.getFieldValue('pin');
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
        dropdown_pin + 'PressCB',
        ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(_=None):',
        globals,
        statements_callback]);

    var code = `switch.pressed(switch.${dropdown_pin}, ${functionName})\n`;
    return code;
};
