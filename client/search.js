function loadSearchList(media) {
  const searchList = document.getElementById('searchList');
  searchList.innerHTML = '';
  for (let i = 0; i < 5; ++i) {
    const row = document.createElement('div');
    row.classList.add('row');
    const image = document.createElement('div');
    image.classList.add('col');

    const figure = document.createElement('figure');
    figure.classList.add('figure');

    const img = document.createElement('img');
    img.width = 100;
    img.classList.add('figure-img', 'img-fluid', 'rounded');
    img.alt = 'Image Placeholder';

    figure.appendChild(img);
    image.appendChild(figure);
    row.appendChild(image);

    const title = document.createElement('div');
    title.classList.add('col');
    title.innerHTML = "Title Placeholder";
    row.appendChild(title);

    const rating = document.createElement('div');
    rating.classList.add('col');
    rating.innerHTML = "Rating Placeholder";
    row.appendChild(rating);
    searchList.appendChild(row);
  }
}