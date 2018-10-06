'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Route = require('../models/route');
var Rate = require('../models/rate');
var User = require('../models/user');
var Template = require('../models/template');

function getRoute(req, res)
{
  var routeId = req.params.id;

  Route.findById(routeId).populate({
    path: 'driverCar',
    populate: {
        path: 'driverCar',
        model: 'DriverCar'
    },
    populate: {
        path: 'car',
        model: 'Car'
    },
  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'user',
        model: 'User'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'eps',
        model: 'Eps'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'arl',
        model: 'Arl'
      }
    },

  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'origen',
      model: 'Location'
    }
  }).populate({
    path: 'rate',
    populate: {
      path: 'origen',
      model: 'Location',
      path: 'origen',
      populate:{
        path: 'id_city',
        model: 'City'
      }
    },

  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'destino',
      model: 'Location'
    }
  }).populate({
    path: 'rate',
    populate: {
      path: 'destino',
      model: 'Location',
      path: 'destino',
      populate:{
        path: 'id_city',
        model: 'City'
      }
    },

  }).populate({
    path: 'template',
    populate: {
      path: 'template',
      model: 'Template'
    },
  }).populate({
    path: 'template',
    populate: {
      path: 'cost_center',
      model: 'CostCenter'
    },
  }).exec((err, route) => {
    if (err) {
      res.status(500).send({
        message: 'Error en ela petición'
      });
    } else {
      if (!route) {
        res.status(404).send({
          message: 'La ruta no existe'
        });
      } else {
        res.status(200).send({
          route
        });
      }
    }
  });
}

function getListRoutes(req, res)
{
  var find = Route.find({}).sort('Route');

  find.populate({
    path: 'driverCar',
    populate: {
        path: 'driverCar',
        model: 'DriverCar'
    },
    populate: {
        path: 'car',
        model: 'Car'
    },
  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'user',
        model: 'User'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'eps',
        model: 'Eps'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'arl',
        model: 'Arl'
      }
    },

  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'origen',
      model: 'Location'
    }
  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'destino',
      model: 'Location'
    }
  }).populate({
    path: 'template',
    populate: {
      path: 'template',
      model: 'Template'
    },
  }).exec((err, routes) => {
    if (err) {
      res.status(500).send({
        message: 'Error en la petición'
      });
    } else {
      if (!routes) {
        res.status(404).send({
          message: 'No hay rutas !!'
        });
      } else {
        res.status(200).send({
          routes: routes
        });
      }
    }
  });



}

function getListRoutesTrue(req, res)
{
  var find = Route.find({}).sort('Route').where('status').equals(true);

  find.populate({
    path: 'driverCar',
    populate: {
        path: 'driverCar',
        model: 'DriverCar'
    },
    populate: {
        path: 'car',
        model: 'Car'
    },
  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'user',
        model: 'User'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'eps',
        model: 'Eps'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'arl',
        model: 'Arl'
      }
    },

  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'origen',
      model: 'Location'
    }
  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'destino',
      model: 'Location'
    }
  }).populate({
    path: 'template',
    populate: {
      path: 'template',
      model: 'Template'
    },
  }).exec((err, routes) => {
    if (err) {
      res.status(500).send({
        message: 'Error en la petición'
      });
    } else {
      if (!routes) {
        res.status(404).send({
          message: 'No hay rutas !!'
        });
      } else {
        res.status(200).send({
          routes: routes
        });
      }
    }
  });



}

function getListRoutesFalse(req, res)
{
  var find = Route.find({}).sort('Route').where('status').equals(false);

  find.populate({
    path: 'driverCar',
    populate: {
        path: 'driverCar',
        model: 'DriverCar'
    },
    populate: {
        path: 'car',
        model: 'Car'
    },
  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'user',
        model: 'User'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'eps',
        model: 'Eps'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'arl',
        model: 'Arl'
      }
    },

  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'origen',
      model: 'Location'
    }
  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'destino',
      model: 'Location'
    }
  }).populate({
    path: 'template',
    populate: {
      path: 'template',
      model: 'Template'
    },
  }).exec((err, routes) => {
    if (err) {
      res.status(500).send({
        message: 'Error en la petición'
      });
    } else {
      if (!routes) {
        res.status(404).send({
          message: 'No hay rutas !!'
        });
      } else {
        res.status(200).send({
          routes: routes
        });
      }
    }
  });



}

function saveRoute(req, res)
{
  var route = new Route();

  var params = req.body;
  route.name = params.name;
  route.driverCar = params.driverCar;
  route.rate = params.rate;
  route.template = params.template;
  route.locationAdd = params.locationAdd;
  route.price = params.price;
  route.date = params.date;
  route.confirmation_upload = params.confirmation_upload;
  route.km = params.confirmation_upload;
  route.status = params.status;

  route.save((err, routeStored) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!routeStored) {
        res.status(404).send({message: 'No se pudo guardar la ruta'});
      }else {
        res.status(200).send({route: routeStored});
      }
    }
  });
}

function updateRoute(req, res)
{
  var routeId = req.params.id;
  var update = req.body;

  Route.findByIdAndUpdate(routeId, update, (err, routeUpdate) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!routeUpdate) {
        res.status(404).send({message: 'No se puedo actualizar la ruta'});
      }else {
        res.status(200).send({route: routeUpdate});
      }
    }
  });
}

function deleteRoute(req, res)
{
  var routeId = req.params.id;

  Route.findByIdAndRemove(routeId, (err, routeRemoved) => {
    if (err) {
      res.status(500).send({message: 'Error en la petición'});
    }else {
      if (!routeRemoved) {
        res.status(404).send({message: 'No se pudo eliminar la ruta'});
      }else {
        res.status(200).send({route: routeRemoved});
      }
    }
  });
}

function exportExcel(req, res)
{
  var fs = require('fs');
  var csv = require('fast-csv');
  var ws = fs.createWriteStream('ruta.cvs');

  cvs.write([],{headers:true}).pipe(ws);
}

function billWeekRoute(req, res)
{
  var params = req.body;
  var date_start = params.date_start;
  var date_end = params.date_end;

  var find = Route.find({"date": {"$gte": new Date(date_start), "$lt": new Date(date_end)}}).sort('Route').where('status').equals(false);

  find.populate({
    path: 'driverCar',
    populate: {
        path: 'driverCar',
        model: 'DriverCar'
    },
    populate: {
        path: 'car',
        model: 'Car'
    },
  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'user',
        model: 'User'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'eps',
        model: 'Eps'
      }
    },

  }).populate({
    path: 'driverCar',
    populate: {
      path: 'driver',
      model: 'Driver',
      path: 'driver',
      populate:{
        path: 'arl',
        model: 'Arl'
      }
    },

  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'origen',
      model: 'Location'
    }
  }).populate({
    path: 'rate',
    populate: {
      path: 'origen',
      model: 'Location',
      path: 'origen',
      populate:{
        path: 'id_city',
        model: 'City'
      }
    },

  }).populate({
    path: 'rate',
    populate: {
      path: 'rate',
      model: 'Rate'
    },
    path: 'rate',
    populate:{
      path: 'destino',
      model: 'Location'
    }
  }).populate({
    path: 'rate',
    populate: {
      path: 'destino',
      model: 'Location',
      path: 'destino',
      populate:{
        path: 'id_city',
        model: 'City'
      }
    },

  }).populate({
    path: 'template',
    populate: {
      path: 'template',
      model: 'Template'
    },
  }).populate({
    path: 'template',
    populate: {
      path: 'cost_center',
      model: 'CostCenter'
    },
  }).exec((err, routes) => {
    if (err) {
      res.status(500).send({
        message: 'Error en la petición'
      });
    } else {
      if (!routes) {
        res.status(404).send({
          message: 'No hay rutas !!'
        });
      } else {
        res.status(200).send({
          routes: routes
        });
      }
    }
  });
}


module.exports = {
  getRoute,
  getListRoutes,
  saveRoute,
  updateRoute,
  deleteRoute,
  exportExcel,
  getListRoutesTrue,
  getListRoutesFalse,
  billWeekRoute
}
