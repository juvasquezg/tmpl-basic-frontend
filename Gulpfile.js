// File: Gulpfile.js
'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect   = require('gulp-connect'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    historyApiFallback = require('connect-history-api-fallback');


// Web server development
gulp.task('server', function() {
	connect.server({
		root: './public',
		hostname: '0.0.0.0',
		port: 8080,
		livereload: true,
		middleware: function(connect, opt) {
			return [ historyApiFallback ];
		}
	});
});

// Search javascripts errors
gulp.task('jshint', function() {
	return gulp.src('./public/js/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
});


/**
 * Compila los archivos sass hijos directos de la carpeta `scss/`.
 * Agrega los prefijos propietarios de los navegadores.
 * Los archivos CSS generados se guardan en la carpeta `css/`.
 */
gulp.task('sass', function () {
  var processors = [
    autoprefixer({ browsers: ['last 2 versions'] })
  ];

  return gulp.src('./public/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
});

// Compile jade
gulp.task('jade', function() {
  gulp.src('./public/jade/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

// reload browser if HTML changed
gulp.task('html', function() {
	gulp.src('./public/**/*.html')
		.pipe(connect.reload());
});


/**
 * Ejecuta las tareas connect y sass, queda escuchando los cambios de todos
 * los archivos Sass de la carpeta `scss/` y subcarpetas.
 */
gulp.task('watch:sass', ['server', 'sass'], function () {
  gulp.watch('./public/scss/**/*.scss', ['sass']);
});


/**
 * Ejecuta las tareas connect y jade, queda escuchando los cambios de todos
 * los archivos jade de la carpeta `jade/` y subcarpetas.
 */
gulp.task('watch:jade', ['server', 'jade'], function () {
  gulp.watch('./public/jade/**/*.jade', ['jade']);
});


/**
 * Ejecuta las tareas connect y html, queda escuchando los cambios de todos
 * los archivos HTML de la carpeta raíz del proyecto.
 * Creado para quienes no usen Jade.
 */
gulp.task('watch:html', ['server', 'html'], function () {
  gulp.watch('./public/*.html', ['html']);
});


/**
 * Ejecuta las tareas watch:html y watch:sass
 * Creado para quienes no usen Jade.
 */
gulp.task('watch:html-sass', ['watch:html', 'watch:sass']);


/**
 * Ejecuta las tareas watch:sass y watch:jade.
 */
gulp.task('watch:all', ['watch:sass', 'watch:jade']);


/**
 * Ejecuta la tarea watch:sass.
 */
gulp.task('default', ['watch:sass']);
