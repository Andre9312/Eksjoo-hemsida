const calendarGrid = document.getElementById("calendar-grid");
const monthLabel = document.getElementById("current-month");

let currentDate = new Date();

function renderCalendar() {
  // Ta bort gamla dagar
  document.querySelectorAll(".calendar-day:not(.header)").forEach(el => el.remove());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Visa månadens namn
  const monthNames = [
    "Januari", "Februari", "Mars", "April", "Maj", "Juni",
    "Juli", "Augusti", "September", "Oktober", "November", "December"
  ];
  monthLabel.textContent = `${monthNames[month]} ${year}`;

  // Tomma rutor före månadens start
  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("calendar-day");
    calendarGrid.appendChild(empty);
  }

  // Fyll i dagarna
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("calendar-day");

    const num = document.createElement("div");
    num.className = "date-number";
    num.textContent = day;
    cell.appendChild(num);

    const savedNote = localStorage.getItem(`note-${year}-${month}-${day}`);
    if (savedNote) {
      const note = document.createElement("div");
      note.className = "note";
      note.textContent = savedNote;
      cell.appendChild(note);
    }

    cell.addEventListener("click", () => {
      const input = prompt("Skriv anteckning för " + day);
      if (input !== null) {
        localStorage.setItem(`note-${year}-${month}-${day}`, input);
        renderCalendar();
      }
    });

    calendarGrid.appendChild(cell);
  }
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

document.addEventListener("DOMContentLoaded", renderCalendar);
