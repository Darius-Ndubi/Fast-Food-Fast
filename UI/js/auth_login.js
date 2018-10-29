// function to handel user login
function userlogin(e) {
	e.preventDefault();
	let email = document.getElementById("email").value;
	let password = document.getElementById("psswd").value;

	const data = {
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
        if (res[1] === 200){
            res[0].then(res => {
				sessionStorage.setItem('token',res.Token)
				alert(JSON.stringify(res.message));
				redirect();
		})
        }
        else if (res[1] === 400) {
			res[0].then(res => {
				let error_message = document.getElementById("message_error");
				error_message.innerHTML = res.message
			})
		}
		else if (res[1] === 403) {
			res[0].then(res => {
				let error_message = document.getElementById("message_error");
				error_message.innerHTML = res.message
			})
		}
		else if (res[1] === 401) {
			res[0].then(res => {
				let error_message = document.getElementById("message_error");
				error_message.innerHTML = res.message
			})
		}
});
}

document
	.querySelector(".signin")
	//   Add click listener. When the signup button is clicked, userlogin is called
    .addEventListener("click", userlogin);
    
// fcuntion to switch user to their profile
function redirect() {
    window.location="user_profile.html";
    }