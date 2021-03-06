let Wscroll, Wwidth;
const navBar = document.querySelector("nav.navbar");

// const parentLoading = document.querySelector(".parent-loading");

window.onscroll = function () {
  Wscroll = window.scrollY;
  if (Wwidth > 964) {
    navBar.classList.remove("bg-transparent", "bg-navy");
    navBar.classList.add(Wscroll > 50 ? "bg-navy" : "bg-transparent");
  }
  initAnimate(Wscroll);
  activeSectionScroll(Wscroll);
};
window.onresize = function () {
  Wwidth = window.innerWidth;
  navBar.classList.remove("bg-transparent", "bg-navy");
  navBar.classList.add(Wwidth < 965 ? "bg-navy" : "bg-transparent");
};
window.onload = function () {
  Wwidth = window.innerWidth;
  // parentLoading.classList.add("close");
  navBar.classList.remove("bg-transparent", "bg-navy");
  navBar.classList.add(Wwidth < 965 ? "bg-navy" : "bg-transparent");
  window.scrollTo(0, 0);
};

function convert(val) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// function runCounters(){

// }

const counters = document.querySelectorAll(".value");
function runAnimate() {
  const speed = 200;
  counters.forEach((counter) => {
    const animate = () => {
      const value = +counter.getAttribute("akhi");
      const data = +counter.innerText;

      const time = value / speed;
      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 1);
      } else {
        counter.innerText = value;
        setTimeout(() => {
          counter.innerText = convert(value);
        }, 50);
      }
    };

    animate();
  });
}
function resetCounters() {
  counters.forEach((e) => (e.innerText = 0));
}

const sectionCounter = document.querySelector("section#counter");
let init = true;
function initAnimate(scroll) {
  let offsetTop =
    sectionCounter.offsetTop - Math.ceil(window.innerHeight / 2) - 50;

  let height = offsetTop + sectionCounter.clientHeight;

  if (scroll > offsetTop) {
    if (init) {
      runAnimate();
      init = false;
    }
  } else {
    resetCounters();
    init = true;
  }
}

$(".owl-carousel.client").owlCarousel({
  items: 5,
  loop: true,
  margin: 20,
  rtl: true,

  autoplay: true,
  center: true,
  autoPlayTimeout: 100,
  autoplaySpeed: 10000,
  autoplayHoverPause: false,

  responsive: {
    0: {
      items: 2,
    },

    569: {
      items: 3,
    },

    768: {
      items: 5,
    },
  },
});
let slideProductService = $(".owl-carousel.product-service");
slideProductService.children().each(function (index, val) {
  $(this).attr("data-position", index); // NB: .attr() instead of .data()
});

slideProductService.owlCarousel({
  items: 5,
  loop: true,
  margin: 10,
  stagePadding: 30,
  center: true,
  responsiveRefreshRate: 10,
  // autoplay: true,

  // autoplayHoverPause: false,
  // autoPlayTimeout: 100,
  // autoplaySpeed: 10000,
  responsive: {
    0: {
      items: 1,
    },

    569: {
      items: 2,
    },

    961: {
      items: 3,
    },
    1400: {
      items: 5,
    },
  },
});
let oldTarget;
let playAgain = true;
let itemSlideProductService = document.querySelectorAll(
  ".owl-carousel.product-service .card:not(.card-collapse)"
);
itemSlideProductService.forEach((card) => {
  card.addEventListener("click", function () {
    const target = card.getAttribute("data-target");
    const idCollapse = card.getAttribute("data-bs-target");
    const position = card.getAttribute("data-position");

    //  $(itemSlideProductService).removeClass("active").addClass("text-truncate");
    $(itemSlideProductService).addClass("text-truncate");

    collapseDescription(idCollapse);
    setTimeout(() => {
      fitSizeImg();
    }, 500);
    if (target == oldTarget) {
      if (playAgain) {
        playAgain = false;
        //card.classList.remove("active");
        card.classList.add("text-truncate");
      } else {
        playAgain = true;
        // card.classList.add("active");
        card.classList.remove("text-truncate");
      }
    } else {
      playAgain = true;
      //card.classList.add("active");
      card.classList.remove("text-truncate");
    }
    oldTarget = target;

    slideProductService.trigger("to.owl.carousel", position);
  });
});
function collapseDescription(id, show = false) {
  let collapseElementList = [].slice.call(
    document.querySelectorAll(`.collapse-description:not(${id})`)
  );
  collapseElementList.map(function (collapseEl) {
    let e = bootstrap.Collapse.getInstance(collapseEl);
    if (e) {
      e.hide();
      // if (show) {
      //   const v = document.querySelector(`.collapse-description${id}`);
      //   const vbs = bootstrap.Collapse.getInstance(v);
      //   vbs.show();
      // }
    }
  });
}
function fitSizeImg() {
  const imgGridCollapseDescription = document.querySelectorAll(".my-grid img");
  imgGridCollapseDescription.forEach((e) => {
    e.style.width = "100%";

    e.style.height = e.offsetWidth + "px";
  });
}

// const sectionScroll = document.querySelectorAll(".section-scroll");
const menuDataLink = document.querySelectorAll(`.navbar a.nav-link`);
function activeSectionScroll(scroll) {
  menuDataLink.forEach((link) => {
    let href = link.getAttribute("href");
    let section = document.querySelector(`div[data-link="${href}"]`);

    let offsetTop = section.offsetTop;
    let height = offsetTop + section.clientHeight;
    if (scroll > offsetTop - 120 && scroll < height - 100) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

menuDataLink.forEach((md) => {
  if (!md.hasAttribute("data-bs-toggle")) {
    md.addEventListener("click", function (e) {
      e.preventDefault();
      let section = document.querySelector(
        `div[data-link="${md.getAttribute("href")}"]`
      );
      let offsetTop = section.offsetTop;
      window.scrollTo(0, offsetTop - 70);
      closeNavbar();
    });
  } else {
    const itemDropdown = Array.from(md.nextElementSibling.children);
    itemDropdown.forEach((element) => {
      if (element.tagName == "LI") {
        let itemLink = element.children[0];
        itemLink.addEventListener("click", function (e) {
          e.preventDefault();
          const href = itemLink.getAttribute("href");
          const parentCollapse = document.querySelector(
            `.owl-carousel [data-bs-target="${href}"]`
          );
          const section = document.querySelector(
            `.section-scroll[data-link="#supplier-exportir"]`
          );

          collapseDescription(href);
          setTimeout(() => {
            fitSizeImg();
          }, 500);

          slideProductService.trigger(
            "to.owl.carousel",
            parentCollapse.getAttribute("data-position")
          );

          window.scrollTo(0, section.offsetTop - 70);
          closeNavbar();
        });
      }
    });
  }
});

function learnmore() {
  const about = document.querySelector('.section-scroll[data-link="#about"');
  window.scrollTo(0, about.offsetTop - 70);
}
function closeNavbar() {
  const collapseNavbar = document.querySelector("#navbarSupportedContent");
  let e = bootstrap.Collapse.getInstance(collapseNavbar);
  e.hide();
}
