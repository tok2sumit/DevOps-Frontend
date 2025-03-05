// Java Script Method to handle Login request from UI:
function sendAuthRequest(endpoint) {
    // Get username and password from the current page
    const username = document.getElementById("username")?.value;
    const password = document.getElementById("password")?.value;
    console.log(username, password)

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    const payload = { username, password };

    const url = `http://localhost:8081/api/${endpoint}?username=${username}&password=${password}`;

    fetch(url, { method: "GET" }) 
    .then(response => response.text())
    .then(data => {
        document.getElementById("response").innerText = "Server Response: " + data;
    })
    .catch(error => {
        document.getElementById("response").innerText = "Error: " + error.message;
    });
}

// Function for login
function Login() {
    sendAuthRequest("Login");
}

// Function for signup
function signup() {
    sendAuthRequest("signup");
}