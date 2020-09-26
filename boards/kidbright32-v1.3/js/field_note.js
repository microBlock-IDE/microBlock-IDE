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
        notes.trim();
        // console.log(notes)
        this.setValue(notes);
        this.sourceBlock_.setFieldValue("", "label");
      }.bind(this), 200);
    }.bind(this);

    let notesArr = null;
    if (n === -1) { // Add from old data
      let notes = this.getValue();
      notesArr = notes.split(" ");
      notesArr = notesArr.filter(note => Object.keys(note_map).indexOf(note) >= 0);
      n = notesArr.length;
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

    updateBlockValue();
  }.bind(this);

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
  /*for (let value of collection) {
    html += `<li><img src="${this.createImageDotMatrix_(this.text2byte(value))}" alt="${value}"></li>`;
  }*/
  html += `</ul>`
  html += `</div>`;
  html += `</div>`;
  
  // HTML to dom
  this.editor_ = new DOMParser().parseFromString(html, "text/html").body.childNodes[0];
  Blockly.DropDownDiv.getContentDiv().appendChild(this.editor_);

  // Add handle
  let thisObj = this;
  // thisObj.sourceBlock_.setFieldValue(Math.random(), "label");

  addNoteColumn(-1);

  this.editor_.querySelector("button.add-note").addEventListener("click", function() {
    addNoteColumn();
  });

  this.editor_.querySelector("button.play").addEventListener("click", function() {
    thisObj.editor_.querySelector("button.play").style.display = "none";
    thisObj.editor_.querySelector("button.stop").style.display = "block";
    if (playNotes) playNotes(thisObj.getValue(), 1 / 2, (index) => {
      console.log("Playing", index);
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
    thisObj.editor_.querySelector(".custom-container").style.display = 'block';
    thisObj.editor_.querySelector(".collection-container").style.display = 'none';
  });

  this.editor_.querySelector(".menu > .collection").addEventListener("click", function() {
    thisObj.editor_.querySelector(".menu > .custom").classList.remove("active");
    thisObj.editor_.querySelector(".menu > .collection").classList.add("active");
    thisObj.editor_.querySelector(".custom-container").style.display = 'none';
    thisObj.editor_.querySelector(".collection-container").style.display = 'block';
  });

  this.editor_.querySelector(".menu > .custom").click();

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
};

// Blockly needs to know the JSON name of this field. Usually this is
// registered at the bottom of the field class.
Blockly.fieldRegistry.register('field_note', CustomFields.FieldNote);
