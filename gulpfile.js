let gulp = require("gulp");
let server = require("browser-sync").create();

gulp.task("server", function () {
  server.init({
    server: {
      baseDir: "src/",
    },
  });

  gulp.watch("src/**/*").on("change", server.reload);
});
