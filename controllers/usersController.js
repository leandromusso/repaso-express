/* let usuarios = [
    {
        id: 1,
        nombre: 'Juan',
        edad: '23'
    },
    {
        id: 2,
        nombre: 'Pedro',
        edad: '25'
    },
    {
        id: 3,
        nombre: 'Maria',
        edad: '22'
    }
] */

const fs = require('fs');
const { validationResult } = require('express-validator');

usersController = {
    // Obtener usuarios
    getUsers: function (req, res, next) {

        let resultado = []

        let usuariosGuardados = fs.readFileSync('./usuarios.json', 'utf-8');
        let usuarios = [];

        if(usuariosGuardados != "" && usuariosGuardados != "[]"){
            usuarios = JSON.parse(usuariosGuardados);
        }

        if (req.query.search) {
            for (let i = 0; i < usuarios.length; i++) {
                if (usuarios[i].nombre.includes(req.query.search)) {
                    resultado.push(usuarios[i])
                }
            }
        } else {
            resultado = usuarios
        }

        res.render('index', { title: 'Usuarios', usuarios: resultado });
    },
    // Crear usuario
    createUser: function (req, res, next) {
        res.render('crear', { title: 'Crear usuario' });
    },
    saveUser: function (req, res, next) {

        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.render('crear', { title: 'Crear usuario', errores: errores.array() });
        }

        let usuariosGuardados = fs.readFileSync('./usuarios.json', 'utf-8');
        
        let usuarios = [];
        let proximoId = 0;

        if(usuariosGuardados != "" && usuariosGuardados != "[]"){
            usuarios = JSON.parse(usuariosGuardados);
            proximoId = usuarios[usuarios.length - 1].id + 1;
        }

        let usuario = {
            id: proximoId,
            nombre: req.body.nombre,
            edad: req.body.edad
        }

        if(req.file){
            usuario.avatar = req.file.filename
        }

        usuarios.push(usuario);

        fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios));

        res.redirect('/');
    },
    // Actualizar usuario
    updateUser: function (req, res, next) {

        let usuariosGuardados = fs.readFileSync('./usuarios.json', 'utf-8');
        let usuarios = [];

        if(usuariosGuardados != "" && usuariosGuardados != "[]"){
            usuarios = JSON.parse(usuariosGuardados);
        }

        res.render('actualizar', { title: 'Actualizar usuario', usuario: usuarios.find(usuario => usuario.id == req.params.id) });
    },
    saveUpdateUser: function (req, res, next) {
        console.log("Actualizar usuario " + req.body.id);

        let usuariosGuardados = fs.readFileSync('./usuarios.json', 'utf-8');

        let usuarios = [];

        if(usuariosGuardados != "" && usuariosGuardados != "[]"){
            usuarios = JSON.parse(usuariosGuardados);
        }

        let usuario = usuarios.find(usuario => usuario.id == req.body.id);

        usuario.nombre = req.body.nombre;
        usuario.edad = req.body.edad;

        fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios));

        res.redirect('/');
    },
    // Eliminar usuario
    deleteUser: function (req, res, next) {
        
        let usuariosGuardados = fs.readFileSync('./usuarios.json', 'utf-8');
        let usuarios = [];

        if(usuariosGuardados != "" && usuariosGuardados != "[]"){
            usuarios = JSON.parse(usuariosGuardados);
        }

        res.render('eliminar', { title: 'Eliminar usuario', usuario: usuarios.find(usuario => usuario.id == req.params.id) });
    },
    saveDeleteUser: function (req, res, next) {
        console.log("Eliminando usuario " + req.body.id);

        let usuariosGuardados = fs.readFileSync('./usuarios.json', 'utf-8');

        let usuarios = [];

        if(usuariosGuardados != ""){
            usuarios = JSON.parse(usuariosGuardados);
        }

        let usuario = usuarios.find(usuario => usuario.id == req.body.id);

        usuarios.splice(usuarios.indexOf(usuario), 1);

        fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios));

        res.redirect('/');
    }
}
module.exports = usersController;