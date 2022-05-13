const express = require('express')

const categoria = require('../model/Categoria')

const router = express.Router()

router.post('/cadastrarCategoria', (req, res) => {

    console.log(req.body);

    let {nome_categoria, descricao_categoria} = req.body

        categoria.create({
            nome_categoria,
            descricao_categoria,
        }).then(()=>{res.send('Categoria cadastrada!')});
});

router.get('/listarCategoria', (req, res) => {
        categoria.findAll().then((categorias)=>{res.send(categorias)})
})

router.put('/categoria/alterarCategoria', (req, res) => {

        categoria.update({
            nome_categoria,
            descricao_categoria,
        })
})

router.delete('/categoria/apagarCategoria', (req, res) => {

})

module.exports = router;
