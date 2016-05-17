//using the html-webpack-plugin to copy over the html into the dist directory
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	// need to tell webpack the entry point into our application
	entry: [
		'./app/index.js'
	],
	module: {
		loaders: [
			//this is written as a regular expression section
			//{test: /\.coffee$/, exclude: /node_modules/, loader: "coffee-loader"}
		{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
		]
	},
	output: {
		filename: "index_bundle.js",
		path: __dirname + '/dist'
	},
	//this tells the webpack we are using a plugin
	plugins: [HTMLWebpackPluginConfig]
}
