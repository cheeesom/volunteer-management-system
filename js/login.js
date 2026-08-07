function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show error message
function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);

  input.classList.add("error");
  input.classList.remove("success");
  errorEl.textContent = message;
}

// Show success state
function showSuccess(inputId) {
  const input = document.getElementById(inputId);
  input.classList.remove("error");
  input.classList.add("success");
}

// Clear error
function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const errorEl = document.getElementById(errorId);

  input.classList.remove("error");
  errorEl.textContent = "";
}

// LOGIN FORM SUBMISSION

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  let hasErrors = false;

  // Validate email
  if (!email) {
    showError("email", "emailError", "❌ Email is required");
    hasErrors = true;
  } else if (!validateEmail(email)) {
    showError("email", "emailError", "❌ Please enter a valid email address");
    hasErrors = true;
  } else {
    showSuccess("email");
  }

  // Validate password
  if (!password) {
    showError("password", "passwordError", "❌ Password is required");
    hasErrors = true;
  } else if (password.length < 6) {
    showError(
      "password",
      "passwordError",
      "❌ Password must be at least 6 characters",
    );
    hasErrors = true;
  } else {
    showSuccess("password");
  }

  // If no errors, proceed
  if (!hasErrors) {
    // Save "remember me" preference
    if (rememberMe) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("rememberMe");
    }

    // Show success message
    showSuccessMessage(`You have successfully logged in as ${email}`);

    // Clear form
    this.reset();
  }
});

// REAL-TIME EMAIL VALIDATION

document.getElementById("email").addEventListener("blur", function () {
  if (this.value && !validateEmail(this.value)) {
    showError("email", "emailError", "⚠️ Invalid email format");
  } else if (this.value) {
    clearError("email", "emailError");
  }
});

// REMEMBER ME FUNCTIONALITY

window.addEventListener("load", function () {
  // Check if user was previously remembered
  const rememberMe = localStorage.getItem("rememberMe");
  const userEmail = localStorage.getItem("userEmail");

  if (rememberMe === "true" && userEmail) {
    document.getElementById("email").value = userEmail;
    document.getElementById("rememberMe").checked = true;
  }
});

// SUCCESS MESSAGE MODAL

function showSuccessMessage(message) {
  const modal = document.getElementById("successModal");
  document.getElementById("successMessage").textContent = message;
  modal.style.display = "flex";
}

function closeSuccess() {
  document.getElementById("successModal").style.display = "none";
}

// Close modal when clicking outside
document.getElementById("successModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeSuccess();
  }
});

// GOOGLE LOGIN (Placeholder)

document.querySelector(".google-login").addEventListener("click", function (e) {
  e.preventDefault();
  alert("Google login integration coming soon!");
});

// FORGOT PASSWORD LINK

document
  .querySelector(".forgot-password")
  .addEventListener("click", function (e) {
    e.preventDefault();
    alert("Forgot password page coming soon!");
  });

// SIGN UP LINK

document
  .querySelector(".signup-link a")
  .addEventListener("click", function (e) {
    e.preventDefault();
    alert("Sign up page coming soon!");
  });
