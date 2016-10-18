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
		 router.get('/api/v1/api/v1/companies',company.getAll);

		 router.post('/api/v1/company',company.create);

		 router.get('/api/v1/company/:idCompany',company.getOne);

		 router.put('/api/v1/company/:idCompany',company.update);

		 router.delete('/api/v1/company/:idCompany',company.delete);


	    //product
	    router.get('/api/v1/products',product.getAll);

	    router.post('/api/v1/company/product',product.create);

	    router.get('/api/v1/company/product/:idProduct',product.getOne);

	    router.put('/api/v1/company/product/:idProduct',product.update);

	    router.delete('/api/v1/company/product/:idProduct',product.delete);


	    //user

	    router.get('/api/v1/user/',user.getAll);

	    router.post('/api/v1/company/user',user.create);

	    router.get('/api/v1/company/user/:idUser',user.getOne);

	    router.put('/api/v1/company/user/:idUser',user.update);

	    router.delete('/api/v1/company/user/:idUser',user.delete);


		 //quotation

		router.get('/api/v1/quotations',quotation.getAll);
		router.post('/api/v1/quotation',quotation.create);
		router.get('/api/v1/quotation/:idQuotation',quotation.getOne);
	    router.delete('/api/v1/quotation/:idQuotation',quotation.delete);
	// </@@@CatalogueRouter>

	return router;		
};