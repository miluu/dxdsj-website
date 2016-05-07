module.exports = {
  module: {
    loaders: [{
      test: /\.js/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  devtool: 'inline-source-map'
};
