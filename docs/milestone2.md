

# Milestone 2


### Representation of API for application
As our focus is on a media tracking service, most of our API includes queries for media items, and then the ability to add or remove them from a particular user's list. Our endpoints are as follows:

-   **/register** Each user will be required to make an account (which will eventually occur within our database), and this will be used to store their tracked media list between sessions. This could be possible with cookies or sessions, but we want to ensure security of users' lists.

-   **/login** Similarly, users can login to their account to see their tracked media. Logging in is essential to keep persistence between visits and also security.

-  **/user/add/{item}** When a user is specified (i.e. a user is logged in), they can use this endpoint to add a media item to their list. Additionally, they can add ratings, and other external features when they are adding a media item to their list/

-  **/user/remove/{item}** When a user is specified (i.e. a user is logged in), they can use this endpoint to remove a media item from their list.

-  **/user/get/{item}** When a user is specified (i.e. a user is logged in), they can use this endpoint to simply view the item specified on their list. This will additionally return other external features, like rating, etc. If the item is not on their list, then they will receive some kind of error telling gthem that the requested media is not on their list.

-  **/{item}** This endpoint will query all media available on the website for the specific media that the user requested. If it is available on the website, all relevant information about the media will be returned to the user which includes title, cast, director, rating, etc. If it is not available on the website, an errorm essage will be shown to the user.



### Client Interface with descriptions




### Heroku URL
https://mymediamix.herokuapp.com/


### Divison of Labor
