# Team: Iota
---
## Application: MyMediaMix

## Semester: Fall 2021
---

## Overview:
The general idea of MyMediaMix is to allow users to track all of their media consumption among all mediums which includes Movies, TV shows, Music, and Books. It is our goal that users will gain insight into their media habits and potentially make changes if they decide that they need to.

 Three lists exist in our application for users to effectively track their media consumption, which are In Progress, Planned, and Completed. Users can use the search functionality to find the particular media item they are looking for, and then easily add it to their media list where it can be easily be rated or changed to another list.
 User can also use the trending list displayed on the main listing page to find new popular media item and add it to their media list.

With analytics, we also hope that a user can be more informed in making decisions about their habits if their analytics show they consume too much (or too little!) media.

## Team Members:
- Jarred Bettencourt
  - Github: `jbettencourt`
- Bill Chen
  - Github: `bchen434`
- Thao Trinh
  - Github: `tmtrinh`

## User Interface:
- `index.html`: This page is the landing page for the website. This page allows logged out users to see trending items for all mediums, which include books, movies, music, and TV shows.
- `list.html`: This is the primary page for logged in users. Here, a user can view, and update their list. It also includes a trending list of media similar to `index.html`.
- `account.html`: This page is the account settings for a logged in user. It allows a user to change their password and full name.
- `search.html`: This page is the page for search results and allows a user to add media entries to a user's list.
- `sign-up.html`: This page allows users to input information to create a user account for MyMediaMix.
- `analytics.html`: This page shows the analytics relevant to a user's media consumption.

## APIs:
-  **/register (POST)**: Adds user to database with relevant information if no errors occur (account already exists, etc.).
-  **/changeName**: Changes user full name in database from current full name to new user-input full name.
-  **/changePassword**: Changes user salt and hash in database from current hash and salt to new hash and salt based on user-input password.
-  **/login (POST)**: Attempts to authenticate a user based on user-input credentials and redirects them to `list.html` if successful.
-  **/add**: Adds a particular media entry to MediaEntries table associated with currently logged in user (used with + button).
-  **/getList**: Gets all media entries from MediaEntries table associated with particular logged in user.
-  **/updateItem**: Updates user rating in MediaEntries table associated with particular user and media title to user-input rating.
-  **/accountAge**: Calculates account age of currently logged in user using CreationTime column in Users table.
-  **/itemCount**: Calculates total number of entries on a user's list by running PSQL query on MediaEntries table.
-  **/itemsStarted**: Calculates total number of entries on currently logged in user's InProgress list existent in MediaEntries table.
-  **/averageTime**: Calculates average time for currently logged in user to move an item from their inProgress list to their Completed list.
-  **/averageRating**: Calculates average rating of currently logged in user among all media entries on all of their lists.

## Database:

### Table 1: Users

The first table is titled Users, which will store data about users. This includes credentials, watch/read/listen time, and various metadata about their account creation. After learn authentication on 11/23, the password column in the Users table will be hashed with a salt to remain secure.

| Column       | Data Type               | Description                                                      |
|--------------|-------------------------|------------------------------------------------------------------|
| Username     | VARCHAR(50) Primary Key | Username identifier for individual users                         |
| Salt         | VARCHAR(64)             | Salt for secure authentication with miniCrypt                    |
| Hash         | VARCHAR(256)            | Hashed password for secure authentication with miniCrypt         |
| FullName     | VARCHAR(50)             | Full name to personalize greeting                                |
| CreationTime | DATE                    | Date representing when account was registered                    |


### Table 2: MediaEntries

The second table is titled MediaEntries, which will store all list items for all users on the site. This includes the username of the user who put the entry into their list, the title of a media item, the medium (book, tv, movie, song), and data about the media item which is scraped from web APIs. For example, movies will include a runtime, while books will include a page count. Finally, a column exists to determine which list a media entry is on (in progress, watched, plan to watch/listen/read).

| Column         | Data Type                                           | Description                                           |
|----------------|-----------------------------------------------------|-------------------------------------------------------|
| Username       | VARCHAR(30) FOREIGN KEY REFERENCES Users(Username)  | Username of user that media entry pertains to         |
| Title          | VARCHAR(50)                                         | Title of media entry                                  |
| Medium         | VARCHAR(10)                                         | Medium of media entry (TV, Movie, Book, Song)         |
| List           | VARCHAR(10)                                         | Particular list that a user added an entry to         |
| TimeStarted    | DATE                                                | Date of when user started media entry                 |
| TimeCompleted  | DATE                                                | Date of when user completed media entry               |
| ImageLink      | VARCHAR(100)                                        | Link to a raw image representing media entry          |
| UserRating     | REAL                                                | Rating that user has given entry when adding to list  |

## URL Routing:
-  **/list**: Redirects a user to `list.html` which is their personal list page. Requries a user to be logged in.
-  **/**: Redirects a user to `index.html` if they are not logged in. Otherwise, redirects them to `list.html`.
-  **/register (GET)**: Redirects a user to `sign-up.html` to input register information.
-  **/logout**: Redirects a user to `index.html` after destroying their user session with passport.
-  **/account**: Redirects a user to `account.html` to edit their account information if they are logged in. Otherwise, redirects to `index.html`.
-  **/search**: Redirects a user to `search.html` with the information given by the user if they are logged in. Otherwise, redirects to `index.html`.
-  **/analytics**: Redirects a user to `analytics.html` with relevant analytics for a user session if they are logged in. Otherwise, they are redirected to `index.html`.

