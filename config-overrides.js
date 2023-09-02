const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = function override(config, env) {
  //do stuff with the webpack config...
  if (env !== 'development') {
    config.output.filename = 'static/js/[name].js'
    config.output.chunkFilename = 'static/js/[name].chunk.js'
    config.output.assetModuleFilename = 'static/media/[name].[ext]'
    config.plugins.forEach( (p,i) => {
      if( p instanceof MiniCssExtractPlugin) {
          //delete p;
          config.plugins.splice(i,1, new MiniCssExtractPlugin( {
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[name].chunk.css',
          } ));
      }             
    })
  }
  return config;
}