'use strict'
var gulp = require('gulp');
var replace = require('gulp-replace');
var merge = require('merge-stream');

//  copy all assets to the dist folder 
function CopyAssetsToTheme() {
    let copyImages = gulp.src('./assets/images/**/*').pipe(gulp.dest(`../dist/assets/images`))
    let copyJs = gulp.src('./assets/js/*').pipe(gulp.dest(`../dist/assets/js`))
    let copyVendors = gulp.src('./assets/vendors/**/*').pipe(gulp.dest(`../dist/assets/vendors`));
    let copyFonts = gulp.src('./assets/fonts/**/*').pipe(gulp.dest(`../dist/assets/fonts`));
    let copyThemeCss = gulp.src('./assets/css/**/*').pipe(gulp.dest('../dist/assets/css'))
    let copyEntry = gulp.src('./index.html').pipe(gulp.dest('../dist/'));
    let copyPages = gulp.src('./pages/**/*').pipe(gulp.dest('../dist/pages'));
    let copyDocs = gulp.src('./docs/**/*').pipe(gulp.dest('../dist/docs/'));
    return merge(copyImages, copyJs, copyVendors, copyFonts, copyEntry, copyThemeCss, copyDocs, copyPages, copyFonts)
}

gulp.task('replacePaths', () => {
    let replacePath1 = gulp.src(['./index.html'], {base: '../dist'})
        .pipe(replace('="../../assets', '="assets'))
        .pipe(gulp.dest('../dist'))
    let replacePath2 = gulp.src(['./pages/**/*.html'], {base: '../dist'})
        .pipe(replace('="../../../../assets', '="../../assets'))
        .pipe(gulp.dest('../dist'))
    return merge(replacePath1, replacePath2)
})

// build necessary file to dist
gulp.task('build', gulp.series(CopyAssetsToTheme, 'replacePaths'))
