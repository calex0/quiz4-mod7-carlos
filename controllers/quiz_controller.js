var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){

	models.Quiz.find({where:{id:Number(quizId)},}).then(

		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else { next (new Error('No existe quizId=' + quizId))}
			}
			).catch(function(error){next(error)});
};

// GET /quizes/:id

exports.show = function(req, res) {
	res.render('quizes/show', { quiz: req.quiz});
};



//GET / quizes
exports.index = function(req,res){
	 
	var filtro = req.query.search;
	var condicion = ('%' + filtro + '%').replace(/ /g,'%');
  	models.Quiz.findAll({where:["pregunta like ?", condicion],order:'pregunta ASC'}).then(function(quizes){
    res.render('quizes/index.ejs',{quizes: quizes, errors: []});
  }).error(function(error) {next(error);});
};


//GET /quizes/answer

exports.answer = function(req,res){
  var resultado = 'Incorrecto';
	  if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
    }
    res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});
    };
