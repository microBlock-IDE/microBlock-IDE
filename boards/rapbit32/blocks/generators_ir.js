Blockly.Python['ir_read'] = function(block) {
  Blockly.Python.definitions_['import_IR'] = 'import ir';

  var code = `ir.read()`;
  return [code, Blockly.Python.ORDER_NONE];
};
