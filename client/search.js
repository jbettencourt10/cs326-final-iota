// async function loadSearchList(media) {
//   document.getElementById('mediaList').innerHTML = '';
//   const top100Object = await getTopIMDB(media);
//   const top100Media = top100Object.items.slice(0, 5);
//   const mediaList = document.getElementById('mediaList');
//   for (let i = 0; i < 5; ++i) {
//     const row = document.createElement('div');
//     row.classList.add('row');
//     const image = document.createElement('div');
//     image.classList.add('col');

//     const figure = document.createElement('figure');
//     figure.classList.add('figure');

//     const img = document.createElement('img');
//     img.width = 100;
//     img.src = top100Media[i].image;
//     img.classList.add('figure-img', 'img-fluid', 'rounded');
//     img.alt = 'Image Placeholder';

//     figure.appendChild(img);
//     image.appendChild(figure);
//     row.appendChild(image);

//     const title = document.createElement('div');
//     title.classList.add('col');
//     title.innerHTML = top100Media[i].title;
//     row.appendChild(title);

//     const rating = document.createElement('div');
//     rating.classList.add('col');
//     rating.innerHTML = top100Media[i].imDbRating;
//     row.appendChild(rating);
//     mediaList.appendChild(row);
//   }
// }