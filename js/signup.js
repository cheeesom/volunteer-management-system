const signUpForm = document.getElementById("signup-form");
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const role = signUpForm.dataset.role;

  const response = await fetch(
    "https://vms-vxae.onrender.com/api/v1/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        role,
      }),
    },
  );

  const data = await response.json();
  alert(JSON.stringify(data, null, 2));
  if (response.ok) {
    alert("Account created successfully!");
  } else {
    alert(data.message);
  }
});
