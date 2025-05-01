const calendarBody = document.getElementById("calendar-body");
const currentMonthLabel = document.getElementById("current-month");
let currentDate = new Date();

function renderCalendar() {
  calendarBody.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay() || 7;
  const daysInMonth = lastDay.getDate();

  let date = 1 - (startDay - 1);

  for (let row = 0; row < 6; row++) {
    let tr = document.createElement("tr");
    const weekDate = new Date(year, month, date);
    const weekNumber = getWeekNumber(weekDate);
    let weekCell = document.createElement("td");
    weekCell.innerHTML = `<strong>${weekNumber}</strong>`;
    tr.appendChild(weekCell);

    for (let col = 1; col <= 7; col++) {
      let td = document.createElement("td");
      if (date > 0 && date <= daysInMonth) {
        td.textContent = date;
        td.onclick = () => {
          const note = prompt("Ange anteckning:");
          if (note) td.title = note;
        };
      }
      tr.appendChild(td);
      date++;
    }
    calendarBody.appendChild(tr);
  }

  const monthNames = [
    "Januari", "Februari", "Mars", "April", "Maj", "Juni",
    "Juli", "Augusti", "September", "Oktober", "November", "December"
  ];
  currentMonthLabel.textContent = `${monthNames[month]} ${year}`;
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
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
