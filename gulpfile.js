/* Author Johan Lundqvist */
const { src, dest, series, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const image = require('gulp-image');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const files = {
  htmlPath: 'src/**/*.html',
  jsPath: 'src/js/*.js',
  imgPath: 'src/img/**',
  sassPath: 'src/**/*.scss'
};

//  Task: Copy HTML and img
function copyHTML() {
  return src(files.htmlPath)
    .pipe(dest('pub'))
    .pipe(browserSync.stream());
}
// Task: Copy CSS

function doSass() {
  return src(files.sassPath)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('style.css'))
    .pipe(dest('pub/css'))
    .pipe(browserSync.stream());
}
// Task: Copy img folder
function copyImg() {
  return src(files.imgPath)
    .pipe(image())
    .pipe(dest('pub/img'))
    .pipe(browserSync.stream());
}
// Task: concat, uglify Javascript

function jsTask() {
  return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(babel())
    .pipe(dest('pub/js'))
    .pipe(browserSync.stream());
}

// Task: Watcher, Lyssnar efter förändringar i SRC katalog
function watchTask() {
  browserSync.init({
    server: {
      baseDir: 'pub/'
    },

    logLevel: 'debug'
  });
  watch(
    [files.htmlPath, files.jsPath, files.sassPath, files.imgPath],
    parallel(copyHTML, jsTask, doSass, copyImg)
  ).on('change', browserSync.reload);
}
// Defualt task
exports.default = series(
  parallel(copyHTML, jsTask, doSass, copyImg),
  watchTask
);