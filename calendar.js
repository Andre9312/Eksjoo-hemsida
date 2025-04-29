
document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const savedBookings = JSON.parse(localStorage.getItem('calendarBookings')) || {};

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    ['V', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 8; j++) {
            const cell = row.insertCell();
            if (j === 0) {
                const weekNum = Math.ceil((date + firstDay) / 7);
                cell.textContent = weekNum;
                continue;
            }
            if ((i === 0 && j < firstDay + 1) || date > daysInMonth) {
                cell.textContent = '';
            } else {
                const key = `${year}-${month + 1}-${date}`;
                cell.textContent = date;
                cell.style.cursor = 'pointer';
                if (savedBookings[key]) {
                    cell.style.backgroundColor = '#add8e6';
                    cell.title = savedBookings[key];
                }
                cell.addEventListener('click', () => {
                    const booking = prompt('Vad vill du skriva?');
                    if (booking) {
                        savedBookings[key] = booking;
                        localStorage.setItem('calendarBookings', JSON.stringify(savedBookings));
                        cell.style.backgroundColor = '#add8e6';
                        cell.title = booking;
                    }
                });
                date++;
            }
        }
    }

    calendar.appendChild(table);
});
