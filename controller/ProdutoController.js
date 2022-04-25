const express = require('express')

const multer = require('multer')  //para as fotos dos produtos 

const produto = require('../model/Produto')

/**
 * firebase para o armazenamento das fotos 
 */

const {initializeApp} = require('firebase/app');
const {getStorage, ref, uploadBytes, deleteObject } = require('firebase/storage');

const router = express.Router()

/**
 * configurar o firebase para o armazenamento das fotos
 */

const firebaseConfig = {
apiKey: "AIzaSyBgoB4LYgDTOql3gpv-FJjVTcrcCKrM5jg",
authDomain: "tcc-iluminadas.firebaseapp.com",
projectId: "tcc-iluminadas",
storageBucket: "tcc-iluminadas.appspot.com",
messagingSenderId: "609898365240",
appId: "1:609898365240:web:64fa6c6ac7d8d7bf7e81cd",
measurementId: "G-HEE4J524ES"
}

const firebaseapp = initializeApp(firebaseConfig);


const storage = getStorage(firebaseapp);
// console.log(storage);


const multerFile = multer({
storage: multer.memoryStorage(),
limits:{
  fieldSize: 1024 * 1024 * 5
}
});


router.post('/cadastrarProduto', multerFile.single('image'), (req, res) => {


const file = req.file;
const fileName = Date.now().toString() + '_' + file.originalname;

console.log(file);
console.log(fileName);

const fileRef = ref(storage, fileName);
uploadBytes(fileRef, file.buffer)

const { name_product, description, stock, image } = req.body

produto.create({
name_product,
description,
stock,
image,
})
.then(() => {
res.send('PRODUTO CADASTRADO')
})
})




router.get('/listarProduto', (req, res) => {
produto.findAll().then((produtos) => {
res.send(produtos)
})
})

router.put('/alterarProduto', (req, res) => {
produto.update(
  {
    name_product,
    description,
    stock,
    image,
    }
)
})

router.delete('/apagarProduto', (req, res) => {})

module.exports = router
