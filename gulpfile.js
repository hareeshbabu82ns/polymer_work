/**
 * Created by hareesh on 08/02/16.
 */
var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('serve', function () {
  // Start the server at the beginning of the task
  server.run(['server/app.js']);

  // Restart the server when file changes
  gulp.watch(['client/**/*.html'], server.notify);
  gulp.watch(['client/styles/**/*.scss'], ['styles:scss']);
  //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]);
  //Event object won't pass down to gulp.watch's callback if there's more than one of them.
  //So the correct way to use server.notify is as following:
  gulp.watch(['{.tmp,app}/styles/**/*.css'], function (event) {
    gulp.run('styles:css');
    server.notify(event);
    //pipe support is added for server.notify since v0.1.5,
    //see https://github.com/gimm/gulp-express#servernotifyevent
  });

  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], server.notify);
  gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});