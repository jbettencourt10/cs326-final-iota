window.addEventListener('load', loadLandingMediaList);

const IMDB_API_KEY = 'k_t249l7q8';


function landingBooks() {
  document.getElementById('trendingText').innerHTML = 'Trending Books';
  // Temporary until we get a book API
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
  // Temporary until we get a music API
  document.getElementById('mediaList').innerHTML = '';
}

// Takes argument 'Movies' or 'TVs'
async function getTopIMDB(media) {
  // TODO: error check
  const response = await fetch(`https://imdb-api.com/en/API/MostPopular${media}${'/'.concat(IMDB_API_KEY)}`);
  const top100 = await response.json();
  return top100;
}



// Takes argument 'Movies' or 'TVs'

async function loadLandingMediaList(media) {
  document.getElementById('mediaList').innerHTML = '';
  const top100MoviesObject = await getTopIMDB(media);
  const top100Movies = top100MoviesObject.items.slice(0, 5);
  const mediaList = document.getElementById('mediaList');
  for (let i = 0; i < 5; ++i) {
    const row = document.createElement('div');
    row.classList.add('row');
    const image = document.createElement('div');
    image.classList.add('col');

    const figure = document.createElement('figure');
    figure.classList.add('figure');

    const img = document.createElement('img');
    img.src = top100Movies[i].image;
    img.classList.add('figure-img', 'img-fluid', 'rounded');
    img.alt = 'Image Placeholder';

    figure.appendChild(img);
    image.appendChild(figure);
    row.appendChild(image);

    const title = document.createElement('div');
    title.classList.add('col');
    title.innerHTML = top100Movies[i].title;
    row.appendChild(title);

    const rating = document.createElement('div');
    rating.classList.add('col');
    rating.innerHTML = top100Movies[i].imDbRating;
    row.appendChild(rating);
    mediaList.appendChild(row);
  }
}


function processSignIn() {
  // do somthing
  switchToHome();
};;
