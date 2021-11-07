import fetch from 'node-fetch';

const IMDB_API_KEY = 'k_t249l7q8';

// media takes arguments 'Series' or 'Movies'
export async function getIMDBSearch(title, media) {
    // TODO: error check
    const response = await fetch(`https://imdb-api.com/en/API/Search${media}/${IMDB_API_KEY}/${title}`);
    const results = await response.json();
    return results;
}
