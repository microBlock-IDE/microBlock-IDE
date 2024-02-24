Blockly.JavaScript['display_draw_text'] = function(block) {
  Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';
  
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `oled.text(${value_x}, ${value_y}, ${value_text}.c_str());\n`;
  return code;
};

Blockly.JavaScript['display_draw_line'] = function(block) {
  Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

  var value_x1 = Blockly.JavaScript.valueToCode(block, 'x1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y1 = Blockly.JavaScript.valueToCode(block, 'y1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x2 = Blockly.JavaScript.valueToCode(block, 'x2', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y2 = Blockly.JavaScript.valueToCode(block, 'y2', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `oled.drawLine(${value_x1}, ${value_y1}, ${value_x2}, ${value_y2}, WHITE);\n`;
  return code;
};

Blockly.JavaScript['display_draw_rect'] = function(block) {
  Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_fill = block.getFieldValue('fill');

  var code = `oled.${(+dropdown_fill) ? 'fillRect' : 'drawRect'}(${value_x}, ${value_y}, ${value_width}, ${value_height}, WHITE);\n`;
  return code;
};

Blockly.JavaScript['display_fill'] = function(block) {
  Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

  var code = 'oled.fillScreen(WHITE);\n';
  return code;
};

Blockly.JavaScript['display_clear'] = function(block) {
  Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

  var code = 'oled.fillScreen(0);\n';
  return code;
};

Blockly.JavaScript['display_show'] = function(block) {
  Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';
  
  var code = 'oled.show();\n';
  return code;
};

Blockly.JavaScript['display_draw_bitmap'] = function(block) {
  Blockly.JavaScript.definitions_['include']['POP32.h'] = '#include <POP32.h>';

  var bitmap_image = block.getFieldValue('image');
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  
  const width = parseInt(bitmap_image.substring(2, 4), 16);
  const height = parseInt(bitmap_image.substring(6, 8), 16);
  const data = bitmap_image.substring(8, bitmap_image.length);
  
  var code = `oled.drawBitmap(${value_x}, ${value_y}, (const uint8_t *) "${data}", ${width}, ${height}, WHITE);\n`;
  return code;
};
