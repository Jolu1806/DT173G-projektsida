#### Publika sidan

GULP
Innehåller följande paket

* gulp-uglify
* gulp-image
* gulp-sass
* gulp-babel
* browser-sync

```
const files = {
  htmlPath: 'src/**/*.html',
  jsPath: 'src/js/*.js',
  imgPath: 'src/img/**',
  sassPath: 'src/**/*.scss'
};
```

```
function copyHTML() {
  return src(files.htmlPath)
    .pipe(dest('pub'))
    .pipe(browserSync.stream());
}
```

```
function doSass() {
  return src(files.sassPath)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('style.css'))
    .pipe(dest('pub/css'))
    .pipe(browserSync.stream());
}
```

```
function copyImg() {
  return src(files.imgPath)
    .pipe(image())
    .pipe(dest('pub/img'))
    .pipe(browserSync.stream());
}
```

copyImg-funktionen hämtar alla bilder som finns i src-katalogen med ett anrop innehållandes objektet från files-arrayen med rätt sökväg. Bilderna komprimeras i filstorlek med hjälp av gulp-image och skickas sedan till pub-katalogen.

```
function jsTask() {
  return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(babel())
    .pipe(dest('pub/js'))
    .pipe(browserSync.stream());
}
```

jsTask-funktionen hämtar alla JavaScript-filer som finns i src-katalogen med ett anrop innehållandes objektet från files-arrayen med rätt sökväg. Med hjälp av Babel kan filerna konverteras till en tidigare version av ECMAScript. Filen reduceras sedan i storlek med hjälp av Gulp-uglify, för att tillföra en snabbare laddningstid av webbsidan. De nya filerna skickas sedan till pub-katalogen.

```
function watchTask() {
  browserSync.init({
    server: {
      baseDir: 'pub/'
    },

    logLevel: 'debug'
  });
  watch(
    [files.htmlPath, files.jsPath, files.sassPath, files.imgPath],
    parallel(copyHTML, jsTask, doSass, copyImg)
  ).on('change', browserSync.reload);
}
```

watchTask-funktionen följer arrayen med sökvägar för att kontrollera om någon fil förändras, och om en förändring skulle uppstå anropas jsTask, sassTask och imageTask för att filerna skulle uppdateras och sedan publicerade i pub-katalogen. Efter att filerna har publicerats i katalogen skickas dem till en lokal statisk server som uppdateras varje gång någon fil i pub-katalogen förändras.

```
// Defualt task
exports.default = series(
  parallel(copyHTML, jsTask, doSass, copyImg),
  watchTask
);
```

sassTask-funktionen hämtar alla SCSS-filer som finns i src-katalogen, kompilerar all syntax till CSS med hjälp av ett npm paket som heter node-sass. När filerna har konverterats till rätt format skickas de till pub-katalogen.

imageTask-funktionen hämtar alla bilder som finns i src-katalogen med ett anrop innehållandes objektet från files-arrayen med rätt sökväg. Bilderna komprimeras i filstorlek med hjälp av gulp-imagemin och skickas sedan till pub-katalogen.

### Installation

* Installera Gulp lokalt/globalt på datorn
* Installera paketen från package.json med kommandot npm install
* Automatisering och optimering startas genom att anropa Gulp i terminalen ståendes i projektets mapp.
* Den färdiga webbsidan skickas till mappen pub och kan användas för publicering på lokal server.

### Webbsidan

Konsumerar data från REST API
Innehåller flera sidor som visar dynamisk data som konsumeras från REST-API. Detta utförs med hjälp av funktioner som skriver ut data från databasen med olika specifikationer genom Fetch API.