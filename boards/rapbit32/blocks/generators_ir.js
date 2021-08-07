Blockly.Python['ir_read'] = function (block) {
    Blockly.Python.definitions_['import_IR'] = 'import IR';

    var code = `IR.read()`;
    return [code, Blockly.Python.ORDER_NONE];
};
