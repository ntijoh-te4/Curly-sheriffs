// function search (){
//     // get GET /orgs/ntijoh-te4/repos
// }

// async function get_rep() {
//     let user = "ntijoh-te4";
//     let rep = "terminalen";
//     let url = "https://api.github.com/search/{user}/{rep}";
//     const response = await fetch(url);
//     const result = await response.json();

//     console.log(result);
// }

// get_rep();


































































const btnRepos = document.getElementById("searchRepos")
const divResult = document.getElementById("divResult")

btnRepos.addEventListener("click", getRepos)
async function getRepos() {
    const url = "https://api.github.com/users/ntijoh-axel-ostan?q=stars:>0"
    const response = await fetch(url)
    const result = await response.json()

    result.items.forEach(i=>{
        const anchor = document.getElementById
        divResult.appendChild(document.createTextNode(i.full_name))
        divResult.appendChild(document.createElement("br"))
    })
}