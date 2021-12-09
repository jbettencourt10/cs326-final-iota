import { getTopBooks } from "./book-functions.js";
import { getTopIMDB } from "./imdb-functions.js";
import { getTopTracks } from "./lastfm-functions.js";

window.addEventListener('load', () => loadLists("all"));
window.addEventListener('load', greetUser);
window.addEventListener('load', () => loadTrendingList("all"));
let listIndex = 0;

/**
 * 
 * @param {string} listName 
 * @param {int} direction 
 */
async function shiftList(listName, direction, mediaType){
  if(direction === -1 && listIndex === 0){
    return null;
  }
  const response = await fetch(`${document.location.origin}/getList?list=${listName}&limit=5&offset=${listIndex+direction}&mediaType=${mediaType}`);
  const list = await response.json();
  const listLength = list.length;
  if(direction === -1 || direction === 1 && listLength === 5){
    listIndex += direction;
    const mediaList = document.getElementById(listName);
    const rightArrow = mediaList.childNodes[6];
    for(let i = 0; i < 5; ++i){
      mediaList.removeChild(mediaList.childNodes[1])
    }
    for(let i = 0; i < 5; ++i){
      const mediaItem = document.createElement('div')
      mediaItem.classList.add('col', 'align-items-center', 'justify-content-center', 'mediaItem');
      const row = document.createElement('div');
      row.classList.add('row');
      mediaItem.appendChild(row);
      if(i < listLength){
        const mediaImageContainer = document.createElement('div');
        mediaImageContainer.classList.add('col');
        const mediaImage = document.createElement('img');
        mediaImage.width = 100;
        mediaImage.src = list[i].imagelink;
        mediaImage.classList.add('figure-img', 'img-fluid', 'rounded');
        mediaImage.alt = 'Image Placeholder';
        mediaImageContainer.appendChild(mediaImage);
        row.appendChild(mediaImageContainer);
        const mediaOptions = document.createElement('div');
        mediaOptions.classList.add('col');
        if(list[i].userrating){
          mediaOptions.innerHTML = list[i].title + " Rating: " + list[i].userrating;
        }else{
          mediaOptions.innerHTML = list[i].title;
        }
        // Add rating, update rating button, and dropdown to change list in form
        const form = document.createElement('form');
        form.method = 'get';
        form.action = '/updateItem';
        const inputTitle = document.createElement('input');
        inputTitle.type = 'hidden';
        inputTitle.name = 'title';
        inputTitle.value = list[i].title;
        form.appendChild(inputTitle);

        const rating = document.createElement('input');

        // use pattern to enforce this
        rating.name = 'rating';
        rating.type = 'number';
        rating.min = '0.0';
        rating.max = '10.0';
        rating.step = '0.1';
        rating.placeholder = 'Rating';

        const moveSelection = document.createElement('select');
        moveSelection.name = 'list';
        const empty = document.createElement('option');
        empty.value = 'empty';
        empty.innerHTML = 'Move to...';
        moveSelection.appendChild(empty);
        if(listName !== 'inProgress'){
          const inProgress = document.createElement('option');
          inProgress.value = 'inProgress';
          inProgress.innerHTML = 'In Progress';
          moveSelection.appendChild(inProgress);
        }
        if(listName !== 'completed'){
          const completed = document.createElement('option');
          completed.value = 'completed';
          completed.innerHTML = 'Completed';
          moveSelection.appendChild(completed);
        }
        if(listName !== 'planned'){
          const planned = document.createElement('option');
          planned.value = 'planned';
          planned.innerHTML = 'Planned';
          moveSelection.appendChild(planned);
        }
        const remove = document.createElement('option');
        remove.value = 'remove';
        remove.innerHTML = 'Remove';

        moveSelection.appendChild(remove);

        const updateButton = document.createElement('input');
        updateButton.classList.add('btn', 'btn-primary');
        updateButton.type = 'submit';
        updateButton.value = 'Update';

        form.appendChild(rating);
        form.appendChild(moveSelection);
        form.appendChild(updateButton);
        mediaOptions.appendChild(form);
        row.appendChild(mediaOptions);
      }
      
      mediaList.insertBefore(mediaItem, rightArrow)
    }
  }
}


