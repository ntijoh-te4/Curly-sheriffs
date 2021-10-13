// hämta token.key filen
async function readFile(file) {
    return await fetch(file)
        .then(response => response.text())
        .then(text => text)
}
async function getToken() {
    response = await readFile('../token.key');
    return response;
}

// constanter 
const url = "https://api.github.com";
const user = "ntijoh-axel-ostan";
const id = "409177162";



// eventlistener på input
document.querySelector('#search').addEventListener("focus", api);

//api funktionen på eventlistener
function api() {

    async function user_info(){
        let getrequest = await fetch(`${url}/user`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
        let fetched = await getrequest.json();
        console.log(fetched);
        return fetched;
    }

     async function users() {
         let getrequest = await fetch(`${url}/users/${user}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
         let fetched = await getrequest.json();
         console.log(fetched);
         return fetched;
     }   

     async function repositories() {
         let getrequest = await fetch(`${url}/users/${user}/repos`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
         let fetched = await getrequest.json();
         console.log(fetched);
         return fetched;
     }

     async function repository() {
         let getrequest = await fetch(`${url}/repositories/${id}`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
         let fetched = await getrequest.json();
         console.log(fetched);
         return fetched;        
     }

     async function repos_path() {
         let getrequest = await fetch(`${url}/repositories/${id}/contents`, { method: 'GET', headers: { 'Authorization': 'token ' + await getToken() } });
         let fetched = await getrequest.json();
         console.log(fetched);
         return fetched;
     }

    //kör dom olika funktionerna
     user_info();
     users();
     repositories();
     repository();
     repos_path();
}



