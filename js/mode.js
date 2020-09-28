let editor = null, editorReadonly = true;
let useMode = "block";
let onKeyUpTimer = null;

$("#mode-select-switch > li").click(async function() {
    let value = $(this).attr("data-value");
    if (value == 1) { // Block mode
        if (useMode === "code") {
            if (editor.getValue().length > 0) {
                if (!await NotifyConfirm("Code will convert to block (BETA). Are you confirm swith to block mode ?")) {
                    return;
                }
                updataWorkspaceAndCategoryFromvFS();
                codeFromMonacoToBlock();
            }
        }
        $("#blocks-editor").css("display", "flex");
        $("#code-editor").hide();
        Blockly.triggleResize();
        useMode = "block";
    } else if (value == 2) { // Code mode
        $("#blocks-editor").hide();
        $("#code-editor").css("display", "flex");

        let code = Blockly.Python.workspaceToCode(blocklyWorkspace);
        if (!editor){
            editor = monaco.editor.create($("#code-editor > article")[0], {
                language: 'python',
                readOnly: useMode === "code" ? false : true,
                automaticLayout: true
            }); 

            editor.onKeyUp(async (evant) => {
                // console.log(evant);
                
                let allowKey = [
                    8, // CapsLock
                    9, // ESC
                    6, // AltLeft
                    60, // F2
                    61, // F3
                    62, // F4
                    63, // F5
                    64, // F6
                    65, // F7
                    66, // F8
                    67, // F9
                    68, // F10
                    69, // F11
                    70, // F12
                    15, // ArrowLeft
                    16, // ArrowUp
                    17, // ArrowRight
                    18, // ArrowDown
                ]
                if (!evant.ctrlKey && !evant.metaKey && !evant.shiftKey && allowKey.indexOf(evant.keyCode) === -1 && useMode !== "code") {
                    evant.preventDefault();
                    if (await NotifyConfirm("If edit code, program in block will lost. Are you want to edit ?")) {
                        editor.updateOptions({ readOnly: false });
                        useMode = "code";
                    } else {
                        editor.updateOptions({ readOnly: true });
                        useMode = "block";
                    }
                }

                if (useMode === "code") {
                    if (onKeyUpTimer) clearTimeout(onKeyUpTimer);
                    onKeyUpTimer = setTimeout(() => {
                        saveCodeToLocal();
                    }, 1000);
                }
            });
        }

        editor.setValue(code);

        editor.layout();
        
    } else { // ????

    }
    $("#mode-select-switch > li").removeClass("active");
    $(this).addClass("active");
});

function ShowAutocompletion(obj) { 
    // Disable default autocompletion for javascript
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ noLib: true  });
  
    // Helper function to return the monaco completion item type of a thing
    function getType(thing, isMember) {
      isMember =  (isMember == undefined) ? (typeof isMember == "boolean") ? isMember : false : false; // Give isMember a default value of false
    
      switch ((typeof thing).toLowerCase()) { 
        case "object": 
          return monaco.languages.CompletionItemKind.Class;

        case "function": 
          return (isMember) ? monaco.languages.CompletionItemKind.Method : monaco.languages.CompletionItemKind.Function;

        default: 
          return (isMember) ? monaco.languages.CompletionItemKind.Property : monaco.languages.CompletionItemKind.Variable;
      }
    }
  
    // Register object that will return autocomplete items 
    monaco.languages.registerCompletionItemProvider('python', {
      // Run this function when the period or open parenthesis is typed (and anything after a space)
      triggerCharacters: ['.', '('],

      // Function to generate autocompletion results
      provideCompletionItems: function(model, position, token) {
        // Split everything the user has typed on the current line up at each space, and only look at the last word
        var last_chars = model.getValueInRange({startLineNumber: position.lineNumber, startColumn: 0, endLineNumber: position.lineNumber, endColumn: position.column});
        var words = last_chars.replace("\t", "").split(" "); 
        var active_typing = words[words.length - 1]; // What the user is currently typing (everything after the last space)
  
        // If the last character typed is a period then we need to look at member objects of the obj object 
        var is_member = active_typing.charAt(active_typing.length - 1) == ".";

        // Array of autocompletion results
        var result = [];
            
        // Used for generic handling between member and non-member objects
        var last_token = obj; 
        var prefix = ''; 
      
        if (is_member) { 
          // Is a member, get a list of all members, and the prefix
          var parents = active_typing.substring(0, active_typing.length - 1).split("."); 
          last_token = obj[parents[0]]; 
          prefix = parents[0]; 

          // Loop through all the parents the current one will have (to generate prefix)
          for (var i = 1; i < parents.length; i++) { 
            if (last_token.hasOwnProperty(parents[i])) { 
              prefix += '.' + parents[i]; 
              last_token = last_token[parents[i]];
            } else { 
              // Not valid
              return result;
            }
          }
      
          prefix += '.';
        }
      
        // Get all the child properties of the last token
        for (var prop in last_token) { 
          // Do not show properites that begin with "__"
          if (last_token.hasOwnProperty(prop) && !prop.startsWith("__")) { 
            // Get the detail type (try-catch) incase object does not have prototype 
            var details = ''; 
            try { 
              details = last_token[prop].__proto__.constructor.name; 
            } catch (e) { 
              details = typeof last_token[prop]; 
            }
            
            // Create completion object
            var to_push = {
              label: prefix + prop,
              kind: getType(last_token[prop], is_member), 
              detail: details,     
              insertText: prop
            };

            // Change insertText and documentation for functions
            if (to_push.detail.toLowerCase() == 'function') { 
              to_push.insertText += "(";
              to_push.documentation = (last_token[prop].toString()).split("{")[0]; // Show function prototype in the documentation popup
            }

            // Add to final results
            result.push(to_push);
          }
        }

        return {
            suggestions: result
        };
      }
  });
}

let __Function = () => "";
let __Number = 0;
let __Text = "";
ShowAutocompletion({ 
    display: { 
      show: __Function,
      show4x8: __Function,
      left: __Function,
      right: __Function,
      plot: __Function,
      scroll: __Function,
      clear: __Function
    },
    sensor: {
        light: __Function,
        temperature: __Function
    },
    buzzer: {
        tone: __Function,
        on: __Function,
        off: __Function,
        note: __Function
    },
    rtc: {
        datetime: __Function
    },
    usb: {
        value: __Function,
        on: __Function,
        off: __Function,
        toggle: __Function
    },
    switch: {
        S1: __Number,
        S2: __Number,
        value: __Function,
        press: __Function,
        release: __Function
    },
    servo: {
        SV1: __Number,
        SV2: __Number,
        angle: __Function
    },
    imu: {
        update: __Function,
        acc: [ 0, 0, 0],
        gyro: [ 0, 0, 0],
        mag: [ 0, 0, 0],
        rotation: __Function,
        heading: __Function,
        EVENT_SHAKE: __Number,
        EVENT_BOARD_DOWN: __Number,
        EVENT_SCREEN_UP: __Number,
        EVENT_SCREEN_DOWN: __Number,
        EVENT_TILT_LEFT: __Number,
        EVENT_TILT_RIGHT: __Number,
        EVENT_FREE_FALL: __Number,
        is_gesture: __Function
    }
});
