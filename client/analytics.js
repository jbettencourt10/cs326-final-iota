window.addEventListener('load', loadAnalytics());
// Your account is A days old
// In total you have read A books, watched B shows, watched C movies, and listened to D songs
// This week you have read A books, watched B shows, watched C movies, and listened to D songs
// This week you have started A items
// You currently have A items in progress
// It takes you on average A days to finish reading a book
// It takes you on average A days to finish watching a show
// Your average rating of movies diverges from the site rating by A
// Your average rating of tv shows diverges from the site rating by A

async function loadAnalytics(){
  const analyticsContainer = document.getElementById("analytics");
  let analytics = "";
  let info = await (await fetch(`${document.location.origin}/accountAge`)).json();
  analytics += "Your account is " + info + " days old" + "<br>";

  analytics += "In total you have read ";
  info = await (await fetch(`${document.location.origin}/userItemCount?mediaType=books}`)).json();
  analytics += info + " books, watched ";
  info = await (await fetch(`${document.location.origin}/userItemCount?mediaType=Movies}`)).json();
  analytics += info + " movies, watched ";
  info = await (await fetch(`${document.location.origin}/userItemCount?mediaType=Series}`)).json();
  analytics += info + " shows, and listened to ";
  info = await (await fetch(`${document.location.origin}/userItemCount?mediaType=music}`)).json();
  analytics += info + " songs" + "<br>";

  analytics += "This week you have read ";
  info = await (await fetch(`${document.location.origin}/userItemCount?mediaType=books&time=week`)).json();
  analytics += info + " books, watched ";
  info = await (await fetch(`${document.location.origin}/userItemCount?mediaType=Movies&time=week`)).json();
  analytics += info + " movies, watched ";
  info = await (await fetch(`${document.location.origin}/userItemCount?mediaType=Series&time=week`)).json();
  analytics += info + " shows, and listened to ";
  info = await (await fetch(`${document.location.origin}/userItemCount?mediaType=music&time=week`)).json();
  analytics += info + " songs" + "<br>";

  analytics += "This week you have started ";
  info = await (await fetch(`${document.location.origin}/itemsStarted?time=week`)).json();
  analytics += info + " items" + "<br>";
  

  analyticsContainer.innerHTML = analytics;
}