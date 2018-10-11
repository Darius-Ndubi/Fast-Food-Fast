

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
      .then(res => res.json())
      // The Second then is where you can manipulate response from server.
      .then(res => alert(JSON.stringify(res.message)));
  }
  
  var sign_up = document
    // Select the sign up button
    .querySelector(".signup")
    // Add click listener. When the signup button is clicked, usersignup is called
    .addEventListener("click", usersignup);
  
  

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
        .then(res => res.json())
        
        .then(res =>  {
          //store user token in session
          sessionStorage.setItem('token', res.Token)
          alert(JSON.stringify(res.message))
          //console.log(sessionStorage.getItem('token'))
      });

    };
    
    var sign_in = document
    .querySelector(".signup")
    //   Add click listener. When the signup button is clicked, userlogin is called
    .addEventListener("click", userlogin);