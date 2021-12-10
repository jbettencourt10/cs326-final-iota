// import fetch from 'node-fetch';
//k_w81k3buu
//k_12ynl9dx
//k_t249l7q8
//k_8cp79u43
const imdbKey = 'k_8cp79u43';

// 'Movies' or 'TVs'
export async function getTopIMDB(media) {
  // TODO: change to process.env.IMDB_KEY
  const response = await fetch(`https://imdb-api.com/en/API/MostPopular${media}${'/'.concat(imdbKey)}`);
  const top100 = await response.json();
  return top100.items.slice(0, 40);
}

export async function imdbSearch(query) {
  const response = await fetch(`https://imdb-api.com/en/API/Search${query.medium}/${imdbKey}/${query.title}`);
  const searchResults = await response.json();
  return searchResults;
}
