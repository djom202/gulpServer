var controllers = angular.module('controllers', []);

controllers.controller('IndexCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $modal, $location) {
        // functions
    }]
);

controllers.controller('CarouselCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $modal, $location) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
          
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length;
            slides.push({
                image: 'http://placekitten.com/' + newWidth + '/250',
                text: ['More','Extra','Lots of','Surplus'][slides.length % 3] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 3]
            });
        };
        for (var i=0; i<3; i++) {
            $scope.addSlide();
        }
    }]
);

