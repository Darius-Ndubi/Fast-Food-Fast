var t_body = document.getElementById("tbody");

// fuction to retrieve user order data histsory from db and tabulise it
function getUserHistory() {
    fetch("https://fastfoodfastapi.herokuapp.com/api/v2/users/orders",{
        method: "GET",
        mode: "cors",
        headers:{
            "Content-type": "application/json;",
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
    })
    .then (res => res.json())

    .then (data => {
        // loop over the orders in data
        for (var orders of data) {
            var tr =  document.createElement("tr");
            // loop to find the values in an order
            for (var value in orders) {
                //have each value inside td tag
                var order_data =  document.createElement("td");
                order_data.innerHTML = orders[value];
                tr.appendChild(order_data);
            }
            // append each row of data to the table body
            t_body.appendChild(tr);
        }
    });

}

// get user history
getUserHistory();