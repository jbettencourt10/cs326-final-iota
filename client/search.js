

window.addEventListener('load', loadSearchList());
const IMDB_API_KEY = 'k_t249l7q8';


async function getIMDBSearch(title, media) {
    // TODO: error check
    const response = await fetch(`https://imdb-api.com/en/API/Search${media}/${IMDB_API_KEY}/${title}`);
    const results = await response.json();
    return results;
}

async function loadSearchList(title, media) {
    document.getElementById('search-results').innerHTML = '';
    const searchResults = await getIMDBSearch(title, media);
    const searchResultList = searchResults.items.slice(0, 10);
    const searchList = document.getElementById('search-results');
    for (let i = 0; i < 5; ++i) {
        const row = document.createElement('div');
        row.classList.add('row');
        const image = document.createElement('div');
        image.classList.add('col');

        const figure = document.createElement('figure');
        figure.classList.add('figure');

        const img = document.createElement('img');
        img.src = searchResultList[i].image;
        img.classList.add('figure-img', 'img-fluid', 'rounded');
        img.alt = 'Image Placeholder';

        figure.appendChild(img);
        image.appendChild(figure);
        row.appendChild(image);

        const title = document.createElement('div');
        title.classList.add('col');
        title.innerHTML = searchResultList[i].title;
        row.appendChild(title);

        const rating = document.createElement('div');
        rating.classList.add('col');
        rating.innerHTML = searchResultList[i].imDbRating;
        row.appendChild(rating);
        searchList.appendChild(row);
    }
}
