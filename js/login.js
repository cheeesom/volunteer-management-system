/**
 * Login — POST /api/v1/auth/login
 * Body: { email, password }
 * Response: { success, message, data: { user, token } }
 */
(function () {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const rememberMeInput = document.getElementById("rememberMe");
  const submitBtn = form.querySelector(".login-button");
  const formErrorEl = document.getElementById("loginFormError");

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input) {
      input.classList.add("error");
      input.classList.remove("success");
    }
    if (errorEl) errorEl.textContent = message;
  }

  function showSuccess(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.classList.remove("error");
    input.classList.add("success");
  }

  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input) input.classList.remove("error");
    if (errorEl) errorEl.textContent = "";
  }

  function setFormError(message) {
    if (!formErrorEl) {
      if (message) alert(message);
      return;
    }
    formErrorEl.textContent = message || "";
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.dataset.originalText =
      submitBtn.dataset.originalText || submitBtn.textContent;
    submitBtn.textContent = isLoading ? "Logging in..." : submitBtn.dataset.originalText;
  }

  function dashboardForRole(role) {
    if (role === "COORDINATOR") return "./coordinator/dashboard.html";
    if (role === "ADMIN") return "./dashboard.html";
    return "./dashboard.html";
  }

  function showSuccessMessage(message) {
    const modal = document.getElementById("successModal");
    const msgEl = document.getElementById("successMessage");
    if (msgEl) msgEl.textContent = message;
    if (modal) modal.style.display = "flex";
  }

  window.closeSuccess = function closeSuccess() {
    const modal = document.getElementById("successModal");
    if (modal) modal.style.display = "none";
    const user = window.VolunityAPI?.getStoredUser?.();
    window.location.href = dashboardForRole(user?.role);
  };

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    setFormError("");

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeInput.checked;
    let hasErrors = false;

    if (!email) {
      showError("email", "emailError", "Email is required");
      hasErrors = true;
    } else if (!validateEmail(email)) {
      showError("email", "emailError", "Please enter a valid email address");
      hasErrors = true;
    } else {
      clearError("email", "emailError");
      showSuccess("email");
    }

    if (!password) {
      showError("password", "passwordError", "Password is required");
      hasErrors = true;
    } else if (password.length < 6) {
      showError(
        "password",
        "passwordError",
        "Password must be at least 6 characters",
      );
      hasErrors = true;
    } else {
      clearError("password", "passwordError");
      showSuccess("password");
    }

    if (hasErrors) return;

    if (!window.VolunityAPI) {
      setFormError("API helper failed to load. Refresh and try again.");
      return;
    }

    const { apiRequest, saveAuthSession } = window.VolunityAPI;
    setLoading(true);

    try {
      const { response, data } = await apiRequest("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok || !data?.success) {
        const message =
          data?.message || "Invalid email or password. Please try again.";
        setFormError(message);
        showError("password", "passwordError", "");
        showError("email", "emailError", "");
        return;
      }

      const token = data?.data?.token;
      const user = data?.data?.user;

      saveAuthSession({ token, user });

      if (rememberMe) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("rememberMe");
      }

      const displayName = user?.firstName
        ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
        : email;

      showSuccessMessage(
        data?.message
          ? `${data.message}. Welcome back, ${displayName}!`
          : `Welcome back, ${displayName}!`,
      );
    } catch (err) {
      console.error("Login error:", err);
      setFormError(
        "Unable to reach the server. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  });

  emailInput.addEventListener("blur", function () {
    if (this.value && !validateEmail(this.value)) {
      showError("email", "emailError", "Invalid email format");
    } else if (this.value) {
      clearError("email", "emailError");
    }
  });

  window.addEventListener("load", function () {
    const rememberMe = localStorage.getItem("rememberMe");
    const userEmail = localStorage.getItem("userEmail");
    if (rememberMe === "true" && userEmail) {
      emailInput.value = userEmail;
      rememberMeInput.checked = true;
    }
  });

  const successModal = document.getElementById("successModal");
  if (successModal) {
    successModal.addEventListener("click", function (e) {
      if (e.target === this) window.closeSuccess();
    });
  }

  const googleBtn = document.querySelector(".google-login");
  if (googleBtn) {
    googleBtn.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Google login integration coming soon!");
    });
  }

  const forgotLink = document.querySelector(".forgot-password");
  if (forgotLink) {
    forgotLink.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Forgot password page coming soon!");
    });
  }
})();
