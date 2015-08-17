var express = require('express');
var models = require('../models/models'); // Fixed: Ver si es compatible con MVC

var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('index', { title: 'Quiz', quizes: quizes });
  });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);
router.get('/author', quizController.author);
router.get('/quizes', quizController.quizes);

module.exports = router;