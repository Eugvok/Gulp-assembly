import fileinclude from "gulp-file-include"; //! FILE-INCLUDE 4 HTML
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlMin from "gulp-htmlmin"; //todo моё!
import htmlSize from "gulp-size"; //todo моё!
// import pug from "gulp-pug"; //! GULP-PUG

export const html = () => {
   return app.gulp.src(app.path.src.html)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(fileinclude()) //todo switch OFF for PUG
		.pipe(htmlSize({ title: "Before compression:" })) //todo моё!
      .pipe(app.plugins.if(
         app.isBuild,
         htmlMin({
            collapseWhitespace: true
         })))
		.pipe(htmlSize({ title: "After compression:" })) //todo моё!
      //todo PUG start >>>>
      //   .pipe(pug({
      //! html compression
      // pretty: true,
      //!show in terminal processing file
      // verbose: true
      //   }))
      //todo PUG <<<< FINISH
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      .pipe(
         app.plugins.if(
            app.isBuild,
            webpHtmlNosvg()
         )
      )
      .pipe(
         app.plugins.if(
            app.Build,
            versionNumber({
               'value': '%DT%',
               'append': {
                  'key': '_V',
                  'cover': 0,
                  'to': [
                     'css',
                     'js'
                  ]
               },
               'output': {
                  'file': 'gulp/version.json'
               }
            }))
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browserSync.stream());
}