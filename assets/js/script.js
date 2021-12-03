let Wscroll, Wwidth;
const navBar = document.querySelector("nav.navbar");
window.onscroll = function () {
  Wscroll = window.scrollY;
  if (Wwidth > 964) {
    navBar.classList.remove("bg-transparent", "bg-navy");
    navBar.classList.add(Wscroll > 50 ? "bg-navy" : "bg-transparent");
  }
  initAnimate(Wscroll);
};
window.onresize = function () {
  Wwidth = window.innerWidth;
  navBar.classList.remove("bg-transparent", "bg-navy");
  navBar.classList.add(Wwidth < 965 ? "bg-navy" : "bg-transparent");
};
window.onload = function () {
  Wwidth = window.innerWidth;
  navBar.classList.remove("bg-transparent", "bg-navy");
  navBar.classList.add(Wwidth < 965 ? "bg-navy" : "bg-transparent");
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

    $(itemSlideProductService).removeClass("active");

    if (target == oldTarget) {
      if (playAgain) {
        playAgain = false;
        card.classList.remove("active");
      } else {
        playAgain = true;
        card.classList.add("active");
      }
    } else {
      playAgain = true;
      card.classList.add("active");
    }
    oldTarget = target;

    slideProductService.trigger("to.owl.carousel", position);
    collapseDescription(idCollapse);
    setTimeout(() => {
      fitSizeImg();
    }, 500);
  });
});
function collapseDescription(id) {
  let collapseElementList = [].slice.call(
    document.querySelectorAll(`.collapse-description:not(${id})`)
  );
  collapseElementList.map(function (collapseEl) {
    let e = bootstrap.Collapse.getInstance(collapseEl);
    if (e) {
      e.hide();
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
