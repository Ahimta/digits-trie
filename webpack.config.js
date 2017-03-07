module.exports = {
  devtool: "source-map",
  entry: './src.js',
  output: {
    filename: 'dist/digits-trie.js',
    library: 'digits-trie',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          'es2015'
        ]
      }
    }]
  },
};
