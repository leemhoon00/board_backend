const User = require('../schemas/user');
const jwt = require('jsonwebtoken');

exports.join = async (req, res, next) => {
  const user = new User({
    id: req.body.id,
    pw: req.body.pw,
    name: req.body.name,
  });

  if (await User.exists({id: user.id})){
    res.end('2'); //해당 아이디가 이미 있음
    return;
  };

  user.save()
    .then(() => {
      res.send('1'); //디비 저장 성공
    })
    .catch((err) => {
      res.send('3');
      console.error(err);
    });
};

exports.login = async (req, res, next) => {
  const user = new User({
    id: req.body.id,
    pw: req.body.pw
  });

  if (await User.exists({id: user.id})){
    if (await User.exists({id: user.id, pw: user.pw})){
      const token = jwt.sign({
        id: user.id,
        name: user.name
      }, process.env.JWT_SECRET, {
        expiresIn: '15m',
        issuer: 'jonghun',
      });
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      return res.json({
        code: 200,
        message: '토큰이 발급되었습니다.',
        token,
      });
    } else{
      res.end('2'); return;
    }
  } else{
    res.end('3'); return;
  }
}

exports.test = async (req, res, next) => {
  const user = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  console.log(user);
  res.end('dd');
};