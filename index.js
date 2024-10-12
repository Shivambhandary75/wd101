let userform = document.getElementById("userform");


const get_items = () => {
    let rec_entries = localStorage.getItem("user-entries");
    return rec_entries ? JSON.parse(rec_entries) : [];
};


const display_rec_items = () => {
    const rec_entries = get_items();
    const tableEntries = rec_entries.map((entry) => {
        return `
            <tr>
                <td class="border px-4 py-2">${entry.name}</td>
                <td class="border px-4 py-2">${entry.email}</td>
                <td class="border px-4 py-2">${entry.password}</td>
                <td class="border px-4 py-2">${entry.dob}</td>
                <td class="border px-4 py-2">${entry.accept_terms_conditions ? 'Yes' : 'No'}</td>
            </tr>
        `;
    }).join("");

    const tbody = document.querySelector("#user-entries tbody");
    tbody.innerHTML = tableEntries; 
};


const validateDOB = (dob) => {
    const today = new Date();
    const dobDate = new Date(dob);
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
};


const savedform = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const accept_terms_conditions = document.getElementById("accept_terms_conditions").checked;

    
    if (!validateDOB(dob)) {
        alert("You must be between 18 and 55 years old.");
        return; 
    }

    const individual = {
        name,
        email,
        password,
        dob,
        accept_terms_conditions,
    };

    
    const record = get_items(); 
    record.push(individual); 
    localStorage.setItem("user-entries", JSON.stringify(record)); 
    display_rec_items(); 
};


userform.addEventListener("submit", savedform);
display_rec_items(); 
