//NY Times for Top Trending Books
const nyt_api_key = '5pCJxw9s71Un0Tjd6qQ4WwOA37Zu5lgz';

export async function getTopBooks() {
    const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${nyt_api_key}`);
    const top100 = await response.json();
    return top100.results.books.slice(0, 5);
  }

//Google Books for all other actions
const GB_API_KEY = 'AIzaSyCOuh9emvOL3pwNRWh7rrKsH_LrB4nuXPM';
export async function searchBook(query){
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query.title}&key=${GB_API_KEY}`);
    const searchResults = await response.json();
    console.log(searchResults);
    return searchResults;
}