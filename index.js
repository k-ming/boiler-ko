const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const config = require('./config/key');

const {User} = require("./models/User");


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//application/json 분석해서 가져올 수 있게 해주는 코드
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true,useFindAndModify:false
}).then(() => console.log('MongoDB Connected well'))
.catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요 새해복많이받으세요 안녕히가세요')
})


app.post('/register',(req, res) => {
  //회원가입에 필요한 정보들을 client에서 가져오면 
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body)

  user.save((err, doc) => {
    //실패시 에러메시지 전달
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success:true
    })
  })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})