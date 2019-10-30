let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');

const getPasswordByName = (userName) => {
  return {password: 'xxxx'}
};

router.post('/getUserInfo', (req, res) => {
  console.log('请求成功');
  res.status(200).send({
    code: 200,
    data: {
      name: 'June'
    }
  })
});

router.post('/login', (req, res) => {
  const {userName, password} = req.body;
  if (userName) {
    const userInfo = password ? getPasswordByName(userName) : '';
    if (!userInfo || !password || userInfo.password !== password) {
      res.status(401).send({
        code: 401,
        mes: 'user name or password is wrong',
        data: {}
      });
    } else {
      res.send({
        code: 200,
        mes: 'success',
        data: {
          token: jwt.sign({name: userName}, 'abcd', {
            expiresIn: 60 * 60 * 24
          })
        }
      })
    }
  } else {
    res.status(401).send({
      code: 401,
      mes: 'user name is empty',
      data: {}
    });
  }
});

module.exports = router;