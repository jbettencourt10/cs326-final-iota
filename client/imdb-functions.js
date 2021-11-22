const imdbKey = 'k_t249l7q8';

// 'Movies' or 'TVs'
export async function getTopIMDB(media) {
  // TODO: change to process.env.IMDB_KEY
  const response = await fetch(`https://imdb-api.com/en/API/MostPopular${media}${'/'.concat(imdbKey)}`);
  const top100 = await response.json();
  return top100;
}
