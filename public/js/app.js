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
        templateUrl: 'views/login.html',
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
            if(response.data.success==true){
                window.localStorage.setItem('token', response.data.token);
                $rootScope.login=true;
                $location.path('/addproduct')
            }else{
                alert('Authentication failed')
            }
            
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
    $scope.flag=1;
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
            url: "/api/product",
            method: "DELETE",
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
        $scope.flag=2;
        $scope.product=pro;
        $scope.id1=pro._id;
    }

     $scope.addProduct=function(){
        
            $http({
            url: '/api/product',
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
        $scope.flag=1;
     }    
    $scope.editProduct=function(){
        $scope.da={
            'id': $scope.id1,
            'name': $scope.product.name,
            'price': $scope.product.price,
            'category': $scope.product.category
        }
     
        $http({
            url: "/api/product",
            method: 'PUT',
            data: $scope.da,
            headers: {
               
                'x-access-token': window.localStorage.getItem('token')
            }
        }).then(function(response) {
            console.log(response);
            $scope.product={}
            console.log(response.data);
        }, function(response) {
            
     });
     }   
    
    $scope.refresh();

})



//IP controller : -      See and Add IP's
app.controller('ipController', function($http, $scope, $rootScope, $location){
        $scope.refresh = function() {
        $http({
            url: '/a/address'
        }).then(function(response) {
            $scope.ipss=response.data.data[0].ip;
            console.log(response.data);
        }, function(response) {
            console.log(response)
        });
    }
    $scope.refresh();
    $scope.addIp=function(){
        $scope.dat={
            'id': '599bd6d6bf6d28d59c1d870f',
            'ip': $scope.ip
        }
    $http({
        url: '/a/addip',
        method: 'POST',
        data: $scope.dat
    }).then(function(response) {
            $scope.ip={}
            console.log(response);
        }, function(response) {
            console.log(response)
        })
        $scope.refresh();
    }
    

})



//logout controller
app.controller('logout', function($location, $rootScope){
    localStorage.clear();
    $rootScope.login=false;
    $location.path('/login')
});
