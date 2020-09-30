Blockly.Python['external_rtc_set_time'] = function(block) {
    Blockly.Python.definitions_['import_rtc'] = 'import rtc';

    var value_hour = Blockly.Python.valueToCode(block, 'hour', Blockly.Python.ORDER_ATOMIC);
    var value_min = Blockly.Python.valueToCode(block, 'min', Blockly.Python.ORDER_ATOMIC);
    var value_sec = Blockly.Python.valueToCode(block, 'sec', Blockly.Python.ORDER_ATOMIC);
    var value_day = Blockly.Python.valueToCode(block, 'day', Blockly.Python.ORDER_ATOMIC);
    var value_month = Blockly.Python.valueToCode(block, 'month', Blockly.Python.ORDER_ATOMIC);
    var value_year = Blockly.Python.valueToCode(block, 'year', Blockly.Python.ORDER_ATOMIC);

    var code = `rtc.datetime((${value_year}, ${value_month}, ${value_day}, ${value_hour}, ${value_min}, ${value_sec}, 0, 0))\n`;
    return code;
};

Blockly.Python['external_rtc_get_hour'] = function(block) {
    Blockly.Python.definitions_['import_rtc'] = 'import rtc';

  var code = 'rtc.datetime()[3]';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['external_rtc_get_min'] = function(block) {
    Blockly.Python.definitions_['import_rtc'] = 'import rtc';

    var code = 'rtc.datetime()[4]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['external_rtc_get_sec'] = function(block) {
    Blockly.Python.definitions_['import_rtc'] = 'import rtc';

    var code = 'rtc.datetime()[5]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['external_rtc_get_day'] = function(block) {
    Blockly.Python.definitions_['import_rtc'] = 'import rtc';

    var code = 'rtc.datetime()[2]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['external_rtc_get_month'] = function(block) {
    Blockly.Python.definitions_['import_rtc'] = 'import rtc';

    var code = 'rtc.datetime()[1]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['external_rtc_get_year'] = function(block) {
    Blockly.Python.definitions_['import_rtc'] = 'import rtc';

    var code = 'rtc.datetime()[0]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['external_rtc_get_microsecond'] = function(block) {
    Blockly.Python.definitions_['import_rtc'] = 'import rtc';

    var code = 'rtc.datetime()[6]';
    return [code, Blockly.Python.ORDER_NONE];
};