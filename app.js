const express = require('express');
const morgan = require('morgan');
const { sort } = require('./playstore.js');
const playstore = require('./playstore.js');

const app = express();
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Google Playstore Apps Assignment');
});

app.get('/apps', (req, res) => {
  // Optional query requests
  const { sort, genres } = req.query;

  // Sorting conditional statement
  //if sorting, must be by either rating or app
  // the sort input by user will change to lowercase the check if 'rating'/'app' is included
  if (sort) {
    if (!['rating', 'app'].includes(sort.toLowerCase())) {
      return res.status(400).send('Sort must be either by rating or app-name');
    }
  }


// Genres conditional statement
  //if genres, must be by either the following below
  // the genres input by user will change to lowercase the check if genres input is on in list below' is included
  if (genres) {
    if (
      !['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(
        genres.toLocaleLowerCase()
      )
    ) {
      return res
        .status(400)
        .send(
          'Genre must be either by Action, Puzzle, Strategy, Casual, Arcade, or Card'
        );
    }
  }


 let results = [...playstore]
  // filter the results by genre
  if(genres){
    results = playstore.filter((app) => app.Genres.toLowerCase().includes(genres.toLowerCase()))
  }
   

  // Sort the results and place in order alphabetically(app)
  if (sort && sort.includes('app')) {
    results.sort((a, b) => {
      if (a["App"] > b["App"]) {
        return 1;
      } else if (a["App"] < b["App"]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  // Modify the results and place in order by value (rating)
  if (sort && sort.includes('rating')) {
    results.sort((a, b) => {
      if (a["Rating"] > b["Rating"]) {
        return -1;
      } else if (a["Rating"] < b["Rating"]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  

  res.json(results);
});

module.exports = app;
