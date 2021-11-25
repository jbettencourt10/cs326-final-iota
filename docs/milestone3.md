# Milestone 3
Heroku Link: https://mymediamix.herokuapp.com/

## Database Schema
We have two tables we plan to use.

### Table 1: Users

The first table is titled Users, which will store data about users. This includes credentials, watch/read/listen time, and various metadata about their account creation. After learn authentication on 11/23, the password column in the Users table will be hashed with a salt to remain secure.

| Column       | Data Type               | Description                                                      |
|--------------|-------------------------|------------------------------------------------------------------|
| Username     | VARCHAR(50) Primary Key | Username identifier for individual users                         |
| Salt         | VARCHAR(64)             | Salt for secure authentication with miniCrypt                    |
| Hash         | VARCHAR(256)            | Hashed password for secure authentication with miniCrypt         |
| FullName     | VARCHAR(50)             | Full name to personalize greeting                                |
| CreationTime | TIMESTAMP               | Timestamp representing when account was registered               |
| LoginCount   | INT                     | Number of times a user has logged in                             |
| WatchTime    | REAL                    | Total time spent watching tv or movies                           |
| PagesRead    | INT                     | Total amount of pages read from books                            |
| ListenTime   | REAL                    | Total time spent listening to music                              |


### Table 2: MediaEntries

The second table is titled MediaEntries, which will store all list items for all users on the site. This includes the username of the user who put the entry into their list, the title of a media item, the medium (book, tv, movie, song), and data about the media item which is scraped from web APIs. For example, movies will include a runtime, while books will include a page count. Finally, a column exists to determine which list a media entry is on (in progress, watched, plan to watch/listen/read).

| Column     | Data Type                                           | Description                                           |
|------------|-----------------------------------------------------|-------------------------------------------------------|
| Username   | VARCHAR(30) FOREIGN KEY REFERENCES Users(Username)  | Username of user that media entry pertains to         |
| Title      | VARCHAR(50)                                         | Title of media entry                                  |
| Medium     | VARCHAR(10)                                         | Medium of media entry (TV, Movie, Book, Song)         |
| List       | VARCHAR(10)                                         | Particular list that a user added an entry to         |
| TimeAdded  | TIMESTAMP                                           | Timestamp of when user added media entry              |
| Pages      | INT                                                 | Total number of pages in book if entry is a book      |
| WatchTime  | REAL                                                | Total runtime of show or movie if entry is show/movie |
| ListenTime | REAL                                                | Total time spent listening to songs                   |
| ImageLink  | VARCHAR(100)                                        | Link to a raw image representing media entry          |
| UserRating | REAL                                                | Rating that user has given entry when adding to list  |
| IMDBRating | REAL                                                | Rating from scraped API (IMDB, Last.fm, etc)          |

## Division of Labor

Jarred: Fixing server routing, Implementation of many database functions, and configuring LastFM api for music. Also made landing page frontend able to show top chart for music.

Bill: Created search page to display results upon querying. Also fixed server routing especially for search functionality. Configured database operations for adding to database after search query.

Thao: Configured New York Times and Google Books APIs for books. Implemented search function for all mediums. Also, made landing page frontend able to show top best seller books. Also, frequently deployed the project to Heroku.
