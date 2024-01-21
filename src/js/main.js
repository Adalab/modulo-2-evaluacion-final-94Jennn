"use strict";
console.log("ready :)");

const btn = document.querySelector(".js-btn");
const inputSearch = document.querySelector(".js-search");
const favouriteSeries = document.querySelector(".js-favourite");
const resultSeries = document.querySelector(".js-results");
let normalSeries = [];
let favouriteList = [];
const urlBad = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
const urlDefault = "https://placehold.co/210x295/e95626/FFFFFF/png?text=Hello+Teacher";


function handleImgClick(event) {
    const seriesTitle = event.target.parentElement.querySelector("h3");
    const seriesImage = event.target.src;
    console.log(seriesTitle);
    
    if (!favouriteList.some(series => series.title === seriesTitle)) {
        favouriteList.push({title: seriesTitle, image: seriesImage});
    }

    event.target.classList.add('colorImg');
    favouriteSeries.innerHTML = `<ul>Series Favoritas</ul>`;
    favouriteList.forEach(series => {
        favouriteSeries.innerHTML += `
            <li>
                <h3>${series.title}</h3>
                <img src="${series.image}" alt="${series.title}">
            </li>
       `; 
    });
    localStorage.setItem('favouriteList', JSON.stringify(favouriteList));
}

function setupImageEvents() {
    const animeImg = document.querySelectorAll(".js-results img");
    animeImg.forEach((img) => {
        img.addEventListener("click", handleImgClick);
    });
    console.log(animeImg);    
    /*for (let i= 0; i < animeImg.length; i++) {
        if (animeImg[i].data === ) {
        console.log('estoy dentro del if con' [i] );
        }
    }*/
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
        if (imageUrl === urlBad){
            imageUrl = urlDefault;
        }
        listHTML += `<li>${title}</li>`;
        listHTML += `<img src="${imageUrl}" alt="${title}">`;
      }
      resultSeries.innerHTML = `<ul>Resultados${listHTML}</ul>`;
      setupImageEvents();
    });
}

//AGREGAR EVENTO DE CLICK A CADA IMAGEN:

const handleClick = (event) => {
  event.preventDefault();
  /*normalSeries = inputSearch.value;*/
  getDataApi();
};

btn.addEventListener("click", handleClick);


/*function handleImageClick(event) {
  event.target.classList.toggle("colorImg");
}*/

/*function setupImageEvents() {
  const animeImgs = document.querySelectorAll("img");
  animeImgs.forEach((img) => {
    img.addEventListener("click", handleImageClick);
  });
  console.log(animeImgs);
}*/
