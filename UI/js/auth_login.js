// function to handel user login
function userlogin(e) {
	e.preventDefault();
	var email = document.getElementById("email").value;
	var password = document.getElementById("psswd").value;

	var data = {
	email: email,
	password: password
	};

	fetch("https://fastfoodfastapi.herokuapp.com/api/v2/auth/login", {
	method: "POST",
	mode: "cors",
	headers: {
		"Content-type": "application/json;"
	},
	body: JSON.stringify(data)
	})
    .then(res => [res.json(), res.status])
    .then(res => {
        if (res[1] == 200){
            console.log(res[0])
            Redirect();
        }
        res[0].then(res => {
            sessionStorage.setItem('token',res.Token)
            alert(JSON.stringify(res.message))}); 
        });
};

var sign_in = document
	.querySelector(".signin")
	//   Add click listener. When the signup button is clicked, userlogin is called
    .addEventListener("click", userlogin);
    
// fcuntion to switch user to their profile
function Redirect() {
    window.location="user_profile.html";
    }