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

    var functionName = Blockly.Python.provideFunction_(
        dropdown_pin + 'PressCB',
        ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        statements_callback]);

    var code = `switch.press(switch.${dropdown_pin}, ${functionName})\n`;
    return code;
};

Blockly.Python['switch_on_release'] = function(block) {
    Blockly.Python.definitions_['import_switch'] = 'import switch';

    var dropdown_pin = block.getFieldValue('pin');
    var statements_callback = Blockly.Python.statementToCode(block, 'callback');

    var functionName = Blockly.Python.provideFunction_(
        dropdown_pin + 'ReleaseCB',
        ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '():',
        statements_callback]);

    var code = `switch.release(switch.${dropdown_pin}, ${functionName})\n`;
    return code;
};
