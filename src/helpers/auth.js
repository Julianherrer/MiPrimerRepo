const helpers = {};

helpers.isAuthenticated = (req,res,next)=>{
   //funcion que viene desde passport que valida si hay una sesion abierta
    if(req.isAuthenticated()){
        return next();
    }

    req.flash('error_msg', 'Not authorized');
    res.redirect('/users/signin');
};

module.exports = helpers;