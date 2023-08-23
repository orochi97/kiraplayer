This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

---------------------------------------------------------分割线------------------------------------------------------------------

**上面的是 react 原本的介绍**

## 注意

在没有执行 npm run eject 情况下，重新写了启动和打包 react 工程的命令

`react-scripts start` => `webpack-dev-server`

`react-scripts build` => `webpack`

### `npm run start:react`

启动 App 界面调试模式

### `npm run start:elec`

启动 Electron 服务调试模式

### `npm run start`

启动 App 界面调试模式 + 启动 Electron 服务调试模式

### `npm run build:react`

打包 App 界面代码，输出到 build 文件夹

### `npm run build:elec`

打包整个 Electron 的代码，输出最终产物到 dist 文件夹

### `npm run build`

npm run build:react && npm run build:elec，必须先打包界面的 react 代码，再打包服务的 electron 代码

## 碎碎念

一开始在网上看到复古的播放器样式，就想着结合练手 electron 和 react，做一个播放器。

初始用的都是低版本的 electron 和 react。最近都升级了版本，又改成 hook 写法。相当于重构了一下。

界面如下：

![snapshot.png](https://github.com/orochi97/kiraplayer/blob/master/images/snapshot.png)

**播放器样式取于网上，侵权删。**

**The player style is taken from the Internet, and the infringement will be deleted.**