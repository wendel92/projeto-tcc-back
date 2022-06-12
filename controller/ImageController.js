const express = require('express');

const multer = require('multer')  //para as fotos dos produtos

const {initializeApp} = require('firebase/app');
const {getStorage, ref, uploadBytes, deleteObject} = require('firebase/storage');

const app = express();

const Image = require('../model/Image');

const router = express.Router();

const firebaseConfig = {
    apiKey: "AIzaSyBgoB4LYgDTOql3gpv-FJjVTcrcCKrM5jg",
    authDomain: "tcc-iluminadas.firebaseapp.com",
    projectId: "tcc-iluminadas",
    storageBucket: "tcc-iluminadas.appspot.com",
    messagingSenderId: "609898365240",
    appId: "1:609898365240:web:64fa6c6ac7d8d7bf7e81cd",
    measurementId: "G-HEE4J524ES"
  };
  
  
  const firebaseapp = initializeApp(firebaseConfig);
  
  
  const storage = getStorage(firebaseapp);
  
  const multerFile = multer({
    storage: multer.memoryStorage(),
    limits:{
      fieldSize: 1024 * 1024 * 5
    }
  });


  router.post('/cadastarImage', multerFile.single('file'), (req,res)=>{
    
    const file = req.file;
    const fileName = Date.now().toString() + '_' + file.originalname;

    //console.log(file);
    //console.log(fileName);

    const fileRef = ref(storage, fileName);

    uploadBytes(fileRef, file.buffer)
    .then((snapshot)=>{
        console.log('UPLOAD EFETUADO COM SUCESSO');
        console.log(snapshot);
        res.status(200).json({'MSG':'OK'});
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({'MSG':'ERRO'});
    })

});
  

module.exports = router