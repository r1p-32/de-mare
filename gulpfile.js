var gulp           = require('gulp'),
gutil          = require('gulp-util' ),
sass           = require('gulp-sass'),
browserSync    = require('browser-sync'),
concat         = require('gulp-concat'),
uglify         = require('gulp-uglify'),
cleanCSS       = require('gulp-clean-css'),
rename         = require('gulp-rename'),
del            = require('del'),
imagemin       = require('gulp-imagemin'),
cache          = require('gulp-cache'),
autoprefixer   = require('gulp-autoprefixer'),
ftp            = require('vinyl-ftp'),
notify         = require("gulp-notify");

// Скрипты проекта

// gulp.task('common-js', function() {
// 	return gulp.src([
// 		'app/js/common.js',
// 		])
// 	.pipe(concat('common.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('app/js'));
// });

// gulp.task('js', ['common-js'], function() {
// 	return gulp.src([
// 		'app/libs/jquery/dist/jquery.min.js',
// 		'app/libs/slick/slick.min.js',
// 		'app/libs/textTailor/jquery.texttailor.js',
// 		'app/libs/equalHeights/dist/jquery.equalheights.min.js',
// 		'app/libs/vue-carousel-3d-master/dist/vue.js',
// 		'app/libs/vue-carousel-3d-master/dist/vue-carousel-3d.min.js',
// 		'app/js/common.min.js', // Всегда в конце
// 		])
// 	.pipe(concat('scripts.min.js'))
// 	// .pipe(uglify()) // Минимизировать весь js (на выбор)
// 	.pipe(gulp.dest('app/js'))
// 	.pipe(browserSync.reload({stream: true}));
// });

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/js/common.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/*.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
