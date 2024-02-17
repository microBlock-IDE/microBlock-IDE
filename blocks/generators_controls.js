Blockly.Python['controls_wait'] = function (block) {
  Blockly.Python.definitions_['from_time_import_sleep'] = 'from time import sleep';

  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  var code = `sleep(${value_time})\n`;
  return code;
};

Blockly.JavaScript['controls_wait'] = function (block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `delay(${value_time} * 1000);\n`;
  return code;
};

Blockly.Python['controls_wait_ms'] = function (block) {
  Blockly.Python.definitions_['from_time_import_sleep_ms'] = 'from time import sleep_ms';

  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  var code = `sleep_ms(${value_time})\n`;
  return code;
};

Blockly.JavaScript['controls_wait_ms'] = function (block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `delay(${value_time});\n`;
  return code;
};

Blockly.Python['controls_wait_us'] = function (block) {
  Blockly.Python.definitions_['from_time_import_sleep_us'] = 'from time import sleep_us';

  var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
  var code = `sleep_us(${value_time})\n`;
  return code;
};

Blockly.JavaScript['controls_wait_us'] = function (block) {
  var value_time = Blockly.JavaScript.valueToCode(block, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `delayMicroseconds(${value_time});\n`;
  return code;
};

Blockly.Python['controls_wait_until'] = function (block) {
  var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var code = `while not ${value_condition}: pass\n`;
  return code;
};

Blockly.JavaScript['controls_wait_until'] = function (block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `while (!${value_condition}) ;\n`;
  return code;
};

Blockly.Python['controls_forever'] = function (block) {
  var statements_block = Blockly.Python.statementToCode(block, 'block');
  var code = `while True:\n${statements_block}`;
  return code;
};

Blockly.JavaScript['controls_forever'] = function (block) {
  var statements_block = Blockly.JavaScript.statementToCode(block, 'block');
  var code = `while(1) {\n${statements_block}}\n`;
  return code;
};

Blockly.Python['controls_on_start'] = function (block) {
  var statements_block = Blockly.Python.statementToCode(block, 'block');
  const line = statements_block.split(/\r\n|\r|\n/);
  const code = line.map(a => a.substring(2)).join("\n") + "\n";
  return code;
};

Blockly.JavaScript['controls_on_start'] = function (block) {
  var statements_block = Blockly.JavaScript.statementToCode(block, 'block');
  var code = `void setup() {\n${statements_block}}\n\n`;
  return code;
};

Blockly.Python['controls_forever_no_connect'] = function (block) {
  var statements_block = Blockly.Python.statementToCode(block, 'block');
  var code = `while True:\n${statements_block || "  pass"}\n`;
  return code;
};

Blockly.JavaScript['controls_forever_no_connect'] = function (block) {
  var statements_block = Blockly.JavaScript.statementToCode(block, 'block');
  var code = `void loop() {\n${statements_block}}\n`;
  return code;
};

Blockly.Python['while_loop'] = function (block) {
  var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var statements_DO = Blockly.Python.statementToCode(block, 'DO');
  var code = `while ${value_condition}:\n${statements_DO}`;
  return code;
};

Blockly.JavaScript['while_loop'] = function (block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_DO = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = `while (${value_condition}) {\n${statements_DO}}\n`;
  return code;
};

// overwrite javascript to C/C++
const isNumber = str => /^\s*-?\d+(\.\d+)?\s*$/.test(str);

Blockly.JavaScript.forBlock['controls_for'] = function (block) {
  const variable0 = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('VAR'), Blockly.Names.NameType.VARIABLE);
  const argument0 = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  const argument1 = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  const increment = Blockly.JavaScript.valueToCode(block, 'BY', Blockly.JavaScript.ORDER_ASSIGNMENT) || '1';

  let branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  let code;

  if (isNumber(argument0) && isNumber(argument1) &&
    isNumber(increment)) {
    // All arguments are simple numbers.
    const up = Number(argument0) <= Number(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 +
      (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0;
    const step = Math.abs(Number(increment));
    if (step === 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    let startVar = argument0;
    if (!argument0.match(/^\w+$/) && !isNumber(argument0)) {
      startVar = Blockly.JavaScript.nameDB_.getDistinctName(
        variable0 + '_start', Blockly.Names.NameType.VARIABLE);
      code += 'int ' + startVar + ' = ' + argument0 + ';\n';
    }
    let endVar = argument1;
    if (!argument1.match(/^\w+$/) && !isNumber(argument1)) {
      endVar = Blockly.JavaScript.nameDB_.getDistinctName(
        variable0 + '_end', Blockly.Names.NameType.VARIABLE);
      code += 'int ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    const incVar = Blockly.JavaScript.nameDB_.getDistinctName(
      variable0 + '_inc', Blockly.Names.NameType.VARIABLE);
    code += 'int ' + incVar + ' = ';
    if (isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'Math.abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += Blockly.JavaScript.INDENT + incVar + ' = -' + incVar + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + '; ' + incVar +
      ' >= 0 ? ' + variable0 + ' <= ' + endVar + ' : ' + variable0 +
      ' >= ' + endVar + '; ' + variable0 + ' += ' + incVar + ') {\n' +
      branch + '}\n';
  }
  return code;
}

Blockly.JavaScript.forBlock['controls_repeat_ext'] = function (block) {
  // Repeat n times.
  let repeats;
  if (block.getField('TIMES')) {
    // Internal number.
    repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    repeats =
      Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ASSIGNMENT) ||
      '0';
  }
  let branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block);
  let code = '';
  const loopVar =
    Blockly.JavaScript.nameDB_.getDistinctName('count', Blockly.Names.NameType.VARIABLE);
  let endVar = repeats;
  if (!repeats.match(/^\w+$/) && !isNumber(repeats)) {
    endVar =
      Blockly.JavaScript.nameDB_.getDistinctName(
        'repeat_end', Blockly.Names.NameType.VARIABLE);
    code += 'int ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (int ' + loopVar + ' = 0; ' + loopVar + ' < ' + endVar + '; ' +
    loopVar + '++) {\n' + branch + '}\n';
  return code;
}