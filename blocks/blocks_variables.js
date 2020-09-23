Blockly.defineBlocksWithJsonArray([
  {
    "type": "variables_get",
    "message0": "%1",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      }
    ],
    "output": null,
    "colour": "#ac5e2e",
    "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
    "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
    "extensions": ["contextMenu_variableSetterGetter"]
  },
  // Block for variable setter.
  {
    "type": "variables_set",
    "message0": "%{BKY_VARIABLES_SET}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ac5e2e",
    "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
    "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
    "extensions": ["contextMenu_variableSetterGetter"]
  },
  {
    "type": "math_change",
    "message0": "%{BKY_MATH_CHANGE_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "VAR",
        "variable": "%{BKY_MATH_CHANGE_TITLE_ITEM}"
      },
      {
        "type": "input_value",
        "name": "DELTA",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#ac5e2e",
    "helpUrl": "%{BKY_MATH_CHANGE_HELPURL}",
    "extensions": ["math_change_tooltip"]
  }
]);
/*
if (Blockly.Blocks['math_change']) {
  delete Blockly.Blocks['math_change'];
}
*/
// Copy from blockly\core\variables.js
Blockly.Variables.flyoutCategoryBlocks = function(workspace) {
  var variableModelList = workspace.getVariablesOfType('');

  var xmlList = [];
  if (variableModelList.length > 0) {
    // New variables are added to the end of the variableModelList.
    var mostRecentVariable = variableModelList[variableModelList.length - 1];
    if (Blockly.Blocks['variables_set']) {
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', 'variables_set');
      block.setAttribute('gap', Blockly.Blocks['math_change'] ? 8 : 24);
      block.appendChild(
          Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
      var value = Blockly.Xml.textToDom(
          '<value name="VALUE">' +
          '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
          '</shadow>' +
          '</value>');
      block.appendChild(value);
      xmlList.push(block);
    }
    if (Blockly.Blocks['math_change']) {
      var block = Blockly.utils.xml.createElement('block');
      block.setAttribute('type', 'math_change');
      block.setAttribute('gap', Blockly.Blocks['variables_get'] ? 20 : 8);
      block.appendChild(
          Blockly.Variables.generateVariableFieldDom(mostRecentVariable));
      var value = Blockly.Xml.textToDom(
          '<value name="DELTA">' +
          '<shadow type="math_number">' +
          '<field name="NUM">1</field>' +
          '</shadow>' +
          '</value>');
      block.appendChild(value);
      xmlList.push(block);
    }

    if (Blockly.Blocks['variables_get']) {
      variableModelList.sort(Blockly.VariableModel.compareByName);
      for (var i = 0, variable; (variable = variableModelList[i]); i++) {
        var block = Blockly.utils.xml.createElement('block');
        block.setAttribute('type', 'variables_get');
        block.setAttribute('gap', 8);
        block.appendChild(Blockly.Variables.generateVariableFieldDom(variable));
        xmlList.push(block);
      }
    }
  }
  return xmlList;
};