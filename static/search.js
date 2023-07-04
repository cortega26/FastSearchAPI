document.getElementById('search-form').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const name = getInputValue('name');
  const lastname = getInputValue('lastname');
  const rut = getInputValue('rut');
  const minAge = getInputValue('min-age');
  const maxAge = getInputValue('max-age');

  const params = new URLSearchParams();
  if (name) {
    params.append('name', name);
  }
  if (lastname) {
    params.append('lastname', lastname);
  }
  if (rut) {
    params.append('rut', rut);
  }
  if (minAge) {
    params.append('min-age', minAge);
  }
  if (maxAge) {
    params.append('max-age', maxAge);
  }

  const url = `/search?${params.toString()}`;

  fetch(url)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => {
      const searchResults = filterSearchResults(data, name, minAge, maxAge);
      displaySearchResults(searchResults);
    })
    .catch(error => {
      console.error('Error:', error);
      displayError('An error occurred. Please try again later.');
    });
}

function getInputValue(id) {
  return document.querySelector(`#${id}`).value.trim();
}

function validateResponse(response) {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response;
}

function filterSearchResults(data, name, minAge, maxAge) {
  return data.filter(person => {
    const age = person.edad;
    return (
      (!name || person.nombre.toLowerCase().includes(name.toLowerCase())) &&
      (!minAge || age >= parseInt(minAge)) &&
      (!maxAge || age <= parseInt(maxAge))
    );
  });
}

function displaySearchResults(results) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    resultsContainer.innerHTML = 'No se encontraron resultados.';
  } else {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    table.dataset.sortField = '';
    table.dataset.sortOrder = 1;

    // Create table header
    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Nombre', 'Apellido', 'RUT', 'Edad'];

    headers.forEach(headerText => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerCell.classList.add('sortable', 'blue-header');
      if (headerText.toLowerCase() === table.dataset.sortField) {
        headerCell.classList.toggle('asc', table.dataset.sortOrder === '1');
        headerCell.classList.toggle('desc', table.dataset.sortOrder === '-1');
      }
      headerCell.addEventListener('click', () => {
        sortResults(headerText.toLowerCase());
      });
      headerRow.appendChild(headerCell);
    });

    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);

    // Create table body
    const tableBody = document.createElement('tbody');

    results.forEach(person => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = person.nombre;
      row.appendChild(nameCell);

      const lastnameCell = document.createElement('td');
      lastnameCell.textContent = person.apellido;
      row.appendChild(lastnameCell);

      const rutCell = document.createElement('td');
      rutCell.textContent = person.rut;
      row.appendChild(rutCell);

      const ageCell = document.createElement('td');
      ageCell.textContent = person.edad;
      row.appendChild(ageCell);

      tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    resultsContainer.appendChild(table);
  }
}

function sortResults(field) {
    const table = document.querySelector('#search-results table');
    const tableBody = table.querySelector('tbody');
  
    const rows = Array.from(tableBody.querySelectorAll('tr'));
  
    let sortOrder = 1; // 1 for ascending, -1 for descending
    if (table.dataset.sortField === field) {
      sortOrder = -table.dataset.sortOrder;
    }
  
    rows.sort((a, b) => {
      const aValue = a.querySelector(`td:nth-child(${fieldIndex[field]})`).textContent;
      const bValue = b.querySelector(`td:nth-child(${fieldIndex[field]})`).textContent;
  
      if (field === 'rut') {
        const aRutParts = aValue.split('-');
        const bRutParts = bValue.split('-');
  
        const aNumber = parseInt(aRutParts[0]);
        const bNumber = parseInt(bRutParts[0]);
  
        if (aNumber < bNumber) {
          return -sortOrder;
        }
        if (aNumber > bNumber) {
          return sortOrder;
        }
  
        const aDigit = parseInt(aRutParts[1]);
        const bDigit = parseInt(bRutParts[1]);
  
        if (aDigit < bDigit) {
          return -sortOrder;
        }
        if (aDigit > bDigit) {
          return sortOrder;
        }
  
        return 0;
      } else {
        return aValue.localeCompare(bValue) * sortOrder;
      }
    });
  
    tableBody.innerHTML = '';
  
    rows.forEach(row => {
      tableBody.appendChild(row);
    });
  
    table.dataset.sortField = field;
    table.dataset.sortOrder = sortOrder;
  }
  

const fieldIndex = {
  nombre: 1,
  apellido: 2,
  rut: 3,
  edad: 4
};


function createParagraph(text) {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  return paragraph;
}

function displayError(message) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = '';

  const errorElement = createParagraph(message);
  errorElement.classList.add('error-message');

  resultsContainer.appendChild(errorElement);
}
