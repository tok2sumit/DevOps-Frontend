// Java Script Method to handle Login request from UI:
function SendLoginRequest(endpoint) {
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


async function Register_User(endpoint) {
    console.log("Inside user registration");

    const userData = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confermpassword").value,
        mobileNo: document.getElementById("mobileno").value,
        address: document.getElementById("address").value
    };

    try {
        const response = await fetch(`http://localhost:8081/auth/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        // ✅ Handle response properly
        const result = await response.json();

        if (response.ok) {
            alert(`✅ Success: ${result.message}`);
        } else {
            alert(`❌ Error: ${result.error}`);
        }
    } catch (error) {
        console.error("Registration failed:", error);
        alert("❌ Registration failed. Please try again.");
    }
}


// Function for login
function Login() {
    event.preventDefault();
    SendLoginRequest("auth/login");
}

// Function for signup
function signup() {
    event.preventDefault();
    console.log("inside signup javascript method.")
    Register_User("register");
}