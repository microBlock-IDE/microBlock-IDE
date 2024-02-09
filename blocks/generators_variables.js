Blockly.JavaScript.forBlock["variables_set"] = function (block) {
    // Variable setter.
    let argument0 = Blockly.JavaScript.valueToCode(block, "VALUE", Blockly.JavaScript.ORDER_ASSIGNMENT) || "0";
    let varName = Blockly.JavaScript.nameDB_.getName(block.getField("VAR").getText(), Blockly.Names.NameType.VARIABLE);

    let childType;
    if (block.childBlocks_.length >= 1) {
        let child = block.getInputTargetBlock("VALUE");
        // console.log("child", child);
        if (child && child.outputConnection.check && child.outputConnection.check[0]) {
            childType = child.outputConnection.check[0];
            let targetGetVarBlock = Blockly.getMainWorkspace().getAllBlocks().filter(e => e.type === "variables_get" && e.getField("VAR").getText() === varName);
            (targetGetVarBlock.length > 0) && targetGetVarBlock.map(el => el.setOutput(true, child.outputConnection.check));//el.outputConnection.check_ = child.outputConnection.check_);
        } else { //don't have child or child block not define type
            childType = "float";
            let targetGetVarBlock = Blockly.getMainWorkspace().getAllBlocks().filter(e => e.type === "variables_get" && e.getField("VAR").getText() === varName);
            (targetGetVarBlock.length > 0) && targetGetVarBlock.map(el => el.setOutput(true, null));
        }
    }
    if (!Blockly.JavaScript.dbNameType_) {
        Blockly.JavaScript.dbNameType_ = {};
    }
    Blockly.JavaScript.dbNameType_[varName] = childType === "Number" ? "float" : childType;
    // console.log(Blockly.JavaScript.dbNameType_);

    return varName + " = " + argument0 + ";\n";
};


Blockly.JavaScript.forBlock["math_change"] = function (block) {
    // Add to a variable in place.
    const argument0 = Blockly.JavaScript.valueToCode(block, 'DELTA', Blockly.JavaScript.ORDER_ADDITION) || '0';
    const varName = Blockly.JavaScript.nameDB_.getName(block.getField("VAR").getText(), Blockly.Names.NameType.VARIABLE);
    return `${varName} += ${argument0};\n`;
  }
