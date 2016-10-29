var db = require('../config/mysql.js')();
var httpStatus = require('../config/httpStatusCodes')();
var jwt = require('jwt-simple');
var encode = require('md5');
 
var auth = {
 
  login: function(req, res) {

    console.log(req.body);
 
    var email = req.body.email || '';
    var password = req.body.password || '';
    
    if (email == '' || password == '') {
      res.status(httpStatus._401.status);
      res.json({
        "status": httpStatus._401.status,
        "message": httpStatus._401.message
      });
      return;
    }
 
    // Fire a query to DB and check if the credentials are valid
    auth.validate(email, password, res); 
  },

  validate: function(email, password, res) {
    var query = ("select * from users where email = ? and password = ?;");
    var params = [email, password];
    console.log(email)
    console.log(password)
    console.log("select * from users where email = "+email+" and password = "+password+";")

    db.execute(query, params, function(data){
      console.log(data)

      if(data.length != 1){
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }else{
        // If authentication is success, we will generate a token
        // and dispatch it to the client
        var dbUserObj = {
          id : data[0].id,
          email : data[0].email,
          company : data[0].companyId,
          type : data[0].type
        }

        res.json(genToken(dbUserObj));
        return;
      }

    });

  },
 
  validateUser: function(email, callback) {
    var query = ("SELECT * FROM users WHERE email = ?");
    var params = [email];

    db.execute(query, params, function(data){
      callback(data[0]);
    });
  },

  
}
 
// private method
function genToken(user) {

  var expires = expiresIn(1); // days

  var token = jwt.encode({
    exp: expires,
    user : user.id,
    username : user.email,
    company : user.company,
    type : user.type
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: user
  };

}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;