let userContainer = document.querySelector(".user-container");

function getUsersData(URL){
    fetch(URL)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        data.forEach(user => {
            displayUser(user);
        });
    })
    .catch((err)=>{
        console.log(err);
    });
}

function displayUser(user){
    let li = document.createElement("li");
    li.setAttribute("class", "user-item");

    li.innerHTML = `
        <div class="icon">👤</div>
        <div class="details">
            <strong>${user.name}</strong>
            <p>📧 ${user.email}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `;

    userContainer.appendChild(li);
}

getUsersData("https://jsonplaceholder.typicode.com/users");