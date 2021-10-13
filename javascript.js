const url = "https://api.github.com";
const user = "ntijoh-axel-ostan";
const id = "409177162";

async function readFile(file) {
    return await fetch(file)
        .then(response => response.text())
        .then(text => text)
}
async function getToken() {
    response = await readFile('../token.key');
    return response;
}



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

    user_info();
     users();
     repositories();
     repository();
     repos_path();
}
api();

// Detta kan användas osäkert dock
// const btnRepos = document.getElementById("search")
// const divResult = document.getElementById("divResult")

// btnRepos.addEventListener("click", getRepos)
// async function getRepos() {
//     const url = "https://api.github.com/users/ntijoh-axel-ostan?q=stars:>0"
//     const getrequest = await fetch(`${url}/users/${user}/repos`, token);
//     const result = await response.json()

//     result.items.forEach(i=>{
//         const anchor = document.getElementById
//         divResult.appendChild(document.createTextNode(i.full_name))
//         divResult.appendChild(document.createElement("br"))
//     })
// }


// const section = document.querySelector('.container content');
// const template = document.querySelector('#repo');
// const clone = template.content.cloneNode(true);
// section.appendChild(clone)


