
// On page load, load analytics
window.addEventListener('load', loadAnalytics());
// Your account is A days old

// In total you have read A books, watched B shows, watched C movies, and listened to D songs
// This week you have read A books, watched B shows, watched C movies, and listened to D songs

// This week you have started A items
// You currently have A items in progress

// It takes you on average A days to finish reading a book
// It takes you on average A days to finish watching a show

// Your average rating of books is A
// Your average rating of movies is A
// Your average rating of shows is A
// Your average rating of songs is A

/**
 * Load analytics page based on database calls
 */
async function loadAnalytics() {
  const analyticsContainer = document.getElementById("analytics");
  let analytics = "<br><br>";
  let info = await (await fetch(`${document.location.origin}/fullName`)).text();
  analytics += "Hello " + info + "<br><br>";
  info = await (await fetch(`${document.location.origin}/accountAge`)).json();
  analytics += "Your account is " + info + " days old" + "<br><br>";

  analytics += "In total you have read ";
  info = await (await fetch(`${document.location.origin}/itemCount?mediaType=books&time=all}`)).json();
  analytics += info + " books, watched ";
  info = await (await fetch(`${document.location.origin}/itemCount?mediaType=Movies&time=all}`)).json();
  analytics += info + " movies, watched ";
  info = await (await fetch(`${document.location.origin}/itemCount?mediaType=Series&time=all}`)).json();
  analytics += info + " shows, and listened to ";
  info = await (await fetch(`${document.location.origin}/itemCount?mediaType=music&time=all}`)).json();
  analytics += info + " songs" + "<br>";

  analytics += "This week you have read ";
  info = await (await fetch(`${document.location.origin}/itemCount?mediaType=books&time=week`)).json();
  analytics += info + " books, watched ";
  info = await (await fetch(`${document.location.origin}/itemCount?mediaType=Movies&time=week`)).json();
  analytics += info + " movies, watched ";
  info = await (await fetch(`${document.location.origin}/itemCount?mediaType=Series&time=week`)).json();
  analytics += info + " shows, and listened to ";
  info = await (await fetch(`${document.location.origin}/itemCount?mediaType=music&time=week`)).json();
  analytics += info + " songs" + "<br><br>";

  analytics += "This week you have started ";
  info = await (await fetch(`${document.location.origin}/itemsStarted?time=week`)).json();
  analytics += info + " items" + "<br>";
  analytics += "You currently have ";
  info = await (await fetch(`${document.location.origin}/itemsStarted`)).json();
  analytics += info + " items in progress" + "<br><br>";

  analytics += "It takes you on average ";
  info = await (await fetch(`${document.location.origin}/averageTime?mediaType=books`)).json();
  analytics += info + " days to finish reading a book" + "<br>";
  analytics += "It takes you on average ";
  info = await (await fetch(`${document.location.origin}/averageTime?mediaType=Series`)).json();
  analytics += info + " days to finish watching a show" + "<br><br>";

  analytics += "Your average rating of books is ";
  info = await (await fetch(`${document.location.origin}/averageRating?mediaType=books`)).json();
  analytics += info + "<br>";
  analytics += "Your average rating of movies is ";
  info = await (await fetch(`${document.location.origin}/averageRating?mediaType=Movies`)).json();
  analytics += info + "<br>";
  analytics += "Your average rating of shows is ";
  info = await (await fetch(`${document.location.origin}/averageRating?mediaType=Series`)).json();
  analytics += info + "<br>";
  analytics += "Your average rating of songs is ";
  info = await (await fetch(`${document.location.origin}/averageRating?mediaType=music`)).json();
  analytics += info + "<br><br><br>";

  analyticsContainer.innerHTML = analytics;
}
