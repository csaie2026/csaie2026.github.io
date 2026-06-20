document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navContainer = document.querySelector(".nav-container");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");
  const dropdownMenu = document.querySelector(".uk-dropdown-navbar");
  const navLinks = document.querySelectorAll(".nav-trigger");

  // 1. Mobile Menu Toggle Control
  if (menuToggle && navContainer) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents the document click listener from firing immediately
      const isOpen = navContainer.classList.toggle("is-open");
      menuToggle.classList.toggle("is-active");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });
  }

  // 2. NEW: Close menu when clicking outside the drawer
  document.addEventListener("click", (e) => {
    // Check if menu is open and the click target is NOT inside the nav container or toggle button
    if (
      window.innerWidth <= 900 &&
      navContainer &&
      navContainer.classList.contains("is-open") &&
      !navContainer.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navContainer.classList.remove("is-open");
      menuToggle.classList.remove("is-active");
      menuToggle.setAttribute("aria-expanded", "false");
      if (dropdownMenu) {
        dropdownMenu.classList.remove("is-visible");
      }
    }
  });

  // 3. Mobile Dropdown Interactive Control
  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener("click", (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdownMenu.classList.toggle("is-visible");
      }
    });
  }

  // 4. Navigation View Changer Engine
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("data-target");
      if (!targetId) return;

      // Clear current tab statuses
      document.querySelectorAll(".uk-navbar-nav li").forEach((li) => {
        li.classList.remove("uk-active");
      });

      // Apply visibility flag to active links
      const parentLi = this.closest("li.uk-parent") || this.closest("li");
      if (parentLi) {
        parentLi.classList.add("uk-active");
      }

      // Screen views transition sequence
      document.querySelectorAll(".page-view").forEach((page) => {
        page.classList.remove("active");
      });

      const targetPage = document.getElementById(targetId);
      if (targetPage) {
        targetPage.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Auto-collapse drawer and dropdown on mobile select actions
      if (window.innerWidth <= 900) {
        navContainer.classList.remove("is-open");
        menuToggle.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        if (dropdownMenu) {
          dropdownMenu.classList.remove("is-visible");
        }
      }
    });
  });
});
