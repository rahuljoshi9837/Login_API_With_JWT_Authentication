const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
const secretkey='di(t!0nArY';

app.post('/login', (req, res) => {
    const user={
        id:1,
        username:'Rahul Joshi',
        email:'rahul@gmail.com'
    }
    jwt.sign({user}, secretkey, {expiresIn:'300s'}, (err, token) => {
        res.json({
            token,
            'msg':'Success'
        })
    }) 
});

app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, secretkey, (err, authData) => {
        if(err){
            res.json({
                "msg":"Something is wrong with token !!"
            })
        }else{
            res.json({
                "msg":"Profile Accessed !!",
                authData
            })
        }
    })
});

function verifyToken(req, res, next){
    const bearerToken = req.headers['authorization'];
    if( (typeof bearerToken=='undefined') || bearerToken==""){
        res.send({
            "msg":"Token is not valid !!"
        });
    }else{
        const bearer = bearerToken.split(" ");
        req.token=bearer[1];
        next();
    }
}

app.listen(port,() => {
    console.log(`server is up on ${port}`);
})