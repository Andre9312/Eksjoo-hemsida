const monthYear = document.getElementById("monthYear");
const calendarBody = document.getElementById("calendarBody");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekDay = firstDay.getDay() || 7;

  monthYear.textContent = firstDay.toLocaleString('sv-SE', {
    month: 'long',
    year: 'numeric'
  });

  calendarBody.innerHTML = "";
  let day = 1 - firstWeekDay + 1;
  for (let row = 0; row < 6; row++) {
    const weekStart = new Date(year, month, day);
    const weekNum = getWeekNumber(weekStart);
    const weekCell = document.createElement("div");
    weekCell.className = "week-number";
    weekCell.textContent = weekNum;
    calendarBody.appendChild(weekCell);

    for (let col = 0; col < 7; col++) {
      const date = new Date(year, month, day);
      const dayCell = document.createElement("div");
      dayCell.className = "calendar-day";

      if (date.getMonth() !== month) {
        dayCell.classList.add("inactive");
      }

      dayCell.textContent = date.getDate();
      calendarBody.appendChild(dayCell);
      day++;
    }
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();