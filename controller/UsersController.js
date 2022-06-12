const express = require('express');
const bcryptjs = require('bcryptjs');
const hash = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const request = require('request');


const cliente = require('../model/Cliente');

const router = express.Router();

router.post('/login', async (req, res)=>{

    const user= await cliente.findOne({
        where:{email: req.body.email}
    });
    if(user){
        if(bcryptjs.compareSync(req.body.password, user.password)) {
            res.send({
                id: user.id,
                name: user.name,
                email: user.email
            });
            return;
        }
      
    }

    res.status(401).send({message:'Email ou senha incorretos! '})
  
    });

   
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });


module.exports = router; 