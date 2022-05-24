const express = require('express');
const bcryptjs = require('bcryptjs');
const hash = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const request = require('request');

const Cliente = require('../model/Cliente');

const router = express.Router();

router.post('/login', async (req, res)=>{

  let response= await Cliente.findOne({
      where:{password: req.body.password, email: req.body.email }
  });
  if(response === null){
      res.send('error');
    
  }else{
      res.send(response);
  }

  });




module.exports = router; 