var signupEl = document.getElementById("subBtn");
// var emailEl = document.getElementById("inputEmail").value;
// var passwordEl = document.getElementById("inputPassword").value;
var usernameEl = document.getElementById("usernameInput");
var emailEl = document.getElementById("emailInput");
var passwordEl = document.getElementById("passwordInput");



const submitLogin = async function(event) {
    event.preventDefault();
    console.log(usernameEl.value);
    console.log(emailEl.value);

    console.log(passwordEl.value);
  
    
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          username: usernameEl.value,
          email: emailEl.value,
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

  

signupEl.addEventListener("click", submitLogin);
