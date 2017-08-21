const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('run', () => {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            port: 3000,
        },
        ignore: ['./node_modules/**']
    }).on('restart', () => {
        console.log("Restarting..")
    });
});