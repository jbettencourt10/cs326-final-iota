//NYT API KEY
const nyt_api_key = '5pCJxw9s71Un0Tjd6qQ4WwOA37Zu5lgz';

/**
 * Gets top books from NYT api
 * @returns Top books on NYT
 */
export async function getTopBooks() {
  const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${nyt_api_key}`);
  const top100 = await response.json();
  return top100.results.books;
}

// Google books API key
const GB_API_KEY = 'AIzaSyCOuh9emvOL3pwNRWh7rrKsH_LrB4nuXPM';

/**
 * Searches google books for search query
 * @param {string} query
 * @returns search results for books query on google books
 */
export async function searchBook(query) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query.title}&key=${GB_API_KEY}`);
  const searchResults = await response.json();
  return searchResults;
}
