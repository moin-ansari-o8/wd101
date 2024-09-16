const userForm = document.getElementById("user-form");
const dobInput = document.getElementById("dob");

localStorage.removeItem("user-data");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-data");
  return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  const details = document.getElementById("user-entries");
  details.innerHTML = "";

  entries.forEach((entry) => {
    const name = `<td>${entry.name}</td>`;
    const email = `<td>${entry.email}</td>`;
    const password = `<td>${entry.password}</td>`;
    const dob = `<td>${entry.dob}</td>`;
    const acceptTerms = `<td>${entry.acceptTerms ? "Yes" : "No"}</td>`;

    const row = `<tr>${name}${email}${password}${dob}${acceptTerms}</tr>`;
    details.innerHTML += row;
  });
};

const saveToForm = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const entry = { name, email, password, dob, acceptTerms };

  userEntries.push(entry);
  localStorage.setItem("user-data", JSON.stringify(userEntries));
  displayEntries();
  userForm.reset();
};

const setDateLimits = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const minDate = new Date(
    today.getFullYear() - 55,
    today.getMonth(),
    today.getDate()
  );

  dobInput.setAttribute("min", minDate.toISOString().split("T")[0]);
  dobInput.setAttribute("max", maxDate.toISOString().split("T")[0]);
};

window.onload = () => {
  setDateLimits();
  displayEntries();
};

userForm.addEventListener("submit", saveToForm);
