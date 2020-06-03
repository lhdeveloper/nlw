let gulp = require('gulp'),
    sass = require('gulp-sass'),
    distPath = `./dist/css`

function swallowError (error) {
// If you want details of the error in the console
    console.log(error.toString())

    this.emit('end')
}

// watch-sass
gulp.task('watch-css', function () {
    gulp.watch('./src/sass/*.scss', ['sass']);
});

// sass compile
gulp.task('sass', function () {
    return gulp.src('./src/sass/structure.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(gulp.dest('./dist/css'));
});