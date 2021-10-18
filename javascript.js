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
async function files(event) {
  const repoId = event.target.id;
  // Hämta antalet forks
  const { target } = event;
  const parent = target.parentElement;
  const forks = parent.querySelector('#forks').innerHTML;
  const main = document.querySelector('main');
  main.innerHTML = '';

  //
  const path = await fetch(`${url}/repositories/${repoId}/contents`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
  const pathFetched = await path.json();
  // const htmlFile = JSON.stringify(pathFetched[0].download_url);
  const htmlLink = pathFetched[0].html_url;
  const filecardtemplate = document.querySelector('#fork');
  // eslint-disable-next-line eqeqeq
  if (forks == 0) {
    window.location.reload();
    alert('Inga forks hittade.');
  } else {
    console.log('tydligen får det inte bara vara ett if statement i en else, därför finns denna log.');
    // hämtar bara ut ifall den har .manifest.json
    if (pathFetched.filter((file) => file.name === '.manifest.json')[0] === undefined) {
      window.location.reload();
      alert('Inga hittade.');
    } else {
      const info = pathFetched.filter((file) => file.name === '.manifest.json')[0];
      const response = await fetch(info.url, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
      const json = await response.json();
      const code = JSON.parse(atob(json.content.replace(/(\r\n|\n|\r)/gm, '')));

      const pathID = await fetch(`${url}/repositories/${repoId}/forks`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
      const reposFetched = await pathID.json();

      // eslint-disable-next-line max-len
      const codePath = await fetch(`${url}/repos/TE4-Mattis-Abrahamsson/smallest_of_two/contents/${code.filePath}?ref=master`, { method: 'GET', headers: { Authorization: `token ${await getToken()}` } });
      const codeJson = await codePath.json();
      const contentCode = atob(codeJson.content.replace(/(\r\n|\n|\r)/gm, ''));

      // hämtar ut dens content och sedan decypta den så vi får ut information
      //  sedan tar den filepath så vi kan hämta den specilea JS coden som vi behöver
      // hämta content av fillen och skriv in den i våran html
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < forks - 1; i++) {
        let forkNames = JSON.stringify(reposFetched[i].full_name);
        forkNames = forkNames.replaceAll('"', '');
        const forkClone = filecardtemplate.content.cloneNode(true);
        forkClone.querySelector('.fork-title').textContent = forkNames;
        forkClone.querySelector('code').textContent = contentCode;
        forkClone.querySelector('a').href = htmlLink;
        forkClone.querySelector('.unit-tests').textContent = '40p';
        main.appendChild(forkClone);
      }
      hljs.highlightAll();
    }
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
  hljs.highlightAll();
}
document.querySelector('form#input').addEventListener('submit', api);
