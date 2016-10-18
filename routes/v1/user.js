module.exports = function(model){


var template = {

  getAll: function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // input
    var input = req.query;
      model.User.findAll({ where : { companyId : input.companyId } }).then(function(data){
        res.send(data);
      });
  },
  getOne: function(req, res) {
    // input
    var input = req.query;
      input.id = req.params.idUser;
      model.User.findById(input.id).then(function(data){
        res.send(data);
      });
  },
  create: function(req, res) {
    // input
    var input = req.body;
      
      model.User.create(input).then(function(data){
        res.send(data);
      });    
  },
  update: function(req, res) {
    // input
    var input = req.body;
    input.id = req.params.idUser;

      model.User.update(input, { where: { id: input.id } }).then(function(data){
        res.send(data);
      });
  },
  delete: function(req, res) {

    // input
    var input = req.body;
    input.id = req.params.idUser;

      model.User.destroy({ where: { id: input.id } }).then(function(data){
        res.send("deleted");
      });
  }
};
return template;
}