var path = require("path");
module.exports =
{
  entry:
  {
    app: ["./Code/App.js"]
  },
  output:
  {
    path: path.resolve(__dirname, "build"),
    filename: "tbx_s.js",
    publicPath: "/Resources/"
  },
  resolve:
  {
    extensions: ['.js']
  },
  module:
  {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader?presets[]=es2015',
        exclude: /(node_modules|bower_components)/,
      }
    ]
  }
}