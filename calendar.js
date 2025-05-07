const monthNames = [
  "Januari", "Februari", "Mars", "April", "Maj", "Juni",
  "Juli", "Augusti", "September", "Oktober", "November", "December"
];

let currentDate = new Date(2025, 4); // Startar i maj

const title = document.getElementById("kalender-titel");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const grid = document.getElementById("kalender-grid");

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar();
});

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function generateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  title.textContent = `${monthNames[month]} ${year}`;
  grid.innerHTML = "";

  // Veckodagarna
  const weekdays = ["V", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];
  weekdays.forEach(day => {
    const cell = document.createElement("div");
    cell.className = "kalender-header";
    cell.textContent = day;
    grid.appendChild(cell);
  });

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());

  for (let i = 0; i < 6; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + i * 7);
    const weekNum = getWeekNumber(weekStart);
    const weekCell = document.createElement("div");
    weekCell.className = "vecka-cell";
    weekCell.textContent = weekNum;
    grid.appendChild(weekCell);

    for (let j = 0; j < 7; j++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + j);
      const cell = document.createElement("div");
      cell.className = "kalender-cell";
      cell.textContent = day.getMonth() === month ? day.getDate() : "";
      grid.appendChild(cell);
    }
  }
}

generateCalendar();
