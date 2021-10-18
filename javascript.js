/* eslint-disable no-alert */
/* eslint-disable no-console */

// hämta token.key filen
async function readFile(file) {
  return fetch(file)
    .then((response) => response.text())
    .then((text) => text);
}
// hämtar git keyn från token.key
async function getToken() {
  const response = await readFile('../token.key');
  return response;
}
// constanter
const url = 'https://api.github.com';
// eventlistener på input
// Läser in forks

async function reposcode(forkNames, code) {
  const codePath = await fetch(`${url}/repos/${forkNames}/contents/${code.filePath}?ref=master`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const codeJson = await codePath.json();
  let contentCode = await atob(codeJson.content.replace(/(\r\n|\n|\r)/gm, ''));
  contentCode = contentCode.replaceAll('"', '');
  return contentCode;
}

async function files(event) {
  const repoId = event.target.id;
  // Hämta antalet forks
  const { target } = event;
  const parent = target.parentElement;
  const forks = parent.querySelector('#forks').innerHTML;
  const main = document.querySelector('main');
  main.innerHTML = '';
  const path = await fetch(`${url}/repositories/${repoId}/contents`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const pathFetched = await path.json();
  console.log(pathFetched);
  const filecardtemplate = document.querySelector('#fork');
  // eslint-disable-next-line eqeqeq
  if (forks == 0) {
    window.location.reload();
    alert('Inga forks hittade.');
  } else {
    // hämtar bara ut ifall den har .manifest.json
    // eslint-disable-next-line no-lonely-if
    if (pathFetched.filter((file) => file.name === '.manifest.json')[0] === undefined) {
      window.location.reload();
      alert('Inga hittade .manifest.json testa ett nytt repo');
    } else {
      const info = pathFetched.filter((file) => file.name === '.manifest.json')[0];
      const response = await fetch(info.url, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
      const json = await response.json();
      const code = JSON.parse(atob(json.content.replace(/(\r\n|\n|\r)/gm, '')));

      const pathID = await fetch(`${url}/repositories/${repoId}/forks`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
      const reposFetched = await pathID.json();

      console.log(forks);

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < forks; i++) {
        let forkNames = JSON.stringify(reposFetched[i].full_name);
        forkNames = forkNames.replaceAll('"', '');
        if (forkNames === 'TE4-william-bruun/smallest_of_two') {
          console.log('no js file');
        } else {
          const fetchedCodes = reposcode(forkNames, code);
          fetchedCodes.then((value) => {
            const forkClone = filecardtemplate.content.cloneNode(true);
            forkClone.querySelector('.fork-title').textContent = forkNames;
            forkClone.querySelector('code').textContent = value;
            forkClone.querySelector('a').href = reposFetched[i].html_url;
            forkClone.querySelector('.unit-tests').textContent = '';
            main.appendChild(forkClone);
          });
        }
      }
    }
    // hämtar ut dens content och sedan decypta den så vi får ut information
    //  sedan tar den filepath så vi kan hämta den specilea JS coden som vi behöver
    // hämta content av fillen och skriv in den i våran html
    // eslint-disable-next-line no-plusplus
  }
}
// api funktionen på eventlistener
function api(e) {
  e.preventDefault();
  const searchInput = document.querySelector('#search').value;
  async function repositories() {
    const repos = await fetch(`${url}/users/${searchInput}/repos`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
    const reposFetched = await repos.json();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < reposFetched.length; i++) {
      let repoName = JSON.stringify(reposFetched[i].name);
      repoName = repoName.replaceAll('"', '');
      const repoForks = JSON.stringify(reposFetched[i].forks);
      const id = JSON.stringify(reposFetched[i].id);
      const container = document.querySelector('.row');
      const tmpl = document.querySelector('#repo');
      const clone = tmpl.content.cloneNode(true);
      clone.querySelector('#showForks').addEventListener('click', files);
      clone.querySelector('#showForks').id = id;
      const addName = document.createTextNode(repoName);
      const addForks = document.createTextNode(repoForks);
      clone.querySelector('#name').appendChild(addName);
      clone.querySelector('#forks').appendChild(addForks);
      container.appendChild(clone);
    }
    return reposFetched;
  }
  repositories();
}
document.querySelector('form#input').addEventListener('submit', api);
