"use strict";

const cityName = document.querySelector(".city-name");
const date = document.querySelector(".date");
const citiesContainer = document.querySelector(".container");
const mainCities = [
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
  const currTime = moment().tz(city).format("HH:mm:ss [<small>]A[</small>]");
  return currTime;
};

const formatCityName = function (city) {
  const name = moment().tz(city).tz();
  const showCityName = name.split("/").slice(1).join(" ");

  if (showCityName.includes("_")) {
    return showCityName.split("_").join(" ");
  }
  return showCityName;
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
};

renderCityTimeData(mainCities);

const updateTime = function () {
  const cityTimeEl = document.querySelectorAll(".current-time");
  cityTimeEl.forEach((el, i) => {
    const city = mainCities[i];
    const currentTime = formatTime(city);
    el.innerHTML = currentTime;
  });
};
setInterval(updateTime, 1000);
