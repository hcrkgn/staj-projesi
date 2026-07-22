const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const API_URL = "http://127.0.0.1:5000/api/login";

form.addEventListener("submit", async function(event){

    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            Username:username,
            Password:password

        })

    });

    const result = await response.json();

    if(response.ok){

        localStorage.setItem("loggedIn","true");

        window.location.href="index.html";

    }else{

        message.textContent=result.error;

    }

});