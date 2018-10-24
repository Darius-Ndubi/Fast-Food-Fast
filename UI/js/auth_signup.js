// function to habndle user signup event
function usersignup(e) {
    e.preventDefault();
    //take data from the signup form
    var email = document.getElementById("email").value;
    var username = document.getElementById("uname").value;
    var password = document.getElementById("psswd").value;
    var confirm_password = document.getElementById("cpsswd").value;
  
    // object to hold use data
    var data = {
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
	.then(res => [res.json(), res.status]).then(res => {
		if (res[1] === 201){
			redirect();
		}
		res[0].then(res => {
			alert(JSON.stringify(res.message))});
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
module.export = usersignup;
