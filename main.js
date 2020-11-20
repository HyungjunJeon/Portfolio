"use strict";

// Make navbar transparent when it's on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
const navbarLink = document.querySelector(".navbar__link");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link === null) {
    return;
  }

  navbarMenu.classList.remove("open");
  navbarLink.classList.remove("open");
  scrollIntoView(link);
  selectNavItem(target);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
  navbarLink.classList.toggle("open");
});

// Handle scrolling to contact when click 'Contact Me' button
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" Button when scrolling down
const arrowUpBtn = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight) {
    arrowUpBtn.classList.add("visible");
  } else {
    arrowUpBtn.classList.remove("visible");
  }
});

// Make scroll to home when click arrow button
arrowUpBtn.addEventListener("click", () => {
  scrollIntoView("#home");
});

// 1. Select All section elements and menu items
const sectionIds = ["#home", "#about", "#skills", "#work", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);
// 2. Use InterSectionObserver to observe all sections
// 3. active menu item which is section is on viewport
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      // Scrolling down
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
