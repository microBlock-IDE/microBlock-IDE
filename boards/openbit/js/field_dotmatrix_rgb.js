/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview A field used to customize a turtle.
 * @author bekawestberg@gmail.com (Beka Westberg)
 */
'use strict';

// You must provide the constructor for your custom field.
goog.provide('CustomFields.FieldDotMatrixRGB');

// You must require the abstract field class to inherit from.
goog.require('Blockly.Field');
goog.require('Blockly.fieldRegistry');
goog.require('Blockly.utils');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.Size');

var CustomFields = CustomFields || {};

// Generally field's values should be optional, and have logical defaults.
// If this is not possible (for example image fields can't have logical
// defaults) the field should throw a clear error when a value is not provided.
// Editable fields also generally accept validators, so we will accept a
// validator.
CustomFields.FieldDotMatrixRGB = function(opt_value, opt_validator) {

  // The turtle field contains an object as its value, so we need to compile
  // the parameters into an object.
  var value = opt_value || "\x00\x00\x00\x00\x00";

  // A field constructor should always call its parent constructor, because
  // that helps keep the code organized and DRY.
  CustomFields.FieldDotMatrixRGB.superClass_.constructor.call(this, value, opt_validator);

  /**
   * The size of the area rendered by the field.
   * @type {Blockly.utils.Size}
   * @protected
   * @override
   */
  this.size_ = new Blockly.utils.Size(0, 0);
};
Blockly.utils.object.inherits(CustomFields.FieldDotMatrixRGB, Blockly.Field);

// This allows the field to be constructed using a JSON block definition.
CustomFields.FieldDotMatrixRGB.fromJson = function(options) {
  // In this case we simply pass the JSON options along to the constructor,
  // but you can also use this to get message references, and other such things.
  return new CustomFields.FieldDotMatrixRGB(options['value']);
};

// Since this field is editable we must also define serializable as true
// (for backwards compatibility reasons serializable is false by default).
CustomFields.FieldDotMatrixRGB.prototype.SERIALIZABLE = true;

// The cursor property defines what the mouse will look like when the user
// hovers over the field. By default the cursor will be whatever
// .blocklyDraggable's cursor is defined as (vis. grab). Most fields define
// this property as 'default'.
CustomFields.FieldDotMatrixRGB.prototype.CURSOR = 'pointer';

CustomFields.FieldDotMatrixRGB.prototype.text2byte = (text) => {
  let bytes = [ ];
  bytes = text.split("\\x");
  bytes = bytes.filter(byte => byte.length > 0);
  bytes = bytes.map(byte => parseInt(`0x${byte}`));
  return bytes;
};

CustomFields.FieldDotMatrixRGB.prototype.byte2text = (bytes) => {
  bytes = bytes.map(byte => `\\x${byte < 0x10 ? '0' : ''}${byte.toString(16)}`);
  return bytes.join("");
};

// Used to create the DOM of our field.
CustomFields.FieldDotMatrixRGB.prototype.initView = function() {
  // Because we want to have both a borderRect_ (background) and a
  // textElement_ (text) we can call the super-function. If we only wanted
  // one or the other, we could call their individual createX functions.
  CustomFields.FieldDotMatrixRGB.superClass_.initView.call(this);

  // Note that the field group is created by the abstract field's init_
  // function. This means that *all elements* should be children of the
  // fieldGroup_.
  this.createView_();
};

// Updates how the field looks depending on if it is editable or not.
CustomFields.FieldDotMatrixRGB.prototype.updateEditable = function() {
  if (!this.fieldGroup_) {
    // Not initialized yet.
    return;
  }
  // The default functionality just makes it so the borderRect_ does not
  // highlight when hovered.
  Blockly.FieldColour.superClass_.updateEditable.call(this);
  // Things like this are best applied to the clickTarget_. By default the
  // click target is the same as getSvgRoot, which by default is the
  // fieldGroup_.
  var group = this.getClickTarget_();
  if (!this.isCurrentlyEditable()) {
    group.style.cursor = 'not-allowed';
  } else {
    group.style.cursor = this.CURSOR;
  }
};

// Gets the text to display when the block is collapsed
CustomFields.FieldDotMatrixRGB.prototype.getText = function() {
  return "<CUSTOM>";
};

