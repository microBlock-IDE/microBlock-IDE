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
    var dropdown_pin = block.getFieldValue('pin');
    var dropdown_valueindex = block.getFieldValue('valueIndex');
    var code = `${functionName}(${dropdown_type}, ${dropdown_pin})[${dropdown_valueindex}]`;
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
  
    var dropdown_pin = block.getFieldValue('pin');
    var code = `${functionName}(${dropdown_pin})`;
    return [code, Blockly.Python.ORDER_NONE];
};
