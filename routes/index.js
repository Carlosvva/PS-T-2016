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
		 
		 router.get('/api/v1/companies',company.getAll);

		 router.post('/api/v1/company',company.create);

		 router.get('/api/v1/company/:id',company.getOne);

		 router.put('/api/v1/company/:id',company.update);

		 router.delete('/api/v1/company/:id',company.delete);

	    //product

	    router.get('/api/v1/products',product.getAll);

	    router.post('/api/v1/company/:id/product',product.create);

	    router.get('/api/v1/company/:id/product/:id',product.getOne);

	    router.put('/api/v1/company/:id/product/:id',product.update);

	    router.delete('/api/v1/company/:id/product/:id',product.delete);

	    //user

	    router.get('/api/v1/company/:id/user/',user.getFromCompany);

	    router.post('/api/v1/company/:id/user',user.create);

	    router.get('/api/v1/company/:id/user/:id',user.getOne);

	    router.put('/api/v1/company/:id/user/:id',user.update);

	    router.delete('/api/v1/company/:id/user/:id',user.delete);

		 //quotation

		router.get('/api/v1/company/:id/user/:id/quotations',quotation.getAll);
		router.get('/api/v1/company/:id/company/:id/quotations',quotation.getAll);
		router.post('/api/v1/company/:id/quotation',quotation.create);
		router.get('/api/v1/company/:id/quotation/:id',quotation.getOne);
	    router.delete('/api/v1/company/:id/quotation/:id',quotation.delete);
	// </@@@CatalogueRouter>
	return router;		
};