const http = require('http');
const express = require('express');
const app = express();
const bodyParse = require('body-parser');

const mongoose = require('mongoose');

const todoRoutes = require('./routes/todo');

mongoose.connect('mongodb://localhost:27017/RestfulAPITodoList', {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(bodyParse.urlencoded({
  extended: false
}))
app.use(bodyParse.json());


//CORS
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

app.use('/todo', todoRoutes);

app.use((req, res, next) => {
  const error = new Error('Oops');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error:{
      msg: error.message
    }
  })
})

const port = process.env.port || 3000;
const server = http.createServer(app);

server.listen(port, function(){
  console.log(`Server is ruuning in ${port} Port.`);
  
})