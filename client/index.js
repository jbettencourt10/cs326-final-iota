import { getTopBooks } from './book-functions.js';
import { getTopIMDB } from './imdb-functions.js';
import {getTopTracks} from './lastfm-functions.js';


window.addEventListener('load', loadLandingMediaList('Movies'));

const signUpButton = document.getElementById('sign-up-button');
signUpButton.addEventListener('click', () => {
  location.href = "/register";
})


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
  //document.getElementById('mediaList').innerHTML = '';
  loadLandingMediaList('Books');
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
  loadLandingMediaList('Music');
}

// TODO: make this look better
async function loadLandingMediaList(media) {
  document.getElementById('mediaList').innerHTML = '';
  let top100Media;
  if (media === 'Movies' || media === 'TVs'){
    top100Media = await getTopIMDB(media);
  }
  else if (media === 'Books'){
    top100Media = await getTopBooks();
  }
  else {
    top100Media = await getTopTracks();
  }
  top100Media = top100Media.slice(0, 12);
  const mediaList = document.getElementById('mediaList');
  for (let i = 0; i < top100Media.length; ++i) {
    const row = document.createElement('div');
    row.classList.add('grid-item');
    const image = document.createElement('div');
    image.classList.add('col');
    image.classList.add('image-col');

    const figure = document.createElement('figure');
    figure.classList.add('figure');

    const img = document.createElement('img');
    img.width = 150;
    if (media === 'Movies' || media === 'TVs'){
      img.src = top100Media[i].image;
    }
    else if (media === 'Books'){
      img.src = top100Media[i].book_image;
    }
    else {
      img.src = top100Media[i].image[2]['#text'];
    }

    img.classList.add('figure-img', 'img-fluid', 'rounded');
    img.alt = 'Image Placeholder';

    figure.appendChild(img);
    image.appendChild(figure);
    row.appendChild(image);

    const title = document.createElement('div');
    title.classList.add('col');
    title.classList.add('title-col');
    if (media === 'Movies' || media === 'TVs'){
      title.innerHTML = top100Media[i].title;
    }
    else if (media === 'Books'){
      title.innerHTML = `${top100Media[i].title} - ${top100Media[i].author}`;
    }
    else {
      title.innerHTML = top100Media[i].name;
    }
    row.appendChild(title);

    const rating = document.createElement('div');
    rating.classList.add('col');
    if (media === 'Movies' || media === 'TVs'){
      rating.innerHTML = `Rating = ${top100Media[i].imDbRating}`;
    }
    else if (media === 'Books'){
      rating.innerHTML = `New Yorks Times Best Seller #${top100Media[i].rank}`;
    }
    else {
      rating.innerHTML = `LastFM Total Play Count: ${top100Media[i].playcount}`;
    }
    row.appendChild(rating);
    mediaList.appendChild(row);
  }
}
