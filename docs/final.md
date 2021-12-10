# Team: Iota
---
## Application: MyMediaMix

## Semester: Fall 2021
---

## Overview:
The general idea of MyMediaMix is to allow users to track all of their media consumption among all mediums which includes Movies, TV shows, Music, and Books.

## Team Members:
- Jarred Bettencourt
  - Github: `jbettencourt`
- Bill Chen
  - Github: `bchen434`
- Thao Trinh
  - Github: `tmtrinh`

## User Interface:

## APIs:

## Database:



### Table 1: Users

The first table is titled Users, which will store data about users. This includes credentials, watch/read/listen time, and various metadata about their account creation. After learn authentication on 11/23, the password column in the Users table will be hashed with a salt to remain secure.

| Column       | Data Type               | Description                                                      |
|--------------|-------------------------|------------------------------------------------------------------|
| Username     | VARCHAR(50) Primary Key | Username identifier for individual users                         |
| Salt         | VARCHAR(64)             | Salt for secure authentication with miniCrypt                    |
| Hash         | VARCHAR(256)            | Hashed password for secure authentication with miniCrypt         |
| FullName     | VARCHAR(50)             | Full name to personalize greeting                                |
| CreationTime | TIMESTAMP               | Timestamp representing when account was registered               |


### Table 2: MediaEntries

The second table is titled MediaEntries, which will store all list items for all users on the site. This includes the username of the user who put the entry into their list, the title of a media item, the medium (book, tv, movie, song), and data about the media item which is scraped from web APIs. For example, movies will include a runtime, while books will include a page count. Finally, a column exists to determine which list a media entry is on (in progress, watched, plan to watch/listen/read).

| Column     | Data Type                                           | Description                                           |
|------------|-----------------------------------------------------|-------------------------------------------------------|
| Username   | VARCHAR(30) FOREIGN KEY REFERENCES Users(Username)  | Username of user that media entry pertains to         |
| Title      | VARCHAR(50)                                         | Title of media entry                                  |
| Medium     | VARCHAR(10)                                         | Medium of media entry (TV, Movie, Book, Song)         |
| List       | VARCHAR(10)                                         | Particular list that a user added an entry to         |
| TimeStarted  | TIMESTAMP                                           | Timestamp of when user added media entry              |
| TimeCompleted  | TIMESTAMP                                           | Timestamp of when user added media entry              |              |
| ImageLink  | VARCHAR(100)                                        | Link to a raw image representing media entry          |
| UserRating | REAL                                                | Rating that user has given entry when adding to list  |
| IMDBRating | REAL                                                | Rating from scraped API (IMDB, Last.fm, etc)          |

## URL Routing:

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

**Bill**

**Thao**
  - Created HTML pages for main listing page, custom list page, and search page.
  - Implemented API calls to generate top trending media on landing page and main listing page and configured API calls for search.
  - Responsible for API calls, retrieved information, and display results for books and music especially. 
  - Completed the search function on search page to display the results and linked all search bar on all pages. 
  - Helped with the "add" button to add media to the wishlist.
  - Restyled all pages so that they are consistent in format and styling.
  - Created menubar to navigate between pages. 
  - Helped with cleaning up the code throughout the project.
  - Constantly deployed the updated project to Heroku.

## Conclusion:



## Rubric

- Documentation (10)
  - Linting (3)
    - Is JS, HTML, and CSS properly formatted, and linted for readability?
  - Commenting (4)
    - Is commenting done in a way that encourages readability and allows external users to understand what is occuring in code?
  - Organized Code in folders (3)
    - Does a JS Folder exist for storage of JS files?
    - Does a CSS folder exist for storage of CSS files?
    - Does an HTML folder exist for storage of HTML files?
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
