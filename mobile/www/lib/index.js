ons.platform.select('android');

var app = ons.bootstrap();


var host = "http://localhost:4000/api/v1"
app.factory("API", function($http){
    return {
        login : function(){},
        user : {
            getAll : function(){
                
                return $http.get(host + "/user?companyId=1");
                
            },
            create : function(){

            },
            update : function(){

            },
            delete : function(){

            },
        }
    }
});


app.controller('AppController', function ($scope, API) {

        this.title = 'Sales';

        this.loginMenu = false;

        var options = {
            animation: 'fade-md'
        };

        this.login = function () {
            this.loginMenu = true;
            appNavigator
                .resetToPage("modules/products/template.html", {animation:'fade-md'})
                .then(function () {
                
                });
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
            API.user.getAll().then(function(data){ console.log(data) }, function(err){ console.log(err) });
        }

        /*this.goToAdd = function (page) {
            this.loginMenu = true;
            menu.close();
            appNavigator
                .pushPage("modules/products/"+page+"/template.html", options)
                .then(function () {
                    
                });
        };*/
        $scope.show = function(){
            ons.createDialog('modules/products/quotation/template.html').then(function(dialog) {
      dialog.show();
    });
        }


    });

ons.ready(function () {
    console.log("Onsen UI is ready!");
});