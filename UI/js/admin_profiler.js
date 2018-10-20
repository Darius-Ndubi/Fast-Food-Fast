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
        var options = ["Processing","Cancelled","Complete"];
        for (var orders of data) {
            var tr = document.createElement('tr');
            // table column to edit status
            var td_action = document.createElement("td");
            var action = document.createElement("select");
            action.className = 'action';
            // admin options on an order
            var action1 = document.createElement("option");
            var action2 = document.createElement("option");
            var action3 = document.createElement("option");

            action1.value = "Processing";
            action1.text = "Processing";

            action2.value = "Cancelled";
            action2.text = "Cancelled";

            action3.value = "Complete";
            action3.text = "Complete";
            
            action.add(action1);
            action.add(action2);
            action.add(action3);

            //console.log(action)
            td_action.appendChild(action)

            //table column to hold the button
            var td_edit = document.createElement("td");
            var edit  = document.createElement("button");
            edit.className = "button_create";
            edit.innerHTML = "Edit"
            edit.onclick = editOrderStatus
            td_edit.appendChild(edit);

            //loop to find details in eachh order
            for (var value in orders) {
                // hold each value inside td tag
                var user_order = document.createElement("td");
                user_order.innerHTML = orders[value];
                tr.appendChild(user_order);
            }
            // add the order status optons and order button to each order
            tr.appendChild(td_action);
            tr.appendChild(td_edit)

            // append each roa data to table bosy
            t_body.appendChild(tr);
        }
    });
}

//call the function to retrieve all user data
getUsersHistory();

//function to edit status on click of edit button on admin profile
function editOrderStatus(){
    var parent = this.parentElement.parentElement;
    var order_id = parent.firstChild.innerHTML
    var status =  parent.getElementsByClassName('action')[0].value

    // create an object to hold the data
    var data = {
        status: status
    };
    //url to api
    fetch("https://fastfoodfastapi.herokuapp.com/api/v2/orders/" + order_id, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-type" : "application/json",
            "Authorization" : "Bearer " + sessionStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    .then (res => res.json())

    .then (res => {
        alert(JSON.stringify(res.msg))
    });
}