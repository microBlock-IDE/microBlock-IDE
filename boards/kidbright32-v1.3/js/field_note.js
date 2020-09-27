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
goog.provide('CustomFields.FieldNote');

// You must require the abstract field class to inherit from.
goog.require('Blockly.FieldTextInput');
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
CustomFields.FieldNote = function(opt_value) {

  // The turtle field contains an object as its value, so we need to compile
  // the parameters into an object.
  var value = opt_value || "";

  // A field constructor should always call its parent constructor, because
  // that helps keep the code organized and DRY.
  CustomFields.FieldNote.superClass_.constructor.call(this, value);

  /**
   * The size of the area rendered by the field.
   * @type {Blockly.utils.Size}
   * @protected
   * @override
   */
};
Blockly.utils.object.inherits(CustomFields.FieldNote, Blockly.FieldTextInput);

// This allows the field to be constructed using a JSON block definition.
CustomFields.FieldNote.fromJson = function(options) {
  // In this case we simply pass the JSON options along to the constructor,
  // but you can also use this to get message references, and other such things.
  return new CustomFields.FieldNote(options['value']);
};

let note_collection = [
  {
    name: "Scale",
    notes: "C6 B5 A5 G5 F5 E5 D5 C5"
  },
  {
    name: "Reverse",
    notes: "C5 D5 E5 F5 G5 A5 B5 C6"
  },
  {
    name: "Jingle Bells",
    notes: "E5 E5 E5 SIL E5 E5 E5 SIL E5 G5 C5 D5 E5 SIL F5 F5 SIL F5 F5 SIL F5 E5 E5 E5 E5 SIL E5 D5 D5 E5 D5 G5"
  },
  {
    name: "Marry had a little lamb",
    notes: "E5 D5 C5 D5 E5 E5 E5 SIL D5 D5 D5 SIL E5 G5 G5 SIL E5 D5 C5 D5 E5 E5 E5 SIL C5 D5 D5 E5 D5 C5"
  },
  {
    name: "Twinkle, Twinkle Little Star",
    notes: "C5 C5 G5 G5 A5 A5 G5 SIL F5 F5 E5 E5 D5 D5 C5 SIL G5 G5 F5 F5 E5 E5 D5 SIL G5 G5 F5 F5 E5 E5 D5 SIL C5 C5 G5 G5 A5 A5 G5 SIL F5 F5 E5 E5 D5 D5 C5"
  },
  {
    name: "Happy Birthday",
    notes: "C5 C5 D5 C5 F5 E5 SIL C5 C5 D5 C5 G5 F5 SIL C5 C6 C5 C5 A5 SIL F5 E5 D5 SIL A5 A5 A5 F5 G5 F5"
  },
  {
    name: "Itsy-Bitsy Spider",
    notes: "G5 C5 C5 D5 E5 E5 SIL E5 D5 C5 D5 E5 D5 SIL E5 E5 F5 G5 SIL G5 F5 E5 F5 G5 E5 SIL C5 C5 D5 E5 SIL E5 D5 C5 D5 E5 C5 SIL G5 G5 C5 C5 C5 D5 E5 E5 SIL E5 D5 C5 D5 E5 C5"
  },
  {
    name: "I Love You (Barney Song)",
    notes: "G5 E5 G5 G5 E5 G5 SIL A5 G5 F5 E5 D5 E5 F5 SIL E5 F5 G5 C5 C5 C5 C5 C5 D5 E5 F5 G5 SIL G5 E5 G5 G5 E5 G5 SIL A5 G5 F5 E5 D5 E5 F5 SIL E5 F5 G5 C5 C5 C5 C5 C5 D5 E5 F5 G5 SIL G5 D5 D5 F5 E5 D5 C5"
  },
  {
    name: "C - D - E Song",
    notes: "C5 D5 E5 SIL C5 D5 E5 SIL C5 D5 E5 D5 SIL C5 E5 C5"
  }
];

