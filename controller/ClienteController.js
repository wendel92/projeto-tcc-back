const express = require('express')
const bcryptjs = require('bcryptjs')
const hash = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const request = require('request');          



const cliente = require('../model/Cliente')
// const { async } = require('@firebase/util')
const router = express.Router()



router.post(
  '/cadastrarCliente', 

  [
    body('email').isEmail().withMessage('O e-mail precisa ser válido'),
    body('email').custom((value) => {
      if (!value) {
        return Promise.reject('E-mail é obrigatório')
      }
      if (value == 'teste@teste.com') {
        return Promise.reject('E-mail já cadastrado')
      }
      return true
    }),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Este campo precisa preenchido com pelo menos 6 caracteres'),
    body('name')
      .isLength({ min: 3 })
      .withMessage(
        'Este campo precisa ser preenchido com pelo menos 3 caracteres'
      ),
    body('cpf').isNumeric().withMessage('cpf precisa ser numerico'),
  ],

  (req, res) => {

    const err = validationResult(req)

    if (!err.isEmpty()) {
      return res.status(401).json({ err: err.array() })
    }

    let { name, cpf, phone, email, password} = req.body

    console.log(req.body);
    let senha;

    bcryptjs.genSalt(10, function(err, salt) {
      bcryptjs.hash(password, salt, function(err, hash) {
          
          password = hash

          cliente
          .create({
            name,
            cpf,
            phone,
            email,
            password,
          })
          .then(() => {
            res.send('Seu cadastro foi efetuado com sucesso!!')
          })

      });
    });

  }

)

router.post(
'/cliente/login',  
[
body('email').isEmail().withMessage('O e-mail precisa ver válido'),
body('email').custom((value) => {
  if (!value) {
    return Promise.reject('E-mail é obrigatório')
  }
  if (value == 'teste@teste.com') {
    return Promise.reject('E-mail já cadastrado')
  }
  return true
}),
body('password')
  .isLength({ min: 8 })
  .withMessage('Este campo precisa preenchido com pelo menos 8 caracteres')



],
(req, res) => {
const cliente = cliente.find((cliente) => cliente.email === req.body.email)
if (cliente == null) {
  return res.status(401).send('Não foi posssível prosseguir com o login!')
}


}
)

router.get('/listarCliente', (req, res) => {
cliente.findAll().then((clientes) => {
res.send(clientes)
})
})

router.get('/cliente/listarCliente/:id', (req, res) => {
let { id } = req.params

cliente.findByPk(id).then((clienteID) => {
res.send(clienteID)
})
})

router.put('/cliente/alterarCliente', (req, res) => {
let { id, name, cpf, phone, email, password } = req.body

cliente
.update({ name, cpf, phone, email, password, where: { id } })
.then(() => {
  res.send('TESTE')
})
})

router.delete('/excluirCliente', (req, res) => {
let { id } = req.body

cliente.destroy({ where: { id } }).then(() => {
res.send('TESTE')
})
})

// router.post('/cliente/login', resolver(middleware.autenticacao), resolver(clienteController.login))	// autenticação e login (gera token JWT) do Cliente
// 	router.delete('/cliente/logout', middleware.autorizacao, resolver(clienteController.logout))

module.exports = router
