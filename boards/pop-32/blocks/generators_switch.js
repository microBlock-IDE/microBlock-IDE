Blockly.JavaScript['switch_is_press'] = function (block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var dropdown_n = block.getFieldValue('n');

    var code = `SW_${dropdown_n}() == 1`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['switch_is_release'] = function (block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var dropdown_n = block.getFieldValue('n');

    var code = `SW_${dropdown_n}() == 0`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['switch_get_value'] = function (block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var dropdown_n = block.getFieldValue('n');

    var code = `SW_${dropdown_n}()`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};

/*
Blockly.JavaScript['switch_on_press'] = function(block) {
    Blockly.JavaScript.definitions_['import_switch'] = 'import switch';

    var dropdown_pin = block.getFieldValue('pin');
    var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');

    // -----------------------------
    var globals = [];
    var varName;
    var workspace = block.workspace;
    var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
    for (var i = 0, variable; variable = variables[i]; i++) {
      varName = variable.name;
      if (block.getVars().indexOf(varName) == -1) {
        globals.push(Blockly.JavaScript.nameDB_.getName(varName,
            Blockly.VARIABLE_CATEGORY_NAME));
      }
    }
    // Add developer variables.
    var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (var i = 0; i < devVarList.length; i++) {
      globals.push(Blockly.JavaScript.nameDB_.getName(devVarList[i],
          Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    }
  
    globals = globals.length ?
        Blockly.JavaScript.INDENT + 'global ' + globals.join(', ') + '\n' : '';
    // -----------------------------

    var functionName = Blockly.JavaScript.provideFunction_(
        dropdown_pin + 'PressCB',
        ['def ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(_=None):',
        globals,
        statements_callback]);

    var code = `switch.press(switch.${dropdown_pin}, ${functionName})\n`;
    return code;
};

Blockly.JavaScript['switch_on_release'] = function(block) {
    Blockly.JavaScript.definitions_['import_switch'] = 'import switch';

    var dropdown_pin = block.getFieldValue('pin');
    var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');

    // -----------------------------
    var globals = [];
    var varName;
    var workspace = block.workspace;
    var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
    for (var i = 0, variable; variable = variables[i]; i++) {
      varName = variable.name;
      if (block.getVars().indexOf(varName) == -1) {
        globals.push(Blockly.JavaScript.nameDB_.getName(varName,
            Blockly.VARIABLE_CATEGORY_NAME));
      }
    }
    // Add developer variables.
    var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (var i = 0; i < devVarList.length; i++) {
      globals.push(Blockly.JavaScript.nameDB_.getName(devVarList[i],
          Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    }
  
    globals = globals.length ?
        Blockly.JavaScript.INDENT + 'global ' + globals.join(', ') + '\n' : '';
    // -----------------------------

    var functionName = Blockly.JavaScript.provideFunction_(
        dropdown_pin + 'ReleaseCB',
        ['def ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(_=None):',
        globals,
        statements_callback]);

    var code = `switch.release(switch.${dropdown_pin}, ${functionName})\n`;
    return code;
};

Blockly.JavaScript['switch_on_pressed'] = function(block) {
    Blockly.JavaScript.definitions_['import_switch'] = 'import switch';

    var dropdown_pin = block.getFieldValue('pin');
    var statements_callback = Blockly.JavaScript.statementToCode(block, 'callback');

    // -----------------------------
    var globals = [];
    var varName;
    var workspace = block.workspace;
    var variables = Blockly.Variables.allUsedVarModels(workspace) || [];
    for (var i = 0, variable; variable = variables[i]; i++) {
      varName = variable.name;
      if (block.getVars().indexOf(varName) == -1) {
        globals.push(Blockly.JavaScript.nameDB_.getName(varName,
            Blockly.VARIABLE_CATEGORY_NAME));
      }
    }
    // Add developer variables.
    var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
    for (var i = 0; i < devVarList.length; i++) {
      globals.push(Blockly.JavaScript.nameDB_.getName(devVarList[i],
          Blockly.Names.DEVELOPER_VARIABLE_TYPE));
    }
  
    globals = globals.length ?
        Blockly.JavaScript.INDENT + 'global ' + globals.join(', ') + '\n' : '';
    // -----------------------------

    var functionName = Blockly.JavaScript.provideFunction_(
        dropdown_pin + 'PressCB',
        ['def ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '(_=None):',
        globals,
        statements_callback]);

    var code = `switch.pressed(switch.${dropdown_pin}, ${functionName})\n`;
    return code;
};
*/
