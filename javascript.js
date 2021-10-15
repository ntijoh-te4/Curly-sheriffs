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

        let test = JSON.stringify(repos_fetched);
        console.log(repos_fetched)

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

//Läser in forks
async function files(event){
    const repoId = event.target.id;

    //Hämta antalet forks
    const target = event.target;
    const parent = target.parentElement;
    const forks = parent.querySelector("#forks").innerHTML;

    let main = document.querySelector("main");
    main.innerHTML = "";

    let path = await fetch(`${url}/repositories/${repoId}/contents`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
    let path_fetched = await path.json();
    console.log(path_fetched);
    let file = JSON.stringify(path_fetched[1].download_url);
    let html_link = path_fetched[1].html_url;
 
    console.log(file);
  
    let repos_fetched_name = await fetch(`${url}/repositories/${forkid}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
    let repos_fetched_main_name = await repos_fetched_name.json();
    
    repos_fetched_main_name = JSON.stringify(repos_fetched_main_name.full_name);
    repos_fetched_main_name = repos_fetched_main_name.replaceAll('"', '')

  
    let filecardtemplate = document.querySelector("#fork");
    for (let i = 0; i < forks; i++) {
        const fork_clone = filecardtemplate.content.cloneNode(true);


    fork_clone.querySelector(".fork-title").textContent = repos_fetched_main_name;
    fork_clone.querySelector("code").textContent = file;
    fork_clone.querySelector("a").href = html_link;
    fork_clone.querySelector(".unit-tests").textContent= "40p";

    

}


