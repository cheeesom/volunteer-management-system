/**
 * Shared signup handler for Volunteer, Coordinator, and Admin (NGO) forms.
 * Expects a form#signup-form with data-role="VOLUNTEER|COORDINATOR|ADMIN"
 * and fields: #firstName, #lastName, #email, #password, #confirm-password
 */
(function () {
  const form = document.getElementById("signup-form");
  if (!form || !window.VolunityAPI) return;

  const { apiRequest, saveAuthSession } = window.VolunityAPI;
  const submitBtn = form.querySelector('[type="submit"]');
  const statusEl = document.getElementById("signup-status");

  function setStatus(message, type) {
    if (!statusEl) {
      if (message) alert(message);
      return;
    }
    statusEl.textContent = message || "";
    statusEl.className = "signup-status" + (type ? ` signup-status--${type}` : "");
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.dataset.originalText =
      submitBtn.dataset.originalText || submitBtn.textContent;
    submitBtn.textContent = isLoading
      ? "Creating account..."
      : submitBtn.dataset.originalText;
  }

  function splitFullName(fullName) {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return { firstName: "", lastName: "" };
    if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(" "),
    };
  }

  function getNameFields() {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const fullNameInput = document.getElementById("fullname");

    if (firstNameInput && lastNameInput) {
      return {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
      };
    }

    if (fullNameInput) {
      return splitFullName(fullNameInput.value);
    }

    return { firstName: "", lastName: "" };
  }

  function redirectAfterSignup(role) {
    const routes = {
      VOLUNTEER: "./dashboard.html",
      COORDINATOR: "./coordinator/dashboard.html",
      ADMIN: "./dashboard.html",
    };
    window.location.href = routes[role] || "./login.html";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("");

    const role = (form.dataset.role || "VOLUNTEER").toUpperCase();
    const { firstName, lastName } = getNameFields();
    const email = document.getElementById("email")?.value.trim() || "";
    const password = document.getElementById("password")?.value || "";
    const confirmPassword =
      document.getElementById("confirm-password")?.value || "";
    const terms = document.getElementById("terms");

    if (!firstName || !lastName) {
      setStatus("Please enter your first and last name.", "error");
      return;
    }

    if (!email) {
      setStatus("Please enter your email address.", "error");
      return;
    }

    if (password.length < 6) {
      setStatus("Password must be at least 6 characters.", "error");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("Passwords do not match.", "error");
      return;
    }

    if (terms && !terms.checked) {
      setStatus("Please agree to the terms to continue.", "error");
      return;
    }

    const allowedRoles = ["VOLUNTEER", "COORDINATOR", "ADMIN"];
    if (!allowedRoles.includes(role)) {
      setStatus("Invalid account role.", "error");
      return;
    }

    setLoading(true);

    try {
      const { response, data } = await apiRequest("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
        }),
      });

      if (!response.ok || !data?.success) {
        const message =
          data?.message ||
          data?.error ||
          (Array.isArray(data?.errors) && data.errors[0]?.message) ||
          "Registration failed. Please try again.";
        setStatus(message, "error");
        return;
      }

      const token = data?.data?.token;
      const user = data?.data?.user;

      if (token || user) {
        saveAuthSession({ token, user });
      }

      setStatus(
        data?.message || "Account created successfully!",
        "success",
      );

      setTimeout(() => redirectAfterSignup(role), 800);
    } catch (err) {
      console.error("Register error:", err);
      setStatus(
        "Unable to reach the server. Check your connection and try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  });
})();
