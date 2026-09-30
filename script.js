document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     BASIC ELEMENTS
     ========================================================= */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const backToTop = document.getElementById("back-to-top");
  const currentYear = document.getElementById("current-year");

  /* ============CV LIST HIDDEN=========================
     CV / PROFESSIONAL PROFILE DATA
     ========================================================= 
  const profiles = {
    master: {
      eyebrow: "Multidisciplinary Professional",
      title: "Creative Vision. Executive Precision.",
      summary: "A Dubai-based multidisciplinary professional combining executive support, administration, operations, graphic design, digital marketing, logistics and IT support.",
      keywords: ["Executive Support","Administration","Operations","Graphic Design","Digital Marketing","Logistics","IT Support"],
      cv: "cv/Maryjane_Potal_Master_CV.pdf"
    },
    executive: {
      eyebrow: "Executive Assistant & C-Suite Support",
      title: "Reliable executive support with operational discipline.",
      summary: "Experienced in calendar and inbox management, meeting coordination, minutes, follow-ups, reports, HR administration, vendor coordination, document control and daily executive office operations.", 
      keywords: ["C-Suite Support","Calendar Management","Inbox Management","Minutes","HR Administration","Document Control","Reporting"],
      cv: "cv/Maryjane_Potal_Executive_CV.pdf"
    },
    creative: {
      eyebrow: "Graphic Design & Digital Marketing",
      title: "Visual communication designed with purpose.",
      summary: "A creative professional producing social media graphics, branding assets, promotional campaigns, product photography, video content, packaging, presentations and production-ready files.",
      keywords: ["Graphic Design","Branding","Social Media","Photography","Video Editing","Adobe Creative Suite","Campaign Design"],
      cv: "cv/Maryjane_Potal_Creative_CV.pdf"
    },
    operations: {
      eyebrow: "Administration, Operations & Procurement",
      title: "Structured coordination that keeps business moving.",
      summary: "Skilled in office administration, project coordination, vendor communication, quotations, purchase support, trackers, reports, inventory, event logistics and day-to-day operations.",
      keywords: ["Office Administration","Operations","Procurement Support","Vendor Coordination","Inventory","Project Tracking","Reporting"],
      cv: "cv/Maryjane_Potal_Operations_CV.pdf"
    },
    logistics: {
      eyebrow: "Logistics & Shipping Coordination",
      title: "Accurate documentation and dependable movement.",
      summary: "Experienced in shipment documents, driver scheduling, route coordination, delivery follow-ups, supplier and customer communication, payment follow-ups and logistics records.",
      keywords: ["Shipping Documents","Driver Scheduling","Route Coordination","Customer Service","Delivery Tracking","Supplier Coordination","Operations"],
      cv: "cv/Maryjane_Potal_Logistics_CV.pdf"
    },
    it: {
      eyebrow: "IT Support & Digital Solutions",
      title: "Practical digital support for modern business needs.",
      summary: "Combining IT fundamentals, troubleshooting, website support, HTML, CSS, JavaScript, Figma, GitHub and business systems to solve practical technical and digital workflow needs.",
      keywords: ["IT Support","Troubleshooting","HTML","CSS","JavaScript","Figma","GitHub"],
      cv: "cv/Maryjane_Potal_IT_CV.pdf"
    }
  };========================================================= */

  /* =========================================================
     DARK / LIGHT MODE
     ========================================================= */
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

  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    setTheme(root.classList.contains("dark") ? "light" : "dark");
  });

  /* =========================================================
     MOBILE MENU
     ========================================================= */
  mobileMenuButton?.addEventListener("click", () => {
    const isOpen = mobileMenu?.classList.toggle("open");
    document.body.classList.toggle("menu-open", !!isOpen);

    mobileMenuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu?.classList.remove("open");
      document.body.classList.remove("menu-open");

      if (mobileMenuButton) {
        mobileMenuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  /* =========================================================
     PORTFOLIO FILTER
     ========================================================= */
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
        card.style.display = shouldShow ? "block" : "none";
      });
    });
  });

  /* =========================================================
     MULTI-PHOTO ALBUM / ZOOM & VIDEO SUPPORT (.mp4)
     ========================================================= */
  const modal = document.getElementById("album-modal");
  const modalImage = document.getElementById("album-image");
  const albumCounter = document.getElementById("album-counter");
  const closeAlbumButton = document.getElementById("album-close");
  const previousButton = document.getElementById("album-prev");
  const nextButton = document.getElementById("album-next");

  let currentAlbum = [];
  let currentIndex = 0;
  const PHOTO_SWITCH_DELAY = 180;

  function showAlbumImage(nextIndex) {
    if (!currentAlbum.length) return;

    currentIndex = (nextIndex + currentAlbum.length) % currentAlbum.length;
    const mediaSrc = currentAlbum[currentIndex].trim();
    const isVideo = mediaSrc.toLowerCase().endsWith(".mp4");
    const parentContainer = modalImage ? modalImage.parentElement : null;

    if (!parentContainer) return;

    let mediaViewer = document.getElementById("active-media-view");
    if (!mediaViewer) {
      mediaViewer = document.createElement("div");
      mediaViewer.id = "active-media-view";
      mediaViewer.style.display = "flex";
      mediaViewer.style.justifyContent = "center";
      mediaViewer.style.alignItems = "center";
      parentContainer.insertBefore(mediaViewer, modalImage);
    }

    modalImage.style.display = "none";
    mediaViewer.classList.add("switching");

    setTimeout(() => {
      mediaViewer.innerHTML = "";

      if (isVideo) {
        const videoElem = document.createElement("video");
        videoElem.src = mediaSrc;
        videoElem.controls = true;
        videoElem.autoplay = true;
        videoElem.muted = true;
        videoElem.playsInline = true;
        videoElem.style.maxWidth = "100%";
        videoElem.style.maxHeight = "75vh";
        videoElem.style.objectFit = "contain";
        videoElem.style.borderRadius = "8px";
        mediaViewer.appendChild(videoElem);
      } else {
        const imgElem = document.createElement("img");
        imgElem.src = mediaSrc;
        imgElem.alt = "";
        imgElem.style.maxWidth = "100%";
        imgElem.style.maxHeight = "75vh";
        imgElem.style.objectFit = "contain";
        imgElem.style.borderRadius = "8px";
        mediaViewer.appendChild(imgElem);
      }

      mediaViewer.classList.remove("switching");

      if (albumCounter) {
        albumCounter.textContent = `${currentIndex + 1} / ${currentAlbum.length}`;
      }
    }, PHOTO_SWITCH_DELAY);
  }

  function openAlbum(card) {
    currentAlbum = (card.dataset.images || "")
      .split("|")
      .map(item => item.trim())
      .filter(Boolean);

    if (!currentAlbum.length) {
      const cover = card.querySelector("img");
      if (cover) currentAlbum = [cover.getAttribute("src")];
    }

    if (!currentAlbum.length) return;

    modal?.classList.add("open");
    modal?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    showAlbumImage(0);
  }

  function closeAlbum() {
    modal?.classList.remove("open");
    modal?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    
    const activeVideo = modal?.querySelector("video");
    if (activeVideo) activeVideo.pause();
  }


  portfolioCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      // Prevent triggering if clicking standard links
      if (event.target.closest("a")) return;
      
      // Explicitly open the album whether they click the card or the button
      openAlbum(card);
    });
  });

  // Specifically target the view album buttons to ensure smooth triggering
  document.querySelectorAll(".view-album-btn, .portfolio-card button, .portfolio-card .button").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const card = btn.closest(".portfolio-card");
      if (card) openAlbum(card);
    });
  });


  closeAlbumButton?.addEventListener("click", closeAlbum);

  previousButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    showAlbumImage(currentIndex - 1);
  });

  nextButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    showAlbumImage(currentIndex + 1);
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeAlbum();
  });

  document.addEventListener("keydown", (event) => {
    if (!modal?.classList.contains("open")) return;

    if (event.key === "Escape") closeAlbum();
    if (event.key === "ArrowLeft") showAlbumImage(currentIndex - 1);
    if (event.key === "ArrowRight") showAlbumImage(currentIndex + 1);
  });

  /* =========================================================
     ACTIVE NAVIGATION + BACK TO TOP
     ========================================================= */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavigation() {
    let current = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - 130;

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

    backToTop?.classList.toggle(
      "visible",
      window.scrollY > 500
    );
  }

  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
  );

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  updateActiveNavigation();

  /* =========================================================
     LAZY LOADING
     ========================================================= */
  document.querySelectorAll("img").forEach((image) => {
    if (!image.classList.contains("hero-background")) {
      image.loading = "lazy";
    }
  });

  /* =========================================================
     CONTACT FORM
     ========================================================= */
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formStatus) {
      formStatus.textContent =
        "Contact form layout is ready for email integration.";
    }
  });

  /* =========================================================
     COPYRIGHT YEAR
     ========================================================= */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

});

