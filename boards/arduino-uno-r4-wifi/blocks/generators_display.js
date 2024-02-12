let defined_lib = () => {
    Blockly.JavaScript.definitions_['include']['ArduinoGraphics.h'] = '#include <ArduinoGraphics.h>';
    Blockly.JavaScript.definitions_['include']['Arduino_LED_Matrix.h'] = '#include <Arduino_LED_Matrix.h>';
    Blockly.JavaScript.definitions_['define']['matrix'] = 'ArduinoLEDMatrix matrix;';
};

Blockly.JavaScript['display_begin'] = function(block) {
    defined_lib();

    var code = `matrix.begin();\n`;
    return code;
};

Blockly.JavaScript['display_custom'] = function(block) {
    defined_lib();

    const code_frame = block.getFieldValue('value').split("\\x").filter(a => a.length != 0).map(a => a.toUpperCase());

    var code = `{
  uint32_t buff[3] = { 0x${code_frame[0] + code_frame[1] + code_frame[2] + code_frame[3]}, 0x${code_frame[4] + code_frame[5] + code_frame[6] + code_frame[7]}, 0x${code_frame[8] + code_frame[9] + code_frame[10] + code_frame[11]} };
  matrix.loadFrame(buff);
}\n`;
    return code;
};

Blockly.JavaScript['display_show'] = function(block) {
    defined_lib();

    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `matrix.beginDraw();
matrix.stroke(0xFFFFFFFF);
matrix.textFont(Font_5x7);
matrix.beginText(0, 1, 0xFFFFFF);
matrix.print(${value_value});
matrix.endText();
matrix.endDraw();
`;
    return code;
};

Blockly.JavaScript['display_scroll'] = function(block) {
    defined_lib();

    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `matrix.beginDraw();
matrix.stroke(0xFFFFFFFF);
matrix.textScrollSpeed(50);
matrix.textFont(Font_5x7);
matrix.beginText(0, 1, 0xFFFFFF);
matrix.print(String("   ") + String(${value_value}) + String("  "));
matrix.endText(SCROLL_LEFT);
matrix.endDraw();
`;
    return code;
};

Blockly.JavaScript['display_show_number'] = function(block) {
    defined_lib();

    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `matrix.beginDraw();
matrix.stroke(0xFFFFFFFF);
matrix.textFont(Font_4x6);
matrix.beginText(0, 1, 0xFFFFFF);
matrix.print(${value_value});
matrix.endText();
matrix.endDraw();
`;
    return code;
};

Blockly.JavaScript['display_left_show'] = function(block) {
    defined_lib();

    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `display.left(${value_value})\n`;
    return code;
};

Blockly.JavaScript['display_right_show'] = function(block) {
    defined_lib();

    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `display.right(${value_value})\n`;
    return code;
};

Blockly.JavaScript['display_plot'] = function(block) {
    defined_lib();

    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `display.plot(${value_value})\n`;
    return code;
};

Blockly.JavaScript['display_clear'] = function(block) {
    defined_lib();

    var code = `{
  uint32_t buff[3] = { 0, 0, 0 };
  matrix.loadFrame(buff);
}\n`;
    return code;
};

Blockly.JavaScript['display_begin_draw'] = function(block) {
    defined_lib();

    var code = `matrix.beginDraw();\n`;
    return code;
};

Blockly.JavaScript['display_dot_show'] = function(block) {
    defined_lib();
  
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    
    var code = `matrix.set(${value_x}, ${value_y}, 1, 1, 1);\n`;
    return code;
};

Blockly.JavaScript['display_dot_hide'] = function(block) {
    defined_lib();
  
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    
    var code = `matrix.set(${value_x}, ${value_y}, 0, 0, 0);\n`;
    return code;
};

Blockly.JavaScript['display_end_draw'] = function(block) {
    defined_lib();

    var code = `matrix.endDraw();\n`;
    return code;
};
