const t_body = document.getElementById("tbody");

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
    .then (res => [res.json(),res.status])

    .then (res => {
        if (res[1] === 403) {
            window.location = "admin_profile.html"
        }
        else if (res[1] === 200){
            res[0].then(data => {
            // loop over the orders in data
            for (let orders of data) {
                const tr =  document.createElement("tr");
                // loop to find the values in an order
                for (let value in orders) {
                    //have each value inside td tag
                    let order_data =  document.createElement("td");
                    order_data.innerHTML = orders[value];
                    tr.appendChild(order_data);
                }
                // append each row of data to the table body
                t_body.appendChild(tr);
                }
            })
        }
        else if (res[1] === 422) {
            alert("Please login to access this");
            window.location ="signin.html"
        }
        else if (res[1] === 401) {
                alert("Please login to access this");
                window.location ="signin.html"
            }
    });
}

// get user history
getUserHistory();