// Makes sure new field values (given to setValue) are valid, meaning
// something this field can legally "hold". Class validators can either change
// the input value, or return null if the input value is invalid. Called by
// the setValue() function.
CustomFields.FieldDotMatrixRGB.prototype.doClassValidation_ = function(newValue) {
  // Undefined signals that we want the value to remain unchanged. This is a
  // special feature of turtle fields, but could be useful for other
  // multi-part fields.

  // This is a strategy for dealing with defaults on multi-part values.
  // The class validator sets individual properties of the object to null
  // to indicate that they are invalid, and then caches that object to the
  // cachedValidatedValue_ property. This way the field can, for
  // example, properly handle an invalid pattern, combined with a valid hat.
  // This can also be done with local validators.
  this.cachedValidatedValue_ = newValue;

  // Always be sure to return!
  return newValue;
};

// Saves the new field value. Called by the setValue function.
CustomFields.FieldDotMatrixRGB.prototype.doValueUpdate_ = function(newValue) {
  // The default function sets this field's this.value_ property to the
  // newValue, and its this.isDirty_ property to true. The isDirty_ property
  // tells the setValue function whether the field needs to be re-rendered.
  CustomFields.FieldDotMatrixRGB.superClass_.doValueUpdate_.call(this, newValue);
  this.displayValue_ = newValue;
  // Since this field has custom UI for invalid values, we also want to make
  // sure it knows it is now valid.
  this.isValueInvalid_ = false;
};

// Notifies that the field that the new value was invalid. Called by
// setValue function. Can either be triggered by the class validator, or the
// local validator.
CustomFields.FieldDotMatrixRGB.prototype.doValueInvalid_ = function(invalidValue) {
  // By default this function is no-op, meaning if the new value is invalid
  // the field simply won't be updated. This field has custom UI for invalid
  // values, so we override this function.

  // We want the value to be displayed like normal.
  // But we want to flag it as invalid, so the render_ function knows to
  // make the borderRect_ red.
  this.displayValue_ = invalidValue;
  this.isDirty_ = true;
  this.isValueInvalid_ = true;
};

// Updates the field's on-block display based on the current display value.
CustomFields.FieldDotMatrixRGB.prototype.render_ = function() {
  var value = this.text2byte(this.displayValue_);

  // Always do editor updates inside render. This makes sure the editor
  // always displays the correct value, even if a validator changes it.
  if (this.editor_) {
    this.renderEditor_();
  }

  this.textElement_.style.display = 'none';

  // Always modify the textContent_ rather than the textElement_. This
  // allows fields to append DOM to the textElement (e.g. the angle field).
  this.textContent_.nodeValue = value;

  // Update image in block
  this.preview_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',  this.createImageDotMatrix_(value));

  if (this.isValueInvalid_) {
    this.borderRect_.style.fill = '#f99';
    this.borderRect_.style.fillOpacity = 1;
  } else {
    this.borderRect_.style.fill = '#fff';
    this.borderRect_.style.fillOpacity = 0.6;
  }

  this.updateSize_();
};

