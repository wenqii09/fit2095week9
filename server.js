//https://hub.packtpub.com/building-movie-api-express/
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

let path = require('path');

app.listen(8080);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoints 
// 7. 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);

// 2. Delete an actor and all its movies
app.delete('/actorsMovie/:id', actors.deleteAllMovie)

// 3. 
app.delete('/actors/:id/:movieid', actors.deleteMovieinActor);


//Movie RESTFul  endpoints
// 8.
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

// 1. DeleteamoviebyitsID
app.delete('/movies/:id', movies.deleteOne);

// 4. Remove an actor from the list of actors in a movie
app.delete('/movies/:id/:actorid', movies.deleteActorinMovie);

// 5. Add an existing actor to the list of actors in a movie
app.post('/movies/:movieid', movies.addActor);


// 6. Retrieve(GET) all the movies producedbetweenyear1andyear2,whereyear1>year2.
app.get('/movies/:y1/:y2', movies.getYears);

// 9. 
app.delete('/movies', movies.deleteYears);

// extra task 
app.put('/movieTitle', movies.incrementYear);


// add
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

console.log("Server running at http://localhost:8080/")