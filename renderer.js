const API_URL = "https://script.google.com/macros/s/AKfycbzJKohb4ehqot33YFC_mOnBUuAMwQqkFqnZ4rKOxyeGHX7JhTWWdXgYqGn6HyCLecIs/exec";

// SHOW FORMS
function showForm(formId) {
  document.getElementById("patientForm").classList.add("hidden");
  document.getElementById("reportForm").classList.add("hidden");

  document.getElementById(formId).classList.remove("hidden");
}

// SAVE DATA
async function saveData() {
  const data = {
    reportDate: new Date().toLocaleDateString(),
    reportType: "HISTO",
    pathoNo: document.getElementById('pathoNo').value,
    labNo: document.getElementById('labNo').value,
    mrNo: document.getElementById('mrNo').value,
    status: document.getElementById('status').value,
    verifiedBy: document.getElementById('verifiedBy').value,
    remarks: document.getElementById('remarks').value,
    patientName: document.getElementById('patientName').value,
    patientAge: document.getElementById('patientAge').value,
    history: document.getElementById('history').value,
    diagnosis: document.getElementById('diagnosis').value
  };

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (result.status === "success") {
    alert("✅ Saved & Report Created!");

    if (result.docLink) {
      window.open(result.docLink);
    }
  } else {
    alert("Error saving data");
  }
}

// FETCH DATA
async function fetchData() {
  const res = await fetch(API_URL);
  const data = await res.json();
  displayData(data);
}

// DISPLAY TABLE
function displayData(data) {
  let html = `
    <table>
      <tr>
        <th>Patho No</th>
        <th>Patient</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
  `;

  data.forEach(d => {
    html += `
      <tr>
        <td>${d["PATHO NO"]}</td>
        <td>${d["PATIENT NAME"]}</td>
        <td>${d["REPORT STATUS"]}</td>
        <td>${d["REPORT DATE"]}</td>
      </tr>
    `;
  });

  html += "</table>";
  document.getElementById("dataTable").innerHTML = html;
}

// FILTER
async function applyFilter() {
  const status = document.getElementById("filterStatus").value;
  const search = document.getElementById("search").value;

  let url = API_URL + "?";

  if (status) url += "status=" + status + "&";
  if (search) url += "search=" + search;

  const res = await fetch(url);
  const data = await res.json();

  displayData(data);
}