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
goog.provide('CustomFields.FieldDotMatrix');

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
CustomFields.FieldDotMatrix = function(opt_value, opt_validator) {

  // The turtle field contains an object as its value, so we need to compile
  // the parameters into an object.
  var value = opt_value || "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";

  // A field constructor should always call its parent constructor, because
  // that helps keep the code organized and DRY.
  CustomFields.FieldDotMatrix.superClass_.constructor.call(this, value, opt_validator);

  /**
   * The size of the area rendered by the field.
   * @type {Blockly.utils.Size}
   * @protected
   * @override
   */
  this.size_ = new Blockly.utils.Size(0, 0);
};
Blockly.utils.object.inherits(CustomFields.FieldDotMatrix, Blockly.Field);

// This allows the field to be constructed using a JSON block definition.
CustomFields.FieldDotMatrix.fromJson = function(options) {
  // In this case we simply pass the JSON options along to the constructor,
  // but you can also use this to get message references, and other such things.
  return new CustomFields.FieldDotMatrix(options['value']);
};

// Since this field is editable we must also define serializable as true
// (for backwards compatibility reasons serializable is false by default).
CustomFields.FieldDotMatrix.prototype.SERIALIZABLE = true;

// The cursor property defines what the mouse will look like when the user
// hovers over the field. By default the cursor will be whatever
// .blocklyDraggable's cursor is defined as (vis. grab). Most fields define
// this property as 'default'.
CustomFields.FieldDotMatrix.prototype.CURSOR = 'pointer';

CustomFields.FieldDotMatrix.prototype.text2byte = (text) => {
  let bytes = [ ];
  bytes = text.split("\\x");
  bytes = bytes.filter(byte => byte.length > 0);
  bytes = bytes.map(byte => parseInt(`0x${byte}`));
  return bytes;
};

CustomFields.FieldDotMatrix.prototype.byte2text = (bytes) => {
  bytes = bytes.map(byte => `\\x${byte < 0x10 ? '0' : ''}${byte.toString(16)}`);
  return bytes.join("");
};

// Used to create the DOM of our field.
CustomFields.FieldDotMatrix.prototype.initView = function() {
  // Because we want to have both a borderRect_ (background) and a
  // textElement_ (text) we can call the super-function. If we only wanted
  // one or the other, we could call their individual createX functions.
  CustomFields.FieldDotMatrix.superClass_.initView.call(this);

  // Note that the field group is created by the abstract field's init_
  // function. This means that *all elements* should be children of the
  // fieldGroup_.
  this.createView_();
};

