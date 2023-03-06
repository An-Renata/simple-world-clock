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

const timezoneToCityName = function (tz) {
  return tz.split("/").slice(-1).join(" ").replaceAll("_", " ");
};

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
  const showCityName = timezoneToCityName(nameExtracted);
  return showCityName;
};

function displaySelectInputs() {
  const cityNames = moment.tz.names();

  cityNames.forEach((city) => {
    const updatedName = timezoneToCityName(city);
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

const insertCityTimeData = function (tz, container) {
  const html = `
  <div class="city-container">
          <div class="city">
          <h3 class="city-name">${formatCityName(tz)}</h3>
          <p class="date">${formatDate(tz)}</p>
          </div>
          <div class="city-time">
          <p class="current-time">
          ${formatTime(tz)}
          </p>
          </div>
          </div>
          `;
  container.insertAdjacentHTML("beforeend", html);
};

const renderCityTimeData = function (cityName) {
  cityName.forEach((tz) => {
    insertCityTimeData(tz, citiesContainer);
  });
  updateInterval = setInterval(updateTime, 1000, mainCities);
};
renderCityTimeData(mainCities);

const updateSelectElement = function (e) {
  const cityRowContainer = document.querySelectorAll(".city-container");
  const city = e.target.value;

  if (!city) return;

  cityRowContainer.forEach((el) => {
    el.style.display = "none";
  });

  clearInterval(updateInterval);
  insertCityTimeData(city, citiesContainer);
  setInterval(updateTime, 1000, [city]);
};
selectCityElement.addEventListener("change", updateSelectElement);
