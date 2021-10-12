const url = "https://api.github.com";

const user = "ntijoh-axel-ostan";
// const user = document.querySelector('input').value;
const token = { method: 'GET', headers: { 'Authorization': 'token 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' } };
const id = "409177162";

function api() {
    async function user_info(){
        let getrequest = await fetch(`${url}/user`, token);
        let fetched = await getrequest.json();
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
        console.log(fetched);
        return fetched;
    }

    async function repos_path() {
        const getrequest = await fetch(`${url}/repositories/${id}/contents`, token);
        const fetched = await getrequest.json();
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




// const section = document.querySelector('.container content');
// const template = document.querySelector('#repo');
// const clone = template.content.cloneNode(true);
// section.appendChild(clone)

