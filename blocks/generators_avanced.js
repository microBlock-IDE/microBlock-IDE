Blockly.Python['print'] = function(block) {
    var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
    var code = `print(${value_value})\n`;
    return code;
};

Blockly.Python['dht_read'] = function(block) {
    Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['import_dht'] = 'import dht';

  var functionName = Blockly.Python.provideFunction_(
    'DHT_Read',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(type, pin):',
    '  try:',
    '    if type == 11:',
    '      d = dht.DHT11(Pin(pin))',
    '    elif type == 22:',
    '      d = dht.DHT22(Pin(pin))',
    '    else:',
    '      return [ -999, -999 ]',
    '    d.measure()',
    '    return [ d.temperature(), d.humidity() ]',
    '  except:',
    '    print("DHT read error")',
    '    return [ -999, -999 ]']);

    var dropdown_type = block.getFieldValue('type');
    var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    var dropdown_valueindex = block.getFieldValue('valueIndex');
    var code = `${functionName}(${dropdown_type}, ${value_pin})[${dropdown_valueindex}]`;
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['ds18x20_read'] = function(block) {
    Blockly.Python.definitions_['from_time_import_sleep'] = 'from time import sleep';
    Blockly.Python.definitions_['from_machine_import_pin'] = 'from machine import Pin';
    Blockly.Python.definitions_['import_onewire'] = 'import onewire';
    Blockly.Python.definitions_['import_ds18x20'] = 'import ds18x20';
  
    var functionName = Blockly.Python.provideFunction_(
      'DS18x20_Read',
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(pin):',
      '  ds = ds18x20.DS18X20(onewire.OneWire(Pin(pin)))',
      '  roms = ds.scan()',
      '  try:',
      '    ds.convert_temp()',
      '  except:',
      '    return 0',
      '  sleep(0.75)',
      '  for rom in roms:',
      '    return ds.read_temp(rom)',
      '  return 0']);
  
    var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
    var code = `${functionName}(${value_pin})`;
    return [code, Blockly.Python.ORDER_NONE];
};
  
Blockly.Python['rtc_set_time'] = function(block) {
    Blockly.Python.definitions_['from_machine_import_RTC'] = 'from machine import RTC';

    var value_hour = Blockly.Python.valueToCode(block, 'hour', Blockly.Python.ORDER_ATOMIC);
    var value_min = Blockly.Python.valueToCode(block, 'min', Blockly.Python.ORDER_ATOMIC);
    var value_sec = Blockly.Python.valueToCode(block, 'sec', Blockly.Python.ORDER_ATOMIC);
    var value_day = Blockly.Python.valueToCode(block, 'day', Blockly.Python.ORDER_ATOMIC);
    var value_month = Blockly.Python.valueToCode(block, 'month', Blockly.Python.ORDER_ATOMIC);
    var value_year = Blockly.Python.valueToCode(block, 'year', Blockly.Python.ORDER_ATOMIC);

    var code = `RTC().datetime((${value_year}, ${value_month}, ${value_day}, ${value_hour}, ${value_min}, ${value_sec}, 0, 0))\n`;
    return code;
};

Blockly.Python['rtc_get_hour'] = function(block) {
    Blockly.Python.definitions_['from_machine_import_RTC'] = 'from machine import RTC';

  var code = 'RTC().datetime()[3]';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rtc_get_min'] = function(block) {
    Blockly.Python.definitions_['from_machine_import_RTC'] = 'from machine import RTC';

    var code = 'RTC().datetime()[4]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rtc_get_sec'] = function(block) {
    Blockly.Python.definitions_['from_machine_import_RTC'] = 'from machine import RTC';

    var code = 'RTC().datetime()[5]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rtc_get_day'] = function(block) {
    Blockly.Python.definitions_['from_machine_import_RTC'] = 'from machine import RTC';

    var code = 'RTC().datetime()[2]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rtc_get_month'] = function(block) {
    Blockly.Python.definitions_['from_machine_import_RTC'] = 'from machine import RTC';

    var code = 'RTC().datetime()[1]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rtc_get_year'] = function(block) {
    Blockly.Python.definitions_['from_machine_import_RTC'] = 'from machine import RTC';

    var code = 'RTC().datetime()[0]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['rtc_get_microsecond'] = function(block) {
    Blockly.Python.definitions_['from_machine_import_RTC'] = 'from machine import RTC';

    var code = 'RTC().datetime()[6]';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['deep_sleep'] = function(block) {
    Blockly.Python.definitions_['import_machine'] = 'import machine';

    var value_time = Blockly.Python.valueToCode(block, 'time', Blockly.Python.ORDER_ATOMIC);
    var code = `machine.deepsleep(${value_time} * 1000)\n`;
    return code;
};

Blockly.Python['is_woke_from_deep_sleep'] = function(block) {
    Blockly.Python.definitions_['import_machine'] = 'import machine';

    var code = '(machine.reset_cause() == machine.DEEPSLEEP_RESET)';
    return [code, Blockly.Python.ORDER_NONE];
};
