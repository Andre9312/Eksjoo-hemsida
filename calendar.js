const calendar = document.getElementById("calendar");
const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

function getNotes(key) {
  return JSON.parse(localStorage.getItem(key)) || "";
}

function saveNotes(key, note) {
  localStorage.setItem(key, JSON.stringify(note));
}

function renderCalendar(month, year) {
  calendar.innerHTML = "";

  const firstDay = new Date(year, month).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekdayOffset = (firstDay + 6) % 7; // Anpassad till måndag som första dag

  for (let i = 0; i < weekdayOffset; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month + 1}-${day}`;
    const cell = document.createElement("div");
    cell.className = "calendar-day";

    const dateNum = document.createElement("div");
    dateNum.className = "date-number";
    dateNum.textContent = day;
    cell.appendChild(dateNum);

    const noteText = document.createElement("div");
    noteText.className = "calendar-notes";
    noteText.textContent = getNotes(dateKey);
    cell.appendChild(noteText);

    if (noteText.textContent.trim() !== "") {
      cell.classList.add("booked");
    }

    cell.onclick = () => {
      const newNote = prompt("Anteckning för " + dateKey + ":", getNotes(dateKey));
      if (newNote !== null) {
        saveNotes(dateKey, newNote.trim());
        renderCalendar(month, year);
      }
    };

    calendar.appendChild(cell);
  }
}

renderCalendar(currentMonth, currentYear);
