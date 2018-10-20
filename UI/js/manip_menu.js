// get all menu items for editing or deletion
var t_body = document.getElementById("tbody");

// funcyion to get menu item and add the edit buttom to them
function getMenuItems() {
    fetch("https://fastfoodfastapi.herokuapp.com/api/v2/menu", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
    })
    .then(res => res.json())

    .then(data => {
        for (var item of data) {
            var tr = document.createElement("tr");
            //table edit button
            var td_edit = document.createElement("td");
            var edit = document.createElement("button");
            edit.className="button_edit";
            edit.innerHTML = "Edit";
            edit.onclick = editFoodButton
            td_edit.appendChild(edit);

            // table delete button
            var to_delete = document.createElement("td");
            var delete_item = document.createElement("button");
            delete_item.className='button_delete';
            delete_item.innerHTML = "Delete";
            delete_item.onclick = deleteFoodButton
            to_delete.appendChild(delete_item);

            for (var value in item) {
                var td_data = document.createElement("td");
                td_data.innerHTML = item[value];
                tr.appendChild(td_data);
            }
            //add edit button to the rows
            tr.appendChild(td_edit);
            tr.appendChild(to_delete);

            t_body.appendChild(tr);
        }
    });
}

getMenuItems();

// function to collect food id and load edit_food page
function editFoodButton(e) {
    var parent = this.parentElement.parentElement;
    var food_id = parent.firstChild.innerHTML

    //store food id in session for more use
    sessionStorage.setItem('food_id',food_id)
    //load the edit food window after getting the id
    window.location="edit_food.html";
}


// function to update food item details on click
function editFood(e){
    // prevent window from reloading
    e.preventDefault(); 
    var title = document.getElementById("title").value;
    var descri = document.getElementById("descri").value;
    var price = Number(document.getElementById("price").value);
    var type = document.getElementById("type").value;
    food_id = sessionStorage.getItem("food_id")
    
    var data = {
        title:title,
        description:descri,
        price:price,
        type:type
        };

    //url to api + food_id
	fetch("https://fastfoodfastapi.herokuapp.com/api/v2/menu/" + food_id,{
        method: "PUT",
		mode: "cors",
		headers: {
		  "Content-type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
    //retrieve data in a list
    .then(res => [res.json(), res.status])

    // if the status is 200, redirect to view all foods
    //else show the message in item 0
    .then(res => {
        if(res[1] === 200){
            redirect();
        }
        res[0].then(res => {
            alert(JSON.stringify(res.message))});
        });          
};

var edit_food = document
    //select edit button
    .querySelector(".button_create")
    //click listners when the edit food button is clicked
    .addEventListener("click",editFood);


//function to redirect to food menu
function redirect(){
    window.location = "view_foods.html";
}


function deleteFoodButton() {
    var parent = this.parentElement.parentElement;
    var food_id = parent.firstChild.innerHTML

    //url to api + food_id
    fetch("https://fastfoodfastapi.herokuapp.com/api/v2/menu/" + food_id,{
        method: "DELETE",
		mode: "cors",
		headers: {
		  "Content-type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        }
        })
        //retrieve response from the server
        .then(res => [res.json(),res.status])
        .then(res => {
            if (res[1] === 200){
                //reload current window
                location.reload()
            }
            res[0].then(res => {
                alert(JSON.stringify(res.message))});

        });
}