function initProfileSelectorLogic() {
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

    if (profileSelector) profileSelector.value = safeKey;
    if (profileEyebrow) profileEyebrow.textContent = profile.eyebrow;
    if (profileTitle) profileTitle.textContent = profile.title;
    if (profileSummary) profileSummary.textContent = profile.summary;

    if (profileKeywords) {
      profileKeywords.innerHTML = profile.keywords
        .map((keyword) => `<span>${keyword}</span>`)
        .join("");
    }

    if (profileDownload) profileDownload.href = profile.cv;
    if (headerDownload) headerDownload.href = profile.cv;
    if (profileLink) profileLink.value = buildProfileUrl(safeKey);

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
    if (!profileLink) return;

    try {
      await navigator.clipboard.writeText(profileLink.value);
      const original = copyProfileLink.innerHTML;
      copyProfileLink.innerHTML =
        '<i class="fa-solid fa-check"></i> Copied';

      setTimeout(() => {
        copyProfileLink.innerHTML = original;
      }, 1400);
    } catch {
      profileLink.select();
      document.execCommand("copy");
    }
  });
}










document.addEventListener("DOMContentLoaded", () => {
  // 1. Portfolio Filtering Logic
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and add to clicked one
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || itemCategory === filterValue) {
          item.style.display = "block";
          // Small timeout to allow display block to render before opacity transition
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300); // Matches transition duration
        }
      });
    });
  });

  // 2. Interactive Image Modal (Lightbox) Setup
  const modal = document.createElement("div");
  modal.id = "portfolio-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <img class="modal-image" src="" alt="Enlarged Portfolio Preview">
      <p class="modal-caption"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector(".modal-image");
  const modalCaption = modal.querySelector(".modal-caption");
  const closeBtn = modal.querySelector(".modal-close");

  // Attach click listener to portfolio images or trigger elements
  const portfolioTriggers = document.querySelectorAll(".portfolio-card, .portfolio-img-trigger");
  
  portfolioTriggers.forEach(trigger => {
    trigger.style.cursor = "pointer";
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const img = trigger.querySelector("img");
      const title = trigger.querySelector("h3") ? trigger.querySelector("h3").innerText : "Portfolio Preview";
      
      if (img) {
        modalImage.src = img.src;
        modalCaption.innerText = title;
        modal.classList.add("active");
      }
    });
  });

  // Close Modal Actions
  const closeModal = () => modal.classList.remove("active");
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.classList.toggle("open");
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.classList.remove("open");
      });
    });
  }
});



