const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const API_URL = "https://library-system-f7j8.onrender.com/api/register";

form.addEventListener("submit", async function(event){

    event.preventDefault();

    message.style.display = "none";
    message.textContent = "";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

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

   message.style.display = "block";

   if(response.ok){
       message.style.color = "#155724";
       message.style.backgroundColor = "#d4edda";
       message.style.border = "1px solid #c3e6cb";

       
    }else{
       message.style.color = "#b00020";
       message.style.backgroundColor = "#fdecea";
       message.style.border = "1px solid #f5c2c7";
    }

    message.textContent = result.message || result.error;
});