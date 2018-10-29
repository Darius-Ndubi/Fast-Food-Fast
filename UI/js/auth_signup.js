// function to habndle user signup event
function usersignup(e) {
    e.preventDefault();
    //take data from the signup form
    let email = document.getElementById("email").value;
    let username = document.getElementById("uname").value;
    let password = document.getElementById("psswd").value;
    let confirm_password = document.getElementById("cpsswd").value;
  
    // object to hold use data
	const data = {
		email: email,
		username: username,
		password: password,
		confirm_password: confirm_password
    };
    //use fetch to pass data to the API
    fetch("https://fastfoodfastapi.herokuapp.com/api/v2/auth/signup", {
		method: "POST",
		mode: "cors",
		headers: {
		"Content-type": "application/json;"
		},
	// convert the data to string
	body: JSON.stringify(data)
	})
	
	// The First then returns the body of the response from server.
	.then(res => [res.json(), res.status])
	.then(res => {
		//console.log(result);
		if (res[1] === 201){
			res[0].then(res => {
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
		else if (res[1] === 409) {
			res[0].then(res => {
				let error_message = document.getElementById("message_error");
				error_message.innerHTML = res.message
			})
		}
});
}
  
document
    // Select the sign up button
    .querySelector(".signup")
    // Add click listener. When the signup button is clicked, usersignup is called
    .addEventListener("click", usersignup);


function redirect() {
	window.location="signin.html";
	}



//export functions to be used in tests
//module.export = usersignup;
