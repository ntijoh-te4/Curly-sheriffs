
function search (){
    // get GET /orgs/ntijoh-te4/repos
}

async function get_rep() {
    let user = "ntijoh-te4";
    let rep = "terminalen";
    let url = "https://api.github.com/search/{user}/{rep}";
    const response = await fetch(url);
    const result = await response.json();

    console.log(result);
}

get_rep();