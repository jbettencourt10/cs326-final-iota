window.addEventListener('load', loadLists);

async function loadLists(){
  const lists = ['inProgress', 'planned', 'completed'];
  for(let listName in lists){
    listName = lists[listName];
    const mediaList = document.getElementById(listName);
    mediaList.innerHTML = '';
    const response = await fetch(`${document.location.origin}/getList?list=${listName}&limit=5&offset=0`);
    const list = await response.json();
    const listLength = Math.min(5, list.length);

    const leftArrowContainer = document.createElement('div');
    leftArrowContainer.classList.add('col-1', 'align-items-center', 'justify-content-end', 'clickable', 'arrowContainer');
    const leftArrow = document.createElement('p');
    leftArrow.classList.add('arrow');
    leftArrow.innerHTML = '<';
    leftArrowContainer.appendChild(leftArrow);
    mediaList.appendChild(leftArrowContainer);



    for (let i = 0; i < 5; ++i) {
      const mediaItem = document.createElement('div');
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
        console.log(list[i]);
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
    rightArrowContainer.classList.add('col-1', 'justify-content-start', 'align-items-center', 'clickable', 'arrowContainer');
    const rightArrow = document.createElement('p');
    rightArrow.classList.add('arrow');
    rightArrow.innerHTML = '>';
    rightArrowContainer.appendChild(rightArrow);
    mediaList.appendChild(rightArrowContainer);
  }
}














// function loadMovieList() {
//   const movieList = '';
//   document.getElementById('inProgress').innerHTML = movieList;
// }

// function loadTVShowList() {
//   const tvList = '';
//   document.getElementById('inProgress').innerHTML = tvList;
// }

// function loadInProgressList() {
//   // console.log(window.location.pathname);
//   // if (window.location.pathname !== '/login') {
//   //   return;
//   // }
//   const container = document.getElementById('inProgress');
//   container.innerHTML = '';
//   const leftArrowContainer = document.createElement('div');
//   leftArrowContainer.classList.add('col-1', 'arrowContainer', 'd-flex', 'align-items-center', 'justify-content-end', 'clickable');
//   const leftArrow = document.createElement('p');
//   leftArrow.classList.add('arrow');
//   leftArrow.innerHTML = '<';
//   leftArrowContainer.appendChild(leftArrow);
//   container.appendChild(leftArrowContainer);

//   for (let i = 0; i < 5; ++i) {
//     const mediaItem = document.createElement('div');
//     mediaItem.classList.add('col', 'mediaItem', 'd-flex', 'align-items-center', 'justify-content-center');
//     const row = document.createElement('div');
//     row.classList.add('row');
//     mediaItem.appendChild(row);
//     const mediaImageContainer = document.createElement('div');
//     mediaImageContainer.classList.add('col');
//     const mediaImage = document.createElement('img');
//     mediaImage.width = 100;
//     mediaImage.classList.add('figure-img', 'img-fluid', 'rounded');
//     mediaImage.alt = 'Image Placeholder';
//     mediaImageContainer.appendChild(mediaImage);
//     row.appendChild(mediaImageContainer);
//     const mediaOptions = document.createElement('div');
//     mediaOptions.classList.add('col');
//     mediaOptions.innerHTML = 'Title Goes Here';
//     // Add rating, update rating button, and dropdown to change list in form
//     const form = document.createElement('form');
//     form.method = 'get';
//     const rating = document.createElement('input');
//     // use pattern to enforce this
//     rating.type = 'number';
//     rating.name = 'Rating';
//     rating.min = '0.0';
//     rating.max = '10.0';
//     rating.step = '0.1';
//     rating.placeholder = 'Rating';

//     const moveSelection = document.createElement('select');
//     const empty = document.createElement('option');
//     empty.value = 'empty';
//     empty.innerHTML = 'Move to...';
//     const completed = document.createElement('option');
//     completed.value = 'completed';
//     completed.innerHTML = 'Completed';
//     const wishlist = document.createElement('option');
//     wishlist.value = 'wishlist';
//     wishlist.innerHTML = 'Wishlist';
//     const remove = document.createElement('option');
//     remove.value = 'remove';
//     remove.innerHTML = 'Remove';
//     moveSelection.appendChild(empty);
//     moveSelection.appendChild(completed);
//     moveSelection.appendChild(wishlist);
//     moveSelection.appendChild(remove);

//     const updateButton = document.createElement('input');
//     updateButton.classList.add('btn', 'btn-primary');
//     updateButton.type = 'submit';
//     updateButton.value = 'Update';

//     form.appendChild(rating);
//     form.appendChild(moveSelection);
//     form.appendChild(updateButton);
//     mediaOptions.appendChild(form);
//     row.appendChild(mediaOptions);
//     container.appendChild(mediaItem);
//   }

//   const rightArrowContainer = document.createElement('div');
//   rightArrowContainer.classList.add('col-1', 'arrowContainer', 'd-flex', 'justify-content-start', 'align-items-center', 'clickable');
//   const rightArrow = document.createElement('p');
//   rightArrow.classList.add('arrow');
//   rightArrow.innerHTML = '>';
//   rightArrowContainer.appendChild(rightArrow);
//   container.appendChild(rightArrowContainer);
// }
