// Sparade anteckningar
let notes = JSON.parse(localStorage.getItem('calendarNotes') || '{}');

function openNoteModal(id, title, relatedDates = []) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('noteInput').value = notes[id] || '';
  document.getElementById('noteModal').classList.remove('hidden');

  document.getElementById('saveNote').onclick = () => {
    const note = document.getElementById('noteInput').value;
    notes[id] = note;

    // Om veckonummer – spara till alla datum i veckan också
    relatedDates.forEach(date => {
      notes[date] = note;
      const dateCell = document.querySelector(`[data-date="${date}"]`);
      if (dateCell) dateCell.querySelector('.note')?.remove();
      if (note && dateCell) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerText = note;
        dateCell.appendChild(noteDiv);
      }
    });

    // Spara i localStorage
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
    document.getElementById('noteModal').classList.add('hidden');

    // Uppdatera visning på enskild cell
    const cell = document.querySelector(`[data-date="${id}"]`);
    if (cell) {
      cell.querySelector('.note')?.remove();
      if (note) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerText = note;
        cell.appendChild(noteDiv);
      }
    }
  };
}

document.getElementById('closeModal').onclick = () => {
  document.getElementById('noteModal').classList.add('hidden');
};

// Klick på enskilda datumrutor
document.querySelectorAll('.datumruta').forEach(datumruta => {
  datumruta.onclick = () => {
    const datumId = datumruta.dataset.date;
    openNoteModal(datumId, `Anteckning för ${datumId}`);
  };

  // Visa sparad anteckning vid laddning
  const id = datumruta.dataset.date;
  if (notes[id]) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.innerText = notes[id];
    datumruta.appendChild(noteDiv);
  }
});

// Klick på veckonummer
document.querySelectorAll('.veckonummer').forEach(veckocell => {
  veckocell.onclick = () => {
    const veckaId = 'vecka-' + veckocell.innerText;
    const row = veckocell.parentElement;
    const datesInWeek = [...row.querySelectorAll('.datumruta')].map(cell => cell.dataset.date);
    openNoteModal(veckaId, `Anteckning för vecka ${veckocell.innerText}`, datesInWeek);
  };
});
