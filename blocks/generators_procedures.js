Blockly.Python['math_change'] = function (block) {
  // Add to a variable in place.
  var argument0 = Blockly.Python.valueToCode(block, 'DELTA',
    Blockly.Python.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME);
  return `${varName} = (${varName} if type(${varName}) in [ int, float ] else 0) + ${argument0}\n`;
};

Blockly.Python['random_seed'] = function(block) {
  Blockly.Python.definitions_['import_random'] = 'import random';
  Blockly.Python.definitions_['from machine_import_ADC'] = 'from machine import ADC';

  var code = 'random.seed(ADC(Pin(35)).read())\n';
  return code;
};

Blockly.JavaScript['random_seed'] = function(block) {
  var code = 'randomSeed(analogRead(0));\n';
  return code;
};

Blockly.JavaScript.forBlock['math_random_int'] = function(block) {
  const argument0 = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_NONE) || '0';
  const argument1 = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_NONE) || '0';
  
  const code = 'random(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
