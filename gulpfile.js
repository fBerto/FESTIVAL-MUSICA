const{ src, dest, watch} = require("gulp");
const sass = require('gulp-sass')(require('sass'));;
const plumber= require("gulp-plumber");

function css (cb){
    src("src/scss/**/*.scss") //** */ es para q escuche por todos los archivos
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"));

    cb();
}

function dev(cb){
    watch("src/scss/**/*.scss", css)
    
    cb();
}

exports.css = css;
exports.dev = dev;