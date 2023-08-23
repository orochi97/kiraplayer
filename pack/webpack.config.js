const path = require('path');
const fse = require('fs-extra');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const appDirectory = process.cwd();
const isDev = process.env.NODE_ENV === 'development';

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const appBuild = resolveApp('build');
const appPublic = resolveApp('public');
const appHtml = resolveApp('public/index.html');

const DEV_SONG_PREFIX = '/dev-song';
const devSongPrefixReg = new RegExp(`^${DEV_SONG_PREFIX}`);

module.exports = {
  entry: './src/app/index.js',
  output: {
    path: appBuild, // 打包后的文件存放的地方
    filename: 'static/js/[name].[contenthash:8].js', // 打包后输出文件的文件名，比如上面打出来就会是 a.js b.js c.js
  },
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'sourcemap' : false,
  stats: 'errors-only',
  resolve: {
    alias: {
      '@': resolveApp('src/app'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-react'],
          plugins: ['@babel/transform-runtime'],
        }
      },
      {
        test:/\.css$/,//支持正则
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../../' },
          },
          {
            loader: require.resolve('css-loader'),
            options: {},
          },
        ],
      },
      {
        //文件加载器，处理文件静态资源
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx'],
    }), // https://eslint.org/docs/latest/integrate/nodejs-api#-new-eslintoptions
    new HtmlWebpackPlugin({ // 模板生成相关的配置，每一个对于一个页面的配置，有几个写几个
      // favicon: resolveApp('public/favicon.ico'), //favicon路径，经过webpack引入同时能够生成hash值
      // filename: '/index.html',//生成的html存放路径，相对于 path
      template: resolveApp('public/index.html'), //html模板路径
      // chunks: ['index'],//区分你想要加载的js，名字要跟entry入口定义的保存一直
      // inject:true, //容许插件修改哪些内容，包括head与body js插入的位置，true/'head'/'body'/false
      hash:true,//为静态资源生成hash值，能够实现缓存
      minify: {
        removeComments:true,//移除HTML中的注释
        collapseWhitespace:true //删除空白符与换行符
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new webpack.DefinePlugin({
      PUBLIC_URL: JSON.stringify('./'),
      DEV_SONG_PREFIX: JSON.stringify(DEV_SONG_PREFIX),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: '.',
    }),
    function CopyPublicPlugin() {
      this.hooks.done.tapAsync('end', function(stats, callback) {
        fse.copySync(appPublic, appBuild, {
          dereference: true,
          filter: file => file !== appHtml,
        });
        console.info('Hey app built successfully!');
        callback();
      })
    },
  ],
  devServer: {
    static: {
      directory: appBuild,
    },
    port: 8080,
    hot: true,
    // open: true,
    setupMiddlewares: function (middlewares, devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      // 调试时候，audio 标签 src 指向的是本地绝对地址，请求会变成：本地域名/歌曲绝对地址，导致文件不存在
      // 在调试时，路径加上前缀，然后在服务器中间件做处理返回相应的文件流
      devServer.app.get(devSongPrefixReg, (req, res) => {
        const song = decodeURI(req.path.replace(devSongPrefixReg, ''));
        res.sendFile(song);
      });
      return middlewares;
    },
  },
}