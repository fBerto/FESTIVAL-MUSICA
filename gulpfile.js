const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require ("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

//Javascript
const terser = require("gulp-terser-js");

function css(cb) {
  src("src/scss/**/*.scss") //** */ es para q escuche por todos los archivos
    .pipe(sourcemaps.init()) //guarda referencia
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write(".")) //donde escribe la referencia . => misma que hoja de css
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

function javascript(cb){
  src("src/js/**/*.js") //identificar el archivo
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write("."))
  .pipe(dest("build/js")); //llevamos otra capreta para vea en navegador
  cb();
}

function dev(cb) {
  watch("src/js/**/*.js", javascript);
  watch("src/scss/**/*.scss", css);
  cb();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
