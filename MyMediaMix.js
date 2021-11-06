window.addEventListener('load', loadLandingMediaList);

function landingBooks(){
  document.getElementById("trendingText").innerHTML = "Trending Books";
}

function landingMovies(){
  document.getElementById("trendingText").innerHTML = "Trending Movies";
}

function landingTVShows(){
  document.getElementById("trendingText").innerHTML = "Trending TV Shows";
}

function landingMusic(){
  document.getElementById("trendingText").innerHTML = "Trending Music";
}

function loadLandingMediaList(){
  const mediaList = document.getElementById("mediaList");
  for(let i = 0; i < 5; ++i){
    const row = document.createElement("div");
    row.classList.add("row");
    const image = document.createElement("div");
    image.classList.add("col");

    const figure = document.createElement("figure");
    figure.classList.add("figure");

    const img = document.createElement("img");
    img.src = "placeholder";
    img.classList.add("figure-img", "img-fluid", "rounded");
    img.alt = "Image Placeholder";

    figure.appendChild(img);
    image.appendChild(figure);
    row.appendChild(image)

    const title = document.createElement("div");
    title.classList.add("col");
    title.innerHTML = "Insert Title";
    row.appendChild(title);

    const rating = document.createElement("div");
    rating.classList.add("col");
    rating.innerHTML = "Insert Rating";
    row.appendChild(rating);
    mediaList.appendChild(row);
  }
}

function switchToSignUp(){
  window.location.href = "/sign-up.html";
}

function switchToLanding(){
  window.location.href = "/index.html";
}

function switchToHome(){
  window.location.href = "/list.html";
}

function processSignIn(){
  //do somthing
  switchToHome();
}