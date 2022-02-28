const toggleNav = document.querySelector(".nav-toggle");
const navBar = document.querySelector("nav");
const open = document.querySelector(".open");
const close = document.querySelector(".close");

const navToggle = (e) => {
  //   e.preventDefault();
  //   alert("clicked...");
  //   console.log(open);
  document.querySelector(".nav").classList.toggle("toggle");
  open.classList.toggle("menu");
  navBar.classList.toggle("navHeight");
  document.querySelector(".nav").style.transform = "translateY(0px)";
};

toggleNav.addEventListener("click", navToggle);
