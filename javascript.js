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
document.querySelector('#search').addEventListener("input", api);
document.querySelector('#fork').addEventListener("click", files);

//api funktionen på eventlistener
function api() {
    let searchInput = document.querySelector("#search").value
    console.log(searchInput)


     // tar in en användare
     // async function users() {
     //    let getrequest = await fetch(`${url}/users/${searchInput}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
      //   let fetched = await getrequest.json();
    //      let info = JSON.stringify(fetched.login);
    //      console.log(info);
       //  console.log(fetched);
       //  console.log(searchInput);
      //   return fetched;
   //  } 


    // hämtar username info
    //  async function users() {
    //      let getrequest = await fetch(`${url}/users/${user}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
    //      let fetched = await getrequest.json();
    //      let info = JSON.stringify(fetched.login);
    //      console.log(info);
    //      return fetched;
    //  }   

    //  async function repositories() {
    //      let getrequest = await fetch(`${url}/users/${searchInput}/repos`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
    //      let fetched = await getrequest.json();
         
    //      const container = document.querySelector(".container content");
    //      const tmpl = document.querySelector("#repo");
    //         for (let i = 0; i < fetched.length; i++) {
    //             let name = JSON.stringify(fetched[i].name);
    //             let forks = JSON.stringify(fetched[i].forks);
    //             console.log(name);
    //             console.log(forks);
    //          }
    //          console.log(fetched);
         

    //      return fetched;
    //  }
     // tar in en specifik repository från användaren
    //  async function repository() {
    //      let getrequest = await fetch(`${url}/repositories/${id}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
    //      let fetched = await getrequest.json();
    //      console.log(fetched);

    //      return fetched;        
    //  }
     
    //  async function repos_path() {
    //      let getrequest = await fetch(`${url}/repositories/${id}/contents`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
    //      let fetched = await getrequest.json();
    //      console.log(fetched);
    //      return fetched;
    //  }


     async function repositories() {
        let repos = await fetch(`${url}/users/${searchInput}/repos`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
        let repos_fetched = await repos.json();

        const container = document.querySelector(".container content");
        const tmpl = document.querySelector("#repo");
        const card = document.querySelector(".card-content");
        const card_name = document.querySelector("#name");
        const card_href = document.querySelector("a");
        const card_forks = document.querySelector("#forks");


           for (let i = 0; i < repos_fetched.length; i++) {
               let name = JSON.stringify(repos_fetched[i].name);
               let forks = JSON.stringify(repos_fetched[i].forks);
               let id = JSON.stringify(repos_fetched[i].id);

               console.log(name);
               console.log(forks);
               console.log(id);

            }
        

        return repos_fetched;
    }
    //kör dom olika funktionerna
    // users();
     repositories();
    //  repository();
    //  repos_path();
}

// ny test constant
const id = "417086855";
async function files(){
   

    let path = await fetch(`${url}/repositories/${id}/contents`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
    let path_fetched = await path.json();
    console.log(path_fetched);
    let file = JSON.stringify(path_fetched[1].download_url);
    let html_link = path_fetched[1].html_url;
 
    console.log(file);

    let main = document.querySelector("main");
    let filecardtemplate = document.querySelector("#fork");
    const fork_clone = filecardtemplate.content.cloneNode(true);

    fork_clone.querySelector(".fork-title").textContent = "Api-test";
    fork_clone.querySelector("code").textContent = file;
    fork_clone.querySelector("a").href = html_link;
    fork_clone.querySelector(".unit-tests").textContent= "40p";
    
    main.appendChild(fork_clone);

}

files();

