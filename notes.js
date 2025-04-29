
function saveNote() {
    const input = document.getElementById('note-input');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(input.value);
    localStorage.setItem('notes', JSON.stringify(notes));
    input.value = '';
    displayNotes();
}

function displayNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const container = document.getElementById('saved-notes');
    container.innerHTML = '';
    notes.forEach(note => {
        const p = document.createElement('p');
        p.textContent = note;
        container.appendChild(p);
    });
}

document.addEventListener('DOMContentLoaded', displayNotes);
