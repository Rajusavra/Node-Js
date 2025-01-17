'use strict'
var gulp = require('gulp');
var injectPartials = require('gulp-inject-partials');
var inject = require('gulp-inject');
var prettify = require('gulp-prettify');
var replace = require('gulp-replace');
var merge = require('merge-stream');

/* inject partials like sidebar and navbar */
gulp.task('injectPartial', function () {
    return gulp.src(["./pages/**/*.html", "./index.html"], {
            base: "./"
        })
        .pipe(injectPartials())
        .pipe(gulp.dest("."));
});

/* inject Js and CCS assets into HTML */
gulp.task('injectAssets', function () {
    return gulp.src(["./**/*.html"])
        .pipe(inject(gulp.src([
           './assets/vendors/feather/feather.css',
            './assets/vendors/mdi/css/materialdesignicons.min.css',
            './assets/vendors/ti-icons/css/themify-icons.css',
            './assets/vendors/font-awesome/css/font-awesome.min.css',
            './assets/vendors/typicons/typicons.css',
            './assets/vendors/simple-line-icons/css/simple-line-icons.css',
            './assets/vendors/css/vendor.bundle.base.css',
            './assets/vendors/js/vendor.bundle.base.js',
            './assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js',
            './assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css' 
        ], {
            read: false
        }), {
            name: 'plugins',
            relative: true
        }))
        .pipe(inject(gulp.src([
            // './assets/css/shared/style.css',
             './assets/css/*.css',
            './assets/js/off-canvas.js',
            './assets/js/template.js',
            './assets/js/settings.js',
            './assets/js/hoverable-collapse.js',
            './assets/js/todolist.js'
        ], {
            read: false
        }), {
            relative: true
        }))
        .pipe(gulp.dest('.'));
});

/*replace image path and linking after injection*/
gulp.task('replacePath', function () {
    var replacePath1 = gulp.src('./pages/**/*.html', {
            base: "./"
        })
        .pipe(replace('="../assets/', '="../../assets/'))
        .pipe(replace('href="../pages/', 'href="../../pages/'))
        .pipe(replace('="../docs/', '="../../docs/'))
        .pipe(replace('href="../index.html"', 'href="../../index.html"'))
        .pipe(gulp.dest('.'));
    var replacePath2 = gulp.src('./index.html', {base: "./"})
        .pipe(replace('="../assets/', '="assets/'))
        .pipe(replace('="../docs/', '="docs/'))
        .pipe(replace('="../pages/', '="pages/'))
        .pipe(replace('="../index.html"', '="index.html"'))
        .pipe(gulp.dest('.'));
    return merge(replacePath1, replacePath2);
});

gulp.task('html-beautify', function () {
    return gulp.src(['./**/*.html', '!node_modules/**/*.html'])
        .pipe(prettify({
            unformatted: ['pre', 'code', 'textarea']
        }))
        .pipe(gulp.dest(function (file) {
            return file.base;
        }));
});

/*sequence for injecting partials and replacing paths*/
gulp.task('inject', gulp.series('injectPartial', 'injectAssets', 'html-beautify', 'replacePath'));
