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
const user = "ntijoh-axel-ostan";
const id = "409177162";



// eventlistener på input
document.querySelector('form#input').addEventListener("submit", api);

//api funktionen på eventlistener
function api(e) {
    e.preventDefault();

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
     async function repository() {
         let getrequest = await fetch(`${url}/repositories/${id}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
         let fetched = await getrequest.json();
         console.log(fetched);

         return fetched;        
     }
     
     async function repos_path() {
         let getrequest = await fetch(`${url}/repositories/${id}/contents`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
         let fetched = await getrequest.json();
         return fetched;
     }


     async function repositories() {

        let repos = await fetch(`${url}/users/${searchInput}/repos`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
        let repos_fetched = await repos.json();
        let path = await fetch(`${url}/repositories/${id}/contents`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
        //let path_fetched = await getrequest.json();
        
    
        //const card = document.querySelector(".card-content");
        // let card_name = document.querySelector("#name");
        // const card_href = document.querySelector("a");
        // const card_forks = document.querySelector("#forks");

        // let main = document.querySelector("main");
        // main.innerHTML = "";

           for (let i = 0; i < repos_fetched.length; i++) {
               let repo_name = JSON.stringify(repos_fetched[i].name);
            //    let forks = JSON.stringify(repos_fetched[i].forks);
            //    let id = JSON.stringify(repos_fetched[i].id);
               console.log(repo_name);
               

               const container = document.querySelector(".row");
                const tmpl = document.querySelector("#repo");
               const clone = tmpl.content.cloneNode(true);
               const _name = document.createTextNode(repo_name);
               clone.querySelector("#name").appendChild(_name);
               container.appendChild(clone);
            }
            console.log(repos_fetched);
        

        return repos_fetched;
    }
    //kör dom olika funktionerna
    // users();
     repositories();
     repository();
     repos_path();
}



