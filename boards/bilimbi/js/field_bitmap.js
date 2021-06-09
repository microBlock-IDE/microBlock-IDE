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
goog.provide('CustomFields.FieldBitmap');

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
CustomFields.FieldBitmap = function(opt_value, opt_validator) {

  // The turtle field contains an object as its value, so we need to compile
  // the parameters into an object.
  var value = opt_value || "\\x40\\x2e\\x07\\xff\\xff\\xff\\xff\\xff\\xff\\xe0\\x1f\\xff\\xff\\xff\\xff\\xff\\xff\\xf8\\x3f\\xff\\xff\\xff\\xff\\xff\\xff\\xfc\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfe\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfe\\xf8\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x1c\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x7f\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\xff\\xc0\\x00\\x00\\x00\\x1f\\xf8\\x01\\xff\\xc0\\x00\\x38\\x00\\x1f\\xf8\\x03\\xff\\xe0\\x00\\x7c\\x00\\x1f\\xf8\\x03\\xff\\xe0\\x00\\xfe\\x00\\x1f\\xf8\\x03\\xff\\xe0\\x01\\xff\\x00\\x1f\\xf8\\x03\\xff\\xe0\\x03\\xff\\x80\\x1f\\xf8\\x03\\xff\\xe0\\x07\\xff\\xc0\\x1f\\xf8\\x03\\xff\\xe0\\x0f\\xff\\xe0\\x1f\\xf8\\x01\\xff\\xc0\\x1f\\xff\\xf0\\x1f\\xf8\\x01\\xff\\xc0\\x3f\\xff\\xf8\\x1f\\xf8\\x00\\xff\\x80\\x7f\\xff\\xfc\\x1f\\xf8\\x00\\x3e\\x00\\xff\\xff\\xfe\\x1f\\xf8\\x0e\\x00\\x01\\xff\\xff\\xff\\x1f\\xf8\\x1f\\x00\\x03\\xff\\xff\\xff\\x9f\\xf8\\x3f\\x80\\x07\\xff\\xff\\xff\\xdf\\xf8\\x7f\\xc0\\x0f\\xff\\xff\\xff\\xff\\xf8\\xff\\xe0\\x1f\\xff\\xff\\xff\\xff\\xf9\\xff\\xf0\\x3f\\xff\\xff\\xff\\xff\\xfb\\xff\\xf8\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfc\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfe\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfe\\x3f\\xff\\xff\\xff\\xff\\xff\\xff\\xfc\\x1f\\xff\\xff\\xff\\xff\\xff\\xff\\xf8\\x07\\xff\\xff\\xff\\xff\\xff\\xff\\xe0";

  // A field constructor should always call its parent constructor, because
  // that helps keep the code organized and DRY.
  CustomFields.FieldBitmap.superClass_.constructor.call(this, value, opt_validator);

  /**
   * The size of the area rendered by the field.
   * @type {Blockly.utils.Size}
   * @protected
   * @override
   */
  this.size_ = new Blockly.utils.Size(0, 0);
};
Blockly.utils.object.inherits(CustomFields.FieldBitmap, Blockly.Field);

// This allows the field to be constructed using a JSON block definition.
CustomFields.FieldBitmap.fromJson = function(options) {
  // In this case we simply pass the JSON options along to the constructor,
  // but you can also use this to get message references, and other such things.
  return new CustomFields.FieldBitmap(options['value']);
};

// Since this field is editable we must also define serializable as true
// (for backwards compatibility reasons serializable is false by default).
CustomFields.FieldBitmap.prototype.SERIALIZABLE = true;

// The cursor property defines what the mouse will look like when the user
// hovers over the field. By default the cursor will be whatever
// .blocklyDraggable's cursor is defined as (vis. grab). Most fields define
// this property as 'default'.
CustomFields.FieldBitmap.prototype.CURSOR = 'pointer';

