// Slick slider
// $(document).ready(function () {
//   $(".quote-list").slick({
//     prevArrow:
//       "<button type='button' class='slick-prev pull-left'><i class='fal fa-angle-left' aria-hidden='true'></i></button>",
//     nextArrow:
//       "<button type='button' class='slick-next pull-right'><i class='fal fa-angle-right' aria-hidden='true'></i></button>",
//     responsive: [
//       {
//         breakpoint: 767,
//         settings: {
//           arrows: false,
//         },
//       },
//     ],
//   });
// });

const menuToggle = document.querySelector(".header-top-toggle");
const menuHeader = document.querySelector(".header-top-menu");
const expandClass = "is-expand";
menuToggle.addEventListener("click", function () {
  menuHeader.classList.add(expandClass);
});
window.addEventListener("click", function (e) {
  if (!menuHeader.contains(e.target) && !e.target.matches(".header-top-toggle")) {
    menuHeader.classList.remove(expandClass);
  }
});

//Slick Slider
$(document).ready(function () {
  $(".quote-container").slick({
    prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fal fa-angle-left' aria-hidden='true'></i></button>",
    nextArrow: "<button type='button' class='slick-next pull-right'><i class='fal fa-angle-right' aria-hidden='true'></i></button>",
    responsive: [{
      breakpoint: 767.98,
      settings: {
        arrows: false
      }
    }]
  });
});

// service
const services = document.querySelectorAll(".wedo-item");
const iconArrow = document.querySelectorAll(".wedo-item-toggle-arrow");
const toggleIcon = function () {
  services.forEach(item => {
    if (item.classList.contains("isShowed")) {
      item.firstElementChild.lastElementChild.classList.remove("fa-angle-down");
      item.firstElementChild.lastElementChild.classList.add("fa-angle-up");
    } else if (!item.classList.contains("isShowed")) {
      item.firstElementChild.lastElementChild.classList.add("fa-angle-down");
      item.firstElementChild.lastElementChild.classList.remove("fa-angle-up");
      item.lastElementChild.style.height = "0px";
    }
  });
};
toggleIcon();
iconArrow.forEach(item => {
  item.addEventListener("click", e => {
    const serviceitem = e.target.parentNode.parentNode;
    const serviceContent = e.target.parentNode.nextElementSibling;
    services.forEach(item => item.classList.remove("isShowed"));
    serviceContent.style.height = `${serviceContent.scrollHeight}px`;
    serviceitem.classList.toggle("isShowed");
    toggleIcon();
  });
});

// Menu Header
const headerMenu = document.querySelector(".header-top");
const paddingHeader = headerMenu.getBoundingClientRect().top;
const menu = document.querySelector(".header-top-menu");
const links = document.querySelectorAll(".header-top-menu-item-link");
const line = document.createElement("div");
// get Location Default
const {
  left,
  width,
  height
} = menu.firstElementChild.firstElementChild.getBoundingClientRect();
console.log({
  left,
  width,
  height
});
let temp = {
  left,
  width,
  height
};
line.className = "line-effect";
setLocation(line, width, left, height);
menu.appendChild(line);
links.forEach(item => item.addEventListener("mouseenter", handleHoverlink));
links.forEach(item => item.addEventListener("mouseleave", handleLeaveHoverlink));
links.forEach(item => item.addEventListener("click", handleClicklink));
function handleHoverlink(e) {
  const {
    left,
    top,
    width,
    height
  } = e.target.getBoundingClientRect();
  setLocation(line, width, left, height);
}
function handleLeaveHoverlink(e) {
  setLocation(line, temp.width, temp.left, temp.height);
}
function handleClicklink(e) {
  const {
    left,
    width,
    height
  } = e.target.getBoundingClientRect();
  setLocation(line, width, left, height);
  temp = {
    left,
    width,
    height
  };
}
function setLocation(line, width, left, height) {
  line.style.width = `${width - 50}px`;
  line.style.left = `${left}px`;
  line.style.top = `${height + paddingHeader}px`;
}