CustomFields.FieldDotMatrixRGB.prototype.renderEditor_ = function(firsttimes) {
  firsttimes = firsttimes || false;
  var value = this.text2byte(this.displayValue_);
  
  for (let y=0;y<5;y++) {
    for (let x=0;x<5;x++) {
      let r, g, b;
      if (value.length === 5) {
        r = (value[y] & (0x10 >> x)) !== 0 ? 255 : 0;
        g = 0;
        b = 0;
      } else {
        r = value?.[(x + (y * 5)) * 3 + 0] || 0;
        g = value?.[(x + (y * 5)) * 3 + 1] || 0;
        b = value?.[(x + (y * 5)) * 3 + 2] || 0;
      }
      this.editor_.querySelector(`.screen span[data-x='${x}'][data-y='${y}']`).style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
  }

  for (let elemt of this.editor_.querySelectorAll(".collection-container img")) {
    if (elemt.alt === this.displayValue_) {
      elemt.classList.add("active");
      if (firsttimes) {
        setTimeout(function() {
          this.editor_.querySelector(".menu > .collection").click();
          this.editor_.querySelector(".collection-container").scrollTop = elemt.offsetTop - 50;
        }.bind(this), 10);
      }
    } else {
      elemt.classList.remove("active");
    }
  }
};

// Used to update the size of the field. This function's logic could be simply
// included inside render_ (it is not called anywhere else), but it is
// usually separated to keep code more organized.
CustomFields.FieldDotMatrixRGB.prototype.updateSize_ = function() {
  var bbox = this.movableGroup_.getBBox();
  var width = bbox.width;
  var height = bbox.height;
  if (this.borderRect_) {
    width += this.constants_.FIELD_BORDER_RECT_X_PADDING * 2;
    height += this.constants_.FIELD_BORDER_RECT_X_PADDING * 2;
    this.borderRect_.setAttribute('width', width);
    this.borderRect_.setAttribute('height', height);
  }
  // Note how both the width and the height can be dynamic.
  this.size_.width = width;
  this.size_.height = height;
};

let collection = [
  "\\x0a\\x1f\\x1f\\x0e\\x04",
  "\\x00\\x0a\\x0e\\x04\\x00",
  "\\x00\\x01\\x02\\x14\\x08",
  "\\x11\\x0a\\x04\\x0a\\x11",
  "\\x00\\x0a\\x00\\x0e\\x11",
  "\\x00\\x0a\\x00\\x0a\\x15",
  "\\x11\\x0a\\x00\\x1f\\x15",
  "\\x00\\x1b\\x00\\x0e\\x00",
  "\\x11\\x00\\x1f\\x03\\x03",
  "\\x1f\\x1b\\x00\\x0a\\x0e",
  "\\x1b\\x00\\x02\\x04\\x08",
  "\\x1b\\x1f\\x0e\\x0e\\x0e",
  "\\x0c\\x1c\\x0f\\x0e\\x00",
  "\\x04\\x0e\\x1f\\x0e\\x0a",
  "\\x00\\x0e\\x1f\\x0a\\x00",
  "\\x1b\\x1f\\x04\\x1f\\x1b",
  "\\x0e\\x15\\x1f\\x1f\\x15",
  "\\x04\\x04\\x04\\x0e\\x04",
  "\\x18\\x08\\x08\\x0e\\x0a",
  "\\x0e\\x15\\x1f\\x0e\\x0e",
  "\\x18\\x1b\\x0a\\x0e\\x00",
  "\\x14\\x14\\x1e\\x1a\\x1e",
  "\\x11\\x11\\x1f\\x0e\\x04",
  "\\x04\\x04\\x04\\x1c\\x1c",
  "\\x15\\x15\\x1f\\x04\\x04",
  "\\x04\\x0e\\x1b\\x0e\\x04",
  "\\x00\\x04\\x0a\\x1f\\x00",
  "\\x10\\x18\\x14\\x12\\x1f",
  "\\x04\\x0a\\x11\\x0a\\x04",
  "\\x00\\x04\\x0a\\x04\\x00",
  "\\x1f\\x11\\x11\\x11\\x1f",
  "\\x00\\x0e\\x0a\\x0e\\x00",
];

CustomFields.FieldDotMatrixRGB.prototype.colorToRgbParser_ = function(color) {
  const match = color.match(/^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d\.\d)\s*)?\)$/i);

  if (match) {
    // match[0] is regex complete match (e.g. "rgb(0,0,0)"), not a regex capturing group
    let parsedColor = {
      r: match[1],
      g: match[2],
      b: match[3]
    };
    if (match[4]) { // if alpha channel is present
      parsedColor.a = match[4];
    }
    return parsedColor;
  } else {
    throw new Error(`Color ${cssColor} could not be parsed.`);
  }
};

