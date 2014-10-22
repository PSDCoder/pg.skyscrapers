(function () {
    'use strict';

    angular
        .module('pg.skyscrapers')
        .directive('skyscraperItem', skyscraperItemDirective);

    skyscraperItemDirective.$inject = ['$timeout'];

    function skyscraperItemDirective($timeout) {
        return {
            restrict: 'EA',
            replace: true,
            require: '^skyscraper',
            link: function ($scope, $element, $attrs, skyscraperController) {
                var savedIndex = $scope.$index;

                console.log($scope.$index + ' - ' + $scope.$id);
                
                $timeout(function () {
                    skyscraperController.addItem($element);
                });

                $scope.$on('$destroy', function () {
                    console.log('$scope', $scope);
                    console.log('savedIndex', savedIndex);
                    console.log('$scope.$index', $scope.$index);
                    $timeout(function () {
                        skyscraperController.removeItem($element);
                    });
                });
            }
        };
    }
})();