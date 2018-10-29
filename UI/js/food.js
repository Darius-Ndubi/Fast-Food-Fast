function addMenuItem(e) {
    e.preventDefault(); 
    let title = document.getElementById("title").value;
    let descri = document.getElementById("descri").value;
    let price = Number(document.getElementById("price").value);
    let type = document.getElementById("type").value;

    const data = {
        title:title,
        description:descri,
        price:price,
        type:type
    };
    //console.log(data)

    fetch("https://fastfoodfastapi.herokuapp.com/api/v2/menu",{
        method: "POST",
        mode: "cors",
        headers: {
        "Content-type": "application/json;",
        //pass user token from sessions
        "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        //from js object to string to the path
        body: JSON.stringify(data)
    })
    //   The First then returns the body of the response from server. In this case as a json object
    .then(res => [res.json(), res.status])
    .then(res => {
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
        else if (res[1] === 401) {
			res[0].then(res => {
                alert("Please login to create food item");
                window.location ="signin.html"
			})
        }
        else if (res[1] === 403) {
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
        else if (res[1] === 422) {
            res[0].then(res => {
              alert("Please login to add item into menu");
              window.location ="signin.html"
            })
        }
});
}

document
    //select add item button
    .querySelector(".add_food")
    //click listener when the add food is clicked addmenuitem is called
    .addEventListener("click",addMenuItem);


function redirect() {
    window.location="view_foods.html";
    }
    