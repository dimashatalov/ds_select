const path = require('path');

module.exports = {
 mode : "production",
 entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'ds-select.js',
    library: 'DS_Select',
    libraryTarget:'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },  
};