## Authentication:

Authentication occurs with a username/password paradigm that would be found in a typical web application. When a user registers, their entered password and a unique salt are stored for the user in the database along with their username with the miniCrypt wrapper. Additionally, clicking the logout button ends a user's session.

**Once a user logs in, they have the ability to**
  - View their media list
  - Update their media list ratings and change entry list
  - Add items to their media list
  - Delete items from their media list

**A logged out user will have the ability to:**
  - View trending media items via landing page

## Divison of Labor:

**Jarred**:
  - Defining most of database schema for MyMediaMix along with some database operations.
  - Configured authorization with passport to allow users to login with sessions.
  - Configured authentication by storing hashed passwords and salts in database with MiniCrypt.
  - Created HTML, CSS, and JS for register page and account settings page.
  - Created some JS for landing page with trending media items.
  - Helped with routing and server creation with express js.
  - Assisted in cleaning up code, linting, formatting, and commenting for final submission.
  - Edit together video for submission.
  - Configured IMDB API initially.

**Bill**
  - Inital design and implementation of the landing page.
  - Inital design and implementation of the list page acting as the current foundation.
  - Current design and implementation of the analytics page.
  - Server routing and database operations for all above.
  - General debugging of code and styling

**Thao**
  - Created HTML pages for main listing page, custom list page, and search page.
  - Implemented API calls to generate top trending media on landing page and main listing page and configured API calls for search.
  - Fixed the main listing page with left and right arrows and querying from the database.
  - Responsible for API calls, retrieved information, and display results for books and music specifically.
  - Completed the search function on search page to display the results and linked all search bar on all pages.
  - Helped with the "add" button to add media to the Planned list.
  - Restyled all pages so that they are consistent in format and styling.
  - Created menubar to navigate between pages and configured server for those links. 
  - Helped with cleaning up the code throughout the project.
  - Constantly deployed the updated project to Heroku.

## Conclusion:
We are overall very satisfied with the final product of MyMediaMix. We set out with the goal of making a product that would allow users to track their media consumption, and this was achieved rather well in our opinion.

Our group worked really well together. While there was miscommunication at some points, it was quickly resolved and everything worked rather smoothly. Our group reflected and revealed that we never felt afraid to ask each other questions if we were having troubles. Additionally, code was well documented to ensure that there would be no ambiguity when another group member would work on that particular block.

Two technical hurdles existed that were pervasive throughout entire project. This was the use of ExpressJS and our limited number of API calls. ExpressJS was just really difficult to use, and we attribute this to the fact that we learned ExpressJS in the lab the day before Milestone 2 was due. This made this part challenging, but nevertheless we independently learned and fixed every problem associated with it. Finally, the IMDB api we were using only allowed us to use 100 API calls per day, so we routinely had to create new api keys for testing. This became very tiresome, and in an industrial application we hope that we would have the finances to pay for an upgraded api key that allows for more than 100 api calls per day;.

If we were to continue this project, it would be nice to include a recommendation system for users based on their current media list. This would require a large degree of refactoring and restructuring (along with a financial cost), but it would be useful for users to be given recommendations based on their currrent list. This would make MyMediaMix even more "all-in-one" by doubling as a tracking and recommendation service.


## Rubric

- Documentation (10)
  - Linting (5)
    - Is JS, HTML, and CSS properly formatted, and linted for readability?
  - Commenting (5)
    - Is commenting done in a way that encourages readability and allows external users to understand what is occuring in code?
- Backend (30)
  - CRUD (16)
    - Create (4)
      - The ability to add media entries to a user’s list
    - Read (4)
      - The ability to view a user’s media list
    - Update (4)
      - The ability to update a user’s rating of a media entry
    - Delete (4)
      - The ability to remove a media entry from a user’s list
- Server/Routing (14)
  - Does the server run with express.js and the server serves files correctly with correct path names based on user input?
- Frontend (25)
  - HTML (8)
    - Is HTML structured such that the website is formatted cleanly and correctly?
  - CSS (8)
    - Is the CSS file structured correctly with inheritance and cleanly?
  - Javascript (8)
    - Does javascript assist in making the website responsive, functional, and dynamic?
  - Favicon (1)
    - Is favicon present?
- Database (25)
  - Secure authentication and authorization (10)
    - Can a user register and login?
    - Are authentication details stored with hashes and salts?
  - Media List additions (10)
    - Does the Media Entries list update based on user input?
  - Database Schema (5)
    - Is database schema implemented as defined in documentation and conducive to application goals?
- Video (5)
  - Does video include all group members and adequately address questions asked in milestone 3 video rubric?
- Heroku Deployment (5)
  - Is the application deployed to Heroku and works with Heroku psql database? Additionally, does the application work on Heroku just as well as it would with a local server?


## Heroku Link
https://mymediamix.herokuapp.com/

## Video Link
https://www.youtube.com/watch?v=HBZEy87PlOU
