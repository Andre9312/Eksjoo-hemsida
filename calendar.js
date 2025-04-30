const calendarEl = document.getElementById("calendar");
const monthYearEl = document.getElementById("monthYear");
let currentDate = new Date();

function getMonthData(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  return { firstDay, totalDays };
}

function renderCalendar() {
  calendarEl.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const { firstDay, totalDays } = getMonthData(year, month);
  monthYearEl.textContent = currentDate.toLocaleString("sv-SE", { month: "long", year: "numeric" });

  const notes = JSON.parse(localStorage.getItem("calendarNotes") || "{}");

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendarEl.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    const dateKey = `${year}-${month + 1}-${day}`;
    const dateLabel = document.createElement("div");
    dateLabel.className = "date-number";
    dateLabel.textContent = day;
    cell.appendChild(dateLabel);

    if (notes[dateKey]) {
      cell.classList.add("booked");
      notes[dateKey].forEach((note, index) => {
        const noteEl = document.createElement("div");
        noteEl.className = "note";
        noteEl.textContent = note;
        const del = document.createElement("span");
        del.textContent = " x";
        del.className = "delete";
        del.onclick = (e) => {
          e.stopPropagation();
          notes[dateKey].splice(index, 1);
          if (notes[dateKey].length === 0) delete notes[dateKey];
          localStorage.setItem("calendarNotes", JSON.stringify(notes));
          renderCalendar();
        };
        noteEl.appendChild(del);
        cell.appendChild(noteEl);
      });
    }

    cell.onclick = () => {
      const text = prompt("Skriv in en anteckning för " + dateKey);
      if (text) {
        if (!notes[dateKey]) notes[dateKey] = [];
        notes[dateKey].push(text);
        localStorage.setItem("calendarNotes", JSON.stringify(notes));
        renderCalendar();
      }
    };

    calendarEl.appendChild(cell);
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

renderCalendar();
