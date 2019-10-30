let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('response with a response');
});

router.get('/getUserInfo', (req, res) => {
  res.send('success');
});

router.get('/authorization', (req, res) => {
  const userName = req.userName;
  res.send({
    code: 200,
    mes: 'success',
    data: {
      token: jwt.sign({name: userName}, 'abcd', {
        expiresIn: 60 * 60 * 24
      })
    }
  })
});

module.exports = router;