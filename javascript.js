function search (){
    // get GET /orgs/ntijoh-te4/repos
}

const url = "https://api.github.com";
const user = "ntijoh-axel-ostan";
const token = { method: 'GET', headers: { 'Authorization': 'token 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' } };
const id = "409177162";
// class api {
//     static async user_info() {
//         const getrequest = await fetch(`${url}/user`);
//         const fetched = await getrequest.json();
//         console.log(fetched);
//         return fetched;
//     }

//     static async users(){
//         const getrequest = await fetch(`${url}/user/${user}`);
//         const fetched = await getrequest.json();
//         console.log(fetched);
//         return fetched;
        
//     }
    
//     static async repositories(){
//         const getrequest = await fetch(`${url}/user/${user}/repos`);
//         const fetched = await getrequest.json();
//         console.log(fetched);
//         return fetched;
//     }
    
// }

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
        console.log(fetched);
        return fetched;
    }



    user_info();
    users();
    repositories();
    repository();
}
api();








