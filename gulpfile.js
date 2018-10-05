const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const htmlmin = require('gulp-htmlmin');
const refresh = require('gulp-livereload');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const server = require('gulp-webserver');


gulp.task('default', ['app.css', 'app.js', 'deps.js', 'watch', 'webserver'],
	() => {

});

gulp.task('app.html', () => {
	gulp.src('./app/**/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('./public'))
});

gulp.task('app.css', () => {
	gulp.src('./app/css/main.css')
		.pipe(minifycss())
		.pipe(gulp.dest('./public/css'))
});

gulp.task('app.js', () => {
	gulp.src('./app/**/*.js')
		.pipe(babel({
            presets: ['es2015']
        }))
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'))
});

gulp.task('deps.js', () => {
	gulp.src([
		'./node_modules/angular/angular.min.js', 
		'./node_modules/angular-route/angular-route.min.js'
		])
		.pipe(concat('deps.js'))
		.pipe(gulp.dest('./public/js'))
});

gulp.task('watch', () => {
 	watch('app/**/*.html', () => gulp.start('app.html'))
  	watch('app/**/*.css', () => gulp.start('app.css'))
  	watch('app/**/*.js', () => gulp.start('app.js'))
  	watch('assets/**/*.*', () => gulp.start('app.assets'))
});

gulp.task('webserver', () => {
	return gulp.src('./public').pipe(server({
    livereload: true,
    port: 3003,
    open: true
  }));
});