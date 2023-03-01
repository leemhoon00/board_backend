const User = require('../schemas/user');

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
      console.error(err);
    });
};