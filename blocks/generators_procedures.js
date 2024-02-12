Blockly.Python['math_change'] = function (block) {
  // Add to a variable in place.
  var argument0 = Blockly.Python.valueToCode(block, 'DELTA',
    Blockly.Python.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Python.nameDB_.getName(block.getFieldValue('VAR'),
    Blockly.VARIABLE_CATEGORY_NAME);
  return `${varName} = (${varName} if type(${varName}) in [ int, float ] else 0) + ${argument0}\n`;
};

Blockly.Python['random_seed'] = function(block) {
  Blockly.Python.definitions_['import_random'] = 'import random';
  Blockly.Python.definitions_['from machine_import_ADC'] = 'from machine import ADC';

  var code = 'random.seed(ADC(Pin(35)).read())\n';
  return code;
};

Blockly.JavaScript.forBlock['random_seed'] = function(block) {
  var code = 'randomSeed(analogRead(A0));\n';
  return code;
};

Blockly.JavaScript.forBlock['math_random_int'] = function(block) {
  const argument0 = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_NONE) || '0';
  const argument1 = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_NONE) || '0';
  
  const code = 'random(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['procedures_defreturn'] = function (block) {
  // Define a procedure with a return value.
  const funcName = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Names.NameType.PROCEDURE);
  console.log("funcName def", funcName);
  var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
  if (Blockly.JavaScript.STATEMENT_PREFIX) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    branch = Blockly.JavaScript.prefixLines(Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g, '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
  }
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN', Blockly.JavaScript.ORDER_NONE) || '';
  var args = [];
  var argsIncType = [];
  const variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = args[i] = Blockly.JavaScript.nameDB_.getName(variables[i], Blockly.Names.NameType.VARIABLE);
    // let vType = (args[i] in Blockly.JavaScript.dbNameType_) ? Blockly.JavaScript.dbNameType_[args[i]].type : "int";
    let vType = "float";
    argsIncType[i] = vType + ' ' + args[i];
  }
  //--- return type ---//
  if (block.childBlocks_.length >= 1) {
    var child = block.getInputTargetBlock("RETURN");
    if (child) {
      if (child.outputConnection.check && child.outputConnection.check[0]) {
        var childType = child.outputConnection.check[0].toLowerCase();
      }
    }
  }
  var returnType = 'void';
  console.log(childType);
  if (childType) {
    returnType = ({ "number": "float", "string": "String" })?.[childType] || "void";
  } else {
    /*if (returnValue in Blockly.JavaScript.dbNameType_) {
      returnType = Blockly.JavaScript.dbNameType_[returnValue].type;
    }*/
  }
  if (returnValue) {
    returnValue = Blockly.JavaScript.INDENT + 'return ' + returnValue + ';\n';
  } else {
    // returnValue = Blockly.JavaScript.INDENT + 'return;\n';
  }

  var code = `${returnType} ${funcName}(${argsIncType.join(', ')}) {\n${branch}${returnValue}}\n`;
  //var code = returnType + ' function ' + funcName + '(' + args.join(', ') + ') {\n' + branch + returnValue + '}';
  code = Blockly.JavaScript.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  if (!Blockly.JavaScript.definitions_) {
    Blockly.JavaScript.definitions_ = {};
  }
  Blockly.JavaScript.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.JavaScript.forBlock['procedures_defnoreturn'] =
  Blockly.JavaScript.forBlock['procedures_defreturn'];

Blockly.JavaScript.forBlock['procedures_callreturn'] = function (block) {
  // Call a procedure with a return value.
  var funcName = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  funcName = funcName.substring(0, funcName.length - 1);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
      Blockly.JavaScript.ORDER_COMMA) || 'NULL';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['procedures_callnoreturn'] = function (block) {
  // console.log(block.getFieldValue('NAME'));
  // Call a procedure with no return value.
  var funcName = Blockly.JavaScript.nameDB_.getName(
    block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  // var funcName = block.getFieldValue('NAME');
  funcName = funcName.substring(0, funcName.length - 1);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
      Blockly.JavaScript.ORDER_COMMA) || 'NULL';
  }
  console.log("funcName", funcName);
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.JavaScript.forBlock['procedures_ifreturn'] = function (block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION',
    Blockly.JavaScript.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || 'null';
    code += Blockly.JavaScript.INDENT + 'return ' + value + ';\n';
  } else {
    code += Blockly.JavaScript.INDENT + 'return;\n';
  }
  code += '}\n';
  return code;
};
