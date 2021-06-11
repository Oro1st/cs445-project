

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
            let getPost = document.getElementById("idBut");
            getPost.onclick = fetchUserPost;
            let userPost = document.getElementById("user-post");
            userPost.innerHTML = "";

            async function fetchUserPost() {
                let id = Number(getPost.value);
                let post = await fetch('https://jsonplaceholder.typicode.com/posts')
                let jsonPost = await post.json();
                let filterData = jsonPost.filter(elem => elem.userId === id)
                filterData.forEach(filterPost => {

                    console.log(filterPost)
                    let postId = filterPost.id;
                    let postTemplate = ` 
                                   <div class="col">
           
                                   <p>title: ${filterPost.title}</p>
                                   <p>body:${filterPost.body} </p>
                                   <button id="commentBut" value="${postId}">Get comment</button>
                                   <div id="comment-list"></div>
                                   `;
                    const divPost = document.createElement("diV-post");
                    divPost.innerHTML = postTemplate;
                    userPost.appendChild(divPost);
                    let postCommentBut = document.getElementById("commentBut");
                    postCommentBut.id = "commentDisplay";
                    let userComment = document.getElementById("comment-list");
                    userComment.id = "list-of-comments";
                })
                postCommentBut = document.getElementById("commentDisplay")
                postCommentBut.addEventListener("click", fetchComments, false);

                async function fetchComments() {

                    console.log(document.getElementById("commentDisplay").value)

                }

                async function fetchComments() {
                    const commentResult = await fetch("https://jsonplaceholder.typicode.com/comments");

                    const commentJson = await commentResult.json();
                    let comId = Number(postCommentBut.value);

                    from(commentJson)
                        .pipe(filter((commentDta) => commentDta.postId === comId))
                        .subscribe((commentDta) => {
                            displayComments(commentDta);
                        });

                    function displayComments(commentDta) {

                    }
                }
                console.log(commentDta);
                let commentTemplate = `     
                                              <div class="col">
                                              <h6 style="color: red;">Comment:</h6>
                                                  <p>name:  ${commentDta.name}</p>
                                                  <p>email:   ${postData.body} </p>
                                                  <p>comment: ${postData.body} </p>
                                              </div> ;    
                                          
    
                const postComment = document.createElement("post-comments");
                postComment.innerHTML = commentTemplate;
                userComment.append(postComment);
            }
        }
    }
}   