require("dotenv").config();
var keys = require("./keys");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var axios = require('axios');
var fs = require("fs");

var command = process.argv[2];
var info = process.argv[3];

switch(command) {

    case "concert-this":
    getConcert(info);
    break;

    case "spotify-this-song":
    getSpotify(info);
    break;

    case "movie-this":
    getMovie(info);
    break;

    case "do-what-it-says":
    doWhat();
    break;
    
}

function getSpotify(trackTitle) {

    if (trackTitle === "") {
      trackTitle = "Changes";
    }
  
    spotify.search({ type: 'track', query: trackTitle }, function (err, data) {
      
        if (err) {
        return console.log('Error: ' + err);
        }
   
    console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
    console.log("Album: ", data.tracks.items[0].album.name);
    console.log("Link: ", data.tracks.items[0].preview_url);
    
    });
  }

function getConcert(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function (response) {
        console.log(response.data[0]);
        var concertDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
        console.log("Venue:", response.data[0].venue.name);
        console.log("City:", response.data[0].venue.city);
        console.log("Date:", concertDate);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  
  function getMovie(movieName) {
    axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=3e985ca8&t=" + movieName)
      .then(function (data) {
    
        console.log("Title of the movie:", data.data.Title);
        console.log("Rating: ", data.data.Rated);
        console.log("Year of Release: ", data.data.Year);
        console.log("Rotten Tomatoes: ", data.data.Ratings[1].Value);
        console.log("Country of Production: ", data.data.Country);
        console.log("Language: ", data.data.Language);
        console.log("Plot: ", data.data.Plot);
        console.log("Actors: ", data.data.Actors);

      })
      .catch(function (error) {
        console.log(error);
      });
    
      if (movieName === "Mr. Nobody") {
        
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    };
  }
  
  function doWhat() {
        
        fs.readFile("random.txt", "utf8", function (err, data) {
        console.log(data);
        data = data.toString();
        console.log(data);
        var command= data[0];
        var info = data[1];
      
        switch (command) {
           
            case "spotify-this-song":
            getSongs(info);
            break;

            case "concert-this":
            getConcert(info);
            break;
            
            case "movie-this":
            getMovie(info);
            break;
        }
        });
    }