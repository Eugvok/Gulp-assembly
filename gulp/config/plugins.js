import replace from "gulp-replace"; //? search&change
import plumber from "gulp-plumber"; //? error processing
import notify from "gulp-notify"; //! masseges prompt  //! 
import browserSync from "browser-sync"; //local server
import newer from "gulp-newer"; //проверка обновления
import ifPlugin from "gulp-if"; // условное ветвление

//todo export object
export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browserSync: browserSync,
   newer: newer,
   if: ifPlugin
}