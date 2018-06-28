const path = require('path');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`, // File that Webpack will start with
  output: {                      // Output path where bundle will be placed
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.js?x/, // Checks if file type is a JS or JSX file
        include : SRC_DIR, // Includes everything inside of the source directory
        loader : 'babel-loader', // Uses Babel Loader
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, // Checks if file type is a picture
        loader: "file-loader?name=images/[name].[ext]"} //Outputs any pictures into dist/images with name and extension
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"]
},
};