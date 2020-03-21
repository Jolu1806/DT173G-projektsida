//Variabler
const urlW = 'http://localhost/projekt/api/work.php/work';
const urlE = 'http://localhost/projekt/api/education.php/education/';
const urlP = 'http://localhost/projekt/api/projects.php/projects/';

const workList = document.getElementById('work-list');
const educationList = document.getElementById('education-list');
const projectList = document.getElementById('projects-list');

//Eventlisteners
window.addEventListener('load', fetchData());

/*
Functions
*/

function fetchData() {
  showWork();
  showEducation();
  showProjects();
}

//Laddar lista med kurser
function showWork() {
  fetch(urlW)
    .then(res => res.json())
    .then(data => {
      let output = '';

      data.forEach(work => {
        output += `<article>
          <h2>${work.title}</h2>
          <p class="subDetails">${work.dates}</p>
            <td>${work.company}</td>
            </article>`;
      });
      workList.innerHTML = output;
    });
}

function showEducation() {
  fetch(urlE)
    .then(res => res.json())
    .then(data => {
      let output = '';

      data.forEach(education => {
        output += `<article>
        <h2>${education.program}</h2>
        <p class="subDetails">${education.school}</p>
              <p>${education.dates}</p>
              </article>`;
      });
      educationList.innerHTML = output;
    });
}

function showProjects() {
  fetch(urlP)
    .then(res => res.json())
    .then(data => {
      let output = '';

      data.forEach(project => {
        output += `<article>
            <h2>${project.title}</h2>
            <p class="subDetails">${project.description}</p>
              <p class="card__link text--medium"><a target=”_blank” href="${project.url}">Till ${project.title}</a></p>
            </div>
          </div>
        </article>`;
      });
      projectList.innerHTML = output;
    });
}

