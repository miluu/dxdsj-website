module.exports = {
  module: {
    loaders: [{
      test: /\.js/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.tpl/,
      loader: 'html'
    }]
  },
  devtool: 'inline-source-map'
};
