
// Set date restrictions for the D.O.B field
const dobInput = document.getElementById("dob");
const today = new Date();
const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

dobInput.setAttribute("max", maxDate.toISOString().split("T")[0]);
dobInput.setAttribute("min", minDate.toISOString().split("T")[0]);

let userform = document.getElementById("userform");
const get_items = () => {
    let rec_entries = localStorage.getItem("user-entries");
    return rec_entries ? JSON.parse(rec_entries) : [];
};
let record = get_items();

const display_rec_items = () => {
    const rec_entries = get_items();
    const tableEntries = rec_entries.map((entry) => {
        const name_cell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const email_cell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const password_cell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dob_cell = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const accept_terms_cell = `<td class="border px-4 py-2">${entry.accept_terms_conditions ? 'Yes' : 'No'}</td>`;
        const row = `<tr>${name_cell}${email_cell}${password_cell}${dob_cell}${accept_terms_cell}</tr>`;
        return row;
    }).join("\n");

    const table = `
        <thead>
            <tr>
                <th class="px-4 py-2">Name</th>
                <th class="px-4 py-2">Email id</th>
                <th class="px-4 py-2">Password</th>
                <th class="px-4 py-2">D.O.B</th>
                <th class="px-4 py-2">Accepted Terms?</th>
            </tr>
        </thead>
        <tbody>
            ${tableEntries}
        </tbody>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};

const savedform = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const accept_terms_conditions = document.getElementById("accept_terms_conditions").checked;

    const individual = {
        name,
        email,
        password,
        dob,
        accept_terms_conditions,
    };

    record.push(individual);
    localStorage.setItem("user-entries", JSON.stringify(record));
    display_rec_items();
};

userform.addEventListener("submit", savedform);
display_rec_items();
