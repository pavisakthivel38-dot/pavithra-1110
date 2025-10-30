const token = localStorage.getItem("token");
if (!token) window.location.href = "index.html";

async function loadJobs() {
  const res = await fetch("/api/applications", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const jobs = await res.json();
  const div = document.getElementById("jobs");
  div.innerHTML = jobs
    .map(
      (j) => `
    <div>
      <b>${j.company}</b> - ${j.position} (${j.status})
      <a href="edit.html?id=${j._id}">Edit</a>
      <button onclick="deleteJob('${j._id}')">Delete</button>
    </div>`
    )
    .join("");
}

async function deleteJob(id) {
  await fetch(`/api/applications/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  loadJobs();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

loadJobs();
