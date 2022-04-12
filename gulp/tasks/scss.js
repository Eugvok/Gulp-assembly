import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss'; //WEBP img conclusion
import autoPrefixer from 'gulp-autoprefixer'; //adding vendor prefixes 
import groupCssMediaQueries from "gulp-group-css-media-queries"; //grouping media queries

const sass = gulpSass(dartSass);

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
         })
      ))
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(sass({
         outputStyle: 'expanded'
      }))
      .pipe(
         app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            webpcss({
               webpClass: ".webp",
               noWebpClass: ".no-webp"
            })
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            autoPrefixer({
               grid: true,
               overrideBrowserslist: ["last 3 versions"],
               cascade: true
            })
         )
      )
      //! uncomment if uncompressed file is needed 
      .pipe(app.gulp.dest(app.path.build.css)) //todo <<<<<
      .pipe(
         app.plugins.if(
            app.isBuild,
            cleanCss()
         )
      )
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream());
}