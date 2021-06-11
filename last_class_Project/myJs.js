

window.onload = function pageOnload() {
    const search = document.getElementById("search-user");
    const { from } = rxjs;
    const { filter } = rxjs.operators;
    search.onclick = printUser;

    // print user function
    function printUser() {
        const userId = Number(document.getElementById("user-id").value);
        let userInfo = document.getElementById("user-list");
        fetchUser();

        // getting user information

        async function fetchUser() {
            userInfo.innerHTML = "";
            let result = await fetch("https://jsonplaceholder.typicode.com/users");
            let userFetch = await result.json();
            const user = from(userFetch);
            user
                .pipe(filter((element) => element.id === userId))
                .subscribe((data) => {
                    printUserData(data);
                });
        }

