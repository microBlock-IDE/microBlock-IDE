Blockly.Python['usb_on'] = function(block) {
    Blockly.Python.definitions_['import_usb'] = 'import usb';

    var code = 'usb.on()\n';
    return code;
};

Blockly.Python['usb_off'] = function(block) {
    Blockly.Python.definitions_['import_usb'] = 'import usb';

    var code = 'usb.off()\n';
    return code;
};

Blockly.Python['usb_toggle'] = function(block) {
    Blockly.Python.definitions_['import_usb'] = 'import usb';
    
    var code = 'usb.toggle()\n';
    return code;
};