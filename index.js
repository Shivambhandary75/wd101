function loadEntries() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    entries.forEach(entry => {
        const newRow = table.insertRow();
        newRow.insertCell(0).innerText = entry.name;
        newRow.insertCell(1).innerText = entry.email;
        newRow.insertCell(2).innerText = entry.password;
        newRow.insertCell(3).innerText = entry.dob;
        newRow.insertCell(4).innerText = entry.terms ? 'true' : 'false';
    });
}

function saveEntry(name, email, password, dob, terms) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push({ name, email, password, dob, terms });
    localStorage.setItem('entries', JSON.stringify(entries));
}

window.onload = loadEntries;

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    const dayDiff = today.getDate() - dobDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

    saveEntry(name, email, password, dob, terms);

    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = email;
    newRow.insertCell(2).innerText = password;
    newRow.insertCell(3).innerText = dob;
    newRow.insertCell(4).innerText = terms ? 'true' : 'false';
    document.getElementById('registrationForm').reset();
});