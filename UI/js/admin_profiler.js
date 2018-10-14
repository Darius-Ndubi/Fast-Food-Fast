var t_body = document.getElementById("tbody")

// fucntion to get all  users orders
function getUsersHistory() {
    fetch("https://fastfoodfastapi.herokuapp.com/api/v2/orders/",{
        method: "GET",
        mode: "cors",
        headers:{
            "Content-type":"application/json",
            "Authorization":"Bearer " + sessionStorage.getItem("token")
        }
    })
    .then ( res => res.json())

    .then (data => {
        //loop over allorders retrieved
        for (var orders of data) {
            var tr = document.createElement('tr');
            //loop to find details in eachh order
            for (var value in orders) {
                // hold each value inside td tag
                var user_order = document.createElement("td");
                user_order.innerHTML = orders[value];
                tr.appendChild(user_order);
            }
            // append each roa data to table bosy
            t_body.appendChild(tr);
        }
    });
}

//call the function to retrieve all user data
getUsersHistory();