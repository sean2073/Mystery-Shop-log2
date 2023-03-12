var logoutEl = document.getElementById("logout"); 
async function logout() {
    console.log("logout button pressed");
    console.trace("lgout trace");
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/home');
        alert("you are logged out!")
        console.log(response.statusText);

    } else {
        alert(response.statusText);
    }
}

logoutEl.addEventListener('click', logout);