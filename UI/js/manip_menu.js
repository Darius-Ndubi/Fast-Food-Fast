// get all menu items for editing or deletion
const t_body = document.getElementById("tbody");

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
        for (let item of data) {
            const tr = document.createElement("tr");
            //table edit button
            const brk = document.createElement("br");
            let td_edit = document.createElement("td");
            let edit = document.createElement("button");
            edit.className="button_edit";
            edit.innerHTML = "Edit";
            edit.onclick = editFoodButton
            td_edit.appendChild(edit);

            // table delete button
            let to_delete = document.createElement("td");
            let delete_item = document.createElement("button");
            delete_item.className='button_delete';
            delete_item.innerHTML = "Delete";
            delete_item.onclick = deleteFoodButton
            to_delete.appendChild(delete_item);

            for (let value in item) {
                let td_data = document.createElement("td");
                td_data.innerHTML = item[value];
                tr.appendChild(td_data);
            }
            //add edit button to the rows
            tr.appendChild(td_edit);
            tr.appendChild(to_delete);
            t_body.appendChild(brk);
            t_body.appendChild(tr);
        }
    });
}

getMenuItems();

// function to collect food id and load edit_food page
function editFoodButton(e) {
    let parent = this.parentElement.parentElement;
    let food_id = parent.firstChild.innerHTML

    //store food id in session for more use
    sessionStorage.setItem('food_id',food_id)
    //load the edit food window after getting the id
    window.location="edit_food.html";
}


// function to update food item details on click
function editFood(e){
    // prevent window from reloading
    e.preventDefault(); 
    let imageData = document.getElementById("itemImage").value;
    let title = document.getElementById("title").value;
    let descri = document.getElementById("descri").value;
    let price = Number(document.getElementById("price").value);
    let type = document.getElementById("type").value;
    food_id = sessionStorage.getItem("food_id")
    
    const data = {
        image:imageData,
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
        if (res[1] === 200){
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
              alert("Please login to edit menu item");
              window.location ="signin.html"
            })
        }
        
});         
};

document
    //select edit button
    .querySelector(".button_create")
    //click listners when the edit food button is clicked
    .addEventListener("click",editFood);


//function to redirect to food menu
function redirect(){
    window.location = "view_foods.html";
}


function deleteFoodButton() {
    let parent = this.parentElement.parentElement;
    let food_id = parent.firstChild.innerHTML

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
                res[0].then(res => {
                    alert(JSON.stringify(res.message));
                    //reload current window
                    location.reload()
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
                  alert("Please login to delete item from menu");
                  window.location ="signin.html"
                })
            }
        });
}