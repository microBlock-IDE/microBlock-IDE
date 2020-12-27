Blockly.Python['display_draw_text'] = function(block) {
  Blockly.Python.definitions_['import_display'] = 'import display';
  
  var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);

  var code = `display.text(str(${value_text}), ${value_x}, ${value_y}, 1)\n`;
  return code;
};

Blockly.Python['display_draw_line'] = function(block) {
  Blockly.Python.definitions_['import_display'] = 'import display';

  var value_x1 = Blockly.Python.valueToCode(block, 'x1', Blockly.Python.ORDER_ATOMIC);
  var value_y1 = Blockly.Python.valueToCode(block, 'y1', Blockly.Python.ORDER_ATOMIC);
  var value_x2 = Blockly.Python.valueToCode(block, 'x2', Blockly.Python.ORDER_ATOMIC);
  var value_y2 = Blockly.Python.valueToCode(block, 'y2', Blockly.Python.ORDER_ATOMIC);

  var code = `display.line(${value_x1}, ${value_y1}, ${value_x2}, ${value_y2}, 1)\n`;
  return code;
};

Blockly.Python['display_draw_rect'] = function(block) {
  Blockly.Python.definitions_['import_display'] = 'import display';

  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  var value_width = Blockly.Python.valueToCode(block, 'width', Blockly.Python.ORDER_ATOMIC);
  var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
  var dropdown_fill = block.getFieldValue('fill');

  var code = `display.${(+dropdown_fill) ? 'fill_rect' : 'rect'}(${value_x}, ${value_y}, ${value_width}, ${value_height}, 1)\n`;
  return code;
};

Blockly.Python['display_fill'] = function(block) {
  Blockly.Python.definitions_['import_display'] = 'import display';

  var code = 'display.fill(1)\n';
  return code;
};

Blockly.Python['display_clear'] = function(block) {
  Blockly.Python.definitions_['import_display'] = 'import display';

  var code = 'display.fill(0)\n';
  return code;
};

Blockly.Python['display_show'] = function(block) {
  Blockly.Python.definitions_['import_display'] = 'import display';
  
  var code = 'display.show()\n';
  return code;
};

Blockly.Python['display_draw_bitmap'] = function(block) {
  Blockly.Python.definitions_['import_display'] = 'import display';
  Blockly.Python.definitions_['import_framebuf'] = 'import framebuf';

  var bitmap_image = block.getFieldValue('image');
  var value_x = Blockly.Python.valueToCode(block, 'x', Blockly.Python.ORDER_ATOMIC);
  var value_y = Blockly.Python.valueToCode(block, 'y', Blockly.Python.ORDER_ATOMIC);
  
  var code = `display.image(b"${bitmap_image}", ${value_x}, ${value_y})\n`;
  return code;
};
