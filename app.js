const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const movie = require('./models/movie');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:aId/:mId', actors.removeMovie);
app.put('/actors/:id/movies', actors.deleteMovies); 
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:mId/:aId', movies.removeActor);
app.get('/movies/:year1/:year2', movies.getMovieByYear);
app.delete('/movies', movies.deleteByYear);
