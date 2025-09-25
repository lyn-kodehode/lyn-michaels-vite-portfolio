// import "./style.css";
import "./styles/style.css";
import "./styles/mediaqueries.css";

// --------------------------------------------------------------------------
// DOM ELEMENTS
// --------------------------------------------------------------------------
const hamburgerIcon = document.querySelector(".hamburger-icon");
const hamburgerLinksContainer = document.querySelector(
  ".hamburger-links-container"
);
const hamburgerLinks = document.querySelectorAll(".hamburger-link");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const languageToggle = document.getElementById("language-toggle");
const languageToggleMobile = document.getElementById("language-toggle-mobile");
const desktopNav = document.getElementById("nav-desktop");
const hamburgerNav = document.getElementById("nav-hamburger");
const heroSection = document.getElementById("hero-section");
const leftScrollBtn = document.getElementById("scroll-left");
const rightScrollBtn = document.getElementById("scroll-right");
const projectsWrapper = document.querySelector(".projects-wrapper");
const body = document.body;

// --------------------------------------------------------------------------
// TOGGLE FUNCTIONS
// --------------------------------------------------------------------------

//auto-hide nav bar when scrolling down
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  // if scrolling down
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    if (desktopNav) {
      desktopNav.classList.add("hidden");
    }
    if (hamburgerNav) {
      hamburgerNav.classList.add("hidden");
    }
  }
  // if scrolling up
  else {
    if (desktopNav) {
      desktopNav.classList.remove("hidden");
    }
    if (hamburgerNav) {
      hamburgerNav.classList.remove("hidden");
    }
  }
  lastScrollTop = scrollTop;
});

// intuitive left/right arrow buttons
const updateScrollButtons = () => {
  // projectsWrapper.scrollLeft etc
  const { scrollLeft, scrollWidth, clientWidth } = projectsWrapper;

  // Left button - show if not at the beginning
  if (scrollLeft <= 0) {
    leftScrollBtn.classList.add("fade-out");
  } else {
    leftScrollBtn.classList.remove("fade-out");
  }

  // Right button - show if not at the end
  if (scrollLeft >= scrollWidth - clientWidth) {
    rightScrollBtn.classList.add("fade-out");
  } else {
    rightScrollBtn.classList.remove("fade-out");
  }
};

const toggleTheme = () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

const updateLanguageButton = (text) => {
  if (languageToggle) {
    languageToggle.textContent = text;
  }
  if (languageToggleMobile) {
    languageToggleMobile.textContent = text;
  }
};

const toggleLanguage = () => {
  body.classList.toggle("english-mode");
  if (body.classList.contains("english-mode")) {
    localStorage.setItem("language", "en");
    updateLanguageButton("NO");
  } else {
    localStorage.setItem("language", "no");
    updateLanguageButton("EN");
  }
};

// CHECKS FOR SAVED LANGUAGE PREFERENCE OR DEFAULTS TO NORWEGIAN
const currentLanguage = localStorage.getItem("language") || "no";
if (currentLanguage === "en") {
  body.classList.add("english-mode");
  updateLanguageButton("NO");
}

// CHECKS FOR SAVED THEME PREFERENCE OR SYSTEM PREFERENCE OR DEFAULTS TO LIGHTMODE
const getSystemTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

const currentTheme = localStorage.getItem("theme") || getSystemTheme();
if (currentTheme === "dark") {
  body.classList.add("dark-mode");
}

const toggleMenu = () => {
  hamburgerIcon.classList.toggle("open");
  hamburgerLinksContainer.classList.toggle("open");
};

// --------------------------------------------------------------------------
// EVENT LISTENERS
// --------------------------------------------------------------------------
// real-time listens to system changes (light/dark theme)
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    // only updates if user did not toggle the portfolio theme manually
    // checks if localStorage theme exists
    if (!localStorage.getItem("theme")) {
      if (event.matches) {
        body.classList.add("dark-mode");
      } else {
        body.classList.remove("dark-mode");
      }
    }
  });

// theme toggle
if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}
if (themeToggleMobile) {
  themeToggleMobile.addEventListener("click", toggleTheme);
}

// language toggle
if (languageToggle) {
  languageToggle.addEventListener("click", toggleLanguage);
}
if (languageToggleMobile) {
  languageToggleMobile.addEventListener("click", toggleLanguage);
}

// hamburger icon toggle
hamburgerIcon.addEventListener("click", toggleMenu);

hamburgerLinks.forEach((hamburgerLink) =>
  hamburgerLink.addEventListener("click", toggleMenu)
);

// add/remove logo class when scrolling past hero
window.addEventListener("scroll", () => {
  body.classList.toggle(
    "scrolled-past-hero",
    window.pageYOffset > heroSection.offsetTop + heroSection.offsetHeight
  );
});

// horizontal scrolling
leftScrollBtn.addEventListener("click", () => {
  const card = document.querySelector(".project-card");
  // offsetwidth = gets rendered width from clamp()
  const cardWidth = card.offsetWidth;

  projectsWrapper.scrollBy({
    // left: -300,
    // left: -projectCardWidth,
    left: -cardWidth,
    behavior: "smooth",
  });
});

rightScrollBtn.addEventListener("click", () => {
  const card = document.querySelector(".project-card");
  // offsetwidth = gets rendered width from clamp()
  const cardWidth = card.offsetWidth;

  projectsWrapper.scrollBy({
    left: cardWidth,
    behavior: "smooth",
  });
});

// update arrow visibility buttons on scroll
projectsWrapper.addEventListener("scroll", updateScrollButtons);

// Update buttons on window resize
window.addEventListener("resize", updateScrollButtons);

// --------------------------------------------------------------------------
// INITIAL CALLS
// --------------------------------------------------------------------------
// Initial update
updateScrollButtons();
