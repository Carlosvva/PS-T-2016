module.exports = function(Sequelize){
	$username = "erickruano";
	$password = "3r1ckRuano.";
	$db = "michaelrussdmd";
	// Connection to database
	var sequelize = new Sequelize('pentcloudsales', 'pentcloud', 'p3ntcl0ud@', {
	  host: '23.229.244.195',
	  dialect: 'mysql',
	  pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	  },
	});

	// Models definition
	var model = {};

	// http://docs.sequelizejs.com/en/latest/docs/models-definition/#definition
	// http://docs.sequelizejs.com/en/latest/docs/models-definition/#data-types
	// http://docs.sequelizejs.com/en/latest/docs/associations/

	model.Product = sequelize.define('product', {
		name: Sequelize.STRING,
		description: Sequelize.STRING,
		price: Sequelize.STRING
	});
    // relacionado a company

	model.User = sequelize.define('user', {
		name: Sequelize.STRING,
		lastName: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING,
		type: Sequelize.INTEGER
	});

	model.Company = sequelize.define('company', {
		companyName: Sequelize.STRING,
		address: Sequelize.STRING,
		tel: Sequelize.STRING
	});

	model.Quotation = sequelize.define('quotation', {
		name: Sequelize.STRING,
		email: Sequelize.STRING,
		description: Sequelize.STRING
	});

    // relacionado a Company
    model.User.belongsTo(model.Company);
    model.Product.belongsTo(model.Company);
    //relacionado a User
    model.Quotation.belongsTo(model.User);
	// Sync 
	sequelize
	  .sync({ force: false })
	  .then(function(err) {
	    console.log('It worked!');
	  }, function (err) { 
	    console.log('An error occurred while creating the table:', err);
	  });

	return model;
}