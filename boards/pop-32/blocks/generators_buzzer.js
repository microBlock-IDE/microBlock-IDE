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
    
    const notes = value_notes.substring(2, value_notes.length - 2).split(" ");
    const note_map = {
        "C4": 261,
        "C#4": 277,
        "D4": 293,
        "Eb4": 311,
        "E4": 329,
        "F4": 349,
        "F#4": 369,
        "G4": 391,
        "G#4": 415,
        "A4": 440,
        "Bb4": 466,
        "B4": 493,
        "C5": 523,
        "C#5": 554,
        "D5": 587,
        "Eb5": 622,
        "E5": 659,
        "F5": 698,
        "F#5": 740,
        "G5": 784,
        "G#5": 831,
        "A5": 880,
        "Bb5": 932,
        "B5": 988,
        "C6": 1046,
        "C#6": 1109,
        "D6": 1175,
        "Eb6": 1244,
        "E6": 1318, 
        "F6": 1396,
        "F#6": 1480,
        "G6": 1568,
        "G#6": 1661,
        "A6": 1760,
        "Bb6": 1865,
        "B6": 1976,
        "C7": 2093,
        "SIL": 0
    };
    var code = 
`{
  unsigned int notes[] = { ${notes.map(a => note_map?.[a] || 0).join(", ")} };
  unsigned int duration = (${dropdown_duration}) * 1000.0f / 2.0f;
  for (int freq : notes) {
    sound(freq, duration);
    delay(duration);
  }
}
`;
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
