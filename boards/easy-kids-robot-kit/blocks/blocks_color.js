Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    'type': 'colour_picker',
    'message0': '%1',
    'args0': [
      {
        'type': 'field_colour',
        'name': 'COLOUR',
        'colour': '#ff0000',
      },
    ],
    'output': 'Colour',
    'helpUrl': '%{BKY_COLOUR_PICKER_HELPURL}',
    "colour": "#0A79D8",
    'tooltip': '%{BKY_COLOUR_PICKER_TOOLTIP}',
    'extensions': ['parent_tooltip_when_inline'],
  },

  // Block for random colour.
  {
    'type': 'colour_random',
    'message0': 'random color',
    'output': 'Colour',
    'helpUrl': '%{BKY_COLOUR_RANDOM_HELPURL}',
    "colour": "#0A79D8",
    'tooltip': '%{BKY_COLOUR_RANDOM_TOOLTIP}',
  },

  // Block for composing a colour from RGB components.
  {
    'type': 'colour_rgb',
    'message0': 'color with red %1 green %2 blue %3',
    'args0': [
      {
        'type': 'input_value',
        'name': 'RED',
        'check': 'Number',
        'align': 'RIGHT',
      },
      {
        'type': 'input_value',
        'name': 'GREEN',
        'check': 'Number',
        'align': 'RIGHT',
      },
      {
        'type': 'input_value',
        'name': 'BLUE',
        'check': 'Number',
        'align': 'RIGHT',
      },
    ],
    'output': 'Colour',
    'helpUrl': '%{BKY_COLOUR_RGB_HELPURL}',
    "colour": "#0A79D8",
    'tooltip': '%{BKY_COLOUR_RGB_TOOLTIP}',
  },
]);
