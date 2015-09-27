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

// Compile sass to css
gulp.task('css', function() {
	gulp.src('./public/scss/estilos.scss')
		.pipe(sass())
    .on('error', gutil.log)
    .pipe(rename('core.min.css'))
		.pipe(gulp.dest('./public/css/'))
		.pipe(connect.reload());
});

// Compile jade
gulp.task('jade', function() {
  gulp.src('./public/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
});

// reload browser if HTML changed
gulp.task('html', function() {
	gulp.src('./public/**/*.html')
		.pipe(connect.reload());
});


// watch
gulp.task('watch', function() {
	gulp.watch(['./public/**/*.html'], ['html']);
	gulp.watch(['./public/**/*.jade'], ['jade']);
  gulp.watch(['./public/scss/**/*.scss'], ['css']);
	gulp.watch(['./public/js/**/*.js', './Gulpfile.js'], ['jshint']);
});

gulp.task('default', ['server', 'css', 'watch']);
