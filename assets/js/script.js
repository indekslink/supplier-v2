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
  const speed = 1000;
  counters.forEach((counter) => {
    const animate = () => {
      const value = +counter.getAttribute("akhi");
      const data = +counter.innerText;

      const time = value / speed;
      if (data < value) {
        counter.innerText = Math.ceil(data + time);
        setTimeout(animate, 1);
      } else {
        counter.innerText = convert(value);
      }
    };

    animate();
  });
}
function resetCounters() {
  counters.forEach((e) => (e.innerText = 0));
}

const sectionCounter = document.querySelector("section#counter");
// let init = true;
function initAnimate(scroll) {
  let offsetTop =
    sectionCounter.offsetTop - Math.ceil(window.innerHeight / 2) - 50;

  let height = offsetTop + sectionCounter.clientHeight;

  if (scroll > offsetTop) {
    runAnimate();
  } else {
    resetCounters();
  }
}
