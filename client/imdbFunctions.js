
const IMDB_API_KEY = 'k_t249l7q8';

// media takes arguments 'Series' or 'Movies'
export async function getIMDBSearch(title, media) {
    // TODO: error check
    const response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${IMDB_API_KEY}/shawshank`);
    const results = await response.json();
    console.log(results);
    return results;
}
