//get menu items
var t_body = document.getElementById("tbody");
function getMenu(e) {
  fetch("https://fastfoodfastapi.herokuapp.com/api/v2/menu", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(res => res.json())

    .then(data => {
      // Loop over items in data
      for (var item of data) {
        var tr = document.createElement("tr");
        // table data for quantity
        var td_quantity = document.createElement("td");
        var quantity = document.createElement("input");
        quantity.className = "order_quantity";
        quantity.type = "number";
        quantity.defaultValue = 0
        td_quantity.appendChild(quantity);

        // table data for action
        var td_action = document.createElement("td");
        var action = document.createElement("button");
        action.className = "button_create";
        action.innerHTML = "Order";
        action.onclick = createOrder
        td_action.appendChild(action);

        // Loop over values in item
        for (var value in item) {
          // Create td for each value
          var td_data = document.createElement("td");
          td_data.innerHTML = item[value];
          tr.appendChild(td_data);
        }
        // Add quantity and action to row
        tr.appendChild(td_quantity);
        tr.appendChild(td_action);

        t_body.appendChild(tr);
      }
    });
}

getMenu();

// function to create an order on the click of the order button
function createOrder() {
    var parent = this.parentElement.parentElement;
    var quantity = parent.getElementsByClassName('order_quantity')[0].value
	var food_id = parent.firstChild.innerHTML

	var list_food_id = [];
	var list_quantity = [];

	// append quantities to the arrays
	list_quantity.push(Number(quantity));
	list_food_id.push(Number(food_id));

	//console.log(list_quantity)
    var data = {
        quantity:list_quantity,
        food_id:list_food_id
	};
	
	//url to api
	fetch("https://fastfoodfastapi.herokuapp.com/api/v2/users/orders",{
		method: "POST",
		mode: "cors",
		headers: {
		  "Content-type": "application/json",
		  "Authorization": "Bearer " + sessionStorage.getItem("token")
		},
		body: JSON.stringify(data)
	})
	.then(res => res.json())
	.then(res => alert(JSON.stringify(res.msg)));
	
}
