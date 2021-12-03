Blockly.Python['display_custom'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';
    
    var code = `display.raw(b"${block.getFieldValue('value')}")\n`;
    return code;
};

Blockly.Python['display_show'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';
    
    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    var code = `display.show(${value_value}, display.hex2byte(${value_color}))\n`;
    return code;
};

Blockly.Python['display_scroll'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    var code = `display.scroll(${value_value}, color=display.hex2byte(${value_color}))\n`;
    return code;
};

Blockly.Python['display_show2x5'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    var code = `display.show2x5(${value_value}, display.hex2byte(${value_color}))\n`;
    return code;
};

Blockly.Python['display_left_show'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    var code = `display.left(${value_value}, display.hex2byte(${value_color}))\n`;
    return code;
};

Blockly.Python['display_right_show'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    var code = `display.right(${value_value}, display.hex2byte(${value_color}))\n`;
    return code;
};

Blockly.Python['display_plot'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    var code = `display.plot(${value_value}, color=display.hex2byte(${value_color}))\n`;
    return code;
};

Blockly.Python['display_clear'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var code = 'display.clear()\n';
    return code;
};

Blockly.Python['display_dot_show'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';
  
    var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    var value_color = Blockly.Python.valueToCode(block, 'color', Blockly.Python.ORDER_ATOMIC);
    
    var code = `display.dot(${value_x}, ${value_y}, display.hex2byte(${value_color}))\n`;
    return code;
};

Blockly.Python['display_dot_hide'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';
  
    var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
    var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
    
    var code = `display.dot(${value_x}, ${value_y}, (0, 0, 0))\n`;
    return code;
};
