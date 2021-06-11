

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

        function printUserData(data) {
            let latid = data.address.geo.lat;
            let long = data.address.geo.lng;
            let currentLocation;
            getCurrentLocation();

            async function getCurrentLocation() {
                let resultLocations = await fetch(
                    "https://mapquestapi.com/geocoding/v1/reverse?key=q5N7YWFQnHlQCfx0KyD5d1qoATAAFezV&location=" +
                    latid +
                    "," +
                    long
                );
                let jsonLocation = await resultLocations.json();
                currentLocation = jsonLocation.results[0].locations[0].street;
                if (currentLocation === "") {
                    navigator.geolocation.getCurrentPosition(latLong, failToLoad);
                }

                function latLong(position) {
                    latid = position.coords.latitude;
                    long = position.coords.longitude;
                    fetchCurrentLocation();
                }

                function failToLoad() {
                    alert("current locations failed to load");
                }
                console.log(currentLocation);
            }