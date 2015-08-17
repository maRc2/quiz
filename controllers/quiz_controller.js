var models = require('../models/models');

// GET /quizes/question
exports.question = function(req, res) {
	
	models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question', 
					{pregunta: req.query.question || quiz[0].pregunta}
		);
	});
};

// GET /quizes/answer
exports.answer = function(req, res) {
	models.Quiz.findAll().success(function(quiz) {
		for(i=0;i<=quiz.length;i++) {
		  if((req.query.question).localeCompare(quiz[i].pregunta) ){ 
			if( req.query.respuesta === quiz[i].respuesta)
		    	res.render('quizes/answer', {respuesta: 'Correcto'});
		    else
		    	res.render('quizes/answer', {respuesta: 'Incorrecto'});
		  }
		}
	});
};

// GET /author
exports.author = function(req, res) {
	res.render('author', {title: 'Quiz', author: 'maRc', desc_author: 'Desarrollador Node'});
};

// GET /quizes
exports.quizes = function(req, res) {
	if( "busqueda" in req.query ) { // Segundo (y +) parseo devuelve resultados a la vez que muestra busqueda
	  var search = "%" + req.query.busqueda + "%";
	  models.Quiz.findAll({where: ["pregunta like ?", search], order: 'pregunta ASC'}).success(function(quiz) {
	  	var jquiz = JSON.stringify(quiz);
	  	res.render('quizes', {title: 'Busqueda entre cuestiones', desc: 'Introduzca el texto a buscar', encontrado: jquiz});		
	  });
	} else { // Parseo por primera vez muestra la pagina de busqueda
	  res.render('quizes', {title: 'Busqueda entre cuestiones', desc: 'Introduzca el texto a buscar', encontrado: ""});
	}
};