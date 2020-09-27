Blockly.Python['buzzer_tone'] = function(block) {
    Blockly.Python.definitions_['import_buzzer'] = 'import buzzer';

    var value_freq = Blockly.Python.valueToCode(block, 'freq', Blockly.Python.ORDER_ATOMIC);
    var value_duration = Blockly.Python.valueToCode(block, 'duration', Blockly.Python.ORDER_ATOMIC);
    var code = `buzzer.tone(${value_freq}, ${value_duration})\n`;
    return code;
};

Blockly.Python['buzzer_notes'] = function(block) {
    Blockly.Python.definitions_['import_buzzer'] = 'import buzzer';

    var value_notes = Blockly.Python.valueToCode(block, 'notes', Blockly.Python.ORDER_ATOMIC);
    var dropdown_duration = block.getFieldValue('duration');

    var code = `buzzer.note(${value_notes}, ${dropdown_duration})\n`;
    return code;
};

Blockly.Python['buzzer_volume'] = function(block) {
    Blockly.Python.definitions_['import_buzzer'] = 'import buzzer';

    var value_level = Blockly.Python.valueToCode(block, 'level', Blockly.Python.ORDER_ATOMIC);
    var code = `buzzer.volume = ${value_level}\n`;
    return code;
};

Blockly.Python['make_note'] = function(block) {
    var text_notes = block.getFieldValue('notes');
    var code = `'${text_notes}'`;
    return [code, Blockly.Python.ORDER_NONE];
};
