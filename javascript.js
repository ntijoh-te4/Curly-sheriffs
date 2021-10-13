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
document.querySelector('#search').addEventListener("input", api);

//api funktionen på eventlistener
function api() {


    // hämtar username info
    //  async function users() {
    //      let getrequest = await fetch(`${url}/users/${user}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
    //      let fetched = await getrequest.json();
    //      let info = JSON.stringify(fetched.login);
    //      console.log(info);
    //      return fetched;
    //  }   

     async function repositories() {
         let getrequest = await fetch(`${url}/users/${user}/repos`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
         let fetched = await getrequest.json();
         for (let i = 0; i < fetched.length; i++) {
            let name = JSON.stringify(fetched[i].name);
            let forks = JSON.stringify(fetched[i].forks);
            console.log(name);
            console.log(forks);
         }
         console.log(fetched);
         return fetched;
     }

     async function repository() {
         let getrequest = await fetch(`${url}/repositories/${id}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
         let fetched = await getrequest.json();
         return fetched;        
     }

     async function repos_path() {
         let getrequest = await fetch(`${url}/repositories/${id}/contents`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
         let fetched = await getrequest.json();
         return fetched;
     }

    //kör dom olika funktionerna
    // users();
     repositories();
     repository();
     repos_path();
}



