const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Favorites = require('../models/favorite.js');
const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
    Favorites.find({})
    
    .populate('dishes')
    .populate('users')
    
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(authenticate.verifyUser, (req, res, next) => {

  Favorites.create(req.body)
  .then((fvrt) => {
      console.log('favorites created ',fvrt);
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(fvrt);
  }, (err) => next(err))
  .catch((err) => next(err));})

.put(authenticate.verifyUser, (req, res, next) => {
  res.end('put operation is not supported');
})

.delete(authenticate.verifyUser, (req, res, next) => {
  Favorites.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

favoriteRouter.route('/:dishId')
.get(authenticate.verifyUser, (req, res, next) => {
    Favorites.find(req.params.dishId)
    .populate('dishes.dish')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post(authenticate.verifyUser, (req, res, next) => {
  Favorites.findById(req.params.dishId)
 .populate('users')
 .populate('dishes.dish')
 .then((fvrt) => {
  if(fvrt != null) {
    req.body.users = req.user._id;
    fvrt.users.push(req.body);
    fvrt.save()
    .then((fvrt) => {
        Favorites.findById(fvrt._id)
        .then((fvrt) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');    
            res.json(fvrt);
        })
    }, (err) => next(err));
  }
  else {
    err = new Error('fvrt '+req.params.dishId+' not found.');
    err.status = 404;
    return next(err);
  }
}, (err) => next(err))
.catch((err) => next(err));
})
        

.put(authenticate.verifyUser, (req, res, next) => {
 res.end('put operation is not supported');
})

.delete(authenticate.verifyUser, (req, res, next) => {
  Favorites.findByIdAndDelete(req.params.dishId)
  .then((fvrt) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(fvrt);
  }, (err) => next(err))
  .catch((err) => next(err));
});


module.exports = favoriteRouter;