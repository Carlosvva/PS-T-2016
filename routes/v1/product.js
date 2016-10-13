module.exports = function(model){


var template = {

  getAll: function(req, res) {
    // input
    var input = req.query;
      model.Product.findAll({ where : { companyId : input.companyId } }).then(function(data){
        res.send(data);
      });
  },
  getOne: function(req, res) {
    // input
    var input = req.query;
      input.id = req.params.idProduct;
      model.Product.findById(input.id).then(function(data){
        res.send(data);
      });

  },

  create: function(req, res) {
    // input
    var input = req.body;
      
      model.Product.create(input).then(function(data){
        res.send(data);
      });
    
    
  },

  update: function(req, res) {
    // input
    console.log('update');
    var input = req.body;
    input.id = req.params.idProduct;

      model.Product.update(input, { where: { id: input.id } }).then(function(data){
        res.send(data);
      });
  },

  delete: function(req, res) {

    // input
    var input = req.body;
    input.id = req.params.idProduct;

      model.Product.destroy({ where: { id: input.id } }).then(function(data){
        res.send("deleted");
      });

  }
};

return template;
}