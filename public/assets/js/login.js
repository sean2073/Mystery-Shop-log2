var loginEl = document.getElementById("login");
// var emailEl = document.getElementById("inputEmail").value;
// var passwordEl = document.getElementById("inputPassword").value;
var usernameEl = document.getElementById("inputUsername");
var passwordEl = document.getElementById("inputPassword");



const submitLogin = async function(event) {
    event.preventDefault();
    console.log(usernameEl.value);
    console.log(passwordEl.value);
  
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username: usernameEl.value,
          password: passwordEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to login');
      }
    
  };

  

loginEl.addEventListener("click", submitLogin);