// Called when the field is clicked. It is usually used to show an editor,
// but it can also be used for other things e.g. the checkbox field uses
// this function to check/uncheck itself.
CustomFields.FieldNote.prototype.showEditor_ = function() {
  this._radioNextIndex = 0;

  let addNoteColumn = function(n) {
    if (!n) n = 1;

    let updateBlockValue = function() {
      setTimeout(function() {
        let notes = "";
        for (let group of this.editor_.querySelectorAll(".editor .note-select")) {
          let inp = group.querySelector("input[type='radio']:checked");
          notes += inp ? inp.value : "SIL";
          notes += " ";
        }
        notes = notes.trim();
        this.setValue(notes);
        this.sourceBlock_.setFieldValue("", "label");
        this.editor_.querySelector(".collection-container .item.active").classList.remove("active");
      }.bind(this), 200);
    }.bind(this);

    let notesArr = null;
    let updateBlockValueFlag = true;
    if (n === -1) { // Add from old data
      let notes = this.getValue();
      notesArr = notes.split(" ");
      notesArr = notesArr.filter(note => Object.keys(note_map).indexOf(note) >= 0);
      n = notesArr.length;
      updateBlockValueFlag = false;
    }

    for (let i=0;i<n;i++) {
      let html = "";
      html += `<div class="note-select">`;
      html += `<ul>`;
      html += `<li><input type="radio" name="note-${this._radioNextIndex}" value="C6"${notesArr ? notesArr[i] === "C6" ? "checked" : "" : ""}></li>`;
      html += `<li><input type="radio" name="note-${this._radioNextIndex}" value="B5"${notesArr ? notesArr[i] === "B5" ? "checked" : "" : ""}></li>`;
      html += `<li><input type="radio" name="note-${this._radioNextIndex}" value="A5"${notesArr ? notesArr[i] === "A5" ? "checked" : "" : ""}></li>`;
      html += `<li><input type="radio" name="note-${this._radioNextIndex}" value="G5"${notesArr ? notesArr[i] === "G5" ? "checked" : "" : ""}></li>`;
      html += `<li><input type="radio" name="note-${this._radioNextIndex}" value="F5"${notesArr ? notesArr[i] === "F5" ? "checked" : "" : ""}></li>`;
      html += `<li><input type="radio" name="note-${this._radioNextIndex}" value="E5"${notesArr ? notesArr[i] === "E5" ? "checked" : "" : ""}></li>`;
      html += `<li><input type="radio" name="note-${this._radioNextIndex}" value="D5"${notesArr ? notesArr[i] === "D5" ? "checked" : "" : ""}></li>`;
      html += `<li><input type="radio" name="note-${this._radioNextIndex}" value="C5"${notesArr ? notesArr[i] === "C5" ? "checked" : "" : ""}></li>`;
      html += `<li><i class="fas fa-times delete-note"></i></li>`;
      html += `</ul>`;
      html += `</div>`;
      this.editor_.querySelector("div.notes").insertAdjacentHTML("beforeend", html);
      this._radioNextIndex++;
    }
    this.editor_.querySelector(".editor .notes").scrollTo(this.editor_.querySelector(".editor .notes").scrollWidth, 0);
    for (let elet of this.editor_.querySelectorAll(".delete-note")) {
      elet.addEventListener("click", function() {
        this.parentNode.parentNode.parentNode.remove();
        updateBlockValue();
      });
    }

    for (let elet of this.editor_.querySelectorAll("input[type='radio']")) {
      elet.onmousedown = function() {
        if (this.checked) {
          $(this).one("click", function () {
            this.checked = false;
            updateBlockValue();
          });
        } else {
          if (playNotes) {
            playNotes(this.value, 1 / 2);
          }
          updateBlockValue();
        }
      };
    }

    if (updateBlockValueFlag) {
      updateBlockValue();
    }
  }.bind(this);

  let goToCollection = false;

  var html = "";
  html += `<div class="FieldNoteDropdown">`;
  html += `<div class="menu">`;
  html += `<div class="custom active">Custom</div>`;
  html += `<div class="collection">Collection</div>`;
  html += `</div>`;
  html += `<div class="custom-container">`;
  html += `<div class="editor">`;
  html += `<div class="label">`;
  html += `<ul>`;
  html += `<li>C6</li>`;
  html += `<li>B5</li>`;
  html += `<li>A5</li>`;
  html += `<li>G5</li>`;
  html += `<li>F5</li>`;
  html += `<li>E5</li>`;
  html += `<li>D5</li>`;
  html += `<li>C5</li>`;
  html += `<li></li>`;
  html += `</ul>`;
  html += `</div>`;
  html += `<div class="notes">`;
  html += `</div>`;
  html += `<div class="button">`;
  html += `<ul>`;
  html += `<li><button class="add-note"><i class="fas fa-plus-circle"></i></button></li>`;
  html += `<li></li>`;
  html += `</ul>`;
  html += `</div>`;
  html += `</div>`;
  html += `<div class="button-group">`;
  html += `<button class="play"><i class="fas fa-play-circle"></i></button>`;
  html += `<button class="stop" style="display: none"><i class="fas fa-stop-circle"></i></button>`;
  html += `<button class="clear"><i class="fas fa-times"></i></button>`;
  html += `</div>`;
  html += `</div>`;
  html += `<div class="collection-container">`;
  html += `<ul>`
  for (let item of note_collection) {
    html += `<li>`;
    html += `<div class="item${item.notes === this.getValue() ? " active" : ""}" data-notes="${item.notes}">`;
    html += `<div class="name">${item.name}</div>`;
    html += `<div class="play-btn"><i class="fas fa-play"></i></div>`;
    html += `<div class="stop-btn" style="display: none"><i class="fas fa-stop"></i></div>`;
    html += `</div>`;
    html += `</li>`;
    if (item.notes === this.getValue()) {
      this.sourceBlock_.setFieldValue(item.name, "label");
      goToCollection = true;
      // this.editor_.querySelector(".collection-container").scrollTop = elemt.offsetTop - 50;
    }
  }
  html += `</ul>`
  html += `</div>`;
  html += `</div>`;
  
  // HTML to dom
  this.editor_ = new DOMParser().parseFromString(html, "text/html").body.childNodes[0];
  Blockly.DropDownDiv.getContentDiv().appendChild(this.editor_);

  // Add handle
  let thisObj = this;

  addNoteColumn(-1);

  this.editor_.querySelector("button.add-note").addEventListener("click", function() {
    addNoteColumn();
  });

  this.editor_.querySelector("button.play").addEventListener("click", function() {
    thisObj.editor_.querySelector("button.play").style.display = "none";
    thisObj.editor_.querySelector("button.stop").style.display = "block";
    if (playNotes) playNotes(thisObj.getValue(), 1 / 2, (index) => {
      for (let [i, elemt] of thisObj.editor_.querySelectorAll(".editor .note-select").entries()) {
        if (i === index) {
          elemt.classList.add("active");
          elemt.scrollIntoView();
        } else {
          elemt.classList.remove("active");
        }
      }
    }, () => {
      thisObj.editor_.querySelector("button.stop").click();
    });
  });

  this.editor_.querySelector("button.stop").addEventListener("click", function() {
    thisObj.editor_.querySelector("button.play").style.display = "block";
    thisObj.editor_.querySelector("button.stop").style.display = "none";
    for (let [i, elemt] of thisObj.editor_.querySelectorAll(".editor .note-select").entries()) {
      elemt.classList.remove("active");
    }
    if (stopNote) stopNote();
  });

  this.editor_.querySelector("button.clear").addEventListener("click", function() {
    for (let elet of thisObj.editor_.querySelectorAll(".delete-note")) {
      elet.click();
    }
  });

  this.editor_.querySelector(".menu > .custom").addEventListener("click", function() {
    thisObj.editor_.querySelector(".menu > .collection").classList.remove("active");
    thisObj.editor_.querySelector(".menu > .custom").classList.add("active");
    thisObj.editor_.querySelector(".custom-container").style.display = 'flex';
    thisObj.editor_.querySelector(".collection-container").style.display = 'none';
  });

  this.editor_.querySelector(".menu > .collection").addEventListener("click", function() {
    thisObj.editor_.querySelector(".menu > .custom").classList.remove("active");
    thisObj.editor_.querySelector(".menu > .collection").classList.add("active");
    thisObj.editor_.querySelector(".custom-container").style.display = 'none';
    thisObj.editor_.querySelector(".collection-container").style.display = 'flex';
  });

  if (!goToCollection) {
    this.editor_.querySelector(".menu > .custom").click();
  } else {
    let activeItem = this.editor_.querySelector(".collection-container .item.active");
    if (activeItem) {
      let div = activeItem.parentNode;
      setTimeout(function() {
        this.editor_.querySelector(".collection-container").scrollTop = div.offsetTop - 50
      }.bind(this), 10);
    }
    this.editor_.querySelector(".menu > .collection").click();
  }

  for (let elet of this.editor_.querySelectorAll(".collection-container .item")) {
    elet.addEventListener("click", function() {
      for (let elemt of thisObj.editor_.querySelectorAll(".collection-container .item.active")) {
        elemt.classList.remove("active");
      }
      this.classList.add("active");

      let name = this.querySelector(".name").innerText;
      let notes = this.getAttribute("data-notes");
      playNotes(notes, 1 / 2);

      thisObj.setValue(notes);
      thisObj.sourceBlock_.setFieldValue(name, "label");

      thisObj.editor_.querySelector("div.notes").innerHTML = "";
      addNoteColumn(-1);
    });
  }

  // These allow us to have the editor match the block's colour.
  var fillColour = this.sourceBlock_.getColour();
  Blockly.DropDownDiv.setColour(fillColour, this.sourceBlock_.style.colourTertiary);

  // Always pass the dropdown div a dispose function so that you can clean
  // up event listeners when the editor closes.
  Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
};

// Cleans up any event listeners that were attached to the now hidden editor.
CustomFields.FieldNote.prototype.dropdownDispose_ = function() {
  delete this.editor_;
  stopNote();
};

// Blockly needs to know the JSON name of this field. Usually this is
// registered at the bottom of the field class.
Blockly.fieldRegistry.register('field_note', CustomFields.FieldNote);
