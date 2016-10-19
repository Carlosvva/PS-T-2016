module.exports = function(model){


var template = {

  getAll: function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    // input
    var input = req.query;

      model.Company.findAll().then(function(data){
        res.send(data);
      });
  },
  getOne: function(req, res) {
    // input
    var input = req.query;
      input.id = req.params.id;
      model.Company.findById(input.id).then(function(data){
        res.send(data);
      });

  },

  create: function(req, res) {
    // input
    var input = req.body;
      
      model.Company.create(input).then(function(data){
        res.send(data);
      });
    
    
  },

  update: function(req, res) {
    // input
    console.log('update');
    var input = req.body;
    input.id = req.params.id;

      model.Company.update(input, { where: { id: input.id } }).then(function(data){
        res.send(data);
      });
  },

  delete: function(req, res) {

    // input
    var input = req.body;
    input.id = req.params.id;

      model.Company.destroy({ where: { id: input.id } }).then(function(data){
        res.send("deleted");
      });

  }
};

return template;
}