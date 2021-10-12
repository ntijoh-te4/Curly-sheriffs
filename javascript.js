// function search (){
//     // get GET /orgs/ntijoh-te4/repos
// }

const url = "https://api.github.com";
const user = "ntijoh-axel-ostan";
const token = { method: 'GET', headers: { 'Authorization': 'token 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' } };
const id = "409177162";

function api() {
    
    async function user_info(){
        const getrequest = await fetch(`${url}/user`, token);
        const fetched = await getrequest.json();
        console.log(fetched);
        return fetched;
    }

    async function users() {
        const getrequest = await fetch(`${url}/users/${user}`, token);
        const fetched = await getrequest.json();
        console.log(fetched);
        return fetched;
    }

    async function repositories() {
        const getrequest = await fetch(`${url}/users/${user}/repos`, token);
        const fetched = await getrequest.json();
        console.log(fetched);
        return fetched;
    }

    async function repository() {
        const getrequest = await fetch(`${url}/repositories/${id}`, token);
        const fetched = await getrequest.json();
        const result = await esponse.json()
        console.log(fetched);

        result.items.forEach(i=>{
            const anchor = document.getElementById("a")
            anchor.href = i.html_url;
            anchor.textContent = i.full_name;
            divResult.appendChild(document.createTextNode(anchor))
            divResult.appendChild(document.createElement("br"))
        })
        return fetched;
















        
    }



    user_info();
    users();
    repositories();
    repository();
}
api();

// const btnRepos = document.getElementById("searchRepos")
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


