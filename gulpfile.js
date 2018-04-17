const gulp        = require('gulp'),
browserSync       = require('browser-sync').create(),
sass              = require('gulp-sass'),
pug               = require('gulp-pug'),
nodemon           = require('nodemon');

// Static Server + watching scss/html files
gulp.task('serve', function() {

  browserSync.init(null, {
      server: "./public/",
      // proxy: "http://localhost:5000",
      // files: ["public/**/*.*"],
      browser: "google chrome",
      notify: false,
      port: 3000
  });

  gulp.watch("public/assets/styles/scss/**/*.scss", ['sass']);
  gulp.watch("public/assets/pug/**/*.pug", ['pug']);
  // gulp.watch("./public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("public/assets/styles/scss/styles.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("public/assets/styles/css/"))
    .pipe(browserSync.stream());
});

gulp.task('pug', function() {
  return gulp.src("public/assets/pug/*.pug")
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest("public"))
    .pipe(browserSync.stream());
});

gulp.task('nodemon', function (cb) {
  var started = false;

  return nodemon({
    script: "app.js"
  }).on("start", function (){
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('default', ['sass', 'pug', 'serve']);
