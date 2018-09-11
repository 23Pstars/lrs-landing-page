const gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    src = 'src',
    dist = 'dist',
    srv = 'srv',
    assets_postfix = '-lpv2',
    assets_path = {
        local: 'assets',
        server: 'https://assets.lrsoft.org'
    },
    link = {
        tw: 'https://s.lrsoft.id/tw',
        fb: 'https://s.lrsoft.id/fb',
        gh: 'https://s.lrsoft.id/gh',
        em: 'mailto:info@lrsoft.org'
    };

gulp
    .task('img', () => {
        gulp.src(src + '/assets/img/*')
            .pipe(gulp.dest(dist + '/assets/img/'));
    })
    .task('html', () => {
        gulp
            .src(src + '/index.html')
            .pipe(htmlmin({
                collapseWhitespace: true,
                removeComments: true
            }))
            .pipe(replace('{{assets_path}}', assets_path.local))
            .pipe(replace('{{assets_postfix}}', assets_postfix))
            .pipe(replace('{{link.tw}}', link.tw))
            .pipe(replace('{{link.fb}}', link.fb))
            .pipe(replace('{{link.gh}}', link.gh))
            .pipe(replace('{{link.em}}', link.em))
            .pipe(gulp.dest(dist));
    })
    .task('css', () => {
        gulp
            .src(src + '/assets/sass/*.scss')
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(rename(path => {
                path.basename += assets_postfix;
            }))
            .pipe(gulp.dest(dist + '/assets/css/'));
    })
    .task('js', () => {
        gulp
            .src(src + '/assets/js/*.js')
            .pipe(uglify())
            .pipe(rename(path => {
                path.basename += assets_postfix;
            }))
            .pipe(gulp.dest(dist + '/assets/js/'));
    })
    .task('server', () => {
        gulp
            .src(src + '/index.html')
            .pipe(htmlmin({
                collapseWhitespace: true,
                removeComments: true
            }))
            .pipe(replace('{{assets_path}}', assets_path.server))
            .pipe(replace('{{assets_postfix}}', assets_postfix))
            .pipe(replace('{{link.tw}}', link.tw))
            .pipe(replace('{{link.fb}}', link.fb))
            .pipe(replace('{{link.gh}}', link.gh))
            .pipe(replace('{{link.em}}', link.em))
            .pipe(gulp.dest(srv));
    })
    .task('default', ['html', 'img', 'css', 'js'])
    .task('watch', ['default'], () => {
        gulp.watch(src + '/**/*.png', ['img']);
        gulp.watch(src + '/**/*.jpg', ['img']);
        gulp.watch(src + '/**/*.scss', ['css']);
        gulp.watch(src + '/**/*.js', ['js']);
        gulp.watch(src + '/**/*.html', ['html']);
    });