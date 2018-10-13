var t_body = document.getElementById("tbody");

// Get menu items
function getMenu() {
fetch("https://fastfoodfastapi.herokuapp.com/api/v2/menu", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-type": "application/json;"
    }
  })
  	// return response body from server
    .then(res => res.json())
	  
	//
    .then(data => {
      	// Loop over items in data
      	for (var item of data) {
			// Create table row
			var tr = document.createElement("tr");
			// Loop over values in item
			for (var value in item) {
				// Create td for each value
				var td_data = document.createElement("td");
				td_data.innerHTML = item[value];
				tr.appendChild(td_data);
			}
        t_body.appendChild(tr);
      }
    });
}

// Call the function to get the menu
getMenu();

