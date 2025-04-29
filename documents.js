
document.getElementById('file-upload').addEventListener('change', function () {
    const list = document.getElementById('file-list');
    list.innerHTML = '';
    Array.from(this.files).forEach(file => {
        const item = document.createElement('div');
        item.textContent = file.name;
        list.appendChild(item);
    });
});
