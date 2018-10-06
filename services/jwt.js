
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_argos_celuvans';

exports.createToken = function(user){
    var payload = {
      sub: user._id,
      name: user.name,
      surname: user.surname,
      dni: user.dni,
      email: user.email,
      phone: user.phone,
      image: user.image,
      rol: user.rol,
      iat: moment().unix(),
      exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
};
