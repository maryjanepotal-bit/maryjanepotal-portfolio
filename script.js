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
  /* =========================================================
     DARK / LIGHT MODE
     ========================================================= */
  function setTheme(theme) {
    const dark = theme === "dark";

    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", theme);

    if (themeIcon) {
      themeIcon.className = dark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";
    }
  }
  setTheme(localStorage.getItem("theme") || "light");

  themeToggle?.addEventListener("click", () => {
    setTheme(
      root.classList.contains("dark")
        ? "light"
        : "dark"
    );
  });
  /* =========================================================
     MOBILE MENU
     ========================================================= */
  mobileMenuButton?.addEventListener("click", () => {
    const open = mobileMenu?.classList.toggle("open");

    document.body.classList.toggle(
      "menu-open",
      !!open
    );

    if (mobileMenuButton) {
      mobileMenuButton.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    }
  });
  document
    .querySelectorAll(".mobile-nav-link")
    .forEach(link => {
      link.addEventListener("click", () => {

        mobileMenu?.classList.remove("open");

        document.body.classList.remove("menu-open");

        if (mobileMenuButton) {
          mobileMenuButton.innerHTML =
            '<i class="fa-solid fa-bars"></i>';
        }
      });
    });
/* =========================================================
     PROFILE SELECTOR
     ========================================================= */
  const selector = document.getElementById("profile-selector");
  const eyebrow = document.getElementById("profile-eyebrow");
  const title = document.getElementById("profile-title");
  const summary = document.getElementById("profile-summary");
  const keywords = document.getElementById("profile-keywords");
  const profileDownload =
    document.getElementById("profile-download-cv");
  const headerDownload =
    document.getElementById("header-download-cv");
  const profileLink =
    document.getElementById("profile-link");
  const copyProfileLink =
    document.getElementById("copy-profile-link");
  /*
    IMPORTANT:
    Your original file has the profiles object commented out.

    If you still use the profile selector, define your
    profiles object here.

    Example:

    const profiles = {
      master: {
        eyebrow: "Multidisciplinary Professional",
        title: "Creative Vision. Executive Precision.",
        summary: "...",
        keywords: [
          "Executive Support",
          "Administration",
          "Operations"
        ],
        cv: "cv/Maryjane_Potal_Master_CV.pdf"
      }
    };
  */

  /* =========================================================
     PORTFOLIO FILTER
     ========================================================= */
  const filterButtons =
    document.querySelectorAll(".filter-button");

  const cards =
    document.querySelectorAll(".portfolio-card");

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      filterButtons.forEach(b => {
        b.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;

      cards.forEach(card => {

        const category = card.dataset.category;

        card.classList.toggle(
          "hidden",
          filter !== "all" &&
          category !== filter
        );

      });

    });

  });
  /* =========================================================
     MULTI-PHOTO ALBUM / IMAGE + VIDEO VIEWER
     ========================================================= */
  const modal =
    document.getElementById("album-modal");

  const modalImage =
    document.getElementById("album-image");

  const counter =
    document.getElementById("album-counter");

  const close =
    document.getElementById("album-close");

  const prev =
    document.getElementById("album-prev");

  const next =
    document.getElementById("album-next");

  let album = [];
  let index = 0;
  let mediaViewer = null;

  /* =========================================================
     SHOW ALBUM MEDIA
     ========================================================= */
  function showAlbumImage(nextIndex) {

    if (!album.length) {
      return;
    }

    index =
      (nextIndex + album.length) %
      album.length;

    const mediaSrc =
      (album[index] || "").trim();

    if (!mediaSrc) {
      return;
    }


    const parentContainer =
      modalImage
        ? modalImage.parentElement
        : null;

    if (!parentContainer) {
      return;
    }


    const isVideo =
      /\.mp4(?:[?#].*)?$/i.test(mediaSrc);


    /* -------------------------------------------------------
       CREATE MEDIA VIEWER
       ------------------------------------------------------- */

    if (!mediaViewer) {

      mediaViewer =
        document.getElementById(
          "active-media-view"
        );

      if (!mediaViewer) {

        mediaViewer =
          document.createElement("div");

        mediaViewer.id =
          "active-media-view";

        mediaViewer.style.display =
          "flex";

        mediaViewer.style.justifyContent =
          "center";

        mediaViewer.style.alignItems =
          "center";

        mediaViewer.style.width =
          "100%";

        mediaViewer.style.height =
          "100%";

        parentContainer.insertBefore(
          mediaViewer,
          modalImage
        );
      }
    }


    /* -------------------------------------------------------
       CLEAR PREVIOUS MEDIA
       ------------------------------------------------------- */

    if (modalImage) {
      modalImage.style.display = "none";
    }

    mediaViewer.classList.add("switching");

    mediaViewer.innerHTML = "";


    /* -------------------------------------------------------
       VIDEO
       ------------------------------------------------------- */

    if (isVideo) {

      const videoElem =
        document.createElement("video");

      videoElem.src = mediaSrc;

      videoElem.controls = true;

      videoElem.autoplay = true;

      videoElem.muted = true;

      videoElem.playsInline = true;

      videoElem.style.maxWidth =
        "100%";

      videoElem.style.maxHeight =
        "75vh";

      videoElem.style.objectFit =
        "contain";

      videoElem.style.borderRadius =
        "8px";


      mediaViewer.appendChild(
        videoElem
      );


      setTimeout(() => {

        mediaViewer?.classList.remove(
          "switching"
        );

      }, 180);

    }


    /* -------------------------------------------------------
       IMAGE
       ------------------------------------------------------- */

    else {

      const imgElem =
        document.createElement("img");

      imgElem.src = mediaSrc;

      imgElem.alt = "";

      imgElem.style.maxWidth =
        "100%";

      imgElem.style.maxHeight =
        "75vh";

      imgElem.style.objectFit =
        "contain";

      imgElem.style.borderRadius =
        "8px";


      imgElem.addEventListener(
        "load",
        () => {

          mediaViewer?.classList.remove(
            "switching"
          );

        },
        { once: true }
      );


      mediaViewer.appendChild(
        imgElem
      );

    }


    /* -------------------------------------------------------
       COUNTER
       ------------------------------------------------------- */

    if (counter) {

      counter.textContent =
        `${index + 1} / ${album.length}`;

    }

  }
  /* =========================================================
     OPEN ALBUM
     ========================================================= */
  function openAlbum(card) {

    album =
      (card.dataset.images || "")
        .split("|")
        .map(src => src.trim())
        .filter(Boolean);


    /* -------------------------------------------------------
       FALLBACK TO COVER IMAGE
       ------------------------------------------------------- */

    if (!album.length) {

      const cover =
        card.querySelector("img");

      if (cover) {

        const src =
          cover.getAttribute("src");

        if (src) {
          album = [src];
        }

      }

    }


    if (!album.length) {
      return;
    }


    index = 0;


    /* -------------------------------------------------------
       OPEN MODAL
       ------------------------------------------------------- */

    modal?.classList.add("open");

    modal?.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";


    showAlbumImage(0);

  }
  /* =========================================================
     CLOSE ALBUM
     ========================================================= */
  function closeAlbum() {

    modal?.classList.remove("open");

    modal?.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";


    /* -------------------------------------------------------
       STOP VIDEO
       ------------------------------------------------------- */

    if (mediaViewer) {

      const video =
        mediaViewer.querySelector("video");

      if (video) {

        video.pause();

        video.removeAttribute("src");

        video.load();

      }


      mediaViewer.innerHTML = "";

      mediaViewer.classList.remove(
        "switching"
      );

    }


    if (modalImage) {

      modalImage.style.display =
        "";

      modalImage.removeAttribute(
        "src"
      );

    }

  }
  /* =========================================================
     ALBUM CARD CLICK
     ========================================================= */

  cards.forEach(card => {

    card.addEventListener(
      "click",
      e => {

        /*
          Do not open album if the user
          clicked an actual link.
        */

        if (e.target.closest("a")) {
          return;
        }


        openAlbum(card);

      }
    );

  });
  /* =========================================================
     CLOSE BUTTON
     ========================================================= */

  close?.addEventListener(
    "click",
    e => {

      e.stopPropagation();

      closeAlbum();

    }
  );
  /* =========================================================
     PREVIOUS
     ========================================================= */
  prev?.addEventListener(
    "click",
    e => {

      e.stopPropagation();

      showAlbumImage(
        index - 1
      );

    }
  );
  /* =========================================================
     NEXT
     ========================================================= */
  next?.addEventListener(
    "click",
    e => {

      e.stopPropagation();

      showAlbumImage(
        index + 1
      );

    }
  );
  /* =========================================================
     CLICK OUTSIDE ALBUM = CLOSE
     ========================================================= */
  modal?.addEventListener(
    "click",
    e => {

      /*
        Only close when the actual modal
        background is clicked.

        Clicking the image/video/buttons
        will NOT close it.
      */

      if (e.target === modal) {

        closeAlbum();

      }

    }
  );
  /* =========================================================
     KEYBOARD CONTROLS
     ========================================================= */
  document.addEventListener(
    "keydown",
    e => {

      if (
        !modal?.classList.contains("open")
      ) {
        return;
      }


      if (e.key === "Escape") {

        closeAlbum();

      }


      if (e.key === "ArrowLeft") {

        showAlbumImage(
          index - 1
        );

      }


      if (e.key === "ArrowRight") {

        showAlbumImage(
          index + 1
        );

      }

    }
  );
  /* =========================================================
     NAVIGATION / ACTIVE SECTION
     ========================================================= */
  const sections =
    document.querySelectorAll(
      "main section[id]"
    );
  const navLinks =
    document.querySelectorAll(
      ".nav-link"
    );
  function onScroll() {

    let current = "home";


    sections.forEach(section => {

      if (
        scrollY >=
        section.offsetTop - 130
      ) {

        current =
          section.id;

      }

    });


    navLinks.forEach(link => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") ===
        `#${current}`
      );

    });


    backToTop?.classList.toggle(
      "visible",
      scrollY > 500
    );

  }
  addEventListener(
    "scroll",
    onScroll,
    { passive: true }
  );
  backToTop?.addEventListener(
    "click",
    () => {

      scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );
  onScroll();
  /* =========================================================
     LAZY LOAD IMAGES
     ========================================================= */
  document
    .querySelectorAll("img")
    .forEach(img => {

      if (
        !img.classList.contains(
          "hero-background"
        )
      ) {

        img.loading = "lazy";

      }

    });
  /* =========================================================
     CONTACT FORM
     ========================================================= */
  document
    .getElementById("contact-form")
    ?.addEventListener(
      "submit",
      e => {

        e.preventDefault();

        const status =
          document.getElementById(
            "form-status"
          );


        if (status) {

          status.textContent =
            "Contact form layout is ready for email integration.";

        }

      }
    );
  /* =========================================================
     CURRENT YEAR
     ========================================================= */
  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }

});


document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(
    "Portfolio Contact Message from " + name
  );

  const body = encodeURIComponent(
    "Name: " + name + "\n" +
    "Email: " + email + "\n\n" +
    "Message:\n" + message
  );

  window.location.href =
    "mailto:maryjanepotal@gmail.com?subject=" + subject + "&body=" + body;
});

/**window.location.href = "mailto:info@mjp-empire.com";**/
