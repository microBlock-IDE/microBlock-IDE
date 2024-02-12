// Fixed text
Blockly.JavaScript.quote_ = (a) => {
    a = a.replace(/\\/g, "\\\\").replace(/\n/g, '\\\n').replace(/"/g, '\\"');
    return `"${a}"`;
}

Blockly.JavaScript.forBlock['text'] = function(block) {
    // Text value.
    var code = `String(${Blockly.JavaScript.quote_(block.getFieldValue('TEXT'))})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['text_join'] = function(block) {
    const list = Array.from({ length: block.itemCount_ }, (value, index) => {
        const converted = Blockly.JavaScript.valueToCode(block, 'ADD' + index, Blockly.JavaScript.ORDER_COMMA);
        if (converted) {
            if (converted.startsWith("String(")) {
                return converted;
            } else {
                return 'String(' + converted + ')';
            }
        } else {
            return 'String("")';
        }
    });

    var code = list.length > 0 ? `(${list.join(" + ")})` : "String(\"\")";
    return [ code, Blockly.JavaScript.ORDER_FUNCTION_CALL ];
};


