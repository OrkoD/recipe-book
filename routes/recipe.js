const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/', (req, res) => {
  Recipe.find().exec((err, recipes) => {
    if (err) {
      res.json({
        success: false,
        message: 'An error occurred',
        error: err
      })
    } else {
      res.json({
        success: true,
        message: 'Recipes retrieved successfully',
        recipes: recipes
      })
    }
  })
});

router.post('/', (req, res) => {
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    imagePath: req.body.imagePath
  });

  recipe.save((err, recipe) => {
    if (err) {
      res.json({
        success: false,
        message: 'An error occurred',
        error: err
      })
    } else {
      res.json({
        success: true,
        message: 'Recipe saved successfully',
        recipe: recipe
      })
    }
  })
});

router.patch('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $set: {
    title: req.body.title,
    imagePath: req.body.imagePath,
    description: req.body.description
  }}, {new: true}, (err, recipe) => {
    if (err) {
      res.json({
        success: false,
        message: 'An error occurred',
        error: err
      })
    } else {
      res.json({
        success: true,
        message: 'Recipe updated successfully',
        recipe: recipe
      })
    }
  })
});

router.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, (err, recipe) => {
    if (err) {
      res.json({
        success: false,
        message: 'An error occurred',
        error: err
      })
    } else {
      res.json({
        success: true,
        message: 'Recipe deleted successfully',
        recipe: recipe
      })
    }
  });
});

module.exports = router;