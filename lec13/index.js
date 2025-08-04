// let userData = document.getElementsByClassName("user");
function getUserData(URL){
    fetch(URL)
    .then((res)=>{
        console.log(res);
        return res.json()
    })
    .then((data)=>{
        console.log(data);
        
        data.forEach(users=>{
            const p = document.createElement("p")
            p.textContent = `${users.name}`;
            document.body.appendChild(p);
        });
    })
    .catch((err)=>{
        console.log(err);
    })    
}
let url = `https://jsonplaceholder.typicode.com/users`;
getUserData(url);