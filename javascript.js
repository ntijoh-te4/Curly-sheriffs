// hämta token.key filen
async function readFile(file) {
    return await fetch(file)
        .then(response => response.text())
        .then(text => text)
}
// hämtar git keyn från token.key
async function getToken() {
    response = await readFile('../token.key');
    return response;
}

// constanter 
const url = "https://api.github.com";


// eventlistener på input
document.querySelector('form#input').addEventListener("submit", api);

//api funktionen på eventlistener
function api(e) {

    e.preventDefault();
    let searchInput = document.querySelector("#search").value

     async function repositories() {
        let repos = await fetch(`${url}/users/${searchInput}/repos`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
        let repos_fetched = await repos.json();

       

           for (let i = 0; i < repos_fetched.length; i++) {
               let id = JSON.stringify(repos_fetched[i].id);
               let htmlpath = await fetch(`${url}/repositories/${id}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
               let htmlpath_fetched = await htmlpath.json();
               let html_link =  repos_fetched[i].html_url;
             


               let repo_name = JSON.stringify(repos_fetched[i].name);
               repo_name = repo_name.replaceAll('"', '')
               let repo_forks = JSON.stringify(repos_fetched[i].forks);
               
          

               
               const container = document.querySelector(".row");
               const tmpl = document.querySelector("#repo");
               const clone = tmpl.content.cloneNode(true);
               const _name = document.createTextNode(repo_name);

               clone.querySelector('#showForks').addEventListener("click", files);
               clone.querySelector('#showForks').id = id;
               clone.querySelector('a').href = html_link;
               
               const addName = document.createTextNode(repo_name);
               const addForks = document.createTextNode(repo_forks);
               clone.querySelector("#name").appendChild(addName);
               clone.querySelector("#forks").appendChild(addForks);
               container.appendChild(clone);
            }
        return repos_fetched;
    }
     repositories();

}


async function files(event){
    
    let forkid = event.target.id;
    let main = document.querySelector("main");
    main.innerHTML = "";

    let path = await fetch(`${url}/repositories/${forkid}/contents`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
    let path_fetched = await path.json();
    console.log(path_fetched);
    let file = JSON.stringify(path_fetched[1].download_url);
    let html_link = path_fetched[1].html_url;
 


        // hämtar bara ut ifall den har .manifest.json
        let info = path_fetched.filter(file => file.name === '.manifest.json')[0];
        // hämtar ut dens content och sedan decypta den så vi får ut information
        let response = await fetch(info.url, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() }});
        let json = await response.json();
        let code = JSON.parse(atob(json.content.replace(/(\r\n|\n|\r)/gm, '')));
        console.log(code)

        console.log(code.filePath)
        //  sedan tar den filepath så vi kan hämta den specilea JS coden som vi behöver

        let code_path = await fetch(`${url}/repos/ntijoh/smallest_of_two/contents/${code.filePath}?ref=master`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() }});
        let code_json = await code_path.json();
        console.log(code_json)

        // hämta content av fillen och skriv in den i våran html
    


    let filecardtemplate = document.querySelector("#fork");
    const fork_clone = filecardtemplate.content.cloneNode(true);

    fork_clone.querySelector(".fork-title").textContent = "api";
    fork_clone.querySelector("code").textContent = file;
    fork_clone.querySelector("a").href = html_link;
    fork_clone.querySelector(".unit-tests").textContent = `
    ${code.tests[0].description} 
    ${code.tests[1].description}  
    ${code.tests[2].description}`
    
    main.appendChild(fork_clone);

}


