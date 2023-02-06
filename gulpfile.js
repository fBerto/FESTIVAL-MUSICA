const{ src, dest, watch,parallel} = require("gulp");

//CSS
const sass = require('gulp-sass')(require('sass'));;
const plumber= require("gulp-plumber");

//Imagenes
const webp = require("gulp-webp");

function css (cb){
    src("src/scss/**/*.scss") //** */ es para q escuche por todos los archivos
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"));

    cb();
}

function versionWebp(cb){

    const opciones = {
        quality:50
    };

    src("src/img/**/*.{png,jpg}")//{} para varios formatos
    .pipe(webp(opciones))
    .pipe(dest("build/img"))
    cb();
}

function dev(cb){
    watch("src/scss/**/*.scss", css)
    
    cb();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev =parallel(versionWebp,dev) ;