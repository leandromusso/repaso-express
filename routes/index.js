var express = require('express');
var router = express.Router();

const path = require('path');
const multer = require('multer');
//Incluyo el controlador
var usersController = require('../controllers/usersController');
const validateForm = require('../middlewares/validateForm');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join( __dirname, '../public/images/users'));
  },
  filename: (req, file, cb) => {
      const fileName = 'usuario-' + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
});

/* Obtengo los usuarios */
router.get('/', usersController.getUsers); 
/* Creo un usuario nuevo */
router.get('/crear', usersController.createUser);
router.post('/crear', upload.single('avatar'), validateForm, usersController.saveUser);
/* Actualizo un usuario */
router.get('/actualizar/:id', usersController.updateUser);
router.put('/actualizar', usersController.saveUpdateUser);
/* Elimino un usuario */
router.get('/eliminar/:id', usersController.deleteUser);
router.delete('/eliminar', usersController.saveDeleteUser);

module.exports = router;
