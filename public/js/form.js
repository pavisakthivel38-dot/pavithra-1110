const token = localStorage.getItem("token");
if (!token) window.location.href = "index.html";

// Add job
async function addJob(e) {
  e.preventDefault();
  const data = {
    company: company.value,
    position: position.value,
    status: status.value,
    notes: notes.value,
  };
  await fetch("/api/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  window.location.href = "dashboard.html";
}

// Edit job
const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

if (jobId) {
  fetch(`/api/applications`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.json())
    .then((apps) => {
      const job = apps.find((j) => j._id === jobId);
      if (job) {
        company.value = job.company;
        position.value = job.position;
        status.value = job.status;
        notes.value = job.notes;
      }
    });
}

async function updateJob(e) {
  e.preventDefault();
  const data = {
    company: company.value,
    position: position.value,
    status: status.value,
    notes: notes.value,
  };
  await fetch(`/api/applications/${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  window.location.href = "dashboard.html";
}
