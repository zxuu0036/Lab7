var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
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
        Movie.findOne({
                _id: req.params.id
            })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({
            _id: req.params.id
        }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addActor: function (req, res) {
        Movie.findOne({
            _id: req.params.id
        }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({
                _id: req.body.id
            }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    removeActor: function (req, res) {
        Movie.findByIdAndUpdate({
            _id: req.params.mId
        }, {
            $pull: {
                "actors": mongoose.Types.ObjectId(req.params.aId)
            }
        }, {
            upsert: false
        }, function (err, data) {
            res.json(data);
        })
    },
    getMovieByYear: function (req, res) {
        let year1 = parseInt(req.params.year1);
        let year2 = parseInt(req.params.year2);
        Movie.find({
            year: {
                $gte: year2,
                $lte: year1
            }
        }).exec(function (err, result) {
            if (err) throw res.json(err);
            res.json(result);
        })
    },
    deleteByYear: function (req, res) {
        Movie.deleteMany({
            year: {
                $gte: req.body.year2,
                $lte: req.body.year1
            }
        }).exec(function (err, result) {
            if (err) throw res.json(err);
            res.json(result);
        })
    }
};