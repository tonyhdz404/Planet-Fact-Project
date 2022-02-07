"use strict";
const main = document.querySelector(".overview");
const links = document.querySelectorAll(".nav__item");
const planetColors = [
  "#419ebb",
  "#eda249",
  "#6d2ed5",
  "#d14c32",
  "#d83a34",
  "#cd5120",
  "#1ec1a2",
  "#2d68f0",
];

//* Getting ID
function getPlanetID() {
  const id = window.location.hash.slice(1);
  const planetID = id ? id : 2;
  return planetID;
}
//* Listening For a Change in URL
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, function (e) {
    const planetID = getPlanetID();
    console.log(planetID);
    links.forEach((link) => link.classList.add(`link__hover-${planetID}`));
    renderPlanet(planetID);
  })
);

//* Getting All the planet data from our local file.
async function getPlanetData(id) {
  const response = await fetch("src/data.json");
  const data = await response.json();
  console.log(data);
  return data[id];
}
//* With the data we get from the getPlanetData idFunction we then use it to render the planet data that we want
async function renderPlanet(planetID) {
  const planetData = await getPlanetData(planetID);
  console.log(planetData);
  const html = createTemplate(planetData, planetID);
  main.innerHTML = "";
  main.insertAdjacentHTML("afterbegin", html);
}

//* Give a planet data object we create and return HTML template
function createTemplate(data, planetID) {
  const template = `
    <section class="planet-view">
        <figure class="planet-image-container">
        <img
            src="${data.images.planet}"
            alt="Planet Image"
            class="planet-img"
        />
        <div class="geology hidden">
        <img
          class="geology__img"
          src="${data.images.geology}"
          alt="Earth Geology pin"
        />
      </div>
        </figure>
        <!-- Planet View content -->
        <div class="planet-content">
        <h1 class="planet-content__name">${data.name}</h1>
        <p class="planet-content__details">
        ${data.overview.content}
        </p>
        <cite class="planet-content__resource"
            >Source :
            <a
            class="planet-content__resource__link"
            href="${data.overview.source}"
            target ="_blank"
            >Wikipedia</a
            >
        </cite>
        <!-- Different Views Selector Buttons -->
        <div class="planet-content__views">
            <button class="planet-content__alt-view btn-active-${planetID} over">
            <span class="planet-content__alt-view-num">01</span>
            Overview
            </button>

            <button class="planet-content__alt-view inter">
            <span class="planet-content__alt-view-num">02</span> Internal
            Structure
            </button>

            <button class="planet-content__alt-view surf">
            <span class="planet-content__alt-view-num">03</span> Surface
            Geology
            </button>
        </div>
        </div>
    </section>
    
    <!-- Planat Data Section -->
    <section class="planet-data">
        <div class="data-box">
        <p class="data-box__title">Rotation Time</p>
        <h3 class="data-box__data">${data.rotation}</h3>
        </div>

        <div class="data-box">
        <p class="data-box__title">Revolution Time</p>
        <h3 class="data-box__data">${data.revolution}</h3>
        </div>

        <div class="data-box">
        <p class="data-box__title">Radius</p>
        <h3 class="data-box__data">${data.radius}</h3>
        </div>

        <div class="data-box">
        <p class="data-box__title">Average Temp.</p>
        <h3 class="data-box__data">${data.temperature}</h3>
        </div>
    </section>
    `;
  return template;
}
//! Changing the Planet view
//* Changing Active view button color
function removeActiveClass(planetID) {
  const allBtns = document.querySelectorAll(".planet-content__alt-view");
  allBtns.forEach((btn) => btn.classList.remove(`btn-active-${planetID}`));
}

//* Overview view
main.addEventListener("click", function (e) {
  const bntClicked = e.target.closest(".over");
  if (!bntClicked) return;
  console.log(bntClicked, "Was clicked");
  const geologyPin = document.querySelector(".geology");
  geologyPin.classList.add("hidden");
  const planetID = getPlanetID();
  removeActiveClass(planetID);
  bntClicked.classList.add(`btn-active-${planetID}`);

  renderView(planetID, "planet", "overview");
});

//* Internal Structure View
main.addEventListener("click", function (e) {
  const bntClicked = e.target.closest(".inter");
  if (!bntClicked) return;
  console.log(bntClicked, "Was clicked");
  const planetID = getPlanetID();
  const geologyPin = document.querySelector(".geology");
  geologyPin.classList.add("hidden");
  console.log(`Planet ID: ${planetID}`);
  removeActiveClass(planetID);
  bntClicked.classList.add(`btn-active-${planetID}`);

  renderView(planetID, "internal", "structure");
});

// * Surface view
main.addEventListener("click", function (e) {
  const bntClicked = e.target.closest(".surf");
  if (!bntClicked) return;
  console.log(bntClicked, "Was clicked");
  const geologyPin = document.querySelector(".geology");
  geologyPin.classList.remove("hidden");
  const planetID = getPlanetID();
  removeActiveClass(planetID);
  bntClicked.classList.add(`btn-active-${planetID}`);

  renderView(planetID, "planet", "geology");
});

async function renderView(planetID, img, content) {
  const planetData = await getPlanetData(planetID);
  const planetImg = document.querySelector(".planet-img");
  const viewDetails = document.querySelector(".planet-content__details");
  const viewDetailsSrc = document.querySelector(
    ".planet-content__resource__link"
  );
  viewDetails.innerText = "";
  viewDetails.innerText = planetData[content].content;
  planetImg.src = planetData.images[img];
  viewDetailsSrc.href = planetData[content].source;
}
