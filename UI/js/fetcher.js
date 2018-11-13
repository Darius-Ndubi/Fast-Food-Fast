//get menu items
const t_body = document.getElementById("tbody");
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
      for (let item of data) {
        const brk = document.createElement("br");
        const tr = document.createElement("tr");
        // table data for quantity
        let td_quantity = document.createElement("td");
        let quantity = document.createElement("input");
        quantity.className = "order_quantity";
        quantity.type = "number";
        quantity.defaultValue = 0
        td_quantity.appendChild(quantity);

        // table data for action
        let td_action = document.createElement("td");
        let action = document.createElement("button");
        action.className = "button_create";
        action.innerHTML = "Order";
        action.onclick = createOrder
        td_action.appendChild(action);

        // Loop over values in item
        for (let value in item) {
          // Create td for each value
          let td_data = document.createElement("td");
          td_data.innerHTML = item[value];
          tr.appendChild(td_data);
        }
        // Add quantity and action to row
        tr.appendChild(td_quantity);
        tr.appendChild(td_action);
        t_body.appendChild(brk);
        t_body.appendChild(tr);
      }
    });
}

getMenu()

//

// function to create an order on the click of the order button
function createOrder() {
    let parent = this.parentElement.parentElement;
    let quantity = parent.getElementsByClassName('order_quantity')[0].value
	let food_id = parent.firstChild.innerHTML

	let list_food_id = [];
	let list_quantity = [];

	// append quantities to the arrays
	list_quantity.push(Number(quantity));
	list_food_id.push(Number(food_id));

	//console.log(list_quantity)
    const data = {
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
  	.then(res => [res.json(),res.status])
  
	.then(res => {
    if (res[1] === 201){
        res[0].then(res => {
        alert(JSON.stringify(res.message));
        redirect();
    })
    }
    else if (res[1] === 400) {
      res[0].then(res => {
      let error_message = document.getElementById("message_error1");
      error_message.innerHTML = res.message
  	})
    }
    else if (res[1] === 403) {
      res[0].then(res => {
      let error_message = document.getElementById("message_error1");
      error_message.innerHTML = res.message
  	})
    }
    else if (res[1] === 422) {
      res[0].then(res => {
        alert("Please login to create an order");
        login_redirect();
    })
  }
    else if (res[1] === 401) {
      res[0].then(res => {
        alert("You are not logged in");
        login_redirect();
      })
  }
});
	
}

function redirect() {
    window.location="user_profile.html";
    }

function login_redirect(){
  window.location ="signin.html"
}

// function to help locate food item
function quickSearch(){
  let userQuery = document.getElementById("menuSearch").value;
  let actualQuery = userQuery.toUpperCase();

//   console.log(actualQuery);

  let menuTable = document.getElementById("tbody");
  let menuItem = menuTable.getElementsByTagName("tr");
  for (let i = 0; i < menuItem.length; i++){
    let title = menuItem[i].getElementsByTagName("td")[2];
    if (title) {
      if (title.innerHTML.toUpperCase().indexOf(actualQuery) > -1) {
        menuItem[i].style.display = "";
      } else {
        menuItem[i].style.display = "none";
      }
    }
  }
}


// fucntion to help in paginations
function chop() {
  
}