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