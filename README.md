# book_app

**Author**: Martin Papa and Phong Doan
**Version**: 2.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code 301 class. (i.e. What's your problem domain?) -->
1.0.0 When user visits app, user either clicks on title or author for the search criteria and then types an input. User clicks on submit and backend serches for data partaining to the user input from Google Books API and displays the results to the show page.

2.0.0 When user visits app, the use will see the saved books with details and a vew detail button to GET to route /book/:id to view singular book with details. From navigation, user can click on search for book to go to search route in which user can input search and choose a search criteria of either title or author. The results are pulled from Google Book API and displays a list of 10 books from the search. User can select book and edit details in which the book can be saved into the databse, where it can be viewed in the home page

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
create .env in root of app and have a port and DATABASE_URL
 psql \<database name\> -f data/books.sql
npm install
nodemon

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
NODE.js
JS
express
superagent
ejs
Google Books API
JQuery
postgres
dotenv

## Change Log

12-17-2019 11:30pm - Application now accepts input from user to query Google Book API using superagent to repond with data that is relative to the input.

## Credits and Collaborations
Martin Papa and Phong Doan

12-18-2019 12:22pm - Application now shows saved books from database to the homepage and in nav bar user can search for title or author from Google Books API where user can select a book to add to Database. 

## Credits and Collaborations
Martin Papa and Phong Doan
