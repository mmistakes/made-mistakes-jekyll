'use strict';
const argv         = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const browserSync  = require('browser-sync').create();
const cheerio      = require('gulp-cheerio');
const concat       = require('gulp-concat');
const cssnano      = require('gulp-cssnano');
const gulp         = require('gulp');
const gzip         = require('gulp-gzip');
const newer        = require('gulp-newer');
const postcss      = require('gulp-postcss');
const rename       = require('gulp-rename');
const rev          = require('gulp-rev');
const sass         = require('gulp-sass');
const size         = require('gulp-size');
const svgstore     = require('gulp-svgstore');
const svgmin       = require('gulp-svgmin');
const sourcemaps   = require('gulp-sourcemaps');
const uglify       = require('gulp-uglify');
const when         = require('gulp-if');

// 'gulp scripts' -- creates a index.js file with Sourcemap from your JavaScript files
// 'gulp scripts --prod' -- creates a index.js file from your JavaScript files,
// minifies, gzips and cache busts it. Does not create a Sourcemap
gulp.task('scripts', () =>
  // NOTE: The order here is important since it's concatenated in order from
  // top to bottom, so you want vendor scripts etc on top
  gulp.src([
    'src/assets/javascripts/vendor/jquery/*.js',
    'src/assets/javascripts/plugins/**/*.js',
    'src/assets/javascripts/main.js'
  ])
    .pipe(newer('.tmp/assets/javascripts/index.js', {dest: '.tmp/assets/javascripts', ext: '.js'}))
    .pipe(when(!argv.prod, sourcemaps.init()))
    .pipe(concat('index.js'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(when(argv.prod, rename({suffix: '.min'})))
    .pipe(when(argv.prod, when('*.js', uglify({preserveComments: 'some'}))))
    .pipe(when(argv.prod, size({
      showFiles: true
    })))
    .pipe(when(argv.prod, rev()))
    .pipe(when(!argv.prod, sourcemaps.write('.')))
    .pipe(when(argv.prod, gulp.dest('.tmp/assets/javascripts')))
    .pipe(when(argv.prod, when('*.js', gzip({append: true}))))
    .pipe(when(argv.prod, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/javascripts'))
);

// 'gulp styles' -- creates a CSS file from SCSS, adds prefixes and creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SCSS, adds prefixes, minifies,
// gzips and cache busts it. Does not create a Sourcemap
gulp.task('styles', () =>
  gulp.src(['src/assets/stylesheets/style.scss', '!src/assets/stylesheets/critical.scss', '!src/assets/stylesheets/glitch-critical.scss'])
    .pipe(when(!argv.prod, sourcemaps.init()))
    .pipe(sass({
      precision: 10
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions', '> 5%', 'IE 9']})
    ]))
    .pipe(size({
      showFiles: true
    }))
    .pipe(when(argv.prod, rename({suffix: '.min'})))
    .pipe(when(argv.prod, when('*.css', cssnano({autoprefixer: false}))))
    .pipe(when(argv.prod, size({
      showFiles: true
    })))
    .pipe(when(argv.prod, rev()))
    .pipe(when(!argv.prod, sourcemaps.write('.')))
    .pipe(when(argv.prod, gulp.dest('.tmp/assets/stylesheets')))
    .pipe(when(argv.prod, when('*.css', gzip({append: true}))))
    .pipe(when(argv.prod, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    .pipe(when(!argv.prod, browserSync.stream()))
);

// 'gulp critical:css' -- transform critical.scss into /_includes/critical.css
gulp.task('critical:css', () =>
  gulp.src('src/assets/stylesheets/critical.scss')
    .pipe(sass({
      precision: 10
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions', '> 5%', 'IE 9']})
    ]))
    .pipe(size({
      showFiles: true
    }))
    .pipe(when('*.css', cssnano({autoprefixer: false})))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest('.tmp/src/_includes'))
);

// 'gulp glitchcritical:css' -- transform critical.scss into /_includes/glitchcritical.css
gulp.task('glitchcritical:css', () =>
  gulp.src('src/assets/stylesheets/glitch-critical.scss')
    .pipe(sass({
      precision: 10
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions', '> 5%', 'IE 9']})
    ]))
    .pipe(size({
      showFiles: true
    }))
    .pipe(when('*.css', cssnano({autoprefixer: false})))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest('.tmp/src/_includes'))
);

// 'gulp critical --prod' -- pull out critical CSS and place in Jekyll _include
// gulp.task('critical', function() {
//   return gulp.src(['dist/*.html'])
//     .pipe(when(argv.prod, critical({
//       base: 'dist/',
//       inline: true,
//       assetPaths: ['dist/assets/stylesheets/'],
//       // css: ['.tmp/assets/stylesheets/style.css'],
//       dimensions: [{
//         width: 320,
//         height: 480
//       },{
//         width: 768,
//         height: 1024
//       },{
//         width: 1280,
//         height: 960
//       }],
//       minify: true,
//       extract: false,
//       ignore: ['font-face']
//     })))
//     .pipe(gulp.dest('dist'));
// });

// 'gulp icons' -- combine all svg icons into single file
gulp.task('icons', function () {
  return gulp.src('src/assets/icons/*.svg')
    .pipe(svgmin())
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore({ fileName: 'icons.svg', inlineSvg: true}))
    .pipe(cheerio({
      run: function ($, file) {
        $('svg').attr('style', 'display:none');
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest('src/_includes'))
});

// function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}
// 'gulp serve' -- open site in browser and watch for changes
// in source files and update them when needed
gulp.task('serve', (done) => {
  browserSync.init({
    // tunnel: true,
    // open: false,
    port: 4000, // change port to match default Jekyll
    ui: {
      port: 4001
    },
    server: ['.tmp', 'dist']
  });
  done();

  // watch various files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('build:site', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('site', reload));
  gulp.watch('src/assets/javascripts/**/*.js', gulp.series('scripts', reload));
  gulp.watch('src/assets/stylesheets/**/*.scss', gulp.series('styles', 'critical:css', 'glitchcritical:css'));
  gulp.watch('src/assets/images/**/*', gulp.series('images', 'images:feature', reload));
});
