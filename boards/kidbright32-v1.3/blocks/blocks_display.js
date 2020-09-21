Blockly.defineBlocksWithJsonArray([{
  "type": "display_show",
  "message0": "Display show 2-chars %1",
  "args0": [
    {
      "type": "input_value",
      "name": "value"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_scroll",
  "message0": "Display show scroll %1",
  "args0": [
    {
      "type": "input_value",
      "name": "value"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_show4x8",
  "message0": "Display show number %1",
  "args0": [
    {
      "type": "input_value",
      "name": "value"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "display_clear",
  "message0": "Display clear",
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#3498DB",
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.Blocks["display_custom"] = {
  init: function() {
      this.appendDummyInput()
        .appendField("Display show")
/*        .appendField("                                ")
        .appendField(new Blockly.FieldImage("/icons/shift_left_24px.svg", 24, 24, "*", function(e) {
          for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 16; x++) {
              if (x != 15) {
                var val = e.sourceBlock_.getFieldValue('POS_X' + (x + 1) + '_Y' + y);
                e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
              } else {
                e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
              }
            }
          }
        }, true))
        .appendField(new Blockly.FieldImage("/icons/shift_right_24px.svg", 24, 24, "*", function(e) {
          for (var y = 0; y < 8; y++) {
            for (var x = 15; x >= 0; x--) {
              if (x != 0) {
                var val = e.sourceBlock_.getFieldValue('POS_X' + (x - 1) + '_Y' + y);
                e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
              } else {
                e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
              }
            }
          }
        }, true))
        .appendField(new Blockly.FieldImage("/icons/shift_up_24px.svg", 24, 24, "*", function(e) {
          for (var y = 7; y >= 0; y--) {
            for (var x = 0; x < 16; x++) {
              if (y != 0) {
                var val = e.sourceBlock_.getFieldValue('POS_X' + x + '_Y' + (y - 1));
                e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
              } else {
                e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
              }
            }
          }
        }, true))
        .appendField(new Blockly.FieldImage("/icons/shift_down_24px.svg", 24, 24, "*", function(e) {
          for (var y = 0; y < 8; y++) {
            for (var x = 0; x < 16; x++) {
              if (y != 7) {
                var val = e.sourceBlock_.getFieldValue('POS_X' + x + '_Y' + (y + 1));
                e.sourceBlock_.setFieldValue(val, 'POS_X' + x + '_Y' + y);
              } else {
                e.sourceBlock_.setFieldValue('false', 'POS_X' + x + '_Y' + y);
              }
            }
          }
        }, true));*/

    for (var y = 7; y >= 0; y--) {
      let line = this.appendDummyInput();
      for (var x = 0; x < 16; x++) {
        line.appendField(new Blockly.FieldCheckbox('false', null, true), 'POS_X' + x + '_Y' + y);
      }
    }
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#3498DB");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.FieldCheckbox.prototype.initView = function() {
  Blockly.FieldCheckbox.superClass_.initView.call(this);

  if (this.value_) {
    Blockly.utils.dom.addClass(this.borderRect_, 'blocklyCheckedBox');
  } else {
    Blockly.utils.dom.removeClass(this.borderRect_, 'blocklyCheckedBox');
  }
  this.textElement_.style.display = 'none';
};

Blockly.FieldCheckbox.prototype.doValueUpdate_ = function(newValue) {
  this.value_ = this.convertValueToBool_(newValue);
  // Update visual.
  if (this.textElement_) {
    this.textElement_.style.display = 'none';
  }

  if (this.borderRect_) {
    if (this.value_) {
      Blockly.utils.dom.addClass(this.borderRect_, 'blocklyCheckedBox');
    } else {
      Blockly.utils.dom.removeClass(this.borderRect_, 'blocklyCheckedBox');
    }
  }
};
