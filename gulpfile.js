//! Запуск сборки в режиме разработки
//todo ~$ npm run dev
//?<img width="150" src="@img/monkey.jpeg">   @ import img for html pages!!!<<<

//? Main modul 
import gulp from "gulp";

//? Paths import 
import { path } from "./gulp/config/path.js";

//? Common plugins import
import { plugins } from "./gulp/config/plugins.js";

//? To pass value in global variable
global.app = {
   isBuild: process.argv.includes('--build'),
   isDev: !process.argv.includes('--build'),
   path: path,
   gulp: gulp,
   plugins: plugins
}

//? Task import
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

//todo Watch for files  // для автоматической отправки на ftp
function watcher() {
   gulp.watch(path.watch.files, copy);
   //gulp.watch(path.watch.files, gulp.series(copy, ftp));
   gulp.watch(path.watch.html, html);
   //gulp.watch(path.watch.html, gulp.series(html,ftp));  
   gulp.watch(path.watch.scss, scss);
   //gulp.watch(path.watch.scss, gulp.series(scss, ftp));
   gulp.watch(path.watch.js, js);
   //gulp.watch(path.watch.js, gulp.series(js, ftp));
   gulp.watch(path.watch.images, images);
   //gulp.watch(path.watch.images, gulp.series(images, ftp));
}

//! <<<<<<<<<<<<<<<!!!!!!!!!!!!!>>>>>>>>>>>>>
export { svgSprive } //todo запускается отдельно!
//? ~$ npm run svgSprive

//! Обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

//! Main Tasks!
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

//todo building scenarios for executing tasks 
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//export scenario
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Default scenario
gulp.task('default', dev);