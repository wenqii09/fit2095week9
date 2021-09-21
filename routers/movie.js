var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');

module.exports = {

    // getAll: function (req, res) {
    //     Movie.find(function (err, movies) {
    //         if (err) return res.status(400).json(err);

    //         res.json(movies);
    //     });
    // },

    getAll: function (req, res) {
        Movie.find({})
        .populate('actors') // collection in compass
        .exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
         });
    },



    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },


    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },


    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        });
    }, 

    // 1. delete a movie by its ID 
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);

            res.json();
        });
    }, 


    // 4. Remove a actor from the list of actor in movie 
    deleteActorinMovie: function(req,res){
        Movie.findOne({ _id: req.params.id }, function (err, movies) {
            if (err) return res.status(400).json(err);
            if (!movies) return res.status(404).json();

            let actorID = req.params.actorid;

            for(let i=0; i < movies.actors.length;i++){
                if(movies.actors[i] == actorID){

                    // remove it from the list 
                    (movies.actors).splice(i,1);

                    movies.save(function (err) {
                        if (err) return res.status(500).json(err);
                        res.json(movies);
                    });
                }
            }
        });
    },


    // 5. Add an existing actor to the list of actors in a movie
    addActor: function (req, res) {

        Movie.findOne({ _id: req.params.movieid }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            // type ID in body to add 
            Actor.findOne({ _id: req.body.actorid }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        })
    },


    // 6. 
    getYears: function(req,res){
        let y1 = req.params.y1;
        let y2 = req.params.y2;
        let query = { year: { $gte: y2, $lte: y1 }};

        Movie.find(query,function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    }, 

    // 9. 
    deleteYears: function(req,res){
        let y1 = req.body.y1;
        let y2 = req.body.y2;
        let query = { year: { $gte: y2, $lte: y1 }};

        Movie.deleteMany(query, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    incrementYear: function(req,res){
        let query = {title: /^X/};
        let filter = { $inc: { year: 1} };

        Movie.updateMany(query, filter, function (err, movie) {
            if (err) return res.status(500).json(err);
                    res.json(movie);
        });
    }

    
};