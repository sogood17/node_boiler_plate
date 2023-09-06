const express = require('express')
const app = express()
const port = 5001
const bodyParser = require('body-parser')
const { User } = require("./models/User")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://gayoungkim:abcd1234@cluster0.vx4znsr.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 안녕'))

app.post('/register', (req, res) => {
  //회원가입 정보를 client에서 가져오면
  //데이터 베이스에 넣어준다.

  const user = new User(req.body)

  //몽고 DB메서드. user 정보가 user에 저장됨
  // user.save((err, doc) => {
  //   if(err) return res.json({success: false, err})
  //   return res.status(200).json({
  //   succes: true
  //   })
  // })
  user.save()
    .then((doc) => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
  });


})

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))