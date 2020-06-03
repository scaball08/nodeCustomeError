const clasesError =  require('./clases_error');
const  { 
    HttpErrores,
    HttpNotFound,
    HttpInternalServerError,
    HttpBadRequest,
    HttpUnauthorized,
    HttpForbidden
} = clasesError;

 function createResponder(req,res,next){
    
    const responder = {
        _forwardError(error,  Errores = Error,data){
            console.log('Ejecutando middleware createResponder del error:', error);

            const errorMessage = error instanceof Errores ? error.message : 'No es una clase de Error'  ;
            //const errorMessage = 'No es una clase de Error'  ;
            const errorToForward = new Errores(errorMessage,data);
            // envia error al middleware de captura de errores
            console.log('mostrar obj error antes de enviarlo al ultimo middleware');
            console.log(errorToForward);
            next(errorToForward);
        },

        badRequest(error,data){
            return responder._forwardError(error, HttpBadRequest,data);
        },
        notFound(error,data){
            return responder._forwardError(error,HttpNotFound,data);
        },
        internalServerError(error,data){
            return responder._forwardError(error, HttpInternalServerError,data);
        },
        unauthorized(error,data){
            return responder._forwardError(error, HttpUnauthorized,data);
        },
        forbidden(error,data){
            return responder._forwardError(error, HttpForbidden,data);
        }

    };

    return responder;
    
} 


module.exports = {createResponder}