// Called when the field is clicked. It is usually used to show an editor,
// but it can also be used for other things e.g. the checkbox field uses
// this function to check/uncheck itself.
CustomFields.FieldDotMatrixRGB.prototype.showEditor_ = function() {
  var html = "";
  html += `<div class="FieldDotMatrixRGBDropdown">`;
  html += `<div class="menu">`;
  html += `<div class="custom active">Custom</div>`;
  html += `<div class="collection">Collection</div>`;
  html += `</div>`;
  html += `<div class="custom-container">`;
  html += `<div class="box-screen">`;
  html += `<div class="color-palette">`;
  html += `<div class="row">`;
  html += `<span style="background-color: #FFFFFF"></span>`;
  html += `<span style="background-color: #C0C0C0"></span>`;
  html += `<span style="background-color: #666666"></span>`;
  html += `<span style="background-color: #000000"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #FFCCCC"></span>`;
  html += `<span style="background-color: #FF0000" class="active"></span>`;
  html += `<span style="background-color: #990000"></span>`;
  html += `<span style="background-color: #330000"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #FFCC99"></span>`;
  html += `<span style="background-color: #FF9900"></span>`;
  html += `<span style="background-color: #CC6600"></span>`;
  html += `<span style="background-color: #663300"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #FF9999"></span>`;
  html += `<span style="background-color: #FFCC66"></span>`;
  html += `<span style="background-color: #CC9933"></span>`;
  html += `<span style="background-color: #663333"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #FFFFCC"></span>`;
  html += `<span style="background-color: #FFFF00"></span>`;
  html += `<span style="background-color: #999900"></span>`;
  html += `<span style="background-color: #333300"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #99FF99"></span>`;
  html += `<span style="background-color: #33FF33"></span>`;
  html += `<span style="background-color: #009900"></span>`;
  html += `<span style="background-color: #003300"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #99FFFF"></span>`;
  html += `<span style="background-color: #66CCCC"></span>`;
  html += `<span style="background-color: #339999"></span>`;
  html += `<span style="background-color: #003333"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #CCFFFF"></span>`;
  html += `<span style="background-color: #33CCFF"></span>`;
  html += `<span style="background-color: #3333FF"></span>`;
  html += `<span style="background-color: #000066"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #CCCCFF"></span>`;
  html += `<span style="background-color: #6666CC"></span>`;
  html += `<span style="background-color: #6600CC"></span>`;
  html += `<span style="background-color: #330099"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #FFCCFF"></span>`;
  html += `<span style="background-color: #CC66CC"></span>`;
  html += `<span style="background-color: #993399"></span>`;
  html += `<span style="background-color: #330033"></span>`;
  html += `</div>`;
  html += `<div class="row">`;
  html += `<span style="background-color: #FFFFFF" class="custom">`;
  html += `<i class="fas fa-highlighter"></i>`;
  html += `</span>`;
  html += `</div>`;
  html += `</div>`;
  html += `<div class="before-screen">`;
  html += `<div class="screen">`;
  for (let y=0;y<5;y++) {
    for (let x=0;x<5;x++) {
      html += `<span data-x="${x}" data-y="${y}" style="background-color: #000000"></span>`;
    }
    html += `<br>`;
  }
  html += `</div>`;
  html += `</div>`;
  html += `</div>`;
  html += `<div class="button-group">`;
  html += `<button class="shiftleft"><i class="fas fa-angle-double-left"></i></button>`;
  html += `<button class="shiftup"><i class="fas fa-angle-double-up"></i></button>`;
  html += `<button class="fill"><i class="fas fa-square"></i></button>`;
  // html += `<button class="invert"><i class="fas fa-caret-square-up"></i></button>`;
  html += `<button class="clear"><i class="fas fa-times"></i></button>`;
  html += `<button class="shiftdown"><i class="fas fa-angle-double-down"></i></button>`;
  html += `<button class="shiftright"><i class="fas fa-angle-double-right"></i></button>`;
  html += `</div>`;
  html += `</div>`;
  html += `<div class="collection-container">`;
  html += `<ul>`
  for (let value of collection) {
    html += `<li><img src="${this.createImageDotMatrix_(this.text2byte(value))}" alt="${value}"></li>`;
  }
  html += `</ul>`
  html += `</div>`;
  html += `</div>`;
  
  // HTML to dom
  this.editor_ = new DOMParser().parseFromString(html, "text/html").body.childNodes[0];
  Blockly.DropDownDiv.getContentDiv().appendChild(this.editor_);

  // Add handle
  for (let elemt of this.editor_.querySelectorAll(".screen > span")) {
    function updateValueAll() {
      let value = [];
      for (let y=0;y<5;y++) {
        for (let x=0;x<5;x++) {
          let colorText = this.editor_.querySelector(`.screen span[data-x='${x}'][data-y='${y}']`).style.backgroundColor;
          let color = this.colorToRgbParser_(colorText);
          value.push(+color.r);
          value.push(+color.g);
          value.push(+color.b);
        }
      }
      this.setValue(this.byte2text(value));
    };

    elemt.addEventListener("click", function(e) {
      e.target.style.backgroundColor = this._color_select;

      updateValueAll.bind(this)();
    }.bind(this));

    elemt.addEventListener("mouseup", function(e) {
      if ((e.keyCode || e.which) === 3) {
        e.target.style.backgroundColor = "#000000";

        updateValueAll.bind(this)();
      }
    }.bind(this));
  }
  
  this.editor_.querySelector("button.fill").addEventListener("click", function() {
    let fillValue = "";
    let color = this.colorToRgbParser_(this._color_select);
    for (let i=0;i<25;i++) {
      fillValue += `\\x${(+color.r) < 0x10 ? "0" : ""}${(+color.r).toString(16)}\\x${(+color.g) < 0x10 ? "0" : ""}${(+color.g).toString(16)}\\x${(+color.b) < 0x10 ? "0" : ""}${(+color.b).toString(16)}`;
    }
    this.setValue(fillValue);
  }.bind(this));

  /*this.editor_.querySelector("button.invert").addEventListener("click", function() {
    let value = this.text2byte(this.displayValue_);
    value = value.map(value => (~value) & 0xFF);
    this.setValue(this.byte2text(value));
  }.bind(this));*/

  this.editor_.querySelector("button.clear").addEventListener("click", function() {
    let fillValue = "";
    for (let i=0;i<25;i++) {
      fillValue += `\\x00\\x00\\x00`;
    }
    this.setValue(fillValue);
  }.bind(this));

  this.editor_.querySelector("button.shiftleft").addEventListener("click", function() {
    let value = this.text2byte(this.displayValue_);
    for (let y=0;y<5;y++) {
      for (let x=0;x<4;x++) {
        for (let i=0;i<3;i++) {
          value[(x + (y * 5)) * 3 + i] = value[((x + 1) + (y * 5)) * 3 + i];
        }
      }
    }
    for (let y=0;y<5;y++) {
      const x = 4;
      for (let i=0;i<3;i++) {
        value[(x + (y * 5)) * 3 + i] = 0;
      }
    }
    this.setValue(this.byte2text(value));
  }.bind(this));

  this.editor_.querySelector("button.shiftup").addEventListener("click", function() {
    let value = this.text2byte(this.displayValue_);
    for (let i=0;i<(5 * 3);i++) {
      value.shift();
      value.push(0);
    }
    this.setValue(this.byte2text(value));
  }.bind(this));

  this.editor_.querySelector("button.shiftdown").addEventListener("click", function() {
    let value = this.text2byte(this.displayValue_);
    for (let i=0;i<(5 * 3);i++) {
      value.unshift(0);
      value.pop();
    }
    this.setValue(this.byte2text(value));
  }.bind(this));

  this.editor_.querySelector("button.shiftright").addEventListener("click", function() {
    let value = this.text2byte(this.displayValue_);
    for (let y=0;y<5;y++) {
      for (let x=4;x>=1;x--) {
        for (let i=0;i<3;i++) {
          value[(x + (y * 5)) * 3 + i] = value[((x - 1) + (y * 5)) * 3 + i];
        }
      }
    }
    for (let y=0;y<5;y++) {
      const x = 0;
      for (let i=0;i<3;i++) {
        value[(x + (y * 5)) * 3 + i] = 0;
      }
    }
    this.setValue(this.byte2text(value));
  }.bind(this));

  this.editor_.querySelector(".menu > .custom").addEventListener("click", function() {
    this.editor_.querySelector(".menu > .collection").classList.remove("active");
    this.editor_.querySelector(".menu > .custom").classList.add("active");
    this.editor_.querySelector(".custom-container").style.display = 'block';
    this.editor_.querySelector(".collection-container").style.display = 'none';
  }.bind(this));

  this.editor_.querySelector(".menu > .collection").addEventListener("click", function() {
    this.editor_.querySelector(".menu > .custom").classList.remove("active");
    this.editor_.querySelector(".menu > .collection").classList.add("active");
    this.editor_.querySelector(".custom-container").style.display = 'none';
    this.editor_.querySelector(".collection-container").style.display = 'block';
  }.bind(this));

  for (let elemt of this.editor_.querySelectorAll(".collection-container img")) {
    elemt.addEventListener("click", function(e) {
      this.setValue(e.target.alt);
    }.bind(this));
  }

  if (!this._color_select) {
    this._color_select = this.editor_.querySelector(".color-palette span.active").style.backgroundColor;
  } else {
    this.editor_.querySelector(".color-palette span.active").classList.remove("active");
    this.editor_.querySelector(".color-palette span.custom").classList.add("active");
    $(".color-palette span.custom").css('backgroundColor', this._color_select);
    $(".color-palette span.custom").ColorPickerSetColor(this.colorToRgbParser_(this._color_select));
  }

  for (let elemt of this.editor_.querySelectorAll(".color-palette span")) {
    if (elemt.classList.contains("custom")) {
      continue;
    }

    elemt.addEventListener("click", function(e) {
      this.editor_.querySelector(".color-palette span.active")?.classList.remove("active");
      e.target.classList.add("active");
      this._color_select = e.target.style.backgroundColor;
    }.bind(this));
  }

  $(".color-palette span.custom").ColorPicker({
    color: "#FFFFFF",
    onShow: function (colpkr) {
      $(colpkr).show();
      this.editor_.querySelector(".color-palette span.active")?.classList.remove("active");
      this.editor_.querySelector(".color-palette span.custom").classList.add("active");
      return true;
    }.bind(this),
    onChange: function (hsb, hex, rgb) {
      $(".color-palette span.custom").css('backgroundColor', '#' + hex);
      this._color_select = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
    }.bind(this),
    onSubmit: function(hsb, hex, rgb, el) {
      this._color_select = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
      $(el).ColorPickerHide();
    }.bind(this),
  });

  this.editor_.querySelector(".menu > .custom").click();

  this.renderEditor_(true);

  // These allow us to have the editor match the block's colour.
  var fillColour = this.sourceBlock_.getColour();
  Blockly.DropDownDiv.setColour(fillColour, this.sourceBlock_.style.colourTertiary);

  // Always pass the dropdown div a dispose function so that you can clean
  // up event listeners when the editor closes.
  Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
};

