const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken');
const secret = 'djsdslk';
require('dotenv').config()
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const User = require('../models/user')
const googlelogin = (req,res)=>{
  const {tokenId} = req.body

  client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT_ID}).then(response=>{
    const email = response.payload.email
    const email_verified = response.payload.email_verified
    const name = response.payload.name
    const profile = response.payload.picture

    if(email_verified){
      User.findOne({email:email},(err,user)=>{
        if(err){
          res.json({msg:'something went wrong!'})
        }
        else{
          
          if(user===null){
            var newuser = new User({
              email:email,
              name:name,
              photo:profile
            })

            newuser.boards.push({title:'demo board',lists:[]})
            newuser.boards[0].lists.push({title:'demo list',tasks:[]})
            newuser.boards[0].lists[0].tasks.push({title:'demo task',status:'incompleted'})
            newuser.save((err,re)=>{
              if(err){
                throw err
              }
              else{
                console.log(re)
                const email = re.email
                const payload = { email };
                jwt.sign(payload, secret, {
                expiresIn: '24h'
                },(err,token)=>{
                    if(err){
                        throw err
                    }
                    console.log("token"+token)
                    res.json({
                        token:token
                    })
                });
              }
            })
          }else{
            const email = user.email
            const payload = { email };
            jwt.sign(payload, secret, {
            expiresIn: '24h'
            },(err,token)=>{
                if(err){
                    throw err
                }
                console.log("token"+token)
                res.json({
                    token:token
                })
            });
          }
        }
      })
    }
  })
} 

module.exports = {
  googlelogin
}