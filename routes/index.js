module.exports = function(model){
	var express = require('express');
	var router = express.Router();

	var db = require('../config/mysql.js')();

	var auth = require('./auth.js');

	// <@@@CatalogueLoader>
	var company= require('./v1/company')(model);
	var product= require('./v1/product')(model);
	var user= require('./v1/user')(model);
	var quotation= require('./v1/quotation')(model);

	// </@@@CatalogueLoader>

	/*
	 * Routes that can be accessed by anyone
	 */

		router.post('/login', auth.login);

		 //company
		 router.get('/companies',company.getAll);

		 router.post('/company',company.create);

		 router.get('/company/:idCompany',company.getOne);

		 router.put('/company/:idCompany',company.update);

		 router.delete('/company/:idCompany',company.delete);


	    //product
	    router.get('/products',product.getAll);

	    router.post('/company/product',product.create);

	    router.get('/company/product/:idProduct',product.getOne);

	    router.put('/company/product/:idProduct',product.update);

	    router.delete('/company/product/:idProduct',product.delete);


	    //user

	    router.get('/user/',user.getAll);

	    router.post('/company/user',user.create);

	    router.get('/company/user/:idUser',user.getOne);

	    router.put('/company/user/:idUser',user.update);

	    router.delete('/company/user/:idUser',user.delete);


		 //quotation

		router.post('/company/user/:idUser/quotes',quotation.getAll);
		router.post('/company/user/:idUser/quotation',quotation.create);
		router.get('/company/user/:idUser/quotation/:idQuotation',quotation.getOne);
	    router.delete('/company/user/:idUser/quotation/:idQuotation',quotation.delete);
	// </@@@CatalogueRouter>

	return router;		
};