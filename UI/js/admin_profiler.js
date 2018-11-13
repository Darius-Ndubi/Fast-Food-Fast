const t_body = document.getElementById("tbody")

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
    .then (res => [res.json(),res.status])

    .then(res => {
        if (res[1] === 200){
            res[0].then(data => {
            //alert(JSON.stringify(res.message));
            //redirect();
            //loop over allorders retrieved
            //let options = ["Processing","Cancelled","Complete"];
            for (let orders of data) {
                const tr = document.createElement('tr');
                // table column to edit status
                const brk = document.createElement("br");
                let td_action = document.createElement("td");
                let action = document.createElement("select");
                action.className = 'action';
                // admin options on an order
                const action1 = document.createElement("option");
                const action2 = document.createElement("option");
                const action3 = document.createElement("option");

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
                let td_edit = document.createElement("td");
                let edit  = document.createElement("button");
                edit.className = "button_create";
                edit.innerHTML = "Edit"
                edit.onclick = editOrderStatus
                td_edit.appendChild(edit);

                //loop to find details in eachh order
                for (let value in orders) {
                    // hold each value inside td tag
                    let user_order = document.createElement("td");
                    user_order.innerHTML = orders[value];
                    tr.appendChild(user_order);
                }
                // add the order status optons and order button to each order
                tr.appendChild(td_action);
                tr.appendChild(td_edit)
                t_body.appendChild(brk);
                // append each roa data to table bosy
                t_body.appendChild(tr);
                }
            })
        }
        else if (res[1] === 401) {
            alert("Please login to access this");
            window.location ="signin.html"
        }
        
        else if (res[1] === 422) {
            res[0].then(res => {
              alert("Please login to access this");
              window.location ="signin.html"
            })
        }
});
}

//call the function to retrieve all user data
getUsersHistory();

//function to edit status on click of edit button on admin profile
function editOrderStatus(){
    let parent = this.parentElement.parentElement;
    let order_id = parent.firstChild.innerHTML
    let status =  parent.getElementsByClassName('action')[0].value

    // create an object to hold the data
    const data = {
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
        alert(JSON.stringify(res.message))
        location.reload()
    });
}