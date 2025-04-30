// calendar.js

document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");

    let currentDate = new Date();
    let bookings = JSON.parse(localStorage.getItem("calendarBookings") || "{}");

    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    function renderCalendar(date) {
        calendar.innerHTML = "";
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay() || 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${date.toLocaleString("sv-SE", { month: "long" })} ${year}`;

        const startDate = new Date(year, month, 1 - (firstDay - 1));
        for (let week = 0; week < 6; week++) {
            const row = document.createElement("div");
            row.classList.add("calendar-row");

            const weekNum = document.createElement("div");
            weekNum.classList.add("week-number");
            weekNum.textContent = `v${getWeekNumber(startDate)}`;
            row.appendChild(weekNum);

            for (let day = 0; day < 7; day++) {
                const current = new Date(startDate);
                current.setDate(startDate.getDate() + week * 7 + day);

                const cell = document.createElement("div");
                cell.classList.add("calendar-day");
                cell.textContent = current.getDate();

                const key = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
                if (current.getMonth() !== month) {
                    cell.classList.add("other-month");
                }

                if (bookings[key]) {
                    cell.classList.add("booked");
                    cell.title = bookings[key];
                }

                cell.addEventListener("click", () => {
                    const note = prompt("Ange bokning för detta datum:", bookings[key] || "");
                    if (note) {
                        bookings[key] = note;
                        localStorage.setItem("calendarBookings", JSON.stringify(bookings));
                        renderCalendar(currentDate);
                    } else if (bookings[key]) {
                        delete bookings[key];
                        localStorage.setItem("calendarBookings", JSON.stringify(bookings));
                        renderCalendar(currentDate);
                    }
                });

                row.appendChild(cell);
            }

            calendar.appendChild(row);
        }
    }

    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
