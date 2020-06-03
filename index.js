const express = require('express');
const app = express(); // devuelve un objeto y se almacena en la constante
const httpResponseCodes = require('./utils/types_errors');
const clasesError = require('./utils/clases_error');
const { HttpErrores,
    HttpNotFound,
    HttpInternalServerError,
    HttpBadRequest,
    HttpUnauthorized,
    HttpForbidden
} = clasesError;

const implError = require('./utils/implements.errors')
const { createResponder } = implError;

// Asignar Configuraciones/Settings  con app.set('nombre',valor)
app.set('appName', 'Aplicaciones de Express REST');
app.set('port', 3000);
app.set('view engine', 'ejs'); // no es necesario requerirlo con require() ya esta integrado a express

// Estructura de middleware
// creando middleware los cuales se ejecutan antes de una ruta (funciona para todas las ruta)
function logger(req, resp, next) {
    console.log('Peticion recibida');

    console.log(`peticion recibida de: ${req.protocol}://${req.get('host')}${req.originalUrl}`);


    next();
}

// con el metodo express.json() Le indicamos al objeto express que ya puede permitir el formato json
// y se lo asignamos a la variable 'app' con el metodo '.use()' app.use();
app.use(express.json());

//para agregar middleware es app.use(VariableFuncion|funciondeFlecha);
app.use(logger);
// metodo all('/ruta',(req,resp,next)=>{}) se usa para hacer algo antes de que pase por alguna ruta
//con el objeto next() indicamos que se dirija a la ruta siguiente
// app.all('/user', (req, resp, next) => {
//     console.log('Paso por aqui');

//     next();
// });


// middlewar para captura de errores
function attachResponder(req, res, next) {
    // console.log('Ejecutando primera middle ware y el objeto res.respond: ');
    // console.log(createResponder(req,res,next));
    res.respond = createResponder(req, res, next);
    // console.log(res.respond);
    next();
}

function errorHandler(error, req, res, next) {
    console.log('Ejecutando ultima middleware errorHandler y el objeto error: ', error);

    if (error instanceof HttpErrores) {
        res.status(error.statusCode).json(error.data);
    }
    else {
        res.status(httpResponseCodes.INTERNAL_SERVER_ERROR);
    }
}


app.use(attachResponder);
// para crear una ruta utilizando el verbo get usamos app.get('/ruta',(peticion,respues)=>{})
app.get('/user', (req, resp) => {

    try {
        usuario = {
            nombre: 'Sergio',
            Apellido: 'Caballero'
        }
        // resp.send('PETICION GET RECIBIDA'); // metodo send('Mensaje') par aenviar la respuesta al navegador 

         throw new HttpNotFound('Prueba con HttpNotFound', { prueba: 1, tipo: httpResponseCodes.NO_ENCONTRADO }); 
        resp.json(usuario);
    } catch (err) {

        console.log('captura del error', resp.respond.notFound(err, { reason: 'User ID not found' }));
    }
});



app.post('/user', (req, resp) => {
    // metodo para obtener datos  del body con 'req.body'
    console.log(req.body);
    resp.send('PETICION POST RECIBIDA');
});

// Rutas con parametros
app.post('/user/:id', (req, resp) => {
    console.log(req.body);
    //metodo para obtener los parametros de una ruta 'req.params'
    console.log(req.params);
    resp.send('PETICION POST RECIBIDA');
});

app.put('/user/:userId', (req, resp) => {
    console.log(req.body);

    resp.send(` El usuario con ID ${req.params.userId} fue actualizado`);
});

app.delete('/user/:usuarioId', (req, resp) => {
    resp.send(`<h1>El usuario con id ${req.params.usuarioId} a sido borrado</h1>`);
});

// middleware paa enviar archivos al  FE
app.use(express.static('public'));

app.use(errorHandler);

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Servidor iniciado ', app.get('port'));

});