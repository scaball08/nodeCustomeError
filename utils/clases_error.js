'use strict'
const responseCodes = require('./types_errors')


class HttpErrores extends Error {

    constructor({message,name,statusCode,data}){
        super(message);

        this.name =  name;
        this.statusCode = statusCode;
        this.data = data;
        
        // la propieda stack contiene la pila de llamada de mi objeto
        // mientras que con el metodo(captureStackTrace.(this,contextoActual))
        // omite la llamada de la funcion actual
        // asi solo obtenemos  el origen real del error
        Error.captureStackTrace(this,HttpErrores);
    }


}

class HttpBadRequest extends HttpErrores{
    constructor(message = ' Error en la  Peticion SC', data){

        super({
            message,
            name:'HttpBadRequest',
            statusCode:responseCodes.BAD_REQUEST,
            data
        });

    }
}

class HttpNotFound extends HttpErrores {

    constructor(message='No encontrado SC',data){
        super({
            message,
            name:'HttpNotFound',
            statusCode:responseCodes.NO_ENCONTRADO,
            data
        });
    }
}

class HttpInternalServerError extends HttpErrores {

    constructor(message='Internal Server Error SC',data){
        super({
            message,
            name:'HttpInternalServerError',
            statusCode:responseCodes.INTERNAL_SERVER_ERROR,
            data
        });
    }
}

class HttpUnauthorized extends HttpErrores {

    constructor(message='Error usuario no autorizado SC',data){
        super({
            message,
            name:'HttpUnauthorized',
            statusCode:responseCodes.NO_AHUTORIZADO,
            data
        });
    }
}

class HttpForbidden extends HttpErrores {

    constructor(message='Acceso Prohibido SC',data){
        super({
            message,
            name:'HttpForbidden',
            statusCode:responseCodes.PROHIBIDO,
            data
        });
    }
}

module.exports = {
    HttpErrores,
    HttpNotFound,
    HttpInternalServerError,
    HttpBadRequest,
    HttpUnauthorized,
    HttpForbidden
};