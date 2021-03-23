const path = require("path");

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: path.resolve(__dirname, "../nginx-1.19.8/nginx-1.19.8/html")
}