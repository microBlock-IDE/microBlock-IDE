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

Blockly.Python['display_plot'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var code = `display.plot(${value_value})\n`;
    return code;
};

Blockly.Python['display_clear'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

    var code = 'display.clear()\n';
    return code;
};

Blockly.Python['display_custom'] = function(block) {
    Blockly.Python.definitions_['import_display'] = 'import display';

	let strOut = "";
	for (var x = 0; x < 16; x++) {
		var byte = 0;
		for (var y = 0; y < 8; y++) {
			var val = block.getFieldValue('POS_X' + x + '_Y' + y);
            byte |= ((val === "TRUE" ? 0x01 : 0x00) << y);
		}
		strOut += `\\x${byte < 0x10 ? '0' : ''}${byte.toString(16)}`;
	}

    var code = `display.raw(b"${strOut}")\n`;
    return code;
};