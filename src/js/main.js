"use strict";
console.log("ready :)");

const btn = document.querySelector(".js-btn");
const inputSearch = document.querySelector(".js-search");
const favouriteSeries = document.querySelector(".js-favourite");
const resultSeries = document.querySelector(".js-results");
let normalSeries = [];
let favouriteList = [];
const urlBad =
  "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
const urlDefault =
  "https://placehold.co/210x295/e95626/FFFFFF/png?text=Hello+Teacher";

function handleImgClick(event) {
  const idSeriesClicked = parseInt(event.currentTarget.id);
  console.log(idSeriesClicked);

  const findSerie = normalSeries.find(
    (series) => idSeriesClicked === series.mal_id
  );
  console.log(normalSeries);

  const indexFavourite = favouriteList.findIndex(
    (series) => idSeriesClicked === series.mal_id
  );
  console.log(indexFavourite);

  if (indexFavourite === -1) {
    favouriteList.push(findSerie);
  }
  console.log(favouriteList);

  event.target.classList.add("colorImg");
  favouriteAnime();
  localStorage.setItem("favouriteList", JSON.stringify(favouriteList));
}

function favouriteAnime() {
  let html2 = "";
  for (const favourite of favouriteList) {
    let imageUrl = favourite.images.jpg.image_url;
    if (imageUrl === urlBad) {
      imageUrl = urlDefault;
    }
    html2 += `<li>${favourite.title}</li>`;
    html2 += `<img src="${imageUrl}" alt="${favourite.title}" id="${favourite.mal_id}">`;
  }

  favouriteSeries.innerHTML = `<ul>Series Favoritas ${html2}</ul>`;
}


function setupImageEvents() {
  const animeImg = document.querySelectorAll(".js-results img");
  animeImg.forEach((img) => {
    img.addEventListener("click", handleImgClick);
  });
  console.log(animeImg);
}

function getDataApi() {
  const url = `https://api.jikan.moe/v4/anime?q=${inputSearch.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      normalSeries = data.data;
      let listHTML = "";
      for (let i = 0; i < normalSeries.length; i++) {
        const title = normalSeries[i].title;
        let imageUrl = normalSeries[i].images.jpg.image_url;
        if (imageUrl === urlBad) {
          imageUrl = urlDefault;
        }
        listHTML += `<li>${title}</li>`;
        listHTML += `<img src="${imageUrl}" alt="${title}" id="${normalSeries[i].mal_id}">`;
      }
      resultSeries.innerHTML = `<ul>Resultados${listHTML}</ul>`;
      setupImageEvents();
    });
}

const handleClick = (event) => {
  event.preventDefault();
  getDataApi();
};

btn.addEventListener("click", handleClick);

