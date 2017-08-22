const app=angular.module('myapp',['ngRoute']);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when("/allproducts", {
        templateUrl: "views/allproducts.html",
        controller: "allProductsController"
    }).when('/login', {
        templateUrl: "views/login.html",
        controller: "loginController"
    }).when('/register', {
        templateUrl: "views/registration.html",
        controller: "registrationController"
    }).when('/addproduct', {
        templateUrl: "views/addproduct.html",
        controller: "addProductController"
    }).when('/allips', {
        templateUrl: "views/allip.html",
        controller: "ipController"
    }).when('/logout', {
        templateUrl: 'index.html',
        controller: "logout"
    });

   $locationProvider.html5Mode(true);
})

//See all products
app.controller('allProductsController', function($http, $scope, $rootScope, $location) {
    $scope.refresh = function() {
        $http({
            url: '/a/products'
        }).then(function(response) {
        	console.log(response);
        	$scope.products=response.data.data;
            console.log(response.data);
        }, function(response) {
        	console.log(response)
        });
    }
    $scope.refresh();
});




//Login controller
app.controller('loginController', function($http, $scope, $rootScope, $location){
    $scope.login=function(){
        $http({
            url: "login",
            method: "POST",
            data: $scope.user
            
        }).then(function(response){
            console.log(response);
                window.localStorage.setItem('token', response.data.token);
                $location.path('/addproduct')
            
        },function(response){
            console.log(response)
            alert('email or password incorrect')
        });
        
    }

    

});



//Registration for new user

app.controller('registrationController', function($http, $scope, $rootScope, $location){
    $scope.register=function(){
        $http({
            url: "/registration",
            method: "POST",
            data: $scope.user,
            
        }).then(function(response){
            console.log(response.data);
        },function(response){
            console.log(response.data)
        });
        $location.path('/login')
    }

    
});



//AddProducts Controller,    CRUD operations on products

app.controller('addProductController', function($http, $scope, $rootScope, $location){
     $scope.refresh = function() {
        $http({
            url: '/api/product',
            headers: {
                'content-type': "application/x-www-form-urlencoded",
                'x-access-token': window.localStorage.getItem('token')
            }
        }).then(function(response) {
            console.log(response);
            $scope.products=response.data.data;
            console.log(response.data);
        }, function(response) {
            console.log(response)
        });
    }
    $scope.remove=function(pro){
        $scope.da={
            'id': pro
        }
        console.log(pro);
        $http({
            url: "/api/removeproduct",
            method: "POST",
            data: $scope.da,
            headers: {
                'x-access-token': window.localStorage.getItem('token')
            }
        }).then(function(response) {
            
            console.log(response);
            $scope.refresh();
        }, function(response) {
            console.log(response)
        });
        
    }
    $scope.edit=function(pro){
        $scope.product=pro;
        $http({
            url: "/api/removeproduct",
            headers: {
               
                'x-access-token': window.localStorage.getItem('token')
            }
        }).then(function(response) {
            console.log(response);
            console.log(response.data);
        }, function(response) {
            console.log(response)
        });
     }
     $scope.addProduct=function(){
        $http({
            url: '/api/addproduct',
            method: "POST",
            data: $scope.product,
            headers: {
                
                'x-access-token': window.localStorage.getItem('token')
            }
        }).then(function(response) {
            console.log(response);
            $scope.product={};
            $scope.refresh();
        }, function(response) {
            console.log(response)
        });
        $scope.refresh();
     }    
    
    $scope.refresh();
})



//IP controller : -      See and Add IP's
app.controller('ipController', function($http, $scope, $rootScope, $location){
        $scope.refresh = function() {
        $http({
            url: '/a/address'
        }).then(function(response) {
            console.log(response);
            console.log(response.data);
        }, function(response) {
            console.log(response)
        });
    }
    $http({
        url: '/a/addip',
        method: 'POST'
    }).then(function(response) {
            console.log(response);
            console.log(response.data);
        }, function(response) {
            console.log(response)
        })
    

})



//logout controller
app.controller('logout', function($http, $scope, $rootScope, $location){
    localStorage.clear();
    $location.path('/login')
})