// Cleans up any event listeners that were attached to the now hidden editor.
CustomFields.FieldDotMatrixRGB.prototype.dropdownDispose_ = function() {
  $(".color-palette span.custom").ColorPickerHide();
  delete this.editor_;
};

// Updates the field's colour based on the colour of the block. Called by
// block.applyColour.
CustomFields.FieldDotMatrixRGB.prototype.applyColour = function() {
  if (!this.sourceBlock_) {
    return;
  }
};

// Saves the field's value to an XML node. Allows for custom serialization.
CustomFields.FieldDotMatrixRGB.prototype.toXml = function(fieldElement) {
  // The default implementation of this function creates a node that looks
  // like this: (where value is returned by getValue())
  // <field name="FIELDNAME">value</field>
  // But this doesn't work for our field because it stores an /object/.

  // The textContent usually contains whatever is closest to the field's
  // 'value'. The textContent doesn't need to contain anything, but saving
  // something to it does aid in readability.
  fieldElement.textContent = JSON.stringify(this.value_);

  // Always return the element!
  return fieldElement;
};

// Sets the field's value based on an XML node. Allows for custom
// de-serialization.
CustomFields.FieldDotMatrixRGB.prototype.fromXml = function(fieldElement) {
  // Because we had to do custom serialization for this field, we also need
  // to do custom de-serialization.

  var value = JSON.parse(fieldElement.textContent);
  // The end goal is to call this.setValue()
  this.setValue(value);
};

// Blockly needs to know the JSON name of this field. Usually this is
// registered at the bottom of the field class.
Blockly.fieldRegistry.register('field_dotmatrix_rgb', CustomFields.FieldDotMatrixRGB);

// Called by initView to create all of the SVGs. This is just used to keep
// the code more organized.
CustomFields.FieldDotMatrixRGB.prototype.createView_ = function() {
  this.movableGroup_ = Blockly.utils.dom.createSvgElement('g', {
    'transform': 'translate(5, 5)'
  }, this.fieldGroup_);
   
  this.preview_ = Blockly.utils.dom.createSvgElement('image', {
     'width': '60',
     'height': '60'
  }, this.movableGroup_);

  this.preview_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',  '');
};

CustomFields.FieldDotMatrixRGB.prototype.createImageDotMatrix_ = function(value) {
  let canvas = document.createElement("canvas")
  canvas.width = 110;
  canvas.height = 110;
  let ctx = canvas.getContext('2d');

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y=0;y<5;y++) {
    for (let x=0;x<5;x++) {
      //ctx.beginPath();
      //ctx.arc((x * (15 + 4)) + 7.5 + 4, (y * (15 + 4)) + 7.5 + 4, 7.5, 0, 2 * Math.PI, false);
      if (value.length === 5) {
        ctx.fillStyle = (value[y] & (0x10 >> x)) !== 0 ? "#FF0000" : "#000000";
      } else {
        ctx.fillStyle = `rgb(${value[(x + (y * 5)) * 3 + 0]}, ${value[(x + (y * 5)) * 3 + 1]}, ${value[(x + (y * 5)) * 3 + 2]})`;
      }
      //ctx.fill();
      ctx.fillRect((x * (10 + 10)) + 10, (y * (10 + 10)) + 10, 10, 10);
    }
  }
  return canvas.toDataURL();
}
