var path = require('path');

// Agregado para dualidad Postgresql/sqlite
// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var      url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var  DB_name = (url[6]||null);
var     user = (url[2]||null);
var      pwd = (url[3]||null);
var protocol = (url[1]||null);
var  dialect = (url[1]||null);
var     port = (url[5]||null);
var     host = (url[4]||null);
var  storage = process.env.DATABASE_STORAGE;

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
						{dialect: dialect,
						 protocol: protocol,
						 port: port,
						 host: host,
						 storage: storage, // solo SQLite
						 omitNull: true    // solo Postgres
						}
					);

// Importar la definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; // exportar definicion de la tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas de BD
sequelize.sync().success(function() {
	// success(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
		if(count === 0) { // la tabla se inicializa solo si esta vacia
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			}).success(function(){console.log('Capital de Italia')});
			Quiz.create({
				pregunta: 'Quien descubrio America',
				respuesta: 'Cristobal Colon'
			}).success(function(){console.log('Quien descubrio America')});
			Quiz.create({
				pregunta: 'Capital de Suecia',
				respuesta: 'Estocolmo'
			}).success(function(){console.log('Capital de Suecia')});
			Quiz.create({
				pregunta: 'Informatico mas guapo',
				respuesta: 'marc'
			}).success(function(){console.log('Muy personal')});
		};
	});
});
