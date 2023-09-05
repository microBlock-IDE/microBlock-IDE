'use strict';

const defaultValue = "\\x40\\x2e\\x07\\xff\\xff\\xff\\xff\\xff\\xff\\xe0\\x1f\\xff\\xff\\xff\\xff\\xff\\xff\\xf8\\x3f\\xff\\xff\\xff\\xff\\xff\\xff\\xfc\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfe\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfe\\xf8\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x1c\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\x7f\\x00\\x00\\x00\\x00\\x1f\\xf8\\x00\\xff\\xc0\\x00\\x00\\x00\\x1f\\xf8\\x01\\xff\\xc0\\x00\\x38\\x00\\x1f\\xf8\\x03\\xff\\xe0\\x00\\x7c\\x00\\x1f\\xf8\\x03\\xff\\xe0\\x00\\xfe\\x00\\x1f\\xf8\\x03\\xff\\xe0\\x01\\xff\\x00\\x1f\\xf8\\x03\\xff\\xe0\\x03\\xff\\x80\\x1f\\xf8\\x03\\xff\\xe0\\x07\\xff\\xc0\\x1f\\xf8\\x03\\xff\\xe0\\x0f\\xff\\xe0\\x1f\\xf8\\x01\\xff\\xc0\\x1f\\xff\\xf0\\x1f\\xf8\\x01\\xff\\xc0\\x3f\\xff\\xf8\\x1f\\xf8\\x00\\xff\\x80\\x7f\\xff\\xfc\\x1f\\xf8\\x00\\x3e\\x00\\xff\\xff\\xfe\\x1f\\xf8\\x0e\\x00\\x01\\xff\\xff\\xff\\x1f\\xf8\\x1f\\x00\\x03\\xff\\xff\\xff\\x9f\\xf8\\x3f\\x80\\x07\\xff\\xff\\xff\\xdf\\xf8\\x7f\\xc0\\x0f\\xff\\xff\\xff\\xff\\xf8\\xff\\xe0\\x1f\\xff\\xff\\xff\\xff\\xf9\\xff\\xf0\\x3f\\xff\\xff\\xff\\xff\\xfb\\xff\\xf8\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfc\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\xff\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfe\\x7f\\xff\\xff\\xff\\xff\\xff\\xff\\xfe\\x3f\\xff\\xff\\xff\\xff\\xff\\xff\\xfc\\x1f\\xff\\xff\\xff\\xff\\xff\\xff\\xf8\\x07\\xff\\xff\\xff\\xff\\xff\\xff\\xe0";

class FieldBitmap extends Blockly.Field {
  constructor(opt_value, opt_validator) {
    super(opt_value || defaultValue, opt_validator);

    this.size_ = new Blockly.utils.Size(0, 0);
    this.SERIALIZABLE = true;
    this.CURSOR = 'pointer';
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

  getText() {
    return "...";
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
    var value = this.displayValue_;

    if (this.editor_) {
      // this.renderEditor_();
    }

    this.textElement_.style.display = 'none';
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

    if (this.fileChoose_ && this.fileChoose_.length > 0) {
      for (let e of this.editor_.querySelectorAll(".control > div")) {
        e.style.display = "block";
      }
    }

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

    var fillColour = this.sourceBlock_.getColour();
    Blockly.DropDownDiv.setColour(fillColour, this.sourceBlock_.style.colourTertiary);
    Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
  }

  updateImagePreview_() {
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
    if (isElectron) {
      const contents = nodeFS.readFileSync(this.fileChoose_, { encoding: 'base64' });
      console.log(contents);
      tmpImage.src = "data:image/png;base64," + contents;
    } else {
      tmpImage.src = this.fileChoose_;
    }
  }

  updateValue_() {
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

  dropdownDispose_() {
    delete this.editor_;
  }

  applyColour() {
    if (!this.sourceBlock_) {
      return;
    }
  }

  toXml(fieldElement) {
    fieldElement.textContent = this.value_;
    fieldElement.setAttribute("file", this.fileChoose_ || "");
    return fieldElement;
  }

  fromXml(fieldElement) {
    this.fileChoose_ = fieldElement.getAttribute("file") || "";
    this.setValue(fieldElement.textContent);
  }

  createView_() {
    this.movableGroup_ = Blockly.utils.dom.createSvgElement('g', {
      'transform': 'translate(5, 5)'
    }, this.fieldGroup_);
    
    this.preview_ = Blockly.utils.dom.createSvgElement('image', {
      'width': '128',
      'height': '64'
    }, this.movableGroup_);

    this.preview_.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',  '');
  }
};

FieldBitmap.fromJson = function(options) {
  return new this(options['value']);
};

Blockly.fieldRegistry.register('field_bitmap', FieldBitmap);
