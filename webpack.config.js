const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: src + '/index.tsx',
  output: {
    path: dist,
    filename: 'index.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devServer: {
    open: true, //ブラウザを自動で開く
    openPage: 'index.html', //自動で指定したページを開く
    contentBase: path.join(__dirname, 'public'), // HTML等コンテンツのルートディレクトリ
    watchContentBase: true, //コンテンツの変更監視をする
    port: 3000, // ポート番号
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
};
