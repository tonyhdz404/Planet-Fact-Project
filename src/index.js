"use strict";
const main = document.querySelector(".overview");

//* Listening For a Change in URL
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, function (e) {
    const id = window.location.hash.slice(1);
    const planetID = id ? id : 2;
    console.log(planetID);
    renderPlanet(planetID);
  })
);

async function getAllPlanetData() {
  const response = await fetch("src/data.json");
  const data = await response.json();
  console.log(data);
  return data;
}
async function renderPlanet(planetID) {
  const planetData = await getAllPlanetData();
  console.log(planetData[planetID]);
  const html = createTemplate(planetData[planetID]);
  main.innerHTML = "";
  main.insertAdjacentHTML("afterbegin", html);
}

function createTemplate(data) {
  const template = `
    <section class="planet-view">
        <figure class="planet-image-container">
        <img
            src="${data.images.planet}"
            alt="Planet Image"
            class="planet-img"
        />
        </figure>
        <!-- Planet View content -->
        <div class="planet-content">
        <h1 class="planet-content__name">${data.name}</h1>
        <p class="planet-content__details">
            Third planet from the Sun and the only known planet to harbor
            life. About 29.2% of Earth's surface is land with remaining 70.8%
            is covered with water. Earth's distance from the Sun, physical
            properties and geological history have allowed life to evolve and
            thrive.
        </p>
        <cite class="planet-content__resource"
            >Source :
            <a
            class="planet-content__resource__link"
            href="https://en.wikipedia.org/wiki/Earth"
            >Wikipedia</a
            >
        </cite>
        <!-- Different Views Selector Buttons -->
        <div class="planet-content__views">
            <button class="planet-content__alt-view btn-active">
            <span class="planet-content__alt-view-num">01</span>
            Overview
            </button>
            <button class="planet-content__alt-view">
            <span class="planet-content__alt-view-num">02</span> Internal
            Structure
            </button>
            <button class="planet-content__alt-view">
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
        <h3 class="data-box__data">0.99 Days</h3>
        </div>
        <div class="data-box">
        <p class="data-box__title">Revolution Time</p>
        <h3 class="data-box__data">365.26 Days</h3>
        </div>
        <div class="data-box">
        <p class="data-box__title">Radius</p>
        <h3 class="data-box__data">6,371 KM</h3>
        </div>
        <div class="data-box">
        <p class="data-box__title">Average Temp.</p>
        <h3 class="data-box__data">16°c</h3>
        </div>
    </section>
    `;
  return template;
}
