// Load the JSON data
fetch('bajaj_file.json')
  .then(response => response.json())
  .then(data => {
    // Render the employee data
    renderEmployees(data.employees);

    // Add event listeners for filtering and searching
    document.getElementById('filterSelect').addEventListener('change', handleFilter);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
  })
  .catch(error => console.error(error));

// Render the employee data
function renderEmployees(employees) {
  const container = document.getElementById('employeeContainer');
  container.innerHTML = '';

  employees.forEach(employee => {
    const card = createEmployeeCard(employee);
    container.appendChild(card);
  });
}

// Create an employee card element
function createEmployeeCard(employee) {
  const card = document.createElement('div');
  card.classList.add('employeeCard');

  const name = document.createElement('h2');
  name.textContent = employee.name || 'Unknown';
  card.appendChild(name);

  if (employee.designation) {
    const designation = document.createElement('p');
    designation.textContent = 'Designation: ' + employee.designation;
    card.appendChild(designation);
  }

  if (employee.skills.length > 0) {
    const skills = document.createElement('p');
    skills.textContent = 'Skills: ' + employee.skills.join(', ');
    card.appendChild(skills);
  }

  return card;
}

// Filter the employee data based on the selected option
function handleFilter() {
  const filterValue = this.value.toLowerCase();
  const cards = document.getElementsByClassName('employeeCard');

  Array.from(cards).forEach(card => {
    const designation = card.querySelector('p:nth-of-type(1)');
    const skills = card.querySelector('p:nth-of-type(2)');

    if (filterValue === '') {
      card.classList.remove('filtered');
    } else if (designation && designation.textContent.toLowerCase().includes(filterValue)) {
      card.classList.remove('filtered');
    } else if (skills && skills.textContent.toLowerCase().includes(filterValue)) {
      card.classList.remove('filtered');
    } else {
      card.classList.add('filtered');
    }
  });
}

// Search for employees based on the entered text
function handleSearch() {
  const searchValue = this.value.toLowerCase();
  const cards = document.getElementsByClassName('employeeCard');

  Array.from(cards).forEach(card => {
    const name = card.querySelector('h2');

    if (name.textContent.toLowerCase().includes(searchValue)) {
      card.classList.remove('filtered');
    } else {
      card.classList.add('filtered');
    }
  });
}
