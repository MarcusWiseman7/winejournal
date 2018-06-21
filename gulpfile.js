const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const composer = require('gulp-uglify/composer');
const uglifyes = require('uglify-es');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const imagemin = require('gulp-imagemin');
const del = require('del');
const pump = require('pump');

const uglify = composer(uglifyes, console);

// styles
gulp.task('styles', (cb) => {
  pump([
    gulp.src('public/stylesheets/style.css'),
    autoprefixer('last 2 versions'),
    rename({ suffix: '.min' }),
    cssnano(),
    gulp.dest('public/stylesheets'),
  ], cb);
});

// scripts
gulp.task('scripts', (cb) => {
  pump([
    gulp.src('public/javascripts/main.js'),
    concat('main.js'),
    rename({ suffix: '.min' }),
    uglify(),
    gulp.dest('public/javascripts'),
  ], cb);
});

// clean
gulp.task('clean', () => del(['public/stylesheets/style.min.css', 'public/javascripts/main.min.js']));

// default task
gulp.task('default', ['clean'], () => {
  gulp.start('styles', 'scripts');
});

// watch task
gulp.task('watch', () => {
  // watch .css files
  gulp.watch('public/stylesheets/*.css', ['styles']);

  // watch .js files
  gulp.watch('public/javascripts/*.js', ['scripts']);

  // create livereload server
  livereload.listen();

  // watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});

// image optimizer
gulp.task('image', (cb) => {
  pump([
    gulp.src('public/img/*'),
    imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]),
    gulp.dest('public/img'),
  ], cb);
});
