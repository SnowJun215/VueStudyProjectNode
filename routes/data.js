let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.send('response with a response');
});

router.get('/getUserInfo', (req, res) => {
  res.send('success');
});

router.post('/formData', (req, res) => {
  console.log(req.body);
  if (req.body.name !== 'test') {
    res.status(500).send({
      name: '姓名不对'
    });
  } else {
    res.send('success');
  }
});

module.exports = router;