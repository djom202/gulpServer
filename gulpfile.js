/* Variables */
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    stylus  = require('gulp-stylus'),
    connect             = require('gulp-connect'),
	historyApiFallback  = require('connect-history-api-fallback');

/* Compresion de Js */
gulp.task('js', function () {
	return gulp.src('assets/js/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'))
	    .pipe(concat('main.js'))
	    .pipe(gulp.dest('assets/deploy'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(uglify())
	    .pipe(gulp.dest('assets/deploy'))
	    .pipe(connect.reload());
});

/* Compresion de Css */
gulp.task('css', function () {
   	gulp.src('assets/stylus/*.styl')
	   	.pipe(stylus({compress: true}))
	   	.pipe(rename({suffix: '.min'}))
	   	.pipe(gulp.dest('assets/deploy'))
		.pipe(connect.reload());
});

/* Limpieza de produccion */
gulp.task('clean', function(cb) {
    del(['assets/deploy/*.*'], cb)
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('default', ['clean'], function() {
    gulp.start('js', 'css', 'watch', 'webserver');
});

/* Cambio de archivos */
gulp.task('watch', function() {
   	gulp.watch('assets/stylus/*.styl', ['css']),
   	gulp.watch('assets/js/*.js', ['js']),
   	gulp.watch(['./*.html'], ['html']);
});

/* LocalServer */
gulp.task('webserver', function() {
   connect.server({
	  root: './',
	  hostname: '0.0.0.0',
	  port: 9000,
	  livereload: true,
	  middleware: function(connect, opt) {
		 return [ historyApiFallback ];
	  }
   });
});