// main.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Collapse navbar on link click (for mobile)
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  // 2. Smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 3. Basic form validation for Compare Listings page
  const form = document.getElementById("propertyForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      const state = document.getElementById("state").value;
      const price = parseFloat(document.getElementById("price").value);
      const beds = parseInt(document.getElementById("beds").value);
      const baths = parseInt(document.getElementById("baths").value);
      const sqft = parseInt(document.getElementById("sqft").value);

      if (!state || isNaN(price) || price <= 0 || isNaN(beds) || isNaN(baths) || isNaN(sqft)) {
        e.preventDefault();
        showToast("Please fill out all fields with valid values.");
      }
    });
  }

  // 4. Toast feedback (create it dynamically if needed)
  if (!document.getElementById("toastContainer")) {
    const toastDiv = document.createElement("div");
    toastDiv.id = "toastContainer";
    toastDiv.style.position = "fixed";
    toastDiv.style.bottom = "20px";
    toastDiv.style.right = "20px";
    toastDiv.style.zIndex = "9999";
    document.body.appendChild(toastDiv);
  }

  window.showToast = function (message, duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast align-items-center text-white bg-danger border-0 show";
    toast.setAttribute("role", "alert");
    toast.style.minWidth = "250px";
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    document.getElementById("toastContainer").appendChild(toast);

    setTimeout(() => toast.remove(), duration);
  };

  // 5. Optional utility: global loading spinner control
  window.showLoadingSpinner = function (message = "Loading...") {
    const loadingDiv = document.getElementById("loadingMessage");
    if (loadingDiv) {
      loadingDiv.innerHTML = `
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">${message}</span>
        </div>
        <p>${message}</p>
      `;
      loadingDiv.style.display = "block";
    }
  };

  window.hideLoadingSpinner = function () {
    const loadingDiv = document.getElementById("loadingMessage");
    if (loadingDiv) loadingDiv.style.display = "none";
  };
});
