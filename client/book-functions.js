//NY Times for Top Trending Books
const nyt_api_key = '5pCJxw9s71Un0Tjd6qQ4WwOA37Zu5lgz';

export async function getTopBooks() {
    // TODO: change to process.env.IMDB_KEY
    const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${nyt_api_key}`);
    const top100 = await response.json();
    return top100.results.books.slice(0, 5);
  }