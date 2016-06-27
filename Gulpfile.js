'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    angularFilesort = require('gulp-angular-filesort'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    historyApiFallback = require('connect-history-api-fallback'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream;

var rootPath = './app';
var distPath = './dist';
var regExpJsPath = rootPath + '/scripts/**/*.js';
var regExpCssPath = rootPath + '/scripts/**/*.css';
var bowerDepInstallPath = rootPath + '/lib';
var devIndexName = 'index.dev.html';
var indexName = 'index.html';
var DEV_PORT = 3010;
var DIST_PORT = 3011;

// Servidor web de desarrollo
gulp.task('server', function() {
    connect.server({
        root: rootPath,
        hostname: '0.0.0.0',
        port: DEV_PORT,
        livereload: true,
        middleware: function(connect, opt) {
            return [historyApiFallback({})];
        }
    });
});
// Servidor web de produccion
gulp.task('server-dist', function() {
    connect.server({
        root: distPath,
        hostname: '0.0.0.0',
        port: DIST_PORT,
        livereload: true,
        middleware: function(connect, opt) {
            return [historyApiFallback({})];
        }
    });
});
// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

gulp.task('copy-index', function() {
    return gulp.src(devIndexName)
      .pipe(rename(indexName))
      .pipe(gulp.dest(rootPath));
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
    return gulp.src('./app/scripts/*/.js')
        .pipe(jshint('.jshintrc')).pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});
// Busca en las carpetas de estilos y javascript los archivos que hayamos creado
// para inyectarlos en el index.html
gulp.task('inject', ['wiredep'], function() {
    var jsSources = gulp.src([regExpJsPath]);
    var cssSources = gulp.src([regExpCssPath], {read: false});

    return gulp.src(indexName, {
            cwd: rootPath
        })
        .pipe(inject(jsSources.pipe(angularFilesort()), {relative: true}))
        .pipe(inject(cssSources, {relative: true}))
        .pipe(gulp.dest(rootPath));
});
// Inyecta las librerias que instalemos vía Bower
gulp.task('wiredep', ['copy-index'], function() {
    return gulp.src(indexName, {
            cwd: rootPath
        })
        .pipe(wiredep({
            directory: bowerDepInstallPath,
            read: false,
            onError: function(err) {
                console.log('Task wiredep: ' + err.code);
            }
        }))
        .pipe(gulp.dest(rootPath));
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch([regExpJsPath], ['jshint']);
    gulp.watch([regExpJsPath], ['inject']);
    gulp.watch([regExpCssPath, '!' + bowerDepInstallPath + '/**'], ['inject']);
    gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('heroku:production', function(){
    console.log('herokuduction');
});

gulp.task('default', ['server', 'inject', 'watch']);