// Updates how the field looks depending on if it is editable or not.
CustomFields.FieldDotMatrix.prototype.updateEditable = function() {
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
CustomFields.FieldDotMatrix.prototype.getText = function() {
  return "<CUSTOM>";
};

// Makes sure new field values (given to setValue) are valid, meaning
// something this field can legally "hold". Class validators can either change
// the input value, or return null if the input value is invalid. Called by
// the setValue() function.
CustomFields.FieldDotMatrix.prototype.doClassValidation_ = function(newValue) {
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
CustomFields.FieldDotMatrix.prototype.doValueUpdate_ = function(newValue) {
  // The default function sets this field's this.value_ property to the
  // newValue, and its this.isDirty_ property to true. The isDirty_ property
  // tells the setValue function whether the field needs to be re-rendered.
  CustomFields.FieldDotMatrix.superClass_.doValueUpdate_.call(this, newValue);
  this.displayValue_ = newValue;
  // Since this field has custom UI for invalid values, we also want to make
  // sure it knows it is now valid.
  this.isValueInvalid_ = false;
};

// Notifies that the field that the new value was invalid. Called by
// setValue function. Can either be triggered by the class validator, or the
// local validator.
CustomFields.FieldDotMatrix.prototype.doValueInvalid_ = function(invalidValue) {
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
CustomFields.FieldDotMatrix.prototype.render_ = function() {
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

CustomFields.FieldDotMatrix.prototype.renderEditor_ = function(firsttimes) {
  firsttimes = firsttimes || false;
  var value = this.text2byte(this.displayValue_);
  
  for (let y=0;y<8;y++) {
    for (let x=0;x<16;x++) {
      this.editor_.querySelector(`input[data-n='${x},${y}']`).checked = (value[x] & (0x80 >> y)) !== 0;
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
CustomFields.FieldDotMatrix.prototype.updateSize_ = function() {
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
  "\\x00\\x00\\x00\\x00\\x38\\x44\\x42\\x21\\x42\\x44\\x38\\x00\\x00\\x00\\x00\\x00",
  "\\x00\\x00\\x00\\x04\\x02\\x01\\x02\\x04\\x08\\x10\\x20\\x40\\x80\\x00\\x00\\x00",
  "\\x00\\x00\\x00\\x00\\x81\\x42\\x24\\x18\\x18\\x24\\x42\\x81\\x00\\x00\\x00\\x00",
  "\\x08\\x1c\\x2a\\x49\\x08\\x08\\x08\\x08\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00",
  "\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x08\\x08\\x08\\x08\\x49\\x2a\\x1c\\x08",
  "\\x00\\x00\\x00\\x00\\x10\\x20\\x40\\xff\\x40\\x20\\x10\\x00\\x00\\x00\\x00\\x00",
  "\\x00\\x00\\x00\\x00\\x08\\x04\\x02\\xff\\x02\\x04\\x08\\x00\\x00\\x00\\x00\\x00",
  "\\xf8\\xc0\\xa0\\x90\\x88\\x04\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00",
  "\\x1f\\x03\\x05\\x09\\x11\\x20\\x40\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00",
  "\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x40\\x20\\x11\\x09\\x05\\x03\\x1f",
  "\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x02\\x84\\x88\\x90\\xa0\\xc0\\xf8",
  "\\x00\\x00\\x00\\x06\\x01\\x71\\x71\\x01\\x01\\x71\\x71\\x01\\x06\\x00\\x00\\x00",
  "\\x00\\x00\\x00\\x00\\x00\\xff\\x81\\x81\\x81\\x81\\xff\\x00\\x00\\x00\\x00\\x00",
  "\\x04\\x04\\x1f\\x1f\\x1c\\x1c\\x1c\\x1f\\x7f\\x7c\\x7c\\x70\\x70\\x70\\x00\\x00",
  "\\x00\\x00\\x00\\xfe\\x41\\x21\\x29\\x21\\x21\\x29\\x21\\x41\\xfe\\x00\\x00\\x00",
  "\\x00\\x00\\x00\\x30\\x48\\x8e\\xa1\\x81\\x81\\xa1\\x8e\\x48\\x30\\x00\\x00\\x00",
  "\\x00\\xf8\\xff\\xff\\xf8\\xf8\\xff\\xff\\xf8\\xf8\\xdf\\xff\\xf8\\x18\\x18\\x00",
];

// Called when the field is clicked. It is usually used to show an editor,
// but it can also be used for other things e.g. the checkbox field uses
// this function to check/uncheck itself.
CustomFields.FieldDotMatrix.prototype.showEditor_ = function() {
  var html = "";
  html += `<div class="FieldDotMatrixDropdown">`;
  html += `<div class="menu">`;
  html += `<div class="custom active">Custom</div>`;
  html += `<div class="collection">Collection</div>`;
  html += `</div>`;
  html += `<div class="custom-container">`;
  html += `<div class="screen">`;
  for (let y=0;y<8;y++) {
    for (let x=0;x<16;x++) {
      html += `<input type="checkbox" data-n="${x},${y}">`;
    }
    html += `<br>`;
  }
  html += `</div>`;
  html += `<div class="button-group">`;
  html += `<button class="shiftleft"><i class="fas fa-angle-double-left"></i></button>`;
  html += `<button class="shiftup"><i class="fas fa-angle-double-up"></i></button>`;
  html += `<button class="fill"><i class="fas fa-square"></i></button>`;
  html += `<button class="invert"><i class="fas fa-caret-square-up"></i></button>`;
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
  let thisObj = this;
  let chackboxHandle = function() {
    let value = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
    for (let y=0;y<8;y++) {
      for (let x=0;x<16;x++) {
        if (thisObj.editor_.querySelector(`input[data-n='${x},${y}']`).checked) {
          value[x] |= (0x80 >> y);
        } else {
          value[x] &= ~(0x80 >> y);
        }
      }
    }
    thisObj.setValue(thisObj.byte2text(value));
  };

  for (let y=0;y<8;y++) {
    for (let x=0;x<16;x++) {
      this.editor_.querySelector(`input[data-n='${x},${y}']`).addEventListener("click", chackboxHandle);
    }
  }
  
  this.editor_.querySelector("button.fill").addEventListener("click", function() {
    thisObj.setValue("\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF");
  });

  this.editor_.querySelector("button.invert").addEventListener("click", function() {
    let value = thisObj.text2byte(thisObj.displayValue_);
    value = value.map(value => (~value) & 0xFF);
    thisObj.setValue(thisObj.byte2text(value));
  });

  this.editor_.querySelector("button.clear").addEventListener("click", function() {
    thisObj.setValue("\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00");
  });

  this.editor_.querySelector("button.shiftleft").addEventListener("click", function() {
    let value = thisObj.text2byte(thisObj.displayValue_);
    value.shift();
    value.push(0);
    thisObj.setValue(thisObj.byte2text(value));
  });

  this.editor_.querySelector("button.shiftup").addEventListener("click", function() {
    let value = thisObj.text2byte(thisObj.displayValue_);
    value = value.map(value => (value << 1) & 0xFF);
    thisObj.setValue(thisObj.byte2text(value));
  });

  this.editor_.querySelector("button.shiftdown").addEventListener("click", function() {
    let value = thisObj.text2byte(thisObj.displayValue_);
    value = value.map(value => (value >> 1) & 0xFF);
    thisObj.setValue(thisObj.byte2text(value));
  });

  this.editor_.querySelector("button.shiftright").addEventListener("click", function() {
    let value = thisObj.text2byte(thisObj.displayValue_);
    value.unshift(0);
    value.pop();
    thisObj.setValue(thisObj.byte2text(value));
  });

  this.editor_.querySelector(".menu > .custom").addEventListener("click", function() {
    thisObj.editor_.querySelector(".menu > .collection").classList.remove("active");
    thisObj.editor_.querySelector(".menu > .custom").classList.add("active");
    thisObj.editor_.querySelector(".custom-container").style.display = 'block';
    thisObj.editor_.querySelector(".collection-container").style.display = 'none';
  });

  this.editor_.querySelector(".menu > .collection").addEventListener("click", function() {
    thisObj.editor_.querySelector(".menu > .custom").classList.remove("active");
    thisObj.editor_.querySelector(".menu > .collection").classList.add("active");
    thisObj.editor_.querySelector(".custom-container").style.display = 'none';
    thisObj.editor_.querySelector(".collection-container").style.display = 'block';
  });

  for (let elemt of this.editor_.querySelectorAll(".collection-container img")) {
    elemt.addEventListener("click", function() {
      thisObj.setValue(this.alt);
    });
  }

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
CustomFields.FieldDotMatrix.prototype.dropdownDispose_ = function() {
  delete this.editor_;
};

// Updates the field's colour based on the colour of the block. Called by
// block.applyColour.
CustomFields.FieldDotMatrix.prototype.applyColour = function() {
  if (!this.sourceBlock_) {
    return;
  }
};

// Saves the field's value to an XML node. Allows for custom serialization.
CustomFields.FieldDotMatrix.prototype.toXml = function(fieldElement) {
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
CustomFields.FieldDotMatrix.prototype.fromXml = function(fieldElement) {
  // Because we had to do custom serialization for this field, we also need
  // to do custom de-serialization.

  var value = JSON.parse(fieldElement.textContent);
  // The end goal is to call this.setValue()
  this.setValue(value);
};

// Blockly needs to know the JSON name of this field. Usually this is
// registered at the bottom of the field class.
Blockly.fieldRegistry.register('field_dotmatrix', CustomFields.FieldDotMatrix);

// Called by initView to create all of the SVGs. This is just used to keep
// the code more organized.
CustomFields.FieldDotMatrix.prototype.createView_ = function() {
  this.movableGroup_ = Blockly.utils.dom.createSvgElement('g', {
    'transform': 'translate(5, 5)'
  }, this.fieldGroup_);
   
  this.preview_ = Blockly.utils.dom.createSvgElement('image', {
     'width': '100',
     'height': '50'
  }, this.movableGroup_);

  this.preview_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',  '');
};

CustomFields.FieldDotMatrix.prototype.createImageDotMatrix_ = function(value) {
  let canvas = document.createElement("canvas")
  canvas.width = 308;
  canvas.height = 156;
  let ctx = canvas.getContext('2d');

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 308, 156);

  for (let y=0;y<8;y++) {
    for (let x=0;x<16;x++) {
      ctx.beginPath();
      ctx.arc((x * (15 + 4)) + 7.5 + 4, (y * (15 + 4)) + 7.5 + 4, 7.5, 0, 2 * Math.PI, false);
      ctx.fillStyle = (value[x] & (0x80 >> y)) !== 0 ? "#FF0000" : "#FFFFFF";
      ctx.fill();
    }
  }
  return canvas.toDataURL();
}
