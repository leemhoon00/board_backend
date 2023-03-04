const mongoose = require('mongoose');
const path = require('path');

const connect = () => {
  if (process.env.NODE_ENV !== 'production'){
    mongoose.set('debug', true);
    mongoose.set('strictQuery', false);
  }

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: true,
    sslCA: path.join(__dirname, "rds-combined-ca-bundle.pem"),
  })
    .then((res) => {
      console.log('몽고디비 연결성공');
    });
};

mongoose.connection.on('connection', (stream) => {
  console.log('몽고디비 연결 성공', stream);
});
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러');
});


module.exports = connect;