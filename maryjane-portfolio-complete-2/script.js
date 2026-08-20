document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const backToTop = document.getElementById("back-to-top");
  const currentYear = document.getElementById("current-year");

  const profiles = {
    master: {
      eyebrow: "Multidisciplinary Professional",
      title: "Creative Vision. Executive Precision.",
      summary:
        "A Dubai-based multidisciplinary professional combining executive support, administration, operations, graphic design, digital marketing, logistics and IT support.",
      keywords: [
        "Executive Support",
        "Administration",
        "Operations",
        "Graphic Design",
        "Digital Marketing",
        "Logistics",
        "IT Support"
      ],
      cv: "cv/Maryjane_Potal_Master_CV.pdf"
    },

    executive: {
      eyebrow: "Executive Assistant & C-Suite Support",
      title: "Reliable executive support with operational discipline.",
      summary:
        "Experienced in calendar and inbox management, meeting coordination, minutes, follow-ups, reports, HR administration, vendor coordination, document control and daily executive office operations.",
      keywords: [
        "C-Suite Support",
        "Calendar Management",
        "Inbox Management",
        "Minutes",
        "HR Administration",
        "Document Control",
        "Reporting"
      ],
      cv: "cv/Maryjane_Potal_Executive_CV.pdf"
    },

    creative: {
      eyebrow: "Graphic Design & Digital Marketing",
      title: "Visual communication designed with purpose.",
      summary:
        "A creative professional producing social media graphics, branding assets, promotional campaigns, product photography, video content, packaging, presentations and production-ready files.",
      keywords: [
        "Graphic Design",
        "Branding",
        "Social Media",
        "Photography",
        "Video Editing",
        "Adobe Creative Suite",
        "Campaign Design"
      ],
      cv: "cv/Maryjane_Potal_Creative_CV.pdf"
    },

    operations: {
      eyebrow: "Administration, Operations & Procurement",
      title: "Structured coordination that keeps business moving.",
      summary:
        "Skilled in office administration, project coordination, vendor communication, quotations, purchase support, trackers, reports, inventory, event logistics and day-to-day operations.",
      keywords: [
        "Office Administration",
        "Operations",
        "Procurement Support",
        "Vendor Coordination",
        "Inventory",
        "Project Tracking",
        "Reporting"
      ],
      cv: "cv/Maryjane_Potal_Operations_CV.pdf"
    },

    logistics: {
      eyebrow: "Logistics & Shipping Coordination",
      title: "Accurate documentation and dependable movement.",
      summary:
        "Experienced in shipment documents, driver scheduling, route coordination, delivery follow-ups, supplier and customer communication, payment follow-ups and logistics records.",
      keywords: [
        "Shipping Documents",
        "Driver Scheduling",
        "Route Coordination",
        "Customer Service",
        "Delivery Tracking",
        "Supplier Coordination",
        "Operations"
      ],
      cv: "cv/Maryjane_Potal_Logistics_CV.pdf"
    },

    it: {
      eyebrow: "IT Support & Digital Solutions",
      title: "Practical digital support for modern business needs.",
      summary:
        "Combining IT fundamentals, troubleshooting, website support, HTML, CSS, JavaScript, Figma, GitHub and business systems to solve practical technical and digital workflow needs.",
      keywords: [
        "IT Support",
        "Troubleshooting",
        "HTML",
        "CSS",
        "JavaScript",
        "Figma",
        "GitHub"
      ],
      cv: "cv/Maryjane_Potal_IT_CV.pdf"
    }
  };

  function setTheme(theme) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);

    if (themeIcon) {
      themeIcon.className = isDark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";
    }
  }

  const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  setTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    setTheme(root.classList.contains("dark") ? "light" : "dark");
  });

  mobileMenuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    mobileMenuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      document.body.classList.remove("menu-open");
      mobileMenuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavigation() {
    let current = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  window.addEventListener("scroll", () => {
    updateActiveNavigation();

    backToTop?.classList.toggle("visible", window.scrollY > 500);
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const profileSelector = document.getElementById("profile-selector");
  const profileEyebrow = document.getElementById("profile-eyebrow");
  const profileTitle = document.getElementById("profile-title");
  const profileSummary = document.getElementById("profile-summary");
  const profileKeywords = document.getElementById("profile-keywords");
  const profileDownload = document.getElementById("profile-download-cv");
  const headerDownload = document.getElementById("header-download-cv");
  const profileLink = document.getElementById("profile-link");
  const copyProfileLink = document.getElementById("copy-profile-link");

  function buildProfileUrl(profileKey) {
    const url = new URL(window.location.href);
    url.searchParams.set("profile", profileKey);
    url.hash = "professional-profile";
    return url.toString();
  }

  function renderProfile(profileKey, updateUrl = true) {
    const safeKey = profiles[profileKey] ? profileKey : "master";
    const profile = profiles[safeKey];

    profileSelector.value = safeKey;
    profileEyebrow.textContent = profile.eyebrow;
    profileTitle.textContent = profile.title;
    profileSummary.textContent = profile.summary;

    profileKeywords.innerHTML = profile.keywords
      .map((keyword) => `<span>${keyword}</span>`)
      .join("");

    profileDownload.href = profile.cv;
    headerDownload.href = profile.cv;
    profileLink.value = buildProfileUrl(safeKey);

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("profile", safeKey);
      window.history.replaceState({}, "", url);
    }
  }

  const initialProfile =
    new URLSearchParams(window.location.search).get("profile") || "master";

  renderProfile(initialProfile, false);

  profileSelector?.addEventListener("change", (event) => {
    renderProfile(event.target.value);
  });

  copyProfileLink?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(profileLink.value);
      const original = copyProfileLink.innerHTML;
      copyProfileLink.innerHTML =
        '<i class="fa-solid fa-check"></i> Copied';
      setTimeout(() => {
        copyProfileLink.innerHTML = original;
      }, 1600);
    } catch (error) {
      profileLink.select();
      document.execCommand("copy");
    }
  });

  const filterButtons = document.querySelectorAll(".filter-button");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      portfolioCards.forEach((card) => {
        const shouldShow =
          filter === "all" || card.dataset.category === filter;

        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    formStatus.textContent =
      "Form layout is ready. Connect EmailJS or Formspree before publishing.";
  });

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  updateActiveNavigation();
});
