import { getTopBooks } from "./book-functions.js";
import { getTopIMDB } from "./imdb-functions.js";
import { getTopTracks } from "./lastfm-functions.js";

let mediaType = new URLSearchParams(window.location.search).get('mediaType');
if (!mediaType) {
  mediaType = 'all';
}
generateList(mediaType);

async function generateList(mediaType) {
  //generate lists for inProgress, planned, and completed
  const listIndex = 0;
  const lists = ['inProgress', 'planned', 'completed'];
  for (let listName in lists) {
    listName = lists[listName];
    const response = await fetch(`${document.location.origin}/getList?list=${listName}&offset=0&mediaType=${mediaType}`);
    const userList = await response.json();
    loadLists(mediaType, userList, listName, listIndex);
  }
  //generate trending list
  if (mediaType === "all" || mediaType === "Movies") {
    const trendingList = await getTopIMDB('Movies');
    loadTrendingList(mediaType, trendingList, listIndex);
  }
  else if (mediaType === "Series") {
    const trendingList = await getTopIMDB("TVs");
    loadTrendingList(mediaType, trendingList, listIndex);
  }
  else if (mediaType === "books") {
    const trendingList = await getTopBooks();
    loadTrendingList(mediaType, trendingList, listIndex);
  }
  else {
    const trendingList = await getTopTracks();
    loadTrendingList(mediaType, trendingList, listIndex);
  }
}

/**
 *
 * @param {string} listName
 * @param {int} direction
 */
async function shiftList(mediaType, list, listName, listIndex, direction) {
  const listLength = list.length;
  const start = listIndex;
  const end = listIndex + 5;
  if (direction === 1) {
    //move right
    if (listName !== "top") {
      if (end + 5 <= listLength) {
        loadLists(mediaType, list, listName, listIndex + 5);
      }
      else if (listLength - 5 >= 0) {
        loadLists(mediaType, list, listName, listLength - 5);
      }
      else {
        loadLists(mediaType, list, listName, 0);
      }
    }
    else {
      if (end + 5 <= listLength) {
        loadTrendingList(mediaType, list, listIndex + 5);
      }
      else if (listLength - 5 >= 0) {
        loadTrendingList(mediaType, list, listLength - 5);
      }
      else {
        loadTrendingList(mediaType, list, 0);
      }
    }
  }
  else if (direction === -1) {
    //move left
    if (listName !== "top") {
      if (start - 5 >= 0) {
        loadLists(mediaType, list, listName, listIndex - 5);
      }
      else {
        loadLists(mediaType, list, listName, 0);
      }
    }
    else {
      if (start - 5 >= 0) {
        loadTrendingList(mediaType, list, listIndex - 5);
      }
      else {
        loadTrendingList(mediaType, list, 0);
      }
    }
  }
}


