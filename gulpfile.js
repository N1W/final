var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imgmin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	spritesmith = require('gulp.spritesmith');

gulp.task('sass', function(){
	return gulp.src('app/sass/*')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8'], {cascade: true}))
		.pipe(gulp.dest('app/css'))
});

gulp.task('scripts', function(){
	return gulp.src('app/js/script.js')
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});

gulp.task('cssmin', ['sass', 'sprite'], function(){
	return gulp.src('app/css/main.css')
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'))
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('clear', function(){
	return cache.clearAll();
});

gulp.task('img', function(){
	return gulp.src('app/img/**/*')
		.pipe(cache(imgmin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			une: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('sprite', ['img'], function () {
  var spriteData = gulp.src('dist/img/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  spriteData.img.pipe(gulp.dest('dist/img'));
  spriteData.css.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', ['cssmin', 'scripts'], function(){
	gulp.watch('app/sass/*', ['sass']);
});

gulp.task('build', ['clean', 'scripts', 'cssmin'], function(){
	var buidCss = gulp.src('app/css/main.min.css')
		.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/script.min.js')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

});