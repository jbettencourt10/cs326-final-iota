window.addEventListener('load', loadAnalytics());
// Your account is A days old
// In total you have read A books, watched B shows, watched C movies, and listened to D songs
// This week  you have read A books, watched B shows, watched C movies, and listened to D songs
// This week you have added A items
// You currently have A items in progress
// It takes you on average A days to finish reading a book
// It takes you on average A days to finish watching a show
// Your average rating of movies diverges from the site rating by A
// Your average rating of tv shows diverges from the site rating by A

async function loadAnalytics(){
  const analyticsContainer = document.getElementById("analytics");
  let analytics = "";
  const age = await fetch(`${document.location.origin}/accountAge`);
  analytics += "Your account is " + age + " days old" + "<br>";
  analytics += "In total, you have read ";
  const totalBooks = await (await fetch(`${document.location.origin}/userItemCount?mediaType=books}`)).json();
  analytics += totalBooks + " books, watched ";
  const totalShows = await (await fetch(`${document.location.origin}/userItemCount?mediaType=Series}`)).json();
  analytics += totalShows + " shows, watched ";
  const totalMovies = await (await fetch(`${document.location.origin}/userItemCount?mediaType=Movies}`)).json();
  analytics += totalMovies + " movies, and listened to ";
  const totalMusic = await (await fetch(`${document.location.origin}/userItemCount?mediaType=music}`)).json();
  analytics += totalMusic + " songs";
  analyticsContainer.innerHTML = analytics;
}