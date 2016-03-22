module.exports = {

  output: {
    library: 'DropboxClient',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }

}
