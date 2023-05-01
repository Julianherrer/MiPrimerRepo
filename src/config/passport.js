const passport = require('passport');
//usa la estrategia de autenticacion local, tambien podria ser a traves de instagram, gmail, etc
const LocalStrategy = require('passport-local').Strategy;

//base de datos User
const User= require('../models/User');

//autenticacion local localstrategy
passport.use(new LocalStrategy({
    //a traves de que se va a usar el usuraio
    usernameField: 'email'
}, 
//se reciben los siguientes datos de la base, para autenticar el email
async (email, password, done) =>{
    //busco el correo en la base de datos
    const user = await User.findOne({email: email});
    //si es incorrecto retorna el callback done que termina el ciclo  nule para usuario ya que no existe
    if (!user){
        return done(null, false, {message: 'Not User Found'});
    } 
    //si el correo existe, valida el password con march password
    else {
        const match = await user.matchPassword(password);
        //despues de validar la contraseña, retorna con el callback done. null de errores, y el usario validado
        if (match){
            return done(null, user);
        }
        //la contraseña es incorrect
        else{
            return done(null, false, {message :'Incorrect Password'});
        }
    
    }
}));

//metodo para que el usuario no se atentique cada vez que se actualiza la pag  , lo almacenamos en sesión
passport.serializeUser((user , done) =>{
    done(null,user.id);
});


passport.deserializeUser((id, done)=> {
    //en la busqueda puedo tener un error, o puedo tener un usuario, si lo encuentro devuelvvo el callback
    User.findById(id, (err,user)=>{
        done(err,user);
    });
});


