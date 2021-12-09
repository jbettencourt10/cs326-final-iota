//Should change this to bootstrap row col later
//limit search length or have a go to top button
import { searchBook } from "./book-functions.js";
import { imdbSearch } from "./imdb-functions.js";
import { searchAlbums } from "./lastfm-functions.js";

const searchMedium = new URLSearchParams(window.location.search).get('medium');
const searchTitle = new URLSearchParams(window.location.search).get('title');

if (searchTitle !== '' && searchMedium !== 'empty'){
  loadSearchList(searchMedium, searchTitle);
}
else{
  alert('Please provide both Title and Medium for searching.')
}

async function loadSearchList(medium, title) {
  const searchList = document.getElementById('searchList');
  const query = {
    medium: medium,
    title: title,
  };
  let searchResults;
  let results;
  if (medium === 'Movie' || medium === 'Series'){
    searchResults = await imdbSearch(query);
    results = searchResults.results;
  }
  else if (medium === 'books'){
    searchResults = await searchBook(query);
    results = searchResults.items
  }
  else{
    results = await searchAlbums(query);
  }

  if (results.length === 0){
    searchList.innerText = 'No result';
  }
  else{
    for (let i = 0; i < results.length; ++i) {
      const image = document.createElement('div');
      image.classList.add('col');
      image.classList.add('grid-item');

      const figure = document.createElement('figure');
      figure.classList.add('figure');

      const img = document.createElement('img');
      img.width = 100;
      if (medium === 'Movie' || medium === 'Series'){
        img.src = results[i].image;
      }
      else if (medium === 'books'){
        if (results[i].volumeInfo.imageLinks){
          img.src = results[i].volumeInfo.imageLinks.smallThumbnail;
        }
        else{
          img.src = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';
        }
      }
      else{
        if (results[i].image[2]['#text']){
          img.src = results[i].image[2]['#text'];
        }
        else{
          img.src = 'https://player.listenlive.co/templates/StandardPlayerV4/webroot/img/default-cover-art.png';
        }
      }

      img.classList.add('figure-img', 'img-fluid', 'rounded');
      img.alt = 'Image Placeholder';

      figure.appendChild(img);
      image.appendChild(figure);

      const text = document.createElement('div');
      text.classList.add('col');
      text.classList.add('grid-item');
      const title = document.createElement('p');
      title.classList.add('search-title');
      const description = document.createElement('p');
      description.classList.add('search-description');
      if (medium === 'Movie' || medium === 'Series'){
        title.innerHTML = results[i].title;
        description.innerHTML = results[i].description;
      }
      else if (medium === 'books'){
        if (results[i].volumeInfo.authors){
          title.innerHTML = `${results[i].volumeInfo.title}`;
          description.innerHTML = `by ${results[i].volumeInfo.authors[0]}`;
        }
        else{
          title.innerHTML = `${results[i].volumeInfo.title}`;
          description.innerHTML = '';
        }
      }
      else{
        title.innerHTML = `${results[i].name}`;
        description.innerHTML = `by ${results[i].artist}`;
      }
      text.appendChild(title);
      text.appendChild(description);


      //add action
      const add = document.createElement('div');
      add.classList.add('col', 'justify-content-end');
      add.classList.add('grid-item');
      const form = document.createElement('form');
      form.method = 'get';
      form.action = '/add';

      const inputTitle = document.createElement('input');
      inputTitle.type = 'hidden';
      inputTitle.name = 'Title';
      if (medium === 'Movie' || medium === 'Series'){
        inputTitle.innerHTML = results[i].title;
      }
      else if (medium === 'books'){
        inputTitle.innerHTML = results[i].volumeInfo.title;
      }
      else{
        inputTitle.innerHTML = results[i].name;
      }
      //inputTitle.value = results[i].title;

      const inputImage = document.createElement('input');
      inputImage.type = 'hidden';
      inputImage.name = 'ImageLink';
      if (medium === 'Movie' || medium === 'Series'){
        inputImage.src = results[i].image;
      }
      else if (medium === 'books'){
        if (results[i].volumeInfo.imageLinks){
          inputImage.src = results[i].volumeInfo.imageLinks.smallThumbnail;
        }
        else{
          inputImage.src = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';
        }
      }
      else{
        if (results[i].image[2]['#text']){
          inputImage.src = results[i].image[2]['#text'];
        }
        else{
          inputImage.src = 'https://player.listenlive.co/templates/StandardPlayerV4/webroot/img/default-cover-art.png';
        }
      }
      //inputImage.value = results[i].image;

      const inputMedium = document.createElement('input');
      inputMedium.type = 'hidden';
      inputMedium.name = 'Medium';
      inputMedium.value = medium;

      form.appendChild(inputTitle);
      form.appendChild(inputImage);
      form.appendChild(inputMedium);

      const addButton = document.createElement('input');
      addButton.type = 'submit';
      addButton.classList.add('btn', "btn-success", "btn-primary", "add-button");
      addButton.role = "button";
      addButton.value = "Add to Wishlist";
      form.appendChild(addButton);
      add.appendChild(form);
      searchList.appendChild(image);
      searchList.appendChild(text);
      searchList.appendChild(add);

      //add "Add to Custom List" button
     }
  }
}
