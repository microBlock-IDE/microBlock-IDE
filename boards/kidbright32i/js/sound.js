note_map = {
    "C4": 261,
    "C#4": 277,
    "D4": 293,
    "Eb4": 311,
    "E4": 329,
    "F4": 349,
    "F#4": 369,
    "G4": 391,
    "G#4": 415,
    "A4": 440,
    "Bb4": 466,
    "B4": 493,
    "C5": 523,
    "C#5": 554,
    "D5": 587,
    "Eb5": 622,
    "E5": 659,
    "F5": 698,
    "F#5": 740,
    "G5": 784,
    "G#5": 831,
    "A5": 880,
    "Bb5": 932,
    "B5": 988,
    "C6": 1046,
    "C#6": 1109,
    "D6": 1175,
    "Eb6": 1244,
    "E6": 1318,
    "F6": 1396,
    "F#6": 1480,
    "G6": 1568,
    "G#6": 1661,
    "A6": 1760,
    "Bb6": 1865,
    "B6": 1976,
    "C7": 2093,
    "SIL": 0
};

let noteNextIndex = 0;
let notesArr = [];
let playNoteContext = new AudioContext();
let playNoteOscillator = null;
let playNoteTimer = null;
let playingFlag = false;

playNotes = (notes, duration, play_callback, stop_callback) => {
    if (playingFlag) {
        stopNote();
        playingFlag = false;
    }
    if (!duration) duration = 4;

    noteNextIndex = 0;
    playNoteTimer = null;
    playNoteOscillator = null;
    
    notesArr = notes.split(" ");
    notesArr = notesArr.filter(note => Object.keys(note_map).indexOf(note) >= 0);
    if (notesArr.length === 0) return;

    playNote = (play_callback, stop_callback) => {
        if (playNoteOscillator) {
            playNoteOscillator.stop();
            playNoteOscillator = null;
        }
        if (noteNextIndex >= notesArr.length) {
            if (stop_callback) {
                stop_callback();
            }
            playingFlag = false;
            return;
        }

        if (play_callback) {
            play_callback(noteNextIndex);
        }

        playNoteOscillator = playNoteContext.createOscillator();
        playNoteGain = playNoteContext.createGain();
        playNoteGain.gain.value = 0.1 // 10 %
        playNoteOscillator.type = "square";
        playNoteOscillator.frequency.value = note_map[notesArr[noteNextIndex]];
        playNoteOscillator.connect(playNoteGain)
        playNoteGain.connect(playNoteContext.destination)
        playNoteOscillator.start();
        noteNextIndex++;

        let bpm = 120;
        let quarter_delay = (60 * 1000) / bpm;
        let delay = quarter_delay * duration;
        playNoteTimer = setTimeout(() => playNote(play_callback, stop_callback), delay)
    };

    playNote(play_callback, stop_callback);
    playingFlag = true;
};

stopNote = () => {
    if (playNoteOscillator) {
        playNoteOscillator.stop();
        playNoteOscillator = null;
    }
    if (playNoteTimer) {
        clearTimeout(playNoteTimer);
    }
}
