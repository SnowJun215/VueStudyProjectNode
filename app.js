// 引入编写好的api
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const dataRouter = require('./routes/data');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser');
// 引入Express
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const whileListUrl = {
  get: [],
  post: [
    '/index/login'
  ]
};

const hasOneOf = (str, arr) => {
  return arr.some(item => item.includes(str));
};

// app.all('*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  let method = req.method.toLowerCase();
  let path = req.path;
  if (whileListUrl[method] && hasOneOf(path, whileListUrl[method])) {
    next();
  } else {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send('there is no token, please login');
    } else {
      jwt.verify(token, 'abcd', (error, decode) => {
        if (error) {
          res.send({
            code: 401,
            mes: 'token error',
            data: error
          });
        } else {
          req.userName = decode.name;
          next();
        }
      })
    }
  }
});

app.use('/index', indexRouter);
app.use('/user', userRouter);
app.use('/data', dataRouter);
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
// app.use(express.static(path.resolve(__dirname, './views')))
// 因为是单页应用 所有请求都走/dist/index.html
// app.get('*', function(req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, './views/index1.html'), 'utf-8')
//   res.send(html)
// });

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.send({
    code: 0,
    msg: err.message
  });
});

// 监听8088端口
var port = process.env.PORT || 3000
app.listen(port);
console.log(`success listen ${port} …………`);