async function loadTrendingList(mediaType){
  listIndex = 0;
  const mediaList = document.getElementById('top');
  mediaList.innerHTML = '';
  let list;
  if (mediaType === "all" || mediaType === "Movies"){
    list = await getTopIMDB('Movies');
  }
  else if (mediaType === "Series"){
    list = await getTopIMDB("TVs");
  }
  else if (mediaType === "books"){
    list = await getTopBooks();
  }
  else{
    list = await getTopTracks();
  }
  const listLength = Math.min(5, list.length);

  const leftArrowContainer = document.createElement('div');
  leftArrowContainer.onclick = () => shiftList(listName, -1, mediaType);
  leftArrowContainer.classList.add('col-1', 'd-flex', 'align-items-center', 'justify-content-end', 'clickable', 'arrowContainer');
  const leftArrow = document.createElement('p');
  leftArrow.classList.add('arrow');
  leftArrow.innerHTML = '<';
  leftArrowContainer.appendChild(leftArrow);
  mediaList.appendChild(leftArrowContainer);

  for (let i = 0; i < 5; ++i) {
    const mediaItem = document.createElement('div');
    mediaItem.classList.add('col', 'd-flex', 'align-items-center', 'justify-content-center', 'mediaItem');
    const row = document.createElement('div');
    row.classList.add('row');
    mediaItem.appendChild(row);
    if(i < listLength){
      const mediaImageContainer = document.createElement('div');
      mediaImageContainer.classList.add('col');
      const mediaImage = document.createElement('img');
      mediaImage.width = 100;
      if (mediaType === 'Movies' || mediaType === 'Series' || mediaType === 'all'){
        mediaImage.src = list[i].image;
      }
      else if (medium === 'books'){
        if (results[i].volumeInfo.imageLinks){
          mediaImage.src = list[i].volumeInfo.imageLinks.smallThumbnail;
        }
        else{
          mediaImage.src = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';
        }
      }
      else{
        if (results[i].image[2]['#text']){
          mediaImage.src = list[i].image[2]['#text'];
        }
        else{
          mediaImage.src = 'https://player.listenlive.co/templates/StandardPlayerV4/webroot/img/default-cover-art.png';
        }
      }
      mediaImage.classList.add('figure-img', 'img-fluid', 'rounded');
      mediaImage.alt = 'Image Placeholder';
      mediaImageContainer.appendChild(mediaImage);
      row.appendChild(mediaImageContainer);

      const mediaOptions = document.createElement('div');
      mediaOptions.classList.add('col');
      if (mediaType === 'Movies' || mediaType === 'Series' || mediaType === 'all'){
        mediaOptions.innerHTML = list[i].title;
      }
      else if (medium === 'books'){
        mediaOptions.innerHTML = list[i].volumeInfo.title;
      }
      else{
        mediaOptions.innerHTML = list[i].name;
      }
      
      // Add rating, update rating button, and dropdown to change list in form
      const form = document.createElement('form');
      form.method = 'get';
      form.action = '/add';
      const inputTitle = document.createElement('input');
      inputTitle.type = 'hidden';
      inputTitle.name = 'Title';
      if (mediaType === 'Movies' || mediaType === 'Series' || mediaType === 'all'){
        inputTitle.value = list[i].title;
      }
      else if (mediaType === 'books'){
        inputTitle.value = list[i].volumeInfo.title;
      }
      else{
        inputTitle.value = list[i].name;
      }

      const inputImage = document.createElement('input');
      inputImage.type = 'hidden';
      inputImage.name = 'ImageLink';
      if (mediaType === 'Movies' || mediaType === 'Series' || mediaType === 'all'){
        inputImage.value = list[i].image;
      }
      else if (mediaType === 'books'){
        if (list[i].volumeInfo.imageLinks){
          inputImage.value = list[i].volumeInfo.imageLinks.smallThumbnail;
        }
        else{
          inputImage.value = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';
        }
      }
      else{
        if (list[i].image[2]['#text']){
          inputImage.value = list[i].image[2]['#text'];
        }
        else{
          inputImage.value = 'https://player.listenlive.co/templates/StandardPlayerV4/webroot/img/default-cover-art.png';
        }
      }
      const inputMedium = document.createElement('input');
      inputMedium.type = 'hidden';
      inputMedium.name = 'Medium';
      inputMedium.value = mediaType;

      form.appendChild(inputTitle);
      form.appendChild(inputImage);
      form.appendChild(inputMedium);

      const addButton = document.createElement('input');
      addButton.classList.add('btn', 'btn-primary');
      addButton.type = 'submit';
      addButton.value = 'Add';

      form.appendChild(addButton);
      mediaOptions.appendChild(form);
      row.appendChild(mediaOptions);
      }
      mediaList.appendChild(mediaItem);
    }
    const rightArrowContainer = document.createElement('div');
    rightArrowContainer.onclick = () => shiftList(listName, 1, mediaType);
    rightArrowContainer.classList.add('col-1', 'd-flex', 'justify-content-start', 'align-items-center', 'clickable', 'arrowContainer');
    const rightArrow = document.createElement('p');
    rightArrow.classList.add('arrow');
    rightArrow.innerHTML = '>';
    rightArrowContainer.appendChild(rightArrow);
    mediaList.appendChild(rightArrowContainer);
}


