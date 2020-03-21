const urlW = "http://localhost/projekt/api/work.php/work",
      urlE = "http://localhost/projekt/api/education.php/education/",
      urlP = "http://localhost/projekt/api/projects.php/projects/",
      workList = document.getElementById("work-list"),
      educationList = document.getElementById("education-list"),
      projectList = document.getElementById("projects-list");

function fetchData() {
  showWork(), showEducation(), showProjects();
}

function showWork() {
  fetch(urlW).then(t => t.json()).then(t => {
    let e = "";
    t.forEach(t => {
      e += `<article>\n          <h2>${t.title}</h2>\n          <p class="subDetails">${t.dates}</p>\n            <td>${t.company}</td>\n            </article>`;
    }), workList.innerHTML = e;
  });
}

function showEducation() {
  fetch(urlE).then(t => t.json()).then(t => {
    let e = "";
    t.forEach(t => {
      e += `<article>\n        <h2>${t.program}</h2>\n        <p class="subDetails">${t.school}</p>\n              <p>${t.dates}</p>\n              </article>`;
    }), educationList.innerHTML = e;
  });
}

function showProjects() {
  fetch(urlP).then(t => t.json()).then(t => {
    let e = "";
    t.forEach(t => {
      e += `<article>\n            <h2>${t.title}</h2>\n            <p class="subDetails">${t.description}</p>\n              <p class="card__link text--medium"><a target=”_blank” href="${t.url}">Till ${t.title}</a></p>\n            </div>\n          </div>\n        </article>`;
    }), projectList.innerHTML = e;
  });
}

window.addEventListener("load", fetchData());