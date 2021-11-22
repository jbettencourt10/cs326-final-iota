import { getTopIMDB } from './imdb-functions.js';

// Note:These event listeners need to check for what page actually needs to be loaded
window.addEventListener('load', landingMovies);

const booksButton = document.getElementById('books-index');
const showButton = document.getElementById('tv-shows-index');
const movieButton = document.getElementById('movie-index');
const musicButton = document.getElementById('music-index');

booksButton.addEventListener('click', landingBooks);
showButton.addEventListener('click', landingTVShows);
movieButton.addEventListener('click', landingMovies);
musicButton.addEventListener('click', landingMusic);


function landingBooks() {
  document.getElementById('trendingText').innerHTML = 'Trending Books';
  document.getElementById('mediaList').innerHTML = '';
}

function landingMovies() {
  document.getElementById('trendingText').innerHTML = 'Trending Movies';
  loadLandingMediaList('Movies');
}

function landingTVShows() {
  document.getElementById('trendingText').innerHTML = 'Trending TV Shows';
  loadLandingMediaList('TVs');
}

function landingMusic() {
  document.getElementById('trendingText').innerHTML = 'Trending Music';
  document.getElementById('mediaList').innerHTML = '';
}


// TODO: make this look better
async function loadLandingMediaList(media) {
  document.getElementById('mediaList').innerHTML = '';
  const top100Object = await getTopIMDB(media);
  const top100Media = top100Object.items.slice(0, 5);
  const mediaList = document.getElementById('mediaList');
  for (let i = 0; i < 5; ++i) {
    const row = document.createElement('div');
    row.classList.add('row');
    const image = document.createElement('div');
    image.classList.add('col');

    const figure = document.createElement('figure');
    figure.classList.add('figure');

    const img = document.createElement('img');
    img.width = 100;
    img.src = top100Media[i].image;
    img.classList.add('figure-img', 'img-fluid', 'rounded');
    img.alt = 'Image Placeholder';

    figure.appendChild(img);
    image.appendChild(figure);
    row.appendChild(image);

    const title = document.createElement('div');
    title.classList.add('col');
    title.innerHTML = top100Media[i].title;
    row.appendChild(title);

    const rating = document.createElement('div');
    rating.classList.add('col');
    rating.innerHTML = top100Media[i].imDbRating;
    row.appendChild(rating);
    mediaList.appendChild(row);
  }
}
