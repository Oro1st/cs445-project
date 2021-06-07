window.onload = function () {
    document.getElementById("search-bu").onclick = fetchUser
    async function fetchUser() {
        let userId = Number(document.getElementById("input-text").value)
        let result = await fetch("https://jsonplaceholder.typicode.com/users");
        let userFetch = await result.json();
        let filterUser = userFetch.filter(u => u.id === userId)
        console.log(filterUser)

    }
}