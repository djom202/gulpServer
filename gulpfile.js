/* Variables */
var gulp 				= require('gulp'),
    // sass 				= require('gulp-ruby-sass'),
    // autoprefixer 		= require('gulp-autoprefixer'),
    // minifycss 			= require('gulp-minify-css'),
    jshint 				= require('gulp-jshint'),
    uglify 				= require('gulp-uglify'),
    rename 				= require('gulp-rename'),
    concat 				= require('gulp-concat'),
    notify 				= require('gulp-notify'),
    // cache 				= require('gulp-cache'),
    livereload 			= require('gulp-livereload'),
    del 				= require('del'),
    // stylus  			= require('gulp-stylus'),
    connect             = require('gulp-connect'),
    jade        		= require('gulp-jade'),
    less 				= require('gulp-less'),
	historyApiFallback  = require('connect-history-api-fallback');

/* Compresion de Js */
gulp.task('js', function () {
	return gulp.src('assets/js/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'))
	    .pipe(concat('main.js'))
	    .pipe(rename({suffix: '.min'}))
	    .pipe(uglify())
	    .pipe(gulp.dest('deploy/js'))
	    .pipe(connect.reload());
});

/* Compresion de Css */
gulp.task('css', function () {
   	gulp.src('assets/less/*.less')
      	.pipe(less())
      	.pipe(gulp.dest('deploy/css'))
      	.pipe(connect.reload());
});

/* Limpieza de produccion */
gulp.task('clean', function(cb) {
    del([
    	'deploy/css/*.*',
    	'deploy/js/*.*',
    	'deploy/partials/*.*',
    	'deploy/index.html'
    ], cb)
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  	return gulp.src('*.jade')
	    .pipe(jade({
	      	pretty: true
	    }))
	    .pipe(gulp.dest('deploy'))
	    .pipe(connect.reload());
});

gulp.task('partials', function() {
    return gulp.src('partials/*.jade')
	    .pipe(jade({
	      	pretty: true
	    }))
	    .pipe(gulp.dest('deploy/partials'))
	    .pipe(connect.reload());
});

/* Init GulpServer */
gulp.task('default', ['clean'], function() {
    gulp.start('html', 'partials','js', 'css', 'watch', 'webserver');
});

/* Cambio de archivos */
gulp.task('watch', function() {
   	gulp.watch('assets/stylus/*.styl', ['css']),
   	gulp.watch('assets/js/*.js', ['js']),
   	gulp.watch(['*.jade'], ['html']);
   	gulp.watch(['partials/*.jade'], ['partials']);
});

/* LocalServer */
gulp.task('webserver', function() {
   	connect.server({
		root: './deploy',
		hostname: '0.0.0.0',
		port: 9000,
		livereload: true,
		middleware: function(connect, opt) {
			return [ historyApiFallback ];
		}
   	});
});