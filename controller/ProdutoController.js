const express = require('express');

// const firebase = require('firebase');


const app = express();

const produto = require('../model/Produto'); //importação do model 


const router = express.Router();





// vai gerenciar o armazenamento dos arquivos (imagens do produto)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) =>{
//       cb(null, './uploads/');
//   },
//   filename: (req, file, cb)=>{
//       cb(null, Date.now().toString() + '_' + file.originalname);
//   }
// });

// vai configurar o tipo de imagem que pode subir 
// const fileFilter = (req, file, cb)=>{

//   if( file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ||  file.mimetype === 'image/png'){

//       cb(null, true);

//   }else{

//       cb(null, false);

//   }

// }

// // vai subir as imagens no banco 
// const upload = multer({
//   storage: storage,
//   limits:{ 
//       fieldSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });


router.post('/cadastrarProduto',  (req, res) => {

// console.log(req.file);
// console.log(req.body);

let { name_product, description, stock, tblCategoriumId, price_product } = req.body;

produto.create({
  name_product,
  description,
  stock,
  price_product,
  tblCategoriumId
})
.then(() => {
  res.send('PRODUTO CADASTRADO')
})
});




router.get('/listarProduto', (req, res) => {
produto.findAll().then((produtos) => {
res.send(produtos)
})});

// rota de listar o produto por id 

router.get('/listarProduto/:id ', (req, res) =>{

    let {id} = req.params;
      produto.findByPk(id).then((produto)=>{
        res.send(produto)
      })
})

// router.get('/listarImagem', (req,res)=>{
  
//   let {id, image} = req.params;
//   produto
// })

router.put('/alterarProduto', (req, res) => {

const {name_product, description, stock, tblCategoriumId, price_product} = req.body; 

// alteração do produto com a imagem sendo excluida 

// if(req.files != ''){

//   produto.findByPk(id).then((produto)=>{
//     // let image = produto.image; 

//     // excluindo a imagem 

//     fs.unlink(image, (error)=>{
//       if(error){
//         console.log('Imagem não excluiu, tenta ai dnv' + error)
//       }else{
//         console.log('Deuu certooooo!')
//       }
//     });

//       image = req.files.path

//   })
// }

// aqui é a atualização dos dados do produto 

produto.update(
{
  name_product,
  description,
  stock,
  image,
  price_product,
  tblCategoriumId
  }
)
})

router.delete('/apagarProduto/:id', (req, res) => {

   let {id} = req.params;
      produto.findByPk(id).then((produto)=>{
        // let image = produto.image;
        
      })
});

module.exports = router
