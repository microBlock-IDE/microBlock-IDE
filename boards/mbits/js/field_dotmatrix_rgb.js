'use strict';

const defaultValue = "\x00\x00\x00\x00\x00";
const collection = [
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

class FieldDotMatrixRGB extends Blockly.Field {
  constructor(opt_value, opt_validator) {
    super(opt_value || defaultValue, opt_validator);

    this.size_ = new Blockly.utils.Size(0, 0);
    this.SERIALIZABLE = true;
    this.CURSOR = 'pointer';
  }

  text2byte(text) {
    let bytes = [ ];
    bytes = text.split("\\x");
    bytes = bytes.filter(byte => byte.length > 0);
    bytes = bytes.map(byte => parseInt(`0x${byte}`));
    return bytes;
  }

  byte2text(bytes) {
    bytes = bytes.map(byte => `\\x${byte < 0x10 ? '0' : ''}${byte.toString(16)}`);
    return bytes.join("");
  }

  initView() {
    super.initView();

    this.createView_();
  }

  updateEditable() {
    if (!this.fieldGroup_) {
      return;
    }
    super.updateEditable();

    var group = this.getClickTarget_();
    if (!this.isCurrentlyEditable()) {
      group.style.cursor = 'not-allowed';
    } else {
      group.style.cursor = this.CURSOR;
    }
  }

  getText = function() {
    return "<CUSTOM>";
  }

  doClassValidation_(newValue) {
    this.cachedValidatedValue_ = newValue;

    return newValue;
  }

  doValueUpdate_(newValue) {
    super.doValueUpdate_(newValue);
    this.displayValue_ = newValue;
    this.isValueInvalid_ = false;
  }

  doValueInvalid_(invalidValue) {
    this.displayValue_ = invalidValue;
    this.isDirty_ = true;
    this.isValueInvalid_ = true;
  }

  render_() {
    var value = this.text2byte(this.displayValue_);

    if (this.editor_) {
      this.renderEditor_();
    }

    this.textElement_.style.display = 'none';
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
  }

  renderEditor_(firsttimes) {
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
  }

  updateSize_() {
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
  }

  colorToRgbParser_(color) {
    const match = color.match(/^rgba?\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d\.\d)\s*)?\)$/i);

    if (match) {
      // match[0] is regex complete match (e.g. "rgb(0,0,0)"), not a regex capturing group
      let parsedColor = {
        r: match[1],
        g: match[2],
        b: match[3]
      }
      if (match[4]) { // if alpha channel is present
        parsedColor.a = match[4];
      }
      return parsedColor;
    } else {
      throw new Error(`Color ${cssColor} could not be parsed.`);
    }
  }

  showEditor_() {
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
      }

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

    var fillColour = this.sourceBlock_.getColour();
    Blockly.DropDownDiv.setColour(fillColour, this.sourceBlock_.style.colourTertiary);
    Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
  }

  dropdownDispose_ = function() {
    $(".color-palette span.custom").ColorPickerHide();
    delete this.editor_;
  }

  applyColour = function() {
    if (!this.sourceBlock_) {
      return;
    }
  }

  toXml = function(fieldElement) {
    fieldElement.textContent = JSON.stringify(this.value_);
    return fieldElement;
  }

  fromXml = function(fieldElement) {
    var value = JSON.parse(fieldElement.textContent);
    this.setValue(value);
  }

  createView_ = function() {
    this.movableGroup_ = Blockly.utils.dom.createSvgElement('g', {
      'transform': 'translate(5, 5)'
    }, this.fieldGroup_);
    
    this.preview_ = Blockly.utils.dom.createSvgElement('image', {
      'width': '60',
      'height': '60'
    }, this.movableGroup_);

    this.preview_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',  '');
  }

  createImageDotMatrix_ = function(value) {
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
}

FieldDotMatrixRGB.fromJson = function(options) {
  return new this(options['value']);
};

Blockly.fieldRegistry.register('field_dotmatrix_rgb', FieldDotMatrixRGB);

