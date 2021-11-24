
// import fetch from 'node-fetch';

const imdbKey = 'k_w81k3buu';

// 'Movies' or 'TVs'
export async function getTopIMDB(media) {
  // TODO: change to process.env.IMDB_KEY
  const response = await fetch(`https://imdb-api.com/en/API/MostPopular${media}${'/'.concat(imdbKey)}`);
  const top100 = await response.json();
  return top100.items.slice(0, 5);
}


export async function imdbSearch(query) {
    const response = await fetch(`https://imdb-api.com/en/API/Search${query.medium}/${imdbKey}/${query.title}`);
    const searchResults = await response.json();
    return searchResults;
}
