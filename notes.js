// Notes Page Functionality
const newNoteInput = document.getElementById('new-note');
const addNoteButton = document.getElementById('add-note');
const noteList = document.getElementById('note-list');
const noteCategorySelect = document.getElementById('note-category');
const showAllNotesButton = document.getElementById('show-all-notes');
const showWorkNotesButton = document.getElementById('show-work-notes');
const showPersonalNotesButton = document.getElementById('show-personal-notes');
const deleteWorkLibraryButton = document.getElementById('delete-work-library');
const deletePersonalLibraryButton = document.getElementById('delete-personal-library');
const addLibraryInput = document.getElementById('add-library-input'); // New input for library name


// Initialize notes library
let notesLibrary = {
  all: [],
  work: [],
  personal: []
};

// Load notes from local storage (if available)
loadNotes();

// Add Note Button Event Listener
addNoteButton.addEventListener('click', () => {
  const newNoteText = newNoteInput.value;
  const noteCategory = noteCategorySelect.value;
  if (newNoteText !== "") {
    addNote(newNoteText, noteCategory);
    newNoteInput.value = ""; // Clear the input field
  }
});

// Navigation Buttons Event Listeners
showAllNotesButton.addEventListener('click', () => {
  displayNotes('all');
});

showWorkNotesButton.addEventListener('click', () => {
  displayNotes('work');
});

showPersonalNotesButton.addEventListener('click', () => {
  displayNotes('personal');
});

// Delete Library Buttons Event Listeners
deleteWorkLibraryButton.addEventListener('click', () => {
  deleteLibrary('work');
});

deletePersonalLibraryButton.addEventListener('click', () => {
  deleteLibrary('personal');
});

// Add Library Button Event Listener
addLibraryButton.addEventListener('click', () => {
  const newLibraryName = addLibraryInput.value.trim(); // Get library name and trim whitespace
  if (newLibraryName !== "") {
    addLibrary(newLibraryName);
    addLibraryInput.value = ""; // Clear the input field
  }
});

// Function to add a new note
function addNote(noteText, category) {
  const newNoteItem = document.createElement('li');
  newNoteItem.textContent = noteText;
  newNoteItem.dataset.category = category; // Store category data
  noteList.appendChild(newNoteItem);

  notesLibrary[category].push(noteText);
  notesLibrary.all.push(noteText);

  // Save notes to local storage
  saveNotes();
}

// Function to display notes based on category
function displayNotes(category) {
  noteList.innerHTML = ''; // Clear existing notes
  const notesToDisplay = notesLibrary[category];
  notesToDisplay.forEach(note => {
    const newNoteItem = document.createElement('li');
    newNoteItem.textContent = note;
    noteList.appendChild(newNoteItem);
  });
}

// Function to load notes from local storage
function loadNotes() {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notesLibrary = JSON.parse(savedNotes);
    displayNotes('all');
  }
}

// Function to save notes to local storage
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notesLibrary));
}

// Delete Note Functionality
noteList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const noteToDelete = event.target;
    const category = noteToDelete.dataset.category;
    deleteNote(noteToDelete, category);
  }
});
function deleteNote(noteElement, category) {
  const noteText = noteElement.textContent;
  // Remove from notesLibrary
  const noteIndex = notesLibrary[category].indexOf(noteText);
  if (noteIndex !== -1) {
    notesLibrary[category].splice(noteIndex, 1);
  }
  const allIndex = notesLibrary.all.indexOf(noteText);
  if (allIndex !== -1) {
    notesLibrary.all.splice(allIndex, 1);
  }
  // Remove from the DOM
  noteList.removeChild(noteElement);
  // Save updated notes
  saveNotes();
}

// Clear Notes Functionality
const clearNotesButton = document.getElementById('clear-notes');
clearNotesButton.addEventListener('click', () => {
  if (confirm("Are you sure you want to clear all notes?")) {
    clearNotes();
  }
});
function clearNotes() {
  notesLibrary = {
    all: [],
    work: [],
    personal: []
  };
  // Clear the note list in the DOM
  noteList.innerHTML = '';
  // Save the empty notesLibrary
  saveNotes();
}

// Function to delete a library (category)
function deleteLibrary(category) {
  if (confirm(`Are you sure you want to delete the ${category} library? All notes in this category will be permanently deleted.`)) {
    notesLibrary[category] = []; // Clear the library
    const notesToRemove = notesLibrary[category]; // Get notes to remove from "all"
    notesLibrary.all = notesLibrary.all.filter(note => !notesToRemove.includes(note)); // Remove from "all"
    displayNotes('all'); // Update the display
    saveNotes();
  }
}

// Function to add a new library
function addLibrary(newLibraryName) {
  notesLibrary[newLibraryName.toLowerCase()] = []; // Create new library array
  notesLibrary.all = notesLibrary.all.filter(note => !notesLibrary[newLibraryName.toLowerCase()].includes(note)); // Remove from "all"
  saveNotes();
  updateLibraryNavigation(); // Update navigation buttons
}

// Function to update library navigation buttons
function updateLibraryNavigation() {
  const libraryNav = document.querySelector('.library-nav');
  libraryNav.innerHTML = ''; // Clear existing buttons

  // Add "All Notes" button
  const showAllButton = document.createElement('button');
  showAllButton.id = 'show-all-notes';
  showAllButton.textContent = 'All Notes';
  showAllButton.addEventListener('click', () => {
    displayNotes('all');
  });
  libraryNav.appendChild(showAllButton);

  // Add buttons for each library
  for (const library in notesLibrary) {
    if (library !== 'all') {
      const showLibraryButton = document.createElement('button');
      showLibraryButton.id = `show-${library}-notes`;
      showLibraryButton.textContent = `${library.toUpperCase()} Notes`;
      showLibraryButton.addEventListener('click', () => {
        displayNotes(library);
      });
      libraryNav.appendChild(showLibraryButton);

      // Add delete button for each library
      const deleteLibraryButton = document.createElement('button');
      deleteLibraryButton.id = `delete-${library}-library`;
      deleteLibraryButton.textContent = `Delete ${library.toUpperCase()} Library`;
      deleteLibraryButton.addEventListener('click', () => {
        deleteLibrary(library);
      });
      libraryNav.appendChild(deleteLibraryButton);
    }
  }
}


