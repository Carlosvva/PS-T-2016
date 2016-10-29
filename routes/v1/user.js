module.exports = function(model){


var template = {

  getAll: function(type, req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // input
    var input = req.query;
      model.User.findAll({ where : { companyId : req.session.company, type : type } }).then(function(data){
        res.send(data);
      });
  },
  getOne: function(req, res) {
    // input
    var input = req.query;
      input.id = req.params.id;
      model.User.findById(input.id).then(function(data){
        res.send(data);
      });
  },
  create: function(type, req, res) {
    // input
    var input = req.body;
    input.type = type;
    input.companyId = req.params.id;
      
      model.User.create(input).then(function(data){
        res.send(data);
      });    
  },
  update: function(req, res, privileges) {
    // input
    var input = req.body;
    if(!privileges){
      delete input.type;
    }
    input.id = req.params.id;

      model.User.update(input, { where: { id: input.id } }).then(function(data){
        res.send(data);
      });
  },
  delete: function(req, res) {

    // input
    var input = req.body;
    input.id = req.params.id;

      model.User.destroy({ where: { id: input.id } }).then(function(data){
        res.send("deleted");
      });
  }
};
return template;
}