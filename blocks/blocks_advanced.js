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
}
]);