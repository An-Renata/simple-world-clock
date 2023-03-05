"use strict";

const cityName = document.querySelector(".city-name");
const date = document.querySelector(".date");
const citiesContainer = document.querySelector(".container");
const selectCityElement = document.querySelector("#cities");

let updateInterval;

let mainCities = [
  "Europe/Paris",
  "America/New_York",
  "Europe/London",
  "Europe/Vilnius",
];

const formatDate = function (city) {
  const now = moment().tz(city).format("MMMM Do, YYYY");
  return now;
};

const formatTime = function (city) {
  const now = moment.tz(city);
  const currTime = now.format("HH:mm:ss [<small>]A[</small>]");
  return currTime;
};

const formatCityName = function (city) {
  const name = moment().tz(city);
  const nameExtracted = name.tz();
  const showCityName = nameExtracted.split("/").slice(-1).join(" ");

  if (showCityName.includes("_")) {
    return showCityName.split("_").join(" ");
  }
  return showCityName;
};

function displaySelectInputs() {
  const cityNames = moment.tz.names();

  cityNames.forEach((city) => {
    const updatedName = city
      .split("/")
      .slice(-1)
      .join(" ")
      .replaceAll("_", " ");
    if (updatedName === "") return;

    const html = `
        <option value="${city}">${updatedName}</option>
    `;
    selectCityElement.insertAdjacentHTML("beforeend", html);
  });
}
displaySelectInputs();

const updateTime = function (cityName) {
  const cityTimeEl = document.querySelectorAll(".current-time");
  cityTimeEl.forEach((el, i) => {
    const city = cityName[i];
    const currentTime = formatTime(city);
    el.innerHTML = currentTime;
  });
};

const renderCityTimeData = function (cityName) {
  cityName.forEach(function (city) {
    const html = `
    <div class="city-container">
            <div class="city">
            <h3 class="city-name">${formatCityName(city)}</h3>
            <p class="date">${formatDate(city)}</p>
            </div>
            <div class="city-time">
            <p class="current-time"> 
            ${formatTime(city)}
            </p>
            </div>
            </div>
            `;
    citiesContainer.insertAdjacentHTML("beforeend", html);
  });
  updateInterval = setInterval(updateTime, 1000, mainCities);
};

renderCityTimeData(mainCities);

const updateSelectElement = function (e) {
  const city = e.target.value;
  const cityRowContainer = document.querySelectorAll(".city-container");
  console.log(city);

  if (!city) return;

  cityRowContainer.forEach((el) => {
    if (city) el.style.display = "none";
  });
  const html = `
    <div class="city-container">
    <div class="city">
    <h3 class="city-name">${formatCityName(city)}</h3>
    <p class="date">${formatDate(city)}</p>
    </div>
    <div class="city-time">
    <p class="current-time">
    ${formatTime(city)}
    </p>
    </div>
   </div>`;

  clearInterval(updateInterval);

  // updateInterval = setInterval(updateTime, 1000, [city]);
  citiesContainer.insertAdjacentHTML("beforeend", html);
};
selectCityElement.addEventListener("change", updateSelectElement);
