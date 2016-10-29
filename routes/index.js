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

	    //salesman

	    router.get('/api/v1/salesman', function(req, res){ user.getAll(1, req, res); });

	    router.post('/api/v1/company/:id/salesman', function(req, res){ user.create(1, req, res); });

	    router.get('/api/v1/company/:id/salesman/:id',user.getOne);

	    router.put('/api/v1/company/:id/salesman/:id',user.update);

	    router.delete('/api/v1/company/:id/salesman/:id',user.delete);

	    //admin

	    router.get('/api/v1/admin', function(req, res){ user.getAll(0, req, res); });

	    router.post('/api/v1/company/:id/admin', function(req, res){ user.create(0, req, res); });

	    router.get('/api/v1/company/:id/admin/:id',user.getOne);

	    router.put('/api/v1/company/:id/admin/:id',user.update);

	    router.delete('/api/v1/company/:id/admin/:id',user.delete);

	    //Privileges

	    router.put('/api/v1/company/:id/admin/:id/privileges', function(req, res){ var input = { body : { type : 0 }, params : req.params }; user.update(input, res, true); });
	    router.delete('/api/v1/company/:id/admin/:id/privileges', function(req, res){ var input = { body : { type : 1 }, params : req.params }; user.update(input, res, true); });


		//quotations
		router.get('/api/v1/company/:id/salesman/:id/quotations',quotation.getAll);
		router.post('/api/v1/company/:id/salesman/:id/quotations',quotation.create);
		router.get('/api/v1/company/:id/salesman/:id/quotations',quotation.getOne);
	    router.delete('/api/v1/company/:id/salesman/:id/quotations',quotation.delete);
	// </@@@CatalogueRouter>
	return router;		
};