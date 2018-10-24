function addMenuItem(e) {
    e.preventDefault(); 
    var title = document.getElementById("title").value;
    var descri = document.getElementById("descri").value;
    var price = Number(document.getElementById("price").value);
    var type = document.getElementById("type").value;

    var data = {
        title:title,
        description:descri,
        price:price,
        type:type
    };
    //console.log(data)

    fetch("https://fastfoodfastapi.herokuapp.com/api/v2/menu",{
        method: "POST",
        mode: "cors",
        headers: {
        "Content-type": "application/json;",
        //pass user token from sessions
        "Authorization": "Bearer " + sessionStorage.getItem('token')
        },
        //from js object to string to the path
        body: JSON.stringify(data)
    })
    //   The First then returns the body of the response from server. In this case as a json object
    .then(res => res.json())

    .then(res =>  {
        //show the user some message
        alert(JSON.stringify(res.message))
    });
}

document
    //select add item button
    .querySelector(".add_food")
    //click listener when the add food is clicked addmenuitem is called
    .addEventListener("click",addMenuItem);
