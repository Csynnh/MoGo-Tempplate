const pug = require("gulp-pug");
const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browsersync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const cleaner = require("gulp-rimraf");

const options = {
  views: {
    src: ["app/views/*.pug", "app/views/!blocks/**", "app/views/!layout/**"],
    dest: "public",
    all: "app/views/**/*.pug",
  },
  styles: {
    src: "app/styles/**/*.scss",
    dest: "public/styles",
  },
  scripts: {
    src: "app/scripts/**/*.js",
    dest: "public/scripts",
  },
  fonts: {
    src: "app/fonts/**/*",
    dest: "public/fonts",
  },
  images: {
    src: "app/images/**/*",
    dest: "public/images",
  },
  browserSync: {
    baseDir: "public",
  },
};

/* Browser-sync
 * ------------ */
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: options.browserSync.baseDir,
    },
    port: 3000,
  });
  done();
}

function renderViews() {
  return src(options.views.src)
    .pipe(
      plumber(function (err) {
        console.log("Pug Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(pug({ pretty: true }))
    .pipe(dest(options.views.dest))
    .pipe(
      browsersync.reload({
        stream: true,
      })
    );
}
function renderStyles() {
  return src(options.styles.src)
    .pipe(
      plumber(function (err) {
        console.log("Styles Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(dest(options.styles.dest))
    .pipe(
      browsersync.reload({
        stream: true,
      })
    );
}
function renderScripts() {
  return src(options.scripts.src)
    .pipe(
      plumber(function (err) {
        console.log("Scripts Task Error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(babel())
    .pipe(dest(options.scripts.dest))
    .pipe(
      browsersync.reload({
        stream: true,
      })
    );
}
function renderFonts() {
  return src(options.fonts.src).pipe(dest(options.fonts.dest));
}
function renderImages() {
  return src(options.images.src).pipe(dest(options.images.dest));
}
async function clean() {
  return src("public", { read: false, allowEmpty: true }).pipe(cleaner());
}
function watchFiles() {
  watch(options.views.all, renderViews);
  watch(options.styles.src, renderStyles);
  watch(options.scripts.src, renderScripts);
  watch(options.fonts.src, renderFonts);
  watch(options.images.src, renderImages);
}
const watching = parallel(watchFiles, browserSync);
const build = series(
  // clean,
  parallel(renderStyles, renderViews, renderScripts, renderImages, renderFonts)
);
exports.clean = clean;
exports.build = build;
exports.watch = watching;
exports.default = build;
