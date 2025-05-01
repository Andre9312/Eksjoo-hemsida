const CLIENT_ID = '333864669832-jegjctadc54nkeentebdg1ir9555dmv6.apps.googleusercontent.com';
const API_KEY = '';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
let tokenClient;
let gapiInited = false;
let currentMonth = new Date();

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({ apiKey: API_KEY });
  gapiInited = true;
  maybeEnableCalendar();
}

function maybeEnableCalendar() {
  if (gapiInited) {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '',
    });
    tokenClient.callback = async (resp) => {
      if (resp.error) throw resp;
      renderCalendar();
    };
    tokenClient.requestAccessToken();
  }
}

function renderCalendar() {
  const calendar = document.getElementById('calendar');
  calendar.innerHTML = '';

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  document.getElementById('monthLabel').textContent = currentMonth.toLocaleString('sv-SE', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const daysInMonth = lastDay.getDate();

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const days = ['Vecka', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];
  days.forEach(d => {
    const th = document.createElement('th');
    th.textContent = d;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  let date = 1 - startDay;
  while (date <= daysInMonth) {
    const row = document.createElement('tr');
    const weekNumber = getWeekNumber(new Date(year, month, Math.max(date, 1)));
    const weekCell = document.createElement('td');
    weekCell.textContent = weekNumber;
    row.appendChild(weekCell);

    for (let i = 0; i < 7; i++) {
      const cell = document.createElement('td');
      if (date > 0 && date <= daysInMonth) {
        cell.textContent = date;
        cell.dataset.date = `${year}-${month + 1}-${date}`;
        cell.onclick = () => editNote(cell);
      }
      row.appendChild(cell);
      date++;
    }
    table.appendChild(row);
  }
  calendar.appendChild(table);
}

function editNote(cell) {
  const note = prompt('Skriv en anteckning:', cell.dataset.note || '');
  if (note !== null) {
    cell.dataset.note = note;
    cell.style.background = 'lightblue';
    saveNoteToDrive(cell.dataset.date, note);
  }
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}

function prevMonth() {
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  renderCalendar();
}

function saveNoteToDrive(date, note) {
  const content = JSON.stringify({ date, note });
  const file = new Blob([content], { type: 'application/json' });
  const metadata = {
    name: `note-${date}.json`,
    mimeType: 'application/json'
  };
  const accessToken = gapi.client.getToken().access_token;

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
    body: form,
  });
}

gapiLoaded(); // Start Google API
