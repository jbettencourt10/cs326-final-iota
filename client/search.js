//Should change this to bootstrap row col later
//limit search length or have a go to top button
import { imdbSearch } from "./imdb-functions.js";

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

  const searchResults = await imdbSearch(query);
  const results = searchResults.results;
  
  if (results.length === 0){
    searchList.innerText = 'No result';
  }
  else{
    for (let i = 0; i < results.length; ++i) {
      const row = document.createElement('div');
      row.classList.add('row', 'align-items-center');
      const image = document.createElement('div');
      image.classList.add('col');
  
      const figure = document.createElement('figure');
      figure.classList.add('figure');
  
      const img = document.createElement('img');
      img.width = 100;
      img.src = results[i].image;
      img.classList.add('figure-img', 'img-fluid', 'rounded');
      img.alt = 'Image Placeholder';
  
      figure.appendChild(img);
      image.appendChild(figure);
      row.appendChild(image);
  
      const text = document.createElement('div');
      text.classList.add('col');
      const title = document.createElement('h4');
      title.innerHTML = results[i].title;
      const description = document.createElement('p');
      description.innerHTML = results[i].description;
      text.appendChild(title);
      text.appendChild(description);
      row.appendChild(text);
  

      //add action
      const add = document.createElement('div');
      add.classList.add('col', 'justify-content-end');
      const form = document.createElement('form');
      form.method = 'get';
      form.action = '/add';

      const inputUsername = document.createElement('input');
      inputUsername.type = 'hidden';
      inputUsername.name = 'Username';
      // inputUsername.value = 

      const inputTitle = document.createElement('input');
      inputTitle.type = 'hidden';
      inputTitle.name = 'Title';
      inputTitle.value = results[i].title;

      const inputImage = document.createElement('input');
      inputImage.type = 'hidden';
      inputImage.name = 'ImageLink';
      inputImage.value = results[i].image;

      const inputMedium = document.createElement('input');
      inputMedium.type = 'hidden';
      inputMedium.name = 'Medium';
      inputMedium.value = medium;

      form.appendChild(inputTitle);
      form.appendChild(inputImage);
      form.appendChild(inputMedium);

      const addButton = document.createElement('input');
      addButton.type = 'submit';
      addButton.classList.add('btn', "btn-success", "largeFont");
      addButton.role = "button";
      addButton.value = "+";
      
      form.appendChild(addButton);
      add.appendChild(form);
      row.appendChild(add)
      searchList.appendChild(row);
     }
  }
}