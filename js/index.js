function clearActive() {
  const linkElems = document.querySelectorAll(".nav-link");
  linkElems.forEach((link) => {
    link.classList.remove("active");
  });
}

function logPositions(chaptersPos, schedulePos, registerPos) {
  console.clear();
  console.log(`chaptersPos: ${chaptersPos}`);
  console.log(`schedulePos: ${schedulePos}`);
  console.log(`registerPos: ${registerPos}`);
}

function buildCalendar(clubName, dayToSet, month, year) {
  const today = new Date(year, month - 1, dayToSet);
  const monthName = today.toLocaleString("default", { month: "long" });
  const monthElem = document.querySelector(`#${clubName} #month`);
  const yearElem = document.querySelector(`#${clubName} #year`);
  const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const numberOfDays = daysInMonth(year, month);

  // Add number of days to calendar
  const daysUl = document.querySelector(`#${clubName} ul.days`);
  let daysLi = "";

  for (let i = 1; i <= numberOfDays; i++) {
    daysLi += `<li><span>${i}</span></li>`;
  }
  daysUl.innerHTML = daysLi;

  monthElem.innerText = monthName;
  yearElem.innerText = year;

  const daySpans = document.querySelectorAll(`#${clubName} .days li span`);

  daySpans.forEach((span) => {
    if (parseInt(span.innerText) !== dayToSet) {
      span.classList.remove("active-day");
    } else if (parseInt(span.innerText) === dayToSet) {
      span.classList.add("active-day");
    }
  });
}
const linkElems = document.querySelectorAll(".nav-link");
const yearElem = document.querySelector(".year");

linkElems.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const linkValue = e.target.id.split("-").shift();
    const linkElem = document.querySelector(`#${linkValue}`);
    const offsetValue = linkElem.offsetTop - 100;
    window.scrollTo({ top: offsetValue, behavior: "smooth" });
  });
});

window.onscroll = () => {
  const chaptersPos = Math.round(
    document.querySelector(".chapters").getBoundingClientRect().y
  );
  const schedulePos = Math.round(
    document.querySelector(".schedule").getBoundingClientRect().y
  );
  const registerPos = Math.round(
    document.querySelector(".register").getBoundingClientRect().y
  );

  // logPositions(chaptersPos, schedulePos, registerPos);

  if (chaptersPos > 90) {
    clearActive();
    document.querySelector("#home-link").classList.add("active");
  }

  if (chaptersPos <= 90) {
    clearActive();
    document.querySelector("#chapters-link").classList.add("active");
  }

  if (schedulePos <= 120) {
    clearActive();
    document.querySelector("#schedule-link").classList.add("active");
  }

  if (registerPos <= 160) {
    clearActive();
    document.querySelector("#register-link").classList.add("active");
  }
};

buildCalendar("sunapee", 7, 11, 2023);
buildCalendar("lebanon", 15, 11, 2023);
buildCalendar("tilton", 9, 11, 2023);

yearElem.innerText = new Date().getFullYear();
