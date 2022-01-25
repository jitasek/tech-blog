const signupUser = async () => {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  // fetch the signup page
  try {
    let res = await fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const login = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (login.status === 200) {
        document.location.replace("/dashboard");
      } else {
        alert("Signup failed");
      }
    } else {
      alert("Something went wrong on server while singing up");
    }
  } catch (error) {
    alert("Exception while sending the request");
  }
};
