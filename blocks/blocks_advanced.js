Blockly.defineBlocksWithJsonArray([
{
  "type": "print",
  "message0": "print %1 to terminal",
  "args0": [
    {
      "type": "input_value",
      "name": "value"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "dht_read",
  "message0": "%1 pin %2 read %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "type",
      "options": [
        [
          "DHT11",
          "11"
        ],
        [
          "DHT22",
          "22"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "pin",
      "check": "Number"
    },
    {
      "type": "field_dropdown",
      "name": "valueIndex",
      "options": [
        [
          "temperature",
          "0"
        ],
        [
          "humidity",
          "1"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "ds18x20_read",
  "message0": "DS18x20 pin %1 read temperature",
  "args0": [
    {
      "type": "input_value",
      "name": "pin",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rtc_set_time",
  "message0": "RTC set date and time %1 Hour: %2 Min: %3 Second: %4 Day: %5 Month: %6 Year: %7",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "hour",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "min",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "sec",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "day",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "month",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "year",
      "check": "Number",
      "align": "RIGHT"
    }
  ],
  "inputsInline": false,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rtc_get_hour",
  "message0": "RTC get Hour",
  "inputsInline": false,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rtc_get_min",
  "message0": "RTC get Min",
  "inputsInline": false,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rtc_get_sec",
  "message0": "RTC get Second",
  "inputsInline": false,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rtc_get_day",
  "message0": "RTC get Day",
  "inputsInline": false,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rtc_get_month",
  "message0": "RTC get Month",
  "inputsInline": false,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rtc_get_year",
  "message0": "RTC get Year",
  "inputsInline": false,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rtc_get_microsecond",
  "message0": "RTC get Microsecond",
  "inputsInline": false,
  "output": "Number",
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "rtc_sync_ntp",
  "message0": "RTC sync from NTP",
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "light_sleep",
  "message0": "light sleep %1 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#8E44AD",
  "tooltip": "A lightsleep has full RAM and state retention. Upon wake execution is resumed from the point where the sleep was requested, with all subsystems operational.",
  "helpUrl": ""
},
{
  "type": "deep_sleep",
  "message0": "deep sleep %1 seconds",
  "args0": [
    {
      "type": "input_value",
      "name": "time",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#8E44AD",
  "tooltip": "A deepsleep may not retain RAM or any other state of the system (for example peripherals or network interfaces). Upon wake execution is resumed from the main script, similar to a hard or power-on reset.",
  "helpUrl": ""
},
{
  "type": "is_woke_from_deep_sleep",
  "message0": "is woke from deep sleep ?",
  "inputsInline": true,
  "output": [
    "Number",
    "Boolean"
  ],
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "send_into_source",
  "message0": "send %1 to dashboard via %2",
  "args0": [
    {
      "type": "input_value",
      "name": "value"
    },
    {
      "type": "input_value",
      "name": "source"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "board_reset",
  "message0": "hard reset",
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#8E44AD",
  "tooltip": "Reset board and start program again (NOT recommend)",
  "helpUrl": ""
},
{
  "type": "run_in_background",
  "message0": "run in background %1 %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "callback"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#8E44AD",
  "tooltip": "",
  "helpUrl": ""
},
]);

Blockly.Blocks['import'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('import')
      .appendField(new Blockly.FieldDropdown(this.generateOptions), 'file_name');
    this.setColour("#8E44AD");
    this.setTooltip("");
    this.setHelpUrl("");
  },
  generateOptions: function() {
    const option = fs.ls("/").filter(a => a !== file_name_select && (a.endsWith(".py") || a.endsWith(".xml")) && a !== "main.py" && a !== "main.xml").map(a => ([ a.replace(/\.(py|xml)/, ""), a ]));
    return (option.length > 0 && option) || [[ "", "" ]];
  }
};

Blockly.Blocks['call_import'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('call')
      .appendField(new Blockly.FieldDropdown(this.generateOptions), 'object');
    this.setColour("#8E44AD");
    this.setTooltip("");
    this.setHelpUrl("");

    /* this.setOnChange(function(changeEvent) {
      if (([ "change" ].indexOf(changeEvent?.type) < 0) || changeEvent.isUiEvent) {
        return;
      }
      console.log("changeEvent", changeEvent);
      const function_detail = JSON.parse(this.getFieldValue('object')) || {};
      this._updateInputValue(function_detail);
    });*/
  },
  onchange: function(e) {
    if (([ "change" ].indexOf(e?.type) < 0) || e.isUiEvent || e.blockId !== this.id) {
      return;
    }
    // console.log("changeEvent", e, this);
    const function_detail = JSON.parse(this.getFieldValue('object')) || {};
    this._updateInputValue(function_detail);
  },
  generateOptions: function() {
    const file_list = fs.ls("/").filter(a => a !== file_name_select && (a.endsWith(".py") || a.endsWith(".xml")) && a !== "main.py" && a !== "main.xml") || [ ];
    const option = [];
    // console.log(file_list);
    for (const file_name of file_list) {
      if (file_name.endsWith(".xml")) {
        const dom = Blockly.utils.xml.textToDom(fs.read(file_name));
        for (const block of dom.querySelectorAll("block[type='procedures_defreturn'],block[type='procedures_defnoreturn'],block[type='procedures_callreturn']")) {
          const function_name = block.querySelector("field[name='NAME']").textContent;
          const call_function = file_name.replace(/\.(py|xml)/, "") + "." + function_name;
          const function_detail = JSON.stringify({
            file: file_name,
            function: function_name,
            output: block.getAttribute("type") === "procedures_defreturn",
            input: [ ...block?.querySelectorAll("mutation > arg")]?.map(a => a.getAttribute("name")) || null
          });
          option.push([ call_function, function_detail ]);
        }
      } else if (file_name.endsWith(".py")) {
        const code = fs.read(file_name);

        // Find function name
        let in_function_find_return = false;
        let focus_function = "";
        let focus_input = [];
        let focus_output = false;
        for (const line of code.split("\n")) { // read line by line
          if (line.startsWith("def ")) {
            if (in_function_find_return) {
              const call_function = file_name.replace(/\.(py|xml)/, "") + "." + focus_function;
              const function_detail = JSON.stringify({
                file: file_name,
                function: focus_function,
                input: focus_input,
                output: focus_output,
              });
              option.push([ call_function, function_detail ]);
              in_function_find_return = false;
            }

            const def_cut = line.match(/^def\s+(.*)\((.*)\)\s*:/);
            focus_function = def_cut[1];
            focus_input = def_cut[2].split(",").map(a => a.replace(/\=.+/, "").replace(/^\s+|\s+$/gm, ""));
            focus_output = false;
            in_function_find_return = true;
          } else if ((line.match(/^(\s+)/)?.[0]?.length || 0) > 0) {
            if (in_function_find_return && line.indexOf("return ") > 0) {
              focus_output = true;
            }
          } else {
            if (in_function_find_return) {
              const call_function = file_name.replace(/\.(py|xml)/, "") + "." + focus_function;
              const function_detail = JSON.stringify({
                file: file_name,
                function: focus_function,
                input: focus_input,
                output: focus_output,
              });
              option.push([ call_function, function_detail ]);
              in_function_find_return = false;
            }
          }
        }

        if (in_function_find_return) {
          const call_function = file_name.replace(/\.(py|xml)/, "") + "." + focus_function;
          const function_detail = JSON.stringify({
            file: file_name,
            function: focus_function,
            input: focus_input,
            output: focus_output,
          });
          option.push([ call_function, function_detail ]);
          in_function_find_return = false;
        }
      }
    }
    return (option.length > 0 && option) || [[ "", "" ]];
  },

  _updateInputValue: function(function_detail) {
    if (function_detail?.output) {
      this.unplug();
      this.setPreviousStatement(false);
      this.setNextStatement(false);
      this.setOutput(true);
    } else {
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setOutput(false);
    }
    const to_remove = [];
    for (const input of this.inputList) {
      if (input.name.length > 0) {
        to_remove.push(input.name);
      }
    }
    to_remove.forEach(inputName => this.removeInput(inputName));
    for (const input_name of function_detail?.input) {
      if (this.inputList.map(a => a.name).indexOf(input_name) >= 0) {
        continue;
      }
      this.appendValueInput(input_name)
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(input_name + ":");
      // console.log("Add", input_name);
    }

    this.mutationToDom();
  },


  /**
   * Create XML to represent number of text inputs.
   * @returns {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.textContent = this.getFieldValue('object');
    return container;
  },

  /**
   * Parse XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    const function_detail = JSON.parse(xmlElement.textContent) || {};
    this._updateInputValue(function_detail);
  }
};