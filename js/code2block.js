
let pythonCodeToBlock = (code) => {
    return Blockly.Xml.textToDom(`
    <xml>
        <block type="text_code">
            <field name="code">${code}</field>
        </block>
    </xml>
    `);
}

let codeFromMonacoToBlock = () => {
    let code = editor.getValue();

    blocklyWorkspace.clear();

    let dom = pythonCodeToBlock(code);
    Blockly.Xml.domToWorkspace(dom, blocklyWorkspace);
}
