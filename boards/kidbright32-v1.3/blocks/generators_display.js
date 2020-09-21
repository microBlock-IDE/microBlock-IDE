Blockly.Python['display_show'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var code = `display.show(${value_value})\n`;
    return code;
};

Blockly.Python['display_scroll'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var code = `display.scroll(${value_value})\n`;
    return code;
};

Blockly.Python['display_show4x8'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var code = `display.show4x8(${value_value})\n`;
    return code;
};

Blockly.Python['display_clear'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var code = 'display.clear()\n';
    return code;
};