// Used to create the DOM of our field.
CustomFields.FieldBitmap.prototype.initView = function() {
  // Because we want to have both a borderRect_ (background) and a
  // textElement_ (text) we can call the super-function. If we only wanted
  // one or the other, we could call their individual createX functions.
  CustomFields.FieldBitmap.superClass_.initView.call(this);

  // Note that the field group is created by the abstract field's init_
  // function. This means that *all elements* should be children of the
  // fieldGroup_.
  this.createView_();
};

// Updates how the field looks depending on if it is editable or not.
CustomFields.FieldBitmap.prototype.updateEditable = function() {
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
CustomFields.FieldBitmap.prototype.getText = function() {
  return "...";
};

// Makes sure new field values (given to setValue) are valid, meaning
// something this field can legally "hold". Class validators can either change
// the input value, or return null if the input value is invalid. Called by
// the setValue() function.
CustomFields.FieldBitmap.prototype.doClassValidation_ = function(newValue) {
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
CustomFields.FieldBitmap.prototype.doValueUpdate_ = function(newValue) {
  // The default function sets this field's this.value_ property to the
  // newValue, and its this.isDirty_ property to true. The isDirty_ property
  // tells the setValue function whether the field needs to be re-rendered.
  CustomFields.FieldBitmap.superClass_.doValueUpdate_.call(this, newValue);
  this.displayValue_ = newValue;
  // Since this field has custom UI for invalid values, we also want to make
  // sure it knows it is now valid.
  this.isValueInvalid_ = false;
};

// Notifies that the field that the new value was invalid. Called by
// setValue function. Can either be triggered by the class validator, or the
// local validator.
CustomFields.FieldBitmap.prototype.doValueInvalid_ = function(invalidValue) {
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
CustomFields.FieldBitmap.prototype.render_ = function() {
  var value = this.displayValue_;

  // Always do editor updates inside render. This makes sure the editor
  // always displays the correct value, even if a validator changes it.
  if (this.editor_) {
    // this.renderEditor_();
  }

  this.textElement_.style.display = 'none';

  // Always modify the textContent_ rather than the textElement_. This
  // allows fields to append DOM to the textElement (e.g. the angle field).
  this.textContent_.nodeValue = value;

  // Update image in block
  let dataBuffer = value.split("\\x").filter(a => a.length === 2).map(a => parseInt(a, 16));
  if (!dataBuffer) {
    return;
  }

  let canvas = document.createElement("canvas")
  canvas.width = dataBuffer[0];
  canvas.height = dataBuffer[1];
  if (canvas.width == 0 || canvas.height == 0) {
    return;
  }
  let ctx = canvas.getContext('2d');

  let idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let buffer = idata.data;
  let bitN = 0;
  let byteN = 0;
  for (let i = 0; i < buffer.length; i += 4) {
    let luma = 0;
    luma = (dataBuffer[2 + byteN] >> (7 - bitN) & 0x01) != 0 ? 255 : 0;
    if (bitN >= 7 || (((i / 4) + 1) % canvas.width) === 0) {
      byteN++;
      bitN = 0;
    } else {
      bitN++;
    }
    buffer[i] = luma;
    buffer[i + 1] = luma;
    buffer[i + 2] = luma;
    buffer[i + 3] = 255;
  }
  ctx.putImageData(idata, 0, 0);

  this.preview_.setAttribute("width", canvas.width);
  this.preview_.setAttribute("height", canvas.height);
  this.preview_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', canvas.toDataURL());

  if (this.isValueInvalid_) {
    this.borderRect_.style.fill = '#f99';
    this.borderRect_.style.fillOpacity = 1;
  } else {
    this.borderRect_.style.fill = '#fff';
    this.borderRect_.style.fillOpacity = 0.6;
  }

  this.updateSize_();
};

// Used to update the size of the field. This function's logic could be simply
// included inside render_ (it is not called anywhere else), but it is
// usually separated to keep code more organized.
CustomFields.FieldBitmap.prototype.updateSize_ = function() {
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

// Called when the field is clicked. It is usually used to show an editor,
// but it can also be used for other things e.g. the checkbox field uses
// this function to check/uncheck itself.
CustomFields.FieldBitmap.prototype.showEditor_ = function() {
  var html = `
  <div class="FieldBitmapDropdown">
    <div class="image-preview">
      <canvas class="preview" width="0" height="0"></canvas>
      <div class="size-label"></div>
    </div>
    <div class="control">
      <div>
        <button class="choose-image-btn"><i class="far fa-image"></i> Choose Image</button>
      </div>
      <div style="display: none">
        <div class="label">Size<div class="value size-value">100%</div></div>
        <div class="inp">
          <input type="range" class="size-inp" min="1" max="100" value="100">
        </div>
      </div>
      <div style="display: none">
        <div class="label">Threshold<div class="value threshold-value">127</div></div>
        <div class="inp">
          <input type="range" class="threshold-inp" min="0" max="255" value="127">
        </div>
      </div>
      <div style="display: none">
        <div class="label">Invert color</div>
        <div class="inp">
          <div class="check-button invert-color-input">
            <div data-value="Y">YES</div>
            <div data-value="N" class="active">NO</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  
  let mainDiv = Blockly.DropDownDiv.getContentDiv();
  mainDiv.innerHTML = html;
  this.editor_ = mainDiv.querySelector(".FieldBitmapDropdown");

  this.editor_.querySelector(".choose-image-btn").addEventListener("click", function(e) {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.addEventListener("change", function(e) {
      if (e.target.files.length > 0) {
        this.fileChoose_ = e.target.files[0].path;
        for (let e of this.editor_.querySelectorAll(".control > div")) {
          e.style.display = "block";
        }
        this.updateImagePreview_();
      }
    }.bind(this));
    input.click();
  }.bind(this));

  this.editor_.querySelector(".size-inp").addEventListener("input", function(e) {
    this.editor_.querySelector(".size-value").innerText = `${e.target.value}%`;

    this.updateImagePreview_();
  }.bind(this));

  this.editor_.querySelector(".threshold-inp").addEventListener("input", function(e) {
    this.editor_.querySelector(".threshold-value").innerText = e.target.value;

    this.updateImagePreview_();
  }.bind(this));

  for (let e of this.editor_.querySelectorAll(".check-button > div")) {
    e.addEventListener("click", function(e) {
      this.editor_.querySelector(".check-button > div.active").classList.remove("active");
      e.target.classList.add("active");
  
      this.updateImagePreview_();
    }.bind(this));
  }

  let canvas = this.editor_.querySelector("canvas.preview");
  canvas.width = this.preview_.getAttribute("width");
  canvas.height = this.preview_.getAttribute("height");
  let ctx = canvas.getContext("2d");
  ctx.drawImage(this.preview_, 0, 0, this.preview_.getAttribute("width"), this.preview_.getAttribute("height"));
  
  this.editor_.querySelector(".size-label").innerText = `${canvas.width}x${canvas.height}`;

  // These allow us to have the editor match the block's colour.
  var fillColour = this.sourceBlock_.getColour();
  Blockly.DropDownDiv.setColour(fillColour, this.sourceBlock_.style.colourTertiary);

  // Always pass the dropdown div a dispose function so that you can clean
  // up event listeners when the editor closes.
  Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
};

CustomFields.FieldBitmap.prototype.updateImagePreview_ = function() {
  let threshold = +this.editor_.querySelector(".threshold-inp").value;
  let size = +this.editor_.querySelector(".size-inp").value;
  let invert_color = this.editor_.querySelector(".invert-color-input > div.active").getAttribute("data-value") === "Y";

  let tmpImage = document.createElement("img");
  tmpImage.onload = function(e) {
    let imageWidth = tmpImage.width;
    let imageHeight = tmpImage.height;

    let ratio = 1;

    if (imageWidth > imageHeight) {
      if(imageWidth > 128) {
        ratio = 128 / imageWidth;
      }
      if((imageHeight * ratio) > 64) {
        ratio = 64 / imageHeight;
      }
    } else {
      if(imageHeight > 64) {
        ratio = 64 / imageHeight;
      }
      if ((imageWidth * ratio) > 128) {
        ratio = 128 / imageWidth;
      }
    }

    imageWidth = Math.round(imageWidth * ratio * (size / 100.0));
    imageHeight = Math.round(imageHeight * ratio * (size / 100.0));

    this.editor_.querySelector(".size-label").innerText = `${imageWidth}x${imageHeight}`;

    let canvas = this.editor_.querySelector("canvas.preview");

    canvas.width = imageWidth;
    canvas.height = imageHeight;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(tmpImage, 0, 0, imageWidth, imageHeight);

    let idata = ctx.getImageData(0, 0, imageWidth, imageHeight);
    let buffer = idata.data;
    for (let i=0;i<buffer.length;i+=4) {
      let luma = buffer[i] * 0.3 + buffer[i + 1] * 0.59 + buffer[i + 2] * 0.11;
      luma = luma < threshold ? 0 : 255;
      if (invert_color) {
        luma = 255 - luma;
      }
      buffer[i] = luma;
      buffer[i + 1] = luma;
      buffer[i + 2] = luma;
      buffer[i + 3] = 255;
    }
    ctx.putImageData(idata, 0, 0);

    this.updateValue_();
  }.bind(this);
  tmpImage.src = this.fileChoose_;
};

CustomFields.FieldBitmap.prototype.updateValue_ = function() {
  let canvas = this.editor_.querySelector("canvas.preview");
  let ctx = canvas.getContext("2d");
  let idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let buffer = idata.data;
  let dataBuffer = [];
  dataBuffer.push(canvas.width);
  dataBuffer.push(canvas.height);
  let bitN = 0;
  let dataByte = 0;
  for (let i = 0; i < buffer.length; i += 4) {
    dataByte |= (buffer[i] === 255 ? 1 : 0) << (7 - bitN);
    let pixelN = (i / 4) + 1;
    if (bitN >= 7 || ((pixelN % canvas.width) === 0)) {
      dataBuffer.push(dataByte);
      dataByte = 0;
      bitN = 0;
    } else {
      bitN++;
    }
  }

  let value = dataBuffer.map(a => `\\x${a < 0x10 ? '0' : ''}${a.toString(16)}`).join("");
  this.setValue(value);
}

// Cleans up any event listeners that were attached to the now hidden editor.
CustomFields.FieldBitmap.prototype.dropdownDispose_ = function() {
  delete this.editor_;
};

// Updates the field's colour based on the colour of the block. Called by
// block.applyColour.
CustomFields.FieldBitmap.prototype.applyColour = function() {
  if (!this.sourceBlock_) {
    return;
  }
};

// Saves the field's value to an XML node. Allows for custom serialization.
CustomFields.FieldBitmap.prototype.toXml = function(fieldElement) {
  // The default implementation of this function creates a node that looks
  // like this: (where value is returned by getValue())
  // <field name="FIELDNAME">value</field>
  // But this doesn't work for our field because it stores an /object/.

  // The textContent usually contains whatever is closest to the field's
  // 'value'. The textContent doesn't need to contain anything, but saving
  // something to it does aid in readability.
  fieldElement.textContent = this.value_;

  // Always return the element!
  return fieldElement;
};

// Sets the field's value based on an XML node. Allows for custom
// de-serialization.
CustomFields.FieldBitmap.prototype.fromXml = function(fieldElement) {
  // Because we had to do custom serialization for this field, we also need
  // to do custom de-serialization.

  var value = fieldElement.textContent;
  // The end goal is to call this.setValue()
  this.setValue(value);
};

// Blockly needs to know the JSON name of this field. Usually this is
// registered at the bottom of the field class.
Blockly.fieldRegistry.register('field_bitmap', CustomFields.FieldBitmap);

// Called by initView to create all of the SVGs. This is just used to keep
// the code more organized.
CustomFields.FieldBitmap.prototype.createView_ = function() {
  this.movableGroup_ = Blockly.utils.dom.createSvgElement('g', {
    'transform': 'translate(5, 5)'
  }, this.fieldGroup_);
   
  this.preview_ = Blockly.utils.dom.createSvgElement('image', {
     'width': '128',
     'height': '64'
  }, this.movableGroup_);

  this.preview_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',  '');
};
