const calendarGrid = document.querySelector('.calendar-grid');
const monthYear = document.getElementById('monthYear');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

let currentDate = new Date();

function generateCalendar(date) {
  calendarGrid.querySelectorAll('.date-cell, .week-number').forEach(e => e.remove());

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = (firstDay.getDay() + 6) % 7; // Måndag = 0
  const totalDays = lastDay.getDate();

  let currentRowDate = new Date(year, month, 1 - startDay);
  const today = new Date();

  while (currentRowDate <= lastDay || currentRowDate.getDay() !== 1) {
    const weekNumber = getWeekNumber(new Date(currentRowDate));
    const weekCell = document.createElement('div');
    weekCell.classList.add('week-number');
    weekCell.innerHTML = `<strong>${weekNumber}</strong>`;
    weekCell.style.textAlign = "center";
    calendarGrid.appendChild(weekCell);

    for (let i = 0; i < 7; i++) {
      const cell = document.createElement('div');
      cell.classList.add('date-cell');
      cell.textContent = currentRowDate.getDate();

      if (
        currentRowDate.getMonth() !== month
      ) {
        cell.style.opacity = "0.3";
      }

      if (
        currentRowDate.toDateString() === today.toDateString()
      ) {
        cell.classList.add('today');
      }

      cell.addEventListener('click', () => {
        const note = prompt("Skriv en anteckning för " + currentRowDate.toLocaleDateString());
        if (note) {
          cell.innerHTML = `<strong>${currentRowDate.getDate()}</strong><br>${note}`;
        }
      });

      calendarGrid.appendChild(cell);
      currentRowDate.setDate(currentRowDate.getDate() + 1);
    }
  }

  const monthNames = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
  monthYear.textContent = `${monthNames[month]} ${year}`;
}

function getWeekNumber(date) {
  const temp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  temp.setHours(0, 0, 0, 0);
  temp.setDate(temp.getDate() + 3 - ((temp.getDay() + 6) % 7));
  const week1 = new Date(temp.getFullYear(), 0, 4);
  return 1 + Math.round(((temp - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
});

generateCalendar(currentDate);
