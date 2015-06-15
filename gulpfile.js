var gulp = require('gulp'),
	babel = require('gulp-babel'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream');

// gulp.task('compile', function() {
// 	return gulp.src([
// 				'src/*.js'
// 			])
// 			.pipe(babel())
// 			.pipe(gulp.dest('dist'));
// });

gulp.task('modules', function() {
	browserify({
		entries: 'src/scripts.js',
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('output.js'))
	.pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
	return gulp.src('src/*.html')
				.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch(['src/*.js'], ['modules']);
	gulp.watch(['src/*.html'], ['html']);
});

gulp.task('default', ['modules', 'html', 'watch']);
