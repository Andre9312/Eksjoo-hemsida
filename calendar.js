const monthYearLabel = document.getElementById("month-year");
const calendarBody = document.getElementById("calendar-body");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

let currentDate = new Date();

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekDay = firstDay.getDay() || 7;

  monthYearLabel.textContent = `${firstDay.toLocaleString("sv-SE", { month: "long" }).charAt(0).toUpperCase() + firstDay.toLocaleString("sv-SE", { month: "long" }).slice(1)} ${year}`;
  calendarBody.innerHTML = "";

  let row = document.createElement("tr");
  let current = new Date(year, month, 1 - (firstWeekDay - 1));

  while (current <= lastDay || current.getDay() !== 1) {
    const weekNumber = getWeekNumber(current);
    row.innerHTML = `<td class="week-number"><strong>${weekNumber}</strong></td>`;

    for (let i = 1; i <= 7; i++) {
      const td = document.createElement("td");
      td.textContent = current.getMonth() === month ? current.getDate() : "";
      td.className = current.getMonth() === month ? "active-date" : "inactive";
      row.appendChild(td);
      current.setDate(current.getDate() + 1);
    }

    calendarBody.appendChild(row);
    row = document.createElement("tr");
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);
