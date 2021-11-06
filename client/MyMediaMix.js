window.addEventListener('load', loadLandingMediaList);

const IMDB_API_KEY = 'k_t249l7q8';

function landingBooks() {
  document.getElementById("trendingText").innerHTML = "Trending Books";
}

function landingMovies() {
  document.getElementById("trendingText").innerHTML = "Trending Movies";
}

function landingTVShows() {
  document.getElementById("trendingText").innerHTML = "Trending TV Shows";
}

function landingMusic() {
  document.getElementById("trendingText").innerHTML = "Trending Music";
}

async function getTopMovies() {
  // TODO: error check
  const response = await fetch('https://imdb-api.com/en/API/MostPopularMovies/'.concat(IMDB_API_KEY));
  const top100Movies = await response.json();
  return top100Movies;
};


async function loadLandingMediaList() {
  const top100MoviesObject = await getTopMovies();
  const top100Movies = top100MoviesObject['items'].slice(0,5);
  const mediaList = document.getElementById("mediaList");
  for (let i = 0; i < 5; ++i) {
    const row = document.createElement("div");
    row.classList.add("row");
    const image = document.createElement("div");
    image.classList.add("col");

    const figure = document.createElement("figure");
    figure.classList.add("figure");

    const img = document.createElement("img");
    img.src = top100Movies[i]['image'];
    img.classList.add("figure-img", "img-fluid", "rounded");
    img.alt = "Image Placeholder";

    figure.appendChild(img);
    image.appendChild(figure);
    row.appendChild(image);

    const title = document.createElement("div");
    title.classList.add("col");
    title.innerHTML = top100Movies[i]['title'];
    row.appendChild(title);

    const rating = document.createElement("div");
    rating.classList.add("col");
    rating.innerHTML = top100Movies[i]['imDbRating'];
    row.appendChild(rating);
    mediaList.appendChild(row);
  }
}

function switchToSignUp() {
  window.location.href = "/sign-up.html";
}

function switchToLanding() {
  window.location.href = "/index.html";
}

function switchToHome() {
  window.location.href = "/list.html";
}

function processSignIn() {
  //do somthing
  switchToHome();
}
