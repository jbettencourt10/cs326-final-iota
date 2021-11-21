// import fs from 'fs';

// Note:These event listeners need to check for what page actually needs to be loaded
window.addEventListener('load', loadLandingMediaList);
window.addEventListener('load', loadInProgressList);

const IMDB_API_KEY = 'k_t249l7q8';


// const userFile = './user.json';
// const testAccount = JSON.parse(fs.readFileSync(userFile));

function loadMovieList(){
  let movieList = "";
  testAccount.movieList.forEach(e => movieList.concat(e+" "));
  document.getElementById("inProgress").innerHTML = movieList;
}

function loadTVShowList(){
  let tvList = "";
  testAccount.tv_list.forEach(e => tvList.concat(e+" "));
  document.getElementById("inProgress").innerHTML = tvList;
}

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
  // If the below segment is necessary, just put it back in.
  // It was breaking the landing page, -jb
  // if(window.location.pathname !== ''){
  //   return;
  // }
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
    img.width = 100;
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
};

function loadInProgressList(){
  console.log(window.location.pathname);
  if(window.location.pathname !== '/login'){
    return;
  }
  const container = document.getElementById("inProgress");
  const leftArrowContainer = document.createElement('div');
  leftArrowContainer.classList.add("col-1", "arrowContainer", "d-flex", "align-items-center", "justify-content-end", "clickable");
  const leftArrow = document.createElement('p');
  leftArrow.classList.add("arrow");
  leftArrow.innerHTML = "<";
  leftArrowContainer.appendChild(leftArrow);
  container.appendChild(leftArrowContainer);
  
  for(let i = 0; i<5; ++i){
    const mediaItem = document.createElement('div');
    mediaItem.classList.add("col", "mediaItem", "d-flex", "align-items-center", "justify-content-center");
    const row = document.createElement('div');
    row.classList.add("row");
    mediaItem.appendChild(row);
    const mediaImageContainer = document.createElement('div');
    mediaImageContainer.classList.add("col");
    const mediaImage = document.createElement('img');
    mediaImage.width = 100;
    mediaImage.classList.add('figure-img', 'img-fluid', 'rounded');
    mediaImage.alt = 'Image Placeholder';
    mediaImageContainer.appendChild(mediaImage);
    row.appendChild(mediaImageContainer);
    const mediaOptions = document.createElement('div');
    mediaOptions.classList.add("col");
    mediaOptions.innerHTML = "Title Goes Here";
    //Add rating, update rating button, and dropdown to change list in form
    const form = document.createElement('form');
    form.method = "get";
    const rating = document.createElement('input');
    //use pattern to enforce this
    rating.type = 'number';
    rating.name = "Rating";
    rating.min = "0.0";
    rating.max = "10.0";
    rating.step = "0.1";
    rating.placeholder = "Rating";

    const moveSelection = document.createElement('select');
    const empty = document.createElement('option');
    empty.value = "empty";
    empty.innerHTML = "Move to...";
    const completed = document.createElement('option');
    completed.value = "completed";
    completed.innerHTML = "Completed";
    const wishlist = document.createElement('option');
    wishlist.value = "wishlist";
    wishlist.innerHTML = "Wishlist";
    const remove = document.createElement('option');
    remove.value = "remove";
    remove.innerHTML = "Remove";
    moveSelection.appendChild(empty);
    moveSelection.appendChild(completed);
    moveSelection.appendChild(wishlist);
    moveSelection.appendChild(remove);

    const updateButton = document.createElement('input');
    updateButton.classList.add("btn", "btn-primary");
    updateButton.type = 'submit';
    updateButton.value = 'Update'
    
    form.appendChild(rating);
    form.appendChild(moveSelection);
    form.appendChild(updateButton);
    mediaOptions.appendChild(form);
    row.appendChild(mediaOptions);
    container.appendChild(mediaItem);
  }

  const rightArrowContainer = document.createElement('div');
  rightArrowContainer.classList.add("col-1", "arrowContainer", "d-flex", "justify-content-start", "align-items-center", "clickable");
  const rightArrow = document.createElement('p');
  rightArrow.classList.add("arrow")
  rightArrow.innerHTML = ">";
  rightArrowContainer.appendChild(rightArrow);
  container.appendChild(rightArrowContainer);
}
