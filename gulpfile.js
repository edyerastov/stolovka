var gulp         = require('gulp'), // Подключаем Gulp
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    sass         = require('gulp-sass');

gulp.task('css', function(){ // Создаем таск Sass
    return gulp.src('src/style/**/*.css') // Берем источник
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('build/style')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('sass', function () {
    gulp.src('src/style/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('build/style'))
}) ;

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'build' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('plugins.min.js')) // Собираем их в кучу в новом файле plugins.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('build/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', ['css'], function() {
    return gulp.src('build/style/style.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('build/style')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css', 'scripts', 'sass'], function() {
    gulp.watch('src/style/**/*.scss', ['sass']); // Наблюдение за css файлами в папке css
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/style/**/*.scss', browserSync.reload);
    gulp.watch('build/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('build/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img')); // Выгружаем на продакшн
});


gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);
