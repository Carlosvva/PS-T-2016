ons.platform.select('android');

var app = ons.bootstrap();


var host = "http://192.168.1.222:4000/api/v1"
var loginHost = "http://localhost:4000/"

app.factory("API", function($http){
    return {
        login : function(input, callback){
            $http.post(loginHost+'login', input).then(function(data){
                console.log(data);
                    localStorage.token = data.data.token;
                    localStorage.user = data.data.user;
                    callback(true);
            }, function(err){
                callback(false);
            })
        },
        user : {
            getAll : function(){

            return $http.get(host + "/user?companyId=1");

            },
            create : function(){

            },
            update : function(){

            },
            delete : function(){

            }
        },
        company : {
            getAll : function(){

            return $http.get(host + "/companies");

            },
            create : function(){

            },
            update : function(){

            },
            delete : function(){

            }
        },
        product : {
            getAll : function(){

            return $http.get(host + "/products");

            },
            create : function(){

            },
            update : function(){

            },
            delete : function(){

            }
        },
        quotation : {
            getAll : function(){

            return $http.get(host + "/quotations");

            },
            create : function(){

            },
            update : function(){

            },
            delete : function(){

            }
        }
    };
});


app.controller('AppController', function ($scope, API) {

        this.title = 'Sales';

        this.loginMenu = false;

        var options = {
            animation: 'fade-md'
        };

        this.logout = function () {
            this.loginMenu = false;
            menu.close();
            appNavigator
                .resetToPage("modules/login/template.html", {animation:'fade-md'})
                .then(function () {
                    
                });
        };
        /*this.show = function() {
            if ($scope.dialogs) {
                ons.createDialog().then(function(dialog) {
                $scope.dialogs[] = dialog;
                dialog.show();
            });
            } else {
                $scope.dialogs[].show();
            }
        };*/

        //Usar esta función para ir a una página ==> usar app.goToPage('productos');
        this.goToPage = function (page) {
            this.loginMenu = true;
            menu.close();
            appNavigator
                .pushPage("modules/"+page+"/template.html", options)
                .then(function () {
                    
                });
        };

        this.menu = [
            {
                title: 'Productos',
                location: 'products'
            },
            {
                title: 'Vendedores',
                location: 'vendedores'
            },
            {
                title: 'Empresa',
                location: 'company'
            },
            {
                title: 'Contactanos',
                location: 'contact'
            },
            {
                title: 'Soporte',
                location: 'support'
            }
            
        ];

        $scope.getUsers = function(){
            API.user.getAll().then(function(data){
                console.log(data)
            },function(err){
                console.log(err)
            });
        }
        $scope.getCompanies = function(){
            API.company.getAll().then(function(data){
                $scope.companies = data.data;
            }, function(err){
                console.log(err)
            });
        }
        $scope.getQuotes = function(){
            API.quotation.getAll().then(function(data){
                console.log(data)
            },function(err){
                console.log(err)
            });
        }
        $scope.show = function(){
            ons.createDialog('modules/products/quotation/template.html').then(function(dialog) {
              dialog.show();
            });
        }
    });
app.controller('loginController', function($timeout, $scope, API){
// Al iniciar controller de login

$timeout(function(){
        if(localStorage.token){
            appNavigator
                        .resetToPage("modules/products/template.html", {animation:'fade-md'})
                        .then(function () {
                        
                        });
        }
},100)

$scope.user = {}
$scope.login = function () {

        // Validar datos
        var validateLogin = function(){
            var ok = true;
            // ningun campo puede estar vacio
            if(!$scope.user.email || !$scope.user.password){
                ok = false;
            }


            return ok;
        }
        // si cumplen enviar login
        if(validateLogin()){


            API.login({
                email : $scope.user.email,
                password : $scope.user.password
            }, function(login){
                if(login){
                    this.loginMenu = true;
                    appNavigator
                        .resetToPage("modules/products/template.html", {animation:'fade-md'})
                        .then(function () {
                        
                        });
                }else{
                    alert("Login incorrecto")
                }
            })
        }else{
            alert('datos invalidos')
        }
        };
})
app.controller('productsController', function($timeout, $scope, API){

    API.product.getAll().then(function(data){
        $scope.products = data.data;
    })

})




ons.ready(function () {
    console.log("Onsen UI is ready!");

});


app.config(['$httpProvider', function($httpProvider) {    
    $httpProvider.defaults.useXDomain = true;
     $httpProvider.interceptors.push('tokenInterceptor');
}])

app.factory('tokenInterceptor', function($q, $window, $timeout) {
  return {
    request: function(config) {
      
        
        if (localStorage.token) {
          config.headers['X-Access-Token'] = localStorage.token;

          /*
          config.headers['X-Key'] = localStorage.get('session').user.username;
          config.headers['X-Client-Time'] = new Date().getTime() / 1000;
          config.headers['Content-Type'] = "application/json";
          */
        }

        return config || $q.when(config);

    },
 
    response: function(response) {

      
      if( ( response.status == 404 )){
          location.href = '/#/main/404';
      }

      return response || $q.when(response);
    }
  };
});