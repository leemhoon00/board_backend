const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');


dotenv.config();

const connect = require('./schemas');

connect();

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  next();
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});