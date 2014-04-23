var gulp = require('gulp');
var	jade = require('gulp-jade');
var	cssmin = require('gulp-cssmin');
var	stylus = require('gulp-stylus');
var	concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var	uglify = require('gulp-uglify');
var imgmin = require('gulp-imagemin');
var notify = require('gulp-notify');

var paths = {
	css: "./build/css",
	stylus: "./src/stylus/*.styl",
	js: "./src/js/*.js",
	jsmin: "./build/js",
	html: "./build/html",
	jade: "./src/jade/*.jade",
	img: "./src/img/*.*",
	imgmin: "./build/img",
	fonts: "./src/fonts"
};
gulp.task('stylus', function(){
	gulp.src(paths.stylus)
		.pipe(stylus({bare:true}))
		.pipe(concat('all.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest(paths.css))
		.pipe(notify("Your Stylus has Turned into CSS"));
});
gulp.task('scripts', function(){
	gulp.src(paths.js)
		.pipe(jshint())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.jsmin))
		.pipe(notify("Your Javascript has been Uglified"));
});
gulp.task('jade', function(){
	gulp.src(paths.jade)
		.pipe(jade({client:false}))
		.pipe(gulp.dest(paths.html))
		.pipe(notify("Your Jade has Turned into HTML"));
});
gulp.task('imgmin', function(){
	gulp.src(paths.img)
		.pipe(imgmin())
		.pipe(gulp.dest(paths.imgmin))
		.pipe(notify("Your Images have Minified"));
});
gulp.task('watch', function(){
	gulp.watch('gulpfile.js', ['default']);
	gulp.watch(paths.jade, ['jade']);
	gulp.watch(paths.stylus, ['stylus']);
	gulp.watch(paths.js, ['scripts']);
	gulp.watch(paths.img, ['imgmin']);
});

gulp.task('default', ['stylus', 'scripts', 'jade', 'imgmin', 'watch'], function(){});
