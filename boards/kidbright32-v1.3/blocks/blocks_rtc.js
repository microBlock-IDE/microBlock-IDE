Blockly.defineBlocksWithJsonArray([
{
  "type": "external_rtc_set_time",
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
  "colour": "#27AE60",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "external_rtc_get_hour",
  "message0": "RTC get Hour",
  "inputsInline": false,
  "output": "Number",
  "colour": "#27AE60",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "external_rtc_get_min",
  "message0": "RTC get Min",
  "inputsInline": false,
  "output": "Number",
  "colour": "#27AE60",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "external_rtc_get_sec",
  "message0": "RTC get Second",
  "inputsInline": false,
  "output": "Number",
  "colour": "#27AE60",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "external_rtc_get_day",
  "message0": "RTC get Day",
  "inputsInline": false,
  "output": "Number",
  "colour": "#27AE60",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "external_rtc_get_month",
  "message0": "RTC get Month",
  "inputsInline": false,
  "output": "Number",
  "colour": "#27AE60",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "external_rtc_get_year",
  "message0": "RTC get Year",
  "inputsInline": false,
  "output": "Number",
  "colour": "#27AE60",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "external_rtc_get_microsecond",
  "message0": "RTC get Microsecond",
  "inputsInline": false,
  "output": "Number",
  "colour": "#27AE60",
  "tooltip": "",
  "helpUrl": ""
}
]);