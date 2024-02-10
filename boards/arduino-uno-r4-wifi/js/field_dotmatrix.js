'use strict';

const collection = [
  "\\x31\\x84\\xa4\\x44\\x44\\x04\\x20\\x81\\x10\\x0a\\x00\\x40",
  "\\x3f\\xc2\\x04\\x2f\\x42\\x94\\x29\\x42\\xf4\\x20\\x43\\xfc",
];

class FieldDotMatrixUnoR4 extends Blockly.Field {
  constructor(opt_value, opt_validator) {
    super(opt_value || "\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00", opt_validator);

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
      // Not initialized yet.
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

  getText() {
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
    const value = this.text2byte(this.displayValue_);

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
    
    let inx = 0;
    let bit = 7;
    for (let y=0;y<8;y++) {
      for (let x=0;x<12;x++) {
        this.editor_.querySelector(`input[data-n='${x},${y}']`).checked = (value[inx] & (0x01 << bit)) !== 0;
        bit--;
        if (bit < 0) {
          bit = 7;
          inx++;
        }
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

  showEditor_() {
    var html = "";
    html += `<div class="FieldDotMatrixDropdown">`;
    html += `<div class="menu">`;
    html += `<div class="custom active">Custom</div>`;
    html += `<div class="collection">Collection</div>`;
    html += `</div>`;
    html += `<div class="custom-container">`;
    html += `<div class="screen">`;
    for (let y=0;y<8;y++) {
      for (let x=0;x<12;x++) {
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
      let value = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
      let inx = 0;
      let bit = 7;
      for (let y=0;y<8;y++) {
        for (let x=0;x<12;x++) {
          if (thisObj.editor_.querySelector(`input[data-n='${x},${y}']`).checked) {
            value[inx] |= 0x01 << bit;
          } else {
            value[inx] &= ~(0x01 << bit);
          }
          bit--;
          if (bit < 0) {
            bit = 7;
            inx++;
          }
        }
      }
      thisObj.setValue(thisObj.byte2text(value));
    };

    for (let y=0;y<8;y++) {
      for (let x=0;x<12;x++) {
        this.editor_.querySelector(`input[data-n='${x},${y}']`).addEventListener("click", chackboxHandle);
      }
    }
    
    this.editor_.querySelector("button.fill").addEventListener("click", function() {
      thisObj.setValue("\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF\\xFF");
    });

    this.editor_.querySelector("button.invert").addEventListener("click", function() {
      let value = thisObj.text2byte(thisObj.displayValue_);
      value = value.map(value => (~value) & 0xFF);
      thisObj.setValue(thisObj.byte2text(value));
    });

    this.editor_.querySelector("button.clear").addEventListener("click", function() {
      thisObj.setValue("\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00");
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

    var fillColour = this.sourceBlock_.getColour();
    Blockly.DropDownDiv.setColour(fillColour, this.sourceBlock_.style.colourTertiary);
    Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
  }

  dropdownDispose_() {
    delete this.editor_;
  };

  applyColour() {
    if (!this.sourceBlock_) {
      return;
    }
  }

  toXml(fieldElement) {
    fieldElement.textContent = JSON.stringify(this.value_);
    return fieldElement;
  }

  fromXml(fieldElement) {
    var value = JSON.parse(fieldElement.textContent);
    this.setValue(value);
  }

  createView_() {
    this.movableGroup_ = Blockly.utils.dom.createSvgElement('g', {
      'transform': 'translate(5, 5)'
    }, this.fieldGroup_);
    
    this.preview_ = Blockly.utils.dom.createSvgElement('image', {
      'width': '100',
      'height': '50'
    }, this.movableGroup_);

    this.preview_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',  '');
  }

  createImageDotMatrix_(value) {
    let canvas = document.createElement("canvas")
    canvas.width = 232;
    canvas.height = 156;
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 308, 156);

    let inx = 0;
    let bit = 7;
    for (let y=0;y<8;y++) {
      for (let x=0;x<12;x++) {
        ctx.beginPath();
        ctx.arc((x * (15 + 4)) + 7.5 + 4, (y * (15 + 4)) + 7.5 + 4, 7.5, 0, 2 * Math.PI, false);
        ctx.fillStyle = (value[inx] & (0x01 << bit)) !== 0 ? "#FF0000" : "#FFFFFF";
        ctx.fill();
        bit--;
        if (bit < 0) {
          bit = 7;
          inx++;
        }
      }
    }
    return canvas.toDataURL();
  }
}

FieldDotMatrixUnoR4.fromJson = function(options) {
  return new this(options['value']);
};

Blockly.fieldRegistry.register('field_dotmatrix_uno_r4', FieldDotMatrixUnoR4);