export async function loadLists(mediaType){
  listIndex = 0;
  const lists = ['inProgress', 'planned', 'completed'];
  for(let listName in lists){
    listName = lists[listName];
    const mediaList = document.getElementById(listName);
    mediaList.innerHTML = '';
    const response = await fetch(`${document.location.origin}/getList?list=${listName}&limit=5&offset=0&mediaType=${mediaType}`);
    const list = await response.json();
    const listLength = Math.min(5, list.length);
    const leftArrowContainer = document.createElement('div');
    leftArrowContainer.onclick = () => shiftList(listName, -1, mediaType);
    leftArrowContainer.classList.add('col-1', 'd-flex', 'align-items-center', 'justify-content-end', 'clickable', 'arrowContainer');
    const leftArrow = document.createElement('p');
    leftArrow.classList.add('arrow');
    leftArrow.innerHTML = '<';
    leftArrowContainer.appendChild(leftArrow);
    mediaList.appendChild(leftArrowContainer);



    for (let i = 0; i < 5; ++i) {
      const mediaItem = document.createElement('div');
      mediaItem.classList.add('col', 'd-flex', 'align-items-center', 'justify-content-center', 'mediaItem');
      const row = document.createElement('div');
      row.classList.add('row');
      mediaItem.appendChild(row);
      if(i < listLength){
        const mediaImageContainer = document.createElement('div');
        mediaImageContainer.classList.add('col');
        const mediaImage = document.createElement('img');
        mediaImage.width = 100;
        mediaImage.src = list[i].imagelink;
        mediaImage.classList.add('figure-img', 'img-fluid', 'rounded');
        mediaImage.alt = 'Image Placeholder';
        mediaImageContainer.appendChild(mediaImage);
        row.appendChild(mediaImageContainer);
        const mediaOptions = document.createElement('div');
        mediaOptions.classList.add('col');
        if(list[i].userrating){
          mediaOptions.innerHTML = list[i].title + " Rating: " + list[i].userrating;
        }else{
          mediaOptions.innerHTML = list[i].title;
        }
        // Add rating, update rating button, and dropdown to change list in form
        const form = document.createElement('form');
        form.method = 'get';
        form.action = '/updateItem';
        const inputTitle = document.createElement('input');
        inputTitle.type = 'hidden';
        inputTitle.name = 'title';
        inputTitle.value = list[i].title;
        form.appendChild(inputTitle);

        const rating = document.createElement('input');

        // use pattern to enforce this
        rating.name = 'rating';
        rating.type = 'number';
        rating.min = '0.0';
        rating.max = '10.0';
        rating.step = '0.1';
        rating.placeholder = 'Rating';

        const moveSelection = document.createElement('select');
        moveSelection.name = 'list';
        const empty = document.createElement('option');
        empty.value = 'empty';
        empty.innerHTML = 'Move to...';
        moveSelection.appendChild(empty);
        if(listName !== 'inProgress'){
          const inProgress = document.createElement('option');
          inProgress.value = 'inProgress';
          inProgress.innerHTML = 'In Progress';
          moveSelection.appendChild(inProgress);
        }
        if(listName !== 'completed'){
          const completed = document.createElement('option');
          completed.value = 'completed';
          completed.innerHTML = 'Completed';
          moveSelection.appendChild(completed);
        }
        if(listName !== 'planned'){
          const planned = document.createElement('option');
          planned.value = 'planned';
          planned.innerHTML = 'Planned';
          moveSelection.appendChild(planned);
        }
        const remove = document.createElement('option');
        remove.value = 'remove';
        remove.innerHTML = 'Remove';

        moveSelection.appendChild(remove);

        const updateButton = document.createElement('input');
        updateButton.classList.add('btn', 'btn-primary');
        updateButton.type = 'submit';
        updateButton.value = 'Update';

        form.appendChild(rating);
        form.appendChild(moveSelection);
        form.appendChild(updateButton);
        mediaOptions.appendChild(form);
        row.appendChild(mediaOptions);
      }
      mediaList.appendChild(mediaItem);
    }
    const rightArrowContainer = document.createElement('div');
    rightArrowContainer.onclick = () => shiftList(listName, 1, mediaType);
    rightArrowContainer.classList.add('col-1', 'd-flex', 'justify-content-start', 'align-items-center', 'clickable', 'arrowContainer');
    const rightArrow = document.createElement('p');
    rightArrow.classList.add('arrow');
    rightArrow.innerHTML = '>';
    rightArrowContainer.appendChild(rightArrow);
    mediaList.appendChild(rightArrowContainer);
  }
}


function greetUser(){
  const url = window.location.pathname;
  const userGreeting = document.getElementById('greet-user');
  userGreeting.innerHTML = url.split('/').at(-1);
}