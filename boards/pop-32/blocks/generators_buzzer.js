Blockly.JavaScript['buzzer_tone'] = function(block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var value_freq = Blockly.JavaScript.valueToCode(block, 'freq', Blockly.JavaScript.ORDER_ATOMIC);
    var value_duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);

    var code = `sound(${value_freq}, ${value_duration} * 1000);\n`;
    return code;
};

Blockly.JavaScript['buzzer_notes'] = function(block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var value_notes = Blockly.JavaScript.valueToCode(block, 'notes', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_duration = block.getFieldValue('duration');

    var code = `sound(${value_notes}, ${dropdown_duration});\n`;
    return code;
};

/*
Blockly.JavaScript['buzzer_volume'] = function(block) {
    Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

    var value_level = Blockly.JavaScript.valueToCode(block, 'level', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `buzzer.volume = ${value_level}\n`;
    return code;
};
*/

Blockly.JavaScript['make_note'] = function(block) {
    var text_notes = block.getFieldValue('notes');
    var code = `'${text_notes}'`;
    return [code, Blockly.JavaScript.ORDER_NONE];
};
