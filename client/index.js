import { getTopBooks } from './book-functions.js';
import { getTopIMDB } from './imdb-functions.js';


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
  console.log(top100Media);
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
    if (media === 'Movies' || media === 'TVs'){
      img.src = top100Media[i].image;
    }
    else if (media === 'Books'){
      img.src = top100Media[i].book_image;
    }
    
    img.classList.add('figure-img', 'img-fluid', 'rounded');
    img.alt = 'Image Placeholder';

    figure.appendChild(img);
    image.appendChild(figure);
    row.appendChild(image);

    const title = document.createElement('div');
    title.classList.add('col');
    if (media === 'Movies' || media === 'TVs'){
      title.innerHTML = top100Media[i].title;
    }
    else if (media === 'Books'){
      title.innerHTML = `${top100Media[i].title} by ${top100Media[i].author}`;
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
    row.appendChild(rating);
    mediaList.appendChild(row);
  }
}