async function loadTrendingList(mediaType, list, listIndex) {
  const mediaList = document.getElementById('top');
  mediaList.innerHTML = '';
  const listLength = Math.min(5, list.length);

  const leftArrowContainer = document.createElement('div');
  leftArrowContainer.onclick = () => shiftList(mediaType, list, "top", listIndex, -1);
  leftArrowContainer.classList.add('col-1', 'd-flex', 'align-items-center', 'justify-content-end', 'clickable', 'arrowContainer');
  const leftArrow = document.createElement('p');
  leftArrow.classList.add('arrow');
  leftArrow.innerHTML = '<';
  leftArrowContainer.appendChild(leftArrow);
  mediaList.appendChild(leftArrowContainer);

  for (let i = listIndex; i < listIndex + 5; ++i) {
    const mediaItem = document.createElement('div');
    mediaItem.classList.add('col', 'd-flex', 'align-items-center', 'justify-content-center', 'mediaItem');
    const row = document.createElement('div');
    row.classList.add('row');
    mediaItem.appendChild(row);
    if (list[i]) {
      const mediaImageContainer = document.createElement('div');
      mediaImageContainer.classList.add('col');
      const mediaImage = document.createElement('img');
      mediaImage.width = 100;
      if (mediaType === 'Movies' || mediaType === 'Series' || mediaType === 'all') {
        mediaImage.src = list[i].image;
      }
      else if (mediaType === 'books') {
        mediaImage.src = list[i].book_image;
      }
      else {
        if (list[i].image[2]['#text']) {
          mediaImage.src = list[i].image[2]['#text'];
        }
        else {
          mediaImage.src = 'https://player.listenlive.co/templates/StandardPlayerV4/webroot/img/default-cover-art.png';
        }
      }
      mediaImage.classList.add('figure-img', 'img-fluid', 'rounded');
      mediaImage.alt = 'Image Placeholder';
      mediaImageContainer.appendChild(mediaImage);
      row.appendChild(mediaImageContainer);

      const mediaOptions = document.createElement('div');
      mediaOptions.classList.add('col');
      if (mediaType === 'Movies' || mediaType === 'Series' || mediaType === 'all') {
        mediaOptions.innerHTML = list[i].title;
      }
      else if (mediaType === 'books') {
        mediaOptions.innerHTML = list[i].title;
      }
      else {
        mediaOptions.innerHTML = list[i].name;
      }
      // Add rating, update rating button, and dropdown to change list in form
      const form = document.createElement('form');
      form.method = 'get';
      form.action = '/add';
      const inputTitle = document.createElement('input');
      inputTitle.type = 'hidden';
      inputTitle.name = 'Title';
      if (mediaType === 'Movies' || mediaType === 'Series' || mediaType === 'all') {
        inputTitle.value = list[i].title;
      }
      else if (mediaType === 'books') {
        inputTitle.value = list[i].title;
      }
      else {
        inputTitle.value = list[i].name;
      }

      const inputImage = document.createElement('input');
      inputImage.type = 'hidden';
      inputImage.name = 'ImageLink';
      if (mediaType === 'Movies' || mediaType === 'Series' || mediaType === 'all') {
        inputImage.value = list[i].image;
      }
      else if (mediaType === 'books') {
        inputImage.value = list[i].book_image;
      }
      else {
        if (list[i].image[2]['#text']) {
          inputImage.value = list[i].image[2]['#text'];
        }
        else {
          inputImage.value = 'https://player.listenlive.co/templates/StandardPlayerV4/webroot/img/default-cover-art.png';
        }
      }
      const inputMedium = document.createElement('input');
      inputMedium.type = 'hidden';
      inputMedium.name = 'Medium';
      if (mediaType === 'Movies' || mediaType === 'all') {
        inputMedium.value = 'Movies';
      }
      else {
        inputMedium.value = mediaType;
      }


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
  rightArrowContainer.onclick = () => shiftList(mediaType, list, "top", listIndex, 1);
  rightArrowContainer.classList.add('col-1', 'd-flex', 'justify-content-start', 'align-items-center', 'clickable', 'arrowContainer');
  const rightArrow = document.createElement('p');
  rightArrow.classList.add('arrow');
  rightArrow.innerHTML = '>';
  rightArrowContainer.appendChild(rightArrow);
  mediaList.appendChild(rightArrowContainer);
}


async function loadLists(mediaType, list, listName, listIndex) {
  const mediaList = document.getElementById(listName);
  mediaList.innerHTML = '';
  const listLength = Math.min(5, list.length);
  const leftArrowContainer = document.createElement('div');
  leftArrowContainer.onclick = () => shiftList(mediaType, list, listName, listIndex, -1);
  leftArrowContainer.classList.add('col-1', 'd-flex', 'align-items-center', 'justify-content-end', 'clickable', 'arrowContainer');
  const leftArrow = document.createElement('p');
  leftArrow.classList.add('arrow');
  leftArrow.innerHTML = '<';
  leftArrowContainer.appendChild(leftArrow);
  mediaList.appendChild(leftArrowContainer);

  for (let i = listIndex; i < listIndex + 5; ++i) {
    const mediaItem = document.createElement('div');
    mediaItem.classList.add('col', 'd-flex', 'align-items-center', 'justify-content-center', 'mediaItem');
    const row = document.createElement('div');
    row.classList.add('row');
    mediaItem.appendChild(row);
    if (list[i]) {
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
      if (list[i].userrating) {
        mediaOptions.innerHTML = list[i].title + " Rating: " + list[i].userrating;
      } else {
        mediaOptions.innerHTML = list[i].title;
      }
      const form = document.createElement('form');
      form.method = 'get';
      form.action = '/updateItem';
      const inputTitle = document.createElement('input');
      inputTitle.type = 'hidden';
      inputTitle.name = 'title';
      inputTitle.value = list[i].title;
      form.appendChild(inputTitle);

      const rating = document.createElement('input');

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
      if (listName !== 'inProgress') {
        const inProgress = document.createElement('option');
        inProgress.value = 'inProgress';
        inProgress.innerHTML = 'In Progress';
        moveSelection.appendChild(inProgress);
      }
      if (listName !== 'completed') {
        const completed = document.createElement('option');
        completed.value = 'completed';
        completed.innerHTML = 'Completed';
        moveSelection.appendChild(completed);
      }
      if (listName !== 'planned') {
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
  rightArrowContainer.onclick = () => shiftList(mediaType, list, listName, listIndex, 1);
  rightArrowContainer.classList.add('col-1', 'd-flex', 'justify-content-start', 'align-items-center', 'clickable', 'arrowContainer');
  const rightArrow = document.createElement('p');
  rightArrow.classList.add('arrow');
  rightArrow.innerHTML = '>';
  rightArrowContainer.appendChild(rightArrow);
  mediaList.appendChild(rightArrowContainer);
}
