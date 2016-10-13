var db = require('../../config/mysql.js')();
var httpStatus = require('../../config/httpStatusCodes')();

var template = {
 
  getAll: function(req, res) {
    // input
    var input = req.query;
  },
  getOne: function(req, res) {
    // input
    var input = req.query;
    res.send(input);

  },
 
  create: function(req, res) {
    // input
    var input = req.body;

    // validaciones
    if(!input.companyName){
      input.companyName = "Nueva compañia";
    }
    // ir a insertar en la base de datos

    res.send(input);      
  },
 
  update: function(req, res) {
    // input
    var input = req.body;
    res.send(input);  
  },
 
  delete: function(req, res) {

    // input
    var input = req.body;
    res.send(input);

  }
};
 
module.exports = template;