// function to handel user logout

function userLogout(){
    //url for user logout
    fetch("https://fastfoodfastapi.herokuapp.com/api/v2/auth/logout",{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-type": "application/json;",
            //pass user token from sessions
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        }
    })

    .then(res => [res.json(),res.status])
    .then(res => {
        if (res[1] == 200){
             window.location ="signin.html"
        }
        else if (res[1] === 401) {
            res[0].then(res => {
            alert("You are not logged in");
            window.location ="signin.html"
            })
        }
        else if (res[1] === 422) {
            res[0].then(res => {
            alert("Please login to access this");
            window.location ="signin.html"
            })
        }
    })
}

document.querySelector("#leave").addEventListener("click",userLogout);