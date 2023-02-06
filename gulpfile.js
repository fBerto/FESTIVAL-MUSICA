const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(cb) {
  src("src/scss/**/*.scss") //** */ es para q escuche por todos los archivos
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"));

  cb();
}

function imagenes(cb) {
  const opciones = {
    optimizationLevel: 3,
  };

  src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));
  cb();
}

function versionWebp(cb) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}") //{} para varios formatos
    .pipe(webp(opciones))
    .pipe(dest("build/img"));
  cb();
}

function versionAvif(cb) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}") //{} para varios formatos
    .pipe(avif(opciones))
    .pipe(dest("build/img"));
  cb();
}

function dev(cb) {
  watch("src/scss/**/*.scss", css);

  cb();